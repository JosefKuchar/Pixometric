import consts from "../../core/constants";

export default function loadArea(aoL, direction, callback) {
    switch (direction) {
        case consts.TOP:
            for (var i = 0; i < aoL.length; i++) {
                unloadChunk(i, aoL.length - 1);
                aoL[i].pop();
                //aoL[i].unshift();
            }
            break;
        case consts.LEFT:
            break;
        case consts.BOTTOM:
            for (var i = 0; i < aoL.length; i++) {
                unloadChunk(i, 0);
                aoL[i].shift();
                //aoL[i].push();
            }
            break;
        case consts.RIGHT:
            break;
    }
}

function unloadChunk(x, y) {
    for (var i = 0; i < Pixometric.config.CHUNK.SIZE * Pixometric.config.CHUNK.SIZE * Pixometric.config.CHUNK.HEIGHT; i++) {
        if (this.aoL[x][y].sprites[i]) {
            this.aoL[x][y].sprites[i].destroy();
        }
    }
}