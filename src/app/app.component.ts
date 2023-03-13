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
  weatherData?: WeatherData
  containerStyle = "containerColdNight"; //change to object
  randomCityIndex = Math.floor(Math.random() * cities.length)
  time = ''
  myInterval: any
  dateArr: string[]
  location: string
  cityName = 'toronto'
  sliderDate = 1
  dailyData: any


  getData(randomCity: string) {
    this.weatherService.getWeatherData(randomCity)
      .subscribe({
        next: (response) => {
          this.weatherData = response;
          console.log(response);
          this.dailyData = this.weatherService.weatherForDate(response, this.sliderDate)
          this.containerStyle = this.weatherService.containerImage(this.dailyData)
          document.body.style.backgroundColor = this.weatherService.bodyColor(this.containerStyle);
          this.time = this.weatherService.displayTime(response)
          this.dateArr = this.weatherService.arrOfDates(response)
          this.location = this.weatherService.stringTrim(response)
          this.sliderDate=1
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
      console.log(this.randomCityIndex)
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
      console.log(this.randomCityIndex)
    }, 5000);
    console.log(cities[this.randomCityIndex].name + ', ' + cities[this.randomCityIndex].country)
    console.log(this.randomCityIndex)
  }
}
