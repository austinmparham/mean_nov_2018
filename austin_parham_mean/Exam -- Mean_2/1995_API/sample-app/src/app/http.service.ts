import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
    constructor(private _http: HttpClient){}

    addProductToMongo(newProduct){
    	console.log("!!!!In the service!!!!!", newProduct)
        return this._http.post('/products', {title: newProduct.title,price:newProduct.price,url:newProduct.url});
    }

    getProductsFromServer(){
    	return this._http.get('/products');
    }

    getOne(id){
    	return this._http.get(`/products/${id}`);
    }

    editProduct(id, edits){
    	console.log(edits,"!!!!!!Made it to editAuthor in service!!!!");
    	return this._http.put(`/products/${id}`, {title: edits.title,price: edits.price, url: edits.url});
    }

    deleteProduct(id){
    	console.log("!!!!!!Made it to deleteAuthor!!!!!");
    	return this._http.delete(`/products/${id}`);
    }

}

