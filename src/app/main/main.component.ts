import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  imports: [NgFor],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  products = [
    {
      id: 1,
      name: 'BMW M5 VI (F90)',
      price: '7 150 000 ₽',
      year: 2018,
      mileage: '105 000 км',
      images: [
        'https://avatars.mds.yandex.net/get-autoru-vos/4387583/d8f9005e82006f1f4fdc130a352d7eab/320x240',
        'https://avatars.mds.yandex.net/get-autoru-vos/2179995/0b893671d70114e66a1d47d572871bc3/832x624',
        'https://avatars.mds.yandex.net/get-autoru-vos/5993563/ef7413bdd9925ade34f9971347d6ca82/832x624',
        'https://avatars.mds.yandex.net/get-autoru-vos/4387583/d8f9005e82006f1f4fdc130a352d7eab/320x240'
      ]
    },
    {
      id: 2,
      name: 'Mercedes-Benz E-Class',
      price: '4 500 000 ₽',
      year: 2020,
      mileage: '45 000 км',
      images: [
        'https://avatars.mds.yandex.net/get-autoru-vos/4387583/d8f9005e82006f1f4fdc130a352d7eab/320x240',
        'https://avatars.mds.yandex.net/get-autoru-vos/2179995/0b893671d70114e66a1d47d572871bc3/832x624',
        'https://avatars.mds.yandex.net/get-autoru-vos/5993563/ef7413bdd9925ade34f9971347d6ca82/832x624',
        'https://avatars.mds.yandex.net/get-autoru-vos/4387583/d8f9005e82006f1f4fdc130a352d7eab/320x240'
      ]
    },
    {
      id: 3,
      name: 'Audi A6',
      price: '3 800 000 ₽',
      year: 2019,
      mileage: '60 000 км',
      images: [
        'https://avatars.mds.yandex.net/get-autoru-vos/4387583/d8f9005e82006f1f4fdc130a352d7eab/320x240',
        'https://avatars.mds.yandex.net/get-autoru-vos/2179995/0b893671d70114e66a1d47d572871bc3/832x624',
        'https://avatars.mds.yandex.net/get-autoru-vos/5993563/ef7413bdd9925ade34f9971347d6ca82/832x624',
        'https://avatars.mds.yandex.net/get-autoru-vos/4387583/d8f9005e82006f1f4fdc130a352d7eab/320x240'
      ]
    }
  ];
}