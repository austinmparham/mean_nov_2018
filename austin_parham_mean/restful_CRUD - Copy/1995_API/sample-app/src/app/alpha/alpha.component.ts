import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service'
@Component({
  selector: 'app-alpha',
  templateUrl: './alpha.component.html',
  styleUrls: ['./alpha.component.css']
})
export class AlphaComponent implements OnInit {
	dallas: any;
	constructor(private _httpService: HttpService){}

	ngOnInit(){
	this.getDallasFromService();
	}

	getDallasFromService(){
		let observable = this._httpService.getDallas()
  		observable.subscribe(data => {
	  		console.log("Got our data for Dallas!", data)
	  		this.dallas = data;
	  	})
	}
}
