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
    <div class="buttons">
      <button (click)="auth.logOut()">
        {{ this.auth.user ? 'Log Out' : 'Log In' }}
      </button>
      <button (click)="onToggleFilter()">
        {{ likedOnly$.value ? 'All Gifs' : 'Liked Gifs' }}
      </button>
    </div>

    <cdk-virtual-scroll-viewport
      itemSize="300"
      (scrolledIndexChange)="onScroll()"
    >
      <app-gif-row
        *cdkVirtualFor="let gif of data$ | async; trackBy: trackBy"
        class="item"
        [gif]="gif"
        [liked]="likes.includes(gif.id)"
      ></app-gif-row>
    </cdk-virtual-scroll-viewport>
  `,
})
export class HomeComponent {
  readonly limit = 10;

  get likes(): string[] {
    return this.api.getLikes();
  }

  offset$ = new BehaviorSubject(0);
  likedOnly$ = new BehaviorSubject(false);
  data$: Observable<GIFObject[]>;

  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;

  constructor(public api: ApiService, public auth: AuthService) {
    // unecessary to unsubscribe given that emits on user interaction only
    this.likedOnly$.subscribe((likedOnly) =>
      likedOnly ? this.getLikedGifs() : this.getAllGifs()
    );
  }

  onScroll() {
    const renderedRangeEnd = this.viewport.getRenderedRange().end;
    const dataLength = this.viewport.getDataLength();

    if (!!dataLength && renderedRangeEnd === dataLength) {
      this.offset$.next(this.offset$.value + this.limit);
    }
  }

  trackBy(gif: GIFObject) {
    return gif.id;
  }

  onToggleFilter() {
    this.likedOnly$.next(!this.likedOnly$.value);
  }

  getAllGifs() {
    this.data$ = this.offset$.pipe(
      mergeMap((offset) => this.api.getGifs(offset, this.limit)),
      scan((acc, data: GIFObject[]) => acc.concat(data), [])
    );
  }

  getLikedGifs() {
    this.data$ = this.api.getGifsByIds(this.likes);
  }
}
