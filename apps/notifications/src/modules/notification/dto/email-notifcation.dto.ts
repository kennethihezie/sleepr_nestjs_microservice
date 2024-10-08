import { IsEmail, IsString } from 'class-validator';

export class EmailNotificationDto {
  @IsEmail()
  email: string;

  @IsString()
  text: string;
}
