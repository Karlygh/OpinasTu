import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OpinionesService {

  // Array local para guardar las opiniones
  private opiniones: any[] = [];

  // Agrega una nueva opinión al array
  agregarOpinion(opinion: any) {
    this.opiniones.push(opinion);
  }

  // Devuelve una copia del array de opiniones
  obtenerOpiniones(): any[] {
    return [...this.opiniones];
  }

  // Actualiza la opinión en el índice especificado
  actualizarOpinion(index: number, opinion: any) {
    if (index >= 0 && index < this.opiniones.length) {
      this.opiniones[index] = opinion;
    }
  }

  // Elimina la opinión en el índice especificado
  eliminarOpinion(index: number) {
    if (index >= 0 && index < this.opiniones.length) {
      this.opiniones.splice(index, 1);
    }
  }
}
