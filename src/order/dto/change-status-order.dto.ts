import { IsEnum, IsOptional } from "class-validator";
import { OrderStatus, OrderStatuslist } from '../types/order.enum';

export class ChangeStatusOrderDto {

    @IsEnum( OrderStatuslist )
    @IsOptional()
    status?: OrderStatus;

}