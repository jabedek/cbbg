import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';

@NgModule({
  declarations: [AuthLayoutComponent],
  imports: [CommonModule, RouterModule.forChild([])],
  exports: [AuthLayoutComponent],
})
export class LayoutModule {}
