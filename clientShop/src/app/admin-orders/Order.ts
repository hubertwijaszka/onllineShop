import {User} from '../admin-users/User';

export class Order {
  constructor(orderId: number) {
    this.orderId = orderId;
  }
  user: User;
  address: string;
  completed: boolean;
  orderId: number;
}
