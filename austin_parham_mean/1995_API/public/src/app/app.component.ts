import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pubelic';
  mongeese = [];
  mongoose = null;
  newMongoose: any;
  show: string;
  constructor(private _httpService: HttpService) {

  }
  ngOnInit(){
  	this.newMongoose = { name: "", favorite_food: "",age:"",gender:"" }
  }
  getMongeeseFromService(){
  	let observable = this._httpService.getMongeese()
  	observable.subscribe(data => {
  		console.log("Got our data!", data)
  		this.mongeese = data;
  		})
  }
  getMongooseFromService(name){
  	let observable = this._httpService.getMongoose(name)
  	observable.subscribe(data => {
  		console.log("Got me a mongoose!", data)
  		this.mongoose = data;
  		console.log("This is this.mongoose -->",this.mongoose)
  		})
  }
  onButtonClick(): void{
  	this.getMongeeseFromService()
  }

  onButtonClickParam(name: String): void{
  	console.log(`Click event is working with name param: ${name}`);
  	this.getMongooseFromService(name);
  }

  onSubmit() {
  	let observable = this._httpService.addMongoose(this.newMongoose);
  	observable.subscribe(data => {
  		console.log("Got data from post back", data);
  		this.newMongoose = { name: "", favorite_food: "",age:"",gender:"" }
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
