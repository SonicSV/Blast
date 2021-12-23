let Global = require("Global");

cc.Class({
    extends: cc.Component,

    properties: {},


    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        Global.remaining_Moves = 20; // Оставшиеся ходы
        Global.total_Score = 0;
        Global.progress_Bar = 0;
        Global.stirring_Count = 0;
        Global.rocket_Coord = {};
        Global.rocket_Event = false;

        // cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        //     cc.PhysicsManager.DrawBits.e_pairBit |
        //     cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        //     cc.PhysicsManager.DrawBits.e_jointBit |
        //     cc.PhysicsManager.DrawBits.e_shapeBit;
    },

});