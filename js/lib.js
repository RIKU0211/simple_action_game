/**
  coding rule
  
  methods -> hogeHoge(), hoge()

  variables -> hoge, hoge_hoge
*/

var Lib = Lib || {};

/**
 * canvas parameters
 */
Lib.Canvas = {
  canvas: null,
  context: null
};

/**
 * constant parameters
 */
Lib.Constant = {
  PI2: Math.PI * 2,
  Gravity: 2.0,
};

/**
 * array utility
 */
Lib.ArrayUtility = {
  shuffle: function(array) {
    var len = array.length;
  
    while(len) {
      var x = Math.floor(Math.random() * len);
      var y = array[--len];
      array[len] = array[x];
      array[x] = y;
    }

    return array;
  },
  removeTargetFromArray: function(array, target) {
    for(var i = 0; i < array.length; i += 1) {
      if(array[i] === target) {
        array.splice(i, 1);
      }
    }
    return array;
  }
};

/**
 * dom utility
 */
Lib.DOMUtility = {
  /**
   * @param [name]   node name
   * @param [div_id] appended object's div id
   * @param [left]   left position(px)
   * @param [top]    top position(px)
   * @param [id]     new node's id
   * @param [src]    image src
   * @return new node
   */
  createNodeById: function(name, div_id, left, top, id, src) {
    var node = document.createElement(name);
    
    if(left) {
      node.style.left = left + "px";
    }

    if(top) {
      node.style.top = top + "px";
    }

    if(id) {
      node.id = id;
    }

    if(src) {
      node.src = src;
    }

    document.getElementById(div_id).appendChild(node);
    
    return node;
  },
  removeNode: function(node) {
    var parent = node.parentNode;

    if(!parent) {
      return false;
    }

    return (node == parent.removeChild(node));
  }
};

/**
 * system utility
 */
Lib.SystemUtiltity = {
  getDeviceName: function() {
    if(navigator.userAgent.indexOf("Android") > 0) {
      return "Android";
    } else if(navigator.userAgent.indexOf("iPhone") > 0) {
      return "iPhone";
    } else if(navigator.userAgent.indexOf("iPad") > 0) {
      return "iPad";
    } else if(navigator.userAgent.indexOf("iPod") > 0) {
      return "iPod";
    }

    return "none";
  },
  getUrlVars: function() {
    var vars = [];
    var hash;
    var hashes = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&");

    for(var i = 0; i < hashes.length; i += 1) {
      hash = hashes[i].split("=");
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }

    return vars;
  }
};

/**
 * math utility
 */
Lib.MathUtility = {
  random: function(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  },
  toRadian: function(deg) {
    return deg * (Math.PI / 180.0);
  },
  toDegree: function(rad) {
    return rad * (180.0 / Math.PI);
  },
  lerp:  function(begin, end, t) {
    t = (t > 1.0) ? 1.0 : (t < 0.0) ? 0.0 : t;

    return begin * (1.0 - t) + end * t;
  },
  clamp: function(n, min, max) {
    return Math.max(min, Math.max(n, max));
  },
  pythagora: function(x1, y1, x2, y2) {
    var a = Math.abs(x1 - x2);
    var b = Math.abs(y1 - y2);
    var c = Math.sqrt((a * a) + (b * b));

    return c;
  },
  /**
   * note that only supports Quadratic Bezier Curve
   */
  bezier: function(begin, end, control_point, t) {
    t = (t >= 1.0) ? 1.0 : t;

    var tt = t * t;
    var ts = (1.0 - t) * (1.0 - t);
    var tm = 2.0 * (1.0 - t);

    var x = (ts * begin.x) + (tm * t * control_point.x) + (tt * end.x);
    var y = (ts * begin.y) + (tm * t * control_point.y) + (tt * end.y);

    return new Lib.Vec2(x, y);
  }
};

/**
 * vector 2d class
 */
Lib.Vec2 = function(x, y) {
  this.x = x || 0;
  this.y = y || 0;
};

Lib.Vec2.prototype = {
  add: function(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  },
  addScalar: function(s) {
    this.x += s;
    this.y += s;
    return this;
  },
  sub: function(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  },
  subScaler: function(s) {
    this.x -= s;
    this.y -= s;
    return this;
  },
  mul: function(v) {
    this.x *= v.x;
    this.y *= v.y;
    return this;
  },
  mulScalar: function(s) {
    this.x *= s;
    this.y *= s;
    return this;
  },
  div: function(v) {
    this.x /= v.x;
    this.y /= v.y;
    return this;
  },
  divScalar: function(s) {
    this.x /= s;
    this.y /= s;
    return this;
  },
  dot: function(v) {
    return (this.x * v.x) + (this.y * v.y);
  },
  length: function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  },
  lengthSq: function() {
    return (this.x * this.x) + (this.y * this.y);
  },
  normalize: function() {
    var len = this.length();
    if(len != 0) {
      return this.divScalar(len);
    }
    return this;
  },
  distance: function(v) {
    var x = v.x - this.x;
    var y = v.y - this.y;
    return new Lib.Vec2(x, y).length();
  },
  direction: function(prev) {
    var x = this.x - prev.x;
    var y = this.y - prev.y;
    return new Lib.Vec2(x, y);
  }
};

/**
 * vector 3d class
 */
Lib.Vec3 = function(x, y, z) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
};

Lib.Vec3.prototype = {
  add: function(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  },
  addScalar: function(s) {
    this.x += s;
    this.y += s;
    this.z += s;
    return this;
  },
  sub: function(v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    return this;
  },
  subScaler: function(s) {
    this.x -= s;
    this.y -= s;
    this.z -= s;
    return this;
  },
  mul: function(v) {
    this.x *= v.x;
    this.y *= v.y;
    this.z *= v.z;
    return this;
  },
  mulScalar: function(s) {
    this.x *= s;
    this.y *= s;
    this.z *= v.z;
    return this;
  },
  mulMat: function(m) {
    var e = m.m;

    return this;
  },
  div: function(v) {
    this.x /= v.x;
    this.y /= v.y;
    this.z /= v.z;
    return this;
  },
  divScalar: function(s) {
    this.x /= s;
    this.y /= s;
    this.z /= s;
    return this;
  },
  length: function() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  },
  lengthSq: function() {
    return (this.x * this.x) + (this.y * this.y) + (this.z * this.z);
  },
  normalize: function() {
    var len = this.length();
    if(len != 0) {
      return this.divScalar(len);
    }
    return this;
  },
  distance: function(v) {
    var x = v.x - this.x;
    var y = v.y - this.y;
    var z = v.z - this.z;
    return new Lib.Vec3(x, y, z).length();
  },
  direction: function(prev) {
    var x = this.x - prev.x;
    var y = this.x - prev.y;
    var z = this.z - prev.z;
    return new Lib.Vec3(x, y, z);
  },
  dot: function(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  },
  cross: function(v) {
    var x = this.y * v.z - this.z * v.y;
    var y = this.z * v.x - this.x * v.z;
    var z = this.x * v.y - this.y * v.x;

    return new Lib.Vec3(x, y, z);
  }
};

/**
 * matrix 4x4 class
 */
Lib.Mat4 = function(m11, m12, m13, m14,
                    m21, m22, m23, m24,
                    m31, m32, m33, m34,
                    m41, m42, m43, m44) {
  this.m = new Float32Array(16);
  this.m[0] = m11 || 1; this.m[4] = m12 || 0; this.m[8]  = m13 || 0; this.m[12] = m14 || 0;
  this.m[1] = m21 || 0; this.m[5] = m22 || 1; this.m[9]  = m23 || 0; this.m[13] = m24 || 0;
  this.m[2] = m31 || 0; this.m[6] = m32 || 0; this.m[10] = m33 || 1; this.m[14] = m34 || 0;
  this.m[3] = m41 || 0; this.m[7] = m42 || 0; this.m[11] = m43 || 0; this.m[15] = m44 || 1;
};

Lib.Mat4.prototype = {
  set: function(m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44) {
    var e = this.m;

    e[0] = m11; e[4] = m12; e[8]  = m13; e[12] = m14;
    e[1] = m21; e[5] = m22; e[9]  = m23; e[13] = m24;
    e[2] = m31; e[6] = m32; e[10] = m33; e[14] = m34;
    e[3] = m41; e[7] = m42; e[11] = m43; e[15] = m44;

    return this;
  },
  identity: function() {
    var e = this.m;

    e[0] = 1; e[4] = 0; e[8]  = 0; e[12] = 0;
    e[1] = 0; e[5] = 1; e[9]  = 0; e[13] = 0;
    e[2] = 0; e[6] = 0; e[10] = 1; e[14] = 0;
    e[3] = 0; e[7] = 0; e[11] = 0; e[15] = 1;

    return this;
  },
  translte: function(v) {
    this.set(
      1, 0, 0, x,
      0, 1, 0, y,
      0, 0, 1, z,
      0, 0, 0, 1
    );

    return this;
  },
  rotateX: function(x) {
    var d = Lib.MathUtility.toRadian(x);
    var c = Math.cos(d);
    var s = Math.sin(d);

    this.set(
      1, 0,  0, 0,
      0, c, -s, 0,
      0, s,  c, 0,
      0, 0,  0, 1
    );

    return this;
  },
  rotateY: function(y) {
    var d = Lib.MathUtility.toRadian(y);
    var c = Math.cos(d);
    var s = Math.sin(d);

    this.set(
       c, 0, s, 0,
       0, 1, 0, 0,
      -s, 0, c, 0,
       0, 0, 0, 1
    );

    return this;
  },
  rotateZ: function(z) {
    var d = Lib.MathUtility.toRadian(z);
    var c = Math.cos(d);
    var s = Math.sin(d);

    this.set(
      c, -s, 0, 0,
      s,  c, 0, 0,
      0,  0, 1, 0,
      0,  0, 0, 1
    );

    return this;
  },
  scale: function(x, y, z) {
    this.set(
      x, 0, 0, 0,
      0, y, 0, 0,
      0, 0, z, 0,
      0, 0, 0, 1
    );

    return this;
  },
  lookAt: function(eye, center, up) {
    eye.sub(center);
    eye.normalize();

    var v = up.cross(e);
    v.normalize();

    var u = e.cross(v);
    u.normalize();

    var e = this.m;

    e[0] = v.x;   e[4] = v.y;   e[8]  = v.z;    e[12] = -eye.dot(v);
    e[1] = u.x;   e[5] = u.y;   e[9]  = u.y;    e[13] = -eye.dot(u);
    e[2] = eye.x; e[6] = eye.y; e[10] = eye.z;  e[14] = -eye.dot(eye);
    e[3] = 0;     e[7] = 0;     e[11] = 0;      e[15] = 1.0;

    return this;
  },
  perspective: function(fov, aspect, near, far) {
    var ymax = near * Math.tan(Lib.MathUtility.toRadian(fov * 0.5));
    var ymin = -ymax;
    var xmax = ymax * aspect;
    var xmin = ymin * aspect;

    return this.frustum(xmin, xmax, ymin, ymax, near, far);
  },
  ortho2d: function(left, right, top, bottom, near, far) {

  },
  frustum: function(left, right, top, bottom, near, far) {
    var e = this.m;
    
    var x = 2 * near / (right - left);
    var y = 2 * near / (top - bottom);

    var a = (right + left) / (right - left);
    var b = (top + bottom) / (top - bottom);
    var c = -(far + near) / (far - near);
    var d = -2 * far * near / (far - near);

    e[0] = x; e[4] = 0; e[8]  =  a; e[12] = 0;
    e[1] = 0; e[5] = y; e[9]  =  b; e[13] = 0;
    e[2] = 0; e[6] = 0; e[10] =  c; e[14] = d;
    e[3] = 0; e[7] = 0; e[11] = -1; e[15] = 0;

    return this;
  },
  transpose: function() {
    var e = this.m;
    var trans;

    trans = e[1];  e[1]  = e[4];  e[4]  = trans;
    trans = e[2];  e[2]  = e[8];  e[8]  = trans;
    trans = e[3];  e[3]  = e[12]; e[12] = trans;
    trans = e[6];  e[6]  = e[9];  e[9]  = trans;
    trans = e[7];  e[7]  = e[13]; e[13] = trans;
    trans = e[11]; e[11] = e[14]; e[14] = trans;

    return this;
  },
  mul: function(m) {

  },
  mulScalar: function(s) {
    var e = this.m;

    e[0] *= s; e[4] *= s; e[8]  *= s; e[12] *= s;
    e[1] *= s; e[5] *= s; e[9]  *= s; e[13] *= s;
    e[2] *= s; e[6] *= s; e[10] *= s; e[14] *= s;
    e[3] *= s; e[7] *= s; e[11] *= s; e[15] *= s;

    return this;
  },
  mulVec: function(v) {
    v.mulMat(this);
  }
};

/**
 * circle class
 */
Lib.Circle = function(center, radius) {
  this.center = center;
  this.radius = radius;
  this.velocity = new Lib.Vec2(0, 0);
  this.color = "rgb(255, 0, 0)";
  this.radius_2 = radius * radius;
};

Lib.Circle.prototype = {
  draw: function(context) {
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.center.x, this.center.y, this.radius, Lib.Constant.PI2, false);
    context.fill();
  },
  collisionCircle: function(c, isResponse) {
    var dx = this.center.x - c.center.x;
    var dy = this.center.y - c.center.y;
    var dr = this.radius + c.radius;

    if(dx * dx + dy * dy <= dr * dr === false) {
      return false;
    }

    if(!(isResponse || false)) {
      return true;
    }

    var len = Math.sqrt(dx * dx + dy * dy);
    var dist = dr - len;
    if(dist > 0) {
      len = 1 / len;
    }
    dx *= len;
    dy *= len;

    dist /= 2.0;

    this.center.x += dx * dist;
    this.center.y += dy * dist;

    return true;
  },
  collisionLine: function(l, isResponse) {
    var center_len = new Lib.Vec2(this.center.x - l.begin.x, this.center.y - l.begin.y);
    var line_len = new Lib.Vec2(l.end.x - l.begin.x, l.end.y - l.begin.y);

    var len = line_len.length();
    if(len <= 0.0) {
      return false;
    }

    isResponse = (isResponse || false);

    var dot = line_len.dot(center_len);
    if(dot < 0) {
      if(l.begin.distance(this.center) < this.radius) {
        if(isResponse) {
          this.center.x += -1.0 * this.velocity.x;
          this.center.y += -1.0 * this.velocity.y;
        }
        return true;
      }
      return false;
    }

    var dot_ = line_len.dot(line_len);
    if(dot > dot_) {
      var distance = Math.pow(l.end.distance(this.center), 2);
      if(distance < this.radius_2) {
        if(isResponse) {
          this.center.x += -1.0 * this.velocity.x;
          this.center.y += -1.0 * this.velocity.y;
        }
        return true;
      }
      return false;
    }

    var dot__ = center_len.dot(center_len);
    if(dot__ - (dot / dot_) * dot < this.radius_2) {
      if(isResponse) {
          this.center.x += -1.0 * this.velocity.x;
          this.center.y += -1.0 * this.velocity.y;
      }
      return true;
    }
    return false;
  },
  collisionRect: function(r, isResponse) {
    var x = this.center.x;
    var y = this.center.y;
    var v_x = 1;
    var v_y = 1;
    var distance = 0;

    if(x < r.x) {
      distance += (r.x - x) * (r.x - x);
      v_x = -1;
    }

    if(x > r.x + r.w) {
      distance += (x - r.x - r.w) * (x - r.x - r.w);
    }

    if(y < r.y) {
      distance += (r.y - y) * (r.y - y);
      v_y = -1;
    }

    if(y > r.y + r.h) {
      distance += (y - r.y - r.h) * (y - r.y - r.h);
    }

    if(distance < this.radius * this.radius) {
      isResponse = (isResponse || false);
      if(!isResponse) {
        return true;
      }

      var len = Math.sqrt(distance);
      var dist = this.radius * this.radius - len;
      if(dist > 0) {
        len = 1 / len;
      }

      v_x *= len;
      v_y *= len;

      dist /= 2.0;

      this.center.x += v_x * dist * 0.35;
      this.center.y += v_y * dist * 0.35;
      return true;
    }

    return false;
  },
  collisionPoint: function(v) {
    var dx = this.center.x - v.x;
    var dy = this.center.y - v.y;

    if(dx * dx + dy * dy < this.radius * this.radius) {
      return true;
    }
    return false;
  }
};

/**
 * sphere class
 */
Lib.Sphere = function(center, radius) {
  this.center = center;
  this.radius = radius;
  this.color = "rgba(255, 0, 0, 0.5)";
};

Lib.Sphere.prototype = {
  draw: function(context) {

  },
  collisionSphere: function(c, isResponse) {
    var dx = c.center.x - this.center.x;
    var dy = c.center.y - this.center.y;
    var dz = c.center.z - this.center.z;
    var dr = c.radius + this.radius;

    if(dx * dx + dy * dy + dz * dz <= dr * dr) {
      return true;
    }
    return false;
  },
  collisionLine: function(l, isResponse) {
  }
};

/**
 * line class
 */
Lib.Line = function(begin, end) {
  this.begin = begin;
  this.end = end;
  this.color = "rgb(255, 255, 255)";
};

Lib.Line.prototype = {
  draw: function(context) {
    context.beginPath();
    context.strokeStyle = this.color;
    context.moveTo(this.begin.x, this.begin.y);
    context.lineTo(this.end.x, this.end.y);
    context.closePath();
    context.stroke();
  },
  collisionCircle: function(c, isResponse) {
    return c.collisionLine(this, isResponse);
  }
};

/**
 * ray class
 */
Lib.Ray = function(origin, dir) {
  this.origin = origin;
  this.dir = dir;
  this.color = "rgb(0, 0, 255)";
};

Lib.Ray.prototype = {
  draw: function(context) {
    var dir = this.begin.direction(this.end);

    context.beginPath();
    context.strokeStyle = this.color;
    context.moveTo(this.begin.x, this.begin.y);
    context.lineTo(this.end.x * dir * 100.0, this.end.y * dir * 100.0);
    context.closePath();
    context.stroke();
  }
};

/**
 * rect class
 */
Lib.Rect = function(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.vx = 0;
  this.vy = 0;
  this.intersect_x = 0;
  this.intersect_y = 0;
  this.angle = 0;
  this.color = "rgb(0, 255, 0)";
};

Lib.Rect.prototype = {
  draw: function(context) {
    context.beginPath();
    context.save();
    context.rotate(this.angle);
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.w, this.h);
    context.restore();
  },
  collisionRect: function(r, isResponse) {
    if(this.x + this.w < r.x) {
      return false;
    } else if(this.y + this.h < r.y) {
      return false;
    } else if(this.x > r.x + r.w) {
      return false;
    } else if(this.y > r.y + r.h) {
      return false;
    }

    this.x += (-1.0 * this.vx) * 0.55;
    this.y += (-1.0 * this.vy) * 0.55;

    return true;
  },
  collisionLine: function(l, isResponse) {

  },
  collisionCircle: function(c, isResponse) {
    return c.collisionRect(this, isResponse);
  }
};

/**
 * shape fusion class
 */
Lib.Fusion = new function() {
  this.components = [];
};

/**
 * physics action utility class
 */
Lib.ActionUtility = {
  jumpToVertical: function(y, t, h) {
    h = (h || 5.0);

    y -= (Math.sqrt(2.0 * Lib.Constant.Gravity * h) * t - 0.5 * Lib.Constant.Gravity * t * t);
    return y;
  },
  jumpToDir: function(x, y, t, h) {

  },
  reflect: function(y, t, h, e, n) {
    for(var i = 0; i < n; i += 1) {
      h *= e;
    }

    return this.jumpToVertical(y, t + h * 0.5, h);
  }
};

/**
 * sprite class
 * @param [path]  image path
 * @param [src_w] image source width
 * @param [src_h] image source height
 * @param [cut_w] cutting image width size
 * @param [cut_h] cutting image height size
 */
Lib.Sprite = function(path, src_w, src_h, cut_w, cut_h) {
  this.image = new Image();
  this.image.src = path;
  this.x = 0;
  this.y = 0;
  this.w = cut_w || 64;
  this.h = cut_h || 64;
  this.src_w = src_w || this.w;
  this.src_h = src_h || this.h;
  this.center_x = this.src_w / 2;
  this.center_y = this.src_h / 2;
  this.rotation = 0;
  this.scale_x = 1.0;
  this.scale_y = 1.0;
  this.timer = 0;
  this.next_sprite_time = 30;
  this.v_counter = 0;
  this.h_counter = 0;
  this.sequence_counter = 0;
};

Lib.Sprite.prototype = {
  /**
   * draw origin srprite
   */
  draw: function(context) {
    context.save();

    context.translate(this.center_x + this.x, this.center_y + this.y);
    context.rotate(this.rotation);
    context.translate(-this.center_x - this.x, -this.center_y - this.y);
    context.scale(this.scale_x, this.scale_y);

    context.drawImage(
      this.image, 
      this.x,
      this.y
    );

    context.restore();
  },
  /**
   * draw appointed index of sprite
   */
  drawIndex: function(context, index_x, index_y) {
    context.save();

    context.translate(this.w / 2 + this.x, this.h / 2 + this.y);
    context.rotate(this.rotation);
    context.translate(-this.w / 2 - this.x, -this.h / 2 - this.y);

    context.drawImage(
      this.image,
      this.w * (index_x || 0),
      this.h * (index_y || 0),
      this.w,
      this.h,
      this.x,
      this.y,
      this.w,
      this.h
    );

    context.restore();
  },
  /**
   * animate to horizontal direction
   * [example sequence]
   * 1 2 3 4 5 6 7 8
   */
  animation: function(context, line_number) {
    this.timer += 1;
    if(this.timer % this.next_sprite_time == 0) {
      this.h_counter += 1;
      this.h_counter = this.h_counter == (this.src_w / this.w) ? 0 : this.h_counter;
      this.timer = 0;
    }

    context.save();

    context.translate(this.w / 2 + this.x, this.h / 2 + this.y);
    context.rotate(this.rotation);
    context.translate(-this.w / 2 - this.x, -this.h / 2 - this.y);

    context.drawImage(
      this.image,                  // image object
      this.w * this.h_counter,     // source x
      this.h * (line_number || 0), // source y
      this.w,                      // source w
      this.h,                      // source h
      this.x,                      // destination from canvas x
      this.y,                      // destination from canvas y
      this.w,                      // destination w
      this.h                       // destination h
    );

    context.restore();
  },
  /**
   * animate to horizontal and vertival direction
   * [example sequence]
   * 1 2 3 4
   * 5 6 7 8
   */
  animationAll: function(context) {
    this.timer += 1;
    if(this.timer % this.next_sprite_time == 0) {
      this.h_counter += 1;
      if(this.h_counter == (this.src_w / this.w)) {
        this.h_counter = 0;
        this.v_counter += 1;
        this.v_counter = this.v_counter == (this.src_h / this.h) ? 0 : this.v_counter;
      }
      this.timer = 0;
    }

    context.save();

    context.translate(this.w / 2 + this.x, this.h / 2 + this.y);
    context.rotate(this.rotation);
    context.translate(-this.w / 2 - this.x, -this.h / 2 - this.y);

    context.drawImage(
      this.image,
      this.w * this.h_counter,
      this.h * this.v_counter,
      this.w,
      this.h,
      this.x,
      this.y,
      this.w,
      this.h
    );

    context.restore();
  },
  /**
   * animate to sequence container
   * [example sequence]
   * @param ary -> [0, 2, 1, 5, 4, 1]
   * 0 2 1 5 4 1
   * NOTE: only 1 line textures
   */
  animationSequence: function(context, sequence) {
    this.timer += 1;
    if(this.timer % this.next_sprite_time == 0) {
      this.sequence_counter += 1;
      this.sequence_counter = (this.sequence_counter == sequence.length) ? 0 : this.sequence_counter;
      this.timer = 0;
    }

    this.drawIndex(context, sequence[this.sequence_counter]);
  },
  /**
   * animate "freely" to sequence container
   * @param line_number -> 1
   * @param ary -> [0, 1, 2, 1]
   */
  animationFree: function(context, line_number, sequence) {
    this.timer += 1;
    if(this.timer % this.next_sprite_time == 0) {
      this.sequence_counter += 1;
      this.sequence_counter = (this.sequence_counter == sequence.length) ? 0 : this.sequence_counter;
      this.timer = 0;
    }

    this.drawIndex(context, sequence[this.sequence_counter], line_number);
  }
};

/**
 * particle system model
 */
Lib.ParticleSystem = {
  getRGBAFormat: function() {
    var r = Lib.MathUtility.random(0, 255);
    var g = Lib.MathUtility.random(0, 255);
    var b = Lib.MathUtility.random(0, 255);

    return "rgba(" + r + "," + g + "," + b + ",";
  }
};

/**
 * simple particle class
 */
Lib.ParticleSystem.Particle = function(x, y, size, speed, dir, variance) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.speed = speed;
  this.dir = dir;
  this.color = this.getRGBAFormat();
  this.transparent = Lib.MathUtility.random(0.8, 1.0);
  this.variance = Lib.MathUtility.random(0, 36 * variance) || 0;
  this.texture = null;
};

Lib.ParticleSystem.Particle.prototype = {
  update: function() {
    this.x += Math.cos(MathUtility.toRadian(this.dir)) * this.speed;
    this.y += Math.sin(MathUtility.toRadian(this.dir)) * this.speed;

    this.size -= 0.1;
    this.size = Math.max(0, this.size);

    this.transparent -= 0.008;
  },
  draw: function(context) {
    context.beginPath();
    context.fillStyle = this.color + this.transparent + ")";
    context.arc(this.x, this.y, this.size, Lib.Constant.PI2, false);
    context.fill();
  }
};

/**
 * trail particle class
 */
Lib.ParticleSystem.TrailParticle = function(x, y) {
  this.x = x;
  this.y = y;
  this.prev_x = 0;
  this.prev_y = 0;
  this.size = 15;
  this.speed = 5;
  this.color = this.getRGBAFormat();
  this.transparent = MathUtility.random(0.8, 1.0);
};

Lib.ParticleSystem.TrailParticle.prototype = {
  update: function(mouse_x, mouse_y) {
    this.prev_x = this.x;
    this.prev_y = this.y;

    this.x += (mouse_x - this.x) * 0.02;
    this.y += (mouse_y - this.y) * 0.02;

    this.transparent -= 0.008;
  },
  draw: function(context) {
    context.beginPath();
    context.fillStyle = this.color + this.transparent + ")";
    context.moveTo(this.prev_x, this.prev_y);
    context.arc(this.x, this.y, this.size / 2, Math.PI * 2, false);
    context.fill();
  }
};

/**
 * fireworks particle class
 */
Lib.ParticleSystem.Fireworks = function() {

};

/**
 * font class
 */
Lib.Font = {
  /**
   * draw font
   * [align example]
   * start, end, left, right, center
   */
  draw: function(context, text, x, y, size, align, color) {
    context.font = (size || 24) + "pt Times New Roman";
    context.fillStyle = (color || "blue");
    context.textAlign = (align || "start");
    context.fillText(text, x, y);
  }
};

/**
 * input manager
 */
Lib.InputManager = (function() {
  var instance;

  function _constructor() {
    // private variables
    var key_container = {
      "UP": 38, "DOWN": 40, "LEFT": 37, "RIGHT": 39,
      "A": 65, "B": 66, "C": 67, "D": 68, "E": 69, "F": 70, "G": 71,
      "H": 72, "I": 73, "J": 74, "K": 75, "L": 76, "M": 77, "N": 78,
      "O": 79, "P": 80, "Q": 81, "R": 82, "S": 83, "T": 84, "U": 85,
      "V": 86, "W": 87, "X": 88, "Y": 89, "Z": 90,
      "0": 48, "1": 49, "2": 50, "3": 51, "4": 52,
      "5": 53, "6": 54, "7": 55, "8": 56, "9": 57,
      "ENTER": 13, "BACK": 8, "SPACE": 32,
    };

    return {
      getKey: function(code) {
        return key_container[code];
      }
    };
  };

  return {
    getInstance: function() {
      if(!instance) {
        instance = _constructor();
      }

      return instance;
    }
  };
}());

/**
 * audio manager
 */
Lib.AudioManager = (function() {
  var instance;

  function _constructor() {
    // private variables
    var container = {};

    // public methods and variables
    return {
      add: function(path, name) {
        container[name] = new Audio();
        container[name].autoplay = false;
        container[name].src = path;
      },
      play: function(name) {
        container[name].play();
      },
      stop: function(name) {
        container[name].pause();
        container[name].currentTime = 0;
      },
      pause: function(name) {
        container[name].pause();
      },
      setLoop: function(name, is_loop) {
        container[name].loop = is_loop;
      }
    };
  };

  return {
    getInstance: function() {
      if(!instance) {
        instance = _constructor();
      }

      return instance;
    }
  };
}());

/**
 * game object class
 */
Lib.GameObject = function() {
  this.sprite = null;
};

/**
 * game initializer
 */
Lib.Initializer = null;

/**
 * scene
 */
Lib.Scene = function() {
  this.canvas = null;
  this.context = null;
};

Lib.Scene.prototype = {
  update: function() {

  },
  draw: function() {

  }
};

/**
 * scene manager
 */
Lib.SceneManager = function() {
  this.container = [];
};

Lib.SceneManager.prototype = {
  push: function(scene) {
    this.container.push(scene);
  },
  pop: function() {
    var scene = this.container.pop();
  },
  initialize: function() {

  },
  update: function() {

  }
};

/**
 * paint soft
 */
Lib.PaintSoft = function() {

};

// ------------------------------ pseudo 3d system ------------------------------

/**
 * world
 */
Lib.World = {
  vertices: [
    {x:  100, y:  100, z: 300},
    {x: -100, y:  100, z: 300},
    {x: -100, y: -100, z: 300},
    {x:  100, y: -100, z: 300},
    {x:  100, y:  100, z: 100},
    {x: -100, y:  100, z: 100},
    {x: -100, y: -100, z: 100},
    {x:  100, y: -100, z: 100} 
  ],
  lines: [
    {p1: 0, p2: 1},
    {p1: 1, p2: 2},
    {p1: 2, p2: 3},
    {p1: 3, p2: 0},
    
    {p1: 4, p2: 5},
    {p1: 5, p2: 6},
    {p1: 6, p2: 7},
    {p1: 7, p2: 4},
    
    
    {p1: 0, p2: 4},
    {p1: 1, p2: 5},
    {p1: 2, p2: 6},
    {p1: 3, p2: 7},
  ]
};

/**
 * camera
 */
Lib.Camera = {
  screen: null,
  x: 0,
  y: 0,
  z: 0,
  depth: 100,
  width: 500,
  height: 500,
  offset_x: 250,
  offset_y: 250,
  draw: function(world) {
    for(var i = 0; i < world.vertices.length; i += 1) {
      var vertex = world.vertices[i];

      var dx = vertex.x - this.x;
      var dy = vertex.y - this.y;
      var dz = vertex.z - this.z;

      if(dz > 0) {
        var s = this.depth / dz;
        var x = s * dx + this.offset_x;
        var y = s * dy + this.offset_y;
        var size = s * 10;
        var half = size * 0.5;

        this.screen.fillRect(x - half, y - half, size, size);
      }
    }
  },
  drawSprite3D: function(world, sprite) {

  }
};

/**
 * 3d sprite
 */
Lib.Sprite3D = function(path, x, y, src_w, src_h) {
  this.img = new Image();
  this.img.src = path;
  this.x = x;
  this.y = y;
  this.w = src_w;
  this.h = src_h;
};