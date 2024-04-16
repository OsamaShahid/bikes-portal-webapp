import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { BikeComponent } from './pages/bike/bike.component';
import { BikeDetailsComponent } from './components/bike/bike-details/bike-details.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'bikes', pathMatch: 'full' },
      { path: 'bikes', component: BikeComponent },
      { path: 'bikes/details/:id', component: BikeDetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
