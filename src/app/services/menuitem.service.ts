import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {MenuitemModel} from '../shared/models/menuitem.model';

const GET_MENU_ITEMS_API_ENDPOINT = 'http://localhost:3000/api/get-menu-items';

@Injectable({
  providedIn: 'root'
})
export class MenuitemService {
  public menuItems: BehaviorSubject<MenuitemModel[]>;
  public categories: BehaviorSubject<Set<string>>;

  constructor(private httpClient: HttpClient) {
    this.menuItems = new BehaviorSubject<MenuitemModel[]>([]);
    this.categories = new BehaviorSubject<Set<string>>(new Set());
    this.fetchMenuItems()
      .subscribe((res: MenuitemModel[]) => {
        this.setMenuItemsandCategories(res);
      });
  }

  getMenuItems() {
    return this.menuItems.asObservable();
  }

  getMenuItemById(cartItemId: number): MenuitemModel {
    return this.menuItems.getValue().filter(menuItem => menuItem.id === cartItemId)[0];
  }


  getCategories() {
    return this.categories.asObservable();
  }

  fetchMenuItems() {
    return this.httpClient.get(GET_MENU_ITEMS_API_ENDPOINT);
  }

  setMenuItemsandCategories(res: MenuitemModel[]) {
    this.menuItems.next(res['menuitems']);
    const categories = new Set<string>(res['menuitems'].map(item => item.Category));
    this.categories.next(categories);
  }
}
