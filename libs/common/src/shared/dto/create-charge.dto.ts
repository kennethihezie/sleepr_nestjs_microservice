import { IsDefined, IsNotEmptyObject, IsNumber, ValidateNested } from "class-validator"
import Stripe from "stripe"
import { CardDto } from "./card.dto"
import { Type } from "class-transformer"

export class CreateChargeDto {
    @IsDefined()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CardDto)
    card: CardDto

    @IsDefined()
    @IsNumber()
    amount: number
}