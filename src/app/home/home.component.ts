import { Component, OnInit } from '@angular/core';
import {MenuitemModel} from '../shared/models/menuitem.model';
import {MenuitemService} from '../services/menuitem.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  menuitems: MenuitemModel[];
  categories: Set<string>;

  constructor(private menuItemService: MenuitemService) { }

  ngOnInit() {
    this.menuItemService.getMenuItems().subscribe((menuitems) => {
      this.menuitems = menuitems;
      this.menuItemService.getCategories().subscribe((categories) => {
        this.categories = categories;
      });
    });
  }

}
