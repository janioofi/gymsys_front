import { Component } from '@angular/core';
import { Plano } from '../../../models/plano';
import { PlanoService } from '../../../services/plano.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskDirective } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-plano-create',
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
    NgxMaskDirective,
    CommonModule,
    MatSelectModule
  ],
  templateUrl: './plano-create.component.html',
  styleUrl: './plano-create.component.css',
})
export class PlanoCreateComponent {
  plano: Plano = {
    id_plano: '',
    descricao: '',
    vigencia: '',
    preco: '',
    quantidadeMeses: '',
  };

  constructor(
    private service: PlanoService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  descricao: FormControl = new FormControl(null, [Validators.required]);
  preco: FormControl = new FormControl(null, [Validators.required, Validators.max(1400)]);
  vigencia: FormControl = new FormControl(null, [Validators.required]);
  quantidadeMeses: FormControl = new FormControl(null, [Validators.required, Validators.max(24)]);

  create(): void {
    this.service.create(this.plano).subscribe(
      () => {
        this.toastr.success("Plano cadastrado com sucesso", "Cadastro");
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

  validaCampos(): boolean {
    return (this.descricao.valid && this.preco.valid && this.vigencia.valid && this.quantidadeMeses.valid);
  }
}
