import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './suizos/pages/home-page/home-page.component';
import { ReportRoundComponent } from './suizos/components/report-round/report-round.component';
import { RankingComponent } from './suizos/components/ranking/ranking.component';

const routes: Routes = [
  {path: '', component:HomePageComponent},
  {path: 'report-round', component:ReportRoundComponent},
  {path: 'ranking', component:RankingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
