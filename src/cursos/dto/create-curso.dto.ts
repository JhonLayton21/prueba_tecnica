import { IsString, IsInt, IsNotEmpty, Min, IsArray, IsOptional } from "class-validator";

export class CreateCursoDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsInt()
    @Min(1)
    cupoMaximo: number;

    @IsArray()
    @IsInt({ each: true })
    @IsOptional()
    estudiantesIds?: number[];
}
