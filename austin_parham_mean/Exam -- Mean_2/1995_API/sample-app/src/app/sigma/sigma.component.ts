import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service'
@Component({
  selector: 'app-sigma',
  templateUrl: './sigma.component.html',
  styleUrls: ['./sigma.component.css']
})
export class SigmaComponent implements OnInit {
	
	constructor(private _httpService: HttpService){}

	ngOnInit(){
	}

}
