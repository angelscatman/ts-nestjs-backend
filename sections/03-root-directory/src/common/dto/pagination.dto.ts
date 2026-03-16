import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

/**
 * DTO for pagination parameters.
 */
export class PaginationDto {

    @IsOptional() 
    @IsNumber()
    @IsPositive()
    @Min(1)
    limit?: number;
    
    @IsOptional()
    @IsNumber()
    @IsPositive()
    offset?: number;
}