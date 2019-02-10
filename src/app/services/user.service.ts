import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CartService} from './cart.service';
import {map} from 'rxjs/operators';

const SET_ORDER_DETAILS_API_ENDPOINT = 'http://localhost:3000/user/set-order-details';
const CONFIRM_ORDER_API_ENDPOINT = 'http://localhost:3000/user/confirm-order';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient,
              private cartService: CartService) { }

  setOrderDetails(orderDetails: any) {
    const orderId = JSON.parse(localStorage.getItem('currentUser')).orderId;
    return this.httpClient.post(SET_ORDER_DETAILS_API_ENDPOINT, {
      fullName: orderDetails.fullName,
      address: orderDetails.address,
      phoneNum: orderDetails.phoneNum,
      orderId: orderId
    });
  }

  confirmOrder() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return this.httpClient.post(CONFIRM_ORDER_API_ENDPOINT, {
      orderId: user.orderId
    })
      .pipe(map((res) => {
        user.orderId = res['newOrder'].id;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.cartService.updateCartSubject([]);
        return res;
      }));
  }
}
