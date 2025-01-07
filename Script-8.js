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



// Tests pour la fonction getValue
function testGetSetValue() {
    setValue(0, 0, 42);
    console.log("getValue 0 0 : " + getValue(0, 0));
}


function testGetSetColor() {
    setColor(0, 0, 'yellow');
    console.log("getColor 0 0 : " + getColor(0, 0));
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
            grille.rows[i].cells[j].addEventListener("click", clickedOnCell);
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

// Test pour la fonction isEmpty qui doit utiliser test setValue et qui utilise isEmpty pour vérifier si la case est vide
function testIsEmpty() {
    setValue(0, 0, 42);
    console.log("isEmpty 0 0 : " + isEmpty(0, 0)); // Should print false

    setValue(1, 0, "");
    console.log("isEmpty 1 0 : " + isEmpty(1, 0)); // Should print true
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


// Test pour la fonction isCorrectAdjency
function testIsCorrectAdjency() {
    setValue(0, 0, 42);
    setValue(0, 1, "");
    setValue(1, 1, "");
    console.log(isEmpty(0, 0)); // Should print false
    console.log(isEmpty(0, 1)); // Should print true
    console.log(isEmpty(1, 1)); // Should print true
    console.log("isCorrectAdjacency 0 0 : " + isCorrectAdjacency(0, 0)); // Should print false
    console.log("isCorrectAdjacency 5 5 : " + isCorrectAdjacency(5, 5)); // Should print false
}

// Fonction isCorrectPlacement qui renvoie un booléen si le placement est correct ou non
// un placement correct est 

function isCorrectPlacement(i, j, value) {
    //si la carte déposée vérifie isCorrectAdjacency
    if (isCorrectAdjacency(i, j)) {
        //retourner vrai
        return true;
    }
    //Ou bien si la nouvelle carte déposée est strictement de valeur supérieure à la carte précédente
    else if (isEmpty(i, j)) {

        return false
    }
    else if (getValue(i, j) < value) {
        //retourner vraie
        return true;
    }
    // si ni l'un ni l'autre sont vrais alors isCorrectPlacement retourne faux
    return false;
}

// Test pour la fonction isCorrectPlacement
function testIsCorrectPlacement() {
    setValue(0, 0, 42);
    setValue(0, 1, 43);
    setValue(1, 1, 44);
     console.log("isCorrectPlacement 0 0 18: " + isCorrectPlacement(0, 0, 18)); // Should print false
     console.log("isCorrectPlacement 0 0 42: " + isCorrectPlacement(0, 0, 42)); // Should print false
     console.log("isCorrectPlacement 0 0 43: " + isCorrectPlacement(0, 0, 43)); // Should print true
     console.log("isCorrectPlacement 0 2 1: " + isCorrectPlacement(0, 2, 1)); // Should print true 
     console.log("isCorrectPlacement 5 5 2: " + isCorrectPlacement(5, 5, 2)); // Should print false
    console.log("isCorrectPlacement 2 2 3: " + isCorrectPlacement(2, 2, 3)); // Should print true

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
    
    // Retourner la valeur de la carte
    return card;
}

// Fonction pour tester getAndRemoveCard
function testGetAndRemoveCard() {
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
        }    
    }
    return false;
}
// Fonction pour tester HasWin
function testHasWin() {
    setColor(0, 0, 'red');
    setColor(0, 1, 'red');
    setColor(0, 2, 'red');
    setColor(0, 3, 'red');
    console.log("HasWin red : " + HasWin('red')); // Should print true
    setColor(2, 0, 'red');
    setColor(3, 0, 'red');
    setColor(4, 0, 'red');
    setColor(5, 0, 'red');
    console.log("HasWin red : " + HasWin('red')); // Should print true
    setColor(1, 1, 'blue');
    setColor(2, 2, 'blue');
    setColor(3, 3, 'blue');
    setColor(4, 4, 'blue');
    console.log("HasWin blue : " + HasWin('blue')); // Should print true
    setColor(2, 5, 'green');
    setColor(3, 4, 'green');
    setColor(4, 3, 'green');
    setColor(5, 2, 'green');
    console.log("HasWin green : " + HasWin('green')); // Should print true
    setColor(7, 6, 'green');
    setColor(5, 6, 'green');
    setColor(4, 6, 'green');
    setColor(6, 6, 'green');
    console.log("HasWin green : " + HasWin('green')); // Should print true
    setColor(11, 11, 'yellow')
    setColor(12,11, 'yellow')
    setColor(13,11, 'yellow')
    setColor(14,11, 'yellow')
    console.log("HasWin yellow : " + HasWin('yellow')); // Should print false
    setColor(0, 7, 'blue')
    setColor(0, 10, 'blue')
    setColor(0, 9, 'blue')
    setColor(0, 8, 'blue')
    console.log("HasWin blue : " + HasWin('blue')); // Should print true

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

// Fonction pour tester isWithinLimits
function testIsWithinLimits() {
    console.log("isWithinLimits 0 0 : " + isWithinLimits(0, 0)); // Should print true
    console.log("isWithinLimits 6 6 : " + isWithinLimits(6, 6)); // Should print true
    console.log("isWithinLimits 11 11 : " + isWithinLimits(11, 11)); // Should print false

    setValue(1, 2, 1, 'red')
    console.log(setValue(1, 2, 1,'red'));
    console.log("isWithinLimits 0 0 : " + isWithinLimits(0, 0)); // Should print true
    console.log("isWithinLimits 6 6 : " + isWithinLimits(6, 6)); // Should print true
    console.log("isWithinLimits 11 11 : " + isWithinLimits(11, 11)); // Should print false
    
    setValue(5, 5, 42);
    console.log("isWithinLimits 0 0 : " + isWithinLimits(0, 0)); // Should print false
    console.log("isWithtesinLimits 6 6 : " + isWithinLimits(6, 6)); // Should print true
    console.log("isWithinLimits 11 11 : " + isWithinLimits(11, 11)); // Should print false
    
    setValue(11,11, 42);
    console.log("isWithinLimits 0 0 : " + isWithinLimits(0, 0)); // Should print true
    console.log("isWithinLimits 6 6 : " + isWithinLimits(6, 6)); // Should print true
    console.log("isWithinLimits 11 11 : " + isWithinLimits(11, 11)); // Should print false

}

// Fonction pour tester les fonctions getValue, setValue, getColor, et setColor
function main() {
    testGetSetValue();
    testGetSetColor();
    setlisteners();
    testIsCorrectAdjency();
    testIsCorrectPlacement();
    testGetAndRemoveCard();
    testHasWin();
    tgetValue();
    testIsWithinLimits();    
}

// Appeler la fonction de test
document.onload = main();

