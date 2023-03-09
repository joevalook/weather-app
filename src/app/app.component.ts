import { Component, OnInit } from '@angular/core';
import { WeatherData } from './models/weather.model';
import { WeatherService } from './services/weather.service';
import { cities } from '../environments/listOfCities'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	constructor(private weatherService: WeatherService) {

	}
	title = 'WeatherApp';
	n = 13;
	system = 'Metric'
	weatherData?: WeatherData
	containerStyle = "containerColdNight"; //change to object
	randomCityIndex = Math.floor(Math.random()*cities.length)
	time = ''
	
	ngOnInit() {
		console.log(cities[this.randomCityIndex].name + ', ' + cities[this.randomCityIndex].country)
		this.weatherService.getWeatherData(cities[this.randomCityIndex].name + ', ' + cities[this.randomCityIndex].country)
			.subscribe({
				next: (response) => {
					this.weatherData = response;
					console.log(response);
					console.log(this.weatherService.isDay(response))
					this.containerStyle = this.weatherService.containerImage(response)
					document.body.style.backgroundColor = this.weatherService.bodyColor(this.containerStyle);
					this.time = this.weatherService.displayTime(response)
				}
			})
	}
}
