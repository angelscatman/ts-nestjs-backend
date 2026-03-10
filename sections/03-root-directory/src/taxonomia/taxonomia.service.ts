import { BadRequestException, Injectable, NotFoundException, Param } from '@nestjs/common';
import { CreateTaxonomiaDto } from './dto/create-taxonomia.dto';
import { UpdateTaxonomiaDto } from './dto/update-taxonomia.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Taxonomia } from './entities/taxonomia.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ExceptionHandlerService } from '../common/services/exception-handler.service';

@Injectable()
export class TaxonomiaService {
  constructor(
    @InjectModel( Taxonomia.name )
    private readonly taxonomiaModel: Model<Taxonomia>,
    private readonly exceptionHandlerService: ExceptionHandlerService,
  ) {}

  async create(createTaxonomiaDto: CreateTaxonomiaDto) {
    createTaxonomiaDto.scientificName = createTaxonomiaDto.scientificName.toLowerCase();
    try {
      const taxonomia = await this.taxonomiaModel.create(createTaxonomiaDto);
      return taxonomia;
    } catch (error) {
      this.exceptionHandlerService.handleDBExceptions(error);
    }
  }

  findAll() {
    return `This action returns all taxonomia`;
  }

  async findOne(param: string) {
    try {
      const taxonomia = await this.findTaxonomia(param);

      if (taxonomia) return taxonomia;

      throw new NotFoundException(`Taxonomia with identifier '${param}' not found.`);
    } catch (error) {
      this.exceptionHandlerService.handleDBExceptions(error);
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

      await taxonomia.updateOne( updateTaxonomiaDto )

      return {... taxonomia.toJSON(), ...updateTaxonomiaDto };
    } catch (error) {
      this.exceptionHandlerService.handleDBExceptions(error);
    }
  }

  async remove(param: string) {
    const taxonomia = await this.findOne( param );
    try {
     await taxonomia.deleteOne();
     return `Taxonomia with param #${param} removed successfully.`;
    } catch (error) {
      this.exceptionHandlerService.handleDBExceptions(error);
    }
  }
}
