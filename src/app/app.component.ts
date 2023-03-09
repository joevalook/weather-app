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
  containerStyle = "containerHotDay" //change to object
  ngOnInit() {
		this.weatherService.getWeatherData('honolulu')
		.subscribe({
			next: (response) => {
				this.weatherData = response;
				console.log(response)
				console.log(response.current.condition.text.toLowerCase().includes('thunder') ? 'thunder': '');
				if (response.current.condition.text.toLowerCase().includes('thunder')) {
					this.containerStyle="containerThunder";
					document.body.style.backgroundColor = "rgb(176, 123, 77);";//change back to thunder
					console.log((<any>document.getElementsByClassName("container"))) 
				}
				if (response.current.condition.text.toLowerCase().includes('thunder')) {
					this.containerStyle="containerThunder";
					document.body.style.backgroundColor = "rgb(176, 123, 77);";//change back to thunder
					console.log((<any>document.getElementsByClassName("container"))) 
				}
			}
		})
	}
}
