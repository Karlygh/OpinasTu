import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule si usas *ngFor
import { actoresTarantino } from '../personajes/actores';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component"; // Ajusta la ruta si 'actores.ts' está en otra ubicación


@Component({
  selector: 'app-personajes',
  standalone: true, // Si estás usando componentes standalone
  imports: [CommonModule, ], // Asegúrate de importar CommonModule
  templateUrl: './personajes.component.html',
  styleUrl: './personajes.component.css'
})
export class PersonajesComponent implements OnInit {
  actores = actoresTarantino;

  constructor() { }

  ngOnInit(): void {
    console.log('Lista de actores importada:', this.actores);
  }
}