export class CartitemModel {
  menuitemId: number;
  numberOf: number;


  constructor(menuitemId: number, numberOf: number) {
    this.menuitemId = menuitemId;
    this.numberOf = numberOf;
  }
}
