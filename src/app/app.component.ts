import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'acc';
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private route: Router) {
    this.loginForm = this.fb.group({
     username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Submitted:', this.loginForm.value);
       this.route.navigate(['/home']);
    }
  }
}
