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
      .set('days', 7)
    })
  }
  weatherForDate(response: WeatherData, date: number) {
    if (date === 1) {
      return {
        time: response.location.localtime,
        temp_c: Math.round(response.current.temp_c),
        temp_f: Math.round(response.current.temp_f),
        condition: response.current.condition.text,
        min_temp_c: Math.round(response.forecast.forecastday[0].day.mintemp_c),
        min_temp_f: Math.round(response.forecast.forecastday[0].day.mintemp_f),
        max_temp_c: Math.round(response.forecast.forecastday[0].day.maxtemp_c),
        max_temp_f: Math.round(response.forecast.forecastday[0].day.maxtemp_f),
        sunrise: (response.forecast.forecastday[0].astro.sunrise),
        humidity: response.current.humidity,
        wind_kph: response.current.wind_kph,
        wind_mph: response.current.wind_mph,
        sunset: (response.forecast.forecastday[0].astro.sunset)
      }
    }
    else {
      return {
        time: response.location.localtime,
        temp_c: Math.round(response.forecast.forecastday[date-1].day.avgtemp_c),
        temp_f: Math.round(response.forecast.forecastday[date-1].day.avgtemp_f),
        condition: response.current.condition.text,
        min_temp_c: Math.round(response.forecast.forecastday[date-1].day.mintemp_c),
        min_temp_f: Math.round(response.forecast.forecastday[date-1].day.mintemp_f),
        max_temp_c: Math.round(response.forecast.forecastday[date-1].day.maxtemp_c),
        max_temp_f: Math.round(response.forecast.forecastday[date-1].day.maxtemp_f),
        sunrise: (response.forecast.forecastday[date-1].astro.sunrise),
        humidity: response.forecast.forecastday[date-1].day.avghumidity,
        wind_kph: response.forecast.forecastday[date-1].day.maxwind_kph,
        wind_mph: response.forecast.forecastday[date-1].day.maxwind_mph,
        sunset: (response.forecast.forecastday[date-1].astro.sunset)
      }
    }
  }
  stringTrim(response: WeatherData): string{
    if (response.location.name.indexOf('(') != -1) {
      return response.location.name.substring(0, response.location.name.indexOf('('));
    }
    else {
      return response.location.name
    }
  }
  arrOfDates(response: WeatherData): string[]{
    let arr = []
    for (let element of response.forecast.forecastday) {
      let dateNum = element.date
      if (dateNum.substring(5,7) === '01'){
        arr.push('Jan' + "/" + dateNum.substring(8,10) )
      }
      else if (dateNum.substring(5,7) === '02'){
        arr.push('Feb' + "/" + dateNum.substring(8,10) )
      }
      else if (dateNum.substring(5,7) === '03'){
        arr.push('Mar' + "/" + dateNum.substring(8,10) )
      }
      else if (dateNum.substring(5,7) === '04'){
        arr.push('Apr' + "/" + dateNum.substring(8,10) )
      }
      else if (dateNum.substring(5,7) === '05'){
        arr.push('May' + "/" + dateNum.substring(8,10) )
      }
      else if (dateNum.substring(5,7) === '06'){
        arr.push('Jun' + "/" + dateNum.substring(8,10) )
      }
      else if (dateNum.substring(5,7) === '07'){
        arr.push('Jul' + "/" + dateNum.substring(8,10) )
      }
      else if (dateNum.substring(5,7) === '08'){
        arr.push('Aug' + "/" + dateNum.substring(8,10) )
      }
      else if (dateNum.substring(5,7) === '09'){
        arr.push('Sep' + "/" + dateNum.substring(8,10) )
      }
      else if (dateNum.substring(5,7) === '10'){
        arr.push('Oct' + "/" + dateNum.substring(8,10) )
      }
      else if (dateNum.substring(5,7) === '11'){
        arr.push('Nov' + "/" + dateNum.substring(8,10) )
      }
      else{
        arr.push('Dec' + "/" + dateNum.substring(8,10) )
      }
    }
    return arr
  }
  isDay(response: any): Boolean {
		let currentTime = response.time.split(" ")[1]
		if (currentTime[1] ===':') {
			currentTime = '0' + response.time.split(" ")[1]
		}
		let sunrise = response.sunrise
		if (sunrise[sunrise.length - 2] === 'A'){
			sunrise = sunrise.substring(0, 5)
		}
		else {
			sunrise = String(Number(sunrise.substring(0,2)) + 12) + sunrise.substring(2,5);
		}
		let sunset = response.sunset
		if (sunset[sunset.length - 2] === 'A'){
			sunset = sunset.substring(0, 5)
		}
		else {
			sunset = String(Number(sunset.substring(0,2)) + 12) + sunset.substring(2,5);
		}
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

  containerImage(response: any): string {
    if (response.condition.toLowerCase().includes('thunder')) {
      return "containerThunder";
    }
    else if (response.condition.toLowerCase().includes('snow') && this.isDay(response)) {
      return "containerSnowDay";
    }
    else if (response.condition.toLowerCase().includes('snow') && !this.isDay(response)) {
      return "containerSnowNight";
    }
    else if (response.condition.toLowerCase().includes('rain') && this.isDay(response)) {
      return "containerRainDay";
    }
    else if (response.condition.toLowerCase().includes('rain') && !this.isDay(response)) {
      return "containerRainNight";
    }
    else if (response.condition.toLowerCase().includes('fog')) {
      return "containerFoggy";
    }
    else if (Number(response.wind_mph) > 30 && Number(response.temp_c) > 0 && this.isDay(response)) {
      return "containerWindyDay";
    }
    else if ((response.condition.toLowerCase().includes('cloud') || (response.condition.toLowerCase().includes('overcast'))) && this.isDay(response)) {
      return "containerCloudyDay";
    }
    else if ((response.condition.toLowerCase().includes('cloud') || (response.condition.toLowerCase().includes('overcast'))) && !this.isDay(response)) {
      return "containerCloudyNight";
    }
    else if (Number(response.humidity) < 40 && Number(response.temp_c) > 30 && this.isDay(response)) {
      return "containerDesertDay";
    }
    else if (Number(response.wind_mph) > 20 && Number(response.temp_c) > 10 && this.isDay(response)) {
      return "containerWindyDay";
    }
    else if (Number(response.temp_c) > 25 && this.isDay(response)) {
      return "containerHotDay";
    }
    else if (Number(response.temp_c) < -10 && this.isDay(response)) {
      return "containerColdDay";
    }
    else if (Number(response.temp_c) < -10 && !this.isDay(response)) {
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
