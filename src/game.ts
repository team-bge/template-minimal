import * as bge from "bge-core";

import { Player } from "./player.js";
import { TableCenter } from "./table.js";

/**
 * Handles the main logic of your game.
 */
export class Game extends bge.StateMachineGame<Player> {
    /**
     * Minimum number of players this game supports.
     */
    static readonly MIN_PLAYERS = 4;

    /**
     * Maximum number of players this game supports.
     */
    static readonly MAX_PLAYERS = 8;

    /**
     * Displays all the shared objects in the middle of the table.
     */
    @bge.display()
    readonly tableCenter = new TableCenter(this);

    /**
     * Displays a zone for each player, arranged in a rectangle around the table.
     */
    @bge.display({
        arrangement: new bge.RectangularArrangement({
            size: new bge.Vector3(
                TableCenter.WIDTH + 2,
                TableCenter.HEIGHT + 2)
        })
    })
    get playerZones() {
        return this.players.map(x => x.zone);
    }

    /**
     * Game runners expect games to have a public parameterless constructor, like this.
     */
    constructor() {

        // We need to tell bge.Game<TPlayer> how to construct a player here.
        super(Player);

    }
    
    /**
     * For games implemented as a state machine, returns the initial state's function.
     */
    get initialState(): bge.GameStateFunction {
        return this.startGame;
    }

    //
    // Below are some example game state functions that implement a basic round structure.
    //
    // Each game state function must:
    //  * be async
    //  * take no parameters
    //  * return (resolve with) either:
    //    - a reference to the next game state function
    //    - a bge.IGameResult to end the game
    //
    
    currentPlayer: Player;

    roundNumber: number;
    turnNumber: number;

    async startGame(): bge.GameState {

        this.roundNumber = 0;

        // Pick a random player to start
        this.currentPlayer = this.random.item(this.players);

        return this.startRound;
    }

    async startRound(): bge.GameState {

        this.turnNumber = 0;
        this.roundNumber += 1;
        
        this.message.set("Round {0}!", this.roundNumber);
        
        await this.delay.short();

        return this.startTurn;
    }

    async endRound(): bge.GameState {
        return this.roundNumber < 4
            ? this.startRound
            : this.endGame;
    }

    async startTurn(): bge.GameState {

        this.turnNumber += 1;

        this.message.set("It's {0}'s turn!", this.currentPlayer);

        // Prompt the current player to click a button
        await this.currentPlayer.prompt.click(new bge.Button("Click me!"));

        this.currentPlayer.score += this.random.int(1, 10);

        return this.endTurn;
    }

    async endTurn(): bge.GameState {

        // Choose the next player, clockwise around the table
        this.currentPlayer = this.getNextPlayer(this.currentPlayer);

        return this.turnNumber < this.players.length
            ? this.startTurn
            : this.endRound;
    }

    async endGame(): bge.GameState {

        this.message.set("Game over!");

        await this.delay.long();

        // Return final scores to end the game

        return {
            scores: this.players.map(x => x.score)
        };
    }
}
