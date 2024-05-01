import { Usuario } from './../../../models/usuario';
import { Component, OnInit } from '@angular/core';
import { Profissional } from '../../../models/profissional';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from "ngx-mask";
import { ProfissionalService } from '../../../services/profissional.service';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-profissional-create',
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
  templateUrl: './profissional-create.component.html',
  styleUrl: './profissional-create.component.css'
})
export class ProfissionalCreateComponent implements OnInit{

  profissional : Profissional = {
    id_profissional: "",
    nome: "",
    sobrenome: "",
    cpf:  "",
    email: "",
    data_nascimento: "",
    data_admissao: "",
    usuario: "",
    id_usuario: ""
  }

  usuarios: Usuario[] = [];

  constructor(
    private service: ProfissionalService,
    private router: Router,
    private toastr: ToastrService,
    private usuarioService: UsuarioService
  ){}

  ngOnInit(): void {
    this.findAllUsuarios();
  }

  nome : FormControl = new FormControl(null, [Validators.required]);
  sobrenome: FormControl = new FormControl(null, [Validators.required]);
  usuario: FormControl = new FormControl(null, [Validators.required]);
  cpf: FormControl = new FormControl(null, [Validators.required]);
  email: FormControl = new FormControl(null, Validators.email);
  data_nascimento: FormControl = new FormControl(null, Validators.required);
  data_admissao: FormControl = new FormControl(null, Validators.required);

  create(): void {
    this.service.create(this.profissional).subscribe(
      () => {
        this.toastr.success("Profissional cadastrado com sucesso", "Cadastro");
        this.router.navigate(['profissionais'])
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

  findAllUsuarios(){
    this.usuarioService.findAll().pipe().subscribe(response => {
      this.usuarios = response;
    });
  }

  validaCampos(): boolean {
    return (this.usuario.valid && this.nome.valid && this.sobrenome.valid && this.cpf.valid && this.email.valid && this.data_nascimento.valid);
  }
}
