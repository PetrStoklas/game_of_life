// example of input
const inp = [
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
]

// used for creating copy of nested array
const getArrayClone = (arr) => {
    if (!Array.isArray(arr)) return arr

    let copy;

    copy = arr.slice(0);

    for (let i = 0; i < copy.length; i++) {
        copy[i] = getArrayClone(copy[i])
    }
    return copy;
}

/**
 * This function returns a number of living cells surrounding the cell on given index currentI and currentJ.
 * @param {array} input - Array of arrays representing the world.
 * @param {number} currentI - Index of row.
 * @param {number} currentJ - Index of cell in the row.
 * @param {number} maxI - Maximum index of row that can be used.
 * @param {number} maxJ - Maximum index of element in the row that can be used.
 * @returns {number} Number of living cells surrounding the cell on given index currentI and currentJ.
 */
const getAmountOfAliveSurroundings = (input, currentI, currentJ, maxI, maxJ) => {
    let neighboursAlive = 0;

    // whole right side
    if (currentJ + 1 <= maxJ) {
        // top right
        if (currentI - 1 >= 0 && input[currentI - 1][currentJ + 1]) neighboursAlive += 1
        // middle right
        if (input[currentI][currentJ + 1]) neighboursAlive += 1
        // bottom right
        if (currentI + 1 <= maxI && input[currentI + 1][currentJ + 1]) neighboursAlive += 1
    }

    // whole left side
    if (currentJ - 1 >= 0) {
        // top left
        if (currentI - 1 >= 0 && input[currentI - 1][currentJ - 1]) neighboursAlive += 1
        // middle left
        if (input[currentI][currentJ - 1]) neighboursAlive += 1
        // bottom left
        if (currentI + 1 <= maxI && input[currentI + 1][currentJ - 1]) neighboursAlive += 1
    }

    // middle top
    if (currentI - 1 >= 0 && input[currentI - 1][currentJ]) neighboursAlive += 1

    // middle bottom
    if (currentI + 1 <= maxI && input[currentI + 1][currentJ]) neighboursAlive += 1

    return neighboursAlive
}

/**
 * Calculates whether cell should be alive or not in the new world based on number of living neighbours.
 * @param {number} cell - Number representing boolean whether cell is currently alive or not.
 * @param {number} liveNeighbours - Number of neighbours of given cell that are alive.
 * @returns {number}
 */
const getNextStateOfCell = (cell, liveNeighbours) => {
    if (cell) { // live cell
        switch (true) {
            // underpopulation && overpopulation
            case liveNeighbours < 2:
            case liveNeighbours > 3:
                return 0

            default:
                return 1
        }
    }

    // reproduction
    return liveNeighbours === 3 ? 1 : 0 // I started using numbers. I would probably switch to true/false
}

/**
 * One game cycle.
 * @param {array} input - World represented as array of arrays of booleans where each boolean represents whether cell is alive or not.
 * @returns {array} World represented as array of arrays of booleans where each boolean represents whether cell is alive or not.
 */
const gameTick = (input) => {
    const newWorld = getArrayClone(input);
    const maxI = input.length - 1;

    for (let i = 0; i < input.length; i++) {
        const currentRow = input[i];
        const maxJ = currentRow.length - 1;

        for (let j = 0; j < maxJ; j++) {
            const currentCell = currentRow[j];
            const liveNeighbours = getAmountOfAliveSurroundings(input, i, j, maxI, maxJ);

            newWorld[i][j] = getNextStateOfCell(currentCell, liveNeighbours);
        }
    }
    return newWorld;
}
