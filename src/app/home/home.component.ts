import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, ViewChild } from '@angular/core';
import { GIFObject } from 'giphy-api';
import { BehaviorSubject, Observable } from 'rxjs';
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
    <cdk-virtual-scroll-viewport
      appendOnly
      itemSize="350"
      (scrolledIndexChange)="onScroll()"
    >
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
  readonly limit = 10;
  // TODO: update list
  readonly likes: string[] = this.api.getLikes();

  offset$ = new BehaviorSubject(0);
  data$: Observable<GIFObject[]>;

  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;

  constructor(public api: ApiService, public auth: AuthService) {
    this.data$ = this.offset$.pipe(
      mergeMap((offset) => this.api.getGifs(offset, this.limit)),
      scan((acc, data: GIFObject[]) => acc.concat(data), [])
    );
  }

  onScroll() {
    const renderedRangeEnd = this.viewport.getRenderedRange().end;
    const dataLength = this.viewport.getDataLength();

    if (renderedRangeEnd === dataLength) {
      this.offset$.next(this.offset$.value + this.limit);
    }
  }

  trackBy(gif: GIFObject) {
    return gif.id;
  }
}
