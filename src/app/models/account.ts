export interface Account {
  accNo: string;
  name: string;
  openingBalance: number;
  currentBalance: number;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  creditLimit: number;
}

export interface CreateAccount {
  name: string;
  catId:number;
  catCode:string;
  description: string;
  openingBalance: number;
  currentBalance: number;
  creditLimit: number;
  createdBy: string;
  updatedBy: string;
}