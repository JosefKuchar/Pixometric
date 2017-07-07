/**
 * Generate PIXI sprites from Area of Interest
 * 
 * @export
 * @param {Chunk[][]} aoL 
 * @param {Number} rotation 
 */
export default function generateSprites(aoL, rotation) {
    // AoL Chunk x
    for (var x = 0; x < aoL.length; x++) {
        // AoL Chunk y
        for (var y = 0; y < aoL[0].length; y++) {
            // Calculate rotated real coordinates, without specific function for performance
            // Thanks to tulevik.EU (http://www.indiedb.com/games/office-management-101/features/rotating-a-25d-isometric-map)
            switch (rotation) {
                case 0:
                    var chunkX = x;
                    var chunkY = y;
                    break;
                case 1:
                    var chunkX = aoL.length - y - 1;
                    var chunkY = x;
                    break;
                case 2:
                    var chunkX = aoL.length - x - 1;
                    var chunkY = aoL[0].length - y - 1;
                    break;
                case 3:
                    var chunkX = y;
                    var chunkY = aoL[0].length - x - 1;
            }

            // Voxels in current chunk
            for (var i = 0; i < aoL[chunkX][chunkY].voxels.length; i++) {
                // Calculate position from 1d index
                var voxelZ = i % Pixometric.config.CHUNK.SIZE;
                var voxelY = (Math.floor(i / Pixometric.config.CHUNK.SIZE)) % Pixometric.config.CHUNK.SIZE;
                var voxelX = Math.floor(i / (Pixometric.config.CHUNK.SIZE * Pixometric.config.CHUNK.SIZE));

                // Calculate rotated real voxel coordinates
                // TODO: Optimize this 
                switch (rotation) {
                    case 0:
                        var tmpX = voxelX;
                        var tmpY = voxelY;
                        break;
                    case 1:
                        var tmpX = Pixometric.config.CHUNK.SIZE - voxelY - 1;
                        var tmpY = voxelX;
                        break;
                    case 2:
                        var tmpX = Pixometric.config.CHUNK.SIZE - voxelX - 1;
                        var tmpY = Pixometric.config.CHUNK.SIZE - voxelY - 1;
                        break;
                    case 3:
                        var tmpX = voxelY;
                        var tmpY = Pixometric.config.CHUNK.SIZE - voxelX - 1;
                }

                var voxelIndex = voxelZ + tmpY * Pixometric.config.CHUNK.SIZE + tmpX * Pixometric.config.CHUNK.SIZE * Pixometric.config.CHUNK.SIZE;

                // Get voxel block value
                var voxelValue = aoL[chunkX][chunkY].voxels[voxelIndex];

                // Check if current voxel is not air
                if (voxelValue != 0) {
                    // Calculate sprite position
                    var spriteX = ((voxelX - voxelY) + (x - y) * Pixometric.config.CHUNK.SIZE) * (Pixometric.config.SPRITE.SIZE / 2);
                    var spriteY = ((voxelX + voxelY) + (x + y) * Pixometric.config.CHUNK.SIZE) * (Pixometric.config.SPRITE.SIZE / 4) - voxelZ * (Pixometric.config.SPRITE.SIZE / 2);

                    // Create sprite from current block value
                    var sprite = new PIXI.Sprite(Pixometric.textures[Pixometric.textureLookup[voxelValue - 1]]);

                    // Add reference to current chunk for culling and unloading
                    aoL[x][y].sprites[i] = sprite;

                    // Set calculated values as position
                    sprite.x = spriteX;
                    sprite.y = spriteY;

                    // Add sprite to the stage
                    Pixometric.stage.addChild(sprite);
                }
            }
        }
    }
}