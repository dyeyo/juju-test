import { Component, OnInit, inject } from '@angular/core';
import { CharactesService } from './../../services/charactes.service';
import { CommonModule, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from './../loading/loading.component';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-characters',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    RouterLink,
    ReactiveFormsModule,
    LoadingComponent,
  ],
  templateUrl: './list-characters.component.html',
  styleUrl: './list-characters.component.css',
})
export class ListCharactersComponent {
  formBuilder = inject(FormBuilder);
  charatesServices = inject(CharactesService);
  http = inject(HttpClient);
  formFilter!: FormGroup;
  charactes?: any;
  loading: boolean = true;
  info?: {};
  genders = [
    {
      key: 'Male',
      name: 'Masculino',
    },
    {
      key: 'Female',
      name: 'Femenino',
    },
  ];
  currentPage: number = 1;

  ngOnInit(): void {
    this.getDataCharacters(1);
    this.createForm();
  }

  createForm() {
    this.formFilter = this.formBuilder.group({
      filter: [''],
      gender: [''],
    });
  }

  getDataCharacters(page: number) {
    this.loading = true;
    const filters = {
      name: this.formFilter?.get('filter')?.value || '',
      gender: this.formFilter?.get('gender')?.value || '',
    };
    this.charatesServices.getData(filters, page)?.subscribe({
      next: (data: any) => {
        this.charactes = data.results;
        this.info = data.info;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }

  minusPage() {
    if (this.currentPage === 0) {
      return;
    }
    this.currentPage -= 1;
    this.getDataCharacters(this.currentPage);
  }

  addPage(page: number) {
    this.currentPage += page;
    this.getDataCharacters(this.currentPage);
  }
}
