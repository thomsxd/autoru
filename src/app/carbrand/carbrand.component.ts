import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carbrand',
  imports: [RouterLink, NgFor],
  templateUrl: './carbrand.component.html',
  styleUrl: './carbrand.component.scss'
})
export class CarbrandComponent {
  mainFilters = ['Все', 'Новые', 'С пробегом'];
  subFilters = ['Марки', 'Помощник'];

  activeMainFilter = this.mainFilters[0];
  activeSubFilter = this.subFilters[0];

  setActiveMainFilter(filter: string): void {
    this.activeMainFilter = filter;
  }

  setActiveSubFilter(filter: string): void {
    this.activeSubFilter = filter;
  }
}