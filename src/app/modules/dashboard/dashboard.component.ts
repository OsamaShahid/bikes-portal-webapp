import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    standalone: true,
    imports: [RouterOutlet, FormsModule],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
