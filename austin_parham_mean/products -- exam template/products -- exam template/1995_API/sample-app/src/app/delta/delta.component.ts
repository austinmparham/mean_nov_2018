import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-delta',
  templateUrl: './delta.component.html',
  styleUrls: ['./delta.component.css']
})
export class DeltaComponent implements OnInit {
	restaurant = null;
	reviews: any;
	id: any;
	constructor(
	private _route: ActivatedRoute,
	private _router: Router,
	private _httpService: HttpService
	) {}

	ngOnInit(){
		this.getOne();
	}

	getOne(){
		this._route.params.subscribe((params: Params) => {
			console.log(params['id']);
			this.id = params['id'];
			let observable = this._httpService.getOne(this.id);
			observable.subscribe(data => {
				console.log("Got one restaurant", data);
				this.restaurant = data['restaurant'];
				console.log(this.restaurant);
				});
		});
	}
}
