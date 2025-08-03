import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  showPassword = false;
  loginError = '';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    console.log("sdcscsc");
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.loginError = '';

      // Simulate API call
      setTimeout(() => {
        const { email, password } = this.loginForm.value;
        
        // Mock authentication logic
        if (email === 'admin@example.com' && password === 'password123') {
          console.log('Login successful:', this.loginForm.value);
          this.router.navigate(['/home']);
        } else {
          this.loginError = 'Invalid email or password';
        }
        
        this.isLoading = false;
      }, 1500);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  onGoogleLogin(): void {
    console.log('Google login initiated');
    // Implement Google OAuth logic here
  }

  onGithubLogin(): void {
    console.log('GitHub login initiated');
    // Implement GitHub OAuth logic here
  }
}
