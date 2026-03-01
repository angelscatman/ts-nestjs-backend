import { Brand } from 'src/brands/entities/brand.entity';
import { v4 as uuid } from 'uuid';

const createdAt = new Date().getTime();

export const BRANDS_SEED : Brand[] = [
    {id: uuid(), name: 'Toyota', createdAt},
    {id: uuid(), name: 'Honda', createdAt},
    {id: uuid(), name: 'Ford', createdAt},
    {id: uuid(), name: 'Chevrolet', createdAt},
    {id: uuid(), name: 'Tesla', createdAt},
]