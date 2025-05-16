import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  email: string = '';
  @ViewChild('emailInput') emailInputModel: NgModel | undefined;

  constructor() { }

  enviarCorreo(isValid: boolean) {
    if (isValid && this.email.trim()) {
      alert('Gracias por suscribirte! A partir de ahora recibirás nuestras novedades en tu correo.');
      this.email = '';
      this.emailInputModel?.reset();
    } else {
      alert('Por favor, ingrese un correo electrónico.');
    }
  }
}