import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

const ADD_TO_CART_API_ENPOINT = 'http://localhost:3000/api/get-menu-items';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) { }

  addItem(menuitemId: number, amount: number) {
    const orderId = JSON.parse(localStorage.getItem('currentUser')).orderId;
    return this.httpClient.put(ADD_TO_CART_API_ENPOINT, {
      menuitemId: menuitemId,
      amount: amount,
      orderId: orderId
    });
  }
}
