import { UUID } from "crypto";

/**
 * This is the car interface, it defines the structure of a car object.
 */
export interface Car {
    id: string,
    brand: string,
    model: string,
    year?: number
}