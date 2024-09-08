import { BaseDocument } from "@app/common/modules";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Reservation extends BaseDocument {
    @Prop()
    userId: string
    
    @Prop()
    invoiceId: string

    @Prop()
    startDate: Date

    @Prop()
    endDate: Date
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation) 