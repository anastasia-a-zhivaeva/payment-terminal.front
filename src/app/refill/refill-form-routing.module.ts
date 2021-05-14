import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RefillFormComponent } from './/containers';

const routes: Routes = [{ path: '', component: RefillFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RefillFormRoutingModule {}
