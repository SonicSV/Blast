cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad() {
        //cc.game.addPersistRootNode(this.node);
    },

    showWindow() {
        this.node.active = true;
        this.node.opacity = 0;
        this.node.scale = 0.2;
        cc.tween(this.node)
            .to(1, {
                scale: 1,
                opacity: 255
            }, {
                easing: "quartInOut"
            })
            .start();
    },

    hideWindow() {
        cc.tween(this.node)
            .to(1, {
                scale: 0.2,
                opacity: 0
            }, {
                easing: "quartInOut"
            })
            .call(() => {
                this.node.active = false;
            })
            .start();
    },

    Load_Scene_Game() {
        this.node.active = true;
        this.node.opacity = 0;
        this.node.scale = 0.2;
        cc.tween(this.node)
            .to(0.5, {
                scale: 1,
                opacity: 255
            }, {
                easing: "quartInOut"
            })
            .start();
        this.scheduleOnce(function () {
            cc.tween(this.node)
                .call(() => {
                    cc.director.loadScene('Scene_Game');
                })
                .start();
        }, 1);
    },

    Load_Scene_Menu() {
        this.node.active = true;
        this.node.opacity = 0;
        this.node.scale = 0.2;
        cc.tween(this.node)
            .to(0.5, {
                scale: 1,
                opacity: 255
            }, {
                easing: "quartInOut"
            })
            .start();
        this.scheduleOnce(function () {
            cc.tween(this.node)
                .call(() => {
                    cc.director.loadScene('Scene_Menu');
                })
                .start();
        }, 1);
    },
});