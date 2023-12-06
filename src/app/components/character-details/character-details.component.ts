import { Component, Input, OnInit, inject } from '@angular/core';
import { CharactesService } from '../../services/charactes.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [NgFor, RouterLink, NgxPaginationModule],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.css',
})
export class CharacterDetailsComponent implements OnInit {
  @Input() id: string = '';
  p: number = 1;
  charatesServices = inject(CharactesService);
  character: any;

  ngOnInit() {
    this.findCharacterById()
  }

  findCharacterById() {
    this.charatesServices.getDataById(+this.id).subscribe({
      next: (data: any) => {
        this.character = data;
        console.log(this.character);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
