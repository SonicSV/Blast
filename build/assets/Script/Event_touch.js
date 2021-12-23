let Global = require("Global");

cc.Class({
    extends: cc.Component,

    properties: {
        coordPlus: 40,
        coordMinus: -40,
        coordCenter: 0,
        nodeArr: [],
        click: 0,
    },

    start() {
        this.node.on('touchstart', function (event) {
            if (Global.remaining_Moves > 0 && this.click === 0) {
                this.click++
                if (this.node.name === 'Title_rocket') {
                    this.rocketTitle(this.node)
                } else {
                    this.findTitle(this.coordPlus, this.coordCenter, this.node)
                    this.findTitle(this.coordMinus, this.coordCenter, this.node)
                    this.findTitle(this.coordCenter, this.coordPlus, this.node)
                    this.findTitle(this.coordCenter, this.coordMinus, this.node)
                }
                this.destroyTitle()
                this.scheduleOnce(function () {
                    this.click = 0;
                }, 1);
            }
        }, this);
    },

    findTitle(coordX, coordY, thisNode) {
        if (this.nodeArr.length === 0) {
            this.nodeArr.push(thisNode)
        }
        let pointRayCastStart = thisNode.getPosition(); //получаем локальные координаты текущей ноды для начальной точки луча
        pointRayCastStart.x += cc.winSize.width / 2; // переводим в мировые координаты по оси X
        pointRayCastStart.y += cc.winSize.height / 2; // переводим в мировые координаты по оси Y
        let pointRayCastEnd = thisNode.getPosition(); // //получаем локальные координаты текущей ноды для конечной точки луча
        pointRayCastEnd.x += cc.winSize.width / 2 + coordX; // переводим в мировые координаты по оси X
        pointRayCastEnd.y += cc.winSize.height / 2 + coordY; // переводим в мировые координаты по оси Y  для конечной точки луча
        let results = cc.director.getPhysicsManager().rayCast(pointRayCastStart, pointRayCastEnd, cc.RayCastType.Any);
        let matchThisNode = false;
        let matchCoordNextNode = false;
        for (let i = 0; i < this.nodeArr.length; i++) {
            if (Math.round(this.nodeArr[i].x) === Math.round(thisNode.x) && Math.round(this.nodeArr[i].y) === Math.round(thisNode.y)) {
                matchThisNode = true;
            }
            if (i === this.nodeArr.length - 1 && matchThisNode === false) {
                this.nodeArr.push(thisNode)
            }
            if (results[0] !== undefined && Math.round(this.nodeArr[i].x) === Math.round(results[0]['collider']['node']['x']) &&
                Math.round(this.nodeArr[i].y) === Math.round(results[0]['collider']['node']['y'])) {
                matchCoordNextNode = true;
            }
        }
        if (results[0] !== undefined && results[0]['collider']['node']['name'] === thisNode.name && matchCoordNextNode === false) {
            if (coordX > 0) {
                this.findTitle(this.coordPlus, this.coordCenter, results[0].collider.node)
                this.findTitle(this.coordCenter, this.coordPlus, results[0].collider.node)
                this.findTitle(this.coordCenter, this.coordMinus, results[0].collider.node)
            } else if (coordX < 0) {
                this.findTitle(this.coordMinus, this.coordCenter, results[0].collider.node)
                this.findTitle(this.coordCenter, this.coordPlus, results[0].collider.node)
                this.findTitle(this.coordCenter, this.coordMinus, results[0].collider.node)
            } else if (coordY > 0) {
                this.findTitle(this.coordPlus, this.coordCenter, results[0].collider.node)
                this.findTitle(this.coordMinus, this.coordCenter, results[0].collider.node)
                this.findTitle(this.coordCenter, this.coordPlus, results[0].collider.node)
            } else if (coordY < 0) {
                this.findTitle(this.coordPlus, this.coordCenter, results[0].collider.node)
                this.findTitle(this.coordMinus, this.coordCenter, results[0].collider.node)
                this.findTitle(this.coordCenter, this.coordMinus, results[0].collider.node)
            }
        }
    },

    rocketTitle(thisNode) {
        let pointRayCastStart = thisNode.getPosition(); //получаем локальные координаты текущей ноды для начальной точки луча
        pointRayCastStart.x += cc.winSize.width / 2; // переводим в мировые координаты по оси X
        pointRayCastStart.y = 449;
        let pointRayCastEnd = thisNode.getPosition(); // //получаем локальные координаты текущей ноды для конечной точки луча
        pointRayCastEnd.x += cc.winSize.width / 2; // переводим в мировые координаты по оси X
        pointRayCastEnd.y = 75;
        let results = cc.director.getPhysicsManager().rayCast(pointRayCastStart, pointRayCastEnd, cc.RayCastType.All);
        for (let i = 0; i < results.length; i++) {
            this.nodeArr.push(results[i]['collider']['node'])
        }
    },

    destroyTitle() {
        if (this.nodeArr.length > 1) {
            for (let i = 0; i < this.nodeArr.length; i++) {
                this.nodeArr[i].getComponent(cc.Animation).play()
            }
            Global.remaining_Moves -= 1;
            Global.total_Score += this.nodeArr.length * this.nodeArr.length;
            Global.progress_Bar += this.nodeArr.length;
            if (this.node.name !== 'Title_rocket' && this.nodeArr.length >= 5) {
                Global.rocket_Coord.x = this.node.getPosition().x + cc.winSize.width / 2;
                Global.rocket_Coord.y = this.node.getPosition().y + cc.winSize.height / 2;
                Global.rocket_Event = true;
            }
        }
    },

    remove_Title() {
        this.node.destroy();
    },

    // update (dt) {},
});