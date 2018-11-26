import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-beta',
  templateUrl: './beta.component.html',
  styleUrls: ['./beta.component.css']
})
export class BetaComponent implements OnInit {
	restaurants: any;
  errors: any;
	constructor(private _httpService: HttpService){}

	ngOnInit(){
		this.getRestaurants();
	}
  getRestaurants(){
    let observable = this._httpService.getRestaurantsFromServer();
    observable.subscribe(data => {
      console.log("Got our restaurants", data);
      this.restaurants = data['restaurants'];
      console.log(this.restaurants)
      });
  };

  deleteRestaurant(id){
    console.log("deleting restaurant");
    let observable = this._httpService.deleteRestaurant(id);
    observable.subscribe(data => {
      console.log("deleted a restaurant",data);
      this.getRestaurants();
      }) 
  }

}