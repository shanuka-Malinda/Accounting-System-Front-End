import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable, Subscription } from 'rxjs';
import { Account, CreateAccount } from '../../models/account';
import { AccountService } from '../../services/master-accounts/account.service';
import { AccCategoryService } from '../../services/master-accounts/acc-category.service';
import { AccCategory, AccCategoryOnly } from '../../models/acc-category';
import { ApiResponse } from '../../models/api-response';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit {
  public accountGroups$!: Observable<AccCategory[]>;
  public expandedGroupId: number | null = null;
  public accountCategories$!: Observable<AccCategoryOnly[]>;
  public isModalOpen = false;
  public addAccountForm!: FormGroup;

  constructor(private accCategoryService: AccCategoryService, private fb: FormBuilder, private accountService: AccountService) { }

  ngOnInit() {
    this.getAllAccDetails();
    this.getCategories();
    this.addAccountForm = this.fb.group({
      acc_name: ['', Validators.required],
      acc_desc: ['', Validators.required],
      acc_opening_balance: ['', Validators.required],
      acc_credit_limit: ['', Validators.required],
      acc_current_balance: ['', Validators.required],
      acc_cat: ['', Validators.required]
    });
  }
  getAllAccDetails() {
    this.accountGroups$ = this.accCategoryService.getAccountGroups();
  }
  getCategories() {
    this.accountCategories$ = this.accCategoryService.getAccountCategories();
  }
  toggleAccounts(groupId: number) {
    this.expandedGroupId = this.expandedGroupId === groupId ? null : groupId;
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  resetForm() {
    this.addAccountForm.reset();
    this.addAccountForm.markAsPristine();
    this.addAccountForm.markAsUntouched();
  }

  onSubmit() {
    if (this.addAccountForm.valid) {
      const selectedCategoryId = this.addAccountForm.value.acc_cat;
      this.accountCategories$.pipe(
        map(categories => {
          return categories.find(cat => cat.id == Number(selectedCategoryId));
        })
      ).subscribe(selectedCategory => {
        if (selectedCategory) {
          const accountData: CreateAccount = {
            name: this.addAccountForm.value.acc_name,
            description: this.addAccountForm.value.acc_desc,
            openingBalance: Number(this.addAccountForm.value.acc_opening_balance),
            currentBalance: Number(this.addAccountForm.value.acc_current_balance),
            creditLimit: Number(this.addAccountForm.value.acc_credit_limit),
            catId: selectedCategory.id,
            catCode: selectedCategory.code,
            createdBy: 'shanuka',
            updatedBy: 'shanuka',
          };
          this.accountService.createAccount(accountData).subscribe({
            next: (response: any) => {
              if (response.status) {
                alert('Account created successfully'+ response.payload);
                this.closeModal();
                this.getAllAccDetails();
              } else {
                alert('Failed to create account: ' + response.errorMessages.join(', '));
                this.closeModal();
                this.getAllAccDetails();
              }

            },
            error: (error) => {
              console.error('Error creating account', error);
            }
          });
        } else {
          console.error('Selected category not found for ID:', selectedCategoryId);
        }
      });
    } else {
      console.error('Form is invalid');
      alert('Form is invalid');
      this.addAccountForm.markAllAsTouched();
    }
  }

}

