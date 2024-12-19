import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: 'الايمايل غير مكتوب' })
  @IsEmail()
  @MaxLength(250)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
} //we can't find logic
