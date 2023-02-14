import * as bge from "bge-core";

/**
 * Custom player class for your game.
 */
export class Player extends bge.Player {

    /**
     * Current number of points for this player.
     */
    @bge.display({ label: "Score" })
    score: number = 0;

    /**
     * Creates a bge.Zone containing all properties in this player marked with @bge.display().
     */
    createZone(): bge.Zone {
        const zone = new bge.Zone(20, 10);
        zone.children.addProperties(this);
        return zone;
    }
}
