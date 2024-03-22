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
    const copyOfPlayers = [...this.players];
    let matches: Match[]=[];
    let round;

    while (copyOfPlayers.length>0) {

      let match:Match;
      const firstPlayer = copyOfPlayers[Math.floor(Math.random() * copyOfPlayers.length)];
      copyOfPlayers.splice(copyOfPlayers.indexOf(firstPlayer), 1);

      if (copyOfPlayers.length!=0) {
        let playersSameWins : Player[]=[];
        let wins= firstPlayer.playerPoints;
        let winsDirection : boolean=false;
        do {
          playersSameWins = this.getSamePointsPlayers(copyOfPlayers, wins);
          wins === 0 && !winsDirection ? winsDirection =true : "";
          winsDirection?wins++:wins--;
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

  getSamePointsPlayers (totalPlayers : Player[], wins : number) : Player[]{
    let playersArray: Player[]=[];

    totalPlayers.forEach(player => {
      if (player.playerPoints===wins) {
        playersArray.push(player);
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
