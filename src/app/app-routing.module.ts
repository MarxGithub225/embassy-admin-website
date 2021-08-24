import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorsComponent } from './modules/administrators/administrators.component';
import { BannerComponent } from './modules/banner/banner.component';
import { EmbassyComponent } from './modules/embassy/embassy.component';
import { HomeComponent } from './modules/home/home.component';
import { NewsComponent } from './modules/news/news.component';
import { UserComponent } from './modules/user/user.component';
import { VisaComponent } from './modules/visa/visa.component';

const routes: Routes = [
  {
    path: '',
    component:  EmbassyComponent
  },
  {
    path: 'embassies',
    component:  EmbassyComponent
  },
  {
    path: 'admins',
    component:  AdministratorsComponent
  },
  {
    path: 'visas',
    component:  VisaComponent
  },
  {
    path: 'news',
    component:  NewsComponent
  },
  {
    path: 'users',
    component:  UserComponent
  },
  {
    path: 'banners',
    component:  BannerComponent
  },
  {
    path: '**',
    component: EmbassyComponent
  },
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
