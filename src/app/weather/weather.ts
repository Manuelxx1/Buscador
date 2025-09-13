import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  imports: [ CommonModule, HttpClientModule ],
  templateUrl: './weather.html',
  styleUrl: './weather.css'
})
export class Weather {
temperature: number | null = null;
  windSpeed: number | null = null;
  
    constructor(private http: HttpClient) {
    this.getWeather();
  }

  getWeather(): void {
    const lat = -27.3671;
    const lon = -55.8961;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    this.http.get<any>(url).subscribe({
      next: data => {
        this.temperature = data.current_weather.temperature;
        this.windSpeed = data.current_weather.windspeed;
      },
      error: err => console.error('Error al obtener datos de Open-Meteo:', err)
    });
  }

}
