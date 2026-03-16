import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TaxonomiaService } from './taxonomia.service';
import { CreateTaxonomiaDto } from './dto/create-taxonomia.dto';
import { UpdateTaxonomiaDto } from './dto/update-taxonomia.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('taxonomia')
export class TaxonomiaController {
  constructor(private readonly taxonomiaService: TaxonomiaService) {}

  @Post()
  create(@Body() createTaxonomiaDto: CreateTaxonomiaDto) {
    return this.taxonomiaService.create(createTaxonomiaDto);
  }

  @Get()
  findAll( @Query() paginationDto : PaginationDto) {
    return this.taxonomiaService.findAll(paginationDto);
  }

  @Get(':param')
  findOne(@Param('param') param: string) {
    return this.taxonomiaService.findOne(param);
  }

  @Patch(':param')
  update(@Param('param') param: string, @Body() updateTaxonomiaDto: UpdateTaxonomiaDto) {
    return this.taxonomiaService.update(param, updateTaxonomiaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.taxonomiaService.remove(id);
  }
}
