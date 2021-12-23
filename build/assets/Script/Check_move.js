let Global = require("Global");

cc.Class({
    extends: cc.Component,

    properties: {
        coordPlus: 40,
        coordMinus: -40,
        coordCenter: 0,
        stirringNode: [],
        availabilityMove: false,
        stirringCount: 0,
    },

    // при старте игровой сцены каждые n секунд вызывается функция сверки тайлов, начальная точка
    // в районе левого нижнего тайла

    start() {
        this.schedule(function () {
            this.stirringNode = [];
            this.availabilityMove = false;
            if (cc.director.getPhysicsManager().testPoint({
                    x: 100,
                    y: 70
                })) {
                this.checkMove(this.coordPlus, this.coordCenter, cc.director.getPhysicsManager().testPoint({
                    x: 100,
                    y: 70
                }).node)
                this.checkMove(this.coordCenter, this.coordPlus, cc.director.getPhysicsManager().testPoint({
                    x: 100,
                    y: 70
                }).node)
                this.scheduleOnce(function () {
                    if (this.availabilityMove === false && Global.stirring_Count <= 2) { //количество перемешиваний до проигрыша
                        this.stirringField();
                    };
                }, 1);
            }
        }, 3);
    },

    // сбор тайлов в массив, до тех пор пока не будет найден доступный ход
    // если ход будет найден, availabilityMove примет значение true, и перемешивание не будет вызвано,
    // если доступных ходов найдено не будет, функция будет собирать все тайлы в массив.

    checkMove(coordX, coordY, thisNode) {
        if (this.stirringNode.length === 0) {
            this.stirringNode.push(thisNode)
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
        if (results[0] !== undefined && results[0]['collider']['node']['name'] !== thisNode.name) {
            for (let i = 0; i < this.stirringNode.length; i++) {
                if (Math.round(this.stirringNode[i].x) === Math.round(thisNode.x) && Math.round(this.stirringNode[i].y) === Math.round(thisNode.y)) {
                    matchThisNode = true;
                }
                if (i === this.stirringNode.length - 1 && matchThisNode === false) {
                    this.stirringNode.push(thisNode);
                }
                if (results[0] !== undefined && Math.round(this.stirringNode[i].x) === Math.round(results[0]['collider']['node']['x']) &&
                    Math.round(this.stirringNode[i].y) === Math.round(results[0]['collider']['node']['y'])) {
                    matchCoordNextNode = true;
                }
            }
            if (results[0] !== undefined && matchCoordNextNode === false &&
                thisNode.name.slice(0, 5) === results[0]['collider']['node']['name'].slice(0, 5) &&
                this.availabilityMove !== true) {
                this.checkMove(this.coordPlus, this.coordCenter, results[0].collider.node);
                this.checkMove(this.coordCenter, this.coordPlus, results[0].collider.node);
            }
        } else if (results[0] !== undefined && results[0]['collider']['node']['name'] === thisNode.name) {
            this.availabilityMove = true;
        } else if (results[0] === undefined) {
            for (let i = 0; i < this.stirringNode.length; i++) {
                if (Math.round(this.stirringNode[i].x) === Math.round(thisNode.x) && Math.round(this.stirringNode[i].y) === Math.round(thisNode.y)) {
                    matchThisNode = true;
                }
                if (i === this.stirringNode.length - 1 && matchThisNode === false) {
                    this.stirringNode.push(thisNode);
                }
            }
        }
    },

    //перемешивыние поля в случае отсутствия ходов по алгоритму Фишера — Йетса.

    stirringField() {
        for (let i = this.stirringNode.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.stirringNode[i].x, this.stirringNode[j].x] = [this.stirringNode[j].x, this.stirringNode[i].x];
            [this.stirringNode[i].y, this.stirringNode[j].y] = [this.stirringNode[j].y, this.stirringNode[i].y];
        }
        this.stirringCount++;
    }
});