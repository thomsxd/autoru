import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  constructor(
    private titleService: Title,
    private metaService: Meta,

  ) {}

  ngOnInit(): void {
     this.titleService.setTitle("Вход в систему")
     this.metaService.updateTag({name: "description", content: 'Страница входа в систему для пользователей'})
     this.metaService.updateTag({ name: 'keywords', content: 'вход, авторизация, логин' })
  }

}
