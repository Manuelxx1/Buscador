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
  iconUrl: string | null = null;

  constructor(private http: HttpClient) {
    this.getWeather();
  }

  getWeather(): void {
    const apiKey = 'TU_API_KEY';
    const city = 'Posadas';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    this.http.get<any>(url).subscribe({
      next: data => {
        this.temperature = data.main.temp;
        const iconCode = data.weather[0].icon;
        this.iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      },
      error: err => console.error('Error al obtener el clima:', err)
    });
  }
}
