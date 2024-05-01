import { Component, ViewChild } from '@angular/core';
import { Pagamento } from '../../../models/pagamento';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ClienteService } from '../../../services/cliente.service';
import { PagamentoService } from '../../../services/pagamento.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagamento-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './pagamento-list.component.html',
  styleUrl: './pagamento-list.component.css'
})
export class PagamentoListComponent {

  ELEMENT_DATA: Pagamento[] = []

  displayedColumns: string[] = ['id_pagamento', 'cliente', 'data_pagamento', 'forma_pagamento', 'valor','acoes'];
  dataSource = new MatTableDataSource<Pagamento>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service:  PagamentoService){}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){
    this.service.findAll().pipe().subscribe(response => {
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<Pagamento>(response)
      this.dataSource.paginator = this.paginator;
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}