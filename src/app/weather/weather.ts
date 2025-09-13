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
  isDay: boolean = true;
  weatherCode: number | null = null;

  constructor(private http: HttpClient) {
    this.getWeather();
  }

  getWeather(): void {
    const lat = -27.375;
    const lon = -55.875;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    this.http.get<any>(url).subscribe({
      next: data => {
        const weather = data.current_weather;
        this.temperature = weather.temperature;
        this.windSpeed = weather.windspeed;
        this.isDay = weather.is_day === 1;
        this.weatherCode = weather.weathercode;
      },
      error: err => console.error('Error al obtener datos:', err)
    });
  }

}
