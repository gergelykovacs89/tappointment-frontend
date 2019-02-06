import { Component, OnInit } from '@angular/core';
import {MenuitemModel} from '../shared/models/menuitem.model';
import {MenuitemService} from '../services/menuitem.service';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  menuitems: MenuitemModel[];
  categories: Set<string>;

  constructor(private menuItemService: MenuitemService,
              private authService: AuthService) { }

  ngOnInit() {
    this.menuItemService.getMenuItems().subscribe((menuitems) => {
      this.menuitems = menuitems;
      this.menuItemService.getCategories().subscribe((categories) => {
        this.categories = categories;
      });
    });
  }

  getCategoryItems(category: string): MenuitemModel[] {
    return this.menuitems.filter(item => item.Category === category);
  }
}
