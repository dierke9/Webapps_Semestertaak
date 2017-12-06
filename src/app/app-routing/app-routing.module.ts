import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { LoginRegisterComponent } from '../user/login-register/login-register.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from '../forum/categories/categories.component';
import { CategoryDetailComponent } from '../forum/category-detail/category-detail.component';


const approutes: Routes = [
  { path: 'home', component: HomeComponent },
  // {path: 'categories', component: CategoriesComponent},
  // { path: 'login', component: LoginRegisterComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(approutes)
  ],
  declarations: [
    HomeComponent,
    PageNotFoundComponent
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
