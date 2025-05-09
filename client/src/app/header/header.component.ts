import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userEmail: string | null = null;
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      this.authService.getMe().then(
        (response) => {
          this.userEmail = response.user.email;
        },
        (error) => {
          console.error('Ошибка при получении данных пользователя:', error);
          this.isAuthenticated = false;
          this.userEmail = null;
          this.authService.logout(); 
        }
      );
    }
  }

  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    this.userEmail = null;
  }
}