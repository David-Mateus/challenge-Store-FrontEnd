import { Routes } from "@angular/router";
import { LoginComponent } from "./components/layout/login/login.component";
import { PrincipalComponent } from "./components/layout/principal/principal.component";
import { ProdutoslistComponent } from "./components/produtos/produtoslist/produtoslist.component";
import { ProdutosdetailsComponent } from "./components/produtos/produtosdetails/produtosdetails.component";
import { CategoriaslistComponent } from "./components/categorias/categoriaslist/categoriaslist.component";
import { CategoriasdetailsComponent } from "./components/categorias/categoriasdetails/categoriasdetails.component";
export const routes: Routes=[
  {path:"", redirectTo:"login", pathMatch:'full'},
  {path:"login", component:LoginComponent},
  {path:"admin", component:PrincipalComponent, children:[
    {path:"produtos", component: ProdutoslistComponent},
    {path:"produtos/new", component: ProdutosdetailsComponent},
    {path:"produtos/edit/:id", component: ProdutosdetailsComponent},
    {path:"categorias", component: CategoriaslistComponent},
    {path:"categorias/new", component: CategoriasdetailsComponent},
    {path:"categorias/edit/:id", component: CategoriasdetailsComponent},

  ]}

];
