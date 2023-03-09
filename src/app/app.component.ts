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
  containerStyle = "containerSnowDay" //change to object
  ngOnInit() {
		this.weatherService.getWeatherData('Haskell, Texas')
		.subscribe({
			next: (response) => {
				this.weatherData = response;
				console.log(response.forecast.forecastday[0].day.condition.text.toLowerCase().includes('thunder'));
				if (response.forecast.forecastday[0].day.condition.text.toLowerCase().includes('thunder')) {
					//this.containerStyle="containerThunder";
					document.body.style.backgroundColor = "rgb(83, 170, 196)";//change back to thunder
					console.log((<any>document.getElementsByClassName("container"))) 

				}
			}
		})
	}
}
