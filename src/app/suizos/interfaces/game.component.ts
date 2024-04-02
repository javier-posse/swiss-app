export class Game {
  players:Player[];
  rounds: Round[]=[];
  numberOfRounds: number;
  maxRoundTime: number;
  playedRounds:number;

  constructor(players: Player[], maxRoundTime: number) {
    this.players = players;
    this.maxRoundTime = maxRoundTime;
    this.numberOfRounds = Math.floor(Math.log2(players.length))<3?3:Math.floor(Math.log2(players.length));
    this.playedRounds=0;
  }

  public generateNextRound () : Round{
    const playerList = this.sortPlayersByPoints(this.players);
    const copyOfPlayers = [...playerList];
    let matches: Match[]=[];
    let round;

    while (copyOfPlayers.length>0) {

      let match:Match;
      const firstPlayer = copyOfPlayers[Math.ceil(Math.random() * copyOfPlayers.length)];
      copyOfPlayers.splice(copyOfPlayers.indexOf(firstPlayer), 1);

      if (copyOfPlayers.length!=0) {
        let playersSameWins : Player[]=[];
        let wins= firstPlayer.playerPoints;
        let winsDirection : boolean=false;
        let playersNonRepeat : boolean = true;
        do {
          playersSameWins = this.getSamePointsPlayers(copyOfPlayers, firstPlayer, playersNonRepeat);
          wins === 0 && !winsDirection ? winsDirection =true : "";
          winsDirection?wins++:wins--;

          if(winsDirection && wins===copyOfPlayers[0].playerPoints){
            winsDirection=false;
            playersNonRepeat=false;
          }
        } while(playersSameWins.length===0);
        const secondPlayer = playersSameWins[Math.floor(Math.random() * playersSameWins.length)];
        copyOfPlayers.splice(copyOfPlayers.indexOf(secondPlayer), 1);
        match = {firstPlayer: firstPlayer.playerName, secondPlayer: secondPlayer.playerName};
      } else {
        match = {firstPlayer: firstPlayer.playerName};
      }
      matches.push(match);
    }
    round={matches: matches}
    return round;
  }

  getSamePointsPlayers (totalPlayers : Player[], firstPlayer : Player, playersNonRepeat: boolean) : Player[]{
    let playersArray: Player[]=[];

    totalPlayers.forEach(player => {
      if (player.playerPoints===firstPlayer.playerPoints) {
        if(playersNonRepeat){
          if( !(firstPlayer.playerWins.includes(player.playerName) || firstPlayer.playerLoses.includes(player.playerName)) ){
            playersArray.push(player);
          }
        }else{
          playersArray.push(player);
        }
      }
    });
    return playersArray;
  }

  sortPlayersByPoints (playersList:Player[]) : Player[] {
    return playersList.sort((a, b) => b.playerPoints - a.playerPoints);
  }

}

export interface Round {
  matches: Match[];
}

export interface Match {
  firstPlayer: string;
  secondPlayer?: string;
  firstPlayerWins?: number;
  secondPlayerWins?: number;
}

export interface Player {
  playerName: string;
  playerWins: string[];
  playerLoses: string[];
  playerPoints: number;
}
