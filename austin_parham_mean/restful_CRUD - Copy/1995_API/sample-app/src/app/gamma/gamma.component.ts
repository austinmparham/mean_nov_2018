import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service'
@Component({
  selector: 'app-gamma',
  templateUrl: './gamma.component.html',
  styleUrls: ['./gamma.component.css']
})
export class GammaComponent implements OnInit {
  value: Number;
  sell: any;
  coins: Number;
  constructor(private _httpService: HttpService){}

  ngOnInit(){
  this.getValue();
  this.getCoins();
  console.log(this.value);
  }

  sellCoin(){
    if(this.coins >= this.sell){
      this._httpService.updateValue(this.sell * -1);
      this.getValue();
      this.getCoins();
    }
  }

  getValue(){
    this.value = this._httpService.shareValue();
  }

  getCoins(){
    this.coins = this._httpService.shareCoins();
  }
}