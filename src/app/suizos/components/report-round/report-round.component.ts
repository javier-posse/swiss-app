import { Router } from '@angular/router';
import { SuizosService } from '../../services/suizos.service';
import { Component, ViewChildren, ElementRef, QueryList } from '@angular/core';

@Component({
  selector: 'app-report-round',
  templateUrl: './report-round.component.html',
  styleUrls: ['./report-round.component.scss']
})
export class ReportRoundComponent {

  public roundNumber = this.suizosService.game.playedRounds;
  public totalRounds = this.suizosService.game.numberOfRounds;
  public matches = this.suizosService.game.rounds[this.roundNumber].matches;
  @ViewChildren('inputElement') vc! : QueryList<ElementRef>;

  constructor(private suizosService:SuizosService, private router: Router){}

  addPoint (playerName: string) {
    const elementoEncontrado = document.getElementById(playerName);
    if (elementoEncontrado) {
      const inputElement = elementoEncontrado as HTMLInputElement;
      inputElement.value = (parseInt(inputElement.value) + 1).toString();
      this.matches.forEach(match => {
        if (match.firstPlayer===playerName){
          if (match.firstPlayerWins){
            match.firstPlayerWins=match.firstPlayerWins+1;
          } else {
            match.firstPlayerWins=1;
          }
        } else if (match.secondPlayer===playerName){
          if (match.secondPlayerWins){
            match.firstPlayerWins=match.secondPlayerWins+1;
          } else {
            match.secondPlayerWins=1;
          }
        }
      });
    } else {
      //TODO error alert
      console.log('Elemento no encontrado');
    }
  }

  endRound (endGame:boolean) {
    this.vc.forEach(input => {
      const elementoEncontrado = document.getElementById(input.nativeElement.name);
      if(elementoEncontrado){
        const inputRival = elementoEncontrado as HTMLInputElement;
        this.suizosService.game.players.forEach(player => {
          if(input.nativeElement.id===player.playerName){
            if(input.nativeElement.value>inputRival.value){
              player.playerWins.push(input.nativeElement.name);
              player.playerPoints+=3;
            } else{
              if(input.nativeElement.value===inputRival.value){
                player.playerPoints+=1;
              }
              player.playerLoses.push(inputRival.id);
            }
          }
        });
      }
      else {
        this.suizosService.game.players.forEach(player => {
          if(input.nativeElement.id===player.playerName){
            player.playerPoints+=3;
          }
        });
      }
    });
    this.suizosService.game.playedRounds++;

    this.suizosService.game.rounds.push(this.suizosService.game.generateNextRound());
    //this.suizosService.saveLocalStorage();

    this.suizosService.game.players=this.suizosService.game.sortPlayersByPoints(this.suizosService.game.players);

    if(!endGame){
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/report-round']);
      });
    }
  }

  endGame (){
    this.endRound(true);
    this.router.navigate(['/ranking']);
  }
}
