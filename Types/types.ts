export interface Driver {
  id: number;
  fullName: string;
  phoneNumber: string;
  cardId: string;
  driverCardId: string;
  nearestFraindName: string;
  nearestFraindPhone: string;
  liveIn: number;
}

export interface LoginResponse {
  token: string;
  expiration: string;
  fullName: string;
  uesrType: string;
  userPlace: string;
  typee: string;
}

export interface Truck {
  driverId: number;
  driverName: string;
  phoneNumber: string;
  cardId: string;
  driverCardId: string;
  nearestFraindName: string;
  nearestFraindPhone: string;
  liveInName: string;
  liveInId: number;
  carId: number;
  workNumber: number;
  boardNumber: string;
  trailerNumber: string;
  carTypeName: string;
  carTypeId: number;
  colorName: string;
  colorId: number;
  areaName: string;
  areaId: number;
  lastUpdateDate: string; // ISO date string
  userInsertId: string;
  userInsertName: string;
  userUpdateId: string;
  userUpdateName: string;
  colorNameInEnglish: string;
};

export interface Queue {
  id: number; // Unique identifier for the queue item
  carId: number; // ID of the car
  workId: number; // Work ID associated with the car
  driverName: string; // Name of the driver
  userRealName: string; // Real name of the user
  transActionDate: string; // Date of the transaction in ISO format
  areaName: string; // Name of the area associated with the queue
}
