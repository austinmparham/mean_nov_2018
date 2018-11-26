import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})



export class HttpService {

  constructor(private _http: HttpClient){

  	},
   getMongeese(){
    return this._http.get('/mongeese');
 }
   getMongoose(name){
 		return this._http.get(`/${name}`);
 }

   postToServer(num){
   	return this._http.post('/mongeese',num);
   }

   addMongoose(newMongoose){
   	return this._http.post('/new_mongoose',newMongoose)
   }

   editMongoose(mongoose){
   	return this._http.post(`/mongeese/${mongoose._id}`, mongoose);
   }

   deleteMongoose(mongoose){
   	return this._http.get(`/destroy/${mongoose.name}`,mongoose);
   }

}

