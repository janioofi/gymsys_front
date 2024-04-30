import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-usuario-delete',
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
  templateUrl: './usuario-delete.component.html',
  styleUrl: './usuario-delete.component.css'
})
export class UsuarioDeleteComponent implements OnInit {
  
  usuarioModel : Usuario = {
    id_usuario: "",
    usuario: "",
    senha: "",
    perfis: []
  }

  constructor(
    private service: UsuarioService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.usuarioModel.id_usuario = this.route.snapshot.paramMap.get('id')
    this.findById();
  }

  findById(){
    this.service.findById(this.usuarioModel.id_usuario).subscribe(response => {
      response.perfis = [];
      this.usuarioModel = response;
      console.log(response)
    })
  }

  delete(): void {
    this.service.delete(this.usuarioModel.id_usuario).subscribe(
      () => {
        this.toastr.success("Usuário deletado com sucesso", "Deletado");
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
}
