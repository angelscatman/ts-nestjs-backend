import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { HttpAdapter } from '../common/interfaces/http-adapter.interface';
import type { ExceptionMapper } from '../common/interfaces/exception-mapper.interface';
import { PlantsResponse } from './interfaces/plants-response.interface';
import { CreateTaxonomiaDto } from 'src/taxonomia/dto/create-taxonomia.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Taxonomia } from 'src/taxonomia/entities/taxonomia.entity';
import { Model } from 'mongoose';
import {
  EXCEPTION_MAPPER,
  HTTP_ADAPTER,
} from '../common/constants/injection-tokens';

@Injectable()
export class SeedService {
  private readonly rapidApiKey: string;
  private readonly rapidApiHost: string;
  private readonly plantsApiUrl: string;

  constructor(
    @InjectModel(Taxonomia.name)
    private readonly taxonomiaModel: Model<Taxonomia>,
    @Inject(HTTP_ADAPTER)
    private readonly httpAdapter: HttpAdapter,
    @Inject(EXCEPTION_MAPPER)
    private readonly exceptionMapper: ExceptionMapper,
    private readonly configService: ConfigService,
  ) {
    // Load configuration values from environment variables
    this.rapidApiKey = this.configService.getOrThrow<string>('RAPIDAPI_KEY');
    this.rapidApiHost = this.configService.get<string>(
      'RAPIDAPI_HOST',
      'house-plants2.p.rapidapi.com',
    );
    this.plantsApiUrl = this.configService.get<string>(
      'PLANTS_API_URL',
      'https://house-plants2.p.rapidapi.com/all-lite',
    );
  }

  /**
   * Executes the seeding process for plants data.This method fetches plant data from an external API, 
   * transforms it into the format required by the Taxonomia collection, and inserts it into the database.
   * @returns An object containing details about the seeding process, including the source of data, number of records fetched, mapped, and inserted.
   */
  async executeSeedPlants() {
    const plants = await this.fetchPlants();
    await this.taxonomiaModel.deleteMany({});

    const taxonomias = this.mapToTaxonomias(plants);
    const inserted = await this.insertTaxonomiasBulk(taxonomias);

    return {
      source: this.plantsApiUrl,
      fetched: plants.length,
      mapped: taxonomias.length,
      message: `Seed completed. ${inserted} plants inserted into taxonomia BD.`,
    };
  }

  /* -- Private Helper Methods -- */

  // Helper method to fetch plants data from the external API
  private async fetchPlants(): Promise<PlantsResponse[]> {
    try {
      return await this.httpAdapter.get<PlantsResponse[]>(this.plantsApiUrl, {
        headers: {
          'x-rapidapi-key': this.rapidApiKey,
          'x-rapidapi-host': this.rapidApiHost,
        },
      });
    } catch (error) {
      this.exceptionMapper.mapAndThrow(error, {
        type: 'external',
        source: 'Plants API',
        operation: 'fetchPlants',
      });
    }
  }

  private mapToTaxonomias(plants: PlantsResponse[]): CreateTaxonomiaDto[] {
    const taxonomias: CreateTaxonomiaDto[] = [];
    const seenScientificNames = new Set<string>();
    let taxonNo = 1;

    for (const plant of plants) {
      const scientificName = this.normalizeScientificName(plant['Latin name']);
      if (scientificName.length < 3 || seenScientificNames.has(scientificName)) {
        continue;
      }

      seenScientificNames.add(scientificName);

      taxonomias.push({
        scientificName,
        taxonNo,
        commonNames: this.mapCommonNames(plant['Common name']),
        imgUrl: plant.Img ?? undefined,
      });

      taxonNo += 1;
    }

    return taxonomias;
  }

  private mapCommonNames(
    commonNames: string[] | null,
  ): { name: string; language: string }[] {
    const normalized = (commonNames ?? [])
      .map((name) => name.trim())
      .filter((name) => name.length > 0);

    const uniqueByLowerCase = Array.from(
      new Map(normalized.map((name) => [name.toLowerCase(), name])).values(),
    );

    return uniqueByLowerCase.map((name) => ({ name, language: 'en' }));
  }

  // Helper method for bulk insertion for seeding
  private async insertTaxonomiasBulk(
    taxonomias: CreateTaxonomiaDto[],
  ): Promise<number> {
    if (taxonomias.length === 0) {
      return 0;
    }

    const insertedDocs = await this.taxonomiaModel.insertMany(taxonomias, {
      ordered: false,
    });

    return insertedDocs.length;
  }

  private normalizeScientificName(latinName: string): string {
    return latinName
      .normalize('NFKC')
      .trim()
      .replace(/\s+/g, ' ')
      .toLowerCase();
  }
}