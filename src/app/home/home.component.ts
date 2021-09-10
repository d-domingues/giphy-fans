import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, ViewChild } from '@angular/core';
import { GIFObject } from 'giphy-api';
import { Observable } from 'rxjs';
import { mergeMap, scan } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { ApiService } from './../services/api.service';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
  template: `
    <button class="log-btn" (click)="auth.logOut()">
      {{ this.auth.user ? 'Log Out' : 'Log In' }}
    </button>
    <cdk-virtual-scroll-viewport appendOnly itemSize="350">
      <div
        *cdkVirtualFor="let gif of data$ | async; trackBy: trackBy"
        class="item"
      >
        <img class="gif" [src]="gif.images.original.url" />

        <app-like-btn
          *ngIf="!!auth.user"
          class="btn"
          [liked]="likes.includes(gif.id)"
          (onLike)="api.likeGif(gif)"
          (onUnlike)="api.unlikeGif(gif)"
        ></app-like-btn>

        <img
          class="btn"
          src="assets/view-details.svg"
          [routerLink]="['details', gif.id]"
        />
      </div>
    </cdk-virtual-scroll-viewport>
  `,
})
export class HomeComponent {
  data$: Observable<GIFObject[]>;
  likes: string[] = this.api.getLikes();

  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;

  constructor(public api: ApiService, public auth: AuthService) {}

  ngAfterViewInit() {
    this.data$ = this.viewport.scrolledIndexChange.pipe(
      mergeMap((page) => this.api.getGifs(page)),
      scan((acc, data: GIFObject[]) => acc.concat(data), [])
    );
  }

  trackBy(gif: GIFObject) {
    return gif.id;
  }
}
