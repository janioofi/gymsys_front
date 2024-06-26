import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{

  login: String = localStorage.getItem('usuario')

  constructor(private router: Router, private authService: AuthService, private toast: ToastrService){}

  ngOnInit(): void{
    this.router.navigate(['home'])
  }

  logout(){
    this.router.navigate(['login'])
    this.authService.logout();
    this.toast.info("Logout realizado com sucesso", "Logout", {timeOut: 10000})
  }


  showFiller = false;
}
