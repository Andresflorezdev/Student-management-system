import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAlumnoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  apellido!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  telefono!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  curso!: string;
}
