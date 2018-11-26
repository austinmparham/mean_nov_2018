import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service'
@Component({
  selector: 'app-omega',
  templateUrl: './omega.component.html',
  styleUrls: ['./omega.component.css']
})
export class OmegaComponent implements OnInit {
	ledger: any;
	trans: any;
	trans_id: any;
	constructor(
	private _route: ActivatedRoute,
	private _router: Router,
	private _httpService: HttpService
	) {}

	ngOnInit() {
		this._route.params.subscribe((params: Params) => {
	    console.log(params['id']);
	    this.trans_id = params['id'];
	    console.log(this.trans_id)
	});
	this.getLedgerAndTrans();

	}

	getLedgerAndTrans(){
		this.ledger = this._httpService.shareLedger();
		this.trans = this.ledger[this.trans_id];
	}

}
