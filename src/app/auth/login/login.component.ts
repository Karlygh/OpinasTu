import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule, RouterModule]
})
export class LoginComponent {
  email = '';
  password = '';
  loginError = '';

  constructor(private router: Router) {}

  onSubmit() {
    // Verificación simple local
    if (this.email === 'admin' && this.password === 'admin') {
      // Guardamos en el localStorage que el usuario está autenticado
      localStorage.setItem('isAuthenticated', 'true');
      this.router.navigate(['/home']);
    } else {
      this.loginError = 'Credenciales incorrectas (usa admin/admin)';
    }
  }

  onRegister() {
    this.router.navigate(['/register']);
  }
}
