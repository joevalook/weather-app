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


  getData(randomCityIndex: number) {
    this.weatherService.getWeatherData(cities[randomCityIndex].name + ', ' + cities[randomCityIndex].country)
      .subscribe({
        next: (response) => {
          this.weatherData = response;
          console.log(response);

          this.containerStyle = this.weatherService.containerImage(response)
          document.body.style.backgroundColor = this.weatherService.bodyColor(this.containerStyle);
          this.time = this.weatherService.displayTime(response)
          this.dateArr = this.weatherService.arrOfDates(response)
          this.location = this.weatherService.stringTrim(response)
        }
      })
  }
  repeatClick(){
    if (this.repeat) {
      this.repeat = false
      clearInterval(this.myInterval)
    }
    else {
      this.repeat = true
      this.myInterval = setInterval(() => {
        this.getData(Math.floor(Math.random() * cities.length))
        console.log(this.randomCityIndex)
      }, 5000);
    }

  }

  ngOnInit() {
    this.getData(this.randomCityIndex)
    this.myInterval = setInterval(() => {
      this.getData(Math.floor(Math.random() * cities.length))
      console.log(this.randomCityIndex)
    }, 5000);
    console.log(cities[this.randomCityIndex].name + ', ' + cities[this.randomCityIndex].country)
    console.log(this.randomCityIndex)
  }
}
