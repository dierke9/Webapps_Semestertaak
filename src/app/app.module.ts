import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { HeaderComponent } from './header/header.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import { UserModule } from './user/user.module';
import { ForumModule } from './forum/forum.module';


@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    ForumModule,
    UserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
