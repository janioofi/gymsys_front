import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild, inject } from '@angular/core';
import { Acesso } from '../../models/acesso';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AcessoService } from '../../services/acesso.service';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerIntl, MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {DateAdapter, provideNativeDateAdapter} from '@angular/material/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    RouterLink,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [
    provideNativeDateAdapter()
  ]
})
export class HomeComponent implements OnInit{

  httpClient = inject(HttpClient)
  option = false;
  data_inicio = "";
  data_final = "";

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ELEMENT_DATA: Acesso[] = []

  displayedColumns: string[] = ['cliente', 'cpf', 'data_registro', 'tipoRegistro'];
  dataSource = new MatTableDataSource<Acesso>(this.ELEMENT_DATA);

  constructor(private service: AcessoService){}

  ngOnInit(){
    this.treinandoAgora()
  }

  treinandoAgora(){
    this.option = false;
    this.service.treinandoAgora().pipe().subscribe(response => {
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<Acesso>(response)
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  acessosDoDia(){
    this.option = false;
    this.service.acessosDoDia().pipe().subscribe(response => {
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<Acesso>(response)
      this.dataSource.paginator = this.paginator;
    });
  }

  acessosPorPeriodo(){
    this.option = true;
    this.service.acessosPorPeriodo(this.data_inicio, this.data_final).pipe().subscribe(response => {
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<Acesso>(response)
      this.dataSource.paginator = this.paginator;
    });
  }

}
