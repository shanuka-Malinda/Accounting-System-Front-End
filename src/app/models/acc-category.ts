import { Account } from "./account";

export interface AccCategory {
  id: number;
  name: string;
  code: string;
  createdAt: string;
  updatedAt: string;
  commonStatus: string;
  accounts: Account[];
}

export interface AccCategoryOnly {
  id: number;
  name: string;
  code: string;
  createdAt: string;
  updatedAt: string;
  commonStatus: string;
  // accounts: Account[];
}