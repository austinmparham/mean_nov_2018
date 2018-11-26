import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-gamma',
  templateUrl: './gamma.component.html',
  styleUrls: ['./gamma.component.css']
})
export class GammaComponent implements OnInit {
	newRestaurant: any;
	errors: any;
	constructor(private _httpService: HttpService){}

	ngOnInit(){
		this.newRestaurant = {name: "",cuisine:"",reviews: []};
	}

	addRestaurant() {
  	let observable = this._httpService.addRestaurantToMongo(this.newRestaurant);
  	observable.subscribe(data => {
  		console.log("Added a restaurant", data);
  		this.newRestaurant = {name: "",cuisine:"",reviews: []};
      this.errors = data['err']
      console.log(typeof this.errors)
      console.log(this.errors)
  		})
  	}

}