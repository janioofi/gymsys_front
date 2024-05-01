import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfissionalService } from '../../../services/profissional.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';
import { Profissional } from '../../../models/profissional';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-profissional-update',
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
  templateUrl: './profissional-update.component.html',
  styleUrl: './profissional-update.component.css'
})
export class ProfissionalUpdateComponent {

  profissional : Profissional = {
    id_profissional: "",
    nome: "",
    sobrenome: "",
    cpf:  "",
    email: "",
    data_nascimento: "",
    data_admissao: "",
    usuario: "",
    id_usuario: "",
  }

  usuarios: Usuario[] = [];

  constructor(
    private service: ProfissionalService,
    private router: Router,
    private toastr: ToastrService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.profissional.id_profissional = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.findAllUsuarios();
  }

  nome : FormControl = new FormControl(null, [Validators.required]);
  sobrenome: FormControl = new FormControl(null, [Validators.required]);
  usuario: FormControl = new FormControl(null, [Validators.required]);
  cpf: FormControl = new FormControl(null, [Validators.required]);
  email: FormControl = new FormControl(null, Validators.email);
  data_nascimento: FormControl = new FormControl(null, Validators.required);
  data_admissao: FormControl = new FormControl(null, Validators.required);

  findById(): void{
    this.service.findById(this.profissional.id_profissional).subscribe(response => {
      this.profissional = response;
      console.log(this.profissional)
    }, ex => {
      this.toastr.error(ex.error.error)
    })
  }

  update(): void {
    this.service.update(this.profissional).subscribe(
      () => {
        this.toastr.success("Profissional atualizado com sucesso", "Atualização");
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
