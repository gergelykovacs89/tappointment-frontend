export class UserModel {
  id: number;
  email: string;
  password: string;
  orderId: number;


  constructor(id: number, email: string, orderId: number) {
    this.id = id;
    this.email = email;
    this.orderId = orderId;
  }
}
