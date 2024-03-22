import { SuizosService } from '../../services/suizos.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
})

export class RankingComponent{
  constructor(private suizosService : SuizosService, private router : Router){}
  public players = this.suizosService.game.players;
}
