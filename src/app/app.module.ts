import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SideNavComponent } from './component/side-nav/side-nav.component';
import { FooterComponent } from './component/footer/footer.component';
import { InventoryComponent } from './journal/inventory/inventory.component';
import { SalesComponent } from './journal/sales/sales.component';
import { AccountsComponent } from './master-acc/accounts/accounts.component';
import { JournalEntryComponent } from './journal/journal-entry/journal-entry.component';
import { CommonModule } from '@angular/common';
import { AccontReportComponent } from './reports/accont-report/accont-report.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SideNavComponent,
    FooterComponent,
    InventoryComponent,
    SalesComponent,
    AccountsComponent,
    JournalEntryComponent,
    AccontReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
