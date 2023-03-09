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
		console.log("Current time: " + currentTime)
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
}
