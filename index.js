let board;
// let turn = 1;

const indexes = {
    empty: 0,
    pawn: 1,
    knight: 2,
    bishop: 3,
    rook: 4,
    queen: 5,
    king: 6
};

resetBoard = () => {
    board = [...Array(8)].map((_, rowI) => {
        return [...Array(8)].map((_, colI) => {
            const xy = { x: colI, y: rowI };
            let colour = { c: 0 };
            if (rowI === 6 || rowI === 7) colour.c = 1;

            switch (rowI) {
                case 0:
                case 7:
                    let idx = 0;

                    if (colI === 0 || colI === 7) {
                        idx = indexes.rook;
                    }
                    else if (colI === 1 || colI === 6) {
                        idx = indexes.knight;
                    }
                    else if (colI === 2 || colI === 5) {
                        idx = indexes.bishop;
                    }
                    else if (colI === 3) {
                        idx = indexes.queen;
                    }
                    else if (colI === 4) {
                        idx = indexes.king;
                    }

                    return {
                        i: idx,
                        ...colour, 
                        ...xy 
                    };

                case 1:
                case 6:
                    return {
                        i: indexes.pawn,
                        ...colour,
                        ...xy
                    };

                default:
                    return {
                        i: indexes.empty,
                        c: null,
                        ...xy
                    };
            }
        });
    });
};

getPawnMoves = (x, y, c) => {

}

getKnightMoves = (x, y, c) => {

}

getBishopMoves = (x, y, c) => {

}

getRookMoves = (x, y, c) => {

}

getQueenMoves = (x, y, c) => {

}

getKingMoves = (x, y, c) => {

}

highlightMoves = (idx, x, y, c) => {
    if (idx === 1) getPawnMoves(x, y, c);
    else if (idx === 2) getKnightMoves(x, y, c);
    else if (idx === 3) getBishopMoves(x, y, c);
    else if (idx === 4) getRookMoves(x, y, c);
    else if (idx === 5) getQueenMoves(x, y, c);
    else if (idx === 6) getKingMoves(x, y, c);
}

resetBoard();

// Swap board on turns or based on user
// Users board colour should always face down
// board.reverse();

// jQuery Prototype


const $board = $("#board");
let $selected = null;

board.forEach((row) => {
    const $row = $("<div class='row'></div>");
    const url = "https://placehold.it/48x48";

    row.forEach(col => {
        let img;

        if (col.c === null) {
            img = `${url}/F1F1F1/333333?text=E`;
        }
        else if (col.c === 1) {
            img = `${url}/CECECE/333333?text=${col.i}`;
        }
        else if (col.c === 0) {
            img = `${url}/333333/CECECE?text=${col.i}`;
        }

        const $col = $(`<div 
            data-x="${col.x}" 
            data-y="${col.y}" 
            data-i="${col.i}" 
            data-c="${col.c}"
            style="background-image: url('${img}')">
        </div>`);

        $row.append($col);
    });

    $board.append($row);
});

$board.find(".row").children().on("click", item => {
    const $piece = $(item.target);
    const idx = $piece.data("i");
    const x = $piece.data("x");
    const y = $piece.data("y");
    const c = $piece.data("c");

    if (idx !== 0) {
        $selected = $piece;
        $board.find(".row").children().removeClass("selected");
        $piece.addClass("selected");
        highlightMoves(idx, x, y, c);
    }
    else if ($selected !== null) {
        console.log("MOVE")
    }
});















/*
Movements Psuedo Code:

if !== knight
v: vertical
h: horizontal
d: diagonal
f: forward lock (for pawns)

if pawn
limit to 1 outter grid

if pawn and first move
allow 2

if knight
custom move with array rotation?



User flow:
Click piece
Collision / Map Check
Usable moves highlight
    - Check piece
    - switch case/ if statements
Click desired tile for move
Check if desired tile is empty or is enemy piece
Move/Remove tiles
Turn swaps



Rook
v: true
h: true
d: false
f: false

Pawn
v: true
h: false
d: false
f: true
// Check diagonal l/r for opposite pieces
// Allow 2 spaces on first move

*/
