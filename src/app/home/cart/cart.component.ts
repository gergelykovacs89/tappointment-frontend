import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CartService} from '../../services/cart.service';
import {MenuitemModel} from '../../shared/models/menuitem.model';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  cartItemDetails: Observable<Map<MenuitemModel, number>>;
  cartSum: Observable<{totalAmount: number, sumPrice: number}>;
  constructor(private modalService: NgbModal,
              private cartService: CartService,
              private router: Router) { }

  ngOnInit() {
    this.cartItemDetails = this.cartService.cartDisplay;
    this.cartSum = this.cartService.cartSum;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'cart-modal', backdrop: false}).result.then((result) => {
      if (result === 'checkout') {
        this.router.navigate(['/checkout']);
      }
    }, (reject) => {
      console.log(reject);
    });
  }

  incrementItem(menuitemId: number) {
    this.cartService.addItem(menuitemId, 1);
  }

  decrementItem(menuItemId: number) {
    this.cartService.removeItem(menuItemId);
  }

  deleteItem(menuItemId: number) {
    this.cartService.deleteItem(menuItemId);
  }
}
