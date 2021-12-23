cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad() {
        //cc.game.addPersistRootNode(this.node);
        cc.tween(this.node)
            .to(0.5, {
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
});