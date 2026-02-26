import { IsNumber, IsOptional, isString, IsString, IsUUID, isUUID } from "class-validator";

/**
 * DTO to update a new car. It contains the properties that are required to update a car, and the properties that are optional.
 */
export class UpdateCarDto {
    @IsString() @IsUUID('4') @IsOptional()
    readonly id: string;
    @IsString() @IsOptional()
    readonly brand?: string;
    @IsString() @IsOptional()
    readonly model?: string;
    @IsNumber() @IsOptional()
    readonly year?: number;
}