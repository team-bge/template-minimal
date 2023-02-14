import * as bge from "bge-core";

import { Game } from "../game";

export default async function main(this: Game): Promise<void> {
    // Display a message
    this.message.set("Welcome to my game!");

    // Wait a long time
    await this.delay.seconds(5);
    
    // Display another message
    this.message.set("The game has ended!");
}
