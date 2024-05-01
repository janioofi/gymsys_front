import { Component, OnInit } from '@angular/core';
import { Plano } from '../../../models/plano';
import { PlanoService } from '../../../services/plano.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-plano-delete',
  standalone: true,
  imports: [
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule
  ],
  templateUrl: './plano-delete.component.html',
  styleUrl: './plano-delete.component.css'
})
export class PlanoDeleteComponent implements OnInit{

  plano: Plano = {
    id_plano: '',
    descricao: '',
    vigencia: '',
    preco: '',
    quantidadeMeses: '',
  };

  constructor(
    private service: PlanoService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.plano.id_plano = this.route.snapshot.paramMap.get('id')
    this.findById();
  }

  findById(){
    this.service.findById(this.plano.id_plano).subscribe(response => {
      this.plano = response;
    })
  }

  delete(): void {
    this.service.delete(this.plano.id_plano).subscribe(
      () => {
        this.toastr.success("Plano deletado com sucesso", "Deletado");
        this.router.navigate(['planos'])
      },
      (ex) => {
        console.log(ex);
        if(ex.error.errors){
          ex.error.errors.forEach(element => {
            this.toastr.error(element.message);
          })
        }else{
          this.toastr.error(ex.error);
        }
      }
    );
  }
}
