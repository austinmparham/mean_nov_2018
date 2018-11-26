import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service'
@Component({
  selector: 'app-sigma',
  templateUrl: './sigma.component.html',
  styleUrls: ['./sigma.component.css']
})
export class SigmaComponent implements OnInit {
	ledger: any;
	constructor(private _httpService: HttpService){}

	ngOnInit(){
	this.getLedger();
	console.log(this.ledger);
	}

	getLedger(){
	this.ledger = this._httpService.shareLedger();
	}

}
