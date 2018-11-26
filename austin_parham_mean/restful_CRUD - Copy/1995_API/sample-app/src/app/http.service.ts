import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
    constructor(private _http: HttpClient){}

    shinto = [1,2,3,4];
    value = 1;
    answer = 7;
    coins = 0;
    ledger = [];
    trans = 0;
    shareNumbers(){
    	return this.shinto;
    }

    shareCoins(){
    	return this.coins;
    }

    shareValue(){
    	return this.value;
    }

    shareLedger(){
    	return this.ledger;
    }

    addToNumbers(num){
    	this.shinto.push(num);
    }

    updateValue(num){
    	if(num < 0){
    		var action = 'Sold'
    	}
    	if(num > 0){
    		var action = 'Bought'
    	}
    	var current_val = this.value;
    	this.coins += num;
    	this.ledger.push([action,Math.abs(num),this.value,this.trans]);
    	this.trans += 1;
    	this.value += num;
    	console.log(this.value)
    	console.log(this.ledger)
    }

    getChicago(){
    	return this._http.get('http://api.openweathermap.org/data/2.5/weather?q=Chicago&APPID=7b2f223523288d8a21069a62aa01089e');
    }
    getDallas(){
    	return this._http.get('http://api.openweathermap.org/data/2.5/weather?q=Dallas&APPID=7b2f223523288d8a21069a62aa01089e')
    }
    getBurbank(){
    	return this._http.get('http://api.openweathermap.org/data/2.5/weather?q=Burbank&APPID=7b2f223523288d8a21069a62aa01089e')
    }

}

