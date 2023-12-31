class Games {
    constructor () {
        this.games = [];
    }
    addGame(pin, hostId, gameLive, gameData) {
        const game = {pin, hostId, gameLive, gameData};
        this.games.push(game);
        return game;
    }
    removeGame(hostId) {
        const game = this.getGame(hostId);
        
        if (game) {
            this.games = this.games.filter((game) => game.hostId !== hostId);
        }
        return game;
    }
    getGame(hostId) {
        return this.games.find((game) => game.hostId === hostId);
    }
}

module.exports = new Games();