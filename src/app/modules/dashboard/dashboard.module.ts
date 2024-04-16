import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BikeService } from './services/bike.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [DashboardRoutingModule, HttpClientModule, AgGridModule, BrowserModule, FormsModule],
  providers: [BikeService],
})
export class DashboardModule {}
