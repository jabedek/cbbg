import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { PopoverComponent } from './components/popover/popover.component';

@NgModule({
  declarations: [SpinnerComponent, PopoverComponent],
  imports: [CommonModule],
  exports: [SpinnerComponent, PopoverComponent],
})
export class SharedModule {}
