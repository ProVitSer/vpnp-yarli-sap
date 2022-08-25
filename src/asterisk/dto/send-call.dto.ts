import { IsNotEmpty, IsString } from "class-validator";

export class SendCall  {
    @IsString()
    @IsNotEmpty({message: "Поле dialedNumber не может быть пустым"})
    dialedNumber: string;

    @IsString()
    @IsNotEmpty({message: "Поле extension не может быть пустым"})
    extension: string;
}   