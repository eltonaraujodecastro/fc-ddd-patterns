import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderItemModel from "./order-item.model";


export default class OrderItemRepository {

  async update(entity: OrderItem): Promise<void> {
    await OrderItemModel.update({
      id: entity.id,
      name: entity.name,
      price: entity.price,
      product_id: entity.productId,
      quantity: entity.quantity,
    },
      {
        where: {
          id: entity.id,
        }
      });
  }

}
