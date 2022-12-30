export interface ICosts {
  text: string;
  price: number;
  date: Date | string;
  _id?: number | string;
}


export interface ICreateCost {
  url: string,
  cost: ICosts,
}