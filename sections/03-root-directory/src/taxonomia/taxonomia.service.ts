import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaxonomiaDto } from './dto/create-taxonomia.dto';
import { UpdateTaxonomiaDto } from './dto/update-taxonomia.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Taxonomia } from './entities/taxonomia.entity';
import { InjectModel } from '@nestjs/mongoose';
import type { ExceptionMapper } from 'src/common/interfaces/exception-mapper.interface';
import { EXCEPTION_MAPPER } from 'src/common/constants/injection-tokens';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class TaxonomiaService {
  constructor(
    @InjectModel(Taxonomia.name)
    private readonly taxonomiaModel: Model<Taxonomia>,
    @Inject(EXCEPTION_MAPPER)
    private readonly exceptionMapper: ExceptionMapper,
  ) {}

  async create(createTaxonomiaDto: CreateTaxonomiaDto) {
    createTaxonomiaDto.scientificName = createTaxonomiaDto.scientificName.toLowerCase();
    try {
      const taxonomia = await this.taxonomiaModel.create(createTaxonomiaDto);
      return taxonomia;
    } catch (error) {
      this.exceptionMapper.mapAndThrow(error, {
        type: 'database',
        entity: 'Taxonomia',
        operation: 'create',
      });
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10 , offset = 0 } = paginationDto;
    return this.taxonomiaModel.find().limit(limit).skip(offset).sort({ taxonNo: 1 });
  }

  async findOne(param: string) {
    try {
      const taxonomia = await this.findTaxonomia(param);

      if (taxonomia) return taxonomia;

      throw new NotFoundException(`Taxonomia with identifier '${param}' not found.`);
    } catch (error) {
      this.exceptionMapper.mapAndThrow(error, {
        type: 'database',
        entity: 'Taxonomia',
        operation: 'findOne',
      });
    }
  }

  private findTaxonomia(param: string) {
    if (!isNaN(+param)) {
      return this.taxonomiaModel.findOne({ taxonNo: +param });
    }

    if (isValidObjectId(param)) {
      return this.taxonomiaModel.findById(param);
    }

    return this.taxonomiaModel.findOne({ scientificName: param.toLowerCase() });
  }

  async update(param: string, updateTaxonomiaDto: UpdateTaxonomiaDto = {}) {
    const taxonomia = await this.findOne(param);
    try {
      if (!updateTaxonomiaDto || Object.keys(updateTaxonomiaDto).length === 0) {
        throw new BadRequestException('Update payload is required.');
      }

      if (updateTaxonomiaDto.scientificName) {
        updateTaxonomiaDto.scientificName = updateTaxonomiaDto.scientificName.toLowerCase();
      }

        await taxonomia.updateOne(updateTaxonomiaDto);

        return { ...taxonomia.toJSON(), ...updateTaxonomiaDto };
    } catch (error) {
      this.exceptionMapper.mapAndThrow(error, {
        type: 'database',
        entity: 'Taxonomia',
        operation: 'update',
      });
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.taxonomiaModel.deleteOne({ _id: id });
    if (deletedCount === 0)
       throw new NotFoundException(`Taxonomia with id #${id} not found.`);
    return `Taxonomia with id #${id} removed successfully.`;
  }
}
