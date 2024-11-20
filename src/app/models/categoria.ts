import { Produto } from "./produto";

export class Categoria {
  categoryId!:number;
  categoryName!:string;
  categoryDescription!:string;
  categoryStatus!:string;
  productList?: Array<Produto>;


  constructor(categoryId:number, categoryName:string, categoryDescription:string, categoryStatus:string, productList?: Array<Produto>  ){
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.categoryDescription = categoryDescription;
    this.categoryStatus = categoryStatus;
    this.productList = productList;
  }
}
