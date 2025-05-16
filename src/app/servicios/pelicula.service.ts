import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PeliculaService {

  // URL del backend o Mockoon donde se consultan las películas
  private apiUrl = 'assets/peliculas.json';;

  constructor(private http: HttpClient) {}

  // Obtiene la lista completa de películas
  getPeliculas(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Obtiene solo los títulos (asume que el backend responde con { titulos: [...] })
  getTitulos(): Observable<string[]> {
    return this.http.get<{ titulos: string[] }>(this.apiUrl)
      .pipe(map(data => data.titulos));
  }
}
