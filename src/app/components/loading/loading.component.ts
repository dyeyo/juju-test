import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [NgFor],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css',
})
export class LoadingComponent {
  @Input() loading: boolean = false

  constructor(){
    console.log(this.loading);
  }
}
