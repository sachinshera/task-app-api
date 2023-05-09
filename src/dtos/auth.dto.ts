import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class loginDto {
    @IsEmail()
    public email: string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(9)
    @MaxLength(32)
    public password: string;
}