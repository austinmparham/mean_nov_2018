import { AlphaComponent } from './alpha/alpha.component';
import { BetaComponent } from './beta/beta.component';
import { GammaComponent } from './gamma/gamma.component';
import { DeltaComponent } from './delta/delta.component';
import { SigmaComponent } from './sigma/sigma.component';
import { OmegaComponent } from './omega/omega.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: 'alpha',component: AlphaComponent },
  { path: 'restaurants',component: BetaComponent },
  { path: 'restaurants/new', component: GammaComponent },
  { path: 'restaurants/review/:id',component: SigmaComponent },
  { path: 'restaurants/edit/:id',component: OmegaComponent },
  { path: 'restaurants/:id',component: DeltaComponent },
  // use a colon and parameter name to include a parameter in the url
  // redirect to /beta if there is nothing in the url
  { path: '', pathMatch: 'full', redirectTo: '/restaurants' },
  // the ** will catch anything that did not match any of the above routes
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
