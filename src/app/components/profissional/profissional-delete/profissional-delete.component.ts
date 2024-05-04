import { Component, OnInit } from '@angular/core';
import { Profissional } from '../../../models/profissional';
import { ProfissionalService } from '../../../services/profissional.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatSelectModule } from '@angular/material/select';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profissional-delete',
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
  templateUrl: './profissional-delete.component.html',
  styleUrl: './profissional-delete.component.css',
  providers: [provideNgxMask()]
})
export class ProfissionalDeleteComponent implements OnInit{

  profissional : Profissional = {
    id_profissional: "",
    nome: "",
    sobrenome: "",
    cpf:  "",
    email: "",
    data_nascimento: "",
    data_admissao: "",
    usuario: ""
  }

  usuarios: Usuario[] = [];

  constructor(
    private service: ProfissionalService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private title: Title
  ){}

  ngOnInit(): void {
    this.title.setTitle("Deletando Profissional")
    this.profissional.id_profissional = this.route.snapshot.paramMap.get('id')
    this.findById();
  }

  findById(){
    this.service.findById(this.profissional.id_profissional).subscribe(response => {
      this.profissional = response;
    })
  }

  findAllUsuarios(){
    this.usuarioService.findAll().pipe().subscribe(response => {
      this.usuarios = response;
    });
  }

  delete(): void {
    this.service.delete(this.profissional.id_profissional).subscribe(
      () => {
        this.toastr.success("Profissional deletado com sucesso", "Deletado");
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

}
