// src/app/components/loader/loader.component.ts
import { Component } from '@angular/core';
import { LoaderService } from 'src/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  constructor(public loaderService: LoaderService) {}
}
