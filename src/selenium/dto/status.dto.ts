import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiExtensionStatus } from "../types/type";

export class Status  {
    @IsNumber()
    @IsNotEmpty({message: "Поле extension не может быть пустым"})
    extension: number;

    @IsString()
    @IsNotEmpty({message: "Поле extension не может быть пустым"})
    @IsEnum(ApiExtensionStatus, {message: "Поле status должно быть одним из значений available, absent, dnd, lunch, businessTrip "} )
    status: ApiExtensionStatus;
}