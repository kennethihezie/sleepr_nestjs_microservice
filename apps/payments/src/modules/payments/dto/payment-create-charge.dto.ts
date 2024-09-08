import { CreateChargeDto } from "@app/common/shared/dto/create-charge.dto";
import { IsEmail } from "class-validator";

export class PaymentCreateChargeDto extends CreateChargeDto {
    @IsEmail()
    email: string
}