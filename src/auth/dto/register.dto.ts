import { PartialType } from "@nestjs/mapped-types";
import { SinginDto } from "./singin.dto";
import { IsString } from "class-validator";

export class RegisterDto extends PartialType( SinginDto ) {
    
    @IsString()
    name: string;

}