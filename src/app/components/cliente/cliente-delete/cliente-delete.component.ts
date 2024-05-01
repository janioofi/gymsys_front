import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../models/cliente';
import { Plano } from '../../../models/plano';
import { ClienteService } from '../../../services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PlanoService } from '../../../services/plano.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-cliente-delete',
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
  templateUrl: './cliente-delete.component.html',
  styleUrl: './cliente-delete.component.css'
})
export class ClienteDeleteComponent implements OnInit{

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

  constructor(
    private service: ClienteService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private planoService: PlanoService
  ){}

  ngOnInit(): void {
    this.cliente.id_cliente = this.route.snapshot.paramMap.get('id')
    this.findById();
  }

  findById(){
    this.service.findById(this.cliente.id_cliente).subscribe(response => {
      this.cliente = response;
    })
  }

  findAllPlanos(){
    this.planoService.findAll().pipe().subscribe(response => {
      this.planos = response;
    });
  }

  delete(): void {
    this.service.delete(this.cliente.id_cliente).subscribe(
      () => {
        this.toastr.success("Cliente deletado com sucesso", "Deletado");
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
}
