import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Rate My Cakes';
  cakes = [];
  cake = null;
  newCake: any;
  newRating: any;
  show: string;
  constructor(private _httpService: HttpService) {

  }
  ngOnInit(){
  	this.newCake = { baker_name: "", image_url: ""};
    this.newRating = {star_rate:"", comment:""};
    this.getCakesFromService();
  }
  getCakesFromService(){
  	let observable = this._httpService.getCakes()
  	observable.subscribe(data => {
  		console.log("Got our data for all cakes!", data)
  		this.cakes = data;
  		})
  }
  getCakeFromService(name){
  	let observable = this._httpService.getCake(name)
  	observable.subscribe(data => {
  		console.log("Got me a baked cake!", data)
  		this.cake = data;
  		console.log("This is this.cake -->",this.cake)
  		})
  }
  onButtonClick(): void{
  	this.getMongeeseFromService()
  }

  onButtonClickParam(name): void{
  	console.log(`Click event is working with name param: ${name}`);
  	this.getCakeFromService(name);
  }

  rateCake(name) {
    let observable = this._httpService.postRatings(name,this.newRating);
    observable.subscribe(data => {
      console.log("Got data from post back", data);
      this.newRating = {star_rate:"", comment:""}
      })
  }

  onSubmit() {
  	let observable = this._httpService.addCake(this.newCake);
  	observable.subscribe(data => {
  		console.log("Got data from post back", data);
  		this.newCake = { baker_name: "", image_url: ""}
  		})
  }

  onEdit(){
  	let observable = this._httpService.editMongoose(this.mongoose);
  	observable.subscribe(data => {
  		console.log("Got data from post back", data);
  		this.mongoose = null;
  		})
  }

  onDelete(){
  	let observable = this._httpService.deleteMongoose(this.mongoose);
  	observable.subscribe(data => {
  		console.log("Got data from post back", data);
  		this.mongoose = null;
  		})
  }



}
