window.__require = function t(e, i, o) {
    function n(s, c) {
        if (!i[s]) {
            if (!e[s]) {
                var d = s.split("/");
                if (d = d[d.length - 1], !e[d]) {
                    var h = "function" == typeof __require && __require;
                    if (!c && h) return h(d, !0);
                    if (r) return r(d, !0);
                    throw new Error("Cannot find module '" + s + "'")
                }
                s = d
            }
            var l = i[s] = {
                exports: {}
            };
            e[s][0].call(l.exports, function (t) {
                return n(e[s][1][t] || t)
            }, l, l.exports, t, e, i, o)
        }
        return i[s].exports
    }
    for (var r = "function" == typeof __require && __require, s = 0; s < o.length; s++) n(o[s]);
    return n
}({
    Check_move: [function (t, e) {
        "use strict";
        cc._RF.push(e, "42ec4FwezlOO7tKCiBYxgTi", "Check_move"), cc.Class({
            extends: cc.Component,
            properties: {
                coordPlus: 40,
                coordMinus: -40,
                coordCenter: 0,
                stirringNode: [],
                availabilityMove: !1,
                stirringCount: 0
            },
            start: function () {
                this.schedule(function () {
                    this.stirringNode = [], this.availabilityMove = !1, cc.director.getPhysicsManager().testPoint({
                        x: 100,
                        y: 70
                    }) && (this.checkMove(this.coordPlus, this.coordCenter, cc.director.getPhysicsManager().testPoint({
                        x: 100,
                        y: 70
                    }).node), this.checkMove(this.coordCenter, this.coordPlus, cc.director.getPhysicsManager().testPoint({
                        x: 100,
                        y: 70
                    }).node), this.scheduleOnce(function () {
                        !1 === this.availabilityMove && this.stirringCount <= 2 && this.stirringField()
                    }, 1))
                }, 5)
            },
            checkMove: function (t, e, i) {
                0 === this.stirringNode.length && this.stirringNode.push(i);
                var o = i.getPosition();
                o.x += cc.winSize.width / 2, o.y += cc.winSize.height / 2;
                var n = i.getPosition();
                n.x += cc.winSize.width / 2 + t, n.y += cc.winSize.height / 2 + e;
                var r = cc.director.getPhysicsManager().rayCast(o, n, cc.RayCastType.Any),
                    s = !1,
                    c = !1;
                if (void 0 !== r[0] && r[0].collider.node.name !== i.name) {
                    for (var d = 0; d < this.stirringNode.length; d++) Math.round(this.stirringNode[d].x) === Math.round(i.x) && Math.round(this.stirringNode[d].y) === Math.round(i.y) && (s = !0), d === this.stirringNode.length - 1 && !1 === s && this.stirringNode.push(i), void 0 !== r[0] && Math.round(this.stirringNode[d].x) === Math.round(r[0].collider.node.x) && Math.round(this.stirringNode[d].y) === Math.round(r[0].collider.node.y) && (c = !0);
                    void 0 !== r[0] && !1 === c && i.name.slice(0, 5) === r[0].collider.node.name.slice(0, 5) && !0 !== this.availabilityMove && (this.checkMove(this.coordPlus, this.coordCenter, r[0].collider.node), this.checkMove(this.coordCenter, this.coordPlus, r[0].collider.node))
                } else if (void 0 !== r[0] && r[0].collider.node.name === i.name) this.availabilityMove = !0;
                else if (void 0 === r[0])
                    for (var h = 0; h < this.stirringNode.length; h++) Math.round(this.stirringNode[h].x) === Math.round(i.x) && Math.round(this.stirringNode[h].y) === Math.round(i.y) && (s = !0), h === this.stirringNode.length - 1 && !1 === s && this.stirringNode.push(i)
            },
            stirringField: function () {
                for (var t = this.stirringNode.length - 1; t > 0; t--) {
                    var e = Math.floor(Math.random() * (t + 1)),
                        i = [this.stirringNode[e].x, this.stirringNode[t].x];
                    this.stirringNode[t].x = i[0], this.stirringNode[e].x = i[1];
                    var o = [this.stirringNode[e].y, this.stirringNode[t].y];
                    this.stirringNode[t].y = o[0], this.stirringNode[e].y = o[1]
                }
                this.stirringCount++
            }
        }), cc._RF.pop()
    }, {}],
    Event_touch: [function (t, e) {
        "use strict";
        cc._RF.push(e, "3ef10a0LV5NMLgEdbMHWDuH", "Event_touch");
        var i = t("Global");
        cc.Class({
            extends: cc.Component,
            properties: {
                coordPlus: 40,
                coordMinus: -40,
                coordCenter: 0,
                nodeArr: []
            },
            start: function () {
                this.node.on("touchstart", function () {
                    i.remaining_Moves > 0 && (this.findTitle(this.coordPlus, this.coordCenter, this.node), this.findTitle(this.coordMinus, this.coordCenter, this.node), this.findTitle(this.coordCenter, this.coordPlus, this.node), this.findTitle(this.coordCenter, this.coordMinus, this.node))
                }, this), this.node.on("touchend", function () {
                    this.destroyTitle()
                }, this)
            },
            findTitle: function (t, e, i) {
                0 === this.nodeArr.length && this.nodeArr.push(i);
                var o = i.getPosition();
                o.x += cc.winSize.width / 2, o.y += cc.winSize.height / 2;
                var n = i.getPosition();
                n.x += cc.winSize.width / 2 + t, n.y += cc.winSize.height / 2 + e;
                for (var r = cc.director.getPhysicsManager().rayCast(o, n, cc.RayCastType.Any), s = !1, c = !1, d = 0; d < this.nodeArr.length; d++) Math.round(this.nodeArr[d].x) === Math.round(i.x) && Math.round(this.nodeArr[d].y) === Math.round(i.y) && (s = !0), d === this.nodeArr.length - 1 && !1 === s && this.nodeArr.push(i), void 0 !== r[0] && Math.round(this.nodeArr[d].x) === Math.round(r[0].collider.node.x) && Math.round(this.nodeArr[d].y) === Math.round(r[0].collider.node.y) && (c = !0);
                void 0 !== r[0] && r[0].collider.node.name === i.name && !1 === c && (t > 0 ? (this.findTitle(this.coordPlus, this.coordCenter, r[0].collider.node), this.findTitle(this.coordCenter, this.coordPlus, r[0].collider.node), this.findTitle(this.coordCenter, this.coordMinus, r[0].collider.node)) : t < 0 ? (this.findTitle(this.coordMinus, this.coordCenter, r[0].collider.node), this.findTitle(this.coordCenter, this.coordPlus, r[0].collider.node), this.findTitle(this.coordCenter, this.coordMinus, r[0].collider.node)) : e > 0 ? (this.findTitle(this.coordPlus, this.coordCenter, r[0].collider.node), this.findTitle(this.coordMinus, this.coordCenter, r[0].collider.node), this.findTitle(this.coordCenter, this.coordPlus, r[0].collider.node)) : e < 0 && (this.findTitle(this.coordPlus, this.coordCenter, r[0].collider.node), this.findTitle(this.coordMinus, this.coordCenter, r[0].collider.node), this.findTitle(this.coordCenter, this.coordMinus, r[0].collider.node)))
            },
            destroyTitle: function () {
                if (this.nodeArr.length > 1) {
                    for (var t = 0; t < this.nodeArr.length; t++) this.nodeArr[t].getComponent(cc.Animation).play();
                    i.remaining_Moves -= 1, i.total_Score += this.nodeArr.length * this.nodeArr.length, i.progress_Bar += this.nodeArr.length / 100
                }
            }
        }), cc._RF.pop()
    }, {
        Global: "Global"
    }],
    Global: [function (t, e) {
        "use strict";
        cc._RF.push(e, "6a87dc+53REGJqeE/C3usyz", "Global"), e.exports = {
            remaining_Moves: null,
            total_Score: null,
            progress_Bar: null
        }, cc._RF.pop()
    }, {}],
    Scene_load: [function (t, e) {
        "use strict";
        cc._RF.push(e, "d6ccc/m+QtCjI1agnh5Dsk1", "Scene_load"), cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function () {
                cc.game.addPersistRootNode(this.node)
            },
            Load_Next_Scene: function () {
                var t = this;
                cc.tween(this.node).to(1, {
                    position: cc.v2(480, 270)
                }, {
                    easing: "cubInOut"
                }).call(function () {
                    t.Load_Scene()
                }).to(1, {
                    position: cc.v2(480, 810)
                }, {
                    easing: "cubInOut"
                }).start()
            },
            Load_Scene: function () {
                cc.director.loadScene("Scene_Game")
            }
        }), cc._RF.pop()
    }, {}],
    Scores_and_Movies: [function (t, e) {
        "use strict";
        cc._RF.push(e, "0e93dYyU+JHxZTtLu/DiXjp", "Scores_and_Movies");
        var i = t("Global");
        cc.Class({
            extends: cc.Component,
            properties: {
                moves: cc.Label,
                score: cc.Label,
                bar: cc.Node
            },
            onLoad: function () {},
            start: function () {},
            update: function () {
                this.moves.string = i.remaining_Moves, this.score.string = i.total_Score, this.bar.getComponent(cc.ProgressBar).progress = i.progress_Bar
            }
        }), cc._RF.pop()
    }, {
        Global: "Global"
    }],
    Settings: [function (t, e) {
        "use strict";
        cc._RF.push(e, "350adKF989GF4BN+RAe/jAH", "Settings");
        var i = t("Global");
        cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function () {
                cc.director.getPhysicsManager().enabled = !0, i.remaining_Moves = 30, i.total_Score = 0, i.progress_Bar = 0
            }
        }), cc._RF.pop()
    }, {
        Global: "Global"
    }],
    Titile_remove: [function (t, e) {
        "use strict";
        cc._RF.push(e, "ff155oMom1DkJdFJlYMW2PK", "Titile_remove"), cc.Class({
            extends: cc.Component,
            properties: {},
            remove_Title: function () {
                this.node.destroy()
            }
        }), cc._RF.pop()
    }, {}],
    Title_spawn: [function (t, e) {
        "use strict";
        cc._RF.push(e, "813d8KzgQlBlaB+uVlHFlvu", "Title_spawn"), cc.Class({
            extends: cc.Component,
            properties: {
                Title_blue_Prefab: cc.Prefab,
                Title_gold_Prefab: cc.Prefab,
                Title_green_Prefab: cc.Prefab,
                Title_purple_Prefab: cc.Prefab,
                Title_red_Prefab: cc.Prefab
            },
            onLoad: function () {},
            start: function () {
                this.schedule(function () {
                    this.spawn()
                }, .1)
            },
            spawn: function () {
                var t = [this.Title_blue_Prefab, this.Title_gold_Prefab, this.Title_green_Prefab, this.Title_purple_Prefab, this.Title_red_Prefab],
                    e = this.node.getPosition();
                e.x += cc.winSize.width / 2, e.y += cc.winSize.height / 2 + 19;
                var i = this.node.getPosition();
                i.x += cc.winSize.width / 2, i.y += cc.winSize.height / 2 - 25;
                var o, n = cc.instantiate(t[(0, o = t.length, Math.floor(Math.random() * (o - 0)))]);
                0 === cc.director.getPhysicsManager().rayCast(e, i, cc.RayCastType.Any).length && (n.parent = this.node.parent, n.setPosition(this.node.getPosition()))
            },
            update: function () {}
        }), cc._RF.pop()
    }, {}]
}, {}, ["Check_move", "Event_touch", "Global", "Scene_load", "Scores_and_Movies", "Settings", "Titile_remove", "Title_spawn"]);