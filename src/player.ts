import * as bge from "bge-core";

/**
 * Custom player class for your game.
 */
export class Player extends bge.Player {
    private _zone: bge.Zone;
    
    /**
     * Width of each player zone in centimeters.
     */
    static readonly ZONE_WIDTH = 20;
    
    /**
     * Height of each player zone in centimeters.
     */
    static readonly ZONE_HEIGHT = 10;

    /**
     * Current number of points for this player.
     */
    @bge.display({ label: "Score" })
    score: number = 0;

    /**
     * A bge.Zone containing all properties in this player marked with @bge.display().
     */
    get zone(): bge.Zone {
        if (this._zone != null) {
            return this._zone;
        }

        this._zone = new bge.Zone(Player.ZONE_WIDTH, Player.ZONE_HEIGHT);
        this._zone.children.addProperties(this);

        return this._zone;
    }
}
