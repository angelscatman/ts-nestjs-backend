import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpClientService } from '../common/services/http-client.service';
import { PlantsResponse } from './interfaces/plants-response.interface';

@Injectable()
export class SeedService {
  private readonly RAPIDAPI_KEY: string;
  private readonly RAPIDAPI_HOST: string;
  private readonly PLANTS_API_URL: string;

  constructor(
    private readonly httpClientService: HttpClientService,
    private readonly configService: ConfigService,
  ) {
    // Load configuration values from environment variables
    this.RAPIDAPI_KEY = this.configService.getOrThrow<string>('RAPIDAPI_KEY');
    this.RAPIDAPI_HOST = this.configService.getOrThrow<string>('RAPIDAPI_HOST');
    this.PLANTS_API_URL = this.configService.getOrThrow<string>('PLANTS_API_URL');
  }

  /**
   * Executes the seeding process for plants by fetching data from the RapidAPI endpoint.
   * @returns A promise resolving to the seeding results.
   */
  async executeSeedPlants() {
    // Prepare the headers for the API request using the configured RapidAPI key and host
    const config = {
      headers: {
        'x-rapidapi-key': this.RAPIDAPI_KEY,
        'x-rapidapi-host': this.RAPIDAPI_HOST,
      },
    };

    const data = await this.httpClientService.get<PlantsResponse[]>(
      this.PLANTS_API_URL,
      config,
    );

    return {
      source: this.PLANTS_API_URL,
      fetched: data?.length || 0,
      message: 'Plants fetched successfully from RapidAPI.',
      preview: data?.slice(0, 3) || [],
    };
  }
}