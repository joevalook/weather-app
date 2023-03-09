import { Component, OnInit } from '@angular/core';
import { WeatherData } from './models/weather.model';
import { WeatherService } from './services/weather.service';

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
	
	ngOnInit() {
		this.weatherService.getWeatherData('Izegem')
			.subscribe({
				next: (response) => {
					this.weatherData = response;
					console.log(response);
					console.log(this.weatherService.isDay(response))
					
					if (response.current.condition.text.toLowerCase().includes('thunder')) {
						this.containerStyle = "containerThunder";
					}
					else if (response.current.condition.text.toLowerCase().includes('snow') && this.weatherService.isDay(response)) {
						this.containerStyle = "containerSnowDay";
					}
					else if (response.current.condition.text.toLowerCase().includes('snow') && !this.weatherService.isDay(response)) {
						this.containerStyle = "containerSnowNight";
					}
					else if (response.current.condition.text.toLowerCase().includes('rain') && this.weatherService.isDay(response)) {
						console.log('hi')
						this.containerStyle = "containerRainDay";
					}
					else if (response.current.condition.text.toLowerCase().includes('rain') && !this.weatherService.isDay(response)) {
						this.containerStyle = "containerRainNight";
					}
					else if (response.current.condition.text.toLowerCase().includes('fog')) {
						this.containerStyle = "containerFoggy";
					}
					else if (Number(response.current.wind_mph) > 30 && Number(response.current.temp_c) > 0 && this.weatherService.isDay(response)) {
						this.containerStyle = "containerWindyDay";
					}
					else if (response.current.condition.text.toLowerCase().includes('cloud') && this.weatherService.isDay(response)) {
						this.containerStyle = "containerCloudyDay";
					}
					else if (response.current.condition.text.toLowerCase().includes('cloud') && !this.weatherService.isDay(response)) {
						this.containerStyle = "containerCloudyNight";
					}
					else if (Number(response.current.humidity) < 40 && Number(response.current.temp_c) > 30 && this.weatherService.isDay(response)) {
						this.containerStyle = "containerDesertDay";
					}
					else if (Number(response.current.wind_mph) > 20 && Number(response.current.temp_c) > 10 && this.weatherService.isDay(response)) {
						this.containerStyle = "containerWindyDay";
					}

					else if (Number(response.current.temp_c) > 25 && this.weatherService.isDay(response)) {
						this.containerStyle = "containerHotDay";
					}
					else if (Number(response.current.temp_c) < -10 && this.weatherService.isDay(response)) {
						this.containerStyle = "containerColdDay";
					}
					else if (Number(response.current.temp_c) < -10 && !this.weatherService.isDay(response)) {
						this.containerStyle = "containerColdNight";
					}
					else if (this.weatherService.isDay(response)) {
						this.containerStyle = "containerRegularDay";
					}
					else {
						this.containerStyle = "containerRegularNight";
					}
					document.body.style.backgroundColor = this.weatherService.bodyColor(this.containerStyle);
				}
			})
	}
}
