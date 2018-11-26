import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-gamma',
  templateUrl: './gamma.component.html',
  styleUrls: ['./gamma.component.css']
})
export class GammaComponent implements OnInit {
	newProduct: any;
	errors: any;
	constructor(private _httpService: HttpService){}

	ngOnInit(){
		this.newProduct = {title: "",price:"",url:""};
	}

	addProduct() {
  	let observable = this._httpService.addProductToMongo(this.newProduct);
  	observable.subscribe(data => {
  		console.log("Added an author", data);
  		this.newProduct = {title: "",price:"",url:""};
      this.errors = data['err']
      console.log(typeof this.errors)
      console.log(this.errors)
  		})
  	}

}