import { Categoria } from "./categoria";

export class Produto {

  productId!:number;
  productName!:string;
  productPrice!:number;
  productStatus!:string;
  category?: Categoria

  constructor(productId:number, productName:string, productPrice:number, productStatus:string, category?: Categoria){
    this.productId = productId;
    this.productName = productName;
    this.productPrice = productPrice;
    this.productStatus = productStatus;
    this.category = category;
  }
}
