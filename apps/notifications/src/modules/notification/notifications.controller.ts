import { Controller } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SEND_EMAIL_NOTIFICATION_EVENT } from '@app/common/shared/constants/services';
import { EmailNotificationDto } from './dto/email-notifcation.dto';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  // Event pattern is where we receive an event from a different microservice and we don't need to return a response
  @EventPattern(SEND_EMAIL_NOTIFICATION_EVENT)
  async sendEmailNotification(@Payload() data: EmailNotificationDto) {
    return this.notificationsService.sendEmailNotification(data);
  }
}
