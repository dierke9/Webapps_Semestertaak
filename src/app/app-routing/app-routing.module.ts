import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { LoginRegisterComponent } from '../user/login-register/login-register.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from '../forum/categories/categories.component';
import { CategoryDetailComponent } from '../forum/category-detail/category-detail.component';
import { ArticleComponent } from '../article/article.component';
import { AddArticleComponent } from '../home/add-article/add-article.component';
import { ReactiveFormsModule } from '@angular/forms';


const approutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'article/:id', component: ArticleComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(approutes)
  ],
  declarations: [
    HomeComponent,
    PageNotFoundComponent,
    ArticleComponent,
    AddArticleComponent
  ],
  exports: [
    RouterModule
  ],
  entryComponents: [AddArticleComponent]
})
export class AppRoutingModule { }
