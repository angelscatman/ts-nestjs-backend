import { Car } from "src/cars/interfaces/car.interface";
import { v4 as uuid } from 'uuid';

export const CARS_SEED : Car[] = [
    {id: uuid(), brand: 'Toyota', model: 'Corolla', year: 2020},
    {id: uuid(), brand: 'Honda', model: 'Civic', year: 2019},
    {id: uuid(), brand: 'Ford', model: 'Mustang', year: 2021},
    {id: uuid(), brand: 'Chevrolet', model: 'Camaro', year: 2020},
    {id: uuid(), brand: 'Tesla', model: 'Model 3', year: 2021},
]