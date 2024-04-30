import { Component, OnInit, ViewChild } from '@angular/core';
import { Profissional } from '../../../models/profissional';
import { ProfissionalService } from '../../../services/profissional.service';
import { Usuario } from '../../../models/usuario';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profissional-list',
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
  templateUrl: './profissional-list.component.html',
  styleUrl: './profissional-list.component.css'
})
export class ProfissionalListComponent implements OnInit{

  ELEMENT_DATA: Profissional[] = []

  displayedColumns: string[] = ['id_profissional', 'nome', 'sobrenome', 'cpf', 'email', 'usuario', 'acoes'];
  dataSource = new MatTableDataSource<Profissional>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private service:  ProfissionalService){}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){
    this.service.findAll().pipe().subscribe(response => {
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<Profissional>(response)
      this.dataSource.paginator = this.paginator;
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
