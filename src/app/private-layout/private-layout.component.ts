import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-private-layout',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterOutlet],
  template: `
    <div class="page-container">
      <app-navbar></app-navbar>

      <div class="content-wrap">
        <router-outlet></router-outlet>
      </div>

      <app-footer></app-footer>
    </div>
  `
})
export class PrivateLayoutComponent {}
