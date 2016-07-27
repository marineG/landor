// ===========/\/\/\/\/\/Keleidoscope test - Hive V4 - June 2015/\/\/\/\/\/=========


(function() {
  var DragDrop, Kaleidoscope, c, dragger, gui, i, image, kaleidoscope, len, onChange, onMouseMoved, options, ref, tr, tx, ty, update,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Kaleidoscope = (function() {
    Kaleidoscope.prototype.HALF_PI = Math.PI / 2;

    Kaleidoscope.prototype.TWO_PI = Math.PI * 2;

    function Kaleidoscope(options1) {
      var key, ref, ref1, val;
      this.options = options1 != null ? options1 : {};
      this.defaults = {
        offsetRotation: 0,
        offsetScale: 1.0,
        offsetX: 0.0,
        offsetY: 0.0,
        radius: 400,
        slices: 8,
        zoom: 1.2,
        startAutoX : 0,
        startAutoY : 0,
        timer : 100,
        xPlus : 4,
        yPlus : 2,
        timerRef : null
      };
      ref = this.defaults;
      for (key in ref) {
        val = ref[key];
        this[key] = val;
      }
      ref1 = this.options;
      for (key in ref1) {
        val = ref1[key];
        this[key] = val;
      }
      if (this.domElement == null) {
        this.domElement = document.createElement('canvas');
      }
      if (this.context == null) {
        this.context = this.domElement.getContext('2d');
      }
      if (this.image == null) {
        this.image = document.createElement('img');
      }
    }

    Kaleidoscope.prototype.draw = function() {
      var cx, i, index, ref, results, scale, step;
      this.domElement.width = this.domElement.height = this.radius * 2;
      this.context.fillStyle = this.context.createPattern(this.image, 'repeat');
      scale = this.zoom * (this.radius / Math.min(this.image.width, this.image.height));
      step = this.TWO_PI / this.slices;
      cx = this.image.width / 2;
      results = [];
      for (index = i = 0, ref = this.slices; 0 <= ref ? i <= ref : i >= ref; index = 0 <= ref ? ++i : --i) {
        this.context.save();
        this.context.translate(this.radius, this.radius);
        this.context.rotate(index * step);
        this.context.beginPath();
        this.context.moveTo(-0.5, -0.5);
        this.context.arc(0, 0, this.radius, step * -0.51, step * 0.51);
        this.context.lineTo(0.5, 0.5);
        this.context.closePath();
        this.context.rotate(this.HALF_PI);
        this.context.scale(scale, scale);
        this.context.scale([-1, 1][index % 2], 1);
        this.context.translate(this.offsetX - cx, this.offsetY);
        this.context.rotate(this.offsetRotation);
        this.context.scale(this.offsetScale, this.offsetScale);
        this.context.fill();
        results.push(this.context.restore());
      }
      return results;
    };

    return Kaleidoscope;

  })();

  DragDrop = (function() {
    function DragDrop(callback, context, filter) {
      var disable;
      this.callback = callback;
      this.context = context != null ? context : document;
      this.filter = filter != null ? filter : /^image/i;
      this.onDrop = bind(this.onDrop, this);
      disable = function(event) {
        event.stopPropagation();
        return event.preventDefault();
      };
      this.context.addEventListener('dragleave', disable);
      this.context.addEventListener('dragenter', disable);
      this.context.addEventListener('dragover', disable);
      this.context.addEventListener('drop', this.onDrop, false);
    }

    DragDrop.prototype.onDrop = function(event) {
      var file, reader;
      event.stopPropagation();
      event.preventDefault();
      file = event.dataTransfer.files[0];
      if (this.filter.test(file.type)) {
        reader = new FileReader;
        reader.onload = (function(_this) {
          return function(event) {
            return typeof _this.callback === "function" ? _this.callback(event.target.result) : void 0;
          };
        })(this);
        return reader.readAsDataURL(file);
      }
    };

    return DragDrop;

  })();

  image = new Image;
  image2 = new Image;
  image3 = new Image;

  image.onload = (function(_this) {
    return function() {
      return kaleidoscope.draw();
    };

  })(this);

  image.src = 'img1.png';
  image2.src = 'img2.png';
  image3.src = 'img3.png';

// ==================KALEIDOSCOPE1===============
  kaleidoscope = new Kaleidoscope({
    image: image,
    slices: 8

  });



    kaleidoscope.domElement.style.position = 'absolute';

    kaleidoscope.domElement.style.marginLeft = -kaleidoscope.radius + 'px';

    kaleidoscope.domElement.style.marginTop = -kaleidoscope.radius + 'px';

    kaleidoscope.domElement.style.left = '50%';

    kaleidoscope.domElement.style.top = '50%';

    document.getElementById('hiveCanvas').appendChild(kaleidoscope.domElement);

    dragger = new DragDrop(function(data) {
      return kaleidoscope.image.src = data;
    });

    tx = kaleidoscope.offsetX;

    ty = kaleidoscope.offsetY;

    tr = kaleidoscope.offsetRotation;

    onMouseMoved = (function(_this) {
      return function(event) {

        var cx, cy, dx, dy, hx, hy;
        cx = window.innerWidth / 2;
        cy = window.innerHeight / 2;
        dx = event.pageX / window.innerWidth;
        dy = event.pageY / window.innerHeight;
        hx = dx - 0.5;
        hy = dy - 0.5;
        tx = hx * kaleidoscope.radius * -2;
        ty = hy * kaleidoscope.radius * 2;
        startOptionAutoX = event.pageX ;
        startOptionAutoY = event.pageY ;
        
        return tr = Math.atan2(hy, hx);
      };
    })(this);

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    var startOptionAutoX = kaleidoscope.startAutoX,
        startOptionAutoY = kaleidoscope.startAutoY;

    onTime = (function(_this) {
      
      return function() {
        var cx, cy, dx, dy, hx, hy, ww, wh;
        ww = window.innerWidth;
        wh = window.innerHeight;
        cx = window.innerWidth / 2;
        cy = window.innerHeight / 2;
        dx = startOptionAutoX / window.innerWidth;
        dy = startOptionAutoY / window.innerHeight;
        hx = dx - 0.5;
        hy = dy - 0.5;
        tx = hx * kaleidoscope.radius * -2;
        ty = hy * kaleidoscope.radius * 2;

        startOptionAutoX = startOptionAutoX + kaleidoscope.xPlus;
        startOptionAutoY = startOptionAutoY + kaleidoscope.yPlus;

        return tr = Math.atan2(hy, hx);
      };
    })(this);

    window.addEventListener('mousemove', onMouseMoved, false);

    kaleidoscope.timerRef = window.setInterval(onTime, kaleidoscope.timer);

    options = {
      interactive: true,
      ease: 0.1
    };

    (update = (function(_this) {
      console.log("_this / self = ", _this);
      console.log("this = ", this);
      return function() {
        var delta, theta;
        if (options.interactive) {
          delta = tr - kaleidoscope.offsetRotation;
          theta = Math.atan2(Math.sin(delta), Math.cos(delta));
          kaleidoscope.offsetX += (tx - kaleidoscope.offsetX) * options.ease;
          kaleidoscope.offsetY += (ty - kaleidoscope.offsetY) * options.ease;
          kaleidoscope.offsetRotation += (theta - kaleidoscope.offsetRotation) * options.ease;
          kaleidoscope.draw();
        }
        return setTimeout(update, 1000 / 60);
      };
    })(this))();
// =======================

/////////////KALEIDOSCOPE IMG2///////////
kaleidoscope2 = new Kaleidoscope({
    image: image2,
    slices: 8

  });

    kaleidoscope2.domElement.style.position = 'absolute';

    kaleidoscope2.domElement.style.marginLeft = -kaleidoscope2.radius + 'px';

    kaleidoscope2.domElement.style.marginTop = -kaleidoscope2.radius + 'px';

    kaleidoscope2.domElement.style.left = '50%';

    kaleidoscope2.domElement.style.top = '50%';

    document.getElementById('hiveCanvas').appendChild(kaleidoscope2.domElement);

    dragger = new DragDrop(function(data) {
      return kaleidoscope2.image.src = data;
    });

    tx = kaleidoscope2.offsetX;

    ty = kaleidoscope2.offsetY;

    tr = kaleidoscope2.offsetRotation;

    onMouseMoved = (function(_this) {
      return function(event) {

        var cx, cy, dx, dy, hx, hy;
        cx = window.innerWidth / 2;
        cy = window.innerHeight / 2;
        dx = event.pageX / window.innerWidth;
        dy = event.pageY / window.innerHeight;
        hx = dx - 0.5;
        hy = dy - 0.5;
        tx = hx * kaleidoscope2.radius * -2;
        ty = hy * kaleidoscope2.radius * 2;
        startOptionAutoX = event.pageX ;
        startOptionAutoY = event.pageY ;
        
        return tr = Math.atan2(hy, hx);
      };
    })(this);

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    var startOptionAutoX = kaleidoscope2.startAutoX,
        startOptionAutoY = kaleidoscope2.startAutoY;

    onTime = (function(_this) {
      
      return function() {
        var cx, cy, dx, dy, hx, hy, ww, wh;
        ww = window.innerWidth;
        wh = window.innerHeight;
        cx = window.innerWidth / 2;
        cy = window.innerHeight / 2;
        dx = startOptionAutoX / window.innerWidth;
        dy = startOptionAutoY / window.innerHeight;
        hx = dx - 0.5;
        hy = dy - 0.5;
        tx = hx * kaleidoscope2.radius * -2;
        ty = hy * kaleidoscope2.radius * 2;

        startOptionAutoX = startOptionAutoX + kaleidoscope2.xPlus;
        startOptionAutoY = startOptionAutoY + kaleidoscope2.yPlus;

        return tr = Math.atan2(hy, hx);
      };
    })(this);

    window.addEventListener('mousemove', onMouseMoved, false);

    kaleidoscope2.timerRef = window.setInterval(onTime, kaleidoscope2.timer);

    options = {
      interactive: true,
      ease: 0.1
    };

    (update = (function(_this) {
      return function() {
        var delta, theta;
        if (options.interactive) {
          delta = tr - kaleidoscope2.offsetRotation;
          theta = Math.atan2(Math.sin(delta), Math.cos(delta));
          kaleidoscope2.offsetX += (tx - kaleidoscope2.offsetX) * options.ease;
          kaleidoscope2.offsetY += (ty - kaleidoscope2.offsetY) * options.ease;
          kaleidoscope2.offsetRotation += (theta - kaleidoscope2.offsetRotation) * options.ease;
          kaleidoscope2.draw();
        }
        return setTimeout(update, 1000 / 60);
      };
    })(this))();


// ================

  /////////////KALEIDOSCOPE IMG3///////////
kaleidoscope3 = new Kaleidoscope({
    image: image3,
    slices: 8

  });

    kaleidoscope3.domElement.style.position = 'absolute';

    kaleidoscope3.domElement.style.marginLeft = -kaleidoscope3.radius + 'px';

    kaleidoscope3.domElement.style.marginTop = -kaleidoscope3.radius + 'px';

    kaleidoscope3.domElement.style.left = '50%';

    kaleidoscope3.domElement.style.top = '50%';

    document.getElementById('hiveCanvas').appendChild(kaleidoscope3.domElement);

    dragger = new DragDrop(function(data) {
      return kaleidoscope3.image.src = data;
    });

    tx = kaleidoscope3.offsetX;

    ty = kaleidoscope3.offsetY;

    tr = kaleidoscope3.offsetRotation;

    onMouseMoved = (function(_this) {
      return function(event) {

        var cx, cy, dx, dy, hx, hy;
        cx = window.innerWidth / 2;
        cy = window.innerHeight / 2;
        dx = event.pageX / window.innerWidth;
        dy = event.pageY / window.innerHeight;
        hx = dx - 0.5;
        hy = dy - 0.5;
        tx = hx * kaleidoscope3.radius * -2;
        ty = hy * kaleidoscope3.radius * 2;
        startOptionAutoX = event.pageX ;
        startOptionAutoY = event.pageY ;
        
        return tr = Math.atan2(hy, hx);
      };
    })(this);

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    var startOptionAutoX = kaleidoscope3.startAutoX,
        startOptionAutoY = kaleidoscope3.startAutoY;

    onTime = (function(_this) {
      
      return function() {
        var cx, cy, dx, dy, hx, hy, ww, wh;
        ww = window.innerWidth;
        wh = window.innerHeight;
        cx = window.innerWidth / 2;
        cy = window.innerHeight / 2;
        dx = startOptionAutoX / window.innerWidth;
        dy = startOptionAutoY / window.innerHeight;
        hx = dx - 0.5;
        hy = dy - 0.5;
        tx = hx * kaleidoscope3.radius * -2;
        ty = hy * kaleidoscope3.radius * 2;

        startOptionAutoX = startOptionAutoX + kaleidoscope3.xPlus;
        startOptionAutoY = startOptionAutoY + kaleidoscope3.yPlus;

        return tr = Math.atan2(hy, hx);
      };
    })(this);

    window.addEventListener('mousemove', onMouseMoved, false);

    kaleidoscope3.timerRef = window.setInterval(onTime, kaleidoscope3.timer);

    options = {
      interactive: true,
      ease: 0.1
    };

    (update = (function(_this) {
      return function() {
        var delta, theta;
        if (options.interactive) {
          delta = tr - kaleidoscope3.offsetRotation;
          theta = Math.atan2(Math.sin(delta), Math.cos(delta));
          kaleidoscope3.offsetX += (tx - kaleidoscope3.offsetX) * options.ease;
          kaleidoscope3.offsetY += (ty - kaleidoscope3.offsetY) * options.ease;
          kaleidoscope3.offsetRotation += (theta - kaleidoscope3.offsetRotation) * options.ease;
          kaleidoscope3.draw();
        }
        return setTimeout(update, 1000 / 60);
      };
    })(this))();

// ==========/\/\/\Control box/\/\/\/========
  // gui = new dat.GUI;

  gui = new dat.GUI( { autoPlace: false } );
      gui.add(kaleidoscope, 'zoom').min(0.25).max(2.0);

      gui.add(kaleidoscope, 'slices').min(6).max(32).step(2);

      // gui.add(kaleidoscope, 'radius').min(300).max(500);

      gui.add(kaleidoscope, 'xPlus').min(0).max(300).listen();

      gui.add(kaleidoscope, 'yPlus').min(0).max(300).listen();

      // gui.add(kaleidoscope, 'timer').min(0).max(2000).listen();
      var controller = gui.add(kaleidoscope, 'timer', 0, 2000);

      gui.add(kaleidoscope, 'offsetRotation').min(-Math.PI).max(Math.PI).listen();

      gui.add(kaleidoscope, 'offsetScale').min(0.5).max(4.0);

      gui.add(options, 'interactive').listen();
  
      // ======
      // SPECIFIC TIMER
      // ======
      controller.onChange(function(value) {

        window.clearInterval(kaleidoscope.timerRef);
        kaleidoscope.timerRef = null;
        kaleidoscope.timer = value;

      });

      controller.onFinishChange(function(value) {
      kaleidoscope.timerRef = window.setInterval(onTime, kaleidoscope.timer);
      });

  var customContainer = document.getElementById('gui').appendChild(gui.domElement);

  

  // ======
  gui.close();

  onChange = (function(_this) {
    return function() {
      kaleidoscope.domElement.style.marginLeft = -kaleidoscope.radius + 'px';
      kaleidoscope.domElement.style.marginTop = -kaleidoscope.radius + 'px';
      options.interactive = true;
      
      return kaleidoscope.draw();
    };
  })(this);

  ref = gui.__controllers;
  for (i = 0, len = ref.length; i < len; i++) {
    c = ref[i];
    if (c.property !== 'interactive' && c.property !== 'timer') {
      c.onChange(onChange);
    }
  }

}).call(this);





