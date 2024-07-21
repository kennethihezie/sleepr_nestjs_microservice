import { PartialType } from "@nestjs/mapped-types";
import { Reservation } from "../schema/reservation.schema";

export class UpdateReservationDto extends PartialType(Reservation) {}