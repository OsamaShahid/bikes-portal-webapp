import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Bike } from '../../../models/bike';
import { BikeService } from '../../../services/bike.service';
import { CurrencyPipe, NgClass, NgStyle } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-bike-details',
  templateUrl: './bike-details.component.html',
  standalone: true,
  imports: [NgStyle, CurrencyPipe, AngularSvgIconModule, NgClass, ButtonComponent,
    FormsModule,
    BrowserModule,
  ]
})
export class BikeDetailsComponent implements OnInit {

  @Output() backButtonClicked = new EventEmitter<void>();
  @Input() id: string = '';
  bike: Bike = {} as Bike;
  bikeDetails: Bike = {} as Bike;
  isModalOpen: boolean = false;

  constructor(private bikeService: BikeService) {}

  ngOnInit(): void {
    this.bikeService.getById(this.id?.toString()).subscribe(
        (bike: Bike) => {
          this.bike = bike;
        },
        (error) => {
          console.error('Error fetching bike details:', error);
        });
    }

    goBack() {
        this.backButtonClicked.emit();
      
    }

    deleteBike() {
        this.bikeService.deleteBike(this.bike?.id as string).subscribe((res) => {
            if (res) {
                this.backButtonClicked.emit();
            }
        });
    }

    patchBike() {
        if (!this.bikeDetails.title || !this.bikeDetails.handle || !this.bikeDetails.productType || !this.bikeDetails.vendor || !this.bikeDetails.description) {
            return;
        }

        let { priceRange, ...patchData } = this.bikeDetails;
        const patchBody: any = { ...this.bikeDetails, priceRange: { minPrice: { ...this.bikeDetails.priceRange.minPrice }, maxPrice: { ...this.bikeDetails.priceRange.maxPrice } } };
        delete patchBody.created;
        delete patchBody.updated;

        this.bikeService.replaceExistingBike(this.bikeDetails.id, patchBody).subscribe((updatedBike: Bike) => {
            if (updatedBike) {
              this.bikeDetails = {} as Bike;  
              this.bike = { ...updatedBike }
            }
        })
        this.closeModal();
    }

    openModal(): void {
        this.bikeDetails = { ...this.bike, priceRange: { minPrice: { ...this.bike.priceRange.minPrice }, maxPrice: { ...this.bike.priceRange.maxPrice } } };
        this.isModalOpen = true;
    }
    
      closeModal(): void {
        this.isModalOpen = false;
      }
  }
