import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { RouterModule } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-category-bar',
  templateUrl: './category-bar.component.html',
  imports:[RouterModule, NgFor, CommonModule],
  styleUrls: ['./category-bar.component.scss']
})
export class CategoryBarComponent implements OnInit {

  public categorias!: any [];

  constructor(
    private categoriaService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.loadCategories();

  }
  loadCategories(){
    this.categoriaService.getAll().subscribe(
      resp => {
        this.categorias = resp;
      }
    )
  }

}
