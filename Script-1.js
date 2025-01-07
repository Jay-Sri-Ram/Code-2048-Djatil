function getValue(i, j) {
    //récupérer le tableau qui a pour id "grille"
    var grille = document.getElementById("grille");
    //retourner la valeur de la case i,j
    console.log("getting value at " + i + " " + j);
    return grille.rows[i].cells[j].innerHTML;
}

// Fonction pour définir la valeur à la position (i, j)
function setValue(i, j, value) {
    if (i, j >= 0 && i, j <= 10) {
        //récupérer le tableau qui a pour id "grille"
        var grille = document.getElementById("grille");
        //définir la valeur de la case i,j
        grille.rows[i].cells[j].innerHTML = value;
        return true;    
    }
    return false;    
}


// Fonction pour obtenir la couleur à la position (i, j)
function getColor(i, j) {
    //récupérer le tableau qui a pour id "grille"
    var grille = document.getElementById("grille");
    //retourner la couleur de la case i,j
    return grille.rows[i].cells[j].style.backgroundColor;
}

// Fonction pour définir la couleur à la position (i, j)
function setColor(i, j, color) {
    //récupérer le tableau qui a pour id "grille"
    if (i >= 0 & i <= 10 & j >= 0 & j <= 10) {
        var grille = document.getElementById("grille");
        //définir la couleur de la case i,j
        grille.rows[i].cells[j].style.backgroundColor = color;
    }
}



//Fonction pour ajouter un écouteur d'événement pour le click sur les cases du tableau
function setlisteners() {
    //récupérer le tableau qui a pour id "grille"
    var grille = document.getElementById("grille");
    //parcourir les lignes du tableau
    for (var i = 0; i < grille.rows.length; i++) {
        //parcourir les colonnes du tableau
        for (var j = 0; j < grille.rows[i].cells.length; j++) {
            console.log("add listener to cell " + i + " " + j);
            //ajouter un écouteur d'événement pour le click sur la case i,j
            grille.rows[i].cells[j].addEventListener("click", playfromclick);
        }
    }

}

function clickedOnCell(event) {
    //afficher les cordonnées de la case cliquée sachant que cell est un td de tableau
    //utiliser les variables i et j pour stocker les coordonnées de la case cliquée
    var cell = event.target;
    var j = cell.cellIndex;
    var i = cell.parentNode.rowIndex;

    console.log("clicked on cell " + i + " " + j);
}


// Fonction isEmpty qui renvoie un booléen indiquant si la case (i, j) est vide renvoie vraie, si la case n'est pas vide renvoie faux
function isEmpty(i, j) {
    //récupérer la valeur de la case i,j
    var value = getValue(i, j);
    //si la valeur est vide
    if (value == "") {
        //retourner vraie
        return true;
    }
    //sinon
    else {
        //retourner faux
        return false;
    }
}


// Fonction isCorrectAdjency qui renvoie un booléen indiquant si la case (i, j) est correctement adjacente par rappot à toute les cases de la grille,
function isCorrectAdjacency(i, j) {
    //on prend un case quelquonque de la grille
    //on vérifie si la case choisie est vide
    iscompletelyEmpty = true;
    for ( ii = 0; ii < grille.rows.length; ii++) {
        for ( jj = 0; jj < grille.rows[ii].cells.length; jj++) {
            if (!isEmpty(ii, jj)) {
                iscompletelyEmpty = false;
            }
        }
    }
    if (iscompletelyEmpty)
        return true;
    else {
        if (isEmpty(i, j)) {
            //si toutes les cases autour sont vides (attention aux bords - la taille max de la grille est 11x11)
            if (i > 0 && j > 0 && i < 10 && j < 10) {//si on est pas aux bords ou dans les coins 
                if (isEmpty(i - 1, j) && isEmpty(i, j - 1) && isEmpty(i + 1, j)
                    && isEmpty(i, j + 1) && isEmpty(i - 1, j - 1) && isEmpty(i - 1, j + 1)
                    && isEmpty(i + 1, j - 1) && isEmpty(i + 1, j + 1)) {//si toutes les cases autour sont vides
                    return false;
                }
            }
            //si la case est sur le bord gauche
            else if (i == 0 && j > 0 && isEmpty(i, j - 1) && j < 10 && isEmpty(i, j + 1) && isEmpty(i + 1, j) && isEmpty(i + 1, j - 1) && isEmpty(i + 1, j + 1)) {
                return false;
            }
            //si la case est sur le bord droit
            else if (i == 10 && j > 0 && isEmpty(i, j - 1) && j < 10 && isEmpty(i, j + 1) && isEmpty(i - 1, j) && isEmpty(i - 1, j - 1) && isEmpty(i - 1, j + 1)) {
                return false;
            }
            //si la case est sur le bord haut
            else if (j == 0 && i > 0 && isEmpty(i - 1, j) && i < 10 && isEmpty(i + 1, j) && isEmpty(i, j + 1) && isEmpty(i - 1, j + 1) && isEmpty(i + 1, j + 1)) {
                return false;
            }
            //si la case est sur le bord bas
            else if (j == 10 && i > 0 && isEmpty(i - 1, j) && i < 10 && isEmpty(i + 1, j) && isEmpty(i, j - 1) && isEmpty(i - 1, j - 1) && isEmpty(i + 1, j - 1)) {
                return false;
            }
            //si la case est en haut à gauche
            else if (i == 0 && j == 0 && isEmpty(i, j + 1) && isEmpty(i + 1, j) && isEmpty(i + 1, j + 1)) {
                return false;
            }
            //si la case est en haut à droite
            else if (i == 0 && j == 10 && isEmpty(i, j - 1) && isEmpty(i + 1, j) && isEmpty(i + 1, j - 1)) {
                return false;
            }
            //si la case est en bas à gauche
            else if (i == 10 && j == 0 && isEmpty(i, j + 1) && isEmpty(i - 1, j) && isEmpty(i - 1, j + 1)) {
                return false;
            }
            //si la case est en bas à droite
            else if (i == 10 && j == 10 && isEmpty(i, j - 1) && isEmpty(i - 1, j) && isEmpty(i - 1, j - 1)) {
                return false;
            }
            return true;
        }else{
            return true;
        }
    }
}


// Fonction isCorrectPlacement qui renvoie un booléen si le placement est correct ou non
// un placement correct est 
function isCorrectPlacement(i, j, value) {
    //si la carte déposée vérifie isCorrectAdjacency
    if (isCorrectAdjacency(i, j)) {
        //si la nouvelle carte déposée est strictement de valeur supérieure à la carte précédente
        if (isEmpty(i, j) || getValue(i, j) < value) {
            console.log("original value" + getValue(i, j) + " " + "new value" + value);
            return true;
        }
    }
    return false;
}


// crée 4 liste pour réprésenter les 4 jeux de cartes des 4 joueur, 
//contenant les chiffres suivants : 1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9 
// chaque listes sont nomer redlist, greenlist, bluelist, yellowlist
var redcard = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
var greencard= [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
var bluecard = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
var yellowcard = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
var lists = [redcard, greencard, bluecard, yellowcard]; 


// crée une fonction getAndRemouveCard qui prend une des 4 listes,
// pioche une carte au hasard puis la retire de la liste choisie et renvoie la valeur de la carte
function getAndRemoveCard(x) {
/*console.log("x=",x)*/
    // Vérifier si la liste est non vide
    if (x.length === 0) {
        return null;
    }

    // Générer un index aléatoire dans la plage de la longueur de la liste
    var randomCardIndex = Math.floor(Math.random() * x.length);

    // Obtenir la carte de la liste
    var card = x[randomCardIndex];

    // Retirer la carte de la liste
    x.splice(randomCardIndex, 1);
    /*console.log("x apres retire=",x)*/
    // Retourner la valeur de la carte
    return card;
}

// Fonction pour tester getAndRemoveCard
function testGetAndRemoveCard() {
    /*console.log("redcard",redcard)*/
    console.log(getAndRemoveCard(redcard));
    console.log(getAndRemoveCard(greencard));
    console.log(getAndRemoveCard(bluecard));
    console.log(getAndRemoveCard(yellowcard));
}



//Fonction HasWin (color) qui prend un paramètre color et renvoie vrai si le joueur de cette couleur a gagné, sinon faux
//La couleur à gagné si 4 carte de même couleur sont placer en ligne, en colonne ou en diagonale
function HasWin (color) {
//parcourir les lignes du tableau
    for (var i = 0; i < grille.rows.length-3; i++) {
        //parcourir les colonnes du tableau
        for (var j = 0; j < grille.rows[i].cells.length-3; j++) {
            //si la case est de la couleur color
            if (getColor(i, j) == color) {
                //si la case suivante est de la couleur color
                if (getColor(i, j+1) == color) {
                    //si la case suivante est de la couleur color
                    if (getColor(i, j+2) == color) {
                        //si la case suivante est de la couleur color
                        if (getColor(i, j+3) == color) {
                            //retourner vraie
                            return true;
                        }
                    }
                }
            }
            if (getColor(i, j) == color) {
                //si la case suivante est de la couleur color
                if (getColor(i+1, j) == color) {
                    //si la case suivante est de la couleur color
                    if (getColor(i+2, j) == color) {
                        //si la case suivante est de la couleur color
                        if (getColor(i+3, j) == color) {
                            //retourner vraie
                            return true;
                        }
                    }
                }
            }
            if (getColor(i, j) == color) {
                //si la case suivante est de la couleur color
                if (getColor(i+1, j+1) == color) {
                    //si la case suivante est de la couleur color
                    if (getColor(i+2, j+2) == color) {
                        //si la case suivante est de la couleur color
                        if (getColor(i+3, j+3) == color) {
                            //retourner vraie
                            return true;
                        }
                    }
                }
            }
            if (getColor(i, j) == color) {
                //si la case suivante est de la couleur color
                if (getColor(i+1, j-1) == color) {
                    //si la case suivante est de la couleur color
                    if (getColor(i+2, j-2) == color) {
                        //si la case suivante est de la couleur color
                        if (getColor(i+3, j-3) == color) {
                            //retourner vraie
                            return true;
                        }
                    }
                }
            }
            if (getColor(i, j) == color) {
                //si la case suivante est de la couleur color
                if (getColor(i-1, j+1) == color) {
                    //si la case suivante est de la couleur color
                    if (getColor(i-2, j+2) == color) {
                        //si la case suivante est de la couleur color
                        if (getColor(i-3, j+3) == color) {
                            //retourner vraie
                            return true;
                        }
                    }
                }
            }
            if (getColor(i, j) == color) {
                //si la case suivante est de la couleur color
                if (getColor(i-1, j-1) == color) {
                    //si la case suivante est de la couleur color
                    if (getColor(i-2, j-2) == color) {
                        //si la case suivante est de la couleur color
                        if (getColor(i-3, j-3) == color) {
                            //retourner vraie
                            return true;
                        }
                    }
                }
            }
            if (getColor(i, j) == color) {
                //si la case suivante est de la couleur color
                if (getColor(i-1, j) == color) {
                    //si la case suivante est de la couleur color
                    if (getColor(i-2, j) == color) {
                        //si la case suivante est de la couleur color
                        if (getColor(i-3, j) == color) {
                            //retourner vraie
                            return true;
                        }
                    }
                }
            }
            if (getColor(i, j) == color) {
                //si la case suivante est de la couleur color
                if (getColor(i, j-1) == color) {
                    //si la case suivante est de la couleur color
                    if (getColor(i, j-2) == color) {
                        //si la case suivante est de la couleur color
                        if (getColor(i, j-3) == color) {
                            //retourner vraie
                            return true;
                        }
                    }
                }
            }
        }    
    }
    return false;
}

// Fonction isWithinLimits(i,j) qui renvoie true si i,j est dans le tableau 11x11 
//ET que i,j est dans la limite max de 6x6 par rapport aux case non-vies(déja posées)
function isWithinLimits(i, j) {
    //si i et j sont dans la plage de 0 à 10
    if (i >= 0 && i <= 10 && j >= 0 && j <= 10) {
        //si i et j sont dans la plage de 0 à 6
        for ( ii = 0; ii < grille.rows.length; ii++) {
            for ( jj = 0; jj < grille.rows[ii].cells.length; jj++) {
                if (!isEmpty(ii, jj)) {
                    if (i - ii >= 6 || ii - i >= 6 || j - jj >= 6 || jj - j >= 6) {
                        console.log("i=",i,"ii=",ii,"j=",j,"jj=",jj);
                        return false;
                    }      
                }
            }
        }
        return true;
    }
    //sinon retourner faux
    return false;
}



// varriable générale pour le jeu
// varriable pour les couleurs
var color = ['red', 'green', 'blue', 'yellow'];

// varriable pour le joueur actuel
var currentPlayer = 0;

// varriable pour la valeur de la carte actuelle du joueur actuel
var currentValue = getAndRemoveCard(lists[currentPlayer]);

// varriable pour l'affichage de la valeur de la carte actuelle
const valeurVl = document.getElementById('valeur');

// varriable pour l'affichage du joueur actuel
const joueurJr = document.getElementById('joueur');

// afficher la valeur de la carte actuelle
valeurVl.textContent = currentValue;

// afficher le joueur actuel
joueurJr.textContent = color[currentPlayer];

// varriable pour la fin du jeu
var gameEnded = false;

// Fonction pour jouer à partir d'un click
function playfromclick(event) {
    //si le jeu n'est pas terminé
    if (!gameEnded) {
        //récupérer la case cliquée
        var cell = event.target;
        //récupérer les coordonnées de la case cliquée
        var j = cell.cellIndex;
        //récupérer les coordonnées de la case cliquée
        var i = cell.parentNode.rowIndex;
        //appeler la fonction clickedOnCell
        clickedOnCell(event);
        //si les coordonnées sont dans les limites
        console.log("entering if")
        if (isWithinLimits(i, j)) {
            //si le placement est correct
            if (isCorrectPlacement(i, j, currentValue)) {
                //définir la valeur de la case i,j
                setValue(i, j, currentValue);
                //définir la couleur de la case i,j
                setColor(i, j, color[currentPlayer]);
                //si le joueur actuel a gagné
                if (HasWin(color[currentPlayer])) {
                    //afficher un message indiquant que le joueur actuel a gagné et terminer le jeu
                    alert("Player " + color[currentPlayer] + " has won");
                    gameEnded = true;
                }
                // Passer au joueur suivant si pas de victoire du joueur actuel
                else 
                // Passer au joueur suivant si pas de victoire du joueur actuel et afficher la valeur de la carte actuelle et le joueur actuel 
                    currentPlayer = (currentPlayer + 1) % 4;
                    currentValue = getAndRemoveCard(lists[currentPlayer]);
                    valeurVl.textContent = currentValue;
                    joueurJr.textContent = color[currentPlayer];
            }
            else
            //si le placement de la carte est incorrect (pas dans la zone destinée) afficher un message d'erreur
                alert("Invalid placement");
        }
        else{
            //si les coordonnées ne sont pas dans les limites afficher un message d'erreur
            alert("outside of limits")
        }
    }
    //si le jeu est terminé afficher un message indiquant que le jeu est terminé
    else{
        alert("game has ended");
    }
}

// Fonction pour tester la fonction playfromclick
function main() {
    setlisteners();
}

// Appeler la fonction de test
document.onload = main();

