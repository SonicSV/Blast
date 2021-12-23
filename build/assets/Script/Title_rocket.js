let Global = require("Global");

cc.Class({
    extends: cc.Component,

    properties: {
        Title_Rocket_Prefab: cc.Prefab,
    },

    start() {
        this.schedule(function () {
            if (Global.rocket_Event === true) {
                Global.rocket_Event = false;
                this.spawnTitleRocket();
            }
        }, 0.1);
    },

    spawnTitleRocket() {
        let title = cc.instantiate(this.Title_Rocket_Prefab);
        title.parent = cc.director.getPhysicsManager().testPoint(Global.rocket_Coord).node.parent;
        cc.director.getPhysicsManager().testPoint(Global.rocket_Coord).node.destroy()
        Global.rocket_Coord.x += -480
        Global.rocket_Coord.y += -270
        title.setPosition(Global.rocket_Coord);
    }
});