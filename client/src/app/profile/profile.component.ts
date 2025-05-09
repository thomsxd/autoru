import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: { email: string; name: string; isVerified: boolean } | null = null;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.authService.getMe().then(
      (response) => {
        this.user = response.user;
      },
      (error) => {
        this.errorMessage = error.message || 'Ошибка при загрузке данных профиля';
        this.router.navigate(['/login']);
      }
    );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}