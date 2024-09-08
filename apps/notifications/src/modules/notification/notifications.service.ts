import { Injectable } from '@nestjs/common';
import { EmailNotificationDto } from './dto/email-notifcation.dto';

@Injectable()
export class NotificationsService {
  
  async sendEmailNotification({ email, text }: EmailNotificationDto) {
    console.log(email);
  }
}
