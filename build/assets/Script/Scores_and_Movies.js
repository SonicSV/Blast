let Global = require("Global");

cc.Class({
    extends: cc.Component,

    properties: {
        moves: cc.Label,
        score: cc.Label,
        bar: cc.Node,
    },

    update(dt) {
        this.moves.string = Global.remaining_Moves;
        this.score.string = Global.total_Score;
        this.bar.getComponent(cc.ProgressBar).progress = Global.progress_Bar / 100;
    },
});