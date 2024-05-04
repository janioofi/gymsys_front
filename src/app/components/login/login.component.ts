import { Component, OnInit } from '@angular/core';
import { Login } from '../../models/login';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [
    {provide: ToastrService, useClass: ToastrService}
  ]
})
export class LoginComponent implements OnInit {

  login: Login = {
    usuario: '',
    senha: '',
  };

  usuario = new FormControl(null, Validators.minLength(3));
  senha = new FormControl(null, Validators.minLength(3));

  constructor(
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle("Login")
  }

  logar() {
    this.service.authenticate(this.login).pipe().subscribe(res => {
      let token = JSON.parse(JSON.stringify(res)).token
      this.service.successFullLogin(token, this.login.usuario)
      this.router.navigate(['']);
    }, ((err) => {
      console.log(err.status);
      if (err.status === 403) {
        this.toastr.error('Acesso expirado ou login incorreto');
        this.service.logout();
        this.router.navigate(['login']);
      }else{
        this.toastr.error("Usuário e/ou senha inválidos")
      }
     })
    );
  }

  validaCampos(): boolean{
    return this.usuario.valid && this.senha.valid
  }
}
