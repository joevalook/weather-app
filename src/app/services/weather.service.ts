import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from '../../environments/environment'
import { WeatherData } from '../models/weather.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherData(city: string): Observable<WeatherData> {
    return this.http.get<WeatherData>(environment.weatherApiBaseUrl, {
      headers: new HttpHeaders()
      .set(environment.XRapidAPIHostHeaderName, environment.XRapidAPIHostHeaderValue)
      .set(environment.XRapidAPIKeyHeaderName, environment.XRapidAPIKeyHeaderValue),
      params: new HttpParams()
      .set('q', city)
      .set('days', 1)
    })
  }
  isDay(response: WeatherData): Boolean {
		let currentTime = response.location.localtime.split(" ")[1]
		if (currentTime[1] ===':') {
			currentTime = '0' + response.location.localtime.split(" ")[1]
		}
		let sunrise = response.forecast.forecastday[0].astro.sunrise
		if (sunrise[sunrise.length - 2] === 'A'){
			sunrise = sunrise.substring(0, 5)
		}
		else {
			sunrise = String(Number(sunrise.substring(0,2)) + 12) + sunrise.substring(2,5);
		}
		console.log("Sunrise " + sunrise)
		let sunset = response.forecast.forecastday[0].astro.sunset
		if (sunset[sunset.length - 2] === 'A'){
			sunset = sunset.substring(0, 5)
		}
		else {
			sunset = String(Number(sunset.substring(0,2)) + 12) + sunset.substring(2,5);
		}
		console.log("Sunset " + sunset)
		if (currentTime > sunrise && currentTime < sunset) {
			return true
		}
		else {
			return false
		}
	}
  displayTime(response: WeatherData): string {
    let currentTime = response.location.localtime.split(" ")[1]
    let bigTime = ''
    if (currentTime[1] ===':') {
			currentTime = '0' + response.location.localtime.split(" ")[1]
		}
    console.log("Current time: " + currentTime)
    if (Number(currentTime.substring(0,2)) <= 12 ) {
      if (currentTime.substring(0,2) == '00') {
        return ('12' + currentTime.substring(2,5) + ' AM')
      }
      if (currentTime.substring(0,1) == '0') {
        return (currentTime.substring(1,5) + ' AM')
      }
      else {
        return (currentTime + ' AM')
      }
    }
    else {
      return (String(Number(currentTime.substring(0,2)) - 12) + currentTime.substring(2,5) + ' PM')
    }
  }

  bodyColor(color: string): string {
    if (color === 'containerThunder'){
      return('rgb(79, 77, 100)')
    }
    else if (color === 'containerSnowDay'){
      return('rgb(83, 170, 196)')
    }
    else if (color === 'containerSnowNight'){
      return('rgb(26, 95, 118)')
    }
    else if (color === 'containerRainDay'){
      return('rgb(53, 123, 147)')
    }
    else if (color === 'containerRainNight'){
      return('rgb(63, 133, 156)')
    }
    else if (color === 'containerFoggy'){
      return('rgb(56, 196, 209)')
    }
    else if (color === 'containerCloudyDay'){
      return('rgb(103, 210, 227)')
    }
    else if (color === 'containerCloudyNight'){
      return('rgb(36, 51, 95)')
    }
    else if (color === 'containerDesertDay'){
      return('rgb(219, 124, 41)')
    }
    else if (color === 'containerWindyDay'){
      return('rgb(70, 102, 209)')
    }
    else if (color === 'containerHotDay'){
      return('rgb(176, 123, 77)')
    }
    else if (color === 'containerColdDay'){
      return('rgb(22, 152, 222)')
    }
    else if (color === 'containerColdNight'){
      return('rgb(67, 141, 220)')
    }
    else if (color === 'containerRegularDay'){
      return('rgb(67, 141, 220)')
    }
    else {
      return('rgb(25, 109, 77)')
    }
  }

  containerImage(response: WeatherData): string {
    if (response.current.condition.text.toLowerCase().includes('thunder')) {
      return "containerThunder";
    }
    else if (response.current.condition.text.toLowerCase().includes('snow') && this.isDay(response)) {
      return "containerSnowDay";
    }
    else if (response.current.condition.text.toLowerCase().includes('snow') && !this.isDay(response)) {
      return "containerSnowNight";
    }
    else if (response.current.condition.text.toLowerCase().includes('rain') && this.isDay(response)) {
      console.log('hi')
      return "containerRainDay";
    }
    else if (response.current.condition.text.toLowerCase().includes('rain') && !this.isDay(response)) {
      return "containerRainNight";
    }
    else if (response.current.condition.text.toLowerCase().includes('fog')) {
      return "containerFoggy";
    }
    else if (Number(response.current.wind_mph) > 30 && Number(response.current.temp_c) > 0 && this.isDay(response)) {
      return "containerWindyDay";
    }
    else if ((response.current.condition.text.toLowerCase().includes('cloud') || (response.current.condition.text.toLowerCase().includes('overcast'))) && this.isDay(response)) {
      return "containerCloudyDay";
    }
    else if ((response.current.condition.text.toLowerCase().includes('cloud') || (response.current.condition.text.toLowerCase().includes('overcast'))) && !this.isDay(response)) {
      return "containerCloudyNight";
    }
    else if (Number(response.current.humidity) < 40 && Number(response.current.temp_c) > 30 && this.isDay(response)) {
      return "containerDesertDay";
    }
    else if (Number(response.current.wind_mph) > 20 && Number(response.current.temp_c) > 10 && this.isDay(response)) {
      return "containerWindyDay";
    }
    else if (Number(response.current.temp_c) > 25 && this.isDay(response)) {
      return "containerHotDay";
    }
    else if (Number(response.current.temp_c) < -10 && this.isDay(response)) {
      return "containerColdDay";
    }
    else if (Number(response.current.temp_c) < -10 && !this.isDay(response)) {
      return "containerColdNight";
    }
    else if (this.isDay(response)) {
      return "containerRegularDay";
    }
    else {
      return "containerRegularNight";
    }
  }
}
