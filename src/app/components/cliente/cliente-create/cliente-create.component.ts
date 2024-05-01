import { PlanoService } from './../../../services/plano.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Plano } from '../../../models/plano';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-cliente-create',
  standalone: true,
  providers: [provideNgxMask()],
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
  templateUrl: './cliente-create.component.html',
  styleUrl: './cliente-create.component.css'
})
export class ClienteCreateComponent implements OnInit{

  cliente : Cliente = {
    id_cliente: "",
    nome: "",
    sobrenome: "",
    apelido: "",
    cpf:  "",
    email: "",
    data_nascimento: "",
    plano: "",
    id_plano: ""
  }

  planos: Plano[] = [];

  nome : FormControl = new FormControl(null, [Validators.required]);
  sobrenome: FormControl = new FormControl(null, [Validators.required]);
  plano: FormControl = new FormControl(null, [Validators.required]);
  cpf: FormControl = new FormControl(null, [Validators.required]);
  email: FormControl = new FormControl(null, Validators.email);
  data_nascimento: FormControl = new FormControl(null, Validators.required);

  constructor(
    private service: ClienteService,
    private router: Router,
    private toastr: ToastrService,
    private planoService: PlanoService
  ){}

  ngOnInit(): void {
    this.findAllPlanos();
  }

  create(): void {
    this.service.create(this.cliente).subscribe(
      () => {
        this.toastr.success("Cliente cadastrado com sucesso", "Cadastro");
        this.router.navigate(['clientes'])
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

  findAllPlanos(){
    this.planoService.findAll().pipe().subscribe(response => {
      this.planos = response;
    });
  }

  validaCampos(): boolean {
    return (this.plano.valid && this.nome.valid && this.sobrenome.valid && this.cpf.valid && this.email.valid && this.data_nascimento.valid);
  }
}
