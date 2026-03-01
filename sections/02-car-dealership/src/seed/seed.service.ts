import { Injectable } from '@nestjs/common';
import { CarsService } from '../cars/cars.service';
import { BrandsService } from '../brands/brands.service';
import { CARS_SEED } from './data/cars.seed';
import { BRANDS_SEED } from './data/brands.seed';


@Injectable()
export class SeedService {

  constructor(
    private readonly CarsService: CarsService,
    private readonly BrandService: BrandsService
  ) {}

  /**
   * This method is used to seed the database with the data from the seed files.
   */
  seedDB() {
    this.BrandService.brandsDataSeed( BRANDS_SEED );
    this.CarsService.carsDataSeed( CARS_SEED );
    return `Insertion of data completed successfully!`;
  }
}