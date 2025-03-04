import { IsString, IsInt, IsNotEmpty, Min } from "class-validator";

export class CreateCursoDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsInt()
    @Min(1)
    cupoMaximo: number;
}
