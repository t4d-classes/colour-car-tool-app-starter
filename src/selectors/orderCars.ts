import { Car, CarsOrder, ORDER_ASC } from "../models/car";

export const orderCars = (cars: Car[], carsOrder: CarsOrder) => {
  return cars.concat().sort((a: Car, b: Car) => {
    const left = String(a[carsOrder.column]).toUpperCase();
    const right = String(b[carsOrder.column]).toUpperCase();

    if (left < right) {
      return carsOrder.direction === ORDER_ASC ? -1 : 1;
    } else if (left > right) {
      return carsOrder.direction === ORDER_ASC ? 1 : -1;
    } else {
      return 0;
    }
  });
};
