import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeadlinesComponent } from './components/headlines/headlines.component';
import { AboutComponent } from './components/about/about.component';
  
const routes: Routes = [
  { path: '', redirectTo: '/headlines', pathMatch: 'full' },
  { path: 'headlines', component: HeadlinesComponent }, 
  { path: 'about', component: AboutComponent }, 
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
