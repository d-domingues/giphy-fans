import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  get user() {
    return localStorage.getItem('auth_user');
  }

  constructor(private router: Router) {}

  logIn({ username, password }) {
    const users = JSON.parse(localStorage.getItem('giphy_fans')) || {};
    const user = users[username];

    if (!username.trim() || !password.trim()) {
      return alert('insert required fields');
    }

    if (!user) {
      return alert('user not registered');
    }

    if (user.password === password) {
      localStorage.setItem('auth_user', username);
      this.router.navigateByUrl('home');
    } else {
      alert('error pass');
    }
  }

  register({ username, password }) {
    const users = JSON.parse(localStorage.getItem('giphy_fans')) || {};
    const user = users[username];

    if (!username.trim() || !password.trim()) {
      return alert('insert required fields');
    }

    if (!!user) {
      return alert('user already registered');
    }

    localStorage.setItem(
      'giphy_fans',
      JSON.stringify({
        ...users,
        [username]: {
          ...users[username],
          password,
          likes: [],
        },
      })
    );

    this.logIn({ username, password });
  }

  logOut() {
    localStorage.removeItem('auth_user');
    this.router.navigateByUrl('login');
  }

  skipLogIn() {
    this.router.navigateByUrl('home');
  }
}
