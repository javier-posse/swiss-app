import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { SuizosService } from '../../services/suizos.service';
import { Game, Round, Match, Player } from '../../interfaces/game.component';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html'
})
export class StartGameComponent {

  @ViewChild("players")
  public containerRef!: ElementRef<HTMLInputElement>;

  constructor(private suizosService:SuizosService, private router: Router){}

  addPlayerInput(){
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.placeholder = 'Nombre de jugador';
    inputElement.className = "mt-1 form-control";

    this.containerRef.nativeElement.appendChild(inputElement);
  }

  startGame(){
    const players = this.containerRef.nativeElement.children;
    let playerList : Player[] = [];
    for (let i=0; i<players.length; i++){
      const element = players[i];
      if (element instanceof HTMLInputElement) {
        if(element.value!=""){
          let player:Player={playerName:element.value, playerWins:[], playerLoses:[], playerPoints:0};
          playerList.push(player);
        }
      }
    }
    const game : Game = new Game(playerList, 30);
    console.log(playerList)
    console.log(game)
    this.suizosService.startNewGame(game);
    this.router.navigate( ['/report-round'] );
  }
}
