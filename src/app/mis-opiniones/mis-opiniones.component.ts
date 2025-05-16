import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Servicios para manejar opiniones y películas
import { OpinionesService } from '../servicios/opiniones.service';
import { PeliculaService } from '../servicios/pelicula.service';

@Component({
  selector: 'app-mis-opiniones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mis-opiniones.component.html',
  styleUrls: ['./mis-opiniones.component.css']
})
export class MisOpinionesComponent implements OnInit {

  // Lista de opiniones del usuario
  opiniones: any[] = [];

  // Índice de la opinión que se está editando (null si no se edita ninguna)
  editandoIndex: number | null = null;

  // Opinión actualmente en modo edición
  opinionEditada: any = {};

  // Modelo para una nueva opinión (para el modal)
  nuevaOpinion = {
    titulo: '',
    name: '',
    opinion: '',
    nota: null
  };

  // Lista de películas disponibles (se carga desde el servicio)
  peliculas: string[] = [];

  constructor(
    private opinionesService: OpinionesService,
    private peliculaService: PeliculaService
  ) {}

  // Al iniciar, cargamos las opiniones y los títulos de películas
  ngOnInit(): void {
    this.cargarOpiniones();
    this.peliculaService.getTitulos().subscribe((data) => {
      this.peliculas = data;
    });
  }

  // Obtiene las opiniones desde el servicio
  cargarOpiniones() {
    this.opiniones = this.opinionesService.obtenerOpiniones();
  }

  // Activa el modo edición para una opinión
  editarOpinion(index: number) {
    this.editandoIndex = index;
    this.opinionEditada = { ...this.opiniones[index] }; // Clonamos el objeto para evitar mutaciones directas
  }

  // Guarda los cambios realizados en la opinión editada
  guardarEdicion() {
    if (this.editandoIndex !== null) {
      this.opinionesService.actualizarOpinion(this.editandoIndex, this.opinionEditada);
      this.cargarOpiniones(); // Refresca la lista después de editar
      this.cancelarEdicion();
    }
  }

  // Cancela la edición y limpia el formulario de edición
  cancelarEdicion() {
    this.editandoIndex = null;
    this.opinionEditada = {};
  }

  // Elimina una opinión con confirmación previa
  eliminarOpinion(index: number) {
    if (confirm('¿Estás seguro de eliminar esta opinión?')) {
      this.opinionesService.eliminarOpinion(index);
      this.opiniones = this.opinionesService.obtenerOpiniones(); // Refresca la vista
    }
  }

  // Calcula el Top 3 opiniones según nota (de mayor a menor)
  obtenerTop3() {
    return [...this.opiniones]
      .sort((a, b) => b.nota - a.nota)
      .slice(0, 3);
  }

  // Agrega una nueva opinión desde el modal
  agregarNuevaOpinion() {
    const { titulo, name, opinion, nota } = this.nuevaOpinion;

    // Validación simple de campos
    if (titulo.trim() && name.trim() && opinion.trim() && nota !== null && nota >= 1 && nota <= 10) {
      this.opinionesService.agregarOpinion({ ...this.nuevaOpinion });
      this.nuevaOpinion = { titulo: '', name: '', opinion: '', nota: null }; // Limpia el formulario
      this.cargarOpiniones(); // Refresca la lista
    } else {
      alert('Por favor completa todos los campos correctamente');
    }
  }

}
