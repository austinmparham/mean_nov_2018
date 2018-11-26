import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
    constructor(private _http: HttpClient){}

    addRestaurantToMongo(newRestaurant){
    	console.log("!!!!In the service!!!!!", newRestaurant)
        return this._http.post('/restaurants', {name: newRestaurant.name,cuisine:newRestaurant.cuisine,reviews: []});
    }

    getRestaurantsFromServer(){
    	return this._http.get('/restaurants');
    }

    getOne(id){
    	return this._http.get(`/restaurants/${id}`);
    }

    editRestaurant(id, edits){
    	console.log(edits,"!!!!!!Made it to editAuthor in service!!!!");
    	return this._http.put(`/restaurants/${id}`, {name: edits.name,cuisine: edits.cuisine});
    }

    deleteRestaurant(id){
    	console.log("!!!!!!Made it to deleteAuthor!!!!!");
    	return this._http.delete(`/restaurants/${id}`);
    }

    addReview(id, newReview){
        console.log("!!!!!!Made it to newReview!!!!!");
        return this._http.post(`/restaurants/review/${id}`, {customer_name: newReview.customer_name,stars:newReview.stars,description:newReview.description});
    }

}

