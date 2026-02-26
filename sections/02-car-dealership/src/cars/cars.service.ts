import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto} from './dto';

/**
 * Class cars is simple service for cars.
 * It has a create, read, update and delete methods for cars.
 */
@Injectable()
export class CarsService {

    private cars: Car[] = [
        {id: uuid(), brand: 'Porshe', model: '911'},
        {id: uuid(), brand: 'Toyota', model: 'Corolla'},
        {id: uuid(), brand: 'BMW', model: 'M3'},
        {id: uuid(), brand: 'Audi', model: 'A4'},
        {id: uuid(), brand: 'Mercedes', model: 'C-Class'},
    ];

    findAll() {
        return this.cars;
    }

    findOneById(id: string) {
        const car = this.cars.find(car => car.id === id);
        if (!car) throw new NotFoundException(`Car with id: ${id} not found`);
        return car; 
    }

    createOne(createCarDto: CreateCarDto) {
        const car: Car = {id: uuid(), ...createCarDto};
        this.cars.push(car);
        return car;
    }

    updateOneById(id: string, updateCarDto: UpdateCarDto) {
        let currentCar= this.findOneById(id);
        this.cars = this.cars.map(car => {
            if (car.id === id){
               currentCar = {
                ... currentCar,
                ...updateCarDto,
                id}

                return currentCar;

            }
            return car;
        });
        return currentCar;
    }

    deleteOneById(id: string) {
        const currentCar= this.findOneById(id);
        this.cars = this.cars.filter(car => car.id !== id);
        return currentCar;
    }
}