export class UserModel {
  id: number;
  name: string;
  email: string;
  password: string;
  currentOrder: string[];


  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.currentOrder = [];
  }
}
