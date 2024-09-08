import { Type } from "class-transformer"
import { IsDate, IsNotEmpty, IsString } from "class-validator"

export class CreateReservationDto {
    @IsString()
    @IsNotEmpty()
    placeId: string

    @IsString()
    @IsNotEmpty()
    invoiceId: string

    @IsDate()
    @Type(() => Date)
    startDate: Date

    @IsDate()
    @Type(() => Date)
    endDate: Date
}