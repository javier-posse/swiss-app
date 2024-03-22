import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { StartGameComponent } from './components/start-game/start-game.component';



@NgModule({
  declarations: [
    HomePageComponent,
    StartGameComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HomePageComponent
  ]
})
export class SuizosModule { }
