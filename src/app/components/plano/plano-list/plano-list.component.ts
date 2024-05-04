import { Component, OnInit, ViewChild } from '@angular/core';
import { PlanoService } from '../../../services/plano.service';
import { Plano } from '../../../models/plano';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-plano-list',
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
  templateUrl: './plano-list.component.html',
  styleUrl: './plano-list.component.css'
})
export class PlanoListComponent implements OnInit{

  ELEMENT_DATA: Plano[] = []

  displayedColumns: string[] = ['id_plano', 'descricao', 'vigencia', 'preco', 'quantidadeMeses', 'acoes'];
  dataSource = new MatTableDataSource<Plano>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: PlanoService, private title: Title){}

  ngOnInit(): void {
    this.title.setTitle("Planos")
    this.findAll();
  }

  findAll(){
    this.service.findAll().pipe().subscribe(response => {
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<Plano>(response)
      this.dataSource.paginator = this.paginator;
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
