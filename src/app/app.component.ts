import { Component, OnInit } from '@angular/core';
import { WeatherData } from './models/weather.model';
import { WeatherService } from './services/weather.service';
import { cities } from '../environments/listOfCities'
import {
  trigger,
  state,
  style,
  transition,
  animate,
  AnimationEvent
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    // Define the custom animation trigger
    trigger('animateText', [
      // Defining the hidden state
      state('hidden', style({
        opacity: 0
      })),
      // Defining the visible state
      state('visible', style({
        opacity: 1
      })),
      // Defining the animation for state changes
      transition('hidden <=> visible', [
        animate('1s ease')
      ])
    ])
  ]
})

export class AppComponent implements OnInit {
  constructor(private weatherService: WeatherService) {

  }
  currentState = 'hidden';
  title = 'WeatherApp';
  n=1
  repeat = true;
  system = 'Metric'
  weatherData: WeatherData
  containerStyle = "containerColdNight"; //change to object
  randomCityIndex = Math.floor(Math.random() * cities.length)
  time = ''
  myInterval: any
  dateArr: string[]
  location: string
  cityName = ''
  sliderDate = 1
  dailyData: any

  onChangeDate(){
	this.onPause()
	this.getData(this.weatherData.location.name)
  }
  onChangeSystem(){
	this.onPause()
	if (this.system === 'Metric') {
		this.system = 'Imperial'
	}
	else {
		this.system = 'Metric'
	}

  }
  getData(randomCity: string) {
    this.weatherService.getWeatherData(randomCity)
      .subscribe({
        next: (response) => {
          this.weatherData = response;
          this.dailyData = this.weatherService.weatherForDate(response, this.sliderDate)
          this.containerStyle = this.weatherService.containerImage(this.dailyData)
          document.body.style.backgroundColor = this.weatherService.bodyColor(this.containerStyle);
          this.time = this.weatherService.displayTime(response)
          this.dateArr = this.weatherService.arrOfDates(response)
          this.location = this.weatherService.stringTrim(response)
        }
      })
  }
  onPause(){
      clearInterval(this.myInterval)
      this.repeat = false;

  }
  onPlay(){
    this.myInterval = setInterval(() => {
      this.getData(cities[Math.floor(Math.random() * cities.length)].name + ', ' + cities[Math.floor(Math.random() * cities.length)].country)
    }, 5000);
    this.repeat =true
  }
  onSearch(){
    this.getData(this.cityName)
    this.cityName = ""
  }

  ngOnInit() {
    this.getData(cities[Math.floor(Math.random() * cities.length)].name + ', ' + cities[Math.floor(Math.random() * cities.length)].country)
    this.myInterval = setInterval(() => {
      this.getData(cities[Math.floor(Math.random() * cities.length)].name + ', ' + cities[Math.floor(Math.random() * cities.length)].country)
    }, 5000);

  }
}
