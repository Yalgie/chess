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
            if (rowI === 1 || rowI === 0) colour.c = 1;

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

resetBoard();



// jQuery Prototype
board.forEach((row) => {
    const $board = $("#board");
    const $row = $("<div class='row'></div>");

    row.forEach(col => {
        let img;

        if (col.c === null) {
            img = `https://placehold.it/48x48/F1F1F1/333333?text=E`;
        }
        else if (col.c === 1) {
            img = `https://placehold.it/48x48/CECECE/333333?text=${col.i}`;
        }
        else if (col.c === 0) {
            img = `https://placehold.it/48x48/333333/CECECE?text=${col.i}`;
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