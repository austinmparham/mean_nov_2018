import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service'
@Component({
  selector: 'app-omega',
  templateUrl: './omega.component.html',
  styleUrls: ['./omega.component.css']
})
export class OmegaComponent implements OnInit {
	product: {};
	edits: any;
	id: any;
	errors: any;
	constructor(
	private _route: ActivatedRoute,
	private _router: Router,
	private _httpService: HttpService
	) {}

	ngOnInit() {
		this.getOne();
		this.edits= {title:"",price: "",url:""}
	}

	getOne(){
		this._route.params.subscribe((params: Params) => {
			console.log(params['id']);
			this.id = params['id'];
			let observable = this._httpService.getOne(this.id);
			observable.subscribe(data => {
				console.log("Got one author", data);
				this.product = data['product'];
				console.log(this.product);
				this.edits= {title:this.product.title,price: this.product.price,url: this.product.url}
				});
		});
	}
	updateProduct(id){
		let observable = this._httpService.editProduct(id, this.edits);
		observable.subscribe(data => {
			console.log("edited an author", data);
			this.errors = data['err']
			console.log(this.errors);
			console.log(typeof this.errors);
			})
		this.getOne();
	}
}