import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {MenuitemModel} from '../../shared/models/menuitem.model';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  orderDetailsSet = false;
  orderDetail: {fullName: string, address: string, phoneNum: string};
  cartItemDetails: Observable<Map<MenuitemModel, number>>;
  cartSum: Observable<{totalAmount: number, sumPrice: number}>;
  constructor(private userService: UserService,
              private router: Router,
              private cartService: CartService) { }

  ngOnInit() {
    this.initForm();
    this.cartItemDetails = this.cartService.cartDisplay;
    this.cartSum = this.cartService.cartSum;
  }

  private initForm() {
    const fullName = '';
    const address = '';
    const phoneNum = '';

    this.checkoutForm = new FormGroup({
        'fullName': new FormControl(fullName, Validators.compose([Validators.required])),
        'address': new FormControl(address, Validators.compose([Validators.required])),
        'phoneNum': new FormControl(phoneNum, Validators.compose([Validators.required])),
      }
    );
  }

  onSubmit() {
    this.userService.setOrderDetails(this.checkoutForm.value)
      .pipe(first())
      .subscribe((res) => {
          // @ts-ignore
          if (res['status'] === 'OK') {
            this.orderDetail = this.checkoutForm.value;
            this.orderDetailsSet = true;
          }
        },
        (err) => {
            this.checkoutForm.reset();
        });
  }

  confirmOrder() {
    this.userService.confirmOrder()
      .subscribe((res) => {
          // @ts-ignore
          if (res['status'] === 'OK') {
            alert(res['message']);
            this.router.navigate(['/']);
          }
        },
        (err) => {
          this.orderDetailsSet = false;
          this.checkoutForm.reset();
        });
  }
}
