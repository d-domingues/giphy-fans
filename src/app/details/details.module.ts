import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LikeBtnModule } from './../like-btn/like-btn.module';
import { DetailsComponent } from './details.component';

@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: ':gifId', component: DetailsComponent }]),
    LikeBtnModule,
  ],
})
export class DetailsModule {}
