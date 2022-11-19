import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpBody {
  @ApiProperty({
    description: '이메일',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '이름',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: '비밀번호',
    format: 'password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: '비밀번호 확인',
    format: 'password',
  })
  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}

export class SignInBody extends PickType(SignUpBody, ['email', 'password']) {}

export class UpdatePasswordBody extends PickType(SignUpBody, ['password']) {
  @ApiProperty({
    description: '새 비밀번호',
    format: 'password',
  })
  @IsNotEmpty()
  @IsString()
  newPassword: string;

  @ApiProperty({
    description: '새 비밀번호 확인',
    format: 'password',
  })
  @IsNotEmpty()
  @IsString()
  confirmNewPassword: string;
}
