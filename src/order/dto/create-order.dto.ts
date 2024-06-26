import { ArrayMinSize, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { OrderItemDto } from "./order-item.dto";

export class CreateOrderDto {
    
    //v1
    // @IsNumber()
    // @IsPositive()
    // totalAmount: number;

    // @IsNumber()
    // @IsPositive()
    // totalItems: number;
    
    // @IsEnum( OrderStatuslist, {
    //     message: `Order Status allow is: ${ OrderStatuslist }`
    // })
    // @IsOptional()
    // status?: OrderStatus = OrderStatus.PENDING;

    //v2
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true }) // validación interna de elementos
    @Type( () => OrderItemDto )
    items: OrderItemDto[]; 

}
