import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SideNavComponent } from './component/side-nav/side-nav.component';
import { FooterComponent } from './component/footer/footer.component';
import { InventoryComponent } from './journal/inventory/inventory.component';
import { SalesComponent } from './journal/sales/sales.component';
import { AccountsComponent } from './master-acc/accounts/accounts.component';
import { JournalEntryComponent } from './journal/journal-entry/journal-entry.component';

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
    JournalEntryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
