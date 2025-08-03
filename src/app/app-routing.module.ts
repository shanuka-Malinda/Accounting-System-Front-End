import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { InventoryComponent } from './journal/inventory/inventory.component';
import { SalesComponent } from './journal/sales/sales.component';
import { AccountsComponent } from './master-acc/accounts/accounts.component';
import { JournalEntryComponent } from './journal/journal-entry/journal-entry.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent ,children: [
    {
      path:'master-acc',children:[
         {path:'acc',component:AccountsComponent}
      ]
    },
    {path:'journal',children:[
      {path:'journal-entry',component:JournalEntryComponent},
      {path:'inventory',component:InventoryComponent},
      {path:'sales',component:SalesComponent},
    ]}
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
