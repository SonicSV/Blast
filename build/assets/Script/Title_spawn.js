cc.Class({
    extends: cc.Component,

    properties: {
        Title_blue_Prefab: cc.Prefab,
        Title_gold_Prefab: cc.Prefab,
        Title_green_Prefab: cc.Prefab,
        Title_purple_Prefab: cc.Prefab,
        Title_red_Prefab: cc.Prefab,
    },

    start() { // вызов спавнера
        this.schedule(function () {
            this.spawn();
        }, 0.1);
    },

    spawn() {
        const titleColor = [this.Title_blue_Prefab, this.Title_gold_Prefab, this.Title_green_Prefab, this.Title_purple_Prefab, this.Title_red_Prefab];
        let pointRayCastStart = this.node.getPosition(); //получаем локальные координаты текущей ноды для начальной точки луча
        pointRayCastStart.x += cc.winSize.width / 2; // переводим в мировые координаты по оси X
        pointRayCastStart.y += cc.winSize.height / 2 + 19; // переводим в мировые координаты по оси Y
        let pointRayCastEnd = this.node.getPosition(); // //получаем локальные координаты текущей ноды для конечной точки луча
        pointRayCastEnd.x += cc.winSize.width / 2; // переводим в мировые координаты по оси X
        pointRayCastEnd.y += cc.winSize.height / 2 - 25; // переводим в мировые координаты по оси Y и вычитаем 15 пикселей для конечной точки луча

        function getRandomColor(min, max) {
            return Math.floor(Math.random() * (max - min));
        };

        let title = cc.instantiate(titleColor[getRandomColor(0, titleColor.length)]);
        let results = cc.director.getPhysicsManager().rayCast(pointRayCastStart, pointRayCastEnd, cc.RayCastType.Any);
        if (results.length === 0) {
            title.parent = this.node.parent;
            title.setPosition(this.node.getPosition());
        }
    },
    update(dt) {},
});