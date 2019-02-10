import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {CartitemModel} from '../shared/models/cartitem.model';
import {MenuitemService} from './menuitem.service';
import {MenuitemModel} from '../shared/models/menuitem.model';

const ADD_TO_CART_API_ENPOINT = 'http://localhost:3000/cart/add-to-order';
const REMOVE_FROM_CART_API_ENPOINT = 'http://localhost:3000/cart/remove-from-order';
const DELETE_FROM_CART_API_ENPOINT = 'http://localhost:3000/cart/delete-from-order';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private currentCartSubject: BehaviorSubject<CartitemModel[]>;
  private cartDisplaySubject: BehaviorSubject<Map<MenuitemModel, number>>;
  public currentCart: Observable<CartitemModel[]>;
  public cartDisplay: Observable<Map<MenuitemModel, number>>;
  private cartSumSubject: BehaviorSubject<{totalAmount: number, sumPrice: number}>;
  public cartSum: Observable<{totalAmount: number, sumPrice: number}>;


  constructor(private httpClient: HttpClient,
              private menuitemService: MenuitemService) {
    this.currentCartSubject = new BehaviorSubject<CartitemModel[]>([]);
    this.currentCart = this.currentCartSubject.asObservable();
    this.cartDisplaySubject = new BehaviorSubject<Map<MenuitemModel, number>>(new Map());
    this.cartDisplay = this.cartDisplaySubject.asObservable();
    this.cartSumSubject = new BehaviorSubject<{totalAmount: number, sumPrice: number}>(null);
    this.cartSum = this.cartSumSubject.asObservable();
  }

  addItem(menuitemId: number, amount: number) {
    const orderId = JSON.parse(localStorage.getItem('currentUser')).orderId;
    return this.httpClient.put(ADD_TO_CART_API_ENPOINT, {
      menuitemId: menuitemId,
      amount: amount,
      orderId: orderId
    })
      .subscribe((res) => {
          if (res['status'] === 'ADDED') {
            const addedItem = new CartitemModel(res['cartItem'].menuitemId, res['cartItem'].numberOf);
            const cartArray = this.currentCartSubject.getValue();
            const updatedCartItemIndex = cartArray
              .findIndex(cartItem => cartItem.menuitemId === addedItem.menuitemId);
            if (updatedCartItemIndex !== -1) {
              cartArray[updatedCartItemIndex] = addedItem;
              this.updateCartSubject(cartArray);
            } else {
              cartArray.push(addedItem);
              this.updateCartSubject(cartArray);
            }

          }
        }
      );
  }

  removeItem(menuitemId: number) {
    const orderId = JSON.parse(localStorage.getItem('currentUser')).orderId;
    return this.httpClient.put(REMOVE_FROM_CART_API_ENPOINT, {
      menuitemId: menuitemId,
      orderId: orderId
    })
      .subscribe((res) => {
          if (res['status'] === 'REMOVED') {
            const removedItem = new CartitemModel(res['cartItem'].menuitemId, res['cartItem'].numberOf);
            const cartArray = this.currentCartSubject.getValue();
            const updatedCartItemIndex = cartArray
              .findIndex(cartItem => cartItem.menuitemId === removedItem.menuitemId);
            if (updatedCartItemIndex !== -1) {
              cartArray[updatedCartItemIndex] = removedItem;
              this.updateCartSubject(cartArray);
            }
          } else if (res['status'] === 'DELETED') {
            const deletedItemId = res['cartItem'].menuitemId;
            const cartArray = this.currentCartSubject.getValue();
            const updatedCart = cartArray.filter(cartItem => cartItem.menuitemId !== deletedItemId);
            this.updateCartSubject(updatedCart);
          }
        }
      );
  }

  updateCartSubject(cartItems: CartitemModel[]) {
    const cartItemDetails = new Map<MenuitemModel, number>();
    const cartSum = {totalAmount: 0, sumPrice: 0};
    cartItems.map((cartItem) => {
      const menuitem = this.menuitemService.getMenuItemById(cartItem.menuitemId);
      cartItemDetails.set(menuitem, cartItem.numberOf);
      cartSum.totalAmount += cartItem.numberOf;
      cartSum.sumPrice += menuitem.Price * cartItem.numberOf;
    });
    this.cartSumSubject.next(cartSum);
    this.cartDisplaySubject.next(cartItemDetails);
    this.currentCartSubject.next(cartItems);
  }


  deleteItem(menuitemId: number) {
    const orderId = JSON.parse(localStorage.getItem('currentUser')).orderId;
    return this.httpClient.put(DELETE_FROM_CART_API_ENPOINT, {
      menuitemId: menuitemId,
      orderId: orderId
    })
      .subscribe((res) => {
          if (res['status'] === 'DELETED') {
            const deletedItemId = res['cartItem'].menuitemId;
            const cartArray = this.currentCartSubject.getValue();
            const updatedCart = cartArray.filter(cartItem => cartItem.menuitemId !== deletedItemId);
            this.updateCartSubject(updatedCart);
          }
        }
      );
  }
}

