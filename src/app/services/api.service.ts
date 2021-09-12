import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GIFObject } from 'giphy-api';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getGifData(gifId: string): Observable<GIFObject> {
    return this.http
      .get(`https://api.giphy.com/v1/gifs/${gifId}`, {
        params: { api_key: 'hwDpo6kxm4XyMvxuOiYEhWcfIbA9U4Jc' },
      })
      .pipe(pluck('data'));
  }

  getGifs(offset: number, limit: number): Observable<GIFObject[]> {
    return this.http
      .get('https://api.giphy.com/v1/gifs/trending', {
        params: {
          api_key: 'hwDpo6kxm4XyMvxuOiYEhWcfIbA9U4Jc',
          rating: 'pg-13',
          limit: limit + '',
          offset: offset + '',
        },
      })
      .pipe(pluck('data'));
  }

  getGifsByIds(ids: string[]): Observable<GIFObject[]> {
    const params = new HttpParams({
      fromObject: {
        api_key: 'hwDpo6kxm4XyMvxuOiYEhWcfIbA9U4Jc',
        ids: ids.join(),
      },
    });

    return this.http
      .get('https://api.giphy.com/v1/gifs', { params })
      .pipe(pluck('data'));
  }

  getLikes() {
    const users = JSON.parse(localStorage.getItem('giphy_fans'));
    return users[this.auth.user] ? users[this.auth.user].likes : [];
  }

  likeGif(gif: GIFObject) {
    const users = JSON.parse(localStorage.getItem('giphy_fans'));

    localStorage.setItem(
      'giphy_fans',
      JSON.stringify({
        ...users,
        [this.auth.user]: {
          ...users[this.auth.user],
          likes: [...users[this.auth.user].likes, gif.id],
        },
      })
    );
  }

  unlikeGif(gif: GIFObject) {
    const users = JSON.parse(localStorage.getItem('giphy_fans'));

    localStorage.setItem(
      'giphy_fans',
      JSON.stringify({
        ...users,
        [this.auth.user]: {
          ...users[this.auth.user],
          likes: users[this.auth.user].likes.filter(
            (gifId) => gifId !== gif.id
          ),
        },
      })
    );
  }
}
