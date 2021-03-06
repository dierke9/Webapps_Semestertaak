import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryDataService } from './category-data.service';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { SubCategoryService } from './sub-category.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThreadComponent } from './thread/thread.component';
import { ThreadService } from './thread.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthguardService } from '../user/authguard.service';
import { AddSubcatComponent } from './add-subcat/add-subcat.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddThreadComponent } from './add-thread/add-thread.component';
import { EditPostComponent } from './thread/edit-post/edit-post.component';

const routes: Routes = [
  { path: 'forum', component: CategoriesComponent, canActivate: [AuthguardService] },
  { path: 'category/:id', component: CategoryDetailComponent, canActivate: [AuthguardService] },
  { path: 'subCategory/:id', component: SubcategoryComponent, canActivate: [AuthguardService] },
  { path: 'thread/:id', component: ThreadComponent, canActivate: [AuthguardService] }
]

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CategoriesComponent,
    CategoryDetailComponent,
    SubcategoryComponent,
    ThreadComponent,
    AddSubcatComponent,
    AddCategoryComponent,
    AddThreadComponent,
    EditPostComponent
  ],
  providers: [
    CategoryDataService,
    SubCategoryService,
    ThreadService,
    AuthguardService
  ],
  entryComponents: [
    AddSubcatComponent,
    AddCategoryComponent,
    AddThreadComponent,
    EditPostComponent
  ]
})
export class ForumModule { }
