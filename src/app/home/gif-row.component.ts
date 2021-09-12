import { CdkVirtualForOf } from '@angular/cdk/scrolling';
import { Component, Input } from '@angular/core';
import { GIFObject } from 'giphy-api';

import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-gif-row',
  styleUrls: ['home.component.scss'],
  template: `
    <img class="gif" [src]="gif.images.original.url" />

    <app-like-btn
      *ngIf="!!auth.user"
      class="btn"
      [liked]="liked"
      (onLike)="api.likeGif(gif)"
      (onUnlike)="api.unlikeGif(gif)"
    ></app-like-btn>

    <img
      class="btn"
      src="assets/view-details.svg"
      [routerLink]="['details', gif.id]"
    />
  `,
})
export class GifRowComponent {
  @Input() gif: GIFObject;
  @Input() liked = false;

  // TODO: update list
  readonly likes: string[] = [];

  constructor(
    public api: ApiService,
    public auth: AuthService,
    private virtualFor: CdkVirtualForOf<any>
  ) {}
}
