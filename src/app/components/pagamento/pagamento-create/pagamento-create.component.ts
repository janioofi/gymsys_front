import { Cliente } from './../../../models/cliente';
import { Component, OnInit } from '@angular/core';
import { Pagamento } from '../../../models/pagamento';
import { PagamentoService } from '../../../services/pagamento.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from '../../../services/cliente.service';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pagamento-create',
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
    CommonModule,
    MatSelectModule,
  ],
  templateUrl: './pagamento-create.component.html',
  styleUrl: './pagamento-create.component.css',
})
export class PagamentoCreateComponent implements OnInit {
  pagamento: Pagamento = {
    id_pagamento: '',
    forma_pagamento: '',
    cliente: '',
    id_cliente: '',
    plano: '',
    observacao: '',
    valor: '',
    data_pagamento: '',
    data_atualizacao: '',
  };

  cliente: Cliente = {
    id_cliente: '',
    nome: '',
    sobrenome: '',
    apelido: '',
    cpf: '',
    email: '',
    data_nascimento: '',
    plano: '',
    id_plano: '',
  };

  forma_pagamento: FormControl = new FormControl(null, [Validators.required]);
  cpf: string;
  valor: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private service: PagamentoService,
    private router: Router,
    private toastr: ToastrService,
    private clienteService: ClienteService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Criando Pagamento');
  }

  ativar(): void {
    this.findByCPF();
  }

  create(): void {
    this.service.create(this.pagamento).subscribe(
      () => {
        this.toastr.success('Pagamento registrado com sucesso', 'Registrado');
        this.router.navigate(['pagamentos']);
      },
      (ex) => {
        console.log(ex);
        if (ex.error.errors) {
          ex.error.errors.forEach((element) => {
            this.toastr.error(element.message);
          });
        } else {
          this.toastr.error(ex.error);
        }
      }
    );
  }

  findByCPF(): void {
    this.clienteService.findByCPF(this.cpf).subscribe(
      (response) => {
        this.cliente = response;
        this.pagamento.id_cliente = this.cliente.id_cliente;
        this.pagamento.cliente = this.cliente.nome;
        this.create();
      },
      (ex) => {
        console.log(ex);
        if (ex.error.errors) {
          ex.error.errors.forEach((element) => {
            this.toastr.error(element.message);
          });
        } else {
          this.toastr.error(ex.error);
        }
      }
    );
  }

  validaCampos(): boolean {
    return this.forma_pagamento.valid && this.valor.valid;
  }
}
