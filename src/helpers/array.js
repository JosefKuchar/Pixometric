// Optimalized filling methods
// 1D

export function generate(size) {
    var array;
    (array = []).length = size;
    return array.fill(0);
}

export function generateFilled(size, object) {
    var array;
    (array = []).length = size;
    for (var i = 0; i < size; i++) {
        array[i] = object;
    }
    return array
}

export function generateFilledClasses(size, object) {
    var array;
    (array = []).length = size;
    for (var i = 0; i < size; i++) {
        array[i] = new object;
    }
    return array;
}

// 2D
export function generate2D(width, height) {
    var array;
    (array = []).length = width;
    for (var x = 0; x < width; x++) {
        (array[x] = []).length = height;
        array[x].fill(0);
    }
    return array;
}

export function generate2DFilled(width, height, object) {
    var array;
    (array = []).length = width;
    for (var x = 0; x < width; x++) {
        (array[x] = []).length = height;
        for (var y = 0; y < height; y++) {
            array[x][y] = object;
        }
    }
    return array;
}

export function generate2DFilledClasses(width, height, object) {
    var array;
    (array = []).length = width;
    for (var x = 0; x < width; x++) {
        (array[x] = []).length = height;
        for (var y = 0; y < height; y++) {
            array[x][y] = new object;
        }
    }
    return array;
}