import { Component } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-usuario-update',
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
  ],
  templateUrl: './usuario-update.component.html',
  styleUrl: './usuario-update.component.css'
})
export class UsuarioUpdateComponent {

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
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.usuarioModel.id_usuario = this.route.snapshot.paramMap.get('id')
    this.findById();
  }

  addPerfil(perfil: any): void{
    if(this.usuarioModel.perfis.includes(perfil)){
      this.usuarioModel.perfis.splice(this.usuarioModel.perfis.indexOf(perfil), 1)
    }else{
      this.usuarioModel.perfis.push(perfil)
    }
  }

  findById(){
    this.service.findById(this.usuarioModel.id_usuario).subscribe(response => {
      response.perfis = [];
      this.usuarioModel = response;
      this.usuarioModel.senha = '';
    })
  }

  update(): void {
    this.service.update(this.usuarioModel).subscribe(
      () => {
        this.toastr.success("Usuário atualizado com sucesso", "Atualização");
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
