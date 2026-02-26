import { IsNumber, IsOptional, IsString } from "class-validator";

/**
 * DTO to create a new car. It contains the properties that are required to create a new car, and the properties that are optional.
 */
export class CreateCarDto {
    @IsString()
    readonly brand: string;
    @IsString()
    readonly model: string;
    @IsNumber() @IsOptional()
    readonly year?: number;
}