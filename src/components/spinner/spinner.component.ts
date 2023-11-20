import { Component, Input } from '@angular/core';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

  @Input() message: string | null = null
  isloading$ = this._spinnerService.isLoading$

  constructor(private _spinnerService: SpinnerService) {}
}
