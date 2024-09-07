import { BaseDocument } from "@app/common/modules";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({ timestamps: true })
export class User extends BaseDocument {
   @Prop()
   email: string

   @Prop()
   password: string

   @Prop()
   accessToken: string

   @Prop()
   refreshToken: string
}

export const UserSchema = SchemaFactory.createForClass(User);