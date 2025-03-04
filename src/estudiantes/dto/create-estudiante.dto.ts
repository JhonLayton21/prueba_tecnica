import { IsString, IsArray, IsInt, IsOptional } from "class-validator";

export class CreateEstudianteDto {
    @IsString()
    nombre: string;

    @IsArray()
        @IsInt({ each: true })
        @IsOptional()
        cursosIds?: number[];
}
