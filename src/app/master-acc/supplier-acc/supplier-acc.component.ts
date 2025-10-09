import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccCategoryService } from '../../services/master-accounts/acc-category.service';
import { AccountService } from '../../services/master-accounts/account.service';
import { ToastrService } from 'ngx-toastr';
import { CreateAccount } from '../../models/account';

@Component({
  selector: 'app-supplier-acc',
  templateUrl: './supplier-acc.component.html',
  styleUrl: './supplier-acc.component.css'
})
export class SupplierAccComponent implements OnInit {
  public isModalOpen = false;
  public addAccountForm!: FormGroup;

  accounts: any[] = [];

  constructor(
    private accCategoryService: AccCategoryService,
    private fb: FormBuilder,
    private accountService: AccountService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this,this.getSupAccounts();
    this.addAccountForm = this.fb.group({
      acc_name: ['', Validators.required],
      acc_desc: ['', Validators.required],
    });
  }

   private getSupAccounts(): void {
    this.accountService.getSupAccounts().subscribe({
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
          const catId = 0;
          const isCurrent = "3";
          const catCode = "22";
          
          const accountData: CreateAccount = {
            name: this.addAccountForm.value.acc_name,
            description: this.addAccountForm.value.acc_desc,
            isCurrent: isCurrent,
            catId: catId,
            catCode: catCode,
            createdBy: 'shanuka',
            updatedBy: 'shanuka',
          };
          this.accountService.createCusSupAccount(accountData).subscribe({
            next: (response: any) => {
              if (response.status) {
                this.toastr.success('Account created successfully', 'Success');
                this.closeModal();
                this.resetForm();
                this.getSupAccounts();
              } else {
                this.toastr.error('Failed to create account: ' + response.errorMessages.join(', '), 'Error');
                this.closeModal();
                this.resetForm();
              }
            },
            error: (error) => {
              console.error('Error creating account', error);
            }
          });
      } else {
        console.error('Form is invalid');
        this.toastr.error('Form is invalid', 'Error');
        this.addAccountForm.markAllAsTouched();
    }
  }
}
