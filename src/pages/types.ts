export interface IBranch {
  _id: string;
  name: string;
  description?: string;
  restaurants: string[];
  image: string;
  city: string;
}

export interface IRestaurant {
  _id: string;
  branch_id: string;
  name: string;
  address: string;
  phone: string;
  image: string;
  tables: string[];
}

export interface ITable {
  _id: string;
  restaurant_id: string;
  name: string;
  description: string;
  amount_of_booked: number;
  fee: number;
  fee_unit: string;
  calendar: Record<number, boolean>;
  reservation: string[];
}

export interface IReservation {
  _id: string;
  table_id: string;
  username: string;
  phone: string;
  image: string;
  reservation_time: number[];
}
