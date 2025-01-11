let container = document.querySelector("#container");
let message = document.createElement('p');
message.classList.add('popUp');
container.appendChild(message);

let btnreplay = document.createElement('button');
btnreplay.innerHTML = "REPLAY";
btnreplay.classList.add('btnreplay');

let msg = document.createElement('h1');
msg.classList.add('entrer');
container.appendChild(msg);
msg.innerHTML = "Bienvenu dans mon univers, je te donne le choix je choisir entre deux jeux, seras-tu tentée par le morpion ou par le puissance quatre ? "

let scorePlayerOne=0
scorePlayerOne.innerHTML= "Score joueur 1" + scorePlayerOne
let scorePlayerTwo=0
scorePlayerTwo.innerHTML= "Score joueur 2" + scorePlayerTwo

let gameover = false;
let cupMode = false;
let modePuissanceQuatre = false;
let modeMorpion = false

let game = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
];

let puissanceQuatre =
    [
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],


    ];

let counter = 0;
let playerOne = "X";
let playerTwo = "O";

let btnMorpion = document.querySelector('#morpion');
container.appendChild(btnMorpion);

let btnPquatre = document.querySelector('#puissance4');
container.appendChild(btnPquatre);


function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;

}

// choisi qui joue 

function choicePlayer(row, col,table) {
console.log(counter);
// gravité
if (modePuissanceQuatre) {
    for (let r = table.length - 1; r >= 0; r--) {
        if (table[r][col] === "") {
            row = r;
            break;
        }
    }
}

    if (table[row][col] === "" && !gameover) {
        if (counter % 2 === 0) {
            table[row][col] = playerOne;
            Winner(table);
            if (cupMode == true) {
                cpu(table)
                Winner(table);
            }

        } else {
           table[row][col] = playerTwo;
            Winner(table)
        }
        counter++;

        createElement(table)
    }
}

let btncpu = document.createElement('button');
btncpu.innerHTML = "Ordinateur";
btncpu.classList.add('btncpu');


// pour faire jouer le cpu avec moi

function cpu(table) {
    if (!gameover) {
        let randomColumn = random(0, table[0].length - 1);
        let placed = false;

        // Parcourir les lignes de bas en haut pour vérifier la colonne aléatoire
        table.reverse().forEach((row) => {
            if (!placed && row[randomColumn] === "") {
                row[randomColumn] = playerTwo;
                counter++;
                Winner(table);
                placed = true; // Marquer que la pièce a été placée
            }
        });

        // Remettre les lignes dans l'ordre initial
        table.reverse();
    }
}



// indente la fonction gagné

function Winner(table) {
    let winner = null;

    // Puissance Quatre
    if (modePuissanceQuatre) {
        // Vérification des lignes horizontales
        for (let row = 0; row < table.length; row++) {
            for (let col = 0; col <= table[row].length - 4; col++) {
                let player = table[row][col];
                if (player && table[row][col + 1] === player &&
                    table[row][col + 2] === player && table[row][col + 3] === player) {
                    winner = player;
                    break;
                }
            }
            if (winner) break;
        }

        // Vérification des colonnes verticales
        if (!winner) {
            for (let col = 0; col < table[0].length; col++) {
                for (let row = 0; row <= table.length - 4; row++) {
                    let player = table[row][col];
                    if (player && table[row + 1][col] === player &&
                        table[row + 2][col] === player && table[row + 3][col] === player) {
                        winner = player;
                        break;
                    }
                }
                if (winner) break;
            }
        }

        // Vérification des diagonales descendantes
        if (!winner) {
            for (let row = 0; row <= table.length - 4; row++) {
                for (let col = 0; col <= table[row].length - 4; col++) {
                    let player = table[row][col];
                    if (player && table[row + 1][col + 1] === player &&
                        table[row + 2][col + 2] === player && table[row + 3][col + 3] === player) {
                        winner = player;
                        break;
                    }
                }
                if (winner) break;
            }
        }

        // Vérification des diagonales ascendantes
        if (!winner) {
            for (let row = 3; row < table.length; row++) {
                for (let col = 0; col <= table[row].length - 4; col++) {
                    let player = table[row][col];
                    if (player && table[row - 1][col + 1] === player &&
                        table[row - 2][col + 2] === player && table[row - 3][col + 3] === player) {
                        winner = player;
                        break;
                    }
                }
                if (winner) break;
            }
        }
    }

    // Morpion
    if (modeMorpion) {
        // Vérification des lignes
        for (let i = 0; i < table.length; i++) {
            if (table[i][0] && table[i][0] === table[i][1] && table[i][0] === table[i][2]) {
                winner = table[i][0];
                break;
            }
        }

        // Vérification des colonnes
        if (!winner) {
            for (let j = 0; j < table[0].length; j++) {
                if (table[0][j] && table[0][j] === table[1][j] && table[0][j] === table[2][j]) {
                    winner = table[0][j];
                    break;
                }
            }
        }

        // Vérification des diagonales
        if (!winner) {
            if (table[0][0] && table[0][0] === table[1][1] && table[0][0] === table[2][2]) {
                winner = table[0][0];
            } else if (table[0][2] && table[0][2] === table[1][1] && table[0][2] === table[2][0]) {
                winner = table[0][2];
            }
        }
    }

    if (winner) {
        message.innerHTML = `${winner} a gagné`;
        gameover = true;
    } else if (table.flat().every(cell => cell !== '')) {
        message.innerHTML = "Match nul";
        gameover = true;
    } else {
        message.innerHTML = "En cours...";
    }
}



//  cree le jeu 

function createElement(table) {
    container.innerHTML = ''; /*pour eviter que le tableau se redessine à l'infinie*/ 
    container.appendChild(message);
    container.appendChild(btnreplay);
    container.appendChild(btncpu);

    let grille = document.createElement('div');
    grille.classList.add('grille');
    container.appendChild(grille);

    table.forEach((row, rowIndex) => {
        let ligne = document.createElement('div');
        ligne.classList.add('ligne');
        row.forEach((boxe, colIndex) => {
            let cellule = document.createElement('div');
            cellule.addEventListener('click', () => {
                choicePlayer(rowIndex, colIndex, table);
            });
            switch (boxe) {
                case playerOne:
                    if (table === game) {
                        cellule.innerHTML = playerOne; // Morpion
                    } else {
                        cellule.classList.add('red'); // Puissance 4, pièce rouge
                    }
                    break;
                case playerTwo:
                    if (table === game) {
                        cellule.innerHTML = playerTwo; // Morpion
                    } else {
                        cellule.classList.add('yellow'); // Puissance 4, pièce jaune
                    }
                    break;
                
                
            }
            cellule.classList.add('cell');
            ligne.appendChild(cellule);
        });
        grille.appendChild(ligne);
    });

    if (table === game) {
        container.classList.add('morpion');
        container.classList.remove('puissance4');
    } else if (table === puissanceQuatre) {
        container.classList.add('puissance4');
        container.classList.remove('morpion');
    }



}

// remet à zero tout le jeu quand je clique sur replay

function reset(table) {

    table.forEach((row, i) => {
        row.forEach((boxe, j) => {
            table[i][j] = ""
        })
    });

    counter = 0;
    gameover = false;
    createElement(table);
}


// cree les btn de départ 

btnMorpion.addEventListener('click', () => {
    createElement(game);
    container.appendChild(btnreplay);
    reset(game)
    modeMorpion = true
    modePuissanceQuatre = false
    btnreplay.addEventListener('click', () => {
        reset(game)
    });
    
btncpu.addEventListener('click', () => {
    createElement(game);
    container.appendChild(btnreplay);
    reset(game)
    cupMode = !cupMode

})


});


btnPquatre.addEventListener('click', () => {
    createElement(puissanceQuatre);
    container.appendChild(btnreplay);
    reset(puissanceQuatre)
    modePuissanceQuatre = true
    modeMorpion = false

    btnreplay.addEventListener('click', () => {
        reset(puissanceQuatre)
    });
    
btncpu.addEventListener('click', () => {
    createElement(puissanceQuatre);
    container.appendChild(btnreplay);
    reset(puissanceQuatre)
    cupMode = !cupMode

})

});






