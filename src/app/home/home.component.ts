import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { PeliculaService } from '../servicios/pelicula.service';
import { OpinionesService } from '../servicios/opiniones.service';


import { FiltroGeneroComponent } from '../filtro-genero/filtro-genero.component';

//Root
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FiltroGeneroComponent,
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  peliculas: any[] = [];
  peliculasFiltradas: any[] = [];
  peliculasPagina: any[] = [];
  paginaActual: number = 1;
  peliculasPorPagina: number = 6;
  totalPaginas: number = 0;
  terminoBusqueda: string = '';

  nombre: string = '';
  opinion: string = '';
  nota: number = 0;
  peliSeleccionada: any = null;
  id: number = 0;

  constructor(
    private peliculaService: PeliculaService,
    private opinionesService: OpinionesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.peliculaService.getPeliculas().subscribe({
      next: (data) => {
        this.peliculas = data.movies.map((peli: any, index: number) => ({
          ...peli,
          id: peli.id ?? index
        }));
        this.peliculasFiltradas = [...this.peliculas];
        this.inicializarPaginacion();
      },
      error: (err) => console.error(err)
    });
  }

  onPeliculasFiltradas(filtradas: any[]) {
    this.peliculasFiltradas = filtradas;
    this.paginaActual = 1;
    this.inicializarPaginacion();
  }

  inicializarPaginacion() {
    this.totalPaginas = Math.ceil(this.peliculasFiltradas.length / this.peliculasPorPagina);
    this.actualizarPeliculasPagina();
  }

  actualizarPeliculasPagina() {
    const inicio = (this.paginaActual - 1) * this.peliculasPorPagina;
    const fin = inicio + this.peliculasPorPagina;
    this.peliculasPagina = this.peliculasFiltradas.slice(inicio, fin);
  }

  cambiarPagina(pagina: number) {
    if (pagina > 0 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
      this.actualizarPeliculasPagina();
      
      const container = document.querySelector('.container'); // Ajusta el selector
      container?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  filtrarPeliculasPorTitulo() {
    const termino = this.terminoBusqueda.trim().toLowerCase();
  
    this.peliculasFiltradas = this.peliculas.filter(peli =>
      peli.title.toLowerCase().includes(termino)
    );
  
    this.paginaActual = 1;
    this.inicializarPaginacion();
  }
  
  

  getRangoPaginas(): number[] {
    const paginas: number[] = [];
    const paginasAMostrar = 5;

    let inicio = Math.max(1, this.paginaActual - Math.floor(paginasAMostrar / 2));
    let fin = Math.min(this.totalPaginas, inicio + paginasAMostrar - 1);

    if (fin - inicio + 1 < paginasAMostrar) {
      inicio = Math.max(1, fin - paginasAMostrar + 1);
    }

    for (let i = inicio; i <= fin; i++) {
      paginas.push(i);
    }

    return paginas;
  }

  seleccionarPeli(peli: any) {
    this.peliSeleccionada = peli;
    this.nombre = '';
    this.opinion = '';
    this.nota = 0;
  }
  enviar() {
    if (this.nombre && this.opinion && this.peliSeleccionada && this.nota >= 1 && this.nota <= 10) {
      const nuevaOpinion = {
        name: this.nombre,
        opinion: this.opinion,
        nota: this.nota,
        titulo: this.peliSeleccionada.title
      };

      console.log('Opinión a enviar al servicio:', nuevaOpinion);
      this.opinionesService.agregarOpinion(nuevaOpinion);
      this.router.navigate(['/mis-opiniones']);
      this.nombre = '';
      this.opinion = '';
      this.nota = 0;
      this.peliSeleccionada = null;
    } else {
      alert('Por favor, completa todos los campos, incluyendo la nota (1-10).');
    }
  }
  
  verDetalles(movieId: number) {
    if (movieId) {
      this.router.navigate([`/details-list/${movieId}`]);
    } else {
      console.error('ID de película inválido');
    }
  }
}
