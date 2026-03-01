import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuid } from 'uuid';
import { find } from 'rxjs';

@Injectable()
export class BrandsService {

  private brands : Brand[] = [
    {
    id: uuid(),
    name: 'Toyota',
    createdAt: new Date().getTime(),
    },
    {
    id: uuid(),
    name: 'Honda',
    createdAt: new Date().getTime(),
    }
  ];

  create(createBrandDto: CreateBrandDto) {
    const { name } = createBrandDto;
    const brand: Brand = {
      id : uuid(),
      name: name.toLocaleLowerCase(),
      createdAt: new Date().getTime(),
    };
    this.brands.push(brand);
    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find( brand => brand.id === id);
    if (!brand) throw new NotFoundException(`Brand with id ${id} not found`);
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let currentBrand = this.findOne(id);
    this.brands = this.brands.map( brand => {
      if (brand.id === id) {
        currentBrand = {...currentBrand, ...updateBrandDto, updatedAt: new Date().getTime()};
        return currentBrand;
      }
      return brand;
    });
    return currentBrand;
  }

  remove(id: string) {
    const currentBrand = this.findOne(id);
    this.brands = this.brands.filter( brand => brand.id !== id);
    return currentBrand;
  }
}
