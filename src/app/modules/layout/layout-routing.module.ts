import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { BikeDetailsComponent } from '../dashboard/components/bike/bike-details/bike-details.component';
import { BikeService } from '../dashboard/services/bike.service';

const routes: Routes = [
  {
    path: 'dashboard',
    component: LayoutComponent,
    loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'dashboard/bikes/details/:id', component: BikeDetailsComponent,
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [BikeService],
})
export class LayoutRoutingModule {}
