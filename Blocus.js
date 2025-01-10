// Code source pour le jeu Blokus
class JeuBlokus {
    // Classe pour le jeu Blokus 
    constructor() {
        // Initialiser le jeu
        this.initializeGame();
        // Configurer les écouteurs d'événements pour les boutons
        this.setupEventListeners();
        // Mettre à jour les informations du joueur
        this.updatePlayerInfo();
    }

    // Fonction pour initialiser le jeu
    initializeGame() {
        // Définir le joueur actuel
        this.currentPlayer = 0;
        // Définir les couleurs et les noms des joueurs
        this.playerColors = ['blue', 'red', 'green', 'yellow'];
        this.playerNames = ['Bleu', 'Rouge', 'Vert', 'Jaune'];
        // Créer une grille principale vide de 20x20
        this.grillePrincipal = Array(20).fill().map(() => Array(20).fill(null));
        // Définir les pièces du jeu
        this.pieces = this.definePiecesBlokus();
        // Initialiser les pièces disponibles pour chaque joueur
        this.availablePieces = this.initializePlayerPieces();
        
        // Créer la grille principale et la grille de sélection
        this.creategrillePrincipal();
        this.creategrilleDeVisualisation();
        // Créer la liste des pièces disponibles
        this.createPiecesList();
        
        // Initialiser les variables pour la pièce sélectionnée et ses transformations
        this.pieceSelectionnee = null;
        this.currentRotation = 0;
        this.estRetournerVerticalement = false;
        this.estRetournerHorizontal = false;
    }

    definePiecesBlokus() {
        // Définir les formes des pièces du jeu
        return {
            piece1: [[1]], // Pièce 1
            piece2: [[1, 1]], // Pièce 2
            piece3: [[1, 1, 1]], // Pièce 3
            piece4: [[1, 0], [1, 1]], // Pièce 4
            piece5: [[1, 1, 1, 1]], // Pièce 5
            piece6: [[1, 1], [1, 1]], // Pièce 6
            piece7: [[1, 1, 1], [0, 0, 1]], // Pièce 7
            piece8: [[1, 1, 0], [0, 1, 1]], // Pièce 8
            piece9: [[1, 0], [1, 1], [1, 0]], // Pièce 9
            piece10: [[1, 1, 1, 1, 1]], // Pièce 10
            piece11: [[1, 1, 1, 1], [0, 0, 0, 1]], // Pièce 11
            piece12: [[1, 1, 0, 0], [0, 1, 1, 1]], // Pièce 12
            piece13: [[1, 1, 1], [1, 0, 1]], // Pièce 13
            piece14: [[1, 1, 1], [0, 1, 1]], // Pièce 14
            piece15: [[0, 1, 0, 0], [1, 1, 1, 1]], // Pièce 15
            piece16: [[0, 0, 1], [1, 1, 1], [0, 0, 1]], // Pièce 16
            piece17: [[0, 0, 1], [0, 0, 1], [1, 1, 1]], // Pièce 17
            piece18: [[0, 0, 1], [0, 1, 1], [1, 1, 0]], // Pièce 18
            piece19: [[1, 0, 0], [1, 1, 1], [0, 0, 1]], // Pièce 19
            piece20: [[0, 1, 0], [1, 1, 1], [0, 1, 0]], // Pièce 20
            piece21: [[1, 0, 0], [1, 1, 1], [0, 1, 0]], // Pièce 21
        };
    }

    initializePlayerPieces() {
        // Initialiser les pièces disponibles pour chaque joueur
        return {
            0: new Set(Object.keys(this.pieces)),
            1: new Set(Object.keys(this.pieces)),
            2: new Set(Object.keys(this.pieces)),
            3: new Set(Object.keys(this.pieces))
        };
    }

    creategrillePrincipal() {
        // Créer la grille principale de 20x20
        const grillePrincipal = document.getElementById('main-grid');
        grillePrincipal.innerHTML = '';
        for (let i = 0; i < 400; i++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.dataset.row = Math.floor(i / 20);
            cell.dataset.col = i % 20;
            cell.onclick = () => this.placePiece(parseInt(cell.dataset.row), parseInt(cell.dataset.col));
            cell.onmouseover = () => this.previewPiecePlacement(parseInt(cell.dataset.row), parseInt(cell.dataset.col));
            cell.onmouseleave = () => this.clearPreviews();
            grillePrincipal.appendChild(cell);
        }
    }

    clearPreviews() {
        // Effacer les aperçus de placement des pièces sur la grille principale 
        const cells = document.getElementById('main-grid').getElementsByClassName('grid-cell');
        Array.from(cells).forEach(cell => {
            cell.classList.remove('preview-valid', 'preview-invalid');
        });
    }

    creategrilleDeVisualisation() {
        // Créer la grille de sélection de 5x5
        const pieceGrid = document.getElementById('piece-grid');
        pieceGrid.innerHTML = '';
        for (let i = 0; i < 25; i++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            pieceGrid.appendChild(cell);
        }
    }

    createPiecesList() {
        // Créer la liste des pièces disponibles pour le joueur actuel
        const selector = document.getElementById('pieces-selector');
        selector.innerHTML = '';
        
        // Créer un bouton pour chaque pièce disponible pour le joueur actuel
        for (const pieceName of this.availablePieces[this.currentPlayer]) {
            const pieceBtn = document.createElement('button');
            pieceBtn.textContent = pieceName;
            pieceBtn.onclick = () => this.selectPiece(pieceName);
            selector.appendChild(pieceBtn);
        }
        
        // Réinitialiser la pièce sélectionnée
        this.pieceSelectionnee = null;
        this.currentRotation = 0;
        this.updateSelectionGrid();
    }

    updatePlayerInfo() {
        // Mettre à jour les informations du joueur actuel
        const playerInfo = document.getElementById('current-player');
        playerInfo.textContent = this.playerNames[this.currentPlayer];
        playerInfo.style.color = this.playerColors[this.currentPlayer];
    }

    selectPiece(pieceName) {
        // Sélectionner une pièce
        this.pieceSelectionnee = this.pieces[pieceName]; // Sélectionner la pièce
        this.currentRotation = 0; // Réinitialiser la rotation de la pièce sélectionnée à 0
        this.estRetournerVerticalement = false; // Réinitialiser le flip vertical de la pièce sélectionnée
        this.estRetournerHorizontal = false; // Réinitialiser le flip horizontal de la pièce sélectionnée
        this.updateSelectionGrid(); // Mettre à jour la grille de sélection avec la pièce sélectionnée
    }

    transformPiece(piece) {
        // Transformer la pièce (rotation et flip)
        let transformed = JSON.parse(JSON.stringify(piece)); // Copier la pièce

        // Appliquer les transformations à la pièce copiée (rotation et flip)
        if (this.estRetournerVerticalement) {
            transformed = this.flipPieceVertical(transformed);// Retourner la pièce verticalement
        }
        if (this.estRetournerHorizontal) {
            transformed = this.flipPieceHorizontal(transformed);// Retourner la pièce horizontalement
        }
        if (this.currentRotation !== 0) {
            transformed = this.rotatePiece(transformed, this.currentRotation);// Faire tourner la pièce selon l'angle donné
        }
        
        return transformed;
    }

    rotatePiece(piece, angle) {
        // Faire tourner la pièce selon l'angle donné
        const height = piece.length;
        const width = piece[0].length;
        let rotated;
        
        
        switch (angle) {
            // Faire tourner la pièce de 90 degrés
            case 90:
                rotated = Array(width).fill().map(() => Array(height).fill(0));
                for (let i = 0; i < height; i++) {
                    for (let j = 0; j < width; j++) {
                        rotated[j][height - 1 - i] = piece[i][j];
                    }
                }
        
            break;
            
            // Faire tourner la pièce de 180 degrés
            case 180:
                rotated = Array(height).fill().map(() => Array(width).fill(0));
                for (let i = 0; i < height; i++) {
                    for (let j = 0; j < width; j++) {
                        rotated[height - 1 - i][width - 1 - j] = piece[i][j];
                    }
                }
                break;
            // Faire tourner la pièce de 270 degrés    
            case 270:
                rotated = Array(width).fill().map(() => Array(height).fill(0));
                for (let i = 0; i < height; i++) {
                    for (let j = 0; j < width; j++) {
                        rotated[width - 1 - j][i] = piece[i][j];
                    }
                }
                break;
            default:
                return piece;
        }
        return rotated;
    }

    flipPieceVertical(piece) {
        // Retourner la pièce verticalement
        return piece.slice().reverse();
    }

    flipPieceHorizontal(piece) {
        // Retourner la pièce horizontalement
        return piece.map(row => row.slice().reverse());
    }

    updateSelectionGrid() {
        // Mettre à jour la grille de sélection avec la pièce transformée
        if (!this.pieceSelectionnee) {
            const cells = document.getElementById('piece-grid').getElementsByClassName('grid-cell');
            Array.from(cells).forEach(cell => cell.className = 'grid-cell');
            return;
        }
        const transformedPiece = this.transformPiece(this.pieceSelectionnee);
        const grid = document.getElementById('piece-grid');
        const cells = grid.getElementsByClassName('grid-cell');

        Array.from(cells).forEach(cell => cell.className = 'grid-cell');

        const offsetY = Math.floor((5 - transformedPiece.length) / 2);
        const offsetX = Math.floor((5 - transformedPiece[0].length) / 2);
        
        // Placer la pièce transformée dans la grille de sélection
        for (let i = 0; i < transformedPiece.length; i++) {
            for (let j = 0; j < transformedPiece[i].length; j++) {
                if (transformedPiece[i][j]) {
                    const index = (i + offsetY) * 5 + (j + offsetX);
                    if (index >= 0 && index < cells.length) {
                        cells[index].classList.add('piece-' + this.playerColors[this.currentPlayer]);
                    }
                }
            }
        }
    }

    placePiece(row, col) {
        // Placer la pièce sur la grille principale
        if (!this.pieceSelectionnee) return;

        const transformedPiece = this.transformPiece(this.pieceSelectionnee);
        if (!this.isValidPlacement(row, col, transformedPiece)) {
            return;
        }

        for (let i = 0; i < transformedPiece.length; i++) {
            for (let j = 0; j < transformedPiece[i].length; j++) {
                if (transformedPiece[i][j]) {
                    this.grillePrincipal[row + i][col + j] = this.currentPlayer;
                    const index = (row + i) * 20 + (col + j);
                    const cell = document.getElementById('main-grid').children[index];
                    cell.className = 'grid-cell piece-' + this.playerColors[this.currentPlayer];
                }
            }
        }

        const pieceName = Object.keys(this.pieces).find(name => 
            JSON.stringify(this.pieces[name]) === JSON.stringify(this.pieceSelectionnee));
        this.availablePieces[this.currentPlayer].delete(pieceName);

        this.currentPlayer = (this.currentPlayer + 1) % 4;
        this.pieceSelectionnee = null;
        this.updateSelectionGrid();
        this.createPiecesList();
        this.updatePlayerInfo();
    }

    previewPiecePlacement(row, col) {
        // Prévisualiser le placement de la pièce
        if (!this.pieceSelectionnee) return;
        
        const transformedPiece = this.transformPiece(this.pieceSelectionnee);
        const isValid = this.isValidPlacement(row, col, transformedPiece);
        
        const grillePrincipal = document.getElementById('main-grid');
        const cells = grillePrincipal.getElementsByClassName('grid-cell');
        
        Array.from(cells).forEach(cell => {
            if (cell.classList.contains('preview-valid') || 
                cell.classList.contains('preview-invalid')) {
                cell.classList.remove('preview-valid', 'preview-invalid');
            }
        });
        
        for (let i = 0; i < transformedPiece.length; i++) {
            for (let j = 0; j < transformedPiece[i].length; j++) {
                if (transformedPiece[i][j]) {
                    const index = (row + i) * 20 + (col + j);
                    if (index >= 0 && index < cells.length) {
                        cells[index].classList.add(
                            isValid ? 'preview-valid' : 'preview-invalid'
                        );
                    }
                }
            }
        }
    }

    isValidPlacement(row, col, piece) {
        // Vérifier si le placement de la pièce est valide
        const height = piece.length;
        const width = piece[0].length;
        
        // Vérifier si la pièce est entièrement dans la grille
        if (row < 0 || row + height > 20 || col < 0 || col + width > 20) {
            return false;
        }
        
        // Vérifier si la pièce touche un coin de la grille
        if (this.isFirstMove(this.currentPlayer)) {
            let touchesCorner = false;
            const corners = {
                0: [0, 0],           // Bleu: en haut à gauche
                1: [0, 19],          // Rouge: en haut à droite
                2: [19, 19],         // Vert: en bas à droite
                3: [19, 0]           // Jaune: en bas à gauche
            };
            const [cornerRow, cornerCol] = corners[this.currentPlayer];
            
            // Vérifier si la pièce touche le coin correspondant
            for (let i = 0; i < height; i++) {
                for (let j = 0; j < width; j++) {
                    if (piece[i][j] && row + i === cornerRow && col + j === cornerCol) {
                        touchesCorner = true;
                    }
                }
            }
            // Si la pièce ne touche pas le coin, le placement est invalide
            if (!touchesCorner) return false;
        }
        // Vérifier si la pièce est en contact avec une autre pièce du joueur
        let hasCornerConnection = false;
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if (piece[i][j]) {
                    if (this.grillePrincipal[row + i][col + j] !== null) {
                        return false;
                    }
                    
                    // Vérifier si la pièce est en contact avec une autre pièce du joueur
                    const adjacentCells = [
                        [row + i - 1, col + j],
                        [row + i + 1, col + j],
                        [row + i, col + j - 1],
                        [row + i, col + j + 1]
                    ];
                    
                    // Vérifier si la pièce est en contact avec une autre pièce du joueur
                    for (const [adjRow, adjCol] of adjacentCells) {
                        if (adjRow >= 0 && adjRow < 20 && adjCol >= 0 && adjCol < 20) {
                            if (this.grillePrincipal[adjRow][adjCol] === this.currentPlayer) {
                                return false;
                            }
                        }
                    }

                    // Vérifier si la pièce est en contact avec un coin d'une autre pièce du joueur
                    const corners = [
                        [row + i - 1, col + j - 1],
                        [row + i - 1, col + j + 1],
                        [row + i + 1, col + j - 1],
                        [row + i + 1, col + j + 1]
                    ];

                    // Vérifier si la pièce est en contact avec un coin d'une autre pièce du joueur
                    for (const [cornRow, cornCol] of corners) {
                        if (cornRow >= 0 && cornRow < 20 && cornCol >= 0 && cornCol < 20) {
                            if (this.grillePrincipal[cornRow][cornCol] === this.currentPlayer) {
                                hasCornerConnection = true;
                            }
                        }
                    }
                }
            }
        }

        // Si ce n'est pas le premier coup du joueur et que la pièce n'est pas en contact avec un coin, le placement est invalide
        if (!this.isFirstMove(this.currentPlayer) && !hasCornerConnection) {
            return false;
        }

        return true;
    }

    // Fonction pour obtenir toutes les positions valides pour la pièce sélectionnée
    getAllValidPositions() {
        // Obtenir toutes les positions valides pour la pièce sélectionnée
        if (!this.pieceSelectionnee) return [];
        const transformedPiece = this.transformPiece(this.pieceSelectionnee);
        let validPositions = [];
    // Vérifier si la pièce est entièrement dans la grille
        for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 20; col++) {
                if (this.isValidPlacement(row, col, transformedPiece)) {
                    validPositions.push([row, col]);
                }
            }
        }
        return validPositions;
    }
// Fonction pour obtenir toutes les positions valides pour la pièce sélectionnée
    isFirstMove(player) {
        // Vérifier si c'est le premier coup du joueur
        return this.availablePieces[player].size === Object.keys(this.pieces).length;
    }

    rotateRight() {
        // Faire tourner la pièce sélectionnée vers la droite
        if (!this.pieceSelectionnee) return;
        this.currentRotation = (this.currentRotation + 90) % 360;
        this.updateSelectionGrid();
    }

    rotateLeft() {
        // Faire tourner la pièce sélectionnée vers la gauche
        if (!this.pieceSelectionnee) return;
        this.currentRotation = (this.currentRotation + 270) % 360;
        this.updateSelectionGrid();
    }

    flipVertical() {
        // Retourner la pièce sélectionnée verticalement
        if (!this.pieceSelectionnee) return;
        this.estRetournerVerticalement = !this.estRetournerVerticalement;
        this.updateSelectionGrid();
    }

    flipHorizontal() {
        // Retourner la pièce sélectionnée horizontalement
        if (!this.pieceSelectionnee) return;
        this.estRetournerHorizontal = !this.estRetournerHorizontal;
        this.updateSelectionGrid();
    }

    setupEventListeners() {
        // Configurer les écouteurs d'événements pour les boutons
        document.getElementById('rotate-right').onclick = () => this.rotateRight();
        document.getElementById('rotate-left').onclick = () => this.rotateLeft();
        document.getElementById('flip-vertical').onclick = () => this.flipVertical();
        document.getElementById('flip-horizontal').onclick = () => this.flipHorizontal();
    }
}

// Démarrer le jeu
document.addEventListener('DOMContentLoaded', () => {
    new JeuBlokus();
});