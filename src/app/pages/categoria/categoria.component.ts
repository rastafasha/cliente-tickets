import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Category } from '../../models/category';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Evento } from '../../models/evento';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CategoryBarComponent } from '../../components/category-bar/category-bar.component';
import { ImagenPipe } from '../../pipes/imagen.pipe';
import { BackButtnComponent } from '../../shared/backButtn/backButtn.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { MenuFooterComponent } from '../../shared/menu-footer/menu-footer.component';

@Component({
  selector: 'app-categoria',
  imports: [HeaderComponent,MenuFooterComponent,
    CommonModule, NgFor,NgIf,LoadingComponent, ReactiveFormsModule, FormsModule,
    RouterLink, ImagenPipe, BackButtnComponent,CategoryBarComponent
  ],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {

  categoria!: Category;
  events:Evento [] = [];
  isLoading = false;
  isEvent = false;
    pageTitle = 'Categoria';


    p: number = 1;
    count: number = 8;
  
    error!: string;
    selectedValue!: any;
    msm_error!: string;
    query: string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService
  ){}

  ngOnInit(){
    this.activatedRoute.params.subscribe( ({id}) => this.getCategory(id));
  }

   getCategory(id:number){
    this.categoryService.getById(+id).subscribe((resp:any)=>{
      this.categoria = resp;
      this.pageTitle = 'Categoría ' + this.categoria.name;
      this.getProductByCategory()
    })
  }


  getProductByCategory(){
    this.isLoading = true;
    this.categoryService.getEventsByCat(this.categoria.id).subscribe( (res:any) =>{
      this.events = res.events.data;
      this.isLoading = false;
      if(this.events.length > 0){
        this.isEvent = true;
      }else{
        this.isEvent = false;
      }
      });

  }


   search() {
      return this.categoryService.search(this.query).subscribe((res: any) => {
        this.events = res;
        if (!this.query) {
          this.ngOnInit();
        }
      });
    }
  
    public PageSize(): void {
      this.ngOnInit();
      this.query = '';
    }
}
