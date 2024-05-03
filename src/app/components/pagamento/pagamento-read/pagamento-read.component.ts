import { Component, OnInit } from '@angular/core';
import { Pagamento } from '../../../models/pagamento';
import { Cliente } from '../../../models/cliente';
import { PagamentoService } from '../../../services/pagamento.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from '../../../services/cliente.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-pagamento-read',
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
    MatSelectModule
  ],
  templateUrl: './pagamento-read.component.html',
  styleUrl: './pagamento-read.component.css'
})
export class PagamentoReadComponent implements OnInit{

  pagamento: Pagamento = {
    id_pagamento: '',
    forma_pagamento: '',
    cliente: '',
    id_cliente: '',
    plano: '',
    observacao: '',
    valor: '',
    data_pagamento: '',
    data_atualizacao: ''
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

  constructor(
    private service: PagamentoService,
    private clienteService: ClienteService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.pagamento.id_pagamento = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void{
    this.service.findById(this.pagamento.id_pagamento).subscribe(response => {
      this.pagamento = response;
      this.findByIdCliente(this.pagamento.id_cliente)
    })
  }

  findByIdCliente(id_cliente: any): void {
    this.clienteService.findById(id_cliente).subscribe(
      (response) => {
        this.cliente = response;
        this.pagamento.id_cliente = this.cliente.id_cliente;
        this.pagamento.cliente = this.cliente.nome;
      }
    );
  }
}
