import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength ,IsOptional} from 'class-validator';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    public label: string;
    
    @IsString()
    @IsNotEmpty()
    public content: string;

    @IsOptional()
    public status: boolean;
    @IsOptional()
    public lock: boolean;
}