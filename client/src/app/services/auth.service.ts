import { Injectable } from '@angular/core';
import axios, { AxiosError } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';

  
  async getMe(): Promise<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Токен отсутствует');
    }

    try {
      const response = await axios.get(`${this.apiUrl}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Ошибка при получении данных пользователя:', error);
      throw new Error(
        error.response?.data?.message || 'Ошибка сервера'
      );
    }
  }

  
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  
  logout(): void {
    localStorage.removeItem('token');
  }
}