import * as bge from "bge-core";

import { Game } from "../game";

export default async function main(game: Game): Promise<void> {
    // Display a message
    game.message.set("Welcome to my game!");

    // Wait a long time
    await game.delay.seconds(5);
    
    // Display another message
    game.message.set("The game has ended!");
}
