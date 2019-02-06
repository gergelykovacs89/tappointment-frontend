export class MenuitemModel {
  id: number;
  Category: string;
  Description: string;
  Name: string;
  Price: number;
  Spicy: number;
  Vegatarian: number;

  constructor(id: number, Category: string, Description: string,
              Name: string, Price: number, Spicy: number, Vegatarian: number) {
    this.id = id;
    this.Category = Category;
    this.Description = Description;
    this.Name = Name;
    this.Price = Price;
    this.Spicy = Spicy;
    this.Vegatarian = Vegatarian;
  }
}
