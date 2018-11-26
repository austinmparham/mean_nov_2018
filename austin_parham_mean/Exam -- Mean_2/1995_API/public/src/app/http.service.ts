import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})



export class HttpService {

  constructor(private _http: HttpClient){}
   getCakes(){
    return this._http.get('/cakes');
 }
   getCake(name){
 		return this._http.get(`/${name}`);
 }

   postToServer(num){
   	return this._http.post('/mongeese',num);
   }

   addCake(newCake){
   	return this._http.post('/new_cake',newCake)
   }

   editMongoose(mongoose){
   	return this._http.post(`/mongeese/${mongoose._id}`, mongoose);
   }

   deleteMongoose(mongoose){
   	return this._http.get(`/destroy/${mongoose.name}`,mongoose);
   }

   postRatings(name,newRating){
    return this._http.post(`/new_rating/${name}`, newRating);
   }

}

