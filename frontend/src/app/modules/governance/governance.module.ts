import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GovernanceComponent } from './governance.component';

@NgModule({
  declarations: [GovernanceComponent],
  imports: [CommonModule, FormsModule],
  exports: [GovernanceComponent]
})
export class GovernanceModule {}
