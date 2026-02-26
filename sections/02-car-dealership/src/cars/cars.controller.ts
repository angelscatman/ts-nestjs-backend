import { Controller, Get, Post, Body, Param, ParseIntPipe, Patch, Delete, ParseUUIDPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto } from './dto';

/**
 * Class cars is simple controller for cars.
 * It has a create, read, update and delete methods for cars.
 */
@Controller('cars')
export class CarsController {

    constructor (
        private readonly carsService : CarsService,
    ) {}

    @Get()
    getAllCars() {
        return this.carsService.findAll();
    }

    @Get(':id')
    getCarbyId( @Param('id', new ParseUUIDPipe({version: '4'})) id: string ){
        return this.carsService.findOneById(id);
    }

    @Post()
    createCar( @Body() createCarDto: CreateCarDto){
        return this.carsService.createOne(createCarDto);
    }

    @Patch(':id')
    updateCar( 
        @Param('id', ParseUUIDPipe) id: string, 
        @Body() updateCarDto: UpdateCarDto ) {
        return this.carsService.updateOneById(id, updateCarDto);
    }

    @Delete(':id')
    deleteCar(@Param('id', ParseUUIDPipe) id: string) {
        return this.carsService.deleteOneById(id);
    }
}