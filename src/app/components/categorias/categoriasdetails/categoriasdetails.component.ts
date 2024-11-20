import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../../models/categoria';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CategoriaService } from '../../../services/categoria.service';
@Component({
  selector: 'app-categoriasdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './categoriasdetails.component.html',
  styleUrl: './categoriasdetails.component.scss'
})
export class CategoriasdetailsComponent {
  @Input("categoria") categoria: Categoria = new Categoria(0, '', '', '');
  @Output("retorno") retorno = new EventEmitter();
  router = inject(ActivatedRoute);
  router2 = inject(Router);
  categoriaService = inject(CategoriaService);

  constructor() {
    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }
  findById(id: number) {
    this.categoriaService.findById(id).subscribe({
      next: retorno =>{
          this.categoria = retorno;
      },
      error: erro =>{
        alert("algum erro")
      }
    })
  }
  save() {
    if (this.categoria.categoryId > 0) {
      this.categoriaService.update(this.categoria, this.categoria.categoryId).subscribe({
        next: retorno =>{
          Swal.fire({
            title: retorno.categoryName,
            text: 'Editado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['admin/categorias'], {
            state: { categoriaEditado: this.categoria },
          });
          this.retorno.emit(this.categoria);

        },
        error: erro =>{
          alert("algum erro")
        }
      })


    } else {

      this.categoriaService.save(this.categoria).subscribe({
        next: retorno =>{
          Swal.fire({
            title: retorno.categoryName,
            text: 'Salvo com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['admin/categorias'], {
            state: { categoriaNovo: this.categoria },
          });
          this.retorno.emit(this.categoria);
        },
        error: erro =>{
          alert("algum erro")
        }
      })


    }

  }

}
