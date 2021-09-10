import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LikeBtnComponent } from './like-btn.component';

@NgModule({
  declarations: [LikeBtnComponent],
  imports: [CommonModule],
  exports: [LikeBtnComponent],
})
export class LikeBtnModule {}
