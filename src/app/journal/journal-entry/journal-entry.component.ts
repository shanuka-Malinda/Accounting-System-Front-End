import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AccountService } from '../../services/master-accounts/account.service';
import { Observable } from 'rxjs';
import { Account } from '../../models/account';
import { ApiResponse } from '../../models/api-response';
import { JournalEntry } from '../../models/journal-entry';
import { JournalEntryService } from '../../services/journal/journal-entry.service';

@Component({
  selector: 'app-journal-entry',
  templateUrl: './journal-entry.component.html',
  styleUrls: ['./journal-entry.component.css']
})
export class JournalEntryComponent implements OnInit {
  journalEntryForm: FormGroup;
  accounts$!: Observable<ApiResponse<Account[]>>;
  accounts: any[] = [];

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private journalEntryService: JournalEntryService
  ) {
    this.journalEntryForm = this.fb.group({
      date: ['', Validators.required],
      description: ['', Validators.required],
      reference: [''],
      entries: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.getAccounts();
    this.addEntry(); // Add initial entry
    this.addEntry(); // Add second entry
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

  get entriesFormArray(): FormArray {
    return this.journalEntryForm.get('entries') as FormArray;
  }

  createEntryFormGroup(): FormGroup {
    return this.fb.group({
      account: ['', Validators.required],
      debitAmount: [0, [Validators.min(0)]],
      creditAmount: [0, [Validators.min(0)]]
    }, { validators: this.debitOrCreditValidator });
  }

  // Custom validator to ensure either debit or credit has a value (not both)
  debitOrCreditValidator(group: FormGroup) {
    const debit = group.get('debitAmount')?.value || 0;
    const credit = group.get('creditAmount')?.value || 0;
    
    if (debit > 0 && credit > 0) {
      return { bothDebitCredit: true };
    }
    if (debit === 0 && credit === 0) {
      return { noAmount: true };
    }
    return null;
  }

  addEntry(): void {
    this.entriesFormArray.push(this.createEntryFormGroup());
  }

  removeEntry(index: number): void {
    if (this.entriesFormArray.length > 2) { // Keep minimum 2 entries
      this.entriesFormArray.removeAt(index);
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.journalEntryForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  isEntryFieldInvalid(index: number, field: string): boolean {
    const control = this.entriesFormArray.at(index).get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  getTotalDebits(): number {
    return this.entriesFormArray.controls.reduce((total, entry) => {
      return total + (entry.get('debitAmount')?.value || 0);
    }, 0);
  }

  getTotalCredits(): number {
    return this.entriesFormArray.controls.reduce((total, entry) => {
      return total + (entry.get('creditAmount')?.value || 0);
    }, 0);
  }

  isBalanced(): boolean {
    const totalDebits = this.getTotalDebits();
    const totalCredits = this.getTotalCredits();
    return Math.abs(totalDebits - totalCredits) < 0.01; // Allow for minor floating point differences
  }

  getBalanceDifference(): number {
    return Math.abs(this.getTotalDebits() - this.getTotalCredits());
  }

  canRemoveEntry(): boolean {
    return this.entriesFormArray.length > 2;
  }

  onSubmit(): void {
    if (this.journalEntryForm.valid && this.isBalanced()) {
      console.log('Journal Entry Submitted:', this.journalEntryForm.value);

      let journalEntries: JournalEntry[] = [];

      this.entriesFormArray.controls.forEach((entry) => {
        const selectedAccount = entry.get('account')?.value;
        if (selectedAccount) {
          const accNo = selectedAccount.split('-')[0];
          const catCode = selectedAccount.split('-')[1];
          const debitAmount = entry.get('debitAmount')?.value || 0;
          const creditAmount = entry.get('creditAmount')?.value || 0;

          if (debitAmount > 0) {
            journalEntries.push({
              accNo: accNo,
              catCode: catCode,
              amount: debitAmount,
              creditDebit: 0, // 0 for debit
              date: this.journalEntryForm.value.date,
              description: this.journalEntryForm.value.description,
              reference: this.journalEntryForm.value.reference
            });
          }

          if (creditAmount > 0) {
            journalEntries.push({
              accNo: accNo,
              catCode: catCode,
              amount: creditAmount,
              creditDebit: 1, // 1 for credit
              date: this.journalEntryForm.value.date,
              description: this.journalEntryForm.value.description,
              reference: this.journalEntryForm.value.reference
            });
          }
        }
      });
       console.log('Journal Entries:', journalEntries);
      this.journalEntryService.createJournalEntry(journalEntries).subscribe({
        next: (response: any) => {
          if (response.status) {
            console.log('Journal Entry Created Successfully:', response.payload);
            alert('Journal Entry Created Successfully');
            this.onReset();
          } else {
            console.error('Failed to create journal entry:', response.errorMessages);
            alert('Failed to create journal entry: ' + (response.errorMessages?.join(', ') || 'Unknown error'));
          }
        },
        error: (error) => {
          console.error('Error creating journal entry:', error);
          alert('Error creating journal entry. Please try again.');
        }
      });

      console.log('Formatted Data:', journalEntries);
    } else if (!this.isBalanced()) {
      alert('Journal entry is not balanced. Total debits must equal total credits.');
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }

  onReset(): void {
    this.journalEntryForm.reset();
    // Clear all entries and add two new ones
    while (this.entriesFormArray.length > 0) {
      this.entriesFormArray.removeAt(0);
    }
    this.addEntry();
    this.addEntry();
  }

  // Helper method to clear amount when the other amount is entered
  onDebitChange(index: number): void {
    const entry = this.entriesFormArray.at(index);
    const debitAmount = entry.get('debitAmount')?.value;
    if (debitAmount > 0) {
      entry.get('creditAmount')?.setValue(0);
    }
  }

  onCreditChange(index: number): void {
    const entry = this.entriesFormArray.at(index);
    const creditAmount = entry.get('creditAmount')?.value;
    if (creditAmount > 0) {
      entry.get('debitAmount')?.setValue(0);
    }
  }
}