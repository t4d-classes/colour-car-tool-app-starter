import React, { useState } from 'react';

import {
  Car,
  NewCar,
  CarKeys,
  CarsOrder,
  ORDER_ASC,
  ORDER_DESC,
} from '../models/car';

import { ToolHeader } from './ToolHeader';
import { CarTable } from './CarTable';
import { CarForm } from './CarForm';
import { orderCars } from '../selectors/orderCars';

export interface CarToolProps {
  cars: Car[];
}

export function CarTool(props: CarToolProps) {
  const [cars, setCars] = useState([...props.cars]);
  const [carsOrder, setCarsOrder] = useState<CarsOrder>({
    column: 'id',
    direction: ORDER_ASC,
  });
  const [editCarId, setEditCarId] = useState(-1);

  const addCar = (newCar: NewCar) => {
    setCars([
      ...cars,
      {
        ...newCar,
        id: Math.max(...cars.map((c) => c.id), 0) + 1,
      },
    ]);
    setEditCarId(-1);
  };

  const saveCar = (car: Car) => {
    const carIndex = cars.findIndex((c) => c.id === car.id);
    const newCars = cars.concat();
    newCars[carIndex] = car;
    setCars(newCars);
    setEditCarId(-1);
  };

  const deleteCar = (carId: number) => {
    setCars(cars.filter((c) => c.id !== carId));
    setEditCarId(-1);
  };

  const cancelCar = () => {
    setEditCarId(-1);
  };

  const sortCars = (column: CarKeys) => {
    setCarsOrder({
      column,
      direction:
        column !== carsOrder.column
          ? ORDER_ASC
          : carsOrder.direction === ORDER_DESC
          ? ORDER_ASC
          : ORDER_DESC,
    });
  };

  return (
    <>
      <ToolHeader headerText="Car Tool" />
      <CarTable
        cars={orderCars(cars, carsOrder)}
        editCarId={editCarId}
        carsOrder={carsOrder}
        onEditCar={setEditCarId}
        onDeleteCar={deleteCar}
        onSaveCar={saveCar}
        onCancelCar={cancelCar}
        onSortCars={sortCars}
      />
      <CarForm buttonText="Add Car" onSubmitCar={addCar} />
    </>
  );
}
