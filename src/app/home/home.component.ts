import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CarbrandComponent } from "../carbrand/carbrand.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, CarbrandComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
