import { Component } from '@angular/core';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  styles: [
    `
      form {
        border: 3px solid #f1f1f1;
        margin: auto;
        padding: 16px;
      }

      input {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        box-sizing: border-box;
      }

      img {
        height: 20vh;
        border-radius: 20px;
        margin: auto;
        display: block;
      }

      span.password {
        float: right;
        padding-top: 16px;
      }

      @media screen and (min-width: 500px) {
        form {
          width: 50%;
        }

        .buttons {
          display: flex;
          gap: 8px;
        }
      }
    `,
  ],
  template: `
    <form #form="ngForm">
      <h2>Login</h2>

      <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" />

      <label for="username"><b>Username</b></label>
      <input type="text" name="username" ngModel required />

      <label for="password"><b>Password</b></label>
      <input type="password" name="password" ngModel required />

      <div class="buttons">
        <button (click)="auth.logIn(form.value)">Login</button>
        <button (click)="auth.register(form.value)">Register</button>
        <button (click)="auth.skipLogIn()">Skip that!</button>
      </div>
    </form>
  `,
})
export class LoginComponent {
  constructor(public auth: AuthService) {
    if (!!this.auth.user) {
      this.auth.skipLogIn();
    }
  }
}
