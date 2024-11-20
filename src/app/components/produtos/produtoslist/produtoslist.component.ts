import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Produto } from '../../../models/produto';
import { RouterLink } from '@angular/router';
import {MdbModalModule, MdbModalRef, MdbModalService} from'mdb-angular-ui-kit/modal'
import Swal from 'sweetalert2';
import { ProdutosdetailsComponent } from '../produtosdetails/produtosdetails.component';
import { ProdutoService } from '../../../services/produto.service';
@Component({
  selector: 'app-produtoslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, ProdutosdetailsComponent],
  templateUrl: './produtoslist.component.html',
  styleUrl: './produtoslist.component.scss',
})
export class ProdutoslistComponent {
  lista: Produto[] = [];
  produtoEdit: Produto = new Produto(0,"",0,"");

  modalService = inject(MdbModalService);
  @ViewChild('modalProdutosDetalhe') modalProdutosDetalhe!: TemplateRef<any>;
  modalRef!:MdbModalRef<any>;

  produtoService = inject(ProdutoService);

  constructor() {
    this.findAll()


    let produtoNovo = history.state.produtoNovo;
    let produtoEditado = history.state.produtoEditado;
    if (produtoNovo) {
      produtoNovo.id = 555;
      this.lista.push(produtoNovo);
    }
    if (produtoEditado) {
      let index = this.lista.findIndex((x) => {
        return x.productId == produtoEditado.id;
      });
      this.lista[index] = produtoEditado;
    }
  }
  findAll(){
    this.produtoService.findAll().subscribe({
      next: lista => {
        console.log('Dados recebidos:', lista);
        this.lista = lista;
      },
      error: erro =>{
        alert("Ocorreu algum erro")
      }
    })
  }

  deleteById(produto: Produto) {

    Swal.fire({
      title: 'Tem certeza qye desejar deletar este registro ?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton:true,
      confirmButtonText: 'sim',
      cancelButtonText: 'não',

    }).then((result) => {

      if (result.isConfirmed) {
        console.log('Produto a ser deletado:', produto); // Adicione este console.log para verificar o produto
        this.produtoService.deleteById(produto.productId).subscribe({
          next: lista => {
            console.log('Dados recebidos:', lista);
            Swal.fire({
              title: 'Deletado com Sucesso',
              icon: 'success',
              confirmButtonText: 'Ok',
            });

          },
          error: erro =>{
            alert("Ocorreu algum erro")
          }
        })
      }
    });
  }
  new(){
    this.produtoEdit = new Produto(0,"",0,"");
    this.modalRef = this.modalService.open(this.modalProdutosDetalhe);
  }
  edit(produto:Produto){
    this.produtoEdit = Object.assign({}, produto);
    this.modalRef = this.modalService.open(this.modalProdutosDetalhe);
  }
  retornoDetalhe(produto:Produto){
    if(produto.productId > 0){
      let indice = this.lista.findIndex(x => {return x.productId == produto.productId});
      this.lista[indice] = produto;
    }else{
      produto.productId = 54;
      this.lista.push(produto);
    }
    this.modalRef.close();

  }
}
