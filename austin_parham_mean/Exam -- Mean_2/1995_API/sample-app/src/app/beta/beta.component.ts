import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-beta',
  templateUrl: './beta.component.html',
  styleUrls: ['./beta.component.css']
})
export class BetaComponent implements OnInit {
	products = [];
  errors: any;
	constructor(private _httpService: HttpService){}

	ngOnInit(){
		this.getProducts();
	}
  getProducts(){
    let observable = this._httpService.getProductsFromServer();
    observable.subscribe(data => {
      console.log("Got our products", data);
      this.products = data['products'];
      });
  };

  deleteProduct(id){
    console.log("deleting product");
    let observable = this._httpService.deleteProduct(id);
    observable.subscribe(data => {
      console.log("deleted a product",data);
      this.getProducts();
      }) 
  }

}