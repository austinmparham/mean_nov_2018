import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service'
@Component({
  selector: 'app-beta',
  templateUrl: './beta.component.html',
  styleUrls: ['./beta.component.css']
})
export class BetaComponent implements OnInit {
	value: Number;
	constructor(private _httpService: HttpService){}

	ngOnInit(){
	this.getValue();
	}


	getValue(){
		this.value = this._httpService.shareValue();
	}

}