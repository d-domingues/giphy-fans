import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LikeBtnModule } from './../like-btn/like-btn.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent },
      {
        path: 'details',
        loadChildren: () =>
          import('../details/details.module').then((m) => m.DetailsModule),
      },
    ]),
    LikeBtnModule,
    ScrollingModule,
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
