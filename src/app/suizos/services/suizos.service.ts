import { Injectable } from '@angular/core';
import { Game, Round, Player } from '../interfaces/game.component';

@Injectable({providedIn: 'root'})
export class SuizosService{
  private players:Player[]=[];
  public game: Game = new Game(this.players, 30);
  private _gameList: Game[]=[];

  constructor() {
    this.loadLocalStorage();
   }

   get gameList(){
    return [...this._gameList];
  }

  public startNewGame(game:Game){
    this.game=game;
    this.game.rounds.push(this.game.generateNextRound());
    console.log("game start")
  }

  public saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._gameList));
  }

  private loadLocalStorage():void{
    if(localStorage.getItem('history')){
      this._gameList= JSON.parse(localStorage.getItem('history')!);
    }
  }
}
