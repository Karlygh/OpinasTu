import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'app-filtro-genero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filtro-genero.component.html',
  styleUrls: ['./filtro-genero.component.css']
})
export class FiltroGeneroComponent implements OnChanges {
  @Input() peliculas: any[] = [];
  @Output() peliculasFiltradas = new EventEmitter<any[]>();

  generosDisponibles: string[] = [];
  generoSeleccionado: string = '';

  ngOnChanges() {
    if (this.peliculas.length) {
      this.extraerGenerosUnicos();
    }
  }

  extraerGenerosUnicos() {
    const todosGeneros = this.peliculas.flatMap(p => p.genre);
    this.generosDisponibles = [...new Set(todosGeneros)].sort();
  }

  filtrarPorGenero(genero: string) {
    this.generoSeleccionado = genero;
    const filtradas = genero
      ? this.peliculas.filter(p => p.genre.includes(genero))
      : this.peliculas;
    this.peliculasFiltradas.emit(filtradas);
  }

  limpiarFiltro() {
    this.generoSeleccionado = '';
    this.peliculasFiltradas.emit(this.peliculas);
  }
}
