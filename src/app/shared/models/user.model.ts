export class UserModel {
  id: number;
  email: string;
  password: string;
  currentOrder: string[];


  constructor(id: number, email: string) {
    this.id = id;
    this.email = email;
    this.currentOrder = [];
  }
}
