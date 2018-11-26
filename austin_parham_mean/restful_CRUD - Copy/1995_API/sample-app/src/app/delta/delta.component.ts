import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service'
@Component({
  selector: 'app-delta',
  templateUrl: './delta.component.html',
  styleUrls: ['./delta.component.css']
})
export class DeltaComponent implements OnInit {
	value: Number;
	buy: Number;
	coins: Number;
	constructor(private _httpService: HttpService){}

	ngOnInit(){
	this.getValue();
	this.getCoins();
	console.log(this.value);
	}

	addValue(){
		this._httpService.updateValue(this.buy);
		this.getValue();
		this.getCoins();

	}


	getValue(){
		this.value = this._httpService.shareValue();
	}

	getCoins(){
		this.coins = this._httpService.shareCoins();
	}

}
