import { NgIf } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import axios from 'axios';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  email: string = '';
  code: string = '';
  isCodeStep: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private titleService: Title, private metaService: Meta, private router: Router) {}

  ngOnInit(): void {
    this.titleService.setTitle('Вход в систему');
    this.metaService.updateTag({
      name: 'description',
      content: 'Страница входа в систему для пользователей',
    });
    this.metaService.updateTag({
      name: 'keywords',
      content: 'вход, авторизация, логин',
    });
  }

  async requestAuthCode(): Promise<void> {
    if (!this.email) {
      this.errorMessage = 'Введите email или телефон';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      await axios.post('http://localhost:8080/auth', { email: this.email });
      this.isCodeStep = true;
    } catch (error: any) {
      this.errorMessage = error.response?.data?.message || 'Ошибка при запросе кода';
    } finally {
      this.isLoading = false;
    }
  }

  async verifyCode(): Promise<void> {
    if (this.code.length !== 6) {
      this.errorMessage = 'Код должен состоять из 6 цифр';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const response = await axios.post('http://localhost:8080/auth/verify-code', {
        email: this.email,
        code: this.code,
      });
      const { token } = response.data;
     this.router.navigate(['/']);
      localStorage.setItem('token', token); 
      
      
    } catch (error: any) {
      this.errorMessage = error.response?.data?.message || 'Неверный код';
    } finally {
      this.isLoading = false;
    }
  }

  goBack(): void {
    this.isCodeStep = false;
    this.code = '';
    this.errorMessage = '';
  }
}