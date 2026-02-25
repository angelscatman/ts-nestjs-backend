import { Controller, Get, Param } from '@nestjs/common';

@Controller('cars')
export class CarsController {

    private cars = ['BMW', 'Audi', 'Mercedes', 'Toyota', 'Porsche'];

    @Get()
    getAllCars() {
        return this.cars;
    }

    @Get(':id')
    getCarbyId( @Param('id') id ){
        console.log(id);
        return this.cars[+id];
    }
}