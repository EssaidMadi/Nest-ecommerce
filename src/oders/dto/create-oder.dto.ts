interface ProductOrderDTO {
  product: string;
  quantity: number;
}
export class CreateOderDto {
  products: ProductOrderDTO[];
}
