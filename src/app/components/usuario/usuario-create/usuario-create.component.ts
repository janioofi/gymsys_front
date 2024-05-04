import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-usuario-create',
  standalone: true,
  imports: [
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule
],
  templateUrl: './usuario-create.component.html',
  styleUrl: './usuario-create.component.css'
})
export class UsuarioCreateComponent implements OnInit{

  usuarioModel : Usuario = {
    id_usuario: "",
    usuario: "",
    senha: "",
    perfis: []
  }

  usuario : FormControl = new FormControl(null, [Validators.required, Validators.minLength(3)]);
  senha: FormControl = new FormControl(null, [Validators.required,Validators.minLength(3)]);

  constructor(
    private service: UsuarioService,
    private toastr: ToastrService,
    private router: Router,
    private title: Title
  ){}

  ngOnInit(): void {
    this.title.setTitle("Criando Usuário")
  }

  addPerfil(perfil: any): void{
    if(this.usuarioModel.perfis.includes(perfil)){
      this.usuarioModel.perfis.splice(this.usuarioModel.perfis.indexOf(perfil), 1)
    }else{
      this.usuarioModel.perfis.push(perfil)
    }
  }

  create(): void {
    this.service.create(this.usuarioModel).subscribe(
      () => {
        this.toastr.success("Usuário cadastrado com sucesso", "Cadastro");
        this.router.navigate(['usuarios'])
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
    return this.usuario.valid && this.senha.valid;
  }
}
