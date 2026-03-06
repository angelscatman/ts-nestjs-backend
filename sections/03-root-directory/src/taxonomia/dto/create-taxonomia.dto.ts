import { IsArray, IsDefined, IsInt, IsOptional, IsPositive, IsString, MinLength, ValidateNested } from "class-validator";

/**
 * DTO to create a new taxonomia. It contains the properties that are required to create a new taxonomia, and the properties that are optional.
 */
export class CreateTaxonomiaDto {

    @IsString() @MinLength(3)
    scientificName: string;

    @IsInt()
    @IsPositive()
    taxonNo: number;
    @IsOptional()
    @IsString()
    autorship?: string;
    @IsArray() @IsOptional()
    @ValidateNested({ each: true })
    commonNames: { name: string, language: string }[];
}
