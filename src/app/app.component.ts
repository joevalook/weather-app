import { Component, OnInit } from '@angular/core';
import { WeatherData } from './models/weather.model';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private weatherService: WeatherService) {

  }
  title = 'WeatherApp';
  n = 13;
  system = 'Metric'
  weatherData?: WeatherData
  ngOnInit() {
		this.weatherService.getWeatherData('Yakutsk')
		.subscribe({
			next: (response) => {
				this.weatherData = response;
				console.log(response);
			}
		})
	}
}
