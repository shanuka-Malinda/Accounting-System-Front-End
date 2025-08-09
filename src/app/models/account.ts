export interface Account {
  accNo: string;
  name: string;
  description:string;
  openingBalance: number;
  currentBalance: number;
  isCurrent: string;
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
  // openingBalance: number;
  // currentBalance: number;
  // creditLimit: number;
  isCurrent: string;
  createdBy: string;
  updatedBy: string;
}