import { Component, OnInit } from '@angular/core';
import { Bike } from '../../models/bike';
import { BikeService } from '../../services/bike.service';
import { BikeHeaderComponent } from '../../components/bike/bike-header/bike-header.component';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BikeDetailsComponent } from '../../components/bike/bike-details/bike-details.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
    selector: 'app-bike',
    templateUrl: './bike.component.html',
    standalone: true,
    imports: [
      BikeHeaderComponent,
      AgGridAngular,
      ButtonComponent,
      FormsModule,
      BrowserModule,
      BikeDetailsComponent
    ],
})
export class BikeComponent implements OnInit {
  bikes: Array<Bike> = [];

  showingDetails: boolean = false;

  clickedRowData: Bike = {} as Bike;

  bike: Bike = {
    id: '', // You may handle ID generation differently
    title: '',
    description: '',
    handle: '',
    productType: '',
    createdAt: '',
    vendor: '',
    totalInventory: 0,
    availableForSale: false,
    priceRange: {
      minPrice: { currencyCode: 'USD', amount: 0 },
      maxPrice: { currencyCode: 'USD', amount: 0 }
    }
  };

  isModalOpen = false;

  columnDefs: ColDef[] = [
    { headerName: 'Title', field: 'title' },
    { headerName: 'Description', field: 'description' },
    { headerName: 'Handle', field: 'handle' },
    { headerName: 'Product Type', field: 'productType' },
    { headerName: 'Vendor', field: 'vendor' },
    { headerName: 'Total Inventory', field: 'totalInventory' },
    { headerName: 'Availability for sale', field: 'availableForSale',  valueFormatter: (param) => { return param.data.valueFormatter ? 'yes' : 'no' }}
  ];

  constructor(private bikeService: BikeService, private router: Router) {
  }

  clearBike() {
    this.bike = {
      id: '', // You may handle ID generation differently
      title: '',
      description: '',
      handle: '',
      productType: '',
      createdAt: '',
      vendor: '',
      image: '',
      totalInventory: 0,
      availableForSale: false,
      priceRange: {
        minPrice: { currencyCode: 'USD', amount: 0 },
        maxPrice: { currencyCode: 'USD', amount: 0 }
      }
    };
  }

  fetchBikes() {
    this.bikeService.listAll().subscribe(bikesData => {
        if (bikesData.length) {
            this.bikes = [ ...bikesData ];
        }
    });
  }

  ngOnInit(): void {
    this.fetchBikes();
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  saveBike(): void {
    if (!this.bike.title || !this.bike.handle || !this.bike.productType || !this.bike.vendor || !this.bike.description) {
      return;
    }

    this.bike.createdAt = (new Date()).toISOString();

    this.bikeService.createBike(this.bike).subscribe(res => {
      if (res) {
        this.clearBike();
        this.fetchBikes();
      }
    })

    this.closeModal();
  }

  onRowClicked(event: any) {
    const bikeDetails = event.data;
    this.clickedRowData  = bikeDetails;
    this.showingDetails = true;
    // this.router.navigate(['/dashboard/bikes/details', bikeDetails.id]);
  }

  clearClickedRow() {
    this.showingDetails = false;
    this.clickedRowData = {} as Bike;
    this.fetchBikes();
  }
}
