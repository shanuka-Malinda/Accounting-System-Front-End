import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/master-accounts/account.service';
import { Observable } from 'rxjs';
import { Account } from '../../models/account';
import { ApiResponse } from '../../models/api-response';
import { JournalEntry } from '../../models/journal-entry';

@Component({
  selector: 'app-journal-entry',
  templateUrl: './journal-entry.component.html',
  styleUrls: ['./journal-entry.component.css']
})
export class JournalEntryComponent implements OnInit {
  journalEntryForm: FormGroup;
  accounts$!: Observable<ApiResponse<Account[]>>;
  accounts: any[] = []; // Adjusted type to any[] for flexibility

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService
  ) {
    this.journalEntryForm = this.fb.group({
      debitAccount: ['', Validators.required],
      creditAccount: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]],
      date: ['', Validators.required],
      description: ['', Validators.required],
      reference: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAccounts();
  }

  private getAccounts(): void {
    this.accountService.getAccounts().subscribe({
      next: (response: any) => {
        if (response.status) {
          this.accounts = response.payload[0];
        }
      },
      error: (error) => {
        console.error('Error fetching accounts:', error);
      }
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.journalEntryForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }



  onSubmit(): void {
    if (this.journalEntryForm.valid) {
      console.log('Journal Entry Submitted:', this.journalEntryForm.value);
      //  let data=[
      //   {
      //     accNo: this.journalEntryForm.value.debitAccount,
      //     amount: this.journalEntryForm.value.amount,
      //     creditDebit: 0,
      //     date: this.journalEntryForm.value.date,
      //     description: this.journalEntryForm.value.description,
      //     reference: this.journalEntryForm.value.reference
      //   },
      //   {
      //     accNo: this.journalEntryForm.value.creditAccount,
      //     amount: this.journalEntryForm.value.amount,
      //     creditDebit: 1,
      //     date: this.journalEntryForm.value.date,
      //     description: this.journalEntryForm.value.description,
      //     reference: this.journalEntryForm.value.reference
      //   }
      // ];


      let data: JournalEntry[] = [
        {
          accNo: this.journalEntryForm.value.debitAccount,
          amount: this.journalEntryForm.value.amount,
          creditDebit: 0,
          date: this.journalEntryForm.value.date,
          description: this.journalEntryForm.value.description,
          reference: this.journalEntryForm.value.reference
        },
        {
          accNo: this.journalEntryForm.value.creditAccount,
          amount: this.journalEntryForm.value.amount,
          creditDebit: 1,
          date: this.journalEntryForm.value.date,
          description: this.journalEntryForm.value.description,
          reference: this.journalEntryForm.value.reference
        }
      ];

      console.log('Formatted Data:', data);
       
    }
  }

  onReset(): void {
    this.journalEntryForm.reset();
  }
}