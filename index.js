var Game = /** @class */ (function () {
    function Game() {
        this.teams = [];
    }
    Game.prototype.setTeam = function () {
        this.currentTeam = this.teams[(this.currentTeam.id + 1) % 2];
    };
    Game.prototype.getWinner = function () {
        if (this.teams[0].total > this.teams[1].total) {
            return 0;
        }
        return 1;
    };
    return Game;
}());
var Team = /** @class */ (function () {
    function Team(id) {
        this.total = 0;
        this.players = [];
        this.manOfTheMatch = 0;
        this.highestScore = 0;
        this.id = id;
    }
    Team.prototype.calculateTotal = function () {
        this.total = 0;
        for (var index = 0; index < 9; index++) {
            this.total += this.players[index].total;
        }
        return this.total;
    };
    Team.prototype.SetPlayer = function () {
        if (this.highestScore < this.currentPlayer.total) {
            this.highestScore = this.currentPlayer.total;
            this.manOfTheMatch = this.currentPlayer.id;
        }
        this.currentPlayer = this.players[(this.currentPlayer.id + 1) % 10];
    };
    return Team;
}());
var Player = /** @class */ (function () {
    function Player(id) {
        this.ballsFaced = 0;
        this.total = 0;
        this.ballScore = [null, null, null, null, null, null];
        this.id = id;
    }
    Player.prototype.Hit = function () {
        var random = Math.floor(Math.random() * 7);
        this.ballScore[this.ballsFaced] = random;
        this.total += random;
        this.ballsFaced++;
        return random;
    };
    return Player;
}());
var timer;
var counter;
var intervalId;
var Timer = /** @class */ (function () {
    function Timer() {
        counter = 60;
    }
    Timer.prototype.startTimer = function () {
        document.getElementById("timer").innerHTML = "60";
        intervalId = setInterval(function () {
            counter = counter - 1;
            document.getElementById("timer").innerHTML = String(counter);
            if (counter === 0) {
                document.getElementById("timer").innerHTML = "0";
                playerChange();
            }
        }, 1000);
    };
    Timer.prototype.endTimer = function () {
        document.getElementById("timer").innerHTML = "60";
        clearInterval(intervalId);
    };
    return Timer;
}());
var timer2;
var counter2;
var intervalId2;
var Timer2 = /** @class */ (function () {
    function Timer2() {
        counter2 = 60;
    }
    Timer2.prototype.startTimer = function () {
        intervalId2 = setInterval(function () {
            counter2 = counter2 - 1;
            document.getElementById("timer").innerHTML = String(counter2);
            if (counter2 === 0) {
                activateResult();
            }
        }, 1000);
    };
    Timer2.prototype.endTimer = function () {
        document.getElementById("timer").innerHTML = "0";
        clearInterval(intervalId2);
    };
    return Timer2;
}());
var ind = "";
function tablefill() {
    for (var a = 1; a < 3; a++) {
        ind = String(a);
        for (var i = 0; i < 10; i++) {
            ind += String(i);
            for (var j = 0; j < 7; j++) {
                var chd = document.createElement("td");
                chd.setAttribute("id", ind + "" + j);
                chd.innerHTML = "";
                document.getElementById(ind).appendChild(chd);
            }
            ind = String(a);
        }
    }
}
var game;
var currentRun;
document.getElementById("gameStart").addEventListener(("click"), function () {
    tablefill();
    document.getElementById("gameStart").setAttribute("disabled", "true");
    game = new Game();
    timer = new Timer();
    timer.startTimer();
    document.getElementById("ballHit1").removeAttribute("disabled");
    for (var index = 0; index < 2; index++) {
        game.teams.push(new Team(index));
        for (var j = 0; j < 10; j++) {
            game.teams[index].players.push(new Player(j));
        }
    }
    game.currentTeam = game.teams[0];
    game.currentTeam.currentPlayer = game.currentTeam.players[0];
    console.log(game);
});
document.getElementById("ballHit1").addEventListener(("click"), function () {
    var id = "1";
    var tot = "1";
    try {
        if (game.currentTeam.currentPlayer.ballsFaced < 6) {
            currentRun = game.currentTeam.currentPlayer.Hit();
            try {
                if (currentRun != 0) {
                    id += game.currentTeam.currentPlayer.id + "" + (game.currentTeam.currentPlayer.ballsFaced - 1);
                    document.getElementById(id).innerHTML = String(currentRun);
                    tot += game.currentTeam.currentPlayer.id + "6";
                    document.getElementById(tot).innerHTML = String(game.currentTeam.currentPlayer.total);
                }
                else {
                    throw ("Player got out");
                }
            }
            catch (error) {
                console.log(error);
                id += game.currentTeam.currentPlayer.id + "" + (game.currentTeam.currentPlayer.ballsFaced - 1);
                document.getElementById(id).innerHTML = String(currentRun);
                tot += game.currentTeam.currentPlayer.id + "6";
                document.getElementById(tot).innerHTML = String(game.currentTeam.currentPlayer.total);
                if (game.currentTeam.currentPlayer.id == 9) {
                    playerChange();
                }
                else {
                    game.currentTeam.SetPlayer();
                }
            }
        }
        else {
            throw ("Player faced 6 balls");
        }
    }
    catch (error) {
        console.log(error);
        if (game.currentTeam.currentPlayer.id == 9) {
            playerChange();
        }
        else {
            game.currentTeam.SetPlayer();
            tot += game.currentTeam.currentPlayer.id + "6";
            document.getElementById(tot).innerHTML = String(game.currentTeam.currentPlayer.total);
        }
    }
    document.getElementById("team1Score").innerHTML = game.teams[0].calculateTotal();
});
function playerChange() {
    timer.endTimer();
    timer2 = new Timer2();
    timer2.startTimer();
    document.getElementById("ballHit1").setAttribute("disabled", "true");
    document.getElementById("ballHit2").removeAttribute("disabled");
    game.currentTeam = game.teams[1];
    game.currentTeam.currentPlayer = game.currentTeam.players[0];
}
function activateResult() {
    timer2.endTimer();
    document.getElementById("ballHit2").setAttribute("disabled", "true");
    document.getElementById("generateResult").removeAttribute("disabled");
}
document.getElementById("generateResult").addEventListener(("click"), function () {
    document.getElementById("generateResult").setAttribute("disabled", "true");
    var winnerid = game.getWinner();
    var man = game.teams[winnerid].manOfTheMatch;
    var mos = game.teams[winnerid].highestScore;
    document.getElementById("winner").innerHTML = "TEAM " + (winnerid + 1);
    document.getElementById("motm").innerHTML = "PLAYER " + (man + 1);
    document.getElementById("team").innerHTML = "TEAM " + (winnerid + 1);
    document.getElementById("scorem").innerHTML = "SCORE: " + mos;
    document.getElementById("gameStart").removeAttribute("disabled");
});
document.getElementById("ballHit2").addEventListener(("click"), function () {
    var id = "2";
    var tot = "2";
    try {
        if (game.currentTeam.currentPlayer.ballsFaced < 6) {
            currentRun = game.currentTeam.currentPlayer.Hit();
            try {
                if (currentRun != 0) {
                    id += game.currentTeam.currentPlayer.id + "" + (game.currentTeam.currentPlayer.ballsFaced - 1);
                    document.getElementById(id).innerHTML = String(currentRun);
                    tot += game.currentTeam.currentPlayer.id + "6";
                    document.getElementById(tot).innerHTML = String(game.currentTeam.currentPlayer.total);
                }
                else {
                    throw ("Player got out");
                }
            }
            catch (error) {
                console.log(error);
                id += game.currentTeam.currentPlayer.id + "" + (game.currentTeam.currentPlayer.ballsFaced - 1);
                document.getElementById(id).innerHTML = String(currentRun);
                tot += game.currentTeam.currentPlayer.id + "6";
                document.getElementById(tot).innerHTML = String(game.currentTeam.currentPlayer.total);
                if (game.currentTeam.currentPlayer.id == 9) {
                    activateResult();
                }
                else {
                    game.currentTeam.SetPlayer();
                }
            }
        }
        else {
            throw ("Player faced 6 balls");
        }
    }
    catch (error) {
        console.log(error);
        if (game.currentTeam.currentPlayer.id == 9) {
            activateResult();
        }
        else {
            game.currentTeam.SetPlayer();
            tot += game.currentTeam.currentPlayer.id + "6";
            document.getElementById(tot).innerHTML = String(game.currentTeam.currentPlayer.total);
        }
    }
    document.getElementById("team2Score").innerHTML = game.teams[1].calculateTotal();
});
