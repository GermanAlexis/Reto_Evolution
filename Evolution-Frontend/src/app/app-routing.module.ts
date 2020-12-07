import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { PagesnotfoundComponent } from './pagesnotfound/pagesnotfound.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PagesnotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            AuthRoutingModule,
            PagesRoutingModule
          ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
