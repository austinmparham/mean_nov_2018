import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mongoose',
  templateUrl: './mongoose.component.html',
  styleUrls: ['./mongoose.component.css']
})
export class MongooseComponent implements OnInit {
	@Input() cake: any
  constructor() { }

  ngOnInit() {
  }

}
