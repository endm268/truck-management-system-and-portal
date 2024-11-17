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
