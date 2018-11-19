import React, { Component } from 'react';
import './App.css';


class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			gameBoard: Array(9).fill(null),
			togglePlayer: "X",
			currentPlayer: "O",
			gameStatus: "Choose your color :-)",
			gameOver: false,
			movesMade: 1,
			player1Color: "white",
			player2Color: "white",
			boxColor: this.player1Color,
		}
	}

	renderBox(i) {
		let p1Color = {
			color:this.state.player1Color,
		}
		let p2Color = {
			color:this.state.player2Color,
		}


		if (this.state.gameBoard[i] === "X") {
				return (
					<div
						style={p2Color}
						className="boxes"
						onClick={() => this.playerTurn(i)}
					>
						{this.state.gameBoard[i]}
					</div>
				);
		} else if (this.state.gameBoard[i] === "O") {
					return (
						<div
							style={p1Color}
							className="boxes"
							onClick={() => this.playerTurn(i)}
						>
							{this.state.gameBoard[i]}
						</div>
					);
		} else {
				return (
					<div
						className="boxes"
						onClick={() => this.playerTurn(i)}
					>
						{this.state.gameBoard[i]}
					</div>
				);
		}
	}

	colorChoiceX(color) {
		this.setState({
			player2Color: color,
		})
		console.log(color);
	}

	colorChoiceO(color) {
		this.setState({
			player1Color: color,
		})
		console.log(color);
	}


	playerTurn(i) {
		if (this.state.gameBoard[i] === null && this.state.gameOver === false) {
			let newBoard = this.state.gameBoard;
			let nextPlayer = this.state.togglePlayer == "O" ? "X" : "O"
			let currentPlayer = this.state.currentPlayer == "O" ? "X" : "O"
			let symbolColor = this.state.boxColor == this.state.player1Color ? this.state.player2Color : this.state.player1Color
			let addMove = this.state.movesMade + 1
			newBoard[i] = nextPlayer
			this.setState({
				gameBoard:newBoard,
				togglePlayer:nextPlayer,
				currentPlayer:currentPlayer,
				movesMade: addMove,
				boxColor: symbolColor,
				gameStatus: "Keep battling."
			})
			this.findWinner()
		}
	}


	findWinner () {
		var playerArr = []
		let winArr = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		]
		for (let index = 0; index < this.state.gameBoard.length; index++){
			if (this.state.gameBoard[index] == this.state.currentPlayer) {
				playerArr.push(index)
			}
		}


		for (let i = 0; i < winArr.length; i++) {
			console.log(this.state.movesMade);
			let j = winArr[i][0]
			let k = winArr[i][1]
			let l = winArr[i][2]
			if (playerArr.includes(j) && playerArr.includes(k) && playerArr.includes(l)) {
				console.log(j, k, l);
				var winnerIs = "Player \"" + this.state.currentPlayer + "\" is the Winner!!"
				this.setState({
					gameStatus:winnerIs,
					gameOver:true,
				})
		} else if (this.state.movesMade >= 9) {
				this.setState({
					gameStatus:"Cats game.",
					gameOver:true,
				})
			}
		}
	}

	resetGame(){
		var emptyArr = Array(9).fill(null)
		this.setState({
			gameBoard:emptyArr,
			gameOver:false,
			gameStatus: "Choose your color :-)",
			movesMade: 1,
			player1Color: "white",
			player2Color: "white"
		})
	}




  render() {
    return (
	<div className="pageDiv">
  	  <h1 className="header">Tic-Tac-Toe Game</h1>
  	  <h3 className="h3element">Player turn: {this.state.currentPlayer}</h3>

  	  <div className="gameBoard">
  	  	<div className="gameRow leftColumn">
			<div className="topRow">{this.renderBox(0)}</div>
			<div className="middleRow">{this.renderBox(3)}</div>
			<div className="bottomRow">{this.renderBox(6)}</div>
  	  	</div>
  	  	<div className="gameRow centerColumn" >
			<div className="topRow">{this.renderBox(1)}</div>
			<div className="middleRow">{this.renderBox(4)}</div>
			<div className="bottomRow">{this.renderBox(7)}</div>
  	  	</div>
  	  	<div className="gameRow right Column">
			<div className="topRow">{this.renderBox(2)}</div>
			<div className="middleRow">{this.renderBox(5)}</div>
			<div className="bottomRow">{this.renderBox(8)}</div>
  	  	</div>
  	  </div>

		<div className="infoBar">
			<div className="Player1 sideRow" ><b><u>Player X</u></b>
				<div className="chalkRowsLeft">
					<div className="lightBlue Chalk" onClick={() => this.colorChoiceX("lightblue")}></div>
					<div className="pink Chalk" onClick={() => this.colorChoiceX("pink")}></div>
					<div className="white Chalk" onClick={() => this.colorChoiceX("white")}></div>
				</div>
				<div className="chalkRowsLeft">
					<div className="green Chalk" onClick={() => this.colorChoiceX("green")}></div>
					<div className="yellow Chalk" onClick={() => this.colorChoiceX("yellow")}></div>
				</div>
			</div>
			<div className="bubble">
			  	<div className="gameOutcome">
				  	{this.state.gameStatus}
			  	</div>
			</div>
			<div className="Player2 sideRow" ><b><u>Player O</u></b>
				<div className="chalkRows">
					<div className="lightBlue Chalk" onClick={() => this.colorChoiceO("lightblue")}></div>
					<div className="pink Chalk" onClick={() => this.colorChoiceO("pink")}></div>
					<div className="white Chalk" onClick={() => this.colorChoiceO("white")}></div>
				</div>
				<div className="chalkRows">
					<div className="green Chalk" onClick={() => this.colorChoiceO("green")}></div>
					<div className="yellow Chalk" onClick={() => this.colorChoiceO("yellow")}></div>
				</div>
			</div>
		</div>

	  <button className="playAgain" type="submit" onClick={() => this.resetGame()}>Play Again?</button>
	</div>


    );
  }
}

export default App;
