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

  @Get(':param')
  findOne(@Param('param') param: string) {
    return this.taxonomiaService.findOne(param);
  }

  @Patch(':param')
  update(@Param('param') param: string, @Body() updateTaxonomiaDto: UpdateTaxonomiaDto) {
    return this.taxonomiaService.update(param, updateTaxonomiaDto);
  }

  @Delete(':param')
  remove(@Param('param') param: string) {
    return this.taxonomiaService.remove(param);
  }
}
