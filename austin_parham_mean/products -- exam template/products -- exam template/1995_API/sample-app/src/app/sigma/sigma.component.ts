import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-sigma',
  templateUrl: './sigma.component.html',
  styleUrls: ['./sigma.component.css']
})
export class SigmaComponent implements OnInit {
	restaurant: any;
	newReview: any;
	id: any;
	errors: any;
	constructor(
	private _route: ActivatedRoute,
	private _router: Router,
	private _httpService: HttpService
	) {}

	ngOnInit(){
		this.getOne();
		this.newReview = {customer_name: "",stars: null, description: ""}
	}

	getOne(){
		this._route.params.subscribe((params: Params) => {
			console.log(params['id']);
			this.id = params['id'];
			let observable = this._httpService.getOne(this.id);
			observable.subscribe(data => {
				console.log("Got one author", data);
				this.restaurant = data['restaurant'];
				console.log(this.restaurant);
				});
		});
	}

	addReview(id){
		let observable = this._httpService.addReview(id, this.newReview);
		observable.subscribe(data => {
			console.log("created a new review", data);
			this.errors = data['err']
			console.log(this.errors);
			console.log(typeof this.errors);
			})
	}

}
