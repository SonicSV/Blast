let Global = require("Global");

cc.Class({
    extends: cc.Component,

    properties: {
        labelEventType: cc.Label,
        labelEventResult: cc.Label,
        labelScore: cc.Label,
        nodeEndGame: cc.Node,
        endGameEvent: false,
    },

    start() {
        this.schedule(function () {
            if (Global.remaining_Moves === 0) {
                this.endGame('Поражение', 'Закончились очки ходов');
            }
            if (Global.progress_Bar >= 100) {
                this.endGame('Победа!', `Взорвано ${Global.progress_Bar} из 100 камней`);
            }
            if (Global.stirring_Count > 2) {
                this.endGame('Поражение', 'Отсутствуют возможные ходы');
            }
        }, 0.2);
    },

    endGame(type, text) {
        if (this.endGameEvent === false) {
            this.endGameEvent = true;
            this.nodeEndGame.active = true;
            this.nodeEndGame.opacity = 0;
            this.nodeEndGame.scale = 0.2;
            cc.tween(this.nodeEndGame)
                .to(1, {
                    scale: 1,
                    opacity: 255
                }, {
                    easing: "quartInOut"
                })
                .start();
            this.labelEventType.string = type;
            this.labelEventResult.string = text;
            this.labelScore.string = `Набрано очков: ${Global.total_Score}`
        }
    },
});