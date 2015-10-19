var Packt = Packt || {};
Packt.Components = Packt.Components || {};
Packt.Components.LaserGun = function(entity, canvas, maxShots) {
   var entity = entity;
   var MAX_SHOTS = maxShots;
   var canvas = canvas;
   var shots = new Array();
   var shotsPerSec = 1000 / 15;
   var timeLastShot = 0;

   this.update = function() {
      for (var i = 0, len = shots.length; i < len; i++) {
         try {
            shots[i].update();
            var shotPos = shots[i].getPosition();
   
            if (shotPos.y < -100) {
               shots.splice(i, 1);
            }
         } catch (e) {}
      }
   };

   this.add = function(x, y) {
      var time = Date.now();
      if (time - timeLastShot >= shotsPerSec) {
         if (shots.length < MAX_SHOTS) {
            var shot = new Packt.Entity(Packt.ENTITY_TYPES.BULLET, x, y);
            var spriteComp = new Packt.Components.Sprite(shot, "./img/laser-blue.png", 8, 32);
            spriteComp.setCtx(canvas.getContext());
            var strengthComp = new Packt.Components.Strength(shot, 10, 0);
            var physComp = new Packt.Components.Physics(shot);
            var mockMove = new Packt.Components.Move(shot, 15);
            shot.addComponent("sprite", spriteComp);
            shot.addComponent("move", mockMove);
            shot.addComponent("physics", physComp);
            shot.addComponent("strength", strengthComp);
   
            shot.setOnUpdate(function() {
               mockMove.setDirection(0, -1);
               mockMove.update();
            });
   
            shots.push(shot);
         }

         timeLastShot = time;
      }
   };

   this.getShots = function() {
      return shots;
   };
};
