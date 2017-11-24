import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryDataService } from './category-data.service';

const routes : Routes = [
  { path: "forum", component: CategoriesComponent },
  { path: "category/:id", component: CategoryDetailComponent }
]

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CategoriesComponent,
    CategoryDetailComponent
  ],
  providers:[
    CategoryDataService
  ]
})
export class ForumModule { }
