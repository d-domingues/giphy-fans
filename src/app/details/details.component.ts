import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GIFObject } from 'giphy-api';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ApiService } from './../services/api.service';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-details',
  template: `
    <button routerLink="/home">Return</button>

    <div *ngIf="gif$ | async as gif">
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
