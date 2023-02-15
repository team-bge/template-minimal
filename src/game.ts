import * as bge from "bge-core";

import { Player } from "./player";
import { TableCenter } from "./table";

import main from "./actions";

/**
 * Handles the main logic of your game.
 */
export class Game extends bge.Game<Player> {
    /**
     * Minimum number of players this game supports.
     */
    static readonly MIN_PLAYERS = 1;

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
     * Game runners expect games to have a public parameterless constructor, like this.
     */
    constructor() {

        // We need to tell bge.Game<TPlayer> how to construct a player here.
        super(Player);

    }

    /**
     * Entry point for your game logic.
     */
    protected async onRun(): Promise<bge.IGameResult> {
        
        // Create personal table zones for each player
        this.addPlayerZones(x => x.createZone(), {
            avoid: this.tableCenter.footprint
        });

        // Start the main game logic
        await main(this);

        // Return final scores
        return {
            scores: this.players.map(x => 100)
        };
    }
}
