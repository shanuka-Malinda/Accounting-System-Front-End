import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
interface Account {
  id: string;
  name: string;
  type: string;
}

interface JournalEntry {
  creditAccount: string;
  debitAccount: string;
  amount: number;
  description: string;
  reference: string;
  date: string;
}
@Component({
  selector: 'app-journal-entry',
  templateUrl: './journal-entry.component.html',
  styleUrl: './journal-entry.component.css'
})
export class JournalEntryComponent implements OnInit{
journalEntryForm!: FormGroup;
  accounts: Account[] = [
    { id: '1001', name: 'Cash', type: 'Asset' },
    { id: '1002', name: 'Accounts Receivable', type: 'Asset' },
    { id: '1003', name: 'Inventory', type: 'Asset' },
    { id: '1004', name: 'Prepaid Expenses', type: 'Asset' },
    { id: '1005', name: 'Equipment', type: 'Asset' },
    { id: '2001', name: 'Accounts Payable', type: 'Liability' },
    { id: '2002', name: 'Notes Payable', type: 'Liability' },
    { id: '2003', name: 'Accrued Liabilities', type: 'Liability' },
    { id: '3001', name: 'Owner\'s Capital', type: 'Equity' },
    { id: '3002', name: 'Retained Earnings', type: 'Equity' },
    { id: '4001', name: 'Sales Revenue', type: 'Revenue' },
    { id: '4002', name: 'Service Revenue', type: 'Revenue' },
    { id: '5001', name: 'Cost of Goods Sold', type: 'Expense' },
    { id: '5002', name: 'Office Supplies Expense', type: 'Expense' },
    { id: '5003', name: 'Rent Expense', type: 'Expense' },
    { id: '5004', name: 'Utilities Expense', type: 'Expense' },
    { id: '5005', name: 'Salaries Expense', type: 'Expense' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    const today = new Date().toISOString().split('T')[0];
    
    this.journalEntryForm = this.fb.group({
      creditAccount: ['', [Validators.required]],
      debitAccount: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      reference: [''],
      date: [today, [Validators.required]]
    }, { validators: this.differentAccountsValidator });
  }

  // Custom validator to ensure credit and debit accounts are different
  private differentAccountsValidator(form: FormGroup) {
    const creditAccount = form.get('creditAccount')?.value;
    const debitAccount = form.get('debitAccount')?.value;
    
    if (creditAccount && debitAccount && creditAccount === debitAccount) {
      return { sameAccounts: true };
    }
    return null;
  }

  getAccountDisplayName(account: Account): string {
    return `${account.id} - ${account.name} (${account.type})`;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.journalEntryForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.journalEntryForm.get(fieldName);
    if (field && field.errors) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} is required`;
      }
      if (field.errors['min']) {
        return 'Amount must be greater than 0';
      }
      if (field.errors['minlength']) {
        return 'Description must be at least 3 characters long';
      }
    }
    
    // Check for same accounts error
    if (this.journalEntryForm.errors?.['sameAccounts'] && 
        (fieldName === 'creditAccount' || fieldName === 'debitAccount')) {
      return 'Credit and debit accounts must be different';
    }
    
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      creditAccount: 'Credit Account',
      debitAccount: 'Debit Account',
      amount: 'Amount',
      description: 'Description',
      date: 'Date'
    };
    return labels[fieldName] || fieldName;
  }

  onSubmit(): void {
    if (this.journalEntryForm.valid) {
      const formData: JournalEntry = this.journalEntryForm.value;
      console.log('Journal Entry Submitted:', formData);
      
      // Here you would typically call a service to save the journal entry
      // this.journalService.createEntry(formData).subscribe(...)
      
      alert('Journal entry created successfully!');
      this.resetForm();
    } else {
      // Mark all fields as touched to show validation errors
      this.markAllFieldsAsTouched();
    }
  }

  onReset(): void {
    this.resetForm();
  }

  private resetForm(): void {
    const today = new Date().toISOString().split('T')[0];
    this.journalEntryForm.reset({
      creditAccount: '',
      debitAccount: '',
      amount: '',
      description: '',
      reference: '',
      date: today
    });
  }

  private markAllFieldsAsTouched(): void {
    Object.keys(this.journalEntryForm.controls).forEach(key => {
      this.journalEntryForm.get(key)?.markAsTouched();
    });
  }
}

