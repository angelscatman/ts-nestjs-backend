import { Injectable } from '@nestjs/common';
import { CreateTaxonomiaDto } from './dto/create-taxonomia.dto';
import { UpdateTaxonomiaDto } from './dto/update-taxonomia.dto';

@Injectable()
export class TaxonomiaService {
  create(createTaxonomiaDto: CreateTaxonomiaDto) {
    return 'This action adds a new taxonomia';
  }

  findAll() {
    return `This action returns all taxonomia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taxonomia`;
  }

  update(id: number, updateTaxonomiaDto: UpdateTaxonomiaDto) {
    return `This action updates a #${id} taxonomia`;
  }

  remove(id: number) {
    return `This action removes a #${id} taxonomia`;
  }
}
