import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaxonomiaService } from './taxonomia.service';
import { CreateTaxonomiaDto } from './dto/create-taxonomia.dto';
import { UpdateTaxonomiaDto } from './dto/update-taxonomia.dto';

@Controller('taxonomia')
export class TaxonomiaController {
  constructor(private readonly taxonomiaService: TaxonomiaService) {}

  @Post()
  create(@Body() createTaxonomiaDto: CreateTaxonomiaDto) {
    return this.taxonomiaService.create(createTaxonomiaDto);
  }

  @Get()
  findAll() {
    return this.taxonomiaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taxonomiaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaxonomiaDto: UpdateTaxonomiaDto) {
    return this.taxonomiaService.update(+id, updateTaxonomiaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taxonomiaService.remove(+id);
  }
}
