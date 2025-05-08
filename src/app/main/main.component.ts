import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  imports: [NgFor],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
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
      ],
      activeImageIndex: 0,
      intervalId: null as any
    },
    {
      id: 2,
      name: 'Mercedes-Benz E-Class',
      price: '4 500 000 ₽',
      year: 2020,
      mileage: '45 000 км',
      images: [
        'https://10.img.avito.st/image/1/1.WgCa_ra49umsVzTsor8rT-tf9O8kX3Th7Fr06ypX_uMs.3LSoHxHXog8b-FmfV8W-w6ay9UMoah5KlBmQ2ZW2Yx8',
        'https://20.img.avito.st/image/1/1.f5QL_La40309VRF4edVl2npd0Xu1XVF1fVjRf7tV23e9.STGESAaMereoCNW3-Ek_YgrUV08L8BjiQBG4YYi8HUw',
        'https://30.img.avito.st/image/1/1.agF-_ra4xuhIVwTtJr9pTw9fxO7AX0TgCFrE6s5XzuLI.r8i0a0Lfh-BgEBT5X8X4ISwPePPY6FsGK8KRAPCCypk',
        'https://50.img.avito.st/image/1/1.VCMZ2ba4-MovcDrPPaAibGh4-syneHrCb336yKlw8MCv.6aTB4OSYRfB4BNy4TL8sPPGLiD7v0DK7qQ3feFFTILw'
      ],
      activeImageIndex: 0,
      intervalId: null as any
    },
    {
      id: 3,
      name: 'Mercedes S-class',
      price: '3 800 000 ₽',
      year: 2019,
      mileage: '60 000 км',
      images: [
        'https://avatars.mds.yandex.net/get-autoru-vos/2159521/03bdccaffa8c895ee66384d89648663f/832x624',
        'https://avatars.mds.yandex.net/get-autoru-vos/1936112/0595d644acfef8ee621e245558aa4f18/1200x900n',
        'https://avatars.mds.yandex.net/get-autoru-vos/2023939/c8756cf049e542c8921483dcbac28ff8/832x624',
        'https://avatars.mds.yandex.net/get-autoru-vos/4402921/305cd4ca1a9b76b248c7693a4732fc20/832x624',
        'https://avatars.mds.yandex.net/get-autoru-vos/2158055/cdc6fe1078634b10bbf2a259dc1eab79/832x624'
      ],
      activeImageIndex: 0,
      intervalId: null as any
    },
    {
      id: 4,
      name: 'Test Ivan',
      price: '10 ₽',
      year: 2025,
      mileage: '99 99 99 км',
      images: [
        'https://i.pinimg.com/736x/b6/5a/8f/b65a8f84db59b26b9df812ac49569bea.jpg',
        'https://i.pinimg.com/736x/75/c7/5f/75c75f1840f8175af77a8ff7ebd015ec.jpg',
      ],
      activeImageIndex: 0,
      intervalId: null as any
    },
    {
      id: 5,
      name: 'Maga Magaev',
      price: '99 ₽',
      year: 2000,
      mileage: '0 км',
      images: [
        'https://i.pinimg.com/736x/75/c7/5f/75c75f1840f8175af77a8ff7ebd015ec.jpg',
        'https://i.pinimg.com/736x/b6/5a/8f/b65a8f84db59b26b9df812ac49569bea.jpg',
      ],
      activeImageIndex: 0,
      intervalId: null as any
    }
  ];

  startSlider(index: number) {
    
    this.stopSlider(index);
    
    
    this.products[index].intervalId = setInterval(() => {
      this.nextImage(index);
    }, 2000); 
  }

  stopSlider(index: number) {
    if (this.products[index].intervalId) {
      clearInterval(this.products[index].intervalId);
      this.products[index].intervalId = null;
    }
  }

  nextImage(index: number) {
    const product = this.products[index];
    product.activeImageIndex = (product.activeImageIndex + 1) % product.images.length;
  }

  setActiveImage(productIndex: number, imageIndex: number) {
    this.products[productIndex].activeImageIndex = imageIndex;
    
    this.startSlider(productIndex);
  }
}