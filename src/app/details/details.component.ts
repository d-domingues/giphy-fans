import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GIFObject } from 'giphy-api';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ApiService } from './../services/api.service';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-details',
  styles: [
    `
      .constainer {
        margin: 20px;
        box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px,
          rgba(0, 0, 0, 0.24) 0px 1px 2px;
        border-radius: 10px;
        justify-content: center;
      }

      .gif {
        width: max(20vw, 200px);
      }
    `,
  ],
  template: `
    <div class="constainer" *ngIf="gif$ | async as gif">
      <button routerLink="/home">Return</button>

      <img class="gif" [src]="gif.images.original.url" />

      <h1>{{ gif.title }}</h1>

      <app-like-btn
        *ngIf="!!auth.user"
        class="btn"
        [liked]="likes.includes(gif.id)"
        (onLike)="api.likeGif(gif)"
        (onUnlike)="api.unlikeGif(gif)"
      ></app-like-btn>

      <pre> {{ gif | json }} </pre>
    </div>
  `,
})
export class DetailsComponent {
  gif$: Observable<GIFObject>;
  likes: string[] = this.api.getLikes();

  constructor(
    private route: ActivatedRoute,
    public api: ApiService,
    public auth: AuthService
  ) {
    this.gif$ = this.route.params.pipe(
      switchMap(({ gifId }) => this.api.getGifData(gifId))
    );
  }
}
