import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { CategoriasdetailsComponent } from '../categoriasdetails/categoriasdetails.component';
import {MdbModalModule, MdbModalRef, MdbModalService} from'mdb-angular-ui-kit/modal'
import { RouterLink } from '@angular/router';
import { Categoria } from '../../../models/categoria';
import Swal from 'sweetalert2';
import { CategoriaService } from '../../../services/categoria.service';


@Component({
  selector: 'app-categoriaslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, CategoriasdetailsComponent],
  templateUrl: './categoriaslist.component.html',
  styleUrl: './categoriaslist.component.scss'
})
export class CategoriaslistComponent {
  listaCategoria: Categoria[] = [];

  categoriaEdit: Categoria = new Categoria(0,"","","");

  @Input("esconderbtn") esconderbtn: boolean = false;
  @Output("retorno") retorno = new EventEmitter();

  modalService = inject(MdbModalService);
  @ViewChild('modalCategoriaDetalhe') modalCategoriaDetalhe!: TemplateRef<any>;
  modalRef!:MdbModalRef<any>;

  categoriaService = inject(CategoriaService);

  constructor() {
    this.findAll()


    let categoriaNovo = history.state.categoriaNovo;
    let produtoEditado = history.state.produtoEditado;
    if (categoriaNovo) {
      categoriaNovo.id = 555;
      this.listaCategoria.push(categoriaNovo);
    }
    if (produtoEditado) {
      let index = this.listaCategoria.findIndex((x) => {
        return x.categoryId == produtoEditado.id;
      });
      this.listaCategoria[index] = produtoEditado;
    }
  }
  findAll(){
    this.categoriaService.findAll().subscribe({
      next: listaCategoria => {
        console.log('Dados recebidos:', listaCategoria);
        this.listaCategoria = listaCategoria;
      },
      error: erro =>{
        alert("Ocorreu algum erro")
      }
    })
  }

  deleteById(categoria: Categoria) {

    Swal.fire({
      title: 'Tem certeza qye desejar deletar este registro ?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton:true,
      confirmButtonText: 'sim',
      cancelButtonText: 'não',

    }).then((result) => {

      if (result.isConfirmed) {
        console.log('Produto a ser deletado:', categoria); // Adicione este console.log para verificar o produto
        this.categoriaService.deleteById(categoria.categoryId).subscribe({
          next: listaCategoria => {
            console.log('Dados recebidos:', listaCategoria);
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
    this.categoriaEdit = new Categoria(0,"","","");
    this.modalRef = this.modalService.open(this.modalCategoriaDetalhe);
  }
  edit(categoria:Categoria){
    this.categoriaEdit = Object.assign({}, categoria);
    this.modalRef = this.modalService.open(this.modalCategoriaDetalhe);
  }
  retornoDetalhe(categoria:Categoria){
    this.findAll();
    this.modalRef.close();

  }
  select(categoria:Categoria){
    this.retorno.emit(categoria);

  }
}
