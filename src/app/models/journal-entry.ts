export interface JournalEntry {
  accNo: string;
  catCode:string;
  amount: number;
  creditDebit: 0 | 1;
  date: string;
  description: string;
  reference: string;
}
