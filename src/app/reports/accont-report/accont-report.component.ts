import { Component, OnInit } from '@angular/core';
import { AccountReportService } from '../../services/report/account-report.service';
import { AccountService } from '../../services/master-accounts/account.service';
import { ApiResponse } from '../../models/api-response';
import { Observable } from 'rxjs';
import { Account } from '../../models/account';

@Component({
  selector: 'app-accont-report',
  templateUrl: './accont-report.component.html',
  styleUrls: ['./accont-report.component.css']
})
export class AccontReportComponent implements OnInit {

  reportData: any;
  totalCredit: number = 0;
  totalDebit: number = 0;
  startDate!: string;
  endDate!: string;
  selectedAccount!: string;

  accounts$!: Observable<ApiResponse<Account[]>>;
  accounts: any[] = [];

  constructor(
    private accountReportService: AccountReportService,
    private accountService: AccountService,
  ) { }

  ngOnInit(): void {
    const today = new Date();
    this.startDate = this.formatDate(new Date(today.getFullYear(), today.getMonth(), 1));
    this.endDate = this.formatDate(new Date(today.getFullYear(), today.getMonth() + 1, 0));
    this.selectedAccount = '';
    // Load accounts on initialization
    this.getAccounts();
  }

  getAccountReport() {
    const baseData = {
      startDate: this.startDate,
      endDate: this.endDate,
    };

    this.accountReportService.getAccountReport(baseData).subscribe({
      next: (response: any) => {
        this.reportData = response?.payload?.[0] || [];
        this.calculateTotals();
      },
      error: (error) => {
        console.error('Error fetching account report:', error);
        this.reportData = [];
        this.calculateTotals();
      }
    });
  }

  getAccountReportByAccount() {
    const baseData = {
      startDate: this.startDate,
      endDate: this.endDate,
      AccNo: this.selectedAccount
    };

    this.accountReportService.getAccountReportByAcc(baseData).subscribe({
      next: (response: any) => {
        this.reportData = response?.payload?.[0] || [];
        this.calculateTotals();
      },
      error: (error) => {
        console.error('Error fetching account report by account:', error);
        this.reportData = [];
        this.calculateTotals();
      }
    });
  }

  filterReport() {
    if (this.selectedAccount && this.selectedAccount.trim() !== '') {
      this.getAccountReportByAccount();
    } else {
      this.getAccountReport();
    }
  }

  calculateTotals(): void {
    if (!Array.isArray(this.reportData)) {
      console.warn('reportData is not an array:', this.reportData);
      this.totalCredit = 0;
      this.totalDebit = 0;
      return;
    }

    type ReportItem = {
      creditDebit: number;
      amount: number | null;
    };

    this.totalCredit = (this.reportData as ReportItem[])
      .filter(item => item && item.creditDebit === 1 && item.amount != null)
      .reduce((sum: number, item) => sum + (item.amount || 0), 0);

    this.totalDebit = (this.reportData as ReportItem[])
      .filter(item => item && item.creditDebit === 0 && item.amount != null)
      .reduce((sum: number, item) => sum + (item.amount || 0), 0);

    console.log('Calculated totals - Credit:', this.totalCredit, 'Debit:', this.totalDebit);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  private getAccounts(): void {
    this.accountService.getAccounts().subscribe({
      next: (response: any) => {
        if (response?.status && response?.payload?.[0]) {
          this.accounts = response.payload[0];
          console.log('Accounts loaded:', this.accounts.length);
        } else {
          this.accounts = [];
          console.warn('No accounts found in response');
        }
      },
      error: (error) => {
        console.error('Error fetching accounts:', error);
        this.accounts = [];
      }
    });
  }
}

