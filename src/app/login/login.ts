import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  private router = inject(Router);

  login() {
    // Simple mock authentication: accept any non-empty username and password
    if (this.username.trim() && this.password.trim()) {
      this.errorMessage = '';
      // Navigate to home page after login
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Please enter username and password.';
    }
  }
}
