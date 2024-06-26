import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-usuario-list',
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
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.css'
})
export class UsuarioListComponent implements OnInit {

  constructor(private service: UsuarioService, private title: Title){}

  ELEMENT_DATA: Usuario[] = []

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['id_usuario', 'usuario',  'perfis', 'acoes'];
  dataSource = new MatTableDataSource<Usuario>(this.ELEMENT_DATA);

  ngOnInit(): void {
    this.title.setTitle("Usuários")
    this.findAll()
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  findAll(){
    this.service.findAll().pipe().subscribe(response => {
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<Usuario>(response)
      this.dataSource.paginator = this.paginator;
    });
  }

}
