import generateSprites from "./generate-sprites";

/**
 * Rotate world
 * 
 * @export
 * @param {Chunk[][]} aoL 
 * @param {Number} rotation 
 */
export default function rotate(aoL, rotation) {
    for (var x = 0; x < aoL.length; x++) {
        for (var y = 0; y < aoL[0].length; y++) {
            for (var i = 0; i < aoL[0][0].sprites.length; i++) {
                if (aoL[x][y].sprites[i]) {
                    aoL[x][y].sprites[i].destroy();
                }
            }
        }
    }
    
    generateSprites(aoL, rotation);
}