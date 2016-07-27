// ===========/\/\/\/\/\/Keleidoscope test - Hive V4 - June 2015/\/\/\/\/\/=========
(function() {
  var DragDrop, Kaleidoscope, c, dragger, i, image, image2, image3, kaleidoscope1, kaleidoscope2, kaleidoscope3, len, onChange, onMouseMoved, options, ref, tr, tx, ty,
      bind = function(fn, me) {
        return function() {
          return fn.apply(me, arguments);
        };
      };

  // Generic => kaleidoscope Construcor
  Kaleidoscope  = (function() {
    Kaleidoscope.prototype.HALF_PI = Math.PI / 2;
    Kaleidoscope.prototype.TWO_PI = Math.PI * 2;

    function Kaleidoscope(options1) {
      var key, ref, ref1, val, update;
      this.options = options1 != null ? options1 : {};
      this.defaults = {
        offsetRotation: 0,
        offsetScale: 1.0,
        offsetX: 0.0,
        offsetY: 0.0,
        radius: 400,
        slices: 8,
        zoom: 1.2,
        startAutoX: 0,
        startAutoY: 0,
        timer: 100,
        xPlus: 4,
        yPlus: 2,
        timerRef: null,
        canvasID: "canv"
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
        this.domElement.setAttribute("id", this["canvasID"]);
      }
      if (this.context == null) {
        this.context = this.domElement.getContext('2d');
      }
      if (this.image == null) {
        this.image = document.createElement('img');
      }

      document.getElementById('hiveCanvas').appendChild(this.domElement);

    }

    return Kaleidoscope;

  })();

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

  Kaleidoscope.prototype.kaleidoscopeInstance = function (){
    var self = this;

    this.domElement.style.position = 'absolute';
    this.domElement.style.marginLeft = -this.radius + 'px';
    this.domElement.style.marginTop = -this.radius + 'px';
    this.domElement.style.left = '50%';
    this.domElement.style.top = '50%';

    if (this.context == null) {
      var domElem = document.querySelector("#"+this.canvasID);
      this.context = domElem.getContext('2d');
    }    

    dragger = new DragDrop(function(data) {
      return this.image.src = data;
    });

    tx = this.offsetX;
    ty = this.offsetY;
    tr = this.offsetRotation;

    onMouseMoved = (function(_this) {
      return function(event) {

        var cx, cy, dx, dy, hx, hy;
        cx = window.innerWidth / 2;
        cy = window.innerHeight / 2;
        dx = event.pageX / window.innerWidth;
        dy = event.pageY / window.innerHeight;
        hx = dx - 0.5;
        hy = dy - 0.5;
        tx = hx * _this.radius * -2;
        ty = hy * _this.radius * 2;
        startOptionAutoX = event.pageX;
        startOptionAutoY = event.pageY;

        return tr = Math.atan2(hy, hx);
      };
    })(self);

    window.addEventListener('mousemove', onMouseMoved, false);

    var startOptionAutoX = this.startAutoX,
        startOptionAutoY = this.startAutoY;

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
        tx = hx * _this.radius * -2;
        ty = hy * _this.radius * 2;

        startOptionAutoX = startOptionAutoX + _this.xPlus;
        startOptionAutoY = startOptionAutoY + _this.yPlus;

        return tr = Math.atan2(hy, hx);
      };
    })(self);
    this.timerRef = window.setInterval(onTime, this.timer);

    setInterval(function(){
      self.update();
    }, 1000 / 60);
    return;
  };

  Kaleidoscope.prototype.update = function() {
    var self = this;

    options = {
      interactive: true,
      ease: 0.1
    };
    var delta, theta;

    if (options.interactive) {
      delta = tr - self.offsetRotation;
      theta = Math.atan2(Math.sin(delta), Math.cos(delta));
      self.offsetX += (tx - self.offsetX) * options.ease;
      self.offsetY += (ty - self.offsetY) * options.ease;
      self.offsetRotation += (theta - self.offsetRotation) * options.ease;
      self.draw();
    }     
  };

  // Function Generic
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
  
  

  // ==================KALEIDOSCOPE1===============  
  image  = new Image;
  image.onload = (function(_this) {
    return function() {
      return kaleidoscope1.draw();
    };
  })(this);
  image.src = 'img1.png';
  kaleidoscope1 = new Kaleidoscope({
    image: image,
    slices: 8,
    offsetX: 4,
    offsetY: 2
  });
  var k1 = kaleidoscope1.kaleidoscopeInstance();
  

  // ==================KALEIDOSCOPE2===============
  image2 = new Image;
  image2.src = 'img2.png';
  kaleidoscope2 = new Kaleidoscope({
    image: image2,
    slices: 6,
    offsetX: -40,
    offsetY: 20
  });
  kaleidoscope2.kaleidoscopeInstance();
  // var k2 = kaleidoscopeInstance( kaleidoscope2, this );
  // window.addEventListener('mousemove', k2.onMouseMoved, false);
  // kaleidoscope2.timerRef = window.setInterval(k2.onTime, kaleidoscope2.timer);
  // console.log( "kaleidoscope2 = ", kaleidoscope2);
  // console.log( "k2 = ", k2);
  // // ==================KALEIDOSCOPE3===============
  image3 = new Image;
  image3.src = 'img3.png';
  kaleidoscope3 = new Kaleidoscope({
    image: image3,
    slices: 7,
    offsetX: -4,
    offsetY: -20
  });
  kaleidoscope3.kaleidoscopeInstance();

  

  
  

}).call(this);