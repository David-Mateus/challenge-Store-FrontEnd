import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { Produto } from '../../../models/produto';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProdutoService } from '../../../services/produto.service';
import { Categoria } from '../../../models/categoria';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CategoriaslistComponent } from '../../categorias/categoriaslist/categoriaslist.component';
@Component({
  selector: 'app-produtosdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, CategoriaslistComponent],
  templateUrl: './produtosdetails.component.html',
  styleUrl: './produtosdetails.component.scss',
})
export class ProdutosdetailsComponent {
  @Input("produto") produto: Produto = new Produto(0, '',0,'');
  @Output("retorno") retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);
  router2 = inject(Router);
  produtoService = inject(ProdutoService);
  modalService = inject(MdbModalService);
  @ViewChild('modalCategorias') modalCategorias!: TemplateRef<any>;
  modalRef!:MdbModalRef<any>;

  constructor() {
    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }
  findById(id: number) {
    let produtoRetornado: Produto = new Produto(
      id,
      'Iphone',
      3400,
      'Semi-novo',

    );
    this.produto = produtoRetornado;
  }
  save() {
    if (this.produto.productId > 0) {
      this.produtoService.update(this.produto, this.produto.productId).subscribe({
        next: retorno =>{
          Swal.fire({
            title: retorno.productName,
            text: 'Editado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['admin/produtos'], {
            state: {produtoEditado: this.produto },
          });
          this.retorno.emit(this.produto);

        },
        error: erro =>{
          alert("algum erro")
        }
      })

    } else {
      this.produtoService.save(this.produto).subscribe({
        next: retorno =>{
          Swal.fire({
            title: retorno.productName,
            text: 'Salvo com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['admin/produtos'], {
            state: { produtoNovo: this.produto },
          });
          this.retorno.emit(this.produto);
        },
        error: erro =>{
          alert("algum erro")
        }
      })
    }

  }
  buscarCategorias(){
    this.modalRef = this.modalService.open(this.modalCategorias);

  }
  retornoCategoria(categoria:Categoria){
    this.produto.category = categoria;
    this.modalRef.close();
  }
}
