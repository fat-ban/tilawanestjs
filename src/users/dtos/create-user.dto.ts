import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  /* @PrimaryColumn()
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;*/

  @IsString()
  @IsOptional()
  @Length(2, 150)
  username?: string;

  //@IsString()

  @IsNotEmpty({ message: 'الايمايل غير مكتوب' })
  @IsEmail()
  @MaxLength(250)
  email?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  //@Min(8, { message: 'كلمة المرور اكثر من 8 حروف' })
  //@Length()
  password: string;

  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;
} //we can't find logic
