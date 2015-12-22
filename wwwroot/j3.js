(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/// <reference path="bundle.ts" />
require("./Init").Init();

},{"./Init":225}],2:[function(require,module,exports){
var AssociativeArray = (function () {
    function AssociativeArray() {
        this.target = new Map();
    }
    AssociativeArray.prototype.clear = function () {
        this.target.clear();
    };
    AssociativeArray.prototype.delete = function (key) {
        return this.target.delete(key);
    };
    AssociativeArray.prototype.forEach = function (callbackfn, thisArg) {
        this.target.forEach(callbackfn, thisArg);
    };
    AssociativeArray.prototype.get = function (key) {
        return this.target.get(key);
    };
    AssociativeArray.prototype.has = function (key) {
        return this.target.has(key);
    };
    AssociativeArray.prototype.set = function (key, value) {
        this.target.set(key, value);
        return this;
    };
    Object.defineProperty(AssociativeArray.prototype, "size", {
        get: function () {
            return this.target.size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssociativeArray.prototype, "asArray", {
        get: function () {
            var array = new Array(this.size);
            var i = 0;
            this.forEach(function (v) {
                array[i] = v;
                i++;
            });
            return array;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssociativeArray.prototype, "length", {
        get: function () {
            return this.target.size;
        },
        enumerable: true,
        configurable: true
    });
    return AssociativeArray;
})();
module.exports = AssociativeArray;

},{}],3:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JThreeObject = require("../JThreeObject");
var Vector3 = require("../../Math/Vector3");
var Color4 = require("./Color4");
var Vector4 = require("../../Math/Vector4");
var Color3 = (function (_super) {
    __extends(Color3, _super);
    function Color3(r, g, b) {
        _super.call(this);
        this._r = r;
        this._g = g;
        this._b = b;
    }
    Object.defineProperty(Color3.prototype, "R", {
        get: function () {
            return this._r;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color3.prototype, "G", {
        get: function () {
            return this._g;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color3.prototype, "B", {
        get: function () {
            return this._b;
        },
        enumerable: true,
        configurable: true
    });
    Color3.FromColor4 = function (col) {
        return new Color3(col.R, col.G, col.B);
    };
    Color3.prototype.toVector = function () {
        return new Vector3(this.R, this.G, this.B);
    };
    Color3.prototype.toVector4 = function (a) {
        if (typeof a === "undefined")
            a = 0;
        return new Vector4(this.R, this.G, this.B, a);
    };
    Color3.internalParse = function (color, isFirst) {
        if (isFirst && Color4.colorTable[color]) {
            var col = Color4.internalParse(Color4.colorTable[color], false);
            return Color3.FromColor4(col);
        }
        if (isFirst) {
            var m = color.match(/^#([0-9a-f]{3})$/i);
            if (m) {
                var s = m[1];
                return new Color3(parseInt(s.charAt(0), 16) / 0xf, parseInt(s.charAt(1), 16) / 0xf, parseInt(s.charAt(2), 16) / 0xf);
            }
        }
        m = color.match(/^#([0-9a-f]{6})$/i);
        if (m) {
            var s = m[1];
            return new Color3(parseInt(s.substr(0, 2), 16) / 0xff, parseInt(s.substr(2, 2), 16) / 0xff, parseInt(s.substr(4, 2), 16) / 0xff);
        }
        var n = color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
        if (n && isFirst) {
            return new Color3(parseInt(n[1]) / 0xff, parseInt(n[2]) / 0xff, parseInt(n[3]) / 0xff);
        }
        throw new Error("color parse failed.");
    };
    Color3.parseColor = function (color) {
        return Color3.internalParse(color, true);
    };
    Color3.prototype.toString = function () {
        var st = "#";
        st += Math.round(this.R * 0xff).toString(16).toUpperCase();
        st += Math.round(this.G * 0xff).toString(16).toUpperCase();
        st += Math.round(this.B * 0xff).toString(16).toUpperCase();
        return "Color3(" + this.R + "," + this.G + "," + this.B + "," + st + ")";
    };
    Color3.colorTable = require("../../static/color.json");
    return Color3;
})(JThreeObject);
module.exports = Color3;

},{"../../Math/Vector3":235,"../../Math/Vector4":236,"../../static/color.json":297,"../JThreeObject":9,"./Color4":4}],4:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JThreeObject = require("../JThreeObject");
var Vector4 = require("../../Math/Vector4");
var Color4 = (function (_super) {
    __extends(Color4, _super);
    function Color4(r, g, b, a) {
        _super.call(this);
        this._a = a;
        this._r = r;
        this._g = g;
        this._b = b;
    }
    Object.defineProperty(Color4.prototype, "A", {
        get: function () {
            return this._a;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color4.prototype, "R", {
        get: function () {
            return this._r;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color4.prototype, "G", {
        get: function () {
            return this._g;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color4.prototype, "B", {
        get: function () {
            return this._b;
        },
        enumerable: true,
        configurable: true
    });
    Color4.prototype.toVector = function () {
        return new Vector4(this.R, this.G, this.B, this.A);
    };
    Color4.internalParse = function (color, isFirst) {
        if (isFirst && Color4.colorTable[color]) {
            return Color4.internalParse(Color4.colorTable[color], false);
        }
        if (isFirst) {
            var m = color.match(/^#([0-9a-f]{3})$/i);
            if (m) {
                var s = m[1];
                return new Color4(parseInt(s.charAt(0), 16) / 0xf, parseInt(s.charAt(1), 16) / 0xf, parseInt(s.charAt(2), 16) / 0xf, 1);
            }
        }
        if (isFirst) {
            m = color.match(/^#([0-9a-f]{3})$/i);
            if (m) {
                var s = m[1];
                return new Color4(parseInt(s.charAt(0), 16) / 0xf, parseInt(s.charAt(1), 16) / 0xf, parseInt(s.charAt(2), 16) / 0xf, parseInt(s.charAt(3), 16) / 0xf);
            }
        }
        m = color.match(/^#([0-9a-f]{6})$/i);
        if (m) {
            var s = m[1];
            return new Color4(parseInt(s.substr(0, 2), 16) / 0xff, parseInt(s.substr(2, 2), 16) / 0xff, parseInt(s.substr(4, 2), 16) / 0xff, 1);
        }
        if (isFirst) {
            m = color.match(/^#([0-9a-f]{8})$/i);
            if (m) {
                var s = m[1];
                return new Color4(parseInt(s.substr(0, 2), 16) / 0xff, parseInt(s.substr(2, 2), 16) / 0xff, parseInt(s.substr(4, 2), 16) / 0xff, parseInt(s.substr(6, 2), 16) / 0xff);
            }
        }
        var n = color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
        if (n && isFirst) {
            return new Color4(parseInt(n[1]) / 0xff, parseInt(n[2]) / 0xff, parseInt(n[3]) / 0xff, 1);
        }
        var n = color.match(/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\,\s*(\d+)\s*\)$/i);
        if (n && isFirst) {
            var d = parseInt(n[4]);
            d = d <= 1 ? d : d / 0xff;
            return new Color4(parseInt(n[1]) / 0xff, parseInt(n[2]) / 0xff, parseInt(n[3]) / 0xff, parseInt(n[4]));
        }
        throw new Error("color parse failed.");
    };
    Color4.parseColor = function (color) {
        return Color4.internalParse(color, true);
    };
    Color4.prototype.toString = function () {
        var st = "#";
        st += Math.round(this.R * 0xff).toString(16).toUpperCase();
        st += Math.round(this.G * 0xff).toString(16).toUpperCase();
        st += Math.round(this.B * 0xff).toString(16).toUpperCase();
        st += Math.round(this.A * 0xff).toString(16).toUpperCase();
        return "Color4(" + this.R + ", " + this.G + ", " + this.B + "," + this.A + "," + st + ")";
    };
    Color4.colorTable = require("../../static/color.json");
    return Color4;
})(JThreeObject);
module.exports = Color4;

},{"../../Math/Vector4":236,"../../static/color.json":297,"../JThreeObject":9}],5:[function(require,module,exports){
var AssociativeArray = require('./Collections/AssociativeArray');
var JThreeCollection = (function () {
    function JThreeCollection() {
        this._collection = new AssociativeArray();
    }
    JThreeCollection.prototype.getById = function (id) {
        return this._collection.get(id);
    };
    JThreeCollection.prototype.isContained = function (item) {
        return this._collection.has(item.ID);
    };
    JThreeCollection.prototype.insert = function (item) {
        if (this._collection.has(item.ID)) {
            return false;
        }
        else {
            this._collection.set(item.ID, item);
            return true;
        }
    };
    JThreeCollection.prototype.del = function (item) {
        if (this._collection.has(item.ID)) {
            this._collection.delete(item.ID);
            return true;
        }
        else
            return false;
    };
    JThreeCollection.prototype.each = function (act) {
        var _this = this;
        this._collection.forEach(function (a, b) { return act(a, b, _this); });
    };
    JThreeCollection.prototype.asArray = function () {
        return this._collection.asArray;
    };
    Object.defineProperty(JThreeCollection.prototype, "length", {
        get: function () {
            return this._collection.length;
        },
        enumerable: true,
        configurable: true
    });
    return JThreeCollection;
})();
module.exports = JThreeCollection;

},{"./Collections/AssociativeArray":2}],6:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JThreeObject = require("./JThreeObject");
var Exceptions = require("../Exceptions");
var JThreeEvent = (function (_super) {
    __extends(JThreeEvent, _super);
    function JThreeEvent() {
        _super.apply(this, arguments);
        this._eventHandlers = [];
    }
    JThreeEvent.prototype.fire = function (object, eventArg) {
        this._eventHandlers.forEach(function (h) { return h(object, eventArg); });
    };
    JThreeEvent.prototype.addListener = function (handler) {
        if (typeof handler === "undefined")
            throw new Exceptions.InvalidArgumentException("you can not add undefined as event handler");
        this._eventHandlers.push(handler);
    };
    JThreeEvent.prototype.removeListener = function (handler) {
        for (var i = 0; i < this._eventHandlers.length; i++) {
            var val = this._eventHandlers[i];
            if (val === handler) {
                this._eventHandlers.splice(i, 1);
                break;
            }
        }
    };
    return JThreeEvent;
})(JThreeObject);
module.exports = JThreeEvent;

},{"../Exceptions":141,"./JThreeObject":9}],7:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JThreeObject = require("./JThreeObject");
var JThreeID = (function (_super) {
    __extends(JThreeID, _super);
    function JThreeID() {
        _super.apply(this, arguments);
    }
    JThreeID.getUniqueRandom = function (length) {
        var random = "";
        for (var i = 0; i < length; i++) {
            random += JThreeID._randomChars.charAt(Math.random() * JThreeID._randomChars.length);
        }
        return random;
    };
    JThreeID._randomChars = "abcdefghijklmnopqrstuvwxyzABCDEFHIJKLMNOPQRSTUVWXYZ1234567890-";
    return JThreeID;
})(JThreeObject);
module.exports = JThreeID;

},{"./JThreeObject":9}],8:[function(require,module,exports){
var JThreeLogger = (function () {
    function JThreeLogger() {
    }
    JThreeLogger.sectionLog = function (sectionName, log) {
        console.log.apply(console, JThreeLogger.sectionLogParams(sectionName, log));
    };
    JThreeLogger.sectionWarn = function (sectionName, log) {
        console.warn.apply(console, JThreeLogger.sectionLogParams(sectionName, log));
    };
    JThreeLogger.sectionError = function (sectionName, log) {
        console.error.apply(console, JThreeLogger.sectionLogParams(sectionName, log));
    };
    JThreeLogger.sectionInfo = function (sectionName, log) {
        console.info.apply(console, JThreeLogger.sectionLogParams(sectionName, log));
    };
    JThreeLogger.sectionLongLog = function (sectionName, log) {
        var params = JThreeLogger.sectionLogParams(sectionName, "");
        var logLines = log.split('\n');
        var entireLog = "\n";
        for (var i = 0; i < logLines.length; i++) {
            var line = "%c " + (i + 1) + " %c\u25B6%c " + logLines[i] + "\n";
            params.push("background-color:#344F66;color:white;", "color:#344F66;", "");
            entireLog += line;
        }
        params[0] += entireLog;
        console.log.apply(console, params);
    };
    JThreeLogger.sectionLogParams = function (sectionName, log) {
        return ["%c jThree v3 %c▶ " + sectionName + " %c▶%c " + log, "background-color:#344F66;color:white;", "color:#344F66;background-color:#D1D4D7;", "color:#D1D4D7;", ""];
    };
    return JThreeLogger;
})();
module.exports = JThreeLogger;

},{}],9:[function(require,module,exports){
var JsHack = require("./JsHack");
var JThreeObject = (function () {
    function JThreeObject() {
    }
    JThreeObject.prototype.toString = function () {
        return JsHack.getObjectName(this);
    };
    JThreeObject.prototype.getTypeName = function () {
        return JsHack.getObjectName(this);
    };
    return JThreeObject;
})();
module.exports = JThreeObject;

},{"./JsHack":11}],10:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JThreeObject = require("./JThreeObject");
var JThreeID = require("./JThreeID");
var JThreeObjectWithID = (function (_super) {
    __extends(JThreeObjectWithID, _super);
    function JThreeObjectWithID(id) {
        _super.call(this);
        this._id = id || JThreeID.getUniqueRandom(10);
    }
    Object.defineProperty(JThreeObjectWithID.prototype, "ID", {
        get: function () {
            return this._id;
        },
        set: function (id) {
            this._id = id;
        },
        enumerable: true,
        configurable: true
    });
    return JThreeObjectWithID;
})(JThreeObject);
module.exports = JThreeObjectWithID;

},{"./JThreeID":7,"./JThreeObject":9}],11:[function(require,module,exports){
var JsHack = (function () {
    function JsHack() {
    }
    JsHack.getObjectName = function (obj) {
        var funcNameRegex = /function (.{1,})\(/;
        var result = (funcNameRegex).exec((obj).constructor.toString());
        return (result && result.length > 1) ? result[1] : "";
    };
    return JsHack;
})();
module.exports = JsHack;

},{}],12:[function(require,module,exports){
var ContextComponents = (function () {
    function ContextComponents() {
    }
    Object.defineProperty(ContextComponents, "SceneManager", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextComponents, "CanvasManager", {
        get: function () {
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextComponents, "ResourceManager", {
        get: function () {
            return 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextComponents, "NodeManager", {
        get: function () {
            return 3;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextComponents, "LoopManager", {
        get: function () {
            return 4;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextComponents, "Timer", {
        get: function () {
            return 5;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextComponents, "Debugger", {
        get: function () {
            return 6;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextComponents, "ResourceLoader", {
        get: function () {
            return 7;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextComponents, "MaterialManager", {
        get: function () {
            return 8;
        },
        enumerable: true,
        configurable: true
    });
    return ContextComponents;
})();
module.exports = ContextComponents;

},{}],13:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SceneObject = require("../SceneObject");
var Matrix = require("../../Math/Matrix");
var glm = require("gl-matrix");
var PointList = require("../../Math/PointList");
var Camera = (function (_super) {
    __extends(Camera, _super);
    function Camera() {
        _super.apply(this, arguments);
        this.viewProjectionMatrix = new Matrix();
        this.viewProjectionInvMatrix = new Matrix();
        this.frustumPoints = new PointList();
        this.viewMatrix = new Matrix();
        this.projectionMatrix = new Matrix();
    }
    Camera.prototype.__updateViewProjectionMatrix = function () {
        glm.mat4.mul(this.viewProjectionMatrix.rawElements, this.projectionMatrix.rawElements, this.viewMatrix.rawElements);
        glm.mat4.invert(this.viewProjectionInvMatrix.rawElements, this.viewProjectionMatrix.rawElements);
        PointList.initializeWithCube(this.frustumPoints);
        this.frustumPoints.transform(this.viewProjectionInvMatrix);
    };
    Camera.prototype.update = function () {
        _super.prototype.update.call(this);
    };
    Camera.prototype.onParentSceneChanged = function () {
        this.ParentScene.addCamera(this);
    };
    return Camera;
})(SceneObject);
module.exports = Camera;

},{"../../Math/Matrix":229,"../../Math/PointList":231,"../SceneObject":108,"gl-matrix":299}],14:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ViewCamera = require("./ViewCameraBase");
var glm = require("gl-matrix");
var OrthoCamera = (function (_super) {
    __extends(OrthoCamera, _super);
    function OrthoCamera() {
        _super.call(this);
        this._updateProjectionMatrix();
    }
    OrthoCamera.prototype._updateProjectionMatrix = function () {
        glm.mat4.ortho(this.projectionMatrix.rawElements, this.Left, this.Right, this.Bottom, this.Top, this.Near, this.Far);
        this.__updateViewProjectionMatrix();
    };
    Object.defineProperty(OrthoCamera.prototype, "Left", {
        get: function () {
            return this._left;
        },
        set: function (left) {
            this._left = left;
            this._updateProjectionMatrix();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrthoCamera.prototype, "Right", {
        get: function () {
            return this._right;
        },
        set: function (right) {
            this._right = right;
            this._updateProjectionMatrix();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrthoCamera.prototype, "Top", {
        get: function () {
            return this._top;
        },
        set: function (_top) {
            this._top = _top;
            this._updateProjectionMatrix();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrthoCamera.prototype, "Bottom", {
        get: function () {
            return this._bottom;
        },
        set: function (bottom) {
            this._bottom = bottom;
            this._updateProjectionMatrix();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrthoCamera.prototype, "Near", {
        get: function () {
            return this._near;
        },
        set: function (near) {
            this._near = near;
            this._updateProjectionMatrix();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrthoCamera.prototype, "Far", {
        get: function () {
            return this._far;
        },
        set: function (far) {
            this._far = far;
            this._updateProjectionMatrix();
        },
        enumerable: true,
        configurable: true
    });
    return OrthoCamera;
})(ViewCamera);
module.exports = OrthoCamera;

},{"./ViewCameraBase":16,"gl-matrix":299}],15:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ViewCamera = require("./ViewCameraBase");
var glm = require("gl-matrix");
var PerspectiveCamera = (function (_super) {
    __extends(PerspectiveCamera, _super);
    function PerspectiveCamera() {
        _super.apply(this, arguments);
        this._fovy = Math.PI / 4;
        this._aspect = 1;
        this._near = 0.1;
        this._far = 10;
    }
    PerspectiveCamera.prototype._updateProjectionMatrix = function () {
        glm.mat4.perspective(this.projectionMatrix.rawElements, this._fovy, this._aspect, this._near, this._far);
        this.__updateViewProjectionMatrix();
    };
    Object.defineProperty(PerspectiveCamera.prototype, "Fovy", {
        get: function () {
            return this._fovy;
        },
        set: function (fovy) {
            this._fovy = fovy;
            this._updateProjectionMatrix();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerspectiveCamera.prototype, "Aspect", {
        get: function () {
            return this._aspect;
        },
        set: function (aspect) {
            this._aspect = aspect;
            this._updateProjectionMatrix();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerspectiveCamera.prototype, "Near", {
        get: function () {
            return this._near;
        },
        set: function (near) {
            this._near = near;
            this._updateProjectionMatrix();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerspectiveCamera.prototype, "Far", {
        get: function () {
            return this._far;
        },
        set: function (far) {
            this._far = far;
            this._updateProjectionMatrix();
        },
        enumerable: true,
        configurable: true
    });
    return PerspectiveCamera;
})(ViewCamera);
module.exports = PerspectiveCamera;

},{"./ViewCameraBase":16,"gl-matrix":299}],16:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Camera = require("./Camera");
var Vector3 = require("../../Math/Vector3");
var glm = require("gl-matrix");
var ViewCameraBase = (function (_super) {
    __extends(ViewCameraBase, _super);
    function ViewCameraBase() {
        var _this = this;
        _super.call(this);
        this._generateViewMatrix();
        this.transformer.onUpdateTransform(function (t, o) { return _this._updateViewProjectionMatrix(); });
    }
    ViewCameraBase.prototype._updateViewProjectionMatrix = function () {
        this._generateViewMatrix();
        this.__updateViewProjectionMatrix();
    };
    ViewCameraBase.prototype._generateViewMatrix = function () {
        glm.mat4.lookAt(this.viewMatrix.rawElements, this.Transformer.GlobalPosition.rawElements, Vector3.add(this.Transformer.forward, this.Transformer.GlobalPosition).rawElements, this.Transformer.up.rawElements);
    };
    return ViewCameraBase;
})(Camera);
module.exports = ViewCameraBase;

},{"../../Math/Vector3":235,"./Camera":13,"gl-matrix":299}],17:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GLExtensionManager = require("./GLExtensionManager");
var Rectangle = require("../Math/Rectangle");
var ClearTargetType = require("../Wrapper/ClearTargetType");
var JThreeEvent = require('../Base/JThreeEvent');
var CanvasSizeChangedEventArgs = require('./CanvasSizeChangedEventArgs');
var Color4 = require("../Base/Color/Color4");
var CanvasRegion = require("./CanvasRegion");
var Canvas = (function (_super) {
    __extends(Canvas, _super);
    function Canvas(canvasElement) {
        _super.call(this, canvasElement);
        this.canvasResized = new JThreeEvent();
        this.clearColor = new Color4(1, 1, 1, 1);
        this.glExtensionManager = new GLExtensionManager();
        this._lastWidth = canvasElement.width;
        this._lastHeight = canvasElement.height;
        this.__setGLContext(this._tryGetGLContext());
    }
    Canvas.prototype._tryGetGLContext = function () {
        try {
            return this.canvasElement.getContext("webgl") || this.canvasElement.getContext("experimental-webgl");
        }
        catch (e) {
            console.error("WebGL context generation failed" + e);
        }
    };
    Canvas.prototype.afterRender = function (renderer) {
    };
    Canvas.prototype.afterRenderAll = function () {
    };
    Canvas.prototype.beforeRender = function (renderer) {
        this.clearCanvas();
    };
    Canvas.prototype.beforeRenderAll = function () {
        if (this.canvasElement.height !== this._lastHeight || this.canvasElement.width !== this._lastWidth) {
            this.canvasResized.fire(this, new CanvasSizeChangedEventArgs(this, this._lastWidth, this._lastHeight, this.canvasElement.width, this.canvasElement.height));
            this._lastHeight = this.canvasElement.height;
            this._lastWidth = this.canvasElement.width;
        }
    };
    Canvas.prototype.clearCanvas = function () {
        this.GL.bindFramebuffer(this.GL.FRAMEBUFFER, null);
        this.applyClearColor();
        this.GL.clear(ClearTargetType.ColorBits | ClearTargetType.DepthBits);
    };
    Object.defineProperty(Canvas.prototype, "region", {
        get: function () {
            return new Rectangle(0, 0, this._lastWidth, this._lastHeight);
        },
        enumerable: true,
        configurable: true
    });
    Canvas.prototype.__setGLContext = function (glContext) {
        this.GL = glContext;
        this.glExtensionManager.checkExtensions(glContext);
    };
    Canvas.prototype.applyClearColor = function () {
        this.GL.clearColor(this.clearColor.R, this.clearColor.G, this.clearColor.B, this.clearColor.A);
    };
    return Canvas;
})(CanvasRegion);
module.exports = Canvas;

},{"../Base/Color/Color4":4,"../Base/JThreeEvent":6,"../Math/Rectangle":233,"../Wrapper/ClearTargetType":279,"./CanvasRegion":20,"./CanvasSizeChangedEventArgs":21,"./GLExtensionManager":23}],18:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JThreeObject = require("../Base/JThreeObject");
var CanvasListChangedEventArgs = (function (_super) {
    __extends(CanvasListChangedEventArgs, _super);
    function CanvasListChangedEventArgs(changeType, affectedRenderer) {
        _super.call(this);
        this.changeType = changeType;
        this.affectedRenderer = affectedRenderer;
    }
    Object.defineProperty(CanvasListChangedEventArgs.prototype, "ChangeType", {
        get: function () {
            return this.changeType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasListChangedEventArgs.prototype, "AffectedRenderer", {
        get: function () {
            return this.affectedRenderer;
        },
        enumerable: true,
        configurable: true
    });
    return CanvasListChangedEventArgs;
})(JThreeObject);
module.exports = CanvasListChangedEventArgs;

},{"../Base/JThreeObject":9}],19:[function(require,module,exports){
var ContextComponents = require("../ContextComponents");
var JThreeEvent = require("../Base/JThreeEvent");
var CanvasListChangedEventArgs = require("./CanvasListChangedEventArgs");
var ListStateChangedType = require("./ListStateChangedType");
var CanvasManager = (function () {
    function CanvasManager() {
        this.canvases = [];
        this.canvasListChanged = new JThreeEvent();
    }
    CanvasManager.prototype.getContextComponentIndex = function () {
        return ContextComponents.CanvasManager;
    };
    CanvasManager.prototype.addCanvas = function (canvas) {
        if (this.canvases.indexOf(canvas) === -1) {
            this.canvases.push(canvas);
            this.canvasListChanged.fire(this, new CanvasListChangedEventArgs(ListStateChangedType.Add, canvas));
        }
    };
    CanvasManager.prototype.removeCanvas = function (canvas) {
        if (this.canvases.indexOf(canvas) !== -1) {
            for (var i = 0; i < this.canvases.length; i++) {
                if (this.canvases[i] === canvas) {
                    this.canvases.splice(i, 1);
                    break;
                }
            }
            this.canvasListChanged.fire(this, new CanvasListChangedEventArgs(ListStateChangedType.Delete, canvas));
        }
    };
    CanvasManager.prototype.beforeRenderAll = function () {
        this.canvases.forEach(function (c) { return c.beforeRenderAll(); });
    };
    CanvasManager.prototype.afterRenderAll = function () {
        this.canvases.forEach(function (c) { return c.afterRenderAll(); });
    };
    return CanvasManager;
})();
module.exports = CanvasManager;

},{"../Base/JThreeEvent":6,"../ContextComponents":12,"./CanvasListChangedEventArgs":18,"./ListStateChangedType":43}],20:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JThreeEvent = require("../Base/JThreeEvent");
var JThreeObjectWithID = require("../Base/JThreeObjectWithID");
var Vector2 = require("../Math/Vector2");
var JThreeContext = require("../JThreeContext");
var ContextComponents = require("../ContextComponents");
var CanvasRegion = (function (_super) {
    __extends(CanvasRegion, _super);
    function CanvasRegion(canvasElement) {
        var _this = this;
        _super.call(this);
        this.mouseOver = false;
        this.mousePosition = new Vector2(0, 0);
        this.mouseEvent = new JThreeEvent();
        this._mouseMoveHandler = (function (e) {
            _this._checkMouseInside(e, true);
            _this.mouseEvent.fire(_this, {
                enter: false,
                leave: false,
                mouseOver: _this.mouseOver,
                mousePosition: _this.mousePosition,
                region: _this
            });
        }).bind(this);
        this._mouseLeaveHandler = (function (e) {
            _this._checkMouseInside(e, false);
            _this.mouseEvent.fire(_this, {
                enter: false,
                leave: true,
                mouseOver: _this.mouseOver,
                mousePosition: _this.mousePosition,
                region: _this
            });
        }).bind(this);
        this._mouseEnterHandler = (function (e) {
            _this._checkMouseInside(e, true);
            _this.mouseEvent.fire(_this, {
                enter: true,
                leave: false,
                mouseOver: _this.mouseOver,
                mousePosition: _this.mousePosition,
                region: _this
            });
        }).bind(this);
        this.canvasElement = canvasElement;
        this.canvasElement.addEventListener('mousemove', this._mouseMoveHandler, false);
        this.canvasElement.addEventListener('mouseenter', this._mouseEnterHandler, false);
        this.canvasElement.addEventListener('mouseleave', this._mouseLeaveHandler, false);
        this.name = this.ID;
    }
    CanvasRegion.prototype.dispose = function () {
        this.canvasElement.removeEventListener('mousemove', this._mouseMoveHandler, false);
        this.canvasElement.removeEventListener('mouseenter', this._mouseEnterHandler, false);
        this.canvasElement.removeEventListener('mouseleave', this._mouseLeaveHandler, false);
    };
    Object.defineProperty(CanvasRegion.prototype, "region", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    CanvasRegion.prototype._checkMouseInside = function (e, mouseState) {
        var r = this.region;
        var rect = this.canvasElement.getBoundingClientRect();
        var cWidth = rect.right - rect.left;
        var cHeight = rect.bottom - rect.top;
        var x = (e.clientX - rect.left) / cWidth * this.canvasElement.width;
        var y = (e.clientY - rect.top) / cHeight * this.canvasElement.height;
        this.mouseOver = mouseState && r.contains(x, y);
        if (this.mouseOver) {
            this.mousePosition.X = (x - r.Left) / r.Width;
            this.mousePosition.Y = (y - r.Top) / r.Height;
        }
        else {
            this.mousePosition.X = -1;
            this.mousePosition.Y = -1;
        }
        var debug = JThreeContext.getContextComponent(ContextComponents.Debugger);
        debug.setInfo("MouseState:" + this.name + "(" + this.getTypeName() + ")", {
            mouseOver: this.mouseOver,
            mousePositionX: this.mousePosition.X,
            mousePositionY: this.mousePosition.Y,
            rawX: (x - r.Left),
            rawY: (y - r.Top)
        });
        return this.mouseOver;
    };
    return CanvasRegion;
})(JThreeObjectWithID);
module.exports = CanvasRegion;

},{"../Base/JThreeEvent":6,"../Base/JThreeObjectWithID":10,"../ContextComponents":12,"../JThreeContext":226,"../Math/Vector2":234}],21:[function(require,module,exports){
var CanvasSizeChangedEventArg = (function () {
    function CanvasSizeChangedEventArg(target, lastWidth, lastHeight, newWidth, newHeight) {
        this.canvas = target;
        this.lastWidth = lastWidth;
        this.lastHeight = lastHeight;
        this.newWidth = newWidth;
        this.newHeight = newHeight;
    }
    Object.defineProperty(CanvasSizeChangedEventArg.prototype, "Canvas", {
        get: function () {
            return this.canvas;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasSizeChangedEventArg.prototype, "LastWidth", {
        get: function () {
            return this.lastWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasSizeChangedEventArg.prototype, "LastHeight", {
        get: function () {
            return this.lastHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasSizeChangedEventArg.prototype, "NewWidth", {
        get: function () {
            return this.newWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasSizeChangedEventArg.prototype, "NewHeight", {
        get: function () {
            return this.newHeight;
        },
        enumerable: true,
        configurable: true
    });
    return CanvasSizeChangedEventArg;
})();
module.exports = CanvasSizeChangedEventArg;

},{}],22:[function(require,module,exports){
var GLExtensionList = (function () {
    function GLExtensionList() {
    }
    GLExtensionList.ElementIndexUint = "OES_element_index_uint";
    GLExtensionList.TextureFloat = "OES_texture_float";
    GLExtensionList.VertexArrayObject = "OES_vertex_array_object";
    GLExtensionList.TextureFilterAnisotropic = "EXT_texture_filter_anisotropic";
    return GLExtensionList;
})();
module.exports = GLExtensionList;

},{}],23:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JThreeObject = require("../Base/JThreeObject");
var AssociativeArray = require("../Base/Collections/AssociativeArray");
var JThreeLogger = require("../Base/JThreeLogger");
var GLExtensionList = require("./GLExtensionList");
var GLExtensionManager = (function (_super) {
    __extends(GLExtensionManager, _super);
    function GLExtensionManager() {
        _super.call(this);
        this.requiredExtensions = [
            GLExtensionList.ElementIndexUint,
            GLExtensionList.TextureFloat,
            GLExtensionList.TextureFilterAnisotropic,
            GLExtensionList.VertexArrayObject];
        this.extensions = new AssociativeArray();
    }
    GLExtensionManager.prototype.checkExtensions = function (context) {
        for (var i = 0; i < this.requiredExtensions.length; i++) {
            var element = this.requiredExtensions[i];
            var ext;
            if (typeof element === "string") {
                ext = context.getExtension(element);
            }
            else {
                for (var j = 0; j < element.length; j++) {
                    ext = context.getExtension(element[j]);
                    if (ext)
                        break;
                }
            }
            if (!ext) {
                JThreeLogger.sectionError('GL Extension', "WebGL Extension:" + element + " was requested,but your browser is not supporting this feature.");
            }
            else {
                JThreeLogger.sectionLog("GL Extension", element + " was instanciated successfully");
                this.extensions.set(element, ext);
            }
        }
    };
    GLExtensionManager.prototype.getExtension = function (extName) {
        return this.extensions.get(extName);
    };
    GLExtensionManager.prototype.hasExtension = function (extName) {
        return this.extensions.has(extName);
    };
    return GLExtensionManager;
})(JThreeObject);
module.exports = GLExtensionManager;

},{"../Base/Collections/AssociativeArray":2,"../Base/JThreeLogger":8,"../Base/JThreeObject":9,"./GLExtensionList":22}],24:[function(require,module,exports){
var GetParameterType = require("../Wrapper/GetParameterType");
var JThreeContext = require("../JThreeContext");
var ContextComponents = require("../ContextComponents");
var GLSpecManager = (function () {
    function GLSpecManager() {
    }
    Object.defineProperty(GLSpecManager, "GLContext", {
        get: function () {
            var canvasManager = JThreeContext.getContextComponent(ContextComponents.CanvasManager);
            if (canvasManager.canvases.length > 0) {
                return canvasManager.canvases[0].GL;
            }
            else {
                console.error("can't obtain the gl context to check gl spec");
            }
        },
        enumerable: true,
        configurable: true
    });
    GLSpecManager.getParameterOrCached = function (cached, parameterType) {
        return cached || GLSpecManager.GLContext.getParameter(parameterType);
    };
    Object.defineProperty(GLSpecManager, "MaxCombinedTextureUnits", {
        get: function () {
            return GLSpecManager.maxCombinedTextureUnits = GLSpecManager.getParameterOrCached(GLSpecManager.maxCombinedTextureUnits, GetParameterType.MaxCombinedTextureImageUnits);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLSpecManager, "MaxCubeMapTextureSize", {
        get: function () {
            return GLSpecManager.maxCubeMapTextureSize = GLSpecManager.getParameterOrCached(GLSpecManager.maxCubeMapTextureSize, GetParameterType.MaxCubeMapTextureSize);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLSpecManager, "MaxFragmentUniformVectors", {
        get: function () {
            return GLSpecManager.maxFragmentUniformVectors = GLSpecManager.getParameterOrCached(GLSpecManager.maxFragmentUniformVectors, GetParameterType.MaxFragmentUniformVectors);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLSpecManager, "MaxRenderbufferSize", {
        get: function () {
            return GLSpecManager.maxRenderbufferSize = GLSpecManager.getParameterOrCached(GLSpecManager.maxRenderbufferSize, GetParameterType.MaxRenderbufferSize);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLSpecManager, "MaxTextureImageUnits", {
        get: function () {
            return GLSpecManager.maxTextureImageUnits = GLSpecManager.getParameterOrCached(GLSpecManager.maxTextureImageUnits, GetParameterType.MaxTextureImageUnits);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLSpecManager, "MaxTextureSize", {
        get: function () {
            return GLSpecManager.maxTextureSize = GLSpecManager.getParameterOrCached(GLSpecManager.maxTextureSize, GetParameterType.MaxTextureSize);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLSpecManager, "MaxVaryingVectors", {
        get: function () {
            return GLSpecManager.maxVaryingVectors = GLSpecManager.getParameterOrCached(GLSpecManager.maxVaryingVectors, GetParameterType.MaxVaryingVectors);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLSpecManager, "MaxVertexAttribs", {
        get: function () {
            return GLSpecManager.maxVertexAttribs = GLSpecManager.getParameterOrCached(GLSpecManager.maxVertexAttribs, GetParameterType.MaxVertexAttribs);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLSpecManager, "MaxVertexTextureImageUnits", {
        get: function () {
            return GLSpecManager.maxVertexTextureImageUnits = GLSpecManager.getParameterOrCached(GLSpecManager.maxVertexTextureImageUnits, GetParameterType.MaxVertexTextureImageUnits);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLSpecManager, "MaxVertexUniformVectors", {
        get: function () {
            return GLSpecManager.maxVertexUniformVectors = GLSpecManager.getParameterOrCached(GLSpecManager.maxVertexUniformVectors, GetParameterType.MaxVertexUniformVectors);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLSpecManager, "MaxViewportDims", {
        get: function () {
            return GLSpecManager.maxViewportDims = GLSpecManager.getParameterOrCached(GLSpecManager.maxViewportDims, GetParameterType.MaxViewportDims);
        },
        enumerable: true,
        configurable: true
    });
    return GLSpecManager;
})();
module.exports = GLSpecManager;

},{"../ContextComponents":12,"../JThreeContext":226,"../Wrapper/GetParameterType":283}],25:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Geometry = require("./Geometry");
var BufferTargetType = require("../../Wrapper/BufferTargetType");
var BufferUsageType = require("../../Wrapper/BufferUsageType");
var ElementType = require("../../Wrapper/ElementType");
var Vector3 = require("../../Math/Vector3");
var PrimitiveTopology = require("../../Wrapper/PrimitiveTopology");
var ContextComponents = require("../../ContextComponents");
var JThreeContext = require("../../JThreeContext");
var CircleGeometry = (function (_super) {
    __extends(CircleGeometry, _super);
    function CircleGeometry(name) {
        _super.call(this);
        this.divideCount = 30;
        var rm = JThreeContext.getContextComponent(ContextComponents.ResourceManager);
        this.primitiveTopology = PrimitiveTopology.Triangles;
        this.indexBuffer = rm.createBuffer(name + "index", BufferTargetType.ElementArrayBuffer, BufferUsageType.StaticDraw, 1, ElementType.UnsignedByte);
        this.positionBuffer = rm.createBuffer(name + "-pos", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 3, ElementType.Float);
        this.normalBuffer = rm.createBuffer(name + "-nor", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 3, ElementType.Float);
        this.uvBuffer = rm.createBuffer(name + "-uv", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 2, ElementType.Float);
        this.updateBuffers();
    }
    Object.defineProperty(CircleGeometry.prototype, "DiviceCount", {
        get: function () {
            return this.divideCount;
        },
        set: function (count) {
            this.divideCount = count;
            this.updateBuffers();
        },
        enumerable: true,
        configurable: true
    });
    CircleGeometry.prototype.updateBuffers = function () {
        var pos = [];
        var normal = [];
        var uv = [];
        var index = [];
        this.addCircle(pos, normal, uv, index, this.divideCount, Vector3.Zero, Vector3.YUnit, new Vector3(0, 0, -1));
        this.indexBuffer.update(new Uint8Array(index), index.length);
        this.normalBuffer.update(new Float32Array(normal), normal.length);
        this.uvBuffer.update(new Float32Array(uv), uv.length);
        this.positionBuffer.update(new Float32Array(pos), pos.length);
    };
    return CircleGeometry;
})(Geometry);
module.exports = CircleGeometry;

},{"../../ContextComponents":12,"../../JThreeContext":226,"../../Math/Vector3":235,"../../Wrapper/BufferTargetType":277,"../../Wrapper/BufferUsageType":278,"../../Wrapper/ElementType":280,"../../Wrapper/PrimitiveTopology":284,"./Geometry":28}],26:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Geometry = require("./Geometry");
var BufferTargetType = require("../../Wrapper/BufferTargetType");
var BufferUsageType = require("../../Wrapper/BufferUsageType");
var ElementType = require("../../Wrapper/ElementType");
var Vector3 = require("../../Math/Vector3");
var PrimitiveTopology = require("../../Wrapper/PrimitiveTopology");
var JThreeContext = require("../../JThreeContext");
var ContextComponents = require("../../ContextComponents");
var CubeGeometry = (function (_super) {
    __extends(CubeGeometry, _super);
    function CubeGeometry(name) {
        _super.call(this);
        var rm = JThreeContext.getContextComponent(ContextComponents.ResourceManager);
        this.primitiveTopology = PrimitiveTopology.Triangles;
        this.indexBuffer = rm.createBuffer(name + "index", BufferTargetType.ElementArrayBuffer, BufferUsageType.StaticDraw, 1, ElementType.UnsignedByte);
        this.positionBuffer = rm.createBuffer(name + "-pos", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 3, ElementType.Float);
        this.normalBuffer = rm.createBuffer(name + "-nor", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 3, ElementType.Float);
        this.uvBuffer = rm.createBuffer(name + "-uv", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 2, ElementType.Float);
        this.updateBuffers();
    }
    CubeGeometry.prototype.updateBuffers = function () {
        var pos = [];
        var normal = [];
        var uv = [];
        var index = [];
        this.addQuad(pos, normal, uv, index, [new Vector3(-1, 1, 1), new Vector3(-1, -1, 1), new Vector3(1, 1, 1)]);
        this.addQuad(pos, normal, uv, index, [new Vector3(1, 1, 1), new Vector3(1, -1, 1), new Vector3(1, 1, -1)]);
        this.addQuad(pos, normal, uv, index, [new Vector3(1, 1, -1), new Vector3(1, -1, -1), new Vector3(-1, 1, -1)]);
        this.addQuad(pos, normal, uv, index, [new Vector3(-1, 1, -1), new Vector3(-1, -1, -1), new Vector3(-1, 1, 1)]);
        this.addQuad(pos, normal, uv, index, [new Vector3(-1, 1, 1), new Vector3(1, 1, 1), new Vector3(-1, 1, -1)]);
        this.addQuad(pos, normal, uv, index, [new Vector3(1, -1, 1), new Vector3(-1, -1, 1), new Vector3(1, -1, -1)]);
        this.indexBuffer.update(new Uint8Array(index), index.length);
        this.normalBuffer.update(new Float32Array(normal), normal.length);
        this.uvBuffer.update(new Float32Array(uv), uv.length);
        this.positionBuffer.update(new Float32Array(pos), pos.length);
    };
    CubeGeometry.prototype.drawElements = function (canvas, material) {
        _super.prototype.drawElements.call(this, canvas, material);
    };
    return CubeGeometry;
})(Geometry);
module.exports = CubeGeometry;

},{"../../ContextComponents":12,"../../JThreeContext":226,"../../Math/Vector3":235,"../../Wrapper/BufferTargetType":277,"../../Wrapper/BufferUsageType":278,"../../Wrapper/ElementType":280,"../../Wrapper/PrimitiveTopology":284,"./Geometry":28}],27:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Geometry = require("./Geometry");
var BufferTargetType = require("../../Wrapper/BufferTargetType");
var BufferUsageType = require("../../Wrapper/BufferUsageType");
var ElementType = require("../../Wrapper/ElementType");
var Vector3 = require("../../Math/Vector3");
var PrimitiveTopology = require("../../Wrapper/PrimitiveTopology");
var JThreeContext = require("../../JThreeContext");
var ContextComponents = require("../../ContextComponents");
var CylinderGeometry = (function (_super) {
    __extends(CylinderGeometry, _super);
    function CylinderGeometry(name) {
        _super.call(this);
        this.divideCount = 10;
        var rm = JThreeContext.getContextComponent(ContextComponents.ResourceManager);
        this.primitiveTopology = PrimitiveTopology.Triangles;
        this.indexBuffer = rm.createBuffer(name + "index", BufferTargetType.ElementArrayBuffer, BufferUsageType.StaticDraw, 1, ElementType.UnsignedShort);
        this.positionBuffer = rm.createBuffer(name + "-pos", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 3, ElementType.Float);
        this.normalBuffer = rm.createBuffer(name + "-nor", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 3, ElementType.Float);
        this.uvBuffer = rm.createBuffer(name + "-uv", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 2, ElementType.Float);
        this.updateBuffers();
    }
    Object.defineProperty(CylinderGeometry.prototype, "DivideCount", {
        get: function () {
            return this.divideCount;
        },
        set: function (count) {
            this.divideCount = count;
            this.updateBuffers();
        },
        enumerable: true,
        configurable: true
    });
    CylinderGeometry.prototype.updateBuffers = function () {
        var pos = [];
        var normal = [];
        var uv = [];
        var index = [];
        this.addCylinder(pos, normal, uv, index, this.DivideCount, new Vector3(0, 1, 0), new Vector3(0, -1, 0), new Vector3(0, 0, -1), 1);
        this.indexBuffer.update(new Uint16Array(index), index.length);
        this.normalBuffer.update(new Float32Array(normal), normal.length);
        this.uvBuffer.update(new Float32Array(uv), uv.length);
        this.positionBuffer.update(new Float32Array(pos), pos.length);
    };
    return CylinderGeometry;
})(Geometry);
module.exports = CylinderGeometry;

},{"../../ContextComponents":12,"../../JThreeContext":226,"../../Math/Vector3":235,"../../Wrapper/BufferTargetType":277,"../../Wrapper/BufferUsageType":278,"../../Wrapper/ElementType":280,"../../Wrapper/PrimitiveTopology":284,"./Geometry":28}],28:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var jThreeObject = require("../../Base/JThreeObject");
var PrimitiveTopology = require("../../Wrapper/PrimitiveTopology");
var Vector3 = require("../../Math/Vector3");
var Geometry = (function (_super) {
    __extends(Geometry, _super);
    function Geometry() {
        _super.apply(this, arguments);
        this.primitiveTopology = PrimitiveTopology.Triangles;
    }
    Object.defineProperty(Geometry.prototype, "PositionBuffer", {
        get: function () {
            return this.positionBuffer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Geometry.prototype, "NormalBuffer", {
        get: function () {
            return this.normalBuffer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Geometry.prototype, "UVBuffer", {
        get: function () {
            return this.uvBuffer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Geometry.prototype, "IndexBuffer", {
        get: function () {
            return this.indexBuffer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Geometry.prototype, "IndexCount", {
        get: function () {
            return this.indexBuffer.Length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Geometry.prototype, "GeometryOffset", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Geometry.prototype, "PrimitiveTopology", {
        get: function () {
            return this.primitiveTopology;
        },
        enumerable: true,
        configurable: true
    });
    Geometry.prototype.drawElements = function (canvas, material) {
        if (material) {
            canvas.GL.drawElements(this.PrimitiveTopology, material.getDrawGeometryLength(this), this.IndexBuffer.ElementType, material.getDrawGeometryOffset(this));
            return;
        }
        canvas.GL.drawElements(this.PrimitiveTopology, this.IndexCount, this.IndexBuffer.ElementType, this.GeometryOffset);
    };
    Geometry.prototype.addQuad = function (pos, normal, uv, index, points) {
        var startIndex = pos.length / 3;
        var v0 = points[0], v1 = points[1], v3 = points[2];
        var v02v1 = v1.subtractWith(v0);
        var v02v3 = v3.subtractWith(v0);
        var v2 = v0.addWith(v02v1).addWith(v02v3);
        var nV = v02v1.crossWith(v02v3).normalizeThis();
        normal.push(nV.X, nV.Y, nV.Z, nV.X, nV.Y, nV.Z, nV.X, nV.Y, nV.Z, nV.X, nV.Y, nV.Z);
        uv.push(0, 1, 0, 0, 1, 0, 1, 1);
        pos.push(v0.X, v0.Y, v0.Z, v1.X, v1.Y, v1.Z, v2.X, v2.Y, v2.Z, v3.X, v3.Y, v3.Z);
        index.push(startIndex, startIndex + 1, startIndex + 3, startIndex + 3, startIndex + 1, startIndex + 2);
    };
    Geometry.prototype.addCircle = function (pos, normal, uv, index, divide, center, normalVector, tangentVector) {
        var tan2 = Vector3.cross(tangentVector, normalVector);
        var vecCount = 2 + divide;
        var baseIndex = uv.length / 2;
        for (var i = 0; i < vecCount; i++) {
            var v = this.calcNextPointInCircle(i, divide, center, tangentVector, tan2);
            var u = this.calcUVInCircle(i, divide);
            pos.push(v.X, v.Y, v.Z);
            normal.push(normalVector.X, normalVector.Y, normalVector.Z);
            uv.push(u[0], u[1]);
        }
        for (var i = 0; i < divide; i++) {
            index.push(baseIndex);
            index.push(baseIndex + i + 2);
            index.push(baseIndex + i + 1);
        }
    };
    Geometry.prototype.calcUVInCircle = function (index, divCount) {
        if (index == 0)
            return [0, 0];
        var angle = (index - 1) * 2 * Math.PI / divCount;
        return [Math.cos(angle), Math.sin(angle)];
    };
    Geometry.prototype.calcNextPointInCircle = function (index, divCount, center, tan, tan2) {
        var angle = (index - 1) * 2 * Math.PI / divCount;
        return index === 0 ? center :
            Vector3.add(center, Vector3.add(tan.multiplyWith(Math.sin(angle)), tan2.multiplyWith(Math.cos(angle))));
    };
    Geometry.prototype.addCylinder = function (pos, normal, uv, index, divide, start, end, tangent, radius) {
        var dest = Vector3.subtract(end, start);
        var tangentNormalized = tangent.normalizeThis();
        var tan2 = Vector3.cross(dest.normalizeThis(), tangentNormalized);
        tangentNormalized = tangentNormalized.multiplyWith(radius);
        tan2 = tan2.multiplyWith(radius);
        for (var i = 0; i < divide; i++) {
            var angle = (i - 1) * 2 * Math.PI / divide;
            var angleTo = i * 2 * Math.PI / divide;
            var currentNormal = Vector3.add(tan2.multiplyWith(Math.cos(angle)), tangentNormalized.multiplyWith(Math.sin(angle)));
            var nextNormal = Vector3.add(tan2.multiplyWith(Math.cos(angleTo)), tangentNormalized.multiplyWith(Math.sin(angleTo)));
            var v0 = Vector3.add(start, currentNormal);
            var v1 = Vector3.add(start, nextNormal);
            var v2 = Vector3.add(v0, dest);
            var v3 = v1.addWith(dest);
            var startIndex = pos.length / 3;
            normal.push(currentNormal.X, currentNormal.Y, currentNormal.Z, nextNormal.X, nextNormal.Y, nextNormal.Z, nextNormal.X, nextNormal.Y, nextNormal.Z, currentNormal.X, currentNormal.Y, currentNormal.Z);
            uv.push(0, 1, 1, 0, 1, 0, 0, 0);
            pos.push(v0.X, v0.Y, v0.Z, v1.X, v1.Y, v1.Z, v3.X, v3.Y, v3.Z, v2.X, v2.Y, v2.Z);
            index.push(startIndex, startIndex + 1, startIndex + 2, startIndex, startIndex + 2, startIndex + 3);
        }
    };
    Geometry.prototype.bindIndexBuffer = function (canvas) {
        this.IndexBuffer.getForContext(canvas).bindBuffer();
    };
    return Geometry;
})(jThreeObject);
module.exports = Geometry;

},{"../../Base/JThreeObject":9,"../../Math/Vector3":235,"../../Wrapper/PrimitiveTopology":284}],29:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Geometry = require("./Geometry");
var BufferTargetType = require("../../Wrapper/BufferTargetType");
var BufferUsageType = require("../../Wrapper/BufferUsageType");
var ElementType = require("../../Wrapper/ElementType");
var PrimitiveTopology = require("../../Wrapper/PrimitiveTopology");
var JThreeContext = require("../../JThreeContext");
var ContextComponents = require("../../ContextComponents");
var GridGeometry = (function (_super) {
    __extends(GridGeometry, _super);
    function GridGeometry(name) {
        _super.call(this);
        this.holizontalDivide = 10;
        this.verticalDivide = 10;
        var rm = JThreeContext.getContextComponent(ContextComponents.ResourceManager);
        this.primitiveTopology = PrimitiveTopology.Lines;
        this.indexBuffer = rm.createBuffer(name + "index", BufferTargetType.ElementArrayBuffer, BufferUsageType.StaticDraw, 1, ElementType.UnsignedShort);
        this.positionBuffer = rm.createBuffer(name + "-pos", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 3, ElementType.Float);
        this.normalBuffer = rm.createBuffer(name + "-nor", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 3, ElementType.Float);
        this.uvBuffer = rm.createBuffer(name + "-uv", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 2, ElementType.Float);
        this.updateBuffers();
    }
    Object.defineProperty(GridGeometry.prototype, "HolizontalDivide", {
        get: function () {
            return this.holizontalDivide;
        },
        set: function (num) {
            this.holizontalDivide = num;
            this.updateBuffers();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridGeometry.prototype, "VerticalDivide", {
        get: function () {
            return this.verticalDivide;
        },
        set: function (num) {
            this.verticalDivide = num;
            this.updateBuffers();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridGeometry.prototype, "VerticiesCount", {
        get: function () {
            return (this.HolizontalDivide + 1) * 2 + (this.VerticalDivide + 1) * 2;
        },
        enumerable: true,
        configurable: true
    });
    GridGeometry.prototype.updatePositionBuffer = function () {
        var arr = [];
        for (var i = 0; i < this.HolizontalDivide + 1; i++) {
            var num = -1 + 1 / this.HolizontalDivide * i * 2;
            arr.push(num, 0, -1, num, 0, 1);
        }
        for (var i = 0; i < this.VerticalDivide + 1; i++) {
            var num = -1 + 1 / this.VerticalDivide * i * 2;
            arr.push(-1, 0, num, 1, 0, num);
        }
        this.positionBuffer.update(new Float32Array(arr), arr.length);
    };
    GridGeometry.prototype.updateNormalBuffer = function () {
        this.normalBuffer.update(new Float32Array(new Array(this.VerticiesCount * 3)), this.VerticiesCount * 3);
    };
    GridGeometry.prototype.updateUvBuffer = function () {
        this.uvBuffer.update(new Float32Array(new Array(this.VerticiesCount * 2)), this.VerticiesCount * 2);
    };
    GridGeometry.prototype.updateIndexBuffer = function () {
        var arr = [];
        for (var v = 0; v < this.VerticiesCount; v++)
            arr.push(v);
        this.indexBuffer.update(new Uint16Array(arr), this.VerticiesCount);
    };
    GridGeometry.prototype.updateBuffers = function () {
        this.updatePositionBuffer();
        this.updateNormalBuffer();
        this.updateUvBuffer();
        this.updateIndexBuffer();
    };
    return GridGeometry;
})(Geometry);
module.exports = GridGeometry;

},{"../../ContextComponents":12,"../../JThreeContext":226,"../../Wrapper/BufferTargetType":277,"../../Wrapper/BufferUsageType":278,"../../Wrapper/ElementType":280,"../../Wrapper/PrimitiveTopology":284,"./Geometry":28}],30:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Geometry = require("./Geometry");
var BufferTargetType = require("../../Wrapper/BufferTargetType");
var BufferUsageType = require("../../Wrapper/BufferUsageType");
var ElementType = require("../../Wrapper/ElementType");
var Vector3 = require("../../Math/Vector3");
var ContextComponents = require("../../ContextComponents");
var JThreeContext = require("../../JThreeContext");
var QuadGeometry = (function (_super) {
    __extends(QuadGeometry, _super);
    function QuadGeometry(name) {
        _super.call(this);
        var rm = JThreeContext.getContextComponent(ContextComponents.ResourceManager);
        this.indexBuffer = rm.createBuffer(name + "index", BufferTargetType.ElementArrayBuffer, BufferUsageType.StaticDraw, 1, ElementType.UnsignedByte);
        this.positionBuffer = rm.createBuffer(name + "-pos", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 3, ElementType.Float);
        this.normalBuffer = rm.createBuffer(name + "-nor", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 3, ElementType.Float);
        this.uvBuffer = rm.createBuffer(name + "-uv", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 2, ElementType.Float);
        this.updateBuffers();
    }
    QuadGeometry.prototype.updateBuffers = function () {
        var pos = [];
        var nor = [];
        var uv = [];
        var index = [];
        this.addQuad(pos, nor, uv, index, [new Vector3(-1, 1, 0), new Vector3(-1, -1, 0), new Vector3(1, 1, 0)]);
        this.positionBuffer.update(new Float32Array(pos), pos.length);
        this.normalBuffer.update(new Float32Array(nor), nor.length);
        this.uvBuffer.update(new Float32Array(uv), uv.length);
        this.indexBuffer.update(new Uint8Array(index), index.length);
    };
    return QuadGeometry;
})(Geometry);
module.exports = QuadGeometry;

},{"../../ContextComponents":12,"../../JThreeContext":226,"../../Math/Vector3":235,"../../Wrapper/BufferTargetType":277,"../../Wrapper/BufferUsageType":278,"../../Wrapper/ElementType":280,"./Geometry":28}],31:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Geometry = require("./Geometry");
var BufferTargetType = require("../../Wrapper/BufferTargetType");
var BufferUsageType = require("../../Wrapper/BufferUsageType");
var ElementType = require("../../Wrapper/ElementType");
var Vector3 = require("../../Math/Vector3");
var PrimitiveTopology = require("../../Wrapper/PrimitiveTopology");
var ContextComponents = require("../../ContextComponents");
var JThreeContext = require("../../JThreeContext");
var TriangleGeometry = (function (_super) {
    __extends(TriangleGeometry, _super);
    function TriangleGeometry(name) {
        _super.call(this);
        this.first = new Vector3(0, 1, 0);
        this.second = new Vector3(1, 0, 0);
        this.third = new Vector3(-1, 0, 0);
        var rm = JThreeContext.getContextComponent(ContextComponents.ResourceManager);
        this.primitiveTopology = PrimitiveTopology.Triangles;
        this.indexBuffer = rm.createBuffer(name + "index", BufferTargetType.ElementArrayBuffer, BufferUsageType.StaticDraw, 1, ElementType.UnsignedByte);
        this.positionBuffer = rm.createBuffer(name + "-pos", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 3, ElementType.Float);
        this.normalBuffer = rm.createBuffer(name + "-nor", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 3, ElementType.Float);
        this.uvBuffer = rm.createBuffer(name + "-uv", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 2, ElementType.Float);
        this.updateBuffers();
    }
    Object.defineProperty(TriangleGeometry.prototype, "First", {
        set: function (vec) {
            this.first = vec;
            this.updateBuffers();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TriangleGeometry.prototype, "Second", {
        set: function (vec) {
            this.second = vec;
            this.updateBuffers();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TriangleGeometry.prototype, "Third", {
        set: function (vec) {
            this.third = vec;
            this.updateBuffers();
        },
        enumerable: true,
        configurable: true
    });
    TriangleGeometry.prototype.updatePositionBuffer = function () {
        this.positionBuffer.update(new Float32Array([this.first.X, this.first.Y, this.first.Z, this.second.X, this.second.Y, this.second.Z, this.third.X, this.third.Y, this.third.Z]), 9);
    };
    TriangleGeometry.prototype.updateNormalBuffer = function () {
        this.normalBuffer.update(new Float32Array([0, 0, -1, 0, 0, -1, 0, 0, -1]), 9);
    };
    TriangleGeometry.prototype.updateUvBuffer = function () {
        this.uvBuffer.update(new Float32Array([0.5, 0.5, 1, 0, 0, 0]), 6);
    };
    TriangleGeometry.prototype.updateIndexBuffer = function () {
        this.indexBuffer.update(new Uint8Array([0, 1, 2]), 3);
    };
    TriangleGeometry.prototype.updateBuffers = function () {
        this.updatePositionBuffer();
        this.updateNormalBuffer();
        this.updateUvBuffer();
        this.updateIndexBuffer();
    };
    return TriangleGeometry;
})(Geometry);
module.exports = TriangleGeometry;

},{"../../ContextComponents":12,"../../JThreeContext":226,"../../Math/Vector3":235,"../../Wrapper/BufferTargetType":277,"../../Wrapper/BufferUsageType":278,"../../Wrapper/ElementType":280,"../../Wrapper/PrimitiveTopology":284,"./Geometry":28}],32:[function(require,module,exports){
module.exports = [
    require("./Impl/AreaLight"),
    require("./Impl/DirectionalLight.ts"),
    require("./Impl/PointLight.ts"),
    require("./Impl/SpotLight.ts"),
    require("./Impl/SceneLight.ts")
];

},{"./Impl/AreaLight":33,"./Impl/DirectionalLight.ts":34,"./Impl/PointLight.ts":35,"./Impl/SceneLight.ts":36,"./Impl/SpotLight.ts":37}],33:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Vector3 = require('../../../Math/Vector3');
var LightBase = require('./../LightBase');
var Matrix = require('../../../Math/Matrix');
var glm = require("gl-matrix");
var AreaLight = (function (_super) {
    __extends(AreaLight, _super);
    function AreaLight(scene) {
        _super.call(this, scene);
        this.intensity = 1.0;
        this.rightLength = 1;
        this.farLength = 1;
        this.topLength = 1;
    }
    AreaLight.prototype.getParameters = function (renderer) {
        var dir = Matrix.transformNormal(renderer.Camera.viewMatrix, this.transformer.forward);
        var vm = Matrix.multiply(renderer.Camera.viewMatrix, this.transformer.LocalToGlobal);
        var b = Matrix.transformPoint(vm, Vector3.Zero);
        var bp = Matrix.transformPoint(this.transformer.LocalToGlobal, Vector3.Zero);
        var r = Matrix.transformNormal(renderer.Camera.viewMatrix, this.transformer.right.multiplyWith(this.rightLength));
        var t = Matrix.transformNormal(renderer.Camera.viewMatrix, this.transformer.up.multiplyWith(this.topLength));
        var f = Matrix.transformNormal(renderer.Camera.viewMatrix, this.transformer.forward.multiplyWith(this.farLength));
        var factor = [r.X, r.Y, r.Z, t.X, t.Y, t.Z, f.X, f.Y, f.Z];
        glm.mat3.invert(factor, factor);
        return [this.Color.R * this.intensity, this.Color.G * this.intensity, this.Color.B * this.intensity,
            b.X, b.Y, b.Z, 0,
            factor[0], factor[1], factor[2], 0,
            factor[3], factor[4], factor[5], 0,
            factor[6], factor[7], factor[8]];
    };
    AreaLight.prototype.calcAxis = function (x, y, z, bp) {
        return new Vector3(x + bp.X, y + bp.Y, -z + bp.Z);
    };
    Object.defineProperty(AreaLight.prototype, "LightType", {
        get: function () {
            return "jthree.lights.arealight";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AreaLight, "TypeDefinition", {
        get: function () {
            return {
                typeName: "jthree.lights.arealight",
                requiredParamCount: 5,
                shaderfuncName: "calcAreaLight",
                diffuseFragmentCode: require('../../Shaders/Light/Area/DiffuseChunk.glsl'),
                specularFragmentCode: require('../../Shaders/Light/Area/SpecularChunk.glsl')
            };
        },
        enumerable: true,
        configurable: true
    });
    return AreaLight;
})(LightBase);
module.exports = AreaLight;

},{"../../../Math/Matrix":229,"../../../Math/Vector3":235,"../../Shaders/Light/Area/DiffuseChunk.glsl":113,"../../Shaders/Light/Area/SpecularChunk.glsl":114,"./../LightBase":38,"gl-matrix":299}],34:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Vector3 = require('../../../Math/Vector3');
var ShadowDroppableLight = require("../ShadowMap/ShadowDroppableLight");
var Matrix = require('../../../Math/Matrix');
var glm = require("gl-matrix");
var PointList = require("../../../Math/PointList");
var ContextComponents = require("../../../ContextComponents");
var JThreeContext = require("../../../JThreeContext");
var DirectionalLight = (function (_super) {
    __extends(DirectionalLight, _super);
    function DirectionalLight(scene) {
        _super.call(this, scene);
        this.shadowProjectionMatrixCache = Matrix.zero();
        this.shadowViewMatrixCache = Matrix.zero();
        this.shadowMatrixCache = Matrix.zero();
        this.nearClip = 0.1;
        this.bias = 0.2;
    }
    DirectionalLight.prototype.getParameters = function (renderer, shadowMapIndex) {
        var dir = Vector3.normalize(Matrix.transformNormal(renderer.Camera.viewMatrix, this.transformer.forward));
        var debug = JThreeContext.getContextComponent(ContextComponents.Debugger);
        debug.setInfo("lDir", dir.toString());
        return [this.Color.R * this.intensity, this.Color.G * this.intensity, this.Color.B * this.intensity,
            dir.X, dir.Y, dir.Z, 0,
            this.isShadowDroppable ? 1 : 0, shadowMapIndex, this.bias];
    };
    DirectionalLight.prototype.computeUpVector = function (viewDir, lightDir) {
        var left = Vector3.cross(lightDir, viewDir);
        var up = Vector3.cross(left, lightDir);
        return up;
    };
    DirectionalLight.prototype.computePerspective = function (n, f) {
        var m = Matrix.identity();
        m.rawElements[5] = (f + n) / (f - n);
        m.rawElements[13] = -2 * f * n / (f - n);
        m.rawElements[7] = 1;
        m.rawElements[15] = 0;
        return m;
    };
    DirectionalLight.prototype.updateLightMatricis = function (renderer) {
        var cam = renderer.Camera;
        this.generateLightviewMatrix(renderer.Camera);
        this.USM(renderer);
        glm.mat4.mul(this.shadowMatrixCache.rawElements, Matrix.scale(new Vector3(1, 1, -1)).rawElements, this.shadowMatrixCache.rawElements);
        this.updateLightProjection(renderer, this.shadowMatrixCache);
    };
    DirectionalLight.prototype.LiSPSM = function (renderer) {
        var cam = renderer.Camera;
        var viewDirection = cam.Transformer.forward;
        var lightDirection = this.transformer.forward;
        var eyePosition = cam.Transformer.GlobalPosition;
        var angle = Vector3.angle(viewDirection, lightDirection);
        if (angle == 0 || angle == Math.PI) {
            this.USM(renderer);
            return;
        }
        var sinGamma = Math.abs(Math.sin(angle));
        var up = this.computeUpVector(viewDirection, lightDirection);
        var lv = Matrix.lookAt(eyePosition, Vector3.add(eyePosition, lightDirection), up);
        var pl = new PointList(cam.frustumPoints);
        pl.transform(lv);
        var vfAABB = pl.getBoundingBox();
        var factor = 1 / sinGamma;
        var z_n = this.nearClip * factor;
        var d = Math.abs(vfAABB.pointRTN.Y - vfAABB.pointLBF.Y);
        var z_f = z_n * d * sinGamma;
        var n = (z_n + Math.sqrt(z_f * z_n)) / sinGamma;
        var f = n + d;
        var newPos = eyePosition.subtractWith(up.multiplyWith(n - this.nearClip));
        lv = Matrix.lookAt(newPos, Vector3.add(newPos, lightDirection), up);
        var lp = this.computePerspective(n, f);
        var lVP = Matrix.multiply(lp, this.shadowViewMatrixCache);
        var pl2 = new PointList(cam.frustumPoints);
        pl2.transform(lVP);
        var unitAABB = pl2.getBoundingBox();
        var unitCube = this.generateUnitCubeMatrix(unitAABB);
        glm.mat4.mul(this.shadowMatrixCache.rawElements, unitCube.rawElements, lp.rawElements);
    };
    DirectionalLight.prototype.generateLightviewMatrix = function (cam) {
        glm.mat4.lookAt(this.shadowViewMatrixCache.rawElements, cam.Transformer.GlobalPosition.rawElements, Vector3.add(cam.Transformer.GlobalPosition, this.transformer.forward).rawElements, Vector3.YUnit.rawElements);
    };
    DirectionalLight.prototype.USM = function (renderer) {
        var cam = renderer.Camera;
        var lightSpaceFrustum = (new PointList(cam.frustumPoints));
        lightSpaceFrustum.transform(this.shadowViewMatrixCache);
        var frustumAABBinLightSpace = lightSpaceFrustum.getBoundingBox();
        var debug = JThreeContext.getContextComponent(ContextComponents.Debugger);
        debug.setInfo("RTN", frustumAABBinLightSpace.pointRTN.toString());
        debug.setInfo("LBF", frustumAABBinLightSpace.pointLBF.toString());
        this.shadowProjectionMatrixCache = this.generateUnitCubeMatrix(frustumAABBinLightSpace);
        glm.mat4.mul(this.shadowMatrixCache.rawElements, this.shadowProjectionMatrixCache.rawElements, this.shadowViewMatrixCache.rawElements);
    };
    DirectionalLight.prototype.generateUnitCubeMatrix = function (align) {
        return Matrix.fromElements(2.0 / (align.pointRTN.X - align.pointLBF.X), 0, 0, -(align.pointRTN.X + align.pointLBF.X) / (align.pointRTN.X - align.pointLBF.X), 0, 2.0 / (align.pointRTN.Y - align.pointLBF.Y), 0, -(align.pointRTN.Y + align.pointLBF.Y) / (align.pointRTN.Y - align.pointLBF.Y), 0, 0, 2.0 / (align.pointRTN.Z - align.pointLBF.Z), (align.pointRTN.Z + align.pointLBF.Z) / (align.pointLBF.Z - align.pointRTN.Z), 0, 0, 0, 1.0);
    };
    Object.defineProperty(DirectionalLight.prototype, "LightType", {
        get: function () {
            return "jthree.lights.directionallight";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DirectionalLight, "TypeDefinition", {
        get: function () {
            return {
                typeName: "jthree.lights.directionallight",
                requiredParamCount: 3,
                shaderfuncName: "calcDirectionalLight",
                diffuseFragmentCode: require('../../Shaders/Light/Directional/DiffuseChunk.glsl'),
                specularFragmentCode: require('../../Shaders/Light/Directional/SpecularChunk.glsl')
            };
        },
        enumerable: true,
        configurable: true
    });
    return DirectionalLight;
})(ShadowDroppableLight);
module.exports = DirectionalLight;

},{"../../../ContextComponents":12,"../../../JThreeContext":226,"../../../Math/Matrix":229,"../../../Math/PointList":231,"../../../Math/Vector3":235,"../../Shaders/Light/Directional/DiffuseChunk.glsl":116,"../../Shaders/Light/Directional/SpecularChunk.glsl":117,"../ShadowMap/ShadowDroppableLight":41,"gl-matrix":299}],35:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LightBase = require('./../LightBase');
var Matrix = require("../../../Math/Matrix");
var PointLight = (function (_super) {
    __extends(PointLight, _super);
    function PointLight(scene) {
        _super.call(this, scene);
        this.distance = 0.0;
        this.intensity = 1.0;
        this.decay = 1;
    }
    Object.defineProperty(PointLight.prototype, "LightType", {
        get: function () {
            return "jthree.lights.pointlight";
        },
        enumerable: true,
        configurable: true
    });
    PointLight.prototype.getParameters = function (renderer) {
        var pos = this.Position;
        pos = Matrix.transformPoint(renderer.Camera.viewMatrix, pos);
        return [this.Color.R * this.intensity, this.Color.G * this.intensity, this.Color.B * this.intensity,
            pos.X, pos.Y, pos.Z, 0,
            this.distance, this.decay];
    };
    Object.defineProperty(PointLight, "TypeDefinition", {
        get: function () {
            return {
                typeName: "jthree.lights.pointlight",
                requiredParamCount: 3,
                shaderfuncName: "calcPointLight",
                diffuseFragmentCode: require('../../Shaders/Light/Point/DiffuseChunk.glsl'),
                specularFragmentCode: require("../../Shaders/Light/Point/SpecularChunk.glsl")
            };
        },
        enumerable: true,
        configurable: true
    });
    return PointLight;
})(LightBase);
module.exports = PointLight;

},{"../../../Math/Matrix":229,"../../Shaders/Light/Point/DiffuseChunk.glsl":119,"../../Shaders/Light/Point/SpecularChunk.glsl":120,"./../LightBase":38}],36:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Vector3 = require('../../../Math/Vector3');
var LightBase = require('./../LightBase');
var SceneLight = (function (_super) {
    __extends(SceneLight, _super);
    function SceneLight(scene) {
        _super.call(this, scene);
        this.intensity = 1.0;
    }
    SceneLight.prototype.getParameters = function (renderer) {
        return [this.Color.R * this.intensity, this.Color.G * this.intensity, this.Color.B * this.intensity];
    };
    SceneLight.prototype.calcAxis = function (x, y, z, bp) {
        return new Vector3(x + bp.X, y + bp.Y, -z + bp.Z);
    };
    Object.defineProperty(SceneLight.prototype, "LightType", {
        get: function () {
            return "jthree.lights.scenelight";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneLight, "TypeDefinition", {
        get: function () {
            return {
                typeName: "jthree.lights.scenelight",
                requiredParamCount: 1,
                shaderfuncName: "calcSceneLight",
                diffuseFragmentCode: require('../../Shaders/Light/Scene/DiffuseChunk.glsl'),
                specularFragmentCode: require('../../Shaders/Light/Scene/SpecularChunk.glsl')
            };
        },
        enumerable: true,
        configurable: true
    });
    return SceneLight;
})(LightBase);
module.exports = SceneLight;

},{"../../../Math/Vector3":235,"../../Shaders/Light/Scene/DiffuseChunk.glsl":121,"../../Shaders/Light/Scene/SpecularChunk.glsl":122,"./../LightBase":38}],37:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LightBase = require('./../LightBase');
var Matrix = require("../../../Math/Matrix");
var Vector3 = require("../../../Math/Vector3");
var SpotLight = (function (_super) {
    __extends(SpotLight, _super);
    function SpotLight(scene) {
        _super.call(this, scene);
        this.intensity = 1.0;
        this.decay = 1;
        this.inner = 0.3;
        this.outer = 0.7;
    }
    Object.defineProperty(SpotLight.prototype, "LightType", {
        get: function () {
            return "jthree.lights.spotlight";
        },
        enumerable: true,
        configurable: true
    });
    SpotLight.prototype.getParameters = function (renderer) {
        var pos;
        var matVM = Matrix.multiply(renderer.Camera.viewMatrix, this.Transformer.LocalToGlobal);
        pos = Matrix.transformPoint(matVM, Vector3.Zero);
        var dir = new Vector3(0, -1, 0);
        dir = Matrix.transformNormal(matVM, dir);
        return [this.Color.R * this.intensity, this.Color.G * this.intensity, this.Color.B * this.intensity,
            pos.X, pos.Y, pos.Z, 0,
            dir.X, dir.Y, dir.Z, 0,
            Math.cos(this.inner), Math.cos(this.outer), this.decay];
    };
    Object.defineProperty(SpotLight, "TypeDefinition", {
        get: function () {
            return {
                typeName: "jthree.lights.spotlight",
                requiredParamCount: 3,
                shaderfuncName: "calcSpotLight",
                diffuseFragmentCode: require('../../Shaders/Light/Spot/DiffuseChunk.glsl'),
                specularFragmentCode: require("../../Shaders/Light/Spot/SpecularChunk.glsl")
            };
        },
        enumerable: true,
        configurable: true
    });
    return SpotLight;
})(LightBase);
module.exports = SpotLight;

},{"../../../Math/Matrix":229,"../../../Math/Vector3":235,"../../Shaders/Light/Spot/DiffuseChunk.glsl":124,"../../Shaders/Light/Spot/SpecularChunk.glsl":125,"./../LightBase":38}],38:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Color4 = require('../../Base/Color/Color4');
var SceneObject = require('../SceneObject');
var JThreeEvent = require("../../Base/JThreeEvent");
var LightBase = (function (_super) {
    __extends(LightBase, _super);
    function LightBase(scene) {
        _super.call(this);
        this.parameterChanged = new JThreeEvent();
        this.color = new Color4(0, 0, 0, 0);
        this.scene = scene;
    }
    Object.defineProperty(LightBase.prototype, "Color", {
        get: function () {
            return this.color;
        },
        set: function (col) {
            this.color = col;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightBase.prototype, "Position", {
        get: function () {
            return this.Transformer.Position;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightBase.prototype, "LightType", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    LightBase.prototype.drawBuffer = function (renderer, scene, object, material, passCount) {
    };
    LightBase.prototype.beforeRender = function (target) {
    };
    LightBase.prototype.afterRender = function (target) {
    };
    LightBase.prototype.onParameterChanged = function (handler) {
        this.parameterChanged.addListener(handler);
    };
    LightBase.prototype.getParameters = function (renderer, shadowMapIndex) {
        return [];
    };
    LightBase.prototype.initializeLight = function () {
    };
    LightBase.prototype.onParentSceneChanged = function () {
        this.ParentScene.addLight(this);
    };
    return LightBase;
})(SceneObject);
module.exports = LightBase;

},{"../../Base/Color/Color4":4,"../../Base/JThreeEvent":6,"../SceneObject":108}],39:[function(require,module,exports){
var AssociativeArray = require("../../Base/Collections/AssociativeArray");
var InternalFormatType = require("../../Wrapper/TextureInternalFormatType");
var TextureType = require("../../Wrapper/TextureType");
var ShaderComposer = require("./LightShderComposer");
var ShaderType = require("../../Wrapper/ShaderType");
var Vector2 = require("../../Math/Vector2");
var DefaultLightTypeList = require("./DefaultLightTypeList");
var GLSpec = require("../GLSpecManager");
var ShadowMapResourceManager = require("./ShadowMap/ShadowMapResourceManager");
var JThreeContext = require("../../JThreeContext");
var ContextComponents = require("../../ContextComponents");
var LightRegister = (function () {
    function LightRegister(scene) {
        this.textureInputCount = 4;
        this.lightWorldMatricis = new Float32Array(this.shadowMapMax * 16);
        this.viewInvertedLightMatricis = new Float32Array(this.shadowMapMax * 16);
        this.shadowMaps = new Array(this.shadowMapMax);
        this.textureWidth = 5;
        this.lights = [];
        this.shadowDroppableLights = [];
        this.lightIdDictionary = new AssociativeArray();
        this.diffuseShaderComposer = new ShaderComposer(this.shaderHeader + require('../Shaders/Light/DiffuseLightFragment.glsl'), "diffuse", function (index, funcName) { return ("if(getLightType(int(i)) == " + index + ".)gl_FragColor.rgb+=" + funcName + "(position,normal,int(i),diffuse);\n"); });
        this.specularShaderComposer = new ShaderComposer(this.shaderHeader + require('../Shaders/Light/SpecularLightFragment.glsl'), "specular", function (index, funcName) { return ("if(getLightType(int(i)) == " + index + ".)gl_FragColor.rgb+=" + funcName + "(position,normal,int(i),specular,specularCoefficient);\n"); });
        this.shadowDroppableLightCount = 0;
        this.scene = scene;
        this.parameterTexture = (this.ResourceManager.createTexture(scene.ID + ".jthree.light.params", 1, 1, InternalFormatType.RGBA, TextureType.Float));
        this.parameterTexture.updateTexture(new Float32Array([1, 0, 1, 0]));
        this.initializeProgram();
        for (var i = 0; i < DefaultLightTypeList.length; i++) {
            var type = DefaultLightTypeList[i];
            this.addLightType(type.TypeDefinition);
        }
        this.shadowMapResourceManager = new ShadowMapResourceManager(this);
    }
    Object.defineProperty(LightRegister.prototype, "shadowMapMax", {
        get: function () {
            return GLSpec.MaxCombinedTextureUnits - this.textureInputCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightRegister.prototype, "shaderHeader", {
        get: function () {
            return "precision mediump float;\n      #define SHADOW_MAP_LENGTH " + this.shadowMapMax;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightRegister.prototype, "ShadowDroppableLightCount", {
        get: function () {
            return this.shadowDroppableLightCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightRegister.prototype, "TextureWidth", {
        get: function () {
            return this.textureWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightRegister.prototype, "TextureHeight", {
        get: function () {
            return this.lights.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightRegister.prototype, "TextureSize", {
        get: function () {
            return new Vector2(this.TextureWidth, this.TextureHeight);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightRegister.prototype, "ParameterTexture", {
        get: function () {
            return this.parameterTexture;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightRegister.prototype, "ResourceManager", {
        get: function () {
            return JThreeContext.getContextComponent(ContextComponents.ResourceManager);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightRegister.prototype, "DiffuseShaderCodeComposer", {
        get: function () {
            return this.diffuseShaderComposer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightRegister.prototype, "SpecularShaderCodeComposer", {
        get: function () {
            return this.specularShaderComposer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightRegister.prototype, "DiffuseLightProgram", {
        get: function () {
            return this.diffuseLightProgram;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightRegister.prototype, "SpecularLightProgram", {
        get: function () {
            return this.specularLightProgram;
        },
        enumerable: true,
        configurable: true
    });
    LightRegister.prototype.getSpecularShaderCodeComposer = function () {
        return this.specularLightProgram;
    };
    Object.defineProperty(LightRegister.prototype, "Lights", {
        get: function () {
            return this.lights;
        },
        enumerable: true,
        configurable: true
    });
    LightRegister.prototype.addLightType = function (ld) {
        this.diffuseShaderComposer.addLightType(ld.shaderfuncName, ld.diffuseFragmentCode, ld.typeName);
        this.specularShaderComposer.addLightType(ld.shaderfuncName, ld.specularFragmentCode, ld.typeName);
        var newSize = Math.max(ld.requiredParamCount, this.TextureHeight);
        if (newSize !== this.textureWidth) {
        }
    };
    LightRegister.prototype.addLight = function (light) {
        this.lights.push(light);
        this.lightIdDictionary.set(light.ID, this.lights.length - 1);
        this.heightUpdate(0);
    };
    LightRegister.prototype.heightUpdate = function (start) {
        var newBuffer = new Float32Array(4 * this.TextureWidth * this.lights.length);
        for (var i = 0; i < start * 4 * this.TextureWidth; i++) {
            newBuffer[i] = 0;
        }
        this.textureSourceBuffer = newBuffer;
        this.parameterTexture.resize(this.TextureWidth, this.TextureHeight);
        this.parameterTexture.updateTexture(this.textureSourceBuffer);
    };
    LightRegister.prototype.widthUpdate = function () {
        this.heightUpdate(0);
    };
    LightRegister.prototype.lightUpdate = function (light, renderer) {
        var index = this.lightIdDictionary.get(light.ID);
        var parameters = light.getParameters(renderer, this.shadowDroppableLightCount);
        var baseIndex = index * 4 * this.TextureWidth + 1;
        var endIndex = baseIndex + parameters.length;
        this.textureSourceBuffer[baseIndex - 1] = this.diffuseShaderComposer.getLightTypeId(light);
        for (var i = baseIndex; i < endIndex; i++) {
            this.textureSourceBuffer[i] = parameters[i - baseIndex];
        }
        for (var i = endIndex; i < baseIndex + 4 * this.TextureWidth; i++) {
            this.textureSourceBuffer[i] = 0;
        }
    };
    LightRegister.prototype.updateLightForRenderer = function (renderer) {
        this.shadowDroppableLightCount = 0;
        for (var i = 0; i < this.Lights.length; i++) {
            this.lightUpdate(this.Lights[i], renderer);
            if (this.Lights[i].isShadowDroppable) {
                this.shadowDroppableLights[this.shadowDroppableLightCount] = this.Lights[i];
                this.shadowDroppableLightCount++;
            }
        }
        for (var i = this.shadowDroppableLightCount; i < this.shadowDroppableLights.length; i++) {
            this.shadowDroppableLights[i] = null;
        }
        this.parameterTexture.updateTexture(this.textureSourceBuffer);
        this.shadowMapResourceManager.updateLightMatricis(renderer, this.shadowDroppableLights);
    };
    LightRegister.prototype.initializeProgram = function () {
        var vs = require('../Shaders/Light/LightVertex.glsl');
        var vShader = this.ResourceManager.createShader("jthree.shaders.vertex.post", vs, ShaderType.VertexShader);
        vShader.loadAll();
        this.diffuseLightProgram = this.ResourceManager.createProgram(this.scene.ID + ".jthree.programs.light.diffuse", [vShader, this.DiffuseShaderCodeComposer.Shader]);
        this.specularLightProgram = this.ResourceManager.createProgram(this.scene.ID + ".jthree.programs.light.specular", [vShader, this.SpecularShaderCodeComposer.Shader]);
    };
    return LightRegister;
})();
module.exports = LightRegister;

},{"../../Base/Collections/AssociativeArray":2,"../../ContextComponents":12,"../../JThreeContext":226,"../../Math/Vector2":234,"../../Wrapper/ShaderType":286,"../../Wrapper/TextureInternalFormatType":295,"../../Wrapper/TextureType":296,"../GLSpecManager":24,"../Shaders/Light/DiffuseLightFragment.glsl":115,"../Shaders/Light/LightVertex.glsl":118,"../Shaders/Light/SpecularLightFragment.glsl":123,"./DefaultLightTypeList":32,"./LightShderComposer":40,"./ShadowMap/ShadowMapResourceManager":42}],40:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AssociativeArray = require("../../Base/Collections/AssociativeArray");
var JThreeObjectWithId = require("../../Base/JThreeObjectWithID");
var ShaderType = require("../../Wrapper/ShaderType");
var ContextComponents = require("../../ContextComponents");
var JThreeContext = require("../../JThreeContext");
var JThreeLogger = require("../../Base/JThreeLogger");
var LightShaderComposer = (function (_super) {
    __extends(LightShaderComposer, _super);
    function LightShaderComposer(codeBase, idSuffix, callerComposer) {
        _super.call(this);
        this.lightTypeIdArray = new AssociativeArray();
        this.shaderFuncNames = [];
        this.shaderFuncDefs = [];
        this.shaderSourceBase = codeBase;
        this.callerComposer = callerComposer;
        this.shaderCache = this.generateLightShaderSource();
        this.resourceManager = JThreeContext.getContextComponent(ContextComponents.ResourceManager);
        this.shader = this.resourceManager.createShader(this.ID + ".jthree.light." + idSuffix, "", ShaderType.FragmentShader);
    }
    Object.defineProperty(LightShaderComposer.prototype, "Shader", {
        get: function () {
            return this.shader;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightShaderComposer.prototype, "ShaderCode", {
        get: function () {
            return this.shaderCache;
        },
        enumerable: true,
        configurable: true
    });
    LightShaderComposer.prototype.getLightTypeId = function (light) {
        return this.lightTypeIdArray.has(light.LightType) ?
            this.lightTypeIdArray.get(light.LightType) : 0;
    };
    LightShaderComposer.prototype.addLightType = function (shaderFuncName, shaderFuncCode, lightTypeName) {
        if (this.lightTypeIdArray.has(lightTypeName)) {
            console.warn("already this light type was added.");
            return;
        }
        else {
            this.lightTypeIdArray.set(lightTypeName, this.lightTypeIdArray.size + 1);
        }
        this.shaderFuncDefs.push(shaderFuncCode);
        this.shaderFuncNames.push(shaderFuncName);
        this.shaderCache = this.generateLightShaderSource();
        this.updateShaderFromCache();
        JThreeLogger.sectionLongLog("Generated source", this.shaderCache);
    };
    LightShaderComposer.prototype.generateLightShaderSource = function () {
        var result = this.shaderSourceBase;
        result = result.replace('///<<< LIGHT FUNCTION DEFINITIONS', this.generateLightFunctionDefinitions());
        result = result.replace('///<<< LIGHT FUNCTION CALLS', this.generateLightFunctionCallers());
        return result;
    };
    LightShaderComposer.prototype.generateLightFunctionDefinitions = function () {
        var result = "";
        for (var i = 0; i < this.shaderFuncDefs.length; i++) {
            result += this.shaderFuncDefs[i];
        }
        return result;
    };
    LightShaderComposer.prototype.generateLightFunctionCallers = function () {
        var result = "";
        for (var i = 0; i < this.shaderFuncNames.length; i++) {
            result += this.callerComposer((i + 1).toFixed(0), this.shaderFuncNames[i]);
        }
        return result;
    };
    LightShaderComposer.prototype.updateShaderFromCache = function () {
        this.Shader.update(this.ShaderCode);
    };
    return LightShaderComposer;
})(JThreeObjectWithId);
module.exports = LightShaderComposer;

},{"../../Base/Collections/AssociativeArray":2,"../../Base/JThreeLogger":8,"../../Base/JThreeObjectWithID":10,"../../ContextComponents":12,"../../JThreeContext":226,"../../Wrapper/ShaderType":286}],41:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LightBase = require('./../LightBase');
var Matrix = require('../../../Math/Matrix');
var ShadowDroppableLight = (function (_super) {
    __extends(ShadowDroppableLight, _super);
    function ShadowDroppableLight(scene) {
        _super.call(this, scene);
        this.matLightViewProjection = Matrix.identity();
        this.isShadowDroppable = true;
    }
    ShadowDroppableLight.prototype.updateLightMatricis = function (renderer) {
    };
    ShadowDroppableLight.prototype.updateLightProjection = function (renderer, shadowMatrix) {
        this.matLightViewProjection = shadowMatrix;
    };
    return ShadowDroppableLight;
})(LightBase);
module.exports = ShadowDroppableLight;

},{"../../../Math/Matrix":229,"./../LightBase":38}],42:[function(require,module,exports){
var TextureInternalFormatType = require("../../../Wrapper/TextureInternalFormatType");
var TextureType = require("../../../Wrapper/TextureType");
var JThreeContext = require("../../../JThreeContext");
var ContextComponents = require("../../../ContextComponents");
var ShadowMapResourceManager = (function () {
    function ShadowMapResourceManager(register) {
        this.shadowMapSizeCache = 512;
        this.shadowMapTileHeight = 2;
        var rm = JThreeContext.getContextComponent(ContextComponents.ResourceManager);
        this.shadowMapTileTexture = rm.createTexture("shadowmap." + register.scene.ID, this.shadowMapTileTextureSize, this.shadowMapTileTextureSize, TextureInternalFormatType.RGB, TextureType.UnsignedByte);
        this.shadowMatrixTextureSource = new Float32Array(this.maximumShadowMapCount * 2 * 16);
        this.shadowMatrixTexture = rm.createTexture("shadowmat." + register.scene.ID, 8, this.maximumShadowMapCount, TextureInternalFormatType.RGBA, TextureType.Float);
        this.shadowMapRenderBuffer = rm.createRBO("shadowmap." + register.scene.ID, this.shadowMapTileTextureSize, this.shadowMapTileTextureSize);
    }
    Object.defineProperty(ShadowMapResourceManager.prototype, "shadowMapSize", {
        get: function () {
            return this.shadowMapSizeCache;
        },
        set: function (size) {
            this.shadowMapSizeCache = size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShadowMapResourceManager.prototype, "maximumShadowMapCount", {
        get: function () {
            return this.shadowMapTileHeight * this.shadowMapTileHeight;
        },
        set: function (count) {
            this.shadowMapTileHeight = Math.ceil(Math.sqrt(count));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShadowMapResourceManager.prototype, "shadowMapTileTextureSize", {
        get: function () {
            return this.shadowMapTileHeight * this.shadowMapSizeCache;
        },
        enumerable: true,
        configurable: true
    });
    ShadowMapResourceManager.prototype.setShadowMapViewport = function (renderer, shadowMapIndex) {
        var x = shadowMapIndex % this.shadowMapTileHeight;
        var y = (shadowMapIndex - x) / this.shadowMapTileHeight;
        renderer.GL.viewport(x * this.shadowMapSizeCache, y * this.shadowMapSizeCache, this.shadowMapSizeCache, this.shadowMapSizeCache);
    };
    ShadowMapResourceManager.prototype.updateLightMatricis = function (renderer, lights) {
        for (var i = 0; i < Math.min(lights.length, this.maximumShadowMapCount); i++) {
            var light = lights[i];
            if (!light)
                break;
            light.updateLightMatricis(renderer);
            this.copyMatrixToLightMatrixTextureSource(light.matLightViewProjection, 48 * i);
            this.generateTextureTransformMatrix(48 * i + 16, i);
        }
        this.shadowMatrixTexture.updateTexture(this.shadowMatrixTextureSource);
    };
    ShadowMapResourceManager.prototype.copyMatrixToLightMatrixTextureSource = function (data, offset) {
        for (var i = 0; i < 16; i++) {
            this.shadowMatrixTextureSource[offset + i] = data.rawElements[i];
        }
    };
    ShadowMapResourceManager.prototype.generateTextureTransformMatrix = function (offset, index) {
        var x = index % this.shadowMapTileHeight;
        var y = (index - x) / this.shadowMapTileHeight;
        var sizeTransform = 1 / (2 * this.shadowMapTileHeight);
        this.shadowMatrixTextureSource[offset + 0] = sizeTransform;
        this.shadowMatrixTextureSource[offset + 1] = 0;
        this.shadowMatrixTextureSource[offset + 2] = 0;
        this.shadowMatrixTextureSource[offset + 3] = 0;
        this.shadowMatrixTextureSource[offset + 4] = 0;
        this.shadowMatrixTextureSource[offset + 5] = sizeTransform;
        this.shadowMatrixTextureSource[offset + 6] = 0;
        this.shadowMatrixTextureSource[offset + 7] = 0;
        this.shadowMatrixTextureSource[offset + 8] = 0;
        this.shadowMatrixTextureSource[offset + 9] = 0;
        this.shadowMatrixTextureSource[offset + 10] = 1;
        this.shadowMatrixTextureSource[offset + 11] = 0;
        this.shadowMatrixTextureSource[offset + 12] = sizeTransform * (2 * x + 1);
        this.shadowMatrixTextureSource[offset + 13] = sizeTransform * (2 * y + 1);
        this.shadowMatrixTextureSource[offset + 14] = 0;
        this.shadowMatrixTextureSource[offset + 15] = 1;
    };
    return ShadowMapResourceManager;
})();
module.exports = ShadowMapResourceManager;

},{"../../../ContextComponents":12,"../../../JThreeContext":226,"../../../Wrapper/TextureInternalFormatType":295,"../../../Wrapper/TextureType":296}],43:[function(require,module,exports){
var ListStateChangedType;
(function (ListStateChangedType) {
    ListStateChangedType[ListStateChangedType["Add"] = 0] = "Add";
    ListStateChangedType[ListStateChangedType["Delete"] = 1] = "Delete";
})(ListStateChangedType || (ListStateChangedType = {}));
module.exports = ListStateChangedType;

},{}],44:[function(require,module,exports){
var ContextComponents = require("../ContextComponents");
var LoopManager = (function () {
    function LoopManager() {
        var _this = this;
        this._loopActions = [];
        this._registerNextLoop =
            window.requestAnimationFrame
                ?
                    function () {
                        window.requestAnimationFrame(_this._loop.bind(_this));
                    }
                :
                    function () {
                        window.setTimeout(_this._loop.bind(_this), 1000 / 60);
                    };
    }
    LoopManager.prototype.getContextComponentIndex = function () {
        return ContextComponents.LoopManager;
    };
    LoopManager.prototype.begin = function () {
        this._loop();
    };
    LoopManager.prototype.addAction = function (order, action) {
        this._loopActions.push({
            order: order,
            action: action
        });
        this._loopActions.sort(function (a1, a2) { return a1.order - a2.order; });
    };
    LoopManager.prototype._loop = function () {
        this._loopActions.forEach(function (act) {
            act.action();
        });
        this._registerNextLoop();
    };
    return LoopManager;
})();
module.exports = LoopManager;

},{"../ContextComponents":12}],45:[function(require,module,exports){
var ContextComponents = require("../../../ContextComponents");
var MaterialManager = (function () {
    function MaterialManager() {
        this._shaderChunks = {};
        this.addShaderChunk("jthree.builtin.vertex", require("../BuiltIn/Vertex/_BasicVertexTransform.glsl"));
    }
    MaterialManager.prototype.getContextComponentIndex = function () {
        return ContextComponents.MaterialManager;
    };
    MaterialManager.prototype.addShaderChunk = function (key, val) {
        this._shaderChunks[key] = val;
    };
    MaterialManager.prototype.getShaderChunk = function (key) {
        return this._shaderChunks[key];
    };
    return MaterialManager;
})();
module.exports = MaterialManager;

},{"../../../ContextComponents":12,"../BuiltIn/Vertex/_BasicVertexTransform.glsl":50}],46:[function(require,module,exports){
var ContextComponents = require("../../../ContextComponents");
var JThreeContext = require("../../../JThreeContext");
var ShaderProgramParser = (function () {
    function ShaderProgramParser() {
    }
    ShaderProgramParser.parseCombined = function (combined, vsfunc, fsfunc) {
        var materialManager = JThreeContext.getContextComponent(ContextComponents.MaterialManager);
        var result = ShaderProgramParser.parseImport(combined, materialManager);
        var flagment = ShaderProgramParser.removeOtherPartCode(result, "vertonly");
        var vertex = ShaderProgramParser.removeOtherPartCode(result, "fragonly");
        debugger;
        return result;
    };
    ShaderProgramParser.parseImport = function (source, materialManager) {
        while (true) {
            var regexResult = /\s*\/\/+\s*@import\s+([a-zA-Z0-9.-]+)/.exec(source);
            if (!regexResult)
                break;
            var importContent;
            importContent = materialManager.getShaderChunk(regexResult[1]);
            if (!importContent) {
                console.error("Required shader chunk '" + regexResult[1] + "' was not found!!");
                importContent = "";
            }
            var source = source.replace(regexResult[0], importContent);
        }
        return source;
    };
    ShaderProgramParser.removeOtherPartCode = function (source, partFlag) {
        var regex = new RegExp("s*//+s*@" + partFlag);
        while (true) {
            var found = regex.exec(source);
            if (!found)
                break;
            var beginPoint = found.index;
            var index = beginPoint;
            while (true) {
                index++;
                if (source[index] == '{')
                    break;
            }
            var bracketCount = 1;
            while (true) {
                index++;
                if (index == source.length) {
                    console.error("Invalid bracket matching!");
                    return source;
                }
                if (source[index] == '{')
                    bracketCount++;
                if (source[index] == '}')
                    bracketCount--;
                if (bracketCount == 0)
                    break;
            }
            var endPoint = index + 1;
            source = source.substr(0, beginPoint) + source.substring(endPoint, source.length);
        }
        return source;
    };
    return ShaderProgramParser;
})();
module.exports = ShaderProgramParser;

},{"../../../ContextComponents":12,"../../../JThreeContext":226}],47:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Material = require("./../Material");
var Vector3 = require("../../../Math/Vector3");
var Matrix = require("../../../Math/Matrix");
var Vector4 = require("../../../Math/Vector4");
var GBufferMaterial = (function (_super) {
    __extends(GBufferMaterial, _super);
    function GBufferMaterial() {
        _super.call(this);
        var vs = require('../../Shaders/GBuffer/Vertex.glsl');
        var fs = require('../../Shaders/GBuffer/PrimaryFragment.glsl');
        this.primaryProgram = this.loadProgram("jthree.shaders.gbuffer.primary.vs", "jthree.shaders.gbuffer.primary.fs", "jthree.programs.gbuffer.primary", vs, fs);
        var fs = require('../../Shaders/GBuffer/SecoundaryFragment.glsl');
        this.secoundaryProgram = this.loadProgram("jthree.shaders.gbuffer.secoundary.vs", "jthree.shaders.gbuffer.secoundary.fs", "jthree.programs.gbuffer.secoundary", vs, fs);
        var fs = require('../../Shaders/GBuffer/ThirdFragment.glsl');
        this.thirdProgram = this.loadProgram("jthree.shaders.gbuffer.third.vs", "jthree.shaders.gbuffer.third.fs", "jthree.programs.gbuffer.third", vs, fs);
        this.setLoaded();
    }
    Object.defineProperty(GBufferMaterial.prototype, "MaterialGroup", {
        get: function () {
            return "jthree.materials.gbuffer";
        },
        enumerable: true,
        configurable: true
    });
    GBufferMaterial.prototype.configureMaterial = function (scene, renderStage, object, texs, techniqueIndex, passIndex) {
        if (!this.primaryProgram)
            return;
        var renderer = renderStage.Renderer;
        _super.prototype.configureMaterial.call(this, scene, renderStage, object, texs, techniqueIndex, passIndex);
        switch (techniqueIndex) {
            case 0:
                this.configurePrimaryBuffer(scene, renderer, object, texs);
                break;
            case 1:
                this.configureSecoundaryBuffer(scene, renderer, object, texs);
                break;
            case 2:
                this.configureThirdBuffer(scene, renderer, object, texs);
                break;
        }
        object.Geometry.IndexBuffer.getForContext(renderer.ContextManager).bindBuffer();
    };
    GBufferMaterial.prototype.configurePrimaryBuffer = function (scene, renderer, object, texs) {
        var geometry = object.Geometry;
        var pw = this.primaryProgram.getForContext(renderer.ContextManager);
        var v = object.Transformer.calculateMVPMatrix(renderer);
        var fm = object.getMaterial("jthree.materials.forematerial");
        var coefficient = 0;
        if (fm.specularCoefficient)
            coefficient = fm.specularCoefficient;
        pw.register({
            attributes: {
                position: geometry.PositionBuffer,
                normal: geometry.NormalBuffer,
                uv: geometry.UVBuffer
            },
            uniforms: {
                matMVP: { type: "matrix", value: v },
                matMV: { type: "matrix", value: Matrix.multiply(renderer.Camera.viewMatrix, object.Transformer.LocalToGlobal) },
                specularCoefficient: {
                    type: "float",
                    value: coefficient
                }
            }
        });
    };
    GBufferMaterial.prototype.configureSecoundaryBuffer = function (scene, renderer, object, texs) {
        var geometry = object.Geometry;
        var programWrapper = this.secoundaryProgram.getForContext(renderer.ContextManager);
        var fm = object.getMaterial("jthree.materials.forematerial");
        var albedo;
        if (fm && fm.diffuse) {
            albedo = fm.diffuse.toVector();
        }
        else {
            albedo = new Vector4(1, 0, 0, 1);
        }
        var v = object.Transformer.calculateMVPMatrix(renderer);
        programWrapper.register({
            attributes: {
                position: geometry.PositionBuffer,
                normal: geometry.NormalBuffer,
                uv: geometry.UVBuffer
            },
            uniforms: {
                matMVP: {
                    type: "matrix",
                    value: v
                },
                matMV: {
                    type: "matrix",
                    value: Matrix.multiply(renderer.Camera.viewMatrix, object.Transformer.LocalToGlobal)
                },
                albedo: {
                    type: "vector",
                    value: albedo
                },
                texture: {
                    type: "texture",
                    value: fm.texture,
                    register: 0
                },
                textureUsed: {
                    type: "integer",
                    value: (fm.texture ? 1 : 0)
                }
            }
        });
    };
    GBufferMaterial.prototype.configureThirdBuffer = function (scene, renderer, object, texs) {
        var geometry = object.Geometry;
        var programWrapper = this.thirdProgram.getForContext(renderer.ContextManager);
        var fm = object.getMaterial("jthree.materials.forematerial");
        var specular;
        if (fm && fm.diffuse) {
            specular = fm.specular.toVector();
        }
        else {
            specular = new Vector3(1, 0, 0);
        }
        var v = object.Transformer.calculateMVPMatrix(renderer);
        programWrapper.register({
            attributes: {
                position: geometry.PositionBuffer,
                normal: geometry.NormalBuffer,
                uv: geometry.UVBuffer
            },
            uniforms: {
                matMVP: {
                    type: "matrix",
                    value: v
                },
                matMV: {
                    type: "matrix",
                    value: Matrix.multiply(renderer.Camera.viewMatrix, object.Transformer.LocalToGlobal)
                },
                specular: {
                    type: "vector",
                    value: specular
                },
            }
        });
    };
    GBufferMaterial.prototype.getMaterialConfig = function (pass, technique) {
        if (technique == 0) {
            return {
                blend: false,
                cull: "ccw"
            };
        }
        if (technique == 1) {
            return {
                cull: "ccw",
                blend: true
            };
        }
        else {
            return {
                cull: "ccw",
                blend: false
            };
        }
    };
    return GBufferMaterial;
})(Material);
module.exports = GBufferMaterial;

},{"../../../Math/Matrix":229,"../../../Math/Vector3":235,"../../../Math/Vector4":236,"../../Shaders/GBuffer/PrimaryFragment.glsl":109,"../../Shaders/GBuffer/SecoundaryFragment.glsl":110,"../../Shaders/GBuffer/ThirdFragment.glsl":111,"../../Shaders/GBuffer/Vertex.glsl":112,"./../Material":54}],48:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Material = require("./../Material");
var Matrix = require("../../../Math/Matrix");
var Vector4 = require("../../../Math/Vector4");
var HitTestMaterial = (function (_super) {
    __extends(HitTestMaterial, _super);
    function HitTestMaterial() {
        _super.call(this);
        var vs = require('../../Shaders/VertexShaders/BasicGeometries.glsl');
        var fs = require('../../Shaders/SolidColor.glsl');
        this.program = this.loadProgram("jthree.shaders.vertex.basic", "jthree.shaders.fragment.solidcolor", "jthree.programs.solidcolor", vs, fs);
        this.setLoaded();
    }
    HitTestMaterial.prototype.configureMaterial = function (scene, renderStage, object, texs, techniqueIndex, passIndex) {
        var renderer = renderStage.Renderer;
        _super.prototype.configureMaterial.call(this, scene, renderStage, object, texs, techniqueIndex, passIndex);
        var r = 0xFF00 & renderStage.___objectIndex;
        var g = 0x00FF & renderStage.___objectIndex;
        var geometry = object.Geometry;
        var programWrapper = this.program.getForContext(renderer.ContextManager);
        var v = object.Transformer.calculateMVPMatrix(renderer);
        programWrapper.register({
            attributes: {
                position: geometry.PositionBuffer,
                normal: geometry.NormalBuffer
            },
            uniforms: {
                matMVP: { type: "matrix", value: v },
                matMV: { type: "matrix", value: Matrix.multiply(renderer.Camera.viewMatrix, object.Transformer.LocalToGlobal) },
                u_color: { type: "vector", value: new Vector4(r / 0xFF, g / 0xFF, 0, 1) }
            }
        });
        geometry.IndexBuffer.getForContext(renderer.ContextManager).bindBuffer();
    };
    HitTestMaterial.prototype.getMaterialConfig = function (pass, technique) {
        return {
            cull: "ccw",
            blend: false
        };
    };
    Object.defineProperty(HitTestMaterial.prototype, "MaterialGroup", {
        get: function () {
            return "jthree.materials.hitarea";
        },
        enumerable: true,
        configurable: true
    });
    return HitTestMaterial;
})(Material);
module.exports = HitTestMaterial;

},{"../../../Math/Matrix":229,"../../../Math/Vector4":236,"../../Shaders/SolidColor.glsl":130,"../../Shaders/VertexShaders/BasicGeometries.glsl":132,"./../Material":54}],49:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Material = require("./../Material");
var Matrix = require("../../../Math/Matrix");
var ShadowMapMaterial = (function (_super) {
    __extends(ShadowMapMaterial, _super);
    function ShadowMapMaterial() {
        _super.call(this);
        var vs = require('../../Shaders/Shadow/ShadowMapVertex.glsl');
        var fs = require('../../Shaders/Shadow/ShadowMapFragment.glsl');
        this.program = this.loadProgram("jthree.shaders.vertex.shadowmap", "jthree.shaders.fragment.shadowmap", "jthree.programs.shadowmap", vs, fs);
        this.setLoaded();
    }
    Object.defineProperty(ShadowMapMaterial.prototype, "MaterialGroup", {
        get: function () {
            return "jthree.materials.shadowmap";
        },
        enumerable: true,
        configurable: true
    });
    ShadowMapMaterial.prototype.configureMaterial = function (scene, renderStage, object, texs, techniqueIndex, passIndex) {
        var renderer = renderStage.Renderer;
        _super.prototype.configureMaterial.call(this, scene, renderStage, object, texs, techniqueIndex, passIndex);
        var light = scene.LightRegister.shadowDroppableLights[techniqueIndex];
        var geometry = object.Geometry;
        var matPLW = Matrix.multiply(light.matLightViewProjection, object.Transformer.LocalToGlobal);
        this.program.getForContext(renderer.ContextManager).register({
            attributes: {
                position: geometry.PositionBuffer
            },
            uniforms: {
                matPLW: { type: "matrix", value: matPLW }
            }
        });
        geometry.bindIndexBuffer(renderer.ContextManager);
    };
    ShadowMapMaterial.prototype.getMaterialConfig = function (pass, technique) {
        return {
            cull: "ccw",
            blend: false
        };
    };
    return ShadowMapMaterial;
})(Material);
module.exports = ShadowMapMaterial;

},{"../../../Math/Matrix":229,"../../Shaders/Shadow/ShadowMapFragment.glsl":127,"../../Shaders/Shadow/ShadowMapVertex.glsl":128,"./../Material":54}],50:[function(require,module,exports){
module.exports = "struct BasicVertexTransformOutput\n{\n  vec4 position;\n  vec3 normal;\n  vec2 uv;\n};\n\nBasicVertexTransformOutput basicVertexTransform(vec3 position,vec3 normal,vec2 uv,mat4 mvp,mat4 mv){\n  return BasicVertexTransformOutput(mvp*vec4(position,1.0),normalize((mv*vec4(normal,0)).xyz),uv);\n}\n"
},{}],51:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Material = require("./../Material");
var Matrix = require("../../../Math/Matrix");
var Color4 = require("../../../Base/Color/Color4");
var Color3 = require('../../../Base/Color/Color3');
var PhongMaterial = (function (_super) {
    __extends(PhongMaterial, _super);
    function PhongMaterial() {
        _super.call(this);
        this.diffuse = Color4.parseColor('#F0F');
        this.ambient = Color4.parseColor('#F0F');
        this.specular = Color3.parseColor('#F0F');
        this.specularCoefficient = 10;
        this.texture = null;
        var vs = require('../../Shaders/VertexShaders/BasicGeometries.glsl');
        var fs = require('../../Shaders/Phong.glsl');
        this.program = this.loadProgram("jthree.shaders.vertex.basic", "jthree.shaders.fragment.phong", "jthree.programs.phong", vs, fs);
        this.setLoaded();
    }
    PhongMaterial.prototype.configureMaterial = function (scene, renderStage, object, texs, techniqueIndex, passIndex) {
        if (!this.program)
            return;
        _super.prototype.configureMaterial.call(this, scene, renderStage, object, texs, techniqueIndex, passIndex);
        var renderer = renderStage.Renderer;
        var geometry = object.Geometry;
        var pw = this.program.getForContext(renderer.ContextManager);
        var v = object.Transformer.calculateMVPMatrix(renderer);
        pw.register({
            attributes: {
                position: geometry.PositionBuffer,
                normal: geometry.NormalBuffer,
                uv: geometry.UVBuffer
            },
            uniforms: {
                matMVP: { type: "matrix", value: v },
                matV: { type: "matrix", value: renderer.Camera.viewMatrix },
                matMV: { type: "matrix", value: Matrix.multiply(renderer.Camera.viewMatrix, object.Transformer.LocalToGlobal) },
                texture: { type: "texture", register: 0, value: this.texture },
                dlight: { type: "texture", register: 1, value: texs["DLIGHT"] },
                slight: { type: "texture", register: 2, value: texs["SLIGHT"] },
                ambient: { type: "vector", value: this.ambient.toVector() },
                diffuse: { type: "vector", value: this.diffuse.toVector() },
                specular: { type: "vector", value: this.specular.toVector4(this.specularCoefficient) },
                textureUsed: { type: "integer", value: (this.texture != null) ? 1 : 0 },
                ambientCoefficient: { type: "vector", value: scene.sceneAmbient.toVector() }
            }
        });
        geometry.IndexBuffer.getForContext(renderer.ContextManager).bindBuffer();
    };
    return PhongMaterial;
})(Material);
module.exports = PhongMaterial;

},{"../../../Base/Color/Color3":3,"../../../Base/Color/Color4":4,"../../../Math/Matrix":229,"../../Shaders/Phong.glsl":126,"../../Shaders/VertexShaders/BasicGeometries.glsl":132,"./../Material":54}],52:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Material = require("./../Material");
var Matrix = require("../../../Math/Matrix");
var Color4 = require("../../../Base/Color/Color4");
var SolidColorMaterial = (function (_super) {
    __extends(SolidColorMaterial, _super);
    function SolidColorMaterial() {
        _super.call(this);
        this.color = Color4.parseColor('#F0F');
        var vs = require('../../Shaders/VertexShaders/BasicGeometries.glsl');
        var fs = require('../../Shaders/SolidColor.glsl');
        this.program = this.loadProgram("jthree.shaders.vertex.basic", "jthree.shaders.fragment.solidcolor", "jthree.programs.solidcolor", vs, fs);
        this.setLoaded();
    }
    Object.defineProperty(SolidColorMaterial.prototype, "Color", {
        get: function () {
            return this.color;
        },
        set: function (col) {
            this.color = col;
        },
        enumerable: true,
        configurable: true
    });
    SolidColorMaterial.prototype.configureMaterial = function (scene, renderStage, object, texs, techniqueIndex, passIndex) {
        var renderer = renderStage.Renderer;
        _super.prototype.configureMaterial.call(this, scene, renderStage, object, texs, techniqueIndex, passIndex);
        var geometry = object.Geometry;
        var programWrapper = this.program.getForContext(renderer.ContextManager);
        var v = object.Transformer.calculateMVPMatrix(renderer);
        programWrapper.register({
            attributes: {
                position: geometry.PositionBuffer,
                normal: geometry.NormalBuffer
            },
            uniforms: {
                matMVP: { type: "matrix", value: v },
                matMV: { type: "matrix", value: Matrix.multiply(renderer.Camera.viewMatrix, object.Transformer.LocalToGlobal) },
                u_color: { type: "vector", value: this.Color.toVector() }
            }
        });
        geometry.IndexBuffer.getForContext(renderer.ContextManager).bindBuffer();
    };
    return SolidColorMaterial;
})(Material);
module.exports = SolidColorMaterial;

},{"../../../Base/Color/Color4":4,"../../../Math/Matrix":229,"../../Shaders/SolidColor.glsl":130,"../../Shaders/VertexShaders/BasicGeometries.glsl":132,"./../Material":54}],53:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Material = require("./../Material");
var Matrix = require("../../../Math/Matrix");
var SpriteMaterial = (function (_super) {
    __extends(SpriteMaterial, _super);
    function SpriteMaterial() {
        _super.call(this);
        this.ctR = 0;
        this.ctG = 1;
        this.ctB = 2;
        this.ctA = 3;
        var vs = require('../../Shaders/VertexShaders/BasicGeometries.glsl');
        var fs = require('../../Shaders/Sprite.glsl');
        this.program = this.loadProgram("jthree.shaders.vertex.basic", "jthree.shaders.fragment.sprite", "jthree.programs.sprite", vs, fs);
        this.setLoaded();
    }
    SpriteMaterial.prototype.configureMaterial = function (scene, renderStage, object, texs, techniqueIndex, passIndex) {
        var renderer = renderStage.Renderer;
        _super.prototype.configureMaterial.call(this, scene, renderStage, object, texs, techniqueIndex, passIndex);
        var geometry = object.Geometry;
        var programWrapper = this.program.getForContext(renderer.ContextManager);
        var v = object.Transformer.calculateMVPMatrix(renderer);
        var ctM = Matrix.zero();
        if (this.ctR < 4)
            ctM.setAt(0, this.ctR, 1);
        if (this.ctG < 4)
            ctM.setAt(1, this.ctG, 1);
        if (this.ctB < 4)
            ctM.setAt(2, this.ctB, 1);
        if (this.ctA < 4)
            ctM.setAt(3, this.ctA, 1);
        programWrapper.register({
            attributes: {
                position: geometry.PositionBuffer,
                normal: geometry.NormalBuffer,
                uv: geometry.UVBuffer
            }, uniforms: {
                matMVP: { type: "matrix", value: v },
                matV: { type: "matrix", value: renderer.Camera.viewMatrix },
                matMV: { type: "matrix", value: Matrix.multiply(renderer.Camera.viewMatrix, object.Transformer.LocalToGlobal) },
                u_sampler: { type: "texture", register: 0, value: this.texture },
                additionA: { type: "integer", value: this.ctA < 4 ? 0 : 1 },
                ctM: { type: "matrix", value: ctM }
            }
        });
        geometry.bindIndexBuffer(renderer.ContextManager);
    };
    return SpriteMaterial;
})(Material);
module.exports = SpriteMaterial;

},{"../../../Math/Matrix":229,"../../Shaders/Sprite.glsl":131,"../../Shaders/VertexShaders/BasicGeometries.glsl":132,"./../Material":54}],54:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JThreeObjectWithID = require("../../Base/JThreeObjectWithID");
var ShaderType = require("../../Wrapper/ShaderType");
var JThreeContext = require("../../JThreeContext");
var ContextComponents = require("../../ContextComponents");
var Material = (function (_super) {
    __extends(Material, _super);
    function Material() {
        _super.call(this);
        this.initialized = false;
    }
    Material.prototype.setLoaded = function (flag) {
        flag = typeof flag === 'undefined' ? true : flag;
        this.initialized = flag;
    };
    Object.defineProperty(Material.prototype, "Initialized", {
        get: function () {
            return this.initialized;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "Priorty", {
        get: function () {
            return this.priorty;
        },
        enumerable: true,
        configurable: true
    });
    Material.prototype.getMaterialConfig = function (pass, technique) {
        return {
            cull: "ccw",
            blend: true
        };
    };
    Object.defineProperty(Material.prototype, "MaterialGroup", {
        get: function () {
            return "jthree.materials.forematerial";
        },
        enumerable: true,
        configurable: true
    });
    Material.prototype.getPassCount = function (techniqueIndex) {
        return 1;
    };
    Material.prototype.loadProgram = function (vsid, fsid, pid, vscode, fscode) {
        var rm = JThreeContext.getContextComponent(ContextComponents.ResourceManager);
        var vShader = rm.createShader(vsid, vscode, ShaderType.VertexShader);
        var fShader = rm.createShader(fsid, fscode, ShaderType.FragmentShader);
        vShader.loadAll();
        fShader.loadAll();
        return rm.createProgram(pid, [vShader, fShader]);
    };
    Material.prototype.configureMaterial = function (scene, renderStage, object, texs, techniqueIndex, passIndex) {
        this.applyMaterialConfig(passIndex, techniqueIndex, renderStage.Renderer);
        return;
    };
    Material.prototype.applyMaterialConfig = function (passIndex, techniqueIndex, renderer) {
        var config = this.getMaterialConfig(passIndex, techniqueIndex);
        if (config.cull) {
            renderer.GL.enable(renderer.GL.CULL_FACE);
            if (config.cull == "cw") {
                renderer.GL.cullFace(renderer.GL.FRONT);
            }
            else {
                renderer.GL.cullFace(renderer.GL.BACK);
            }
        }
        else {
            renderer.GL.disable(renderer.GL.CULL_FACE);
        }
        if (config.blend) {
            renderer.GL.enable(renderer.GL.BLEND);
            if (!config.blendArg1) {
                config.blendArg1 = "srcAlpha";
                config.blendArg2 = "oneMinusSrcAlpha";
            }
            renderer.GL.blendFunc(this.parseBlendVariable(config.blendArg1, renderer), this.parseBlendVariable(config.blendArg2, renderer));
        }
        else {
            renderer.GL.disable(renderer.GL.BLEND);
        }
    };
    Material.prototype.parseBlendVariable = function (blendConfig, renderer) {
        if (blendConfig == "1")
            return renderer.GL.ONE;
        if (blendConfig == "0")
            return renderer.GL.ZERO;
        if (blendConfig == "srcAlpha")
            return renderer.GL.SRC_ALPHA;
        if (blendConfig == "srcColor")
            return renderer.GL.SRC_COLOR;
        if (blendConfig == "oneMinusSrcAlpha")
            return renderer.GL.ONE_MINUS_SRC_ALPHA;
        if (blendConfig == "oneMinusSrcColor")
            return renderer.GL.ONE_MINUS_SRC_COLOR;
        if (blendConfig == "oneMinusDstAlpha")
            return renderer.GL.ONE_MINUS_DST_ALPHA;
        if (blendConfig == "oneMinusDstColor")
            return renderer.GL.ONE_MINUS_DST_COLOR;
        if (blendConfig == "destAlpha")
            return renderer.GL.DST_ALPHA;
        if (blendConfig == "destColor")
            return renderer.GL.DST_COLOR;
        console.error("Unsupported blend config!");
    };
    Object.defineProperty(Material.prototype, "Enabled", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Material.prototype.getDrawGeometryLength = function (geo) {
        return geo.IndexCount;
    };
    Material.prototype.getDrawGeometryOffset = function (geo) {
        return geo.GeometryOffset;
    };
    return Material;
})(JThreeObjectWithID);
module.exports = Material;

},{"../../Base/JThreeObjectWithID":10,"../../ContextComponents":12,"../../JThreeContext":226,"../../Wrapper/ShaderType":286}],55:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RenderPathExecutor = require('./RenderPathExecutor');
var JThreeEvent = require('../../Base/JThreeEvent');
var Rectangle = require('../../Math/Rectangle');
var RendererConfigurator = require("./RendererConfigurator/BasicRendererConfigurator");
var JThreeContext = require("../../JThreeContext");
var ContextComponents = require("../../ContextComponents");
var RenderPath = require("./RenderPath");
var CanvasRegion = require("../CanvasRegion");
var BasicRenderer = (function (_super) {
    __extends(BasicRenderer, _super);
    function BasicRenderer(canvas, viewportArea, configurator) {
        _super.call(this, canvas.canvasElement);
        this.renderPath = new RenderPath();
        this.viewportChanged = new JThreeEvent();
        this._viewport = new Rectangle(0, 0, 256, 256);
        configurator = configurator || new RendererConfigurator();
        this.canvas = canvas;
        this.renderPathExecutor = new RenderPathExecutor(this);
        this._viewport = viewportArea;
        var rm = JThreeContext.getContextComponent(ContextComponents.ResourceManager);
        if (this._viewport)
            rm.createRBO(this.ID + ".rbo.default", this._viewport.Width, this._viewport.Height);
        rm.createFBO(this.ID + ".fbo.default");
        this.renderPath.path.push.apply(this.renderPath.path, configurator.getStageChain(this));
        this.RenderPathExecutor.TextureBuffers = configurator.TextureBuffers;
        this.RenderPathExecutor.generateAllTextures();
        this.name = this.ID;
    }
    Object.defineProperty(BasicRenderer.prototype, "Camera", {
        get: function () {
            return this.camera;
        },
        set: function (camera) {
            this.camera = camera;
        },
        enumerable: true,
        configurable: true
    });
    BasicRenderer.prototype.render = function (scene) {
        this.renderPathExecutor.processRender(scene, this.renderPath);
    };
    Object.defineProperty(BasicRenderer.prototype, "ContextManager", {
        get: function () {
            return this.canvas;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasicRenderer.prototype, "GL", {
        get: function () {
            return this.canvas.GL;
        },
        enumerable: true,
        configurable: true
    });
    BasicRenderer.prototype.beforeRender = function () {
        this.applyViewportConfigure();
        this.ContextManager.beforeRender(this);
    };
    BasicRenderer.prototype.afterRender = function () {
        this.GL.flush();
        this.ContextManager.afterRender(this);
    };
    Object.defineProperty(BasicRenderer.prototype, "RenderPathExecutor", {
        get: function () {
            return this.renderPathExecutor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasicRenderer.prototype, "region", {
        get: function () {
            return this._viewport;
        },
        set: function (area) {
            if (!Rectangle.Equals(area, this._viewport) && (typeof area.Width !== 'undefined') && (typeof area.Height !== 'undefined')) {
                if (isNaN(area.Height + area.Width))
                    return;
                this._viewport = area;
                JThreeContext.getContextComponent(ContextComponents.ResourceManager).getRBO(this.ID + ".rbo.default").resize(area.Width, area.Height);
                this.viewportChanged.fire(this, area);
            }
        },
        enumerable: true,
        configurable: true
    });
    BasicRenderer.prototype.applyViewportConfigure = function () {
        this.GL.viewport(this._viewport.Left, this._viewport.Top, this._viewport.Width, this._viewport.Height);
    };
    return BasicRenderer;
})(CanvasRegion);
module.exports = BasicRenderer;

},{"../../Base/JThreeEvent":6,"../../ContextComponents":12,"../../JThreeContext":226,"../../Math/Rectangle":233,"../CanvasRegion":20,"./RenderPath":56,"./RenderPathExecutor":57,"./RendererConfigurator/BasicRendererConfigurator":65}],56:[function(require,module,exports){
var RenderPath = (function () {
    function RenderPath() {
        this.path = [];
    }
    RenderPath.prototype.pushStage = function (stage) {
        this.path.push(stage);
    };
    RenderPath.prototype.insertWithIndex = function (index, stage) {
        if (index >= 0 && index <= this.path.length) {
            var newStageChain = new Array(this.path.length + 1);
            for (var i = 0; i < index; i++) {
                newStageChain[i] = this.path[i];
            }
            newStageChain[index] = stage;
            for (var i = index + 1; i < newStageChain.length; i++) {
                newStageChain[i] = this.path[i - 1];
            }
            this.path = newStageChain;
        }
        else {
            console.error("Invalid render stage index : " + index + ", Current length of stage chain is $" + this.path.length);
        }
    };
    RenderPath.prototype.deleteWithIndex = function (index) {
        if (index >= 0 && index < this.path.length && this.path.length > 0) {
            var newStageChain = new Array(this.path.length - 1);
            for (var i = 0; i < index; i++) {
                newStageChain[i] = this.path[i];
            }
            for (var i = index; i < newStageChain.length; i++) {
                newStageChain[i] = this.path[i + 1];
            }
            this.path = newStageChain;
        }
        else {
            console.error("Invalid render stage index:" + index + ", Current length of stage chain is " + this.path.length);
        }
    };
    RenderPath.prototype.deleteStage = function (stage) {
        for (var i = 0; i < this.path.length; i++) {
            if (this.path[i] === stage) {
                this.deleteWithIndex(i);
                return;
            }
        }
        console.warn("Couldn't find specified RenderStage, any render stage was not deleted");
    };
    RenderPath.prototype.insertAfter = function (targetStage, stage) {
        for (var i = 0; i < this.path.length; i++) {
            if (this.path[i] === stage) {
                this.insertWithIndex(i + 1, stage);
                return;
            }
        }
        console.error("Invalid render stage chain.Specified targetsStage was not found.");
    };
    RenderPath.prototype.insertBefore = function (targetStage, stage) {
        for (var i = 0; i < this.path.length; i++) {
            if (this.path[i] === stage) {
                this.insertWithIndex(i, stage);
                return;
            }
        }
        console.error("Invalid render stage chain. Specified targetStage was not found");
    };
    return RenderPath;
})();
module.exports = RenderPath;

},{}],57:[function(require,module,exports){
var Mesh = require('../../Shapes/Mesh');
var QuadGeometry = require('../Geometries/QuadGeometry');
var CubeGeometry = require("../Geometries/CubeGeometry");
var TextureGenerater = require("./TextureGenerater");
var JThreeEvent = require("../../Base/JThreeEvent");
var RenderPathExecutor = (function () {
    function RenderPathExecutor(parent) {
        this.renderStageCompleted = new JThreeEvent();
        this.renderPathCompleted = new JThreeEvent();
        this.renderObjectCompleted = new JThreeEvent();
        this.textureBuffers = {};
        this.renderer = parent;
        this.defaultQuad = new QuadGeometry("jthree.renderstage.default.quad");
        this.defaultCube = new CubeGeometry("jthree.renderstage.default.cube");
    }
    Object.defineProperty(RenderPathExecutor.prototype, "TextureBuffers", {
        get: function () {
            return this.textureBuffers;
        },
        set: function (val) {
            this.textureBuffers = val;
        },
        enumerable: true,
        configurable: true
    });
    RenderPathExecutor.prototype.generateAllTextures = function () {
        for (var name in this.textureBuffers) {
            TextureGenerater.generateTexture(this.renderer, name, this.textureBuffers[name]);
        }
    };
    RenderPathExecutor.prototype.genChainTexture = function (chain) {
        var texInfo = {};
        for (var targetName in chain.buffers) {
            var bufferName = chain.buffers[targetName];
            if (bufferName == 'default') {
                texInfo[targetName] = null;
                continue;
            }
            var tex = TextureGenerater.getTexture(this.renderer, bufferName);
            texInfo[targetName] = tex;
        }
        return texInfo;
    };
    RenderPathExecutor.prototype.processRender = function (scene, renderPath) {
        var _this = this;
        var stageIndex = 0;
        renderPath.path.forEach(function (chain) {
            var texs = _this.genChainTexture(chain);
            var stage = chain.stage;
            var techniqueCount = stage.getTechniqueCount(scene);
            var targetObjects;
            switch (stage.TargetGeometry) {
                case "quad":
                    targetObjects = [new Mesh(_this.defaultQuad, null)];
                    break;
                case "cube":
                    targetObjects = [new Mesh(_this.defaultCube, null)];
                    break;
                case "scene":
                default:
                    targetObjects = scene.children;
            }
            stage.preStage(scene, texs);
            stage.applyStageConfig();
            for (var i = 0; i < techniqueCount; i++) {
                stage.preTechnique(scene, i, texs);
                targetObjects.forEach(function (v) {
                    v.callRecursive(function (v) {
                        if (v.Geometry && stage.needRender(scene, v, i)) {
                            stage.render(scene, v, i, texs);
                            _this.renderObjectCompleted.fire(_this, {
                                owner: _this,
                                renderedObject: v,
                                stage: stage,
                                stageChain: chain,
                                bufferTextures: texs,
                                technique: i
                            });
                        }
                    });
                });
                stage.postTechnique(scene, i, texs);
            }
            stage.postStage(scene, texs);
            _this.renderStageCompleted.fire(_this, {
                owner: _this,
                completedChain: chain,
                bufferTextures: texs,
                index: stageIndex
            });
            stageIndex++;
        });
        this.renderPathCompleted.fire(this, {
            owner: this,
            scene: scene
        });
    };
    return RenderPathExecutor;
})();
module.exports = RenderPathExecutor;

},{"../../Base/JThreeEvent":6,"../../Shapes/Mesh":272,"../Geometries/CubeGeometry":26,"../Geometries/QuadGeometry":30,"./TextureGenerater":69}],58:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RenderStageBase = require('./RenderStageBase');
var ClearTargetType = require("../../../Wrapper/ClearTargetType");
var FowardShadingStage = (function (_super) {
    __extends(FowardShadingStage, _super);
    function FowardShadingStage(renderer) {
        _super.call(this, renderer);
    }
    Object.defineProperty(FowardShadingStage.prototype, "RenderStageConfig", {
        get: function () {
            return {
                depthTest: true
            };
        },
        enumerable: true,
        configurable: true
    });
    FowardShadingStage.prototype.preTechnique = function (scene, passCount, texs) {
        var _this = this;
        this.bindAsOutBuffer(this.DefaultFBO, [{
                texture: null,
                target: "depth",
                type: "rbo"
            }, {
                texture: texs["OUT"],
                target: 0,
                isOptional: false
            }], function () {
            _this.Renderer.GL.clear(ClearTargetType.ColorBits | ClearTargetType.DepthBits);
        }, function () {
            _this.Renderer.GL.clear(ClearTargetType.DepthBits);
        });
    };
    FowardShadingStage.prototype.render = function (scene, object, passCount, texs) {
        this.drawForMaterials(scene, object, passCount, texs, "jthree.materials.forematerial");
    };
    FowardShadingStage.prototype.needRender = function (scene, object, passCount) {
        return typeof object.Geometry != "undefined" && object.Geometry != null;
    };
    return FowardShadingStage;
})(RenderStageBase);
module.exports = FowardShadingStage;

},{"../../../Wrapper/ClearTargetType":279,"./RenderStageBase":62}],59:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RenderStageBase = require('../RenderStageBase');
var ClearTargetType = require("../../../../Wrapper/ClearTargetType");
var GBufferStage = (function (_super) {
    __extends(GBufferStage, _super);
    function GBufferStage(renderer) {
        _super.call(this, renderer);
    }
    Object.defineProperty(GBufferStage.prototype, "RenderStageConfig", {
        get: function () {
            return {
                depthTest: true
            };
        },
        enumerable: true,
        configurable: true
    });
    GBufferStage.prototype.preTechnique = function (scene, techniqueIndex, texs) {
        var _this = this;
        var outTexture;
        switch (techniqueIndex) {
            case 0:
                outTexture = texs["PRIMARY"];
                break;
            case 1:
                outTexture = texs["SECOUNDARY"];
                break;
            case 2:
                outTexture = texs["THIRD"];
                break;
        }
        this.bindAsOutBuffer(this.DefaultFBO, [{
                texture: this.DefaultRBO,
                target: "depth",
                type: "rbo"
            }, {
                texture: outTexture,
                target: 0,
                isOptional: false
            }], function () {
            _this.Renderer.GL.clear(ClearTargetType.ColorBits | ClearTargetType.DepthBits);
        }, function () {
            _this.Renderer.ContextManager.applyClearColor();
            _this.Renderer.GL.clear(ClearTargetType.DepthBits);
        });
    };
    GBufferStage.prototype.render = function (scene, object, techniqueIndex, texs) {
        this.drawForMaterials(scene, object, techniqueIndex, texs, "jthree.materials.gbuffer");
    };
    GBufferStage.prototype.needRender = function (scene, object, techniqueIndex) {
        return typeof object.Geometry != "undefined" && object.Geometry != null;
    };
    GBufferStage.prototype.getTechniqueCount = function (scene) {
        return 3;
    };
    return GBufferStage;
})(RenderStageBase);
module.exports = GBufferStage;

},{"../../../../Wrapper/ClearTargetType":279,"../RenderStageBase":62}],60:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ClearTargetType = require("../../../Wrapper/ClearTargetType");
var RenderStageBase = require("./RenderStageBase");
var HitAreaRenderStage = (function (_super) {
    __extends(HitAreaRenderStage, _super);
    function HitAreaRenderStage() {
        _super.apply(this, arguments);
        this.___objectIndex = 0;
        this.indexObjectPair = {};
    }
    HitAreaRenderStage.prototype.preTechnique = function (scene, passCount, texs) {
        var _this = this;
        this.bindAsOutBuffer(this.DefaultFBO, [
            { texture: texs["OUT"], target: 0 },
            { texture: this.DefaultRBO, type: "rbo", target: "depth" }
        ], function () {
            _this.GL.clearColor(1, 1, 0, 1);
            _this.GL.clear(ClearTargetType.ColorBits | ClearTargetType.DepthBits);
        });
        this.___objectIndex = 0;
    };
    HitAreaRenderStage.prototype.render = function (scene, object, techniqueIndex, texs) {
        this.indexObjectPair[this.___objectIndex] = object;
        this.drawForMaterials(scene, object, techniqueIndex, texs, "jthree.materials.hitarea");
        this.___objectIndex++;
    };
    HitAreaRenderStage.prototype.getTechniqueCount = function (scene) {
        return 1;
    };
    HitAreaRenderStage.prototype.needRender = function (scene, object, techniqueIndex) {
        return true;
    };
    return HitAreaRenderStage;
})(RenderStageBase);
module.exports = HitAreaRenderStage;

},{"../../../Wrapper/ClearTargetType":279,"./RenderStageBase":62}],61:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RenderStageBase = require('./RenderStageBase');
var ClearTargetType = require("../../../Wrapper/ClearTargetType");
var Mesh = require('../../../Shapes/Mesh');
var Matrix = require('../../../Math/Matrix');
var LightAccumulationStage = (function (_super) {
    __extends(LightAccumulationStage, _super);
    function LightAccumulationStage(renderer) {
        _super.call(this, renderer);
    }
    LightAccumulationStage.prototype.preTechnique = function (scene, techniqueIndex, texs) {
        var _this = this;
        var targetTetxture;
        switch (techniqueIndex) {
            case 0:
                targetTetxture = texs["DIFFUSE"];
                break;
            case 1:
                targetTetxture = texs["SPECULAR"];
                break;
        }
        this.bindAsOutBuffer(this.DefaultFBO, [
            { texture: targetTetxture, target: 0 }
        ], function () {
            _this.GL.clearColor(0, 0, 0, 0);
            _this.GL.clear(ClearTargetType.ColorBits);
        });
    };
    LightAccumulationStage.prototype.render = function (scene, object, techniqueIndex, texs) {
        var geometry = object.Geometry;
        if (!geometry)
            return;
        this.configureMaterial(scene, this.Renderer, new Mesh(geometry, null), texs, techniqueIndex === 0 ? scene.LightRegister.DiffuseLightProgram : scene.LightRegister.SpecularLightProgram);
        geometry.drawElements(this.Renderer.ContextManager, null);
    };
    LightAccumulationStage.prototype.configureMaterial = function (scene, renderer, object, texs, targetProgramWrapper) {
        var geometry = object.Geometry;
        var programWrapper = targetProgramWrapper.getForContext(renderer.ContextManager);
        var ip = Matrix.inverse(renderer.Camera.projectionMatrix);
        programWrapper.register({
            attributes: {
                position: geometry.PositionBuffer,
                uv: geometry.UVBuffer
            },
            uniforms: {
                primary: {
                    type: "texture",
                    value: texs["PRIMARY"],
                    register: 0
                },
                secoundary: {
                    type: "texture",
                    value: texs["SECOUNDARY"],
                    register: 1
                },
                third: {
                    type: "texture",
                    value: texs["THIRD"],
                    register: 2
                },
                lightParam: {
                    type: "texture",
                    value: scene.LightRegister.ParameterTexture,
                    register: 3
                },
                lightParamSize: {
                    type: "vector",
                    value: scene.LightRegister.TextureSize
                },
                matV: {
                    type: "matrix",
                    value: renderer.Camera.viewMatrix
                },
                matIP: {
                    type: "matrix",
                    value: ip
                },
                matLWs: {
                    type: "matrixarray",
                    value: scene.LightRegister.lightWorldMatricis
                },
                matVILs: {
                    type: "matrixarray",
                    value: scene.LightRegister.viewInvertedLightMatricis
                },
                shadowMap: {
                    type: "texture",
                    value: scene.LightRegister.shadowMapResourceManager.shadowMapTileTexture,
                    register: 4
                },
                shadowParam: {
                    type: "texture",
                    value: scene.LightRegister.shadowMapResourceManager.shadowMatrixTexture,
                    register: 5
                },
                matIV: {
                    type: "matrix",
                    value: Matrix.inverse(renderer.Camera.viewMatrix)
                },
                shadowMapMax: {
                    type: "float",
                    value: scene.LightRegister.shadowMapResourceManager.maximumShadowMapCount
                }
            }
        });
        geometry.IndexBuffer.getForContext(renderer.ContextManager).bindBuffer();
    };
    LightAccumulationStage.prototype.needRender = function (scene, object, passCount) {
        return typeof object.Geometry != "undefined" && object.Geometry != null;
    };
    LightAccumulationStage.prototype.getTechniqueCount = function (scene) {
        return 2;
    };
    Object.defineProperty(LightAccumulationStage.prototype, "TargetGeometry", {
        get: function () {
            return "quad";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightAccumulationStage.prototype, "RenderStageConfig", {
        get: function () {
            return {
                depthTest: false
            };
        },
        enumerable: true,
        configurable: true
    });
    return LightAccumulationStage;
})(RenderStageBase);
module.exports = LightAccumulationStage;

},{"../../../Math/Matrix":229,"../../../Shapes/Mesh":272,"../../../Wrapper/ClearTargetType":279,"./RenderStageBase":62}],62:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JThreeObjectWithID = require('../../../Base/JThreeObjectWithID');
var ShaderType = require("../../../Wrapper/ShaderType");
var GLFeature = require('../../../Wrapper/GLFeatureType');
var FrameBufferAttachmentType = require('../../../Wrapper/FrameBufferAttachmentType');
var ContextComponents = require("../../../ContextComponents");
var JThreeContext = require("../../../JThreeContext");
var RenderStageBase = (function (_super) {
    __extends(RenderStageBase, _super);
    function RenderStageBase(renderer) {
        _super.call(this);
        this.renderer = renderer;
    }
    Object.defineProperty(RenderStageBase.prototype, "Renderer", {
        get: function () {
            return this.renderer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderStageBase.prototype, "GL", {
        get: function () {
            return this.Renderer.GL;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderStageBase.prototype, "ResourceManager", {
        get: function () {
            return JThreeContext.getContextComponent(ContextComponents.ResourceManager);
        },
        enumerable: true,
        configurable: true
    });
    RenderStageBase.prototype.preStage = function (scene, texs) {
    };
    RenderStageBase.prototype.postStage = function (scene, texs) {
    };
    RenderStageBase.prototype.preTechnique = function (scene, techniqueIndex, texs) {
    };
    RenderStageBase.prototype.postTechnique = function (scene, techniqueIndex, texs) {
        this.Renderer.GL.flush();
    };
    RenderStageBase.prototype.render = function (scene, object, techniqueIndex, texs) {
    };
    RenderStageBase.prototype.needRender = function (scene, object, techniqueIndex) {
        return false;
    };
    RenderStageBase.prototype.getTechniqueCount = function (scene) {
        return 1;
    };
    Object.defineProperty(RenderStageBase.prototype, "TargetGeometry", {
        get: function () {
            return "scene";
        },
        enumerable: true,
        configurable: true
    });
    RenderStageBase.prototype.applyStageConfig = function () {
        var config = this.RenderStageConfig;
        this.applyStageConfigToGLFeature(config.depthTest, GLFeature.DepthTest, true);
    };
    RenderStageBase.prototype.applyStageConfigToGLFeature = function (flag, target, def) {
        if (typeof flag === 'undefined') {
            flag = def;
        }
        if (flag) {
            this.GL.enable(target);
        }
        else {
            this.GL.disable(target);
        }
    };
    Object.defineProperty(RenderStageBase.prototype, "RenderStageConfig", {
        get: function () {
            return {
                depthTest: true
            };
        },
        enumerable: true,
        configurable: true
    });
    RenderStageBase.prototype.loadProgram = function (vsid, fsid, pid, vscode, fscode) {
        var rm = this.ResourceManager;
        var vShader = rm.createShader(vsid, vscode, ShaderType.VertexShader);
        var fShader = rm.createShader(fsid, fscode, ShaderType.FragmentShader);
        vShader.loadAll();
        fShader.loadAll();
        return rm.createProgram(pid, [vShader, fShader]);
    };
    RenderStageBase.prototype.bindAsOutBuffer = function (fbo, bindInfo, onBind, onDefaultBuffer) {
        var _this = this;
        var shouldBeDefault = false;
        var targetWrapper = fbo.getForContext(this.Renderer.ContextManager);
        bindInfo.forEach(function (v) {
            v.target = v.target.toString().toLowerCase();
            var attachmentType;
            if (v.target === "depth") {
                attachmentType = FrameBufferAttachmentType.DepthAttachment;
            }
            else if (v.target === "stencil") {
                attachmentType = FrameBufferAttachmentType.StencilAttachment;
            }
            else if (v.target === "depthstencil") {
                attachmentType = FrameBufferAttachmentType.DepthStencilAttachment;
            }
            else {
                attachmentType = (FrameBufferAttachmentType.ColorAttachment0 + new Number(v.target));
            }
            if (shouldBeDefault || (typeof v.isOptional !== 'undefined' && !v.isOptional && v.texture === null)) {
                _this.attachToWrapper(v, targetWrapper, attachmentType);
                _this.Renderer.GL.bindFramebuffer(_this.Renderer.GL.FRAMEBUFFER, null);
                shouldBeDefault = true;
            }
            else {
                _this.attachToWrapper(v, targetWrapper, attachmentType);
            }
        });
        if (shouldBeDefault) {
            if (onDefaultBuffer)
                onDefaultBuffer();
        }
        else {
            onBind();
        }
    };
    RenderStageBase.prototype.attachToWrapper = function (v, targetWrapper, targetAttachment) {
        if (!v.type || v.type === "texture") {
            targetWrapper.attachTexture(targetAttachment, v.texture);
        }
        else if (v.type === "rbo") {
            targetWrapper.attachRBO(targetAttachment, v.texture);
        }
        else {
            console.error("unknown bind type!");
        }
    };
    RenderStageBase.prototype.drawForMaterials = function (scene, object, techniqueIndex, texs, materialGroup) {
        var materials = object.getMaterials(materialGroup);
        for (var i = 0; i < materials.length; i++) {
            var material = materials[i];
            if (!material || !material.Initialized || !material.Enabled)
                return;
            for (var pass = 0; pass < material.getPassCount(techniqueIndex); pass++) {
                material.configureMaterial(scene, this, object, texs, techniqueIndex, pass);
                object.Geometry.drawElements(this.Renderer.ContextManager, material);
            }
        }
    };
    Object.defineProperty(RenderStageBase.prototype, "DefaultFBO", {
        get: function () {
            return this.ResourceManager.getFBO(this.Renderer.ID + ".fbo.default");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderStageBase.prototype, "DefaultRBO", {
        get: function () {
            return this.ResourceManager.getRBO(this.Renderer.ID + ".rbo.default");
        },
        enumerable: true,
        configurable: true
    });
    return RenderStageBase;
})(JThreeObjectWithID);
module.exports = RenderStageBase;

},{"../../../Base/JThreeObjectWithID":10,"../../../ContextComponents":12,"../../../JThreeContext":226,"../../../Wrapper/FrameBufferAttachmentType":281,"../../../Wrapper/GLFeatureType":282,"../../../Wrapper/ShaderType":286}],63:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RenderStageBase = require('./RenderStageBase');
var ClearTargetType = require("../../../Wrapper/ClearTargetType");
var ShadowMapGenerationStage = (function (_super) {
    __extends(ShadowMapGenerationStage, _super);
    function ShadowMapGenerationStage(renderer) {
        _super.call(this, renderer);
    }
    ShadowMapGenerationStage.prototype.getShadowDroppableLight = function (scene, techniqueIndex) {
        return scene.LightRegister.shadowDroppableLights[techniqueIndex];
    };
    ShadowMapGenerationStage.prototype.preStage = function (scene, chainInfo) {
        var _this = this;
        this.bindAsOutBuffer(this.DefaultFBO, [
            {
                texture: scene.LightRegister.shadowMapResourceManager.shadowMapTileTexture,
                target: 0
            }, {
                texture: scene.LightRegister.shadowMapResourceManager.shadowMapRenderBuffer,
                type: "rbo",
                target: "depth"
            }
        ], function () {
            _this.Renderer.GL.clearColor(0, 0, 0, 0);
            _this.Renderer.GL.clear(ClearTargetType.ColorBits | ClearTargetType.DepthBits);
        }, function () { });
    };
    ShadowMapGenerationStage.prototype.postStage = function (scene, chainInfo) {
        this.Renderer.applyViewportConfigure();
    };
    ShadowMapGenerationStage.prototype.preTechnique = function (scene, techniqueCount, chainInfo) {
    };
    ShadowMapGenerationStage.prototype.render = function (scene, object, techniqueCount, texs) {
        var geometry = object.Geometry;
        var targetLight = this.getShadowDroppableLight(scene, techniqueCount);
        scene.LightRegister.shadowMapResourceManager.setShadowMapViewport(this.Renderer, techniqueCount);
        this.drawForMaterials(scene, object, techniqueCount, texs, "jthree.materials.shadowmap");
    };
    ShadowMapGenerationStage.prototype.needRender = function (scene, object, techniqueCount) {
        return true;
    };
    ShadowMapGenerationStage.prototype.getTechniqueCount = function (scene) {
        return scene.LightRegister.ShadowDroppableLightCount;
    };
    Object.defineProperty(ShadowMapGenerationStage.prototype, "TargetGeometry", {
        get: function () {
            return "scene";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShadowMapGenerationStage.prototype, "RenderStageConfig", {
        get: function () {
            return {
                depthTest: true
            };
        },
        enumerable: true,
        configurable: true
    });
    return ShadowMapGenerationStage;
})(RenderStageBase);
module.exports = ShadowMapGenerationStage;

},{"../../../Wrapper/ClearTargetType":279,"./RenderStageBase":62}],64:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RenderStageBase = require('./RenderStageBase');
var SkyBoxStage = (function (_super) {
    __extends(SkyBoxStage, _super);
    function SkyBoxStage(renderer) {
        _super.call(this, renderer);
        var vs = require("../../Shaders/VertexShaders/SkyboxGeometries.glsl");
        var fs = require("../../Shaders/SkyBox.glsl");
        this.program = this.loadProgram("jthree.shaders.vertex.skybox", "jthree.shaders.fragment.skybox", "jthree.programs.skybox", vs, fs);
    }
    SkyBoxStage.prototype.preTechnique = function (scene, passCount, chainInfo) {
        this.Renderer.GL.bindFramebuffer(this.Renderer.GL.FRAMEBUFFER, null);
    };
    SkyBoxStage.prototype.render = function (scene, object, passCount) {
        var geometry = object.Geometry;
        var pw = this.program.getForContext(this.Renderer.ContextManager);
        pw.register({
            attributes: {
                position: geometry.PositionBuffer,
                uv: geometry.UVBuffer
            },
            uniforms: {
                skyTex: { type: "texture", register: 0, value: this.skyBoxTexture },
                matVP: { type: "matrix", value: this.Renderer.Camera.viewMatrix }
            }
        });
        geometry.IndexBuffer.getForContext(this.Renderer.ContextManager).bindBuffer();
        geometry.drawElements(this.Renderer.ContextManager, null);
    };
    SkyBoxStage.prototype.needRender = function (scene, object, passCount) {
        return !!this.skyBoxTexture;
    };
    SkyBoxStage.prototype.getTechniqueCount = function (scene) {
        return 1;
    };
    Object.defineProperty(SkyBoxStage.prototype, "TargetGeometry", {
        get: function () {
            return "cube";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkyBoxStage.prototype, "RenderStageConfig", {
        get: function () {
            return {
                depthTest: false
            };
        },
        enumerable: true,
        configurable: true
    });
    return SkyBoxStage;
})(RenderStageBase);
module.exports = SkyBoxStage;

},{"../../Shaders/SkyBox.glsl":129,"../../Shaders/VertexShaders/SkyboxGeometries.glsl":133,"./RenderStageBase":62}],65:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AccumulationStage = require("../RenderStages/LightAccumulationStage");
var ShadingStage = require("../RenderStages/FowardShadingStage");
var ConfiguratorBase = require("./RendererConfiguratorBase");
var GBufferStage = require("../RenderStages/GBuffer/GBufferStage");
var ShadowMapGenerationStage = require("../RenderStages/ShadowMapGenerationStage");
var HitAreaRenderStage = require("../RenderStages/HitAreaRenderStage");
var BasicRendererConfigurator = (function (_super) {
    __extends(BasicRendererConfigurator, _super);
    function BasicRendererConfigurator() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(BasicRendererConfigurator.prototype, "TextureBuffers", {
        get: function () {
            return {
                "gbuffer.primary": {
                    generater: "rendererfit",
                    internalFormat: "RGBA",
                    element: "FLOAT"
                },
                "gbuffer.secoundary": {
                    generater: "rendererfit",
                    internalFormat: "RGBA",
                    element: "UBYTE"
                },
                "gbuffer.third": {
                    generater: "rendererfit",
                    internalFormat: "RGB",
                    element: "UBYTE"
                },
                "light.diffuse": {
                    generater: "rendererfit",
                    internalFormat: "RGB",
                    element: "UBYTE"
                },
                "light.specular": {
                    generater: "rendererfit",
                    internalFormat: "RGB",
                    element: "UBYTE"
                },
                "hitarea": {
                    generater: "rendererfit",
                    internalFormat: "RGBA",
                    element: "UBYTE"
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    BasicRendererConfigurator.prototype.getStageChain = function (target) {
        return [
            {
                buffers: {},
                stage: new ShadowMapGenerationStage(target)
            },
            {
                buffers: {
                    OUT: "hitarea"
                },
                stage: new HitAreaRenderStage(target)
            },
            {
                buffers: {
                    PRIMARY: "gbuffer.primary",
                    SECOUNDARY: "gbuffer.secoundary",
                    THIRD: "gbuffer.third"
                },
                stage: new GBufferStage(target)
            },
            {
                buffers: {
                    PRIMARY: "gbuffer.primary",
                    SECOUNDARY: "gbuffer.secoundary",
                    THIRD: "gbuffer.third",
                    DIFFUSE: "light.diffuse",
                    SPECULAR: "light.specular"
                },
                stage: new AccumulationStage(target)
            },
            {
                buffers: {
                    DLIGHT: "light.diffuse",
                    SLIGHT: "light.specular",
                    OUT: "default"
                },
                stage: new ShadingStage(target)
            }];
    };
    return BasicRendererConfigurator;
})(ConfiguratorBase);
module.exports = BasicRendererConfigurator;

},{"../RenderStages/FowardShadingStage":58,"../RenderStages/GBuffer/GBufferStage":59,"../RenderStages/HitAreaRenderStage":60,"../RenderStages/LightAccumulationStage":61,"../RenderStages/ShadowMapGenerationStage":63,"./RendererConfiguratorBase":66}],66:[function(require,module,exports){
var RendererConfiguratorBase = (function () {
    function RendererConfiguratorBase() {
    }
    Object.defineProperty(RendererConfiguratorBase.prototype, "TextureBuffers", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    RendererConfiguratorBase.prototype.getStageChain = function (target) {
        return null;
    };
    return RendererConfiguratorBase;
})();
module.exports = RendererConfiguratorBase;

},{}],67:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ShadingStage = require("../RenderStages/FowardShadingStage");
var ConfiguratorBase = require("./RendererConfiguratorBase");
var BasicRendererConfigurator = (function (_super) {
    __extends(BasicRendererConfigurator, _super);
    function BasicRendererConfigurator() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(BasicRendererConfigurator.prototype, "TextureBuffers", {
        get: function () {
            return {};
        },
        enumerable: true,
        configurable: true
    });
    BasicRendererConfigurator.prototype.getStageChain = function (target) {
        return [
            {
                buffers: {
                    DLIGHT: "light.diffuse",
                    SLIGHT: "light.specular",
                    OUT: "default"
                },
                stage: new ShadingStage(target)
            }];
    };
    return BasicRendererConfigurator;
})(ConfiguratorBase);
module.exports = BasicRendererConfigurator;

},{"../RenderStages/FowardShadingStage":58,"./RendererConfiguratorBase":66}],68:[function(require,module,exports){
var BasicRenderer = require("./BasicRenderer");
var RendererFactory = (function () {
    function RendererFactory() {
    }
    RendererFactory.generateRenderer = function (canvas, drawRect, configureName) {
        configureName = configureName || "default";
        return new BasicRenderer(canvas, drawRect, new RendererFactory.rendererConfigurations[configureName]());
    };
    RendererFactory.rendererConfigurations = {
        "default": require("./RendererConfigurator/BasicRendererConfigurator"),
        "sprite": require("./RendererConfigurator/SpriteRendererConfigurator")
    };
    return RendererFactory;
})();
module.exports = RendererFactory;

},{"./BasicRenderer":55,"./RendererConfigurator/BasicRendererConfigurator":65,"./RendererConfigurator/SpriteRendererConfigurator":67}],69:[function(require,module,exports){
var AssociativeArray = require("../../Base/Collections/AssociativeArray");
var JThreeContext = require("../../JThreeContext");
var ContextComponents = require("../../ContextComponents");
var TextureGenerater = (function () {
    function TextureGenerater() {
    }
    TextureGenerater.generateTexture = function (renderer, name, generaterInfo) {
        var generaters = TextureGenerater.getGeneraters(renderer);
        var generater = generaters.get(generaterInfo.generater);
        generater.generate(name, generaterInfo);
        return TextureGenerater.getTexture(renderer, name);
    };
    TextureGenerater.getGeneraters = function (renderer) {
        if (TextureGenerater.generaters[renderer.ID])
            return TextureGenerater.generaters[renderer.ID];
        return TextureGenerater.initializeGeneraters(renderer);
    };
    TextureGenerater.initializeGeneraters = function (renderer) {
        var targetArray = new AssociativeArray();
        var generaters = require('./TextureGeneraters/GeneraterList');
        for (var key in generaters) {
            if (generaters.hasOwnProperty(key)) {
                var element = generaters[key];
                targetArray.set(key, new element(renderer));
            }
        }
        TextureGenerater.generaters[renderer.ID] = targetArray;
        return targetArray;
    };
    TextureGenerater.getTexture = function (renderer, bufferName) {
        return JThreeContext.getContextComponent(ContextComponents.ResourceManager).getTexture(renderer.ID + "." + bufferName);
        ;
    };
    TextureGenerater.generaters = {};
    return TextureGenerater;
})();
module.exports = TextureGenerater;

},{"../../Base/Collections/AssociativeArray":2,"../../ContextComponents":12,"../../JThreeContext":226,"./TextureGeneraters/GeneraterList":71}],70:[function(require,module,exports){
var GeneraterBase = (function () {
    function GeneraterBase(parent) {
        this.parentRenderer = parent;
    }
    GeneraterBase.prototype.generate = function (name, texInfo) {
    };
    return GeneraterBase;
})();
module.exports = GeneraterBase;

},{}],71:[function(require,module,exports){
var generatorList = {
    "rendererfit": require("./RendererFit")
};
module.exports = generatorList;

},{"./RendererFit":72}],72:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GeneraterBase = require("./GeneraterBase");
var TextureInternalFormatType = require("../../../Wrapper/TextureInternalFormatType");
var TextureType = require("../../../Wrapper/TextureType");
var Rectangle = require("../../../Math/Rectangle");
var ContextComponents = require("../../../ContextComponents");
var JThreeContext = require("../../../JThreeContext");
var RendererFit = (function (_super) {
    __extends(RendererFit, _super);
    function RendererFit(parent) {
        _super.call(this, parent);
    }
    Object.defineProperty(RendererFit.prototype, "ParentRenderRectangle", {
        get: function () {
            if (this.parentRenderer["ViewPortArea"]) {
                return this.parentRenderer["ViewPortArea"];
            }
            else {
                return new Rectangle(0, 0, 512, 512);
            }
        },
        enumerable: true,
        configurable: true
    });
    RendererFit.prototype.generate = function (name, texInfo) {
        var rect = this.ParentRenderRectangle;
        var width = rect.Width, height = rect.Height;
        var internalFormat;
        texInfo["internalFormat"] = texInfo["internalFormat"] || "RGBA";
        switch ((new String(texInfo["internalFormat"])).toUpperCase()) {
            case "ALPHA":
                internalFormat = TextureInternalFormatType.Alpha;
                break;
            case "RGB":
                internalFormat = TextureInternalFormatType.RGB;
                break;
            case "DEPTH":
                internalFormat = TextureInternalFormatType.DEPTH_COMPONENT;
                break;
            case "LUMINANCE":
                internalFormat = TextureInternalFormatType.Luminance;
                break;
            case "LUMINANCE_ALPHA":
                internalFormat = TextureInternalFormatType.LuminanceAlpha;
                break;
            case "DEPTH_STENCIL":
                internalFormat = TextureInternalFormatType.DEPTH_STENCIL;
                break;
            case "RGBA":
                internalFormat = TextureInternalFormatType.RGBA;
                break;
            default:
                console.error("the given parameter was invalid : texture format " + texInfo["internalFormat"]);
        }
        var elementFormat;
        texInfo["element"] = texInfo["element"] || "UBYTE";
        switch ((new String(texInfo["element"])).toUpperCase()) {
            case "UBYTE":
                elementFormat = TextureType.UnsignedByte;
                break;
            case "FLOAT":
                elementFormat = TextureType.Float;
                break;
            case "USHORT565":
                elementFormat = TextureType.UnsignedShort565;
                break;
            case "USHORT4444":
                elementFormat = TextureType.UnsignedShort4444;
                break;
            case "USHORT5551":
                elementFormat = TextureType.UnsignedShort5551;
                break;
            case "UINT":
                elementFormat = TextureType.UnsignedInt;
                break;
            case "USHORT":
                elementFormat = TextureType.UnsignedShort;
                break;
            case "UINT24_8":
                elementFormat = TextureType.UnsignedInt24_8WebGL;
                break;
            default:
                console.error("the given parameter was invalid : element format " + texInfo["element"]);
        }
        var rm = JThreeContext.getContextComponent(ContextComponents.ResourceManager);
        var resource = rm.createTexture(this.parentRenderer.ID + "." + name, width, height, internalFormat, elementFormat);
        this.parentRenderer.viewportChanged.addListener(function (r, s) {
            var bufTex = resource;
            if (s.Width !== bufTex.Width || s.Height !== bufTex.Height) {
                resource.resize(s.Width, s.Height);
            }
        });
        return resource;
    };
    return RendererFit;
})(GeneraterBase);
module.exports = RendererFit;

},{"../../../ContextComponents":12,"../../../JThreeContext":226,"../../../Math/Rectangle":233,"../../../Wrapper/TextureInternalFormatType":295,"../../../Wrapper/TextureType":296,"./GeneraterBase":70}],73:[function(require,module,exports){
var ContextComponents = require("../ContextComponents");
var Q = require("q");
var ResourceLoader = (function () {
    function ResourceLoader() {
        this.resourceCount = 0;
        this.loadedResourceCount = 0;
        this.completedResourceCount = 0;
        this.erroredResourceCount = 0;
        this.currentLoadingMessage = "";
    }
    ResourceLoader.prototype.getContextComponentIndex = function () {
        return ContextComponents.ResourceLoader;
    };
    Object.defineProperty(ResourceLoader.prototype, "isLoading", {
        get: function () {
            return !!this.resourceLoadingDeferred;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceLoader.prototype, "promise", {
        get: function () {
            return this.resourceLoadingDeferred.promise;
        },
        enumerable: true,
        configurable: true
    });
    ResourceLoader.prototype.getResourceLoadingDeffered = function () {
        if (!this.isLoading) {
            this.resourceLoadingDeferred = Q.defer();
        }
        this.resourceCount++;
        var d = Q.defer();
        this.registerForResourceLoaded(d.promise);
        return d;
    };
    ResourceLoader.prototype.registerForResourceLoaded = function (promise) {
        var _this = this;
        promise.then(function () {
            _this.loadedResourceCount++;
            _this.completedResourceCount++;
            _this.checkResourceLoaded();
        }, function () {
            _this.completedResourceCount++;
            _this.erroredResourceCount++;
            _this.checkResourceLoaded();
        }, function (s) {
            _this.currentLoadingMessage = s;
        });
    };
    ResourceLoader.prototype.checkResourceLoaded = function () {
        if (this.completedResourceCount == this.resourceCount) {
            this.resourceLoadingDeferred.resolve({
                hasNoError: this.erroredResourceCount > 0,
                erroredResource: this.erroredResourceCount,
                loadedResource: this.loadedResourceCount,
                completedResource: this.completedResourceCount,
                lastLoadMessage: this.currentLoadingMessage,
                resourceCount: this.resourceCount
            });
            this.resourceLoadingDeferred = null;
        }
        else {
            this.resourceLoadingDeferred.notify({
                hasNoError: this.erroredResourceCount > 0,
                erroredResource: this.erroredResourceCount,
                loadedResource: this.loadedResourceCount,
                completedResource: this.completedResourceCount,
                lastLoadMessage: this.currentLoadingMessage,
                resourceCount: this.resourceCount
            });
        }
    };
    return ResourceLoader;
})();
module.exports = ResourceLoader;

},{"../ContextComponents":12,"q":309}],74:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var jThreeObject = require("../Base/JThreeObject");
var Buffer = require("./Resources/Buffer/Buffer");
var Shader = require("./Resources/Shader/Shader");
var Program = require("./Resources/Program/Program");
var Texture = require('./Resources/Texture/Texture');
var RBO = require('./Resources/RBO/RBO');
var ResourceArray = require('./Resources/ResourceArray');
var FBO = require('./Resources/FBO/FBO');
var BufferTexture = require('./Resources/Texture/BufferTexture');
var TextureFormat = require('../Wrapper/TextureInternalFormatType');
var ElementFormat = require('../Wrapper/TextureType');
var CubeTexture = require("./Resources/Texture/CubeTexture");
var ContextComponents = require("../ContextComponents");
var ResourceManager = (function (_super) {
    __extends(ResourceManager, _super);
    function ResourceManager() {
        _super.call(this);
        this.buffers = new ResourceArray();
        this.shaders = new ResourceArray();
        this.programs = new ResourceArray();
        this.textures = new ResourceArray();
        this.rbos = new ResourceArray();
        this.fbos = new ResourceArray();
    }
    ResourceManager.prototype.getContextComponentIndex = function () {
        return ContextComponents.ResourceManager;
    };
    ResourceManager.prototype.createBuffer = function (id, target, usage, unitCount, elementType) {
        return this.buffers.create(id, function () {
            return new Buffer(target, usage, unitCount, elementType);
        });
    };
    ResourceManager.prototype.getBuffer = function (id) {
        return this.buffers.get(id);
    };
    ResourceManager.prototype.createShader = function (id, source, shaderType) {
        return this.shaders.create(id, function () {
            return Shader.CreateShader(source, shaderType);
        });
    };
    ResourceManager.prototype.getShader = function (id) {
        return this.shaders.get(id);
    };
    ResourceManager.prototype.hasShader = function (id) {
        return this.shaders.has(id);
    };
    ResourceManager.prototype.createProgram = function (id, shaders) {
        return this.programs.create(id, function () {
            return Program.CreateProgram(shaders);
        });
    };
    ResourceManager.prototype.getProgram = function (id) {
        return this.programs.get(id);
    };
    ResourceManager.prototype.createTextureWithSource = function (id, source) {
        return this.textures.create(id, function () {
            var tex = new Texture(source, id);
            return tex;
        });
    };
    ResourceManager.prototype.getTexture = function (id) {
        return this.textures.get(id);
    };
    ResourceManager.prototype.createCubeTextureWithSource = function (id, sources, flipY) {
        if (flipY === void 0) { flipY = false; }
        return this.textures.create(id, function () {
            var cubeTexture = new CubeTexture(sources, id, flipY);
            return cubeTexture;
        });
    };
    ResourceManager.prototype.getTextureHandler = function (id, handler) {
        this.textures.getHandler(id, handler);
    };
    ResourceManager.prototype.createRBO = function (id, width, height) {
        return this.rbos.create(id, function () {
            var r = new RBO(width, height);
            r.each(function (v) { return v.init(); });
            return r;
        });
    };
    ResourceManager.prototype.getRBO = function (id) {
        return this.rbos.get(id);
    };
    ResourceManager.prototype.createFBO = function (id) {
        return this.fbos.create(id, function () {
            var fbo = new FBO();
            fbo.each(function (v) { return v.init(); });
            return fbo;
        });
    };
    ResourceManager.prototype.getFBO = function (id) {
        return this.fbos.get(id);
    };
    ResourceManager.prototype.createTexture = function (id, width, height, texType, elemType) {
        if (texType === void 0) { texType = TextureFormat.RGBA; }
        if (elemType === void 0) { elemType = ElementFormat.UnsignedByte; }
        return this.textures.create(id, function () {
            var bt = new BufferTexture(width, height, texType, elemType, id);
            bt.each(function (v) { return v.init(); });
            return bt;
        });
    };
    ResourceManager.prototype.toString = function () {
        return "buffer:" + this.buffers.toString() + "\nshader:" + this.shaders.toString() + "\nprograms:" + this.programs.toString() + "\ntexture:" + this.textures.toString();
    };
    return ResourceManager;
})(jThreeObject);
module.exports = ResourceManager;

},{"../Base/JThreeObject":9,"../ContextComponents":12,"../Wrapper/TextureInternalFormatType":295,"../Wrapper/TextureType":296,"./Resources/Buffer/Buffer":75,"./Resources/FBO/FBO":78,"./Resources/Program/Program":80,"./Resources/RBO/RBO":92,"./Resources/ResourceArray":94,"./Resources/Shader/Shader":96,"./Resources/Texture/BufferTexture":98,"./Resources/Texture/CubeTexture":100,"./Resources/Texture/Texture":102}],75:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ContextSafeResourceContainer = require("../ContextSafeResourceContainer");
var BufferWrapper = require("./BufferWrapper");
var Buffer = (function (_super) {
    __extends(Buffer, _super);
    function Buffer(target, usage, unitCount, elementType) {
        _super.call(this);
        this.normalized = false;
        this.stride = 0;
        this.offset = 0;
        this.length = 0;
        this.target = target;
        this.usage = usage;
        this.unitCount = unitCount;
        this.elementType = elementType;
        this.initializeForFirst();
    }
    Object.defineProperty(Buffer.prototype, "Target", {
        get: function () {
            return this.target;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Buffer.prototype, "Usage", {
        get: function () {
            return this.usage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Buffer.prototype, "ElementType", {
        get: function () {
            return this.elementType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Buffer.prototype, "Normalized", {
        get: function () {
            return this.normalized;
        },
        set: function (normalized) {
            this.normalized = normalized;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Buffer.prototype, "Stride", {
        get: function () {
            return this.stride;
        },
        set: function (stride) {
            this.stride = stride;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Buffer.prototype, "Offset", {
        get: function () {
            return this.offset;
        },
        set: function (offset) {
            this.offset = offset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Buffer.prototype, "UnitCount", {
        get: function () {
            return this.unitCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Buffer.prototype, "ElementCache", {
        get: function () {
            return this.elementCache;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Buffer.prototype, "Length", {
        get: function () {
            return this.length;
        },
        enumerable: true,
        configurable: true
    });
    Buffer.prototype.update = function (array, length) {
        this.elementCache = array;
        this.length = length;
        this.each(function (a) { return a.update(array, length); });
    };
    Buffer.prototype.getInstanceForRenderer = function (renderer) {
        return new BufferWrapper(this, renderer);
    };
    return Buffer;
})(ContextSafeResourceContainer);
module.exports = Buffer;

},{"../ContextSafeResourceContainer":77,"./BufferWrapper":76}],76:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ResourceWrapper = require("../ResourceWrapper");
var BufferWrapper = (function (_super) {
    __extends(BufferWrapper, _super);
    function BufferWrapper(parentBuffer, canvas) {
        _super.call(this, canvas);
        this.targetBuffer = null;
        this.length = 0;
        this.parentBuffer = parentBuffer;
    }
    Object.defineProperty(BufferWrapper.prototype, "Length", {
        get: function () {
            return this.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BufferWrapper.prototype, "UnitCount", {
        get: function () {
            return this.parentBuffer.UnitCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BufferWrapper.prototype, "ElementType", {
        get: function () {
            return this.parentBuffer.ElementType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BufferWrapper.prototype, "Normalized", {
        get: function () {
            return this.parentBuffer.Normalized;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BufferWrapper.prototype, "Stride", {
        get: function () {
            return this.parentBuffer.Stride;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BufferWrapper.prototype, "Offset", {
        get: function () {
            return this.parentBuffer.Offset;
        },
        enumerable: true,
        configurable: true
    });
    BufferWrapper.prototype.update = function (array, length) {
        if (!this.Initialized) {
            this.init();
        }
        this.bindBuffer();
        this.GL.bufferData(this.parentBuffer.Target, array.buffer, this.parentBuffer.Usage);
        this.unbindBuffer();
        this.length = length;
    };
    BufferWrapper.prototype.init = function () {
        if (this.targetBuffer == null) {
            this.targetBuffer = this.GL.createBuffer();
            this.setInitialized();
        }
    };
    BufferWrapper.prototype.bindBuffer = function () {
        if (this.Initialized) {
            this.GL.bindBuffer(this.parentBuffer.Target, this.targetBuffer);
        }
        else {
            this.init();
            this.GL.bindBuffer(this.parentBuffer.Target, this.targetBuffer);
            this.update(this.parentBuffer.ElementCache, this.parentBuffer.Length);
        }
    };
    BufferWrapper.prototype.unbindBuffer = function () {
        if (this.Initialized) {
            this.GL.bindBuffer(this.parentBuffer.Target, null);
        }
    };
    return BufferWrapper;
})(ResourceWrapper);
module.exports = BufferWrapper;

},{"../ResourceWrapper":95}],77:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JThreeObjectWithID = require("../../Base/JThreeObjectWithID");
var Exceptions = require("../../Exceptions");
var ListStateChangedType = require("../ListStateChangedType");
var AssociativeArray = require('../../Base/Collections/AssociativeArray');
var JThreeContext = require("../../JThreeContext");
var ContextComponents = require("../../ContextComponents");
var ContextSafeResourceContainer = (function (_super) {
    __extends(ContextSafeResourceContainer, _super);
    function ContextSafeResourceContainer() {
        _super.call(this);
        this.childWrapper = new AssociativeArray();
        var canvasManager = JThreeContext.getContextComponent(ContextComponents.CanvasManager);
        canvasManager.canvasListChanged.addListener(this.rendererChanged.bind(this));
    }
    ContextSafeResourceContainer.prototype.initializeForFirst = function () {
        var _this = this;
        var canvasManager = JThreeContext.getContextComponent(ContextComponents.CanvasManager);
        canvasManager.canvases.forEach(function (v) {
            _this.childWrapper.set(v.ID, _this.getInstanceForRenderer(v));
        });
    };
    Object.defineProperty(ContextSafeResourceContainer.prototype, "wrappers", {
        get: function () {
            return this.childWrapper.asArray;
        },
        enumerable: true,
        configurable: true
    });
    ContextSafeResourceContainer.prototype.getForContext = function (canvas) {
        return this.getForContextID(canvas.ID);
    };
    ContextSafeResourceContainer.prototype.getForContextID = function (id) {
        if (!this.childWrapper.has(id))
            console.log("There is no matching object with the ID:" + id);
        return this.childWrapper.get(id);
    };
    ContextSafeResourceContainer.prototype.each = function (act) {
        this.childWrapper.forEach((function (v, i, a) {
            act(v);
        }));
    };
    ContextSafeResourceContainer.prototype.rendererChanged = function (object, arg) {
        switch (arg.ChangeType) {
            case ListStateChangedType.Add:
                this.childWrapper.set(arg.AffectedRenderer.ID, this.getInstanceForRenderer(arg.AffectedRenderer));
                break;
            case ListStateChangedType.Delete:
                var delTarget = this.childWrapper.get(arg.AffectedRenderer.ID);
                this.childWrapper.delete(arg.AffectedRenderer.ID);
                this.disposeResource(delTarget);
                break;
        }
    };
    ContextSafeResourceContainer.prototype.getInstanceForRenderer = function (renderer) {
        throw new Exceptions.AbstractClassMethodCalledException();
    };
    ContextSafeResourceContainer.prototype.disposeResource = function (resource) {
        throw new Exceptions.AbstractClassMethodCalledException();
    };
    return ContextSafeResourceContainer;
})(JThreeObjectWithID);
module.exports = ContextSafeResourceContainer;

},{"../../Base/Collections/AssociativeArray":2,"../../Base/JThreeObjectWithID":10,"../../ContextComponents":12,"../../Exceptions":141,"../../JThreeContext":226,"../ListStateChangedType":43}],78:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FBOWrapper = require("./FBOWrapper");
var ContextSafeResourceContainer = require("./../ContextSafeResourceContainer");
var FBO = (function (_super) {
    __extends(FBO, _super);
    function FBO() {
        _super.call(this);
        this.initializeForFirst();
    }
    FBO.prototype.getInstanceForRenderer = function (renderer) {
        return new FBOWrapper(renderer);
    };
    FBO.prototype.disposeResource = function (resource) {
    };
    return FBO;
})(ContextSafeResourceContainer);
module.exports = FBO;

},{"./../ContextSafeResourceContainer":77,"./FBOWrapper":79}],79:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ResourceWrapper = require('../ResourceWrapper');
var ClearTargetType = require('../../../Wrapper/ClearTargetType');
var FBOWrapper = (function (_super) {
    __extends(FBOWrapper, _super);
    function FBOWrapper(renderer) {
        _super.call(this, renderer);
        this.textures = [];
    }
    Object.defineProperty(FBOWrapper.prototype, "TargetShader", {
        get: function () {
            if (!this.Initialized)
                this.init();
            return this.targetFBO;
        },
        enumerable: true,
        configurable: true
    });
    FBOWrapper.prototype.init = function () {
        if (!this.Initialized) {
            this.targetFBO = this.GL.createFramebuffer();
            this.GL.bindFramebuffer(this.GL.FRAMEBUFFER, this.targetFBO);
            this.setInitialized();
        }
    };
    FBOWrapper.prototype.bind = function () {
        if (!this.Initialized)
            this.init();
        this.GL.bindFramebuffer(this.GL.FRAMEBUFFER, this.targetFBO);
    };
    FBOWrapper.prototype.unbind = function () {
        this.GL.bindFramebuffer(this.GL.FRAMEBUFFER, null);
    };
    FBOWrapper.prototype.attachTexture = function (attachmentType, tex) {
        if (!this.Initialized)
            this.init();
        this.bind();
        if (tex == null) {
            this.GL.framebufferTexture2D(this.GL.FRAMEBUFFER, attachmentType, this.GL.TEXTURE_2D, null, 0);
            return;
        }
        var wt = tex.getForContext(this.OwnerCanvas);
        wt.preTextureUpload();
        this.GL.framebufferTexture2D(this.GL.FRAMEBUFFER, attachmentType, this.GL.TEXTURE_2D, wt.TargetTexture, 0);
        tex.getForContext(this.OwnerCanvas).bind();
        tex.generateMipmapIfNeed();
        if (this.textures.indexOf(tex) !== -1)
            this.textures.push(tex);
        this.GL.bindTexture(tex.TargetTextureType, null);
    };
    FBOWrapper.prototype.attachRBO = function (attachmentType, rbo) {
        if (!this.Initialized)
            this.init();
        this.bind();
        if (rbo == null) {
            this.GL.framebufferRenderbuffer(this.GL.FRAMEBUFFER, attachmentType, this.GL.RENDERBUFFER, null);
            return;
        }
        var wrapper = rbo.getForContext(this.OwnerCanvas);
        this.GL.framebufferRenderbuffer(this.GL.FRAMEBUFFER, attachmentType, this.GL.RENDERBUFFER, wrapper.Target);
    };
    FBOWrapper.prototype.dispose = function () {
        if (this.Initialized) {
            this.targetFBO = null;
            this.setInitialized(false);
        }
    };
    FBOWrapper.prototype.clear = function (r, g, b, a, d, s) {
        this.bind();
        var clearFlag = 0;
        if (typeof r !== 'undefined' && typeof g !== 'undefined' && typeof b !== 'undefined' && typeof a !== 'undefined') {
            clearFlag = clearFlag | ClearTargetType.ColorBits;
            this.GL.clearColor(r, g, b, a);
        }
        if (typeof d !== 'undefined') {
            clearFlag = clearFlag | ClearTargetType.DepthBits;
            this.GL.clearDepth(d);
        }
        this.GL.clear(clearFlag);
    };
    return FBOWrapper;
})(ResourceWrapper);
module.exports = FBOWrapper;

},{"../../../Wrapper/ClearTargetType":279,"../ResourceWrapper":95}],80:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ContextSafeContainer = require("../ContextSafeResourceContainer");
var ProgramWrapper = require("./ProgramWrapper");
var Program = (function (_super) {
    __extends(Program, _super);
    function Program() {
        _super.call(this);
        this.attachedShaders = [];
        this.initializeForFirst();
    }
    Object.defineProperty(Program.prototype, "AttachedShaders", {
        get: function () {
            return this.attachedShaders;
        },
        enumerable: true,
        configurable: true
    });
    Program.prototype.attachShader = function (shader) {
        var _this = this;
        this.attachedShaders.push(shader);
        shader.onUpdate(function () {
            _this.relinkShader();
        });
    };
    Program.CreateProgram = function (attachShaders) {
        var program = new Program();
        program.attachedShaders = attachShaders;
        return program;
    };
    Program.prototype.disposeResource = function (resource) {
        resource.dispose();
    };
    Program.prototype.getInstanceForRenderer = function (renderer) {
        return new ProgramWrapper(this, renderer);
    };
    Program.prototype.relinkShader = function () {
        this.each(function (v) {
            v.relink();
        });
    };
    return Program;
})(ContextSafeContainer);
module.exports = Program;

},{"../ContextSafeResourceContainer":77,"./ProgramWrapper":81}],81:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ResourceWrapper = require('../ResourceWrapper');
var AssociativeArray = require('../../../Base/Collections/AssociativeArray');
var ProgramWrapper = (function (_super) {
    __extends(ProgramWrapper, _super);
    function ProgramWrapper(parent, canvas) {
        _super.call(this, canvas);
        this.isLinked = false;
        this.targetProgram = null;
        this.parentProgram = null;
        this.attributeLocations = new AssociativeArray();
        this.uniformLocations = new AssociativeArray();
        this.parentProgram = parent;
    }
    Object.defineProperty(ProgramWrapper.prototype, "TargetProgram", {
        get: function () {
            return this.targetProgram;
        },
        enumerable: true,
        configurable: true
    });
    ProgramWrapper.prototype.init = function () {
        var _this = this;
        if (!this.Initialized) {
            this.targetProgram = this.GL.createProgram();
            this.parentProgram.AttachedShaders.forEach(function (v, i, a) {
                _this.GL.attachShader(_this.targetProgram, v.getForContextID(_this.OwnerID).TargetShader);
            });
            this.setInitialized();
        }
    };
    ProgramWrapper.prototype.dispose = function () {
        if (this.Initialized) {
            this.GL.deleteProgram(this.targetProgram);
            this.setInitialized(false);
            this.targetProgram = null;
            this.isLinked = false;
        }
    };
    ProgramWrapper.prototype.linkProgram = function () {
        if (!this.isLinked) {
            this.GL.linkProgram(this.targetProgram);
            this.isLinked = true;
        }
    };
    ProgramWrapper.prototype.useProgram = function () {
        if (!this.Initialized) {
            this.init();
        }
        if (!this.isLinked) {
            this.linkProgram();
        }
        this.GL.useProgram(this.targetProgram);
    };
    ProgramWrapper.prototype.fetchUniformLocation = function (valName) {
        if (!this.uniformLocations.has(valName)) {
            this.uniformLocations.set(valName, this.GL.getUniformLocation(this.TargetProgram, valName));
        }
        return this.uniformLocations.get(valName);
    };
    ProgramWrapper.prototype.relink = function () {
        var _this = this;
        this.GL.deleteProgram(this.TargetProgram);
        this.targetProgram = this.GL.createProgram();
        this.parentProgram.AttachedShaders.forEach(function (v, i, a) {
            _this.GL.attachShader(_this.targetProgram, v.getForContextID(_this.OwnerID).TargetShader);
        });
    };
    ProgramWrapper.prototype.register = function (variables) {
        this.useProgram();
        var uniformRegisterTypeList = require("./VariableRegister/Uniforms/UniformTypeList");
        if (typeof variables.uniforms !== "undefined") {
            for (var uniformKey in variables.uniforms) {
                var uniform = variables.uniforms[uniformKey];
                uniform['context'] = this.OwnerCanvas;
                var index = this.fetchUniformLocation(uniformKey);
                var registerer = uniformRegisterTypeList[uniform.type];
                registerer.registerVariable(this.GL, index, uniform.value, uniform);
            }
        }
        if (typeof variables.attributes !== "undefined") {
            for (var attributeKey in variables.attributes) {
                var attribute = variables.attributes[attributeKey];
                var buffer = attribute.getForContext(this.OwnerCanvas);
                buffer.bindBuffer();
                if (!this.attributeLocations.has(attributeKey)) {
                    this.attributeLocations.set(attributeKey, this.GL.getAttribLocation(this.TargetProgram, attributeKey));
                }
                var attribIndex = this.attributeLocations.get(attributeKey);
                this.GL.enableVertexAttribArray(attribIndex);
                this.GL.vertexAttribPointer(attribIndex, buffer.UnitCount, buffer.ElementType, buffer.Normalized, buffer.Stride, buffer.Offset);
            }
        }
    };
    return ProgramWrapper;
})(ResourceWrapper);
module.exports = ProgramWrapper;

},{"../../../Base/Collections/AssociativeArray":2,"../ResourceWrapper":95,"./VariableRegister/Uniforms/UniformTypeList":88}],82:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UniformVariableRegisterBase = require("./UniformVariableRegisterBase");
var MatrixFloatArrayRegister = (function (_super) {
    __extends(MatrixFloatArrayRegister, _super);
    function MatrixFloatArrayRegister() {
        _super.apply(this, arguments);
    }
    MatrixFloatArrayRegister.prototype.registerVariable = function (gl, index, value, configure) {
        var matrix = value;
        gl.uniform4fv(index, matrix);
    };
    return MatrixFloatArrayRegister;
})(UniformVariableRegisterBase);
module.exports = MatrixFloatArrayRegister;

},{"./UniformVariableRegisterBase":89}],83:[function(require,module,exports){
var MatrixFloatRegister = (function () {
    function MatrixFloatRegister() {
    }
    MatrixFloatRegister.prototype.registerVariable = function (gl, index, value, configure) {
        if (!value)
            throw new Error("matrix can not be undefined!");
        gl.uniformMatrix4fv(index, false, value.rawElements);
    };
    return MatrixFloatRegister;
})();
module.exports = MatrixFloatRegister;

},{}],84:[function(require,module,exports){
var ScalarFloatRegister = (function () {
    function ScalarFloatRegister() {
    }
    ScalarFloatRegister.prototype.registerVariable = function (gl, index, value, configure) {
        gl.uniform1f(index, value);
    };
    return ScalarFloatRegister;
})();
module.exports = ScalarFloatRegister;

},{}],85:[function(require,module,exports){
var ScalarIntegerRegister = (function () {
    function ScalarIntegerRegister() {
    }
    ScalarIntegerRegister.prototype.registerVariable = function (gl, index, value, configure) {
        gl.uniform1i(index, value);
    };
    return ScalarIntegerRegister;
})();
module.exports = ScalarIntegerRegister;

},{}],86:[function(require,module,exports){
var Texture2DRegister = (function () {
    function Texture2DRegister() {
    }
    Texture2DRegister.prototype.registerVariable = function (gl, index, value, configure) {
        var texNumber = configure.register;
        if (value != null) {
            var tex = value.getForContext(configure.context);
            if (tex.Initialized) {
                if (tex.registerTexture(texNumber))
                    gl.uniform1i(index, texNumber);
                return;
            }
        }
    };
    return Texture2DRegister;
})();
module.exports = Texture2DRegister;

},{}],87:[function(require,module,exports){
var TextureArrayRegister = (function () {
    function TextureArrayRegister() {
    }
    TextureArrayRegister.prototype.registerVariable = function (gl, index, value, configure) {
        if (value != null) {
            var textures = value;
            var texBegin = configure.registerBegin;
            var texEnd = configure.registerEnd || texBegin + textures.length;
            var texIndicies = new Int32Array(texEnd - texBegin);
            for (var i = texBegin; i < texEnd; i++) {
                if (textures[i - texBegin]) {
                    var tex = value[i - texBegin].getForContext(configure.context);
                    if (tex.Initialized && tex.registerTexture(i)) {
                        texIndicies[i - texBegin] = i;
                        continue;
                    }
                }
                texIndicies[i - texBegin] = 0;
            }
            gl.uniform1iv(index, texIndicies);
        }
    };
    return TextureArrayRegister;
})();
module.exports = TextureArrayRegister;

},{}],88:[function(require,module,exports){
var UniformTypeList = {
    "float": new (require("./ScalarFloatRegister"))(),
    "integer": new (require("./ScalarIntegerRegister"))(),
    "matrix": new (require("./MatrixFloatRegister"))(),
    "vector": new (require("./VectorFloatRegister"))(),
    "texture": new (require("./Texture2DRegister"))(),
    "vectorarray": new (require("./VectorFloatArrayRegister"))(),
    "matrixarray": new (require("./MatrixFloatArrayRegister"))(),
    "texturearray": new (require("./TextureArrayRegister"))()
};
module.exports = UniformTypeList;

},{"./MatrixFloatArrayRegister":82,"./MatrixFloatRegister":83,"./ScalarFloatRegister":84,"./ScalarIntegerRegister":85,"./Texture2DRegister":86,"./TextureArrayRegister":87,"./VectorFloatArrayRegister":90,"./VectorFloatRegister":91}],89:[function(require,module,exports){
var UniformVariableRegisterBase = (function () {
    function UniformVariableRegisterBase() {
    }
    UniformVariableRegisterBase.prototype.registerVariable = function (gl, index, value, configure) {
    };
    return UniformVariableRegisterBase;
})();
module.exports = UniformVariableRegisterBase;

},{}],90:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UniformVariableRegisterBase = require("./UniformVariableRegisterBase");
var VectorFloatArrayRegister = (function (_super) {
    __extends(VectorFloatArrayRegister, _super);
    function VectorFloatArrayRegister() {
        _super.apply(this, arguments);
    }
    VectorFloatArrayRegister.prototype.registerVariable = function (gl, index, value, configure) {
        var vec = value;
        if (vec.length > 0) {
            switch (vec[0].ElementCount) {
                case 2:
                    var arr = new Array(vec.length * 2);
                    for (var i = 0; i < vec.length; i++) {
                        arr[i * 2] = vec[i].X;
                        arr[i * 2 + 1] = vec[i].Y;
                    }
                    gl.uniform2fv(index, new Float32Array(arr));
                    break;
                case 3:
                    var arr = new Array(vec.length * 3);
                    for (var i = 0; i < vec.length; i++) {
                        arr[i * 3] = vec[i].X;
                        arr[i * 3 + 1] = vec[i].Y;
                        arr[i * 3 + 2] = vec[i].Z;
                    }
                    gl.uniform3fv(index, new Float32Array(arr));
                    break;
                case 4:
                    var arr = new Array(vec.length * 4);
                    for (var i = 0; i < vec.length; i++) {
                        arr[i * 4] = vec[i].X;
                        arr[i * 4 + 1] = vec[i].Y;
                        arr[i * 4 + 2] = vec[i].Z;
                        arr[i * 4 + 3] = vec[i].W;
                    }
                    gl.uniform4fv(index, new Float32Array(arr));
                    break;
            }
        }
    };
    return VectorFloatArrayRegister;
})(UniformVariableRegisterBase);
module.exports = VectorFloatArrayRegister;

},{"./UniformVariableRegisterBase":89}],91:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UniformVariableRegisterBase = require("./UniformVariableRegisterBase");
var VectorFloatRegister = (function (_super) {
    __extends(VectorFloatRegister, _super);
    function VectorFloatRegister() {
        _super.apply(this, arguments);
    }
    VectorFloatRegister.prototype.registerVariable = function (gl, index, value, configure) {
        var vec = value;
        switch (vec.ElementCount) {
            case 2:
                var vec2 = vec;
                gl.uniform2f(index, vec2.X, vec2.Y);
                break;
            case 3:
                var vec3 = vec;
                gl.uniform3f(index, vec3.X, vec3.Y, vec3.Z);
                break;
            case 4:
                var vec4 = vec;
                gl.uniform4f(index, vec4.X, vec4.Y, vec4.Z, vec4.W);
                break;
        }
    };
    return VectorFloatRegister;
})(UniformVariableRegisterBase);
module.exports = VectorFloatRegister;

},{"./UniformVariableRegisterBase":89}],92:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ContextSafeResourceContainer = require("./../ContextSafeResourceContainer");
var RBOWrapper = require("./RBOWrapper");
var RBOInternalFormatType = require("../../../Wrapper/RBO/RBOInternalFormat");
var RBO = (function (_super) {
    __extends(RBO, _super);
    function RBO(width, height, format) {
        if (format === void 0) { format = RBOInternalFormatType.DepthComponent16; }
        _super.call(this);
        this.width = width;
        this.height = height;
        this.format = format;
        this.initializeForFirst();
    }
    Object.defineProperty(RBO.prototype, "Width", {
        get: function () {
            return this.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RBO.prototype, "Height", {
        get: function () {
            return this.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RBO.prototype, "Format", {
        get: function () {
            return this.format;
        },
        enumerable: true,
        configurable: true
    });
    RBO.prototype.getInstanceForRenderer = function (renderer) {
        return new RBOWrapper(renderer, this);
    };
    RBO.prototype.disposeResource = function (resource) {
    };
    RBO.prototype.resize = function (width, height) {
        if (this.width !== width || this.height !== height) {
            this.width = width;
            this.height = height;
            this.each(function (v) { return v.resize(width, height); });
        }
    };
    return RBO;
})(ContextSafeResourceContainer);
module.exports = RBO;

},{"../../../Wrapper/RBO/RBOInternalFormat":285,"./../ContextSafeResourceContainer":77,"./RBOWrapper":93}],93:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ResourceWrapper = require("../ResourceWrapper");
var RBOWrapper = (function (_super) {
    __extends(RBOWrapper, _super);
    function RBOWrapper(canvas, parentRBO) {
        _super.call(this, canvas);
        this.parent = parentRBO;
    }
    Object.defineProperty(RBOWrapper.prototype, "Target", {
        get: function () {
            return this.targetRBO;
        },
        enumerable: true,
        configurable: true
    });
    RBOWrapper.prototype.init = function () {
        if (this.Initialized)
            return;
        this.targetRBO = this.GL.createRenderbuffer();
        this.bind();
        this.GL.renderbufferStorage(this.GL.RENDERBUFFER, this.parent.Format, this.parent.Width, this.parent.Height);
        this.setInitialized();
    };
    RBOWrapper.prototype.bind = function () {
        this.GL.bindRenderbuffer(this.GL.RENDERBUFFER, this.targetRBO);
    };
    RBOWrapper.prototype.resize = function (width, height) {
        if (this.Initialized) {
            this.bind();
            this.GL.renderbufferStorage(this.GL.RENDERBUFFER, this.parent.Format, this.parent.Width, this.parent.Height);
        }
    };
    return RBOWrapper;
})(ResourceWrapper);
module.exports = RBOWrapper;

},{"../ResourceWrapper":95}],94:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AssociativeArray = require("../../Base/Collections/AssociativeArray");
var JThreeObject = require("../../Base/JThreeObject");
var ResourceArray = (function (_super) {
    __extends(ResourceArray, _super);
    function ResourceArray() {
        _super.call(this);
        this.resourceArray = new AssociativeArray();
        this.handlerArray = new AssociativeArray();
    }
    ResourceArray.prototype.create = function (id, creationFunc) {
        if (this.resourceArray.has(id)) {
            var resource = this.resourceArray.get(id);
            return resource;
        }
        else {
            resource = creationFunc();
            this.resourceArray.set(id, resource);
            var handlers = this.handlerArray.get(id);
            if (handlers)
                handlers.forEach(function (v) { return v(resource); });
            return resource;
        }
    };
    ResourceArray.prototype.get = function (id) {
        return this.resourceArray.get(id);
    };
    ResourceArray.prototype.has = function (id) {
        return this.resourceArray.has(id);
    };
    ResourceArray.prototype.getHandler = function (id, handler) {
        if (this.has(id))
            handler(this.get(id));
        else {
            if (this.handlerArray.has(id))
                this.handlerArray.get(id).push(handler);
            else {
                this.handlerArray.set(id, [handler]);
            }
        }
    };
    ResourceArray.prototype.toString = function () {
        var logInfo = "";
        this.resourceArray.forEach(function (v, k, m) {
            logInfo = logInfo + k + "\n";
        });
        return logInfo;
    };
    return ResourceArray;
})(JThreeObject);
module.exports = ResourceArray;

},{"../../Base/Collections/AssociativeArray":2,"../../Base/JThreeObject":9}],95:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JThreeObject = require('../../Base/JThreeObject');
var JThreeEvent = require('../../Base/JThreeEvent');
var ResourceWrapper = (function (_super) {
    __extends(ResourceWrapper, _super);
    function ResourceWrapper(ownerCanvas) {
        _super.call(this);
        this.onInitializeChangedEvent = new JThreeEvent();
        this.ownerCanvas = ownerCanvas;
    }
    Object.defineProperty(ResourceWrapper.prototype, "OwnerCanvas", {
        get: function () {
            return this.ownerCanvas;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceWrapper.prototype, "OwnerID", {
        get: function () {
            return this.ownerCanvas.ID;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceWrapper.prototype, "GL", {
        get: function () {
            return this.ownerCanvas.GL;
        },
        enumerable: true,
        configurable: true
    });
    ResourceWrapper.prototype.onInitializeChanged = function (handler) {
        this.onInitializeChangedEvent.addListener(handler);
    };
    Object.defineProperty(ResourceWrapper.prototype, "Initialized", {
        get: function () {
            return this.initialized;
        },
        enumerable: true,
        configurable: true
    });
    ResourceWrapper.prototype.setInitialized = function (initialized) {
        if (typeof initialized === "undefined")
            initialized = true;
        if (initialized === this.initialized)
            return;
        this.initialized = initialized;
        this.onInitializeChangedEvent.fire(this, initialized);
    };
    ResourceWrapper.prototype.init = function () {
    };
    return ResourceWrapper;
})(JThreeObject);
module.exports = ResourceWrapper;

},{"../../Base/JThreeEvent":6,"../../Base/JThreeObject":9}],96:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ContextSafeContainer = require("../ContextSafeResourceContainer");
var ShaderWrapper = require("./ShaderWrapper");
var JThreeEvent = require("../../../Base/JThreeEvent");
var Shader = (function (_super) {
    __extends(Shader, _super);
    function Shader() {
        _super.call(this);
        this.onUpdateEvent = new JThreeEvent();
        this.initializeForFirst();
    }
    Shader.CreateShader = function (source, shaderType) {
        var shader = new Shader();
        shader.shaderSource = source;
        shader.shaderType = shaderType;
        return shader;
    };
    Object.defineProperty(Shader.prototype, "ShaderType", {
        get: function () {
            return this.shaderType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shader.prototype, "ShaderSource", {
        get: function () {
            return this.shaderSource;
        },
        enumerable: true,
        configurable: true
    });
    Shader.prototype.loadAll = function () {
        this.each(function (v) {
            v.init();
        });
    };
    Shader.prototype.getInstanceForRenderer = function (renderer) {
        return new ShaderWrapper(this, renderer);
    };
    Shader.prototype.update = function (shaderSource) {
        this.shaderSource = shaderSource;
        this.each(function (v) {
            v.update();
        });
        this.onUpdateEvent.fire(this, shaderSource);
    };
    Shader.prototype.onUpdate = function (handler) {
        this.onUpdateEvent.addListener(handler);
    };
    Shader.prototype.disposeResource = function (resource) {
        resource.dispose();
    };
    return Shader;
})(ContextSafeContainer);
module.exports = Shader;

},{"../../../Base/JThreeEvent":6,"../ContextSafeResourceContainer":77,"./ShaderWrapper":97}],97:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ResourceWrapper = require('../ResourceWrapper');
var ShaderWrapper = (function (_super) {
    __extends(ShaderWrapper, _super);
    function ShaderWrapper(parent, canvas) {
        _super.call(this, canvas);
        this.targetShader = null;
        this.parentShader = parent;
    }
    Object.defineProperty(ShaderWrapper.prototype, "TargetShader", {
        get: function () {
            if (!this.Initialized)
                this.init();
            return this.targetShader;
        },
        enumerable: true,
        configurable: true
    });
    ShaderWrapper.prototype.init = function () {
        if (!this.Initialized) {
            this.targetShader = this.GL.createShader(this.parentShader.ShaderType);
            this.GL.shaderSource(this.targetShader, this.parentShader.ShaderSource);
            this.GL.compileShader(this.targetShader);
            this.setInitialized(true);
        }
    };
    ShaderWrapper.prototype.dispose = function () {
        if (this.Initialized) {
            this.GL.deleteShader(this.targetShader);
            this.targetShader = null;
            this.setInitialized(false);
        }
    };
    ShaderWrapper.prototype.update = function () {
        this.GL.deleteShader(this.targetShader);
        this.targetShader = this.GL.createShader(this.parentShader.ShaderType);
        this.GL.shaderSource(this.TargetShader, this.parentShader.ShaderSource);
        this.GL.compileShader(this.TargetShader);
    };
    return ShaderWrapper;
})(ResourceWrapper);
module.exports = ShaderWrapper;

},{"../ResourceWrapper":95}],98:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BufferTextureWrapper = require('./BufferTextureWrapper');
var ElementFormat = require('../../../Wrapper/TextureType');
var TextureMinFilterType = require('../../../Wrapper/Texture/TextureMinFilterType');
var TextureMagFilterType = require('../../../Wrapper/Texture/TextureMagFilterType');
var TextureBase = require('./TextureBase');
var BufferTexture = (function (_super) {
    __extends(BufferTexture, _super);
    function BufferTexture(width, height, textureFormat, elementFormat, textureName) {
        _super.call(this, textureName);
        this.width = width;
        this.height = height;
        this.textureFormat = textureFormat;
        this.elementFormat = elementFormat;
        if (this.elementFormat == ElementFormat.Float) {
            this.MinFilter = TextureMinFilterType.Nearest;
            this.MagFilter = TextureMagFilterType.Nearest;
        }
    }
    Object.defineProperty(BufferTexture.prototype, "Width", {
        get: function () {
            return this.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BufferTexture.prototype, "Height", {
        get: function () {
            return this.height;
        },
        enumerable: true,
        configurable: true
    });
    BufferTexture.prototype.getInstanceForRenderer = function (canvas) {
        var textureWrapper = new BufferTextureWrapper(canvas, this);
        return textureWrapper;
    };
    BufferTexture.prototype.resize = function (width, height) {
        if (this.width !== width || this.height !== height) {
            this.width = width;
            this.height = height;
            this.each(function (v) { return v.resize(width, height); });
        }
    };
    BufferTexture.prototype.updateTexture = function (buffer) {
        this.each(function (t) {
            t.updateTexture(buffer);
        });
    };
    return BufferTexture;
})(TextureBase);
module.exports = BufferTexture;

},{"../../../Wrapper/Texture/TextureMagFilterType":290,"../../../Wrapper/Texture/TextureMinFilterType":291,"../../../Wrapper/TextureType":296,"./BufferTextureWrapper":99,"./TextureBase":103}],99:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TargetTextureType = require('../../../Wrapper/TargetTextureType');
var TextureWrapperBase = require('./TextureWrapperBase');
var TexImage2DTargetType = require("../../../Wrapper/Texture/TexImageTargetType");
var BufferTextureWrapper = (function (_super) {
    __extends(BufferTextureWrapper, _super);
    function BufferTextureWrapper(ownerCanvas, parent) {
        _super.call(this, ownerCanvas, parent);
    }
    BufferTextureWrapper.prototype.init = function () {
        if (this.Initialized)
            return;
        var parent = this.Parent;
        this.setTargetTexture(this.GL.createTexture());
        this.bind();
        this.GL.texImage2D(TexImage2DTargetType.Texture2D, 0, parent.TextureFormat, parent.Width, parent.Height, 0, parent.TextureFormat, parent.ElementFormat, null);
        this.setInitialized();
    };
    BufferTextureWrapper.prototype.unbind = function () {
        this.GL.bindTexture(TargetTextureType.Texture2D, null);
    };
    BufferTextureWrapper.prototype.resize = function (width, height) {
        this.bind();
        if (this.Initialized) {
            var parent = this.Parent;
            this.preTextureUpload();
            this.GL.texImage2D(TexImage2DTargetType.Texture2D, 0, parent.TextureFormat, parent.Width, parent.Height, 0, parent.TextureFormat, parent.ElementFormat, null);
        }
    };
    BufferTextureWrapper.prototype.updateTexture = function (buffer) {
        this.bind();
        if (this.Initialized) {
            var parent = this.Parent;
            this.preTextureUpload();
            this.GL.texImage2D(TexImage2DTargetType.Texture2D, 0, parent.TextureFormat, parent.Width, parent.Height, 0, parent.TextureFormat, parent.ElementFormat, buffer);
        }
        this.unbind();
    };
    BufferTextureWrapper.prototype.generateHtmlImage = function (encoder) {
        var parent = this.Parent;
        return this.encodeHtmlImage(parent.Width, parent.Height, encoder);
    };
    return BufferTextureWrapper;
})(TextureWrapperBase);
module.exports = BufferTextureWrapper;

},{"../../../Wrapper/TargetTextureType":287,"../../../Wrapper/Texture/TexImageTargetType":289,"./TextureWrapperBase":105}],100:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TextureBase = require("./TextureBase");
var CubeTextureWrapper = require("./CubeTextureWrapper");
var CubeTexture = (function (_super) {
    __extends(CubeTexture, _super);
    function CubeTexture(source, textureName, flipY) {
        _super.call(this, textureName, flipY, true);
        this.imageSource = null;
        this.ImageSource = source;
    }
    Object.defineProperty(CubeTexture.prototype, "ImageSource", {
        get: function () {
            return this.imageSource;
        },
        set: function (img) {
            this.imageSource = img;
            this.each(function (v) { return v.init(true); });
            this.generateMipmapIfNeed();
        },
        enumerable: true,
        configurable: true
    });
    CubeTexture.prototype.getInstanceForRenderer = function (canvas) {
        var textureWrapper = new CubeTextureWrapper(canvas, this);
        return textureWrapper;
    };
    return CubeTexture;
})(TextureBase);
module.exports = CubeTexture;

},{"./CubeTextureWrapper":101,"./TextureBase":103}],101:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TextureWrapperBase = require("./TextureWrapperBase");
var TextureTargetType = require("../../../Wrapper/TargetTextureType");
var TexImageTargetType = require("../../../Wrapper/Texture/TexImageTargetType");
var TextureInternalFormat = require("../../../Wrapper/TextureInternalFormatType");
var TextureType = require("../../../Wrapper/TextureType");
var CubeTextureWrapper = (function (_super) {
    __extends(CubeTextureWrapper, _super);
    function CubeTextureWrapper(canvas, parent) {
        _super.call(this, canvas, parent);
    }
    CubeTextureWrapper.prototype.init = function (isChanged) {
        var parent = this.Parent;
        if (this.Initialized && !isChanged)
            return;
        if (this.TargetTexture == null)
            this.setTargetTexture(this.GL.createTexture());
        this.GL.bindTexture(TextureTargetType.CubeTexture, this.TargetTexture);
        if (parent.ImageSource == null) {
            for (var i = 0; i < 6; i++) {
                this.GL.texImage2D(TexImageTargetType.CubePositiveX + i, 0, TextureInternalFormat.RGBA, 1, 1, 0, TextureInternalFormat.RGBA, TextureType.UnsignedByte, TextureWrapperBase.altTextureBuffer);
            }
        }
        else {
            this.preTextureUpload();
            for (var i = 0; i < 6; i++) {
                if (parent.ImageSource[i])
                    this.GL.texImage2D(TexImageTargetType.CubePositiveX + i, 0, TextureInternalFormat.RGBA, TextureInternalFormat.RGBA, TextureType.UnsignedByte, parent.ImageSource[i]);
            }
        }
        this.GL.bindTexture(TextureTargetType.CubeTexture, null);
        this.setInitialized();
    };
    return CubeTextureWrapper;
})(TextureWrapperBase);
module.exports = CubeTextureWrapper;

},{"../../../Wrapper/TargetTextureType":287,"../../../Wrapper/Texture/TexImageTargetType":289,"../../../Wrapper/TextureInternalFormatType":295,"../../../Wrapper/TextureType":296,"./TextureWrapperBase":105}],102:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TextureWrapper = require('./TextureWrapper');
var TextureBase = require('./TextureBase');
var Texture = (function (_super) {
    __extends(Texture, _super);
    function Texture(source, textureName) {
        _super.call(this, textureName);
        this.imageSource = null;
        this.imageSource = source;
    }
    Object.defineProperty(Texture.prototype, "ImageSource", {
        get: function () {
            return this.imageSource;
        },
        set: function (img) {
            this.imageSource = img;
            this.each(function (v) { return v.init(true); });
            this.generateMipmapIfNeed();
        },
        enumerable: true,
        configurable: true
    });
    Texture.prototype.getInstanceForRenderer = function (canvas) {
        var textureWrapper = new TextureWrapper(canvas, this);
        return textureWrapper;
    };
    return Texture;
})(TextureBase);
module.exports = Texture;

},{"./TextureBase":103,"./TextureWrapper":104}],103:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ContextSafeResourceContainer = require("../ContextSafeResourceContainer");
var TextureParameterType = require("../../../Wrapper/Texture/TextureParameterType");
var TextureMinFilterType = require("../../../Wrapper/Texture/TextureMinFilterType");
var TextureMagFilterType = require("../../../Wrapper/Texture/TextureMagFilterType");
var TextureWrapType = require("../../../Wrapper/Texture/TextureWrapType");
var JThreeEvent = require("../../../Base/JThreeEvent");
var TextureTargetType = require("../../../Wrapper/TargetTextureType");
var ElementFormat = require("../../../Wrapper/TextureType");
var TextureFormat = require("../../../Wrapper/TextureInternalFormatType");
var TextureBase = (function (_super) {
    __extends(TextureBase, _super);
    function TextureBase(textureName, flipY, isCubeTexture) {
        _super.call(this);
        this.targetTextureType = TextureTargetType.Texture2D;
        this.textureFormat = TextureFormat.RGBA;
        this.elementFormat = ElementFormat.UnsignedByte;
        this.onFilterParameterChangedHandler = new JThreeEvent();
        this.minFilter = TextureMinFilterType.Nearest;
        this.magFilter = TextureMagFilterType.Nearest;
        this.tWrap = TextureWrapType.ClampToEdge;
        this.sWrap = TextureWrapType.ClampToEdge;
        this.flipY = false;
        if (typeof flipY === "undefined")
            flipY = false;
        if (typeof isCubeTexture === "undefined")
            isCubeTexture = false;
        this.flipY = flipY;
        this.targetTextureType = isCubeTexture ? TextureTargetType.CubeTexture : TextureTargetType.Texture2D;
        this.initializeForFirst();
    }
    Object.defineProperty(TextureBase.prototype, "TargetTextureType", {
        get: function () {
            return this.targetTextureType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextureBase.prototype, "TextureFormat", {
        get: function () {
            return this.textureFormat;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextureBase.prototype, "ElementFormat", {
        get: function () {
            return this.elementFormat;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextureBase.prototype, "FlipY", {
        get: function () {
            return this.flipY;
        },
        set: function (val) {
            this.flipY = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextureBase.prototype, "MinFilter", {
        get: function () {
            return this.minFilter;
        },
        set: function (value) {
            if (value === this.minFilter)
                return;
            this.minFilter = value;
            this.onFilterParameterChangedHandler.fire(this, TextureParameterType.MinFilter);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextureBase.prototype, "MagFilter", {
        get: function () {
            return this.magFilter;
        },
        set: function (value) {
            if (value === this.magFilter)
                return;
            this.magFilter = value;
            this.onFilterParameterChangedHandler.fire(this, TextureParameterType.MagFilter);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextureBase.prototype, "SWrap", {
        get: function () {
            return this.sWrap;
        },
        set: function (value) {
            if (this.sWrap === value)
                return;
            this.sWrap = value;
            this.onFilterParameterChangedHandler.fire(this, TextureParameterType.WrapS);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextureBase.prototype, "TWrap", {
        get: function () {
            return this.tWrap;
        },
        set: function (value) {
            if (this.tWrap === value)
                return;
            this.tWrap = value;
            this.onFilterParameterChangedHandler.fire(this, TextureParameterType.WrapT);
        },
        enumerable: true,
        configurable: true
    });
    TextureBase.prototype.onFilterParameterChanged = function (handler) {
        this.onFilterParameterChangedHandler.addListener(handler);
    };
    TextureBase.prototype.generateMipmapIfNeed = function () {
        var _this = this;
        switch (this.MinFilter) {
            case TextureMinFilterType.LinearMipmapLinear:
            case TextureMinFilterType.LinearMipmapNearest:
            case TextureMinFilterType.NearestMipmapLinear:
            case TextureMinFilterType.NearestMipmapNearest:
                this.each(function (v) {
                    v.bind();
                    v.GL.generateMipmap(_this.TargetTextureType);
                });
            default:
        }
    };
    Object.defineProperty(TextureBase.prototype, "TextureName", {
        get: function () {
            return this.textureName;
        },
        enumerable: true,
        configurable: true
    });
    return TextureBase;
})(ContextSafeResourceContainer);
module.exports = TextureBase;

},{"../../../Base/JThreeEvent":6,"../../../Wrapper/TargetTextureType":287,"../../../Wrapper/Texture/TextureMagFilterType":290,"../../../Wrapper/Texture/TextureMinFilterType":291,"../../../Wrapper/Texture/TextureParameterType":292,"../../../Wrapper/Texture/TextureWrapType":294,"../../../Wrapper/TextureInternalFormatType":295,"../../../Wrapper/TextureType":296,"../ContextSafeResourceContainer":77}],104:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TextureWrapperBase = require('./TextureWrapperBase');
var TextureTargetType = require('../../../Wrapper/TargetTextureType');
var TextureInternalFormat = require('../../../Wrapper/TextureInternalFormatType');
var TextureType = require('../../../Wrapper/TextureType');
var TexImage2DTargetType = require("../../../Wrapper/Texture/TexImageTargetType");
var TextureWrapper = (function (_super) {
    __extends(TextureWrapper, _super);
    function TextureWrapper(canvas, parent) {
        _super.call(this, canvas, parent);
    }
    TextureWrapper.prototype.init = function (isChanged) {
        var parent = this.Parent;
        if (this.Initialized && !isChanged)
            return;
        if (this.TargetTexture == null)
            this.setTargetTexture(this.GL.createTexture());
        this.GL.bindTexture(TextureTargetType.Texture2D, this.TargetTexture);
        if (parent.ImageSource == null) {
            this.GL.texImage2D(TexImage2DTargetType.Texture2D, 0, TextureInternalFormat.RGBA, 1, 1, 0, TextureInternalFormat.RGBA, TextureType.UnsignedByte, TextureWrapperBase.altTextureBuffer);
        }
        else {
            this.preTextureUpload();
            this.GL.texImage2D(TexImage2DTargetType.Texture2D, 0, TextureInternalFormat.RGBA, TextureInternalFormat.RGBA, TextureType.UnsignedByte, parent.ImageSource);
        }
        this.GL.bindTexture(TextureTargetType.Texture2D, null);
        this.setInitialized();
    };
    return TextureWrapper;
})(TextureWrapperBase);
module.exports = TextureWrapper;

},{"../../../Wrapper/TargetTextureType":287,"../../../Wrapper/Texture/TexImageTargetType":289,"../../../Wrapper/TextureInternalFormatType":295,"../../../Wrapper/TextureType":296,"./TextureWrapperBase":105}],105:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ResourceWrapper = require('../ResourceWrapper');
var TextureParameterType = require('../../../Wrapper/Texture/TextureParameterType');
var TextureRegister = require("../../../Wrapper/Texture/TextureRegister");
var PixelStoreParamType = require("../../../Wrapper/Texture/PixelStoreParamType");
var TextureFormat = require("../../../Wrapper/TextureInternalFormatType");
var ElementType = require("../../../Wrapper/TextureType");
var TextureWrapperBase = (function (_super) {
    __extends(TextureWrapperBase, _super);
    function TextureWrapperBase(owner, parent) {
        _super.call(this, owner);
        this.targetTexture = null;
        this.parent = parent;
        this.parent.onFilterParameterChanged(this.applyTextureParameter.bind(this));
    }
    Object.defineProperty(TextureWrapperBase.prototype, "Parent", {
        get: function () {
            return this.parent;
        },
        enumerable: true,
        configurable: true
    });
    TextureWrapperBase.prototype.setTargetTexture = function (texture) {
        this.targetTexture = texture;
    };
    Object.defineProperty(TextureWrapperBase.prototype, "TargetTexture", {
        get: function () {
            return this.targetTexture;
        },
        enumerable: true,
        configurable: true
    });
    TextureWrapperBase.prototype.applyTextureParameter = function () {
        if (this.targetTexture == null)
            return;
        this.bind();
        this.GL.texParameteri(this.Parent.TargetTextureType, TextureParameterType.MinFilter, this.parent.MinFilter);
        this.GL.texParameteri(this.Parent.TargetTextureType, TextureParameterType.MagFilter, this.parent.MagFilter);
        this.GL.texParameteri(this.Parent.TargetTextureType, TextureParameterType.WrapS, this.parent.SWrap);
        this.GL.texParameteri(this.Parent.TargetTextureType, TextureParameterType.WrapT, this.parent.TWrap);
    };
    TextureWrapperBase.prototype.bind = function () {
        if (this.targetTexture != null)
            this.GL.bindTexture(this.Parent.TargetTextureType, this.targetTexture);
        else {
            this.GL.bindTexture(this.Parent.TargetTextureType, null);
        }
    };
    TextureWrapperBase.prototype.registerTexture = function (registerIndex) {
        if (this.TargetTexture == null) {
            this.GL.activeTexture(TextureRegister.Texture0 + registerIndex);
            this.GL.bindTexture(this.parent.TargetTextureType, null);
            return false;
        }
        this.GL.activeTexture(TextureRegister.Texture0 + registerIndex);
        this.applyTextureParameter();
        return true;
    };
    TextureWrapperBase.prototype.init = function () {
    };
    TextureWrapperBase.prototype.preTextureUpload = function () {
        if (this.parent.FlipY) {
            this.GL.pixelStorei(PixelStoreParamType.UnpackFlipYWebGL, 1);
        }
        else {
            this.GL.pixelStorei(PixelStoreParamType.UnpackFlipYWebGL, 0);
        }
    };
    TextureWrapperBase.prototype.generateHtmlImage = function (encoder) {
        return null;
    };
    TextureWrapperBase.prototype.encodeHtmlImage = function (width, height, encode) {
        var lastFBO = this.GL.getParameter(this.GL.FRAMEBUFFER_BINDING);
        var framebuffer = this.GL.createFramebuffer();
        this.GL.bindFramebuffer(this.GL.FRAMEBUFFER, framebuffer);
        this.GL.framebufferTexture2D(this.GL.FRAMEBUFFER, this.GL.COLOR_ATTACHMENT0, this.GL.TEXTURE_2D, this.targetTexture, 0);
        var data;
        var dataArrayConstructor;
        var transformFunc;
        switch (this.Parent.ElementFormat) {
            case ElementType.Float:
                dataArrayConstructor = Float32Array;
                break;
            case ElementType.UnsignedByte:
                dataArrayConstructor = Uint8Array;
                break;
            case ElementType.UnsignedShort:
            case ElementType.UnsignedShort565:
            case ElementType.UnsignedShort4444:
            case ElementType.UnsignedShort5551:
                dataArrayConstructor = Uint16Array;
                break;
            default:
                console.error("Element format is not supported!");
                return;
        }
        switch (this.Parent.TextureFormat) {
            case TextureFormat.RGB:
                data = new dataArrayConstructor(width * height * 4);
                transformFunc = function (width, height, arr) {
                    var ret = new Uint8Array(width * height * 4);
                    for (var x = 0; x < width; x++)
                        for (var y = 0; y < height; y++) {
                            ret[4 * (y * width + x) + 0] = arr[4 * ((height - y) * width + x) + 0];
                            ret[4 * (y * width + x) + 1] = arr[4 * ((height - y) * width + x) + 1];
                            ret[4 * (y * width + x) + 2] = arr[4 * ((height - y) * width + x) + 2];
                            ret[4 * (y * width + x) + 3] = 255;
                        }
                    return ret;
                };
                break;
            case TextureFormat.RGBA:
                data = new dataArrayConstructor(width * height * 4);
                transformFunc = function (width, height, arr) {
                    var ret = new Uint8Array(width * height * 4);
                    for (var x = 0; x < width; x++)
                        for (var y = 0; y < height; y++) {
                            ret[4 * (y * width + x) + 0] = arr[4 * ((height - y) * width + x) + 0];
                            ret[4 * (y * width + x) + 1] = arr[4 * ((height - y) * width + x) + 1];
                            ret[4 * (y * width + x) + 2] = arr[4 * ((height - y) * width + x) + 2];
                            ret[4 * (y * width + x) + 3] = arr[4 * ((height - y) * width + x) + 3];
                        }
                    return ret;
                };
                break;
            case TextureFormat.Alpha:
                data = new dataArrayConstructor(width * height * 4);
                transformFunc = function (width, height, arr) {
                    var ret = new Uint8Array(width * height * 4);
                    for (var x = 0; x < width; x++)
                        for (var y = 0; y < height; y++) {
                            ret[4 * (y * width + x) + 0] = arr[4 * (y * width + x)];
                            ret[4 * (y * width + x) + 1] = 0;
                            ret[4 * (y * width + x) + 2] = 0;
                            ret[4 * (y * width + x) + 3] = 255;
                        }
                    return ret;
                };
                break;
            default:
                console.error("TextureFormat is unsupported!");
                return;
        }
        transformFunc = encode || transformFunc;
        this.GL.readPixels(0, 0, width, height, TextureFormat.RGBA, this.Parent.ElementFormat, data);
        this.GL.deleteFramebuffer(framebuffer);
        this.GL.bindFramebuffer(this.GL.FRAMEBUFFER, lastFBO);
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var context = canvas.getContext('2d');
        var imageData = context.createImageData(width, height);
        imageData.data.set(transformFunc(width, height, data));
        context.putImageData(imageData, 0, 0);
        var img = new Image();
        img.src = canvas.toDataURL();
        return img;
    };
    TextureWrapperBase.altTextureBuffer = new Uint8Array([255, 0, 255, 255]);
    return TextureWrapperBase;
})(ResourceWrapper);
module.exports = TextureWrapperBase;

},{"../../../Wrapper/Texture/PixelStoreParamType":288,"../../../Wrapper/Texture/TextureParameterType":292,"../../../Wrapper/Texture/TextureRegister":293,"../../../Wrapper/TextureInternalFormatType":295,"../../../Wrapper/TextureType":296,"../ResourceWrapper":95}],106:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var jThreeObjectWithID = require("../Base/JThreeObjectWithID");
var JThreeEvent = require('../Base/JThreeEvent');
var AssociativeArray = require('../Base/Collections/AssociativeArray');
var LightRegister = require('./Light/LightRegister');
var Color3 = require("../Base/Color/Color3");
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene(id) {
        _super.call(this, id);
        this.sceneObjectStructureChanged = new JThreeEvent();
        this.rendererListChanged = new JThreeEvent();
        this.renderers = [];
        this.children = [];
        this.cameras = new AssociativeArray();
        this.sceneAmbient = new Color3(0.1, 0.1, 0.1);
        this.enabled = true;
        this.lightRegister = new LightRegister(this);
    }
    Object.defineProperty(Scene.prototype, "LightRegister", {
        get: function () {
            return this.lightRegister;
        },
        enumerable: true,
        configurable: true
    });
    Scene.prototype.update = function () {
        if (!this.enabled)
            return;
        this.children.forEach(function (v) { return v.update(); });
    };
    Scene.prototype.render = function () {
        var _this = this;
        this.renderers.forEach(function (r) {
            r.beforeRender();
            _this.lightRegister.updateLightForRenderer(r);
            r.render(_this);
            r.afterRender();
        });
    };
    Scene.prototype.addRenderer = function (renderer) {
        this.renderers.push(renderer);
        this.rendererListChanged.fire(this, {
            owner: this,
            renderer: renderer,
            isAdditionalChange: true
        });
    };
    Object.defineProperty(Scene.prototype, "Renderers", {
        get: function () {
            return this.renderers;
        },
        enumerable: true,
        configurable: true
    });
    Scene.prototype.addLight = function (light) {
        this.lightRegister.addLight(light);
    };
    Scene.prototype.addObject = function (targetObject) {
        this.children.push(targetObject);
        targetObject.ParentScene = this;
        this.notifySceneObjectChanged({
            owner: null,
            scene: this,
            isAdditionalChange: true,
            changedSceneObject: targetObject,
            changedSceneObjectID: targetObject.ID
        });
    };
    Scene.prototype.addCamera = function (camera) {
        this.cameras.set(camera.ID, camera);
    };
    Scene.prototype.getCamera = function (id) {
        return this.cameras.get(id);
    };
    Scene.prototype.toString = function () {
        console.log(this);
        return "Scene\nRenderers:\nRendererCount:" + this.renderers.length + "\nCamera Count:" + this.cameras.size + "\nSceneObjects:\nSceneObjectCount:" + this.children.length + "\n";
    };
    Scene.prototype.notifySceneObjectChanged = function (eventArg) {
        this.sceneObjectStructureChanged.fire(this, eventArg);
    };
    return Scene;
})(jThreeObjectWithID);
module.exports = Scene;

},{"../Base/Collections/AssociativeArray":2,"../Base/Color/Color3":3,"../Base/JThreeEvent":6,"../Base/JThreeObjectWithID":10,"./Light/LightRegister":39}],107:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var jThreeObject = require("../Base/JThreeObject");
var AssociativeArray = require('../Base/Collections/AssociativeArray');
var ContextComponents = require("../ContextComponents");
var JThreeEvent = require("../Base/JThreeEvent");
var SceneManager = (function (_super) {
    __extends(SceneManager, _super);
    function SceneManager() {
        _super.call(this);
        this.scenes = new AssociativeArray();
        this.sceneListChanged = new JThreeEvent();
    }
    SceneManager.prototype.getContextComponentIndex = function () {
        return ContextComponents.SceneManager;
    };
    SceneManager.prototype.addScene = function (scene) {
        if (!this.scenes.has(scene.ID)) {
            this.scenes.set(scene.ID, scene);
            this.sceneListChanged.fire(this, {
                owner: this,
                isAdditionalChange: true,
                changedScene: scene
            });
        }
    };
    Object.defineProperty(SceneManager.prototype, "Scenes", {
        get: function () {
            return this.scenes.asArray;
        },
        enumerable: true,
        configurable: true
    });
    SceneManager.prototype.removeScene = function (scene) {
        if (this.scenes.has(scene.ID)) {
            this.scenes.delete(scene.ID);
            this.sceneListChanged.fire(this, {
                owner: this,
                isAdditionalChange: false,
                changedScene: scene
            });
        }
    };
    SceneManager.prototype.renderAll = function () {
        this.scenes.forEach(function (v) {
            v.update();
            v.render();
        });
    };
    SceneManager.prototype.toString = function () {
        console.log(this.scenes);
        var sceneInfo = "";
        this.scenes.forEach(function (scene, id) {
            sceneInfo += "ID:" + id + "\nScene:\n" + scene.toString() + "\n";
        });
        return "Scene Informations:\n\n        Scene Count:" + this.scenes.size + "\n\n        Scenes:" + sceneInfo;
    };
    return SceneManager;
})(jThreeObject);
module.exports = SceneManager;

},{"../Base/Collections/AssociativeArray":2,"../Base/JThreeEvent":6,"../Base/JThreeObject":9,"../ContextComponents":12}],108:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JThreeObjectWithID = require("../Base/JThreeObjectWithID");
var JThreeCollection = require("../Base/JThreeCollection");
var Transformer = require("./Transform/Transformer");
var AssociativeArray = require('../Base/Collections/AssociativeArray');
var JThreeEvent = require("../Base/JThreeEvent");
var SceneObject = (function (_super) {
    __extends(SceneObject, _super);
    function SceneObject(transformer) {
        _super.call(this);
        this.onStructureChangedEvent = new JThreeEvent();
        this.materialChanagedHandler = [];
        this.materials = new AssociativeArray();
        this.children = [];
        this.transformer = transformer || new Transformer(this);
        this.name = this.ID;
    }
    Object.defineProperty(SceneObject.prototype, "Children", {
        get: function () {
            return this.children;
        },
        enumerable: true,
        configurable: true
    });
    SceneObject.prototype.addChild = function (obj) {
        this.children.push(obj);
        obj.parent = this;
        obj.Transformer.updateTransform();
        var eventArg = {
            owner: this,
            scene: this.ParentScene,
            isAdditionalChange: true,
            changedSceneObject: obj,
            changedSceneObjectID: obj.ID
        };
        this.onStructureChangedEvent.fire(this, eventArg);
        this.onChildrenChanged();
        obj.onParentChanged();
        if (this.ParentScene)
            this.ParentScene.notifySceneObjectChanged(eventArg);
    };
    Object.defineProperty(SceneObject.prototype, "Parent", {
        get: function () {
            return this.parent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneObject.prototype, "ParentScene", {
        get: function () {
            if (!this.parentScene) {
                if (!this.parent) {
                    return null;
                }
                else {
                    this.ParentScene = this.parent.ParentScene;
                    return this.parentScene;
                }
            }
            else {
                return this.parentScene;
            }
        },
        set: function (scene) {
            this.parentScene = scene;
            this.children.forEach(function (v) {
                v.ParentScene = scene;
            });
            this.onParentSceneChanged();
        },
        enumerable: true,
        configurable: true
    });
    SceneObject.prototype.onMaterialChanged = function (func) {
        this.materialChanagedHandler.push(func);
    };
    SceneObject.prototype.eachMaterial = function (func) {
        this.materials.forEach(function (v) { return v.each(function (e) { return func(e); }); });
    };
    SceneObject.prototype.addMaterial = function (mat) {
        if (!this.materials.has(mat.MaterialGroup)) {
            this.materials.set(mat.MaterialGroup, new JThreeCollection());
        }
        this.materials.get(mat.MaterialGroup).insert(mat);
    };
    SceneObject.prototype.getMaterial = function (matGroup) {
        if (this.materials.has(matGroup)) {
            var a = this.materials.get(matGroup);
            var ret = null;
            a.each(function (e) {
                ret = e;
                return;
            });
            return ret;
        }
        return null;
    };
    SceneObject.prototype.getMaterials = function (matAlias) {
        if (this.materials.has(matAlias)) {
            return this.materials.get(matAlias).asArray();
        }
        return [];
    };
    Object.defineProperty(SceneObject.prototype, "Geometry", {
        get: function () {
            return this.geometry;
        },
        set: function (geo) {
            this.geometry = geo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneObject.prototype, "Transformer", {
        get: function () {
            return this.transformer;
        },
        enumerable: true,
        configurable: true
    });
    SceneObject.prototype.callRecursive = function (action) {
        if (this.children) {
            this.children.forEach(function (t) { return t.callRecursive(action); });
        }
        action(this);
    };
    SceneObject.prototype.onChildrenChanged = function () {
    };
    SceneObject.prototype.onParentChanged = function () {
    };
    SceneObject.prototype.onParentSceneChanged = function () {
    };
    SceneObject.prototype.update = function () {
    };
    return SceneObject;
})(JThreeObjectWithID);
module.exports = SceneObject;

},{"../Base/Collections/AssociativeArray":2,"../Base/JThreeCollection":5,"../Base/JThreeEvent":6,"../Base/JThreeObjectWithID":10,"./Transform/Transformer":135}],109:[function(require,module,exports){
module.exports = "precision mediump float;\n\n//UNIFORM VARIABLES\nuniform float specularCoefficient;\n\n//VARYING VARIABLES\nvarying vec3 vNormal;\nvarying vec4 vPosition;\nvarying vec2 vUV;\n\nvec2 compressNormal()\n{\n\tfloat p = sqrt(vNormal.z * 8. + 8.);\n\treturn vNormal.xy/p + 0.5;\n}\n\nfloat calcDepth()\n{\n\treturn vPosition.z/vPosition.w;\n}\n\nvoid main(void)\n{\n\tgl_FragColor = vec4(compressNormal(),calcDepth(),specularCoefficient);\n}\n"
},{}],110:[function(require,module,exports){
module.exports = "precision mediump float;\n\nvarying vec3 vNormal;\nvarying vec2 vUV;\nvarying vec4 vPos;\n\nuniform sampler2D texture;\nuniform vec4 albedo;\nuniform int textureUsed;\n\nvoid main()\n{\n\tif(textureUsed == 1)\n\t{\n\t\tgl_FragColor = texture2D(texture,vUV) * albedo;\n\t}else\n\t{\n\t\tgl_FragColor = albedo;\n\t}\n}"
},{}],111:[function(require,module,exports){
module.exports = "precision mediump float;\n\nvarying vec3 vNormal;\nvarying vec2 vUV;\nvarying vec4 vPos;\n\nuniform vec3 specular;\n\nvoid main()\n{\n\tgl_FragColor.rgb = specular;\n}"
},{}],112:[function(require,module,exports){
module.exports = "precision highp float;\n\n//Uniform variables\nuniform mat4 matMV;\nuniform mat4 matMVP;\n\n//attribute variables\nattribute vec4 position;\nattribute vec3 normal;\nattribute vec2 uv;\n//varying varibales\nvarying vec3 vNormal;\nvarying vec4 vPosition;\nvarying vec2 vUV;\n\nvoid main(void)\n{\n\tgl_Position = vPosition =matMVP * position;\n\tvNormal =normalize(( matMV * vec4(normal,0)).xyz);\n\tvUV = uv;\n}\n"
},{}],113:[function(require,module,exports){
module.exports = "vec3 calcAreaLight(vec3 position,vec3 normal,int i,vec4 diffuse)\n{\n  vec3 accum=vec3(0,0,0);\n  vec3 color = getLightParameter(i,0).yzw*diffuse.rgb*diffuse.a;\n  vec3 base = getLightParameter(i,1).xyz;\n  mat3 factor=mat3(getLightParameter(i,2).xyz,getLightParameter(i,3).xyz,getLightParameter(i,4));\n  vec3 vRelative = position - base;\n  vec3 e= factor * vRelative;\n  if(e.x < 1. && e.x >0. && e.y <1. && e.y >0. && e.z < 1. && e.z >0.)\n  {\n    accum += color;\n  }\n  // }else\n  // {\n  //   if(e.x <0.)accum+=vec3(1,0,0);\n  //   if(e.y <0.)accum+=vec3(0,1,0);\n  //   if(e.z <0.)accum+=vec3(0,0,1);\n  // }\n  return accum;\n}\n"
},{}],114:[function(require,module,exports){
module.exports = "vec3 calcAreaLight(vec3 position,vec3 normal,int i,vec3 specular,float specularCoefficient)\n{\n  return vec3(0,0,0);\n}\n"
},{}],115:[function(require,module,exports){
module.exports = "//Header should be inserted above like below\n//precision mediump float\n//#define SHADOW_MAP_LENGTH <<Max count of shadow map>>\n//uniform variables\nuniform highp   sampler2D primary;\nuniform lowp sampler2D secoundary;\nuniform lowp sampler2D third;\nuniform highp   sampler2D lightParam;\n\nuniform vec2 lightParamSize;\n\nuniform mat4 matIP;\nuniform mat4 matV;\nuniform mat4 matIV;\n\nuniform highp sampler2D shadowParam;\nuniform lowp sampler2D shadowMap;\nuniform float shadowMapMax; //sqrt(maximum shadow map count)<- because this is count of edge for shadow matrix texture\n\n//varying variables\nvarying vec2 vUV;\n\n//Get depth from texture\nfloat getDepth()\n{\n\treturn texture2D(primary,vUV).z;\n}\n//Get normal from texture\nvec3 getNormal()\n{\n\thighp vec2 compressed = texture2D(primary,vUV).xy * 4. - vec2(2.,2.);\n\thighp vec3 result;\n\tfloat f = dot(compressed,compressed);\n\tfloat g = sqrt(1. - f/4.);\n\tresult.z = 1. - f/2.;\n\tresult.xy = compressed * g;\n\treturn normalize(result);\n}\n//Reconstruct position\nvec3 getPosition(float depth)\n{\n\tvec4 reconstructed = matIP*vec4(vUV * 2. - vec2(1.,1.),depth,1.);\n\treturn reconstructed.xyz / reconstructed.w;\n}\n//Get light parameter from uv\nvec2 getLightParameterUV(int lightIndex,int parameterIndex)\n{\n\tfloat xStep = 1./lightParamSize.x;\n\tfloat yStep = 1./lightParamSize.y;\n\treturn vec2(xStep / 2. + float(parameterIndex) * xStep,1.-( yStep / 2. + float(lightIndex) * yStep));\n}\n//Get light parameter from light index and prameter index\nvec4 getLightParameter(int lightIndex,int parameterIndex)\n{\n   return texture2D(lightParam,getLightParameterUV(lightIndex,parameterIndex));\n}\n//Get light type\nfloat getLightType(int lightIndex)\n{\n\treturn getLightParameter(lightIndex,0).r;\n}\n\nvec4 getDiffuseAlbedo()\n{\n\treturn texture2D(secoundary,vUV);\n}\n\nvec3 getSpecularAlbedo()\n{\n\treturn texture2D(third,vUV).rgb;\n}\n\nfloat getSpecularCoefficient()\n{\n\treturn texture2D(primary,vUV).a;\n}\n\nhighp float unpackFloat(vec3 rgb){\n       const vec3 bit_shift = vec3( 1.0/(256.0*256.0), 1.0/256.0, 1.0);\n       highp float res = dot(rgb, bit_shift);\n       return res*2.0 -1.0;\n}\n\nmat4 getShadowMatrix(float shadowIndex,float paramIndex)\n{\n\tconst float matrixCount = 2.;\n\tconst float textureWidth = matrixCount * 8.;\n\tfloat y = 1./(2.*shadowMapMax) + 1./shadowMapMax*shadowIndex;\n\treturn mat4(\n\ttexture2D(shadowParam,vec2(1./textureWidth+1./matrixCount*paramIndex,y)),\n\ttexture2D(shadowParam,vec2(3./textureWidth+1./matrixCount*paramIndex,y)),\n\ttexture2D(shadowParam,vec2(5./textureWidth+1./matrixCount*paramIndex,y)),\n\ttexture2D(shadowParam,vec2(7./textureWidth+1./matrixCount*paramIndex,y)));\n}\n\nbool isInTextureUVRange(vec2 uv)\n{\n\treturn uv.x >= 0. && uv.x <= 1. && uv.y >= 0. && uv.y <=1.;\n}\n\n///<<< LIGHT FUNCTION DEFINITIONS\n\nvoid main(void)\n{\n\tfloat depth = getDepth();\n\tif(depth== -1.)discard;\n\tvec3 position = getPosition(depth);\n\tvec3 normal = getNormal();\n\tvec4 diffuse = getDiffuseAlbedo();\n\tgl_FragColor.rgb = vec3(0,0,0);\n\tfor(float i = 0.;i>-1.; i++)\n\t{\n\t\tif(lightParamSize.y == i)break;\n\t\t///<<< LIGHT FUNCTION CALLS\n\t}\n}\n"
},{}],116:[function(require,module,exports){
module.exports = "vec3 calcDirectionalLight(vec3 position,vec3 normal,int i,vec4 diffuse)\n{\n  vec3 color = getLightParameter(i,0).yzw;\n  vec3 dir = getLightParameter(i,1).xyz;\n  highp vec3 shadowParamVec= getLightParameter(i,2).xyz;//x:shadow flag,y:shadow map index,z:shadow bias\n  vec3 accum = max(0.,min(1.,dot(-dir,normal))) * color * diffuse.rgb;\n  if(shadowParamVec.x < 0.5)return accum; // check this light needs to project shadows\n  vec4 wPosition = matIV * vec4(position,1.0);\n   vec4 shadowMapCoord = getShadowMatrix(shadowParamVec.y,0.) * wPosition;\n   highp vec4 shadowMapTextureCoord = getShadowMatrix(shadowParamVec.y,1.)*shadowMapCoord;\n   if(!isInTextureUVRange(shadowMapTextureCoord.xy/shadowMapTextureCoord.w))return accum;//If this point was out of range in shadow map, this code will not care about shadow in this point\n   vec3 lightSpaceRawDepthShadowMap = texture2DProj(shadowMap,shadowMapTextureCoord).rgb;\n  highp float lightSpaceDepth = unpackFloat(lightSpaceRawDepthShadowMap);\n  if(lightSpaceDepth < shadowMapCoord.z/shadowMapCoord.w - shadowParamVec.z)\n  {\n    return vec3(0,0,0);\n  }else\n  {\n    return accum;\n  }\n}\n"
},{}],117:[function(require,module,exports){
module.exports = "vec3 calcDirectionalLight(vec3 position,vec3 normal,int i,vec3 specular,float specularCoefficient)\n{\n  vec3 l = normalize((vec4(-getLightParameter(i,1).xyz,0)).xyz);\n  vec3 e = normalize(-position);\n  vec3 accum = getLightParameter(i,0).yzw*specular*max(0.,pow(dot(normal,normalize(l+e)),specularCoefficient));\n  vec3 shadowParamVec = getLightParameter(i,2).xyz;\n  if(shadowParamVec.x < 0.5)return accum; // check this light needs to project shadows\n  vec4 wPosition = matIV * vec4(position,1.0);\n   vec4 shadowMapCoord = getShadowMatrix(shadowParamVec.y,0.) * wPosition;\n   vec4 shadowMapTextureCoord = getShadowMatrix(shadowParamVec.y,1.)*shadowMapCoord;\n   if(!isInTextureUVRange(shadowMapTextureCoord.xy/shadowMapTextureCoord.w))return accum;//If this point was out of range in shadow map, this code will not care about shadow in this point\n   vec3 lightSpaceRawDepthShadowMap = texture2DProj(shadowMap,shadowMapTextureCoord).rgb;\n   highp float lightSpaceDepth = unpackFloat(lightSpaceRawDepthShadowMap);\n   if(lightSpaceDepth < shadowMapCoord.z/shadowMapCoord.w - shadowParamVec.z)\n   {\n     return vec3(0,0,0);\n   }else\n   {\n     return accum;\n   }\n}\n"
},{}],118:[function(require,module,exports){
module.exports = "//attribute variables\nattribute vec4 position;\nattribute vec2 uv;\n\nvarying vec2 vUV;\n\nvoid main(void)\n{\n\tgl_Position = position;\n\tvUV=uv;\n}\n"
},{}],119:[function(require,module,exports){
module.exports = "vec3 calcPointLight(vec3 position,vec3 normal,int i,vec4 diffuse)\n{\n  vec3 accum=vec3(0,0,0);\n  vec3 color = getLightParameter(i,0).yzw;\n  vec3 lpos = getLightParameter(i,1).xyz;\n  vec2 param = getLightParameter(i,2).xy;\n    float l=distance(lpos,position);//calc distance between light and fragment in view space\n    vec3 p2l=normalize(lpos-position);//calc direction vector from fragment to light in view space\n    accum+=max(dot(normal,p2l),0.)*pow(max(0.,1.-l/param.x),param.y)*color;\n  return accum;\n}\n"
},{}],120:[function(require,module,exports){
module.exports = "vec3 calcPointLight(vec3 position,vec3 normal,int i,vec3 specular,float specularCoefficient)\n{\n  vec3 accum=vec3(0,0,0);\n  vec3 color = getLightParameter(i,0).yzw;\n  vec3 lpos = getLightParameter(i,1).xyz;\n  vec2 param = getLightParameter(i,2).xy;\n  vec3 hv = normalize(normalize(lpos-position)+normalize(-position));\n  float l = distance(position,lpos);\n  accum += pow(max(0.,dot(hv,normal)),specularCoefficient)*pow(max(0.,1.-l/param.x),param.y)*color*specular;\n  return accum;\n}\n"
},{}],121:[function(require,module,exports){
module.exports = "vec3 calcSceneLight(vec3 position,vec3 normal,int i,vec4 diffuse)\n{\n  return getLightParameter(i,0).yzw*diffuse.rgb*diffuse.a;\n}\n"
},{}],122:[function(require,module,exports){
module.exports = "vec3 calcSceneLight(vec3 position,vec3 normal,int i,vec3 specular,float specularCoefficient)\n{\n  return vec3(0,0,0);\n}\n"
},{}],123:[function(require,module,exports){
module.exports = "//Header should be inserted above like below\n//precision mediump float\n//#define SHADOW_MAP_LENGTH <<Max count of shadow map>>\nuniform highp   sampler2D primary;\nuniform lowp sampler2D secoundary;\nuniform lowp sampler2D third;\nuniform highp   sampler2D lightParam;\n\nuniform vec2 lightParamSize;\n\nuniform mat4 matIP;\nuniform mat4 matV;\nuniform mat4 matIV;\n\nuniform highp sampler2D shadowParam;\nuniform lowp sampler2D shadowMap;\nuniform float shadowMapMax;\n\n\n//varying variables\nvarying vec2 vUV;\n\n//Get depth from texture\nfloat getDepth()\n{\n\treturn texture2D(primary,vUV).z;\n}\n//Get normal from texture\nvec3 getNormal()\n{\n\thighp vec2 compressed = texture2D(primary,vUV).xy;\n\thighp vec3 result;\n\tif(length(compressed)==0.)return vec3(0,0,-1);\n\tresult.z = 2. * (length(compressed)*length(compressed)-0.5);\n\tresult.xy = compressed * sqrt(1./(result.z*result.z)-1.);\n\treturn normalize(result);\n}\n//Reconstruct position\nvec3 getPosition(float depth)\n{\n\tvec4 reconstructed = matIP*vec4(vUV * 2. - vec2(1.,1.),depth,1.);\n\treturn reconstructed.xyz / reconstructed.w;\n}\n//Get light parameter from uv\nvec2 getLightParameterUV(int lightIndex,int parameterIndex)\n{\n\tfloat xStep = 1./lightParamSize.x;\n\tfloat yStep = 1./lightParamSize.y;\n\treturn vec2(xStep / 2. + float(parameterIndex) * xStep,1.-( yStep / 2. + float(lightIndex) * yStep));\n}\n//Get light parameter from light index and prameter index\nvec4 getLightParameter(int lightIndex,int parameterIndex)\n{\n   return texture2D(lightParam,getLightParameterUV(lightIndex,parameterIndex));\n}\n//Get light type\nfloat getLightType(int lightIndex)\n{\n\treturn getLightParameter(lightIndex,0).r;\n}\n\nvec4 getDiffuseAlbedo()\n{\n\treturn texture2D(secoundary,vUV);\n}\n\nvec3 getSpecularAlbedo()\n{\n\treturn texture2D(third,vUV).rgb;\n}\n\nfloat getSpecularCoefficient()\n{\n\treturn texture2D(primary,vUV).a;\n}\n\nbool isInTextureUVRange(vec2 uv)\n{\n\treturn uv.x >= 0. && uv.x <= 1. && uv.y >= 0. && uv.y <=1.;\n}\n\nfloat unpackFloat(vec3 rgb){\n  const vec3 bit_shift = vec3( 1.0/(256.0*256.0), 1.0/256.0, 1.0);\n  float res = dot(rgb, bit_shift);\n  return res;\n}\n\nmat4 getShadowMatrix(float shadowIndex,float paramIndex)\n{\n\tconst float matrixCount = 2.;\n\tconst float textureWidth = matrixCount * 8.;\n\tfloat y = 1./(2.*shadowMapMax) + 1./shadowMapMax*shadowIndex;\n\treturn mat4(\n\ttexture2D(shadowParam,vec2(1./textureWidth+1./matrixCount*paramIndex,y)),\n\ttexture2D(shadowParam,vec2(3./textureWidth+1./matrixCount*paramIndex,y)),\n\ttexture2D(shadowParam,vec2(5./textureWidth+1./matrixCount*paramIndex,y)),\n\ttexture2D(shadowParam,vec2(7./textureWidth+1./matrixCount*paramIndex,y)));\n}\n\n///<<< LIGHT FUNCTION DEFINITIONS\n\nvoid main(void)\n{\n\tfloat depth = getDepth();\n\tif(abs(depth+1.0)<1.0E-3)discard;//Is this work correctly?\n\tvec3 position = getPosition(depth);\n\tvec3 normal = getNormal();\n\tvec3 specular =getSpecularAlbedo();\n\tfloat specularCoefficient = getSpecularCoefficient();\n\tgl_FragColor.rgb = vec3(0,0,0);\n\tfor(float i = 0.;i>-1.; i++)\n\t{\n\t\tif(lightParamSize.y == i)break;\n\t\t///<<< LIGHT FUNCTION CALLS\n\t}\n}\n"
},{}],124:[function(require,module,exports){
module.exports = "vec3 calcSpotLight(vec3 position,vec3 normal,int i,vec4 diffuse)\n{\n  vec3 accum=vec3(0,0,0);\n  vec3 color = getLightParameter(i,0).yzw;\n  vec3 lpos = getLightParameter(i,1).xyz;\n  vec3 ldir = getLightParameter(i,2).xyz;\n  vec3 params = getLightParameter(i,3).xyz;\n  vec3 l2p = normalize(position-lpos);\n  accum += color * diffuse.xyz\n    * max(0.,dot(-l2p,normal)) //Normal attenuation\n   * pow(max(0.,min(1.,dot(l2p,ldir)/(params.x-params.y) - params.y/(params.x - params.y))),params.z); // spot light range attenuation\n  return accum;\n}\n"
},{}],125:[function(require,module,exports){
module.exports = "vec3 calcSpotLight(vec3 position,vec3 normal,int i,vec3 specular,float specularCoefficient)\n{\n  vec3 accum=vec3(0,0,0);\n  vec3 color = getLightParameter(i,0).yzw;\n  vec3 lpos = getLightParameter(i,1).xyz;\n  vec3 ldir = getLightParameter(i,2).xyz;\n  vec3 params = getLightParameter(i,3).xyz;\n  vec3 hv = normalize(normalize(lpos-position)+normalize(-position));\n  vec3 l2p = normalize(position - lpos);\n  accum += color \n    * pow(max(0.,dot(hv,normal)),specularCoefficient) //Normal attenuation\n   * pow(max(0.,min(1.,dot(l2p,ldir)/(params.x-params.y) - params.y/(params.x - params.y))),params.z); // spot light range attenuation\n  return accum;\n}\n"
},{}],126:[function(require,module,exports){
module.exports = "precision mediump float;\nvarying vec3 vNormal;\nvarying  vec2 vUv;\nvarying vec4 vPosition;\n\nuniform vec4 diffuse;\nuniform vec4 specular;\nuniform vec4 ambient;\nuniform vec3 ambientCoefficient;\nuniform mat4 matMVP;\nuniform mat4 matMV;\nuniform mat4 matV;\nuniform int textureUsed;\nuniform sampler2D texture;\nuniform sampler2D dlight;\nuniform sampler2D slight;\n\nvec2 calcLightUV(vec4 projectionSpacePos)\n{\n   return (projectionSpacePos.xy/projectionSpacePos.w+vec2(1,1))/2.;\n}\n\nvoid main(void){\n  vec2 adjuv=vUv;\n  gl_FragColor=vec4(0,0,0,1);\n  //gl_FragColor.rgb+=ambient.rgb;\n  ////calculate light uv\n  vec2 lightUV=calcLightUV(vPosition);\n  gl_FragColor.rgb+=texture2D(dlight,lightUV).rgb+texture2D(slight,lightUV).rgb;\n  gl_FragColor.rgb +=ambient.rgb;\n}\n"
},{}],127:[function(require,module,exports){
module.exports = "precision mediump float;\n\n//varying variables\nvarying vec4 vPosition;\n\nvec3 pack_float(float f){\n   const vec3 bit_shift = vec3( 256.0*256.0, 256.0, 1.0);\n   const vec3 bit_mask = vec3(0.0, 1.0/256.0, 1.0/256.0);\n   vec3 res = fract(f * bit_shift);\n   res -= res.xxy * bit_mask;\n   return res;\n}\n\nvoid main(void)\n{\n  gl_FragColor.rgb = pack_float(vPosition.z/vPosition.w/2. + 0.5);\n}\n"
},{}],128:[function(require,module,exports){
module.exports = "//attribute variables\n\nattribute vec4 position;\n\n//varying variables\n\nvarying vec4 vPosition;\n\n//uniform variables\nuniform mat4 matPLW;//(light-space-projection)*(light-space-view)*(world)\n\nvoid main(void)\n{\n  vPosition = gl_Position = matPLW * position;\n}\n"
},{}],129:[function(require,module,exports){
module.exports = "precision mediump float;\nuniform samplerCube skyTex;\nvarying vec2 v_uv;\nvarying vec3 v_position;\n\nvoid main()\n{\n\tvec3 dir = v_position;\n\tgl_FragColor=vec4(textureCube(skyTex,dir));\n}"
},{}],130:[function(require,module,exports){
module.exports = "precision mediump float;\nvarying vec3 v_normal;\nvarying  vec2 v_uv;\n\nuniform vec4 u_color;\nuniform mat4 matMVP;\nuniform mat4 matMV;\nvoid main(void){\n  gl_FragColor = u_color;\n}\n"
},{}],131:[function(require,module,exports){
module.exports = "precision mediump float;\nvarying vec3 vNormal;\nvarying  vec2 vUv;\n\nuniform mat4 matMVP;\nuniform mat4 matMV;\nuniform mat4 matV;\nuniform mat4 ctM;\nuniform float additonA;\nuniform sampler2D u_sampler;\n\nvoid main(void){\n  gl_FragColor = ctM*texture2D(u_sampler,vUv);\n  gl_FragColor.a += additonA;\n  //if(gl_FragColor.a==0.0)discard;\n}\n"
},{}],132:[function(require,module,exports){
module.exports = "precision mediump float;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\n\nuniform mat4 matMVP;\nuniform mat4 matMV;\n\n\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec4 vPosition;\n\nvoid main(void){\nvPosition=gl_Position = matMVP*vec4(position,1.0);\nvNormal=normalize((matMV*vec4(normal,0)).xyz);\nvUv=uv;\n}\n"
},{}],133:[function(require,module,exports){
module.exports = "attribute vec3 position;\nattribute vec2 uv;\n\nvarying vec2 v_uv;\nvarying vec3 v_position;\n\nuniform mat4 matVP;\n\nvoid main(void){\nv_position = (vec4(position,1.0)*matVP).xyz;\ngl_Position =vec4(position,1.0);\nv_uv=uv;\n}\n"
},{}],134:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JThreeObject = require("../Base/JThreeObject");
var ContextComponent = require("../ContextComponents");
var Timer = (function (_super) {
    __extends(Timer, _super);
    function Timer() {
        _super.call(this);
        this.currentFrame = 0;
        this.time = 0;
        this.timeFromLast = 0;
    }
    Timer.prototype.getContextComponentIndex = function () {
        return ContextComponent.Timer;
    };
    Timer.prototype.updateTimer = function () {
        this.currentFrame++;
        var date = Date.now();
        this.TimeFromLast = date - this.Time;
        this.time = date;
    };
    Object.defineProperty(Timer.prototype, "CurrentFrame", {
        get: function () {
            return this.currentFrame;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timer.prototype, "Time", {
        get: function () {
            return this.time;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timer.prototype, "TimeFromLast", {
        get: function () {
            return this.timeFromLast;
        },
        enumerable: true,
        configurable: true
    });
    return Timer;
})(JThreeObject);
module.exports = Timer;

},{"../Base/JThreeObject":9,"../ContextComponents":12}],135:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Quaternion = require("../../Math/Quaternion");
var Vector3 = require("../../Math/Vector3");
var Matrix = require("../../Math/Matrix");
var JThreeObject = require("../../Base/JThreeObject");
var glm = require("gl-matrix");
var JThreeEvent = require("./../../Base/JThreeEvent");
var Transformer = (function (_super) {
    __extends(Transformer, _super);
    function Transformer(sceneObj) {
        _super.call(this);
        this.hasChanged = false;
        this.forward = Vector3.ZUnit.negateThis();
        this.up = Vector3.YUnit;
        this.right = Vector3.XUnit;
        this.localTransformMatrix = Matrix.identity();
        this.localToGlobalMatrix = Matrix.identity();
        this.modelViewProjectionCaluculationCache = glm.mat4.create();
        this.globalToLocalCache = Matrix.identity();
        this.g2lupdated = false;
        this.onUpdateTransformHandler = new JThreeEvent();
        this.linkedObject = sceneObj;
        this.position = Vector3.Zero;
        this.rotation = Quaternion.Identity;
        this.scale = new Vector3(1, 1, 1);
        this.localOrigin = new Vector3(0, 0, 0);
        this.updateTransform();
    }
    Object.defineProperty(Transformer.prototype, "hasParent", {
        get: function () {
            return !!this.linkedObject.Parent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transformer.prototype, "parent", {
        get: function () {
            return this.hasParent ? this.linkedObject.Parent.Transformer : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transformer.prototype, "childrenCount", {
        get: function () {
            return this.linkedObject.Children.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transformer.prototype, "NeedUpdateChildren", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transformer.prototype, "globalToLocal", {
        get: function () {
            if (this.g2lupdated) {
                return this.globalToLocalCache;
            }
            glm.mat4.invert(this.globalToLocalCache.rawElements, this.localToGlobalMatrix.rawElements);
            this.g2lupdated = true;
        },
        enumerable: true,
        configurable: true
    });
    Transformer.prototype.onUpdateTransform = function (action) {
        this.onUpdateTransformHandler.addListener(action);
    };
    Transformer.prototype.updateTransform = function () {
        this.hasChanged = true;
        this.updateTransformMatricies();
        if (this.linkedObject.Children && this.NeedUpdateChildren)
            this.linkedObject.Children.forEach(function (v) {
                v.Transformer.updateTransform();
            });
        this.g2lupdated = false;
        this.onUpdateTransformHandler.fire(this, this.linkedObject);
    };
    Transformer.prototype.updateTransformMatricies = function () {
        glm.mat4.identity(this.localTransformMatrix.rawElements);
        glm.mat4.identity(this.localToGlobalMatrix.rawElements);
        glm.mat4.fromRotationTranslationScaleOrigin(this.localTransformMatrix.rawElements, this.rotation.rawElements, this.position.rawElements, this.scale.rawElements, this.localOrigin.rawElements);
        if (this.linkedObject != null && this.linkedObject.Parent != null) {
            glm.mat4.copy(this.localToGlobalMatrix.rawElements, this.linkedObject.Parent.Transformer.LocalToGlobal.rawElements);
        }
        else {
            glm.mat4.identity(this.localToGlobalMatrix.rawElements);
        }
        glm.mat4.multiply(this.localToGlobalMatrix.rawElements, this.localToGlobalMatrix.rawElements, this.localTransformMatrix.rawElements);
        this.updateDirections();
    };
    Transformer.prototype.updateDirections = function () {
        this.updateDirection(this.right, [1, 0, 0, 0]);
        this.updateDirection(this.up, [0, 1, 0, 0]);
        this.updateDirection(this.forward, [0, 0, -1, 0]);
    };
    Transformer.prototype.updateDirection = function (rawElements, sourceVector4) {
        glm.vec4.transformMat4(rawElements.rawElements, sourceVector4, this.localToGlobalMatrix.rawElements);
        glm.vec3.normalize(rawElements.rawElements, rawElements.rawElements);
    };
    Transformer.prototype.calculateMVPMatrix = function (renderer) {
        glm.mat4.mul(this.modelViewProjectionCaluculationCache, renderer.Camera.viewMatrix.rawElements, this.LocalToGlobal.rawElements);
        glm.mat4.mul(this.modelViewProjectionCaluculationCache, renderer.Camera.projectionMatrix.rawElements, this.modelViewProjectionCaluculationCache);
        return new Matrix(this.modelViewProjectionCaluculationCache);
    };
    Object.defineProperty(Transformer.prototype, "GlobalPosition", {
        get: function () {
            return Matrix.transformPoint(this.localToGlobalMatrix, Vector3.Zero);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transformer.prototype, "LocalToGlobal", {
        get: function () {
            return this.localToGlobalMatrix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transformer.prototype, "LocalTransform", {
        get: function () {
            return this.localTransformMatrix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transformer.prototype, "Rotation", {
        get: function () {
            return this.rotation;
        },
        set: function (quat) {
            this.rotation = quat;
            this.updateTransform();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transformer.prototype, "Position", {
        get: function () {
            return this.position;
        },
        set: function (vec) {
            this.position = vec;
            this.updateTransform();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transformer.prototype, "Scale", {
        get: function () {
            return this.scale;
        },
        set: function (vec) {
            this.scale = vec;
            this.updateTransform();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transformer.prototype, "LocalOrigin", {
        get: function () {
            return this.localOrigin;
        },
        set: function (origin) {
            this.localOrigin = origin;
            this.updateTransform();
        },
        enumerable: true,
        configurable: true
    });
    Transformer.prototype.transformDirection = function (direction) {
        return Matrix.transformNormal(this.LocalToGlobal, direction);
    };
    Transformer.prototype.transformPoint = function (point) {
        return Matrix.transformPoint(this.localToGlobalMatrix, point);
    };
    Transformer.prototype.transformVector = function (vector) {
        return Matrix.transform(this.localToGlobalMatrix, vector);
    };
    Transformer.prototype.inverseTransformDirection = function (direction) {
        return Matrix.transformNormal(this.globalToLocal, direction);
    };
    Transformer.prototype.inverseTransformPoint = function (point) {
        return Matrix.transformPoint(this.globalToLocal, point);
    };
    Transformer.prototype.inverseTransformVector = function (vector) {
        return Matrix.transform(this.globalToLocal, vector);
    };
    return Transformer;
})(JThreeObject);
module.exports = Transformer;

},{"../../Base/JThreeObject":9,"../../Math/Matrix":229,"../../Math/Quaternion":232,"../../Math/Vector3":235,"./../../Base/JThreeEvent":6,"gl-matrix":299}],136:[function(require,module,exports){
var ContextComponents = require("../ContextComponents");
var SceneStructureDebugger = require("./Modules/SceneStructureDebugger");
var GLSpecDebugger = require("./Modules/GLSpecDebugger");
var RendererDebugger = require("./Modules/RendererDebugger");
var Debugger = (function () {
    function Debugger() {
        this.debuggerModules = [new SceneStructureDebugger(), new GLSpecDebugger(), new RendererDebugger()];
        this.debuggerAPI = window.j3d;
        if (!this.debuggerAPI) {
            console.warn("Debugger API was not found! Did you surely import j3d.js?\nDebugger will not be attached.");
        }
    }
    Debugger.prototype.getContextComponentIndex = function () {
        return ContextComponents.Debugger;
    };
    Debugger.prototype.attach = function () {
        var _this = this;
        if (this.debuggerAPI) {
            this.debuggerModules.forEach(function (m) { return m.attach(_this); });
            console.warn("Debugger API was attached.");
        }
        ;
    };
    Debugger.prototype.setInfo = function (key, val) {
        if (typeof val === 'object') {
            var stringfied = "";
            for (var k in val) {
                var v = val[k];
                stringfied += k + ":" + v + "<br/>";
            }
            val = stringfied;
        }
        this.debuggerAPI.info.setInfo(key, val);
    };
    return Debugger;
})();
module.exports = Debugger;

},{"../ContextComponents":12,"./Modules/GLSpecDebugger":138,"./Modules/RendererDebugger":139,"./Modules/SceneStructureDebugger":140}],137:[function(require,module,exports){
var DebuggerModuleBase = (function () {
    function DebuggerModuleBase() {
    }
    DebuggerModuleBase.prototype.attach = function (debug) {
    };
    return DebuggerModuleBase;
})();
module.exports = DebuggerModuleBase;

},{}],138:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DebuggerModuleBase = require("./DebuggerModuleBase");
var GLSpecManager = require("../../Core/GLSpecManager");
var JThreeContext = require("../../JThreeContext");
var ContextComponents = require("../../ContextComponents");
var GLSpecDebugger = (function (_super) {
    __extends(GLSpecDebugger, _super);
    function GLSpecDebugger() {
        _super.apply(this, arguments);
    }
    GLSpecDebugger.prototype.attach = function (debug) {
        JThreeContext.getContextComponent(ContextComponents.CanvasManager).canvasListChanged.addListener(function () {
            debug.setInfo("GLSPEC : Maximum combined texture unit", GLSpecManager.MaxCombinedTextureUnits);
            debug.setInfo("GLSPEC : Maximum cubemap texture size", GLSpecManager.MaxCubeMapTextureSize);
            debug.setInfo("GLSPEC : Maximum fragment uniform vectors", GLSpecManager.MaxFragmentUniformVectors);
            debug.setInfo("GLSPEC : Maximum rederbuffer size", GLSpecManager.MaxRenderbufferSize);
            debug.setInfo("GLSPEC : Maximum texture image units", GLSpecManager.MaxTextureImageUnits);
            debug.setInfo("GLSPEC : Maximum texture size", GLSpecManager.MaxTextureSize);
            debug.setInfo("GLSPEC : Maximum varying vectors", GLSpecManager.MaxVaryingVectors);
            debug.setInfo("GLSPEC : Maximum vertex attribute", GLSpecManager.MaxVertexAttribs);
            debug.setInfo("GLSPEC : Maximum VTF units", GLSpecManager.MaxVertexTextureImageUnits);
            debug.setInfo("GLSPEC : Maximum vertex uniform vectors", GLSpecManager.MaxVertexUniformVectors);
            debug.setInfo("GLSPEC : Maximum viewport dimension", GLSpecManager.MaxViewportDims);
        });
    };
    return GLSpecDebugger;
})(DebuggerModuleBase);
module.exports = GLSpecDebugger;

},{"../../ContextComponents":12,"../../Core/GLSpecManager":24,"../../JThreeContext":226,"./DebuggerModuleBase":137}],139:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DebuggerModuleBase = require("./DebuggerModuleBase");
var JThreeContext = require("../../JThreeContext");
var ContextComponents = require("../../ContextComponents");
var Q = require('q');
var RendererDebugger = (function (_super) {
    __extends(RendererDebugger, _super);
    function RendererDebugger() {
        _super.apply(this, arguments);
    }
    RendererDebugger.prototype.attach = function (debug) {
        var _this = this;
        var sm = JThreeContext.getContextComponent(ContextComponents.SceneManager);
        sm.Scenes.forEach(function (s) {
            _this.attachToScene(s, debug);
        });
        sm.sceneListChanged.addListener(function (o, h) {
            if (h.isAdditionalChange) {
                _this.attachToScene(h.changedScene, debug);
            }
            else {
            }
        });
    };
    RendererDebugger.prototype.attachToScene = function (scene, debug) {
        var _this = this;
        scene.Renderers.forEach(function (r) {
            _this.attachToRenderer(r, debug);
        });
        scene.rendererListChanged.addListener(function (o, h) {
            if (h.isAdditionalChange) {
                _this.attachToRenderer(h.renderer, debug);
            }
            else {
            }
        });
    };
    RendererDebugger.prototype.canvasToimg = function (renderer) {
        var canvas = renderer.ContextManager;
        var img = new Image(canvas.canvasElement.width, canvas.canvasElement.height);
        img.src = canvas.canvasElement.toDataURL();
        return img;
    };
    RendererDebugger.prototype.attachToRenderer = function (renderer, debug) {
        var _this = this;
        debug.debuggerAPI.renderers.addRenderer(renderer, this);
        renderer.RenderPathExecutor.renderStageCompleted.addListener(function (o, v) {
            if (_this.bufferTextureRequest && v.completedChain.stage.ID === _this.bufferTextureRequest.stageID) {
                if (v.bufferTextures[_this.bufferTextureRequest.bufferTextureID] == null) {
                    _this.bufferTextureRequest.deffered.resolve(_this.canvasToimg(v.owner.renderer));
                    _this.bufferTextureRequest = null;
                    return;
                }
                _this.bufferTextureRequest.deffered.resolve(v.bufferTextures[_this.bufferTextureRequest.bufferTextureID].wrappers[0].generateHtmlImage(_this.bufferTextureRequest.generator));
                _this.bufferTextureRequest = null;
            }
        });
        renderer.RenderPathExecutor.renderPathCompleted.addListener(function (o, v) {
            if (_this.shadowMapRequest && v.owner.renderer.ID === _this.shadowMapRequest.rendererID) {
                _this.shadowMapRequest.deffered.resolve(v.scene.LightRegister.shadowMapResourceManager.shadowMapTileTexture.wrappers[0].generateHtmlImage(_this.shadowMapRequest.generator));
                _this.shadowMapRequest = null;
            }
            if (_this.bufferTextureProgressRequest && _this.bufferTextureProgressRequest.begin) {
                _this.bufferTextureProgressRequest.deffered.resolve(null);
                _this.bufferTextureProgressRequest = null;
            }
            if (_this.shadowMapProgressRequest && _this.shadowMapProgressRequest.begin) {
                _this.shadowMapProgressRequest.deffered.resolve(null);
                _this.shadowMapProgressRequest = null;
            }
        });
        renderer.RenderPathExecutor.renderObjectCompleted.addListener(function (o, v) {
            if (_this.bufferTextureProgressRequest && v.stage.ID === _this.bufferTextureProgressRequest.stageID) {
                _this.bufferTextureProgressRequest.begin = true;
                v.owner.renderer.GL.flush();
                var img;
                if (v.bufferTextures[_this.bufferTextureProgressRequest.bufferTextureID] == null) {
                    img = _this.canvasToimg(v.owner.renderer);
                }
                else {
                    img = v.bufferTextures[_this.bufferTextureProgressRequest.bufferTextureID].wrappers[0].generateHtmlImage(_this.bufferTextureProgressRequest.generator);
                }
                img.title = "object:" + v.renderedObject.name + " technique:" + v.technique;
                _this.bufferTextureProgressRequest.deffered.notify({
                    image: img,
                    object: v.renderedObject,
                    technique: v.technique
                });
            }
            if (_this.shadowMapProgressRequest && v.stage.getTypeName() === "ShadowMapGenerationStage" && v.stage.Renderer.ID === _this.shadowMapProgressRequest.rendererID) {
                _this.shadowMapProgressRequest.begin = true;
                v.owner.renderer.GL.flush();
                img = v.renderedObject.ParentScene.LightRegister.shadowMapResourceManager.shadowMapTileTexture.wrappers[0].generateHtmlImage(_this.shadowMapProgressRequest.generator);
                img.title = "object:" + v.renderedObject.name + " technique:" + v.technique;
                _this.shadowMapProgressRequest.deffered.notify({
                    image: img,
                    object: v.renderedObject,
                    technique: v.technique
                });
            }
        });
    };
    RendererDebugger.prototype.getShadowMapImage = function (rendererID, generator) {
        var d = Q.defer();
        this.shadowMapRequest =
            {
                deffered: d,
                rendererID: rendererID,
                generator: generator
            };
        return d.promise;
    };
    RendererDebugger.prototype.getShadowMapProgressImage = function (rendererID, generator) {
        var d = Q.defer();
        this.shadowMapProgressRequest =
            {
                deffered: d,
                rendererID: rendererID,
                generator: generator,
                begin: false
            };
        return d.promise;
    };
    RendererDebugger.prototype.getTextureHtmlImage = function (stageID, bufferTextureID, generator) {
        var d = Q.defer();
        this.bufferTextureRequest =
            {
                deffered: d,
                stageID: stageID,
                bufferTextureID: bufferTextureID,
                generator: generator
            };
        return d.promise;
    };
    RendererDebugger.prototype.getTextureProgressHtmlImage = function (stageID, bufferTextureID, generator) {
        var d = Q.defer();
        this.bufferTextureProgressRequest =
            {
                deffered: d,
                stageID: stageID,
                bufferTextureID: bufferTextureID,
                generator: generator,
                begin: false
            };
        return d.promise;
    };
    return RendererDebugger;
})(DebuggerModuleBase);
module.exports = RendererDebugger;

},{"../../ContextComponents":12,"../../JThreeContext":226,"./DebuggerModuleBase":137,"q":309}],140:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DebuggerModuleBase = require("./DebuggerModuleBase");
var ContextComponents = require("../../ContextComponents");
var JThreeContext = require("../../JThreeContext");
var SceneStructureDebugger = (function (_super) {
    __extends(SceneStructureDebugger, _super);
    function SceneStructureDebugger() {
        _super.apply(this, arguments);
    }
    SceneStructureDebugger.prototype.attach = function (debug) {
        JThreeContext.getContextComponent(ContextComponents.SceneManager).sceneListChanged.addListener(function (o, v) {
            if (v.isAdditionalChange) {
                var scenesAPI = debug.debuggerAPI.scenes.setScene(v.changedScene.ID, v.changedScene);
                v.changedScene.sceneObjectStructureChanged.addListener(function (o2, v2) {
                    debug.debuggerAPI.scenes.setScene(v.changedScene.ID, v.changedScene);
                });
            }
            else {
            }
        });
    };
    return SceneStructureDebugger;
})(DebuggerModuleBase);
module.exports = SceneStructureDebugger;

},{"../../ContextComponents":12,"../../JThreeContext":226,"./DebuggerModuleBase":137}],141:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JThreeObject = require("./Base/JThreeObject");
var jThreeException = (function (_super) {
    __extends(jThreeException, _super);
    function jThreeException(name, message) {
        _super.call(this);
        this.name = name;
        this.message = message;
    }
    jThreeException.prototype.toString = function () {
        return "Exception:" + _super.prototype.toString.call(this) + "\nName:" + this.name + "\nMessage:" + this.message;
    };
    return jThreeException;
})(JThreeObject);
exports.jThreeException = jThreeException;
var IrregularElementAccessException = (function (_super) {
    __extends(IrregularElementAccessException, _super);
    function IrregularElementAccessException(accessIndex) {
        _super.call(this, "Irregular vector element was accessed.", "You attempted to access " + accessIndex + " element. But,this vector have enough dimension.");
    }
    return IrregularElementAccessException;
})(jThreeException);
exports.IrregularElementAccessException = IrregularElementAccessException;
var InvalidArgumentException = (function (_super) {
    __extends(InvalidArgumentException, _super);
    function InvalidArgumentException(message) {
        _super.call(this, "Invalid argument was passed.", message);
    }
    return InvalidArgumentException;
})(jThreeException);
exports.InvalidArgumentException = InvalidArgumentException;
var SingularMatrixException = (function (_super) {
    __extends(SingularMatrixException, _super);
    function SingularMatrixException(m) {
        _super.call(this, "Passed matrix is singular matrix", "passed matrix:" + m.toString());
    }
    return SingularMatrixException;
})(jThreeException);
exports.SingularMatrixException = SingularMatrixException;
var AbstractClassMethodCalledException = (function (_super) {
    __extends(AbstractClassMethodCalledException, _super);
    function AbstractClassMethodCalledException() {
        _super.call(this, "Invalid method was called.", "This method is abstract method, cant call by this instance");
    }
    return AbstractClassMethodCalledException;
})(jThreeException);
exports.AbstractClassMethodCalledException = AbstractClassMethodCalledException;
var WebGLErrorException = (function (_super) {
    __extends(WebGLErrorException, _super);
    function WebGLErrorException(text) {
        _super.call(this, "WebGL reported error.", text);
    }
    return WebGLErrorException;
})(jThreeException);
exports.WebGLErrorException = WebGLErrorException;

},{"./Base/JThreeObject":9}],142:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JThreeObjectWithID = require("../../Base/JThreeObjectWithID");
var AnimaterBase = (function (_super) {
    __extends(AnimaterBase, _super);
    function AnimaterBase(targetAttribute, begintime, duration, beginValue, endValue, easing, onComplete) {
        _super.call(this);
        this.targetAttribute = targetAttribute;
        this.beginTime = begintime;
        this.duration = duration;
        this.onComplete = onComplete;
        this.easingFunction = easing;
        this.beginValue = this.targetAttribute.Converter.FromInterface(beginValue);
        this.endValue = this.targetAttribute.Converter.FromInterface(endValue);
    }
    AnimaterBase.prototype.update = function (time) {
        var progress = (time - this.beginTime) / this.duration;
        var isFinish = progress >= 1;
        progress = Math.min(Math.max(progress, 0), 1);
        this.updateAnimation(progress);
        if (isFinish && typeof this.onComplete === "function")
            this.onComplete();
        return isFinish;
    };
    AnimaterBase.prototype.updateAnimation = function (progress) {
    };
    return AnimaterBase;
})(JThreeObjectWithID);
module.exports = AnimaterBase;

},{"../../Base/JThreeObjectWithID":10}],143:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AnimagterBase = require("./AnimaterBase");
var Color3 = require("../../Base/Color/Color3");
var Color3Animater = (function (_super) {
    __extends(Color3Animater, _super);
    function Color3Animater() {
        _super.apply(this, arguments);
    }
    Color3Animater.prototype.updateAnimation = function (progress) {
        var b = this.beginValue;
        var e = this.endValue;
        var ef = this.easingFunction.Ease;
        this.targetAttribute.Value = new Color3(ef(b.R, e.R, progress), ef(b.G, e.G, progress), ef(b.B, e.B, progress));
    };
    return Color3Animater;
})(AnimagterBase);
module.exports = Color3Animater;

},{"../../Base/Color/Color3":3,"./AnimaterBase":142}],144:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AnimagterBase = require("./AnimaterBase");
var Color4 = require("../../Base/Color/Color4");
var Color4Animater = (function (_super) {
    __extends(Color4Animater, _super);
    function Color4Animater() {
        _super.apply(this, arguments);
    }
    Color4Animater.prototype.updateAnimation = function (progress) {
        var b = this.beginValue;
        var e = this.endValue;
        var ef = this.easingFunction.Ease;
        this.targetAttribute.Value = new Color4(ef(b.R, e.R, progress), ef(b.G, e.G, progress), ef(b.B, e.B, progress), ef(b.A, b.A, progress));
    };
    return Color4Animater;
})(AnimagterBase);
module.exports = Color4Animater;

},{"../../Base/Color/Color4":4,"./AnimaterBase":142}],145:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AnimagterBase = require("./AnimaterBase");
var IntegerAnimater = (function (_super) {
    __extends(IntegerAnimater, _super);
    function IntegerAnimater() {
        _super.apply(this, arguments);
    }
    IntegerAnimater.prototype.updateAnimation = function (progress) {
        var b = this.beginValue;
        var e = this.endValue;
        var ef = this.easingFunction.Ease;
        var val = Math.floor(ef(b, e, progress));
        if (this.targetAttribute.Value !== val)
            this.targetAttribute.Value = val;
    };
    return IntegerAnimater;
})(AnimagterBase);
module.exports = IntegerAnimater;

},{"./AnimaterBase":142}],146:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AnimagterBase = require("./AnimaterBase");
var NumberAnimater = (function (_super) {
    __extends(NumberAnimater, _super);
    function NumberAnimater() {
        _super.apply(this, arguments);
    }
    NumberAnimater.prototype.updateAnimation = function (progress) {
        this.targetAttribute.Value = this.easingFunction.Ease(this.beginValue, this.endValue, progress);
    };
    return NumberAnimater;
})(AnimagterBase);
module.exports = NumberAnimater;

},{"./AnimaterBase":142}],147:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AnimagterBase = require("./AnimaterBase");
var Quaternion = require("../../Math/Quaternion");
var RotationAnimater = (function (_super) {
    __extends(RotationAnimater, _super);
    function RotationAnimater() {
        _super.apply(this, arguments);
    }
    RotationAnimater.prototype.updateAnimation = function (progress) {
        var b = this.beginValue;
        var e = this.endValue;
        var ef = this.easingFunction.Ease;
        this.targetAttribute.Value = Quaternion.Slerp(b, e, ef(0, 1, progress));
    };
    return RotationAnimater;
})(AnimagterBase);
module.exports = RotationAnimater;

},{"../../Math/Quaternion":232,"./AnimaterBase":142}],148:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AnimagterBase = require("./AnimaterBase");
var Vector3 = require("../../Math/Vector3");
var Vector3Animater = (function (_super) {
    __extends(Vector3Animater, _super);
    function Vector3Animater() {
        _super.apply(this, arguments);
    }
    Vector3Animater.prototype.updateAnimation = function (progress) {
        var b = this.beginValue;
        var e = this.endValue;
        var ef = this.easingFunction.Ease;
        this.targetAttribute.Value = new Vector3(ef(b.X, e.X, progress), ef(b.Y, e.Y, progress), ef(b.Z, e.Z, progress));
        console.log(this.targetAttribute.Value.Z);
    };
    return Vector3Animater;
})(AnimagterBase);
module.exports = Vector3Animater;

},{"../../Math/Vector3":235,"./AnimaterBase":142}],149:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JThreeObject = require("../Base/JThreeObject");
var JThreeCollection = require("../Base/JThreeCollection");
var GomlAttribute = require("./GomlAttribute");
var AttributeDictionary = (function (_super) {
    __extends(AttributeDictionary, _super);
    function AttributeDictionary(node, element) {
        _super.call(this);
        this.attributes = new JThreeCollection();
        this.element = element;
        this.node = node;
    }
    AttributeDictionary.prototype.getValue = function (attrName) {
        var attr = this.attributes.getById(attrName);
        if (attr == null)
            console.warn("attribute \"" + attrName + "\" is not found.");
        else
            return attr.Converter.FromInterface(attr.Value);
    };
    AttributeDictionary.prototype.setValue = function (attrName, value, needUpdate) {
        if (needUpdate === void 0) { needUpdate = true; }
        var attr = this.attributes.getById(attrName);
        if (attr == null)
            console.warn("attribute \"" + attrName + "\" is not found.");
        else {
            if (attr.Constant) {
                console.error("attribute: " + attrName + " is constant attribute");
                return;
            }
            var cacheNotifyConfigure = attr.NeedNotifyUpdate;
            attr.NeedNotifyUpdate = needUpdate;
            attr.Value = value;
            attr.NeedNotifyUpdate = cacheNotifyConfigure;
        }
    };
    AttributeDictionary.prototype.getAttribute = function (attrName) {
        return this.attributes.getById(attrName);
    };
    AttributeDictionary.prototype.getAnimater = function (attrName, beginTime, duration, beginVal, endVal, easing, onComplete) {
        var attr = this.attributes.getById(attrName);
        if (attr == null)
            console.warn("attribute \"" + attrName + "\" is not found.");
        else
            return attr.Converter.GetAnimater(attr, beginVal, endVal, beginTime, duration, easing, onComplete);
    };
    AttributeDictionary.prototype.isDefined = function (attrName) {
        return this.attributes.getById(attrName) != null;
    };
    AttributeDictionary.prototype.defineAttribute = function (attributes) {
        for (var key in attributes) {
            var attribute = attributes[key];
            this.attributes.insert(new GomlAttribute(this.node, this.element, key, attribute.value, this.node.nodeManager.configurator.getConverter(attribute.converter), attribute.handler, attribute.constant));
        }
    };
    AttributeDictionary.prototype.applyDefaultValue = function () {
        this.attributes.each(function (v) {
            if (typeof v.Value !== 'undefined')
                v.notifyValueChanged();
        });
    };
    AttributeDictionary.prototype.updateValue = function (attrName) {
        if (typeof attrName === 'undefined') {
            this.attributes.each(function (v) {
                v.notifyValueChanged();
            });
        }
        else {
            var target = this.attributes.getById(attrName);
            target.notifyValueChanged();
        }
    };
    return AttributeDictionary;
})(JThreeObject);
module.exports = AttributeDictionary;

},{"../Base/JThreeCollection":5,"../Base/JThreeObject":9,"./GomlAttribute":171}],150:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var jThreeObject = require("../Base/JThreeObject");
var Quaternion = require("../Math/Quaternion");
var Vector3 = require("../Math/Vector3");
var AttributeParser = (function (_super) {
    __extends(AttributeParser, _super);
    function AttributeParser() {
        _super.apply(this, arguments);
    }
    AttributeParser.ParseAngle = function (input) {
        if (input.match(/^p$/))
            return Math.PI;
        var isDegree = input.match(/[0-9E/\(\)\.-]+d$/);
        var needPiMultiply = input.match(/[0-9E/\(\)\.-]+p/);
        var replaced = input.replace(/^([0-9E/\(\)\.-]+)p?d?$/, "$1");
        var evalued = eval(replaced);
        if (isDegree != null) {
            evalued *= 2 * Math.PI / 360;
        }
        if (needPiMultiply != null) {
            evalued *= Math.PI;
        }
        return evalued;
    };
    AttributeParser.ParseRotation3D = function (input) {
        input = input.replace(/\s/g, "");
        if (input.match(/^[xyz]\(.+\)$/)) {
            var signature = input.replace(/^([xyz])\(.+\)$/, "$1");
            var value = input.replace(/^[xyz]\((.+)\)$/, "$1");
            var angle = AttributeParser.ParseAngle(value);
            if (signature == "x") {
                return Quaternion.AngleAxis(angle, Vector3.XUnit);
            }
            else if (signature == "y") {
                return Quaternion.AngleAxis(angle, Vector3.YUnit);
            }
            else {
                return Quaternion.AngleAxis(angle, Vector3.ZUnit);
            }
        }
        else if (input.match(/^euler\([0-9E/\(\)\.-]+p?d?,[0-9E/\(\)\.-]+p?d?,[0-9E/\(\)\.-]+p?d?\)$/)) {
            var angles = input.replace(/^euler\(([0-9E/\(\)\.-]+p?d?),([0-9E/\(\)\.-]+p?d?),([0-9E/\(\)\.-]+p?d?)\)$/, "$1,$2,$3");
            var splitted = angles.split(/,/);
            return Quaternion.Euler(AttributeParser.ParseAngle(splitted[0]), AttributeParser.ParseAngle(splitted[1]), AttributeParser.ParseAngle(splitted[2]));
        }
        else if (input.match(/^axis\([0-9E/\(\)\.-]+p?d?,[\d\.]+,[\d\.]+,[\d\.]\)$/)) {
            var angles = input.replace(/^axis\(([0-9E/\(\)\.-]+p?d?),([\d\.]+),([\d\.]+),([\d\.]+)\)$/, "$1,$2,$3,$4");
            var splitted = angles.split(/,/);
            return Quaternion.AngleAxis(AttributeParser.ParseAngle(splitted[0]), new Vector3(parseFloat(splitted[1]), parseFloat(splitted[2]), parseFloat(splitted[3])));
        }
        return null;
    };
    return AttributeParser;
})(jThreeObject);
module.exports = AttributeParser;

},{"../Base/JThreeObject":9,"../Math/Quaternion":232,"../Math/Vector3":235}],151:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JThreeObject = require('../../Base/JThreeObject');
var AssociativeArray = require('../../Base/Collections/AssociativeArray');
var BehaviorRegistry = (function (_super) {
    __extends(BehaviorRegistry, _super);
    function BehaviorRegistry() {
        _super.call(this);
        this.behaviorInstances = new AssociativeArray();
    }
    BehaviorRegistry.prototype.defineBehavior = function (nameOrDeclarations, behaviorDeclaration) {
        if (typeof nameOrDeclarations === "string") {
            var behaviorName = nameOrDeclarations;
            this.behaviorInstances.set(behaviorName, this.generateBehaviorInstance(behaviorDeclaration));
        }
        else {
            var behaviorDeclarations = nameOrDeclarations;
            for (var behaviorKey in behaviorDeclarations) {
                this.behaviorInstances.set(behaviorKey, this.generateBehaviorInstance(behaviorDeclarations[behaviorKey]));
            }
        }
    };
    BehaviorRegistry.prototype.getBehavior = function (behaviorName) {
        return this.behaviorInstances.get(behaviorName);
    };
    BehaviorRegistry.prototype.generateBehaviorInstance = function (behaviorDecl) {
        if (typeof behaviorDecl === "function") {
            return (new behaviorDecl());
        }
        else {
            return this.copyObject(behaviorDecl);
        }
    };
    BehaviorRegistry.prototype.copyObject = function (targetObject) {
        if (typeof targetObject === "object") {
            var newObject = {};
            for (var key in targetObject) {
                if (targetObject.hasOwnProperty(key)) {
                    var property = targetObject[key];
                    newObject[key] = this.copyObject(property);
                }
            }
            return newObject;
        }
        else {
            return targetObject;
        }
    };
    return BehaviorRegistry;
})(JThreeObject);
module.exports = BehaviorRegistry;

},{"../../Base/Collections/AssociativeArray":2,"../../Base/JThreeObject":9}],152:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JThreeObject = require('../../Base/JThreeObject');
var JThreeCollection = require('../../Base/JThreeCollection');
var JThreeObjectWithID = require('../../Base/JThreeObjectWithID');
var BehaviorNodePair = (function (_super) {
    __extends(BehaviorNodePair, _super);
    function BehaviorNodePair(behavior, target) {
        _super.call(this, behavior.ID);
        this.behavior = behavior;
        this.targetNode = target;
    }
    Object.defineProperty(BehaviorNodePair.prototype, "Behavior", {
        get: function () {
            return this.behavior;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BehaviorNodePair.prototype, "Target", {
        get: function () {
            return this.targetNode;
        },
        enumerable: true,
        configurable: true
    });
    return BehaviorNodePair;
})(JThreeObjectWithID);
var BehaviorRunner = (function (_super) {
    __extends(BehaviorRunner, _super);
    function BehaviorRunner() {
        _super.apply(this, arguments);
        this.dictionary = new JThreeCollection();
        this.sortedBehavior = [];
    }
    BehaviorRunner.prototype.sortBehaviors = function () {
        this.sortedBehavior.sort(function (v1, v2) { return v1.Behavior.order - v2.Behavior.order; });
    };
    BehaviorRunner.prototype.addBehavior = function (node, target) {
        var componentPair = new BehaviorNodePair(node, target);
        this.dictionary.insert(componentPair);
        this.sortedBehavior.push(componentPair);
        this.sortBehaviors();
        if (!node.awaken)
            node.awake.call(node, target);
    };
    BehaviorRunner.prototype.executeForAllBehaviors = function (behaviorName) {
        this.sortedBehavior.forEach(function (v) {
            if (v.Behavior.enabled) {
                v.Behavior[behaviorName](v.Target);
            }
        });
    };
    return BehaviorRunner;
})(JThreeObject);
module.exports = BehaviorRunner;

},{"../../Base/JThreeCollection":5,"../../Base/JThreeObject":9,"../../Base/JThreeObjectWithID":10}],153:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Exceptions = require("../../Exceptions");
var AttributeParser = require("../AttributeParser");
var AttributeConverterBase = require("./AttributeConverterBase");
var AngleAttributeConverter = (function (_super) {
    __extends(AngleAttributeConverter, _super);
    function AngleAttributeConverter() {
        _super.call(this);
    }
    AngleAttributeConverter.prototype.ToAttribute = function (val) {
        return val;
    };
    AngleAttributeConverter.prototype.FromAttribute = function (attr) {
        return AttributeParser.ParseAngle(attr);
    };
    AngleAttributeConverter.prototype.FromInterface = function (val) {
        if (typeof val === 'string') {
            return this.FromAttribute(val);
        }
        else if (typeof val === 'number') {
            return val;
        }
        throw new Exceptions.InvalidArgumentException("val can't parse");
    };
    return AngleAttributeConverter;
})(AttributeConverterBase);
module.exports = AngleAttributeConverter;

},{"../../Exceptions":141,"../AttributeParser":150,"./AttributeConverterBase":154}],154:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JThreeObject = require("../../Base/JThreeObject");
var Exceptions = require("../../Exceptions");
var AttributeConverterBase = (function (_super) {
    __extends(AttributeConverterBase, _super);
    function AttributeConverterBase() {
        _super.call(this);
    }
    AttributeConverterBase.prototype.ToAttribute = function (val) {
        throw new Exceptions.AbstractClassMethodCalledException();
    };
    AttributeConverterBase.prototype.FromAttribute = function (attr) {
        throw new Exceptions.AbstractClassMethodCalledException();
    };
    AttributeConverterBase.prototype.FromInterface = function (val) {
        throw new Exceptions.AbstractClassMethodCalledException();
    };
    AttributeConverterBase.prototype.GetAnimater = function (attr, beginVal, endVal, beginTime, duration, easing, onComplete) {
        throw new Exceptions.AbstractClassMethodCalledException();
    };
    return AttributeConverterBase;
})(JThreeObject);
module.exports = AttributeConverterBase;

},{"../../Base/JThreeObject":9,"../../Exceptions":141}],155:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AttributeConverterBase = require("./AttributeConverterBase");
var BooleanAttributeConverter = (function (_super) {
    __extends(BooleanAttributeConverter, _super);
    function BooleanAttributeConverter() {
        _super.call(this);
    }
    BooleanAttributeConverter.prototype.ToAttribute = function (val) {
        return val;
    };
    BooleanAttributeConverter.prototype.FromAttribute = function (attr) {
        return attr === 'true';
    };
    BooleanAttributeConverter.prototype.FromInterface = function (val) {
        if (typeof val === 'boolean')
            return val;
        return this.FromAttribute(val);
    };
    return BooleanAttributeConverter;
})(AttributeConverterBase);
module.exports = BooleanAttributeConverter;

},{"./AttributeConverterBase":154}],156:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AttributeConverterBase = require("./AttributeConverterBase");
var Exceptions = require("../../Exceptions");
var Color3 = require("../../Base/Color/Color3");
var Color3Animater = require("../Animater/Color3Animater");
var Color3AttributeConverter = (function (_super) {
    __extends(Color3AttributeConverter, _super);
    function Color3AttributeConverter() {
        _super.call(this);
    }
    Color3AttributeConverter.prototype.ToAttribute = function (val) {
        return val;
    };
    Color3AttributeConverter.prototype.FromAttribute = function (attr) {
        return Color3.parseColor(attr);
    };
    Color3AttributeConverter.prototype.FromInterface = function (val) {
        if (typeof val === 'string') {
            return Color3.parseColor(val);
        }
        else if (typeof val === 'object') {
            return val;
        }
        throw new Exceptions.InvalidArgumentException("val can't parse");
    };
    Color3AttributeConverter.prototype.GetAnimater = function (attr, beginVal, endVal, beginTime, duration, easing, onComplete) {
        return new Color3Animater(attr, beginTime, duration, beginVal, endVal, easing, onComplete);
    };
    return Color3AttributeConverter;
})(AttributeConverterBase);
module.exports = Color3AttributeConverter;

},{"../../Base/Color/Color3":3,"../../Exceptions":141,"../Animater/Color3Animater":143,"./AttributeConverterBase":154}],157:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AttributeConverterBase = require("./AttributeConverterBase");
var Exceptions = require("../../Exceptions");
var Color4 = require("../../Base/Color/Color4");
var Color4Animater = require("../Animater/Color4Animater");
var Color4AttributeConverter = (function (_super) {
    __extends(Color4AttributeConverter, _super);
    function Color4AttributeConverter() {
        _super.call(this);
    }
    Color4AttributeConverter.prototype.ToAttribute = function (val) {
        return val;
    };
    Color4AttributeConverter.prototype.FromAttribute = function (attr) {
        return Color4.parseColor(attr);
    };
    Color4AttributeConverter.prototype.FromInterface = function (val) {
        if (typeof val === 'string') {
            return Color4.parseColor(val);
        }
        else if (typeof val === 'object') {
            return val;
        }
        throw new Exceptions.InvalidArgumentException("val can't parse");
    };
    Color4AttributeConverter.prototype.GetAnimater = function (attr, beginVal, endVal, beginTime, duration, easing, onComplete) {
        return new Color4Animater(attr, beginTime, duration, beginVal, endVal, easing, onComplete);
    };
    return Color4AttributeConverter;
})(AttributeConverterBase);
module.exports = Color4AttributeConverter;

},{"../../Base/Color/Color4":4,"../../Exceptions":141,"../Animater/Color4Animater":144,"./AttributeConverterBase":154}],158:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AttributeConverterBase = require("./AttributeConverterBase");
var IntegerAnimater = require('../Animater/IntegerAnimater');
var IntegerAttributeConverter = (function (_super) {
    __extends(IntegerAttributeConverter, _super);
    function IntegerAttributeConverter() {
        _super.call(this);
    }
    IntegerAttributeConverter.prototype.ToAttribute = function (val) {
        return val;
    };
    IntegerAttributeConverter.prototype.FromAttribute = function (attr) {
        return parseInt(attr);
    };
    IntegerAttributeConverter.prototype.FromInterface = function (val) {
        if (typeof val === 'number') {
            return Math.floor(val);
        }
        else if (typeof val === 'string') {
            return Math.floor(this.FromAttribute(val));
        }
    };
    IntegerAttributeConverter.prototype.GetAnimater = function (attr, beginVal, endVal, beginTime, duration, easing, onComplete) {
        return new IntegerAnimater(attr, beginTime, duration, beginVal, endVal, easing, onComplete);
    };
    return IntegerAttributeConverter;
})(AttributeConverterBase);
module.exports = IntegerAttributeConverter;

},{"../Animater/IntegerAnimater":145,"./AttributeConverterBase":154}],159:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AttributeConverterBase = require("./AttributeConverterBase");
var Exceptions = require("../../Exceptions");
var NumberAnimater = require("../Animater/NumberAnimater");
var NumberAttributeConverter = (function (_super) {
    __extends(NumberAttributeConverter, _super);
    function NumberAttributeConverter() {
        _super.call(this);
    }
    NumberAttributeConverter.prototype.ToAttribute = function (val) {
        return val;
    };
    NumberAttributeConverter.prototype.FromAttribute = function (attr) {
        return Number(attr);
    };
    NumberAttributeConverter.prototype.FromInterface = function (val) {
        if (typeof val === 'string') {
            return Number(val);
        }
        else if (typeof val === 'number') {
            return val;
        }
        throw new Exceptions.InvalidArgumentException("val can't parse");
    };
    NumberAttributeConverter.prototype.GetAnimater = function (attr, beginVal, endVal, beginTime, duration, easing, onComplete) {
        return new NumberAnimater(attr, beginTime, duration, beginVal, endVal, easing, onComplete);
    };
    return NumberAttributeConverter;
})(AttributeConverterBase);
module.exports = NumberAttributeConverter;

},{"../../Exceptions":141,"../Animater/NumberAnimater":146,"./AttributeConverterBase":154}],160:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JThreeObject = require("../../Base/JThreeObject");
var Exceptions = require("../../Exceptions");
var AttributeParser = require("../AttributeParser");
var RotationAnimater = require("../Animater/RotationAnimater");
var RotationAttributeConverter = (function (_super) {
    __extends(RotationAttributeConverter, _super);
    function RotationAttributeConverter() {
        _super.call(this);
    }
    RotationAttributeConverter.prototype.ToAttribute = function (val) {
        return val;
    };
    RotationAttributeConverter.prototype.FromAttribute = function (attr) {
        return AttributeParser.ParseRotation3D(attr);
    };
    RotationAttributeConverter.prototype.FromInterface = function (val) {
        if (typeof val === 'string') {
            return this.FromAttribute(val);
        }
        else if (typeof val === 'object') {
            return val;
        }
        throw new Exceptions.InvalidArgumentException("val can't parse");
    };
    RotationAttributeConverter.prototype.GetAnimater = function (attr, beginVal, endVal, beginTime, duration, easing, onComplete) {
        return new RotationAnimater(attr, beginTime, duration, beginVal, endVal, easing, onComplete);
    };
    return RotationAttributeConverter;
})(JThreeObject);
module.exports = RotationAttributeConverter;

},{"../../Base/JThreeObject":9,"../../Exceptions":141,"../Animater/RotationAnimater":147,"../AttributeParser":150}],161:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Exceptions = require("../../Exceptions");
var AttributeConverterBase = require("./AttributeConverterBase");
var StringAttributeConverter = (function (_super) {
    __extends(StringAttributeConverter, _super);
    function StringAttributeConverter() {
        _super.call(this);
    }
    StringAttributeConverter.prototype.ToAttribute = function (val) {
        return val;
    };
    StringAttributeConverter.prototype.FromAttribute = function (attr) {
        return attr;
    };
    StringAttributeConverter.prototype.FromInterface = function (val) {
        if (typeof val === 'string') {
            return this.FromAttribute(val);
        }
        else if (typeof val === "undefined") {
            return "";
        }
        else if (val === null) {
            return null;
        }
        throw new Exceptions.InvalidArgumentException("val can't parse");
    };
    return StringAttributeConverter;
})(AttributeConverterBase);
module.exports = StringAttributeConverter;

},{"../../Exceptions":141,"./AttributeConverterBase":154}],162:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AttributeConverterBase = require("./AttributeConverterBase");
var Exceptions = require("../../Exceptions");
var Vector3 = require("../../Math/Vector3");
var Vector3Animater = require("../Animater/Vector3Animater");
var Vector3AttributeConverter = (function (_super) {
    __extends(Vector3AttributeConverter, _super);
    function Vector3AttributeConverter() {
        _super.call(this);
    }
    Vector3AttributeConverter.prototype.ToAttribute = function (val) {
        return val;
    };
    Vector3AttributeConverter.prototype.FromAttribute = function (attr) {
        return Vector3.parse(attr);
    };
    Vector3AttributeConverter.prototype.FromInterface = function (val) {
        if (typeof val === 'string') {
            return Vector3.parse(val);
        }
        else if (typeof val === 'object') {
            return val;
        }
        throw new Exceptions.InvalidArgumentException("val can't parse");
    };
    Vector3AttributeConverter.prototype.GetAnimater = function (attr, beginVal, endVal, beginTime, duration, easing, onComplete) {
        return new Vector3Animater(attr, beginTime, duration, beginVal, endVal, easing, onComplete);
    };
    return Vector3AttributeConverter;
})(AttributeConverterBase);
module.exports = Vector3AttributeConverter;

},{"../../Exceptions":141,"../../Math/Vector3":235,"../Animater/Vector3Animater":148,"./AttributeConverterBase":154}],163:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JThreeObject = require("../../Base/JThreeObject");
var EasingFunctionBase = (function (_super) {
    __extends(EasingFunctionBase, _super);
    function EasingFunctionBase() {
        _super.apply(this, arguments);
    }
    EasingFunctionBase.prototype.Ease = function (begin, end, progress) {
        return null;
    };
    return EasingFunctionBase;
})(JThreeObject);
module.exports = EasingFunctionBase;

},{"../../Base/JThreeObject":9}],164:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EasingFunctionBase = require("./EasingFunctionBase");
var LinearEasingFunction = (function (_super) {
    __extends(LinearEasingFunction, _super);
    function LinearEasingFunction() {
        _super.apply(this, arguments);
    }
    LinearEasingFunction.prototype.Ease = function (begin, end, progress) {
        return begin + (end - begin) * progress;
    };
    return LinearEasingFunction;
})(EasingFunctionBase);
module.exports = LinearEasingFunction;

},{"./EasingFunctionBase":163}],165:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EasingFunctionBase = require("./EasingFunctionBase");
var SwingEasingFunction = (function (_super) {
    __extends(SwingEasingFunction, _super);
    function SwingEasingFunction() {
        _super.apply(this, arguments);
    }
    SwingEasingFunction.prototype.Ease = function (begin, end, progress) {
        var p = 0.5 - Math.cos(progress * Math.PI) / 2;
        return begin + (end - begin) * p;
    };
    return SwingEasingFunction;
})(EasingFunctionBase);
module.exports = SwingEasingFunction;

},{"./EasingFunctionBase":163}],166:[function(require,module,exports){
var easingFunction = {
    "linear": require("./Easing/LinearEasingFunction"),
    "swing": require("./Easing/SwingEasingFunction")
};
module.exports = easingFunction;

},{"./Easing/LinearEasingFunction":164,"./Easing/SwingEasingFunction":165}],167:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TagFactory = require("./TagFactory");
var ComponentTagFactory = (function (_super) {
    __extends(ComponentTagFactory, _super);
    function ComponentTagFactory() {
        _super.apply(this, arguments);
    }
    ComponentTagFactory.prototype.CreateNodeForThis = function (elem, parent) {
        if (parent.getTypeName() === "BehaviorsNode") {
            var castedParent = parent;
            return new this.nodeType(elem, parent, castedParent.ComponentTarget);
        }
    };
    return ComponentTagFactory;
})(TagFactory);
module.exports = ComponentTagFactory;

},{"./TagFactory":170}],168:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TagFactory = require("./TagFactory");
var ChildrenParseSkipFactory = (function (_super) {
    __extends(ChildrenParseSkipFactory, _super);
    function ChildrenParseSkipFactory() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(ChildrenParseSkipFactory.prototype, "NoNeedParseChildren", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    return ChildrenParseSkipFactory;
})(TagFactory);
module.exports = ChildrenParseSkipFactory;

},{"./TagFactory":170}],169:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TagFactory = require("./TagFactory");
var SceneObjectTagFactory = (function (_super) {
    __extends(SceneObjectTagFactory, _super);
    function SceneObjectTagFactory() {
        _super.apply(this, arguments);
    }
    SceneObjectTagFactory.prototype.CreateNodeForThis = function (elem, parent) {
        var sceneNode = null;
        var sceneObjectNode = null;
        if (parent.getTypeName() == "SceneNode") {
            sceneNode = parent;
            sceneObjectNode = null;
        }
        else {
            if (typeof parent["ContainedSceneNode"] === "undefined") {
                console.error(parent.toString() + " is not extends SceneObjectNodeBase. Is this really ok to be contained in Scene tag?");
                return null;
            }
            else {
                sceneObjectNode = parent;
                sceneNode = sceneObjectNode.ContainedSceneNode;
            }
        }
        return this.CreateSceneObjectNodeForThis(elem, parent, sceneNode, sceneObjectNode);
    };
    SceneObjectTagFactory.prototype.CreateSceneObjectNodeForThis = function (elem, parent, containedSceneNode, parentSceneObjectNode) {
        return new this.nodeType(elem, parent, containedSceneNode, parentSceneObjectNode);
    };
    return SceneObjectTagFactory;
})(TagFactory);
module.exports = SceneObjectTagFactory;

},{"./TagFactory":170}],170:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var jThreeObject = require("../../Base/JThreeObject");
var JThreeContext = require("../../JThreeContext");
var ContextComponents = require('../../ContextComponents');
var TagFactory = (function (_super) {
    __extends(TagFactory, _super);
    function TagFactory(tagName, nodeType) {
        _super.call(this);
        this.tagName = tagName;
        this.nodeType = nodeType;
        this.nodeManager = JThreeContext.getContextComponent(ContextComponents.NodeManager);
    }
    Object.defineProperty(TagFactory.prototype, "TagName", {
        get: function () {
            return this.tagName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TagFactory.prototype, "NoNeedParseChildren", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    TagFactory.prototype.CreateNodeForThis = function (elem, parent) {
        return new this.nodeType(elem, parent);
    };
    TagFactory.prototype.getTag = function (name) {
        return this.nodeManager.configurator.getGomlTagFactory(name);
    };
    return TagFactory;
})(jThreeObject);
module.exports = TagFactory;

},{"../../Base/JThreeObject":9,"../../ContextComponents":12,"../../JThreeContext":226}],171:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JThreeObjectWithID = require("../Base/JThreeObjectWithID");
var JThreeEvent = require('../Base/JThreeEvent');
var GomlAttribute = (function (_super) {
    __extends(GomlAttribute, _super);
    function GomlAttribute(node, element, name, value, converter, handler, constant) {
        _super.call(this, name);
        this.cached = false;
        this.value = undefined;
        this.onchangedHandlers = new JThreeEvent();
        this.needNotifyUpdate = true;
        if (typeof constant === "undefined")
            constant = false;
        this.constant = constant;
        this.element = element;
        this.converter = converter;
        this.value = converter.FromInterface(value);
        this.managedClass = node;
        if (handler)
            this.onchangedHandlers.addListener(handler);
    }
    Object.defineProperty(GomlAttribute.prototype, "NeedNotifyUpdate", {
        get: function () {
            return this.needNotifyUpdate;
        },
        set: function (val) {
            this.needNotifyUpdate = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GomlAttribute.prototype, "Name", {
        get: function () {
            return this.ID;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GomlAttribute.prototype, "Value", {
        get: function () {
            if (this.cached) {
                return this.value;
            }
            else {
                var attr = this.element.getAttribute(this.Name);
                if (attr) {
                    this.value = this.Converter.FromAttribute(this.element.getAttribute(this.Name));
                    this.cached = true;
                }
                return this.value;
            }
        },
        set: function (val) {
            if (this.Constant)
                return;
            this.value = this.Converter.FromInterface(val);
            this.element.setAttribute(this.Name, this.Converter.ToAttribute(val));
            this.cached = true;
            if (this.NeedNotifyUpdate)
                this.notifyValueChanged();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GomlAttribute.prototype, "Constant", {
        get: function () {
            return this.constant;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GomlAttribute.prototype, "Converter", {
        get: function () {
            return this.converter;
        },
        enumerable: true,
        configurable: true
    });
    GomlAttribute.prototype.notifyValueChanged = function () {
        if (this.Constant)
            return;
        this.onchangedHandlers.fire(this, this);
    };
    GomlAttribute.prototype.onValueChanged = function (handler) {
        this.onchangedHandlers.addListener(handler);
    };
    return GomlAttribute;
})(JThreeObjectWithID);
module.exports = GomlAttribute;

},{"../Base/JThreeEvent":6,"../Base/JThreeObjectWithID":10}],172:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JThreeObject = require("../Base/JThreeObject");
var AssociativeArray = require("../Base/Collections/AssociativeArray");
var GomlConfigurator = (function (_super) {
    __extends(GomlConfigurator, _super);
    function GomlConfigurator() {
        _super.call(this);
        this.easingFunctions = new AssociativeArray();
        this.converters = new AssociativeArray();
        this.gomlTagFactories = new AssociativeArray();
        this.initializeEasingFunctions();
        this.initializeConverters();
        this.initializeGomlTags();
    }
    GomlConfigurator.prototype.getConverter = function (name) {
        return this.converters.get(name);
    };
    GomlConfigurator.prototype.getEasingFunction = function (name) {
        return this.easingFunctions.get(name);
    };
    GomlConfigurator.prototype.getGomlTagFactory = function (tagName) {
        return this.gomlTagFactories.get(tagName);
    };
    GomlConfigurator.prototype.initializeEasingFunctions = function () {
        this.loadIntoAssociativeArray(this.easingFunctions, require("./EasingFunctionList"));
    };
    GomlConfigurator.prototype.initializeConverters = function () {
        this.loadIntoAssociativeArray(this.converters, require("./GomlConverterList"));
    };
    GomlConfigurator.prototype.initializeGomlTags = function () {
        var _this = this;
        var newList = require("./GomlNodeList");
        newList.forEach(function (v) {
            for (var key in v.NodeTypes) {
                var keyInString = key;
                keyInString = keyInString.toUpperCase();
                var nodeType = v.NodeTypes[keyInString];
                var tag = new v.Factory(keyInString, nodeType);
                _this.gomlTagFactories.set(tag.TagName, tag);
            }
        });
    };
    GomlConfigurator.prototype.loadIntoAssociativeArray = function (targetArray, list) {
        for (var key in list) {
            var type = list[key];
            targetArray.set(key, new type());
        }
    };
    return GomlConfigurator;
})(JThreeObject);
module.exports = GomlConfigurator;

},{"../Base/Collections/AssociativeArray":2,"../Base/JThreeObject":9,"./EasingFunctionList":166,"./GomlConverterList":173,"./GomlNodeList":176}],173:[function(require,module,exports){
var converterList = {
    "angle": require('./Converter/AngleAttributeConverter'),
    "number": require('./Converter/NumberAttributeConverter'),
    "vector3": require('./Converter/Vector3AttributeConverter'),
    "rotation": require('./Converter/RotationAttributeConverter'),
    "color4": require('./Converter/Color4AttributeConverter'),
    "color3": require('./Converter/Color3AttributeConverter'),
    "boolean": require('./Converter/BooleanAttributeConverter'),
    "integer": require('./Converter/IntegerAttributeConverter'),
    "string": require('./Converter/StringAttributeConverter')
};
module.exports = converterList;

},{"./Converter/AngleAttributeConverter":153,"./Converter/BooleanAttributeConverter":155,"./Converter/Color3AttributeConverter":156,"./Converter/Color4AttributeConverter":157,"./Converter/IntegerAttributeConverter":158,"./Converter/NumberAttributeConverter":159,"./Converter/RotationAttributeConverter":160,"./Converter/StringAttributeConverter":161,"./Converter/Vector3AttributeConverter":162}],174:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var jThreeObject = require("../Base/JThreeObject");
var Exceptions = require("../Exceptions");
var JThreeLogger = require("../Base/JThreeLogger");
var GomlParser = require("./GomlParser");
var JThreeContext = require("../JThreeContext");
var ContextComponent = require("../ContextComponents");
var GomlLoader = (function (_super) {
    __extends(GomlLoader, _super);
    function GomlLoader(nodeManager, selfTag) {
        _super.call(this);
        var scriptTags = document.getElementsByTagName('script');
        this.selfTag = selfTag;
        this.nodeManager = nodeManager;
        var resourceLoader = JThreeContext.getContextComponent(ContextComponent.ResourceLoader);
        this.gomlLoadingDeferred = resourceLoader.getResourceLoadingDeffered();
        resourceLoader.promise.then(function () {
            console.log("load finished!!");
        }, undefined, function (v) {
            console.log("loading resource..." + v.completedResource / v.resourceCount * 100 + "%");
        });
    }
    GomlLoader.prototype.initForPage = function () {
        JThreeLogger.sectionLog("Goml loader", "Goml initialization was started.");
        this.attemptToLoadGomlInScriptAttr();
        var gomls = document.querySelectorAll('script[type=\'text/goml\']');
        for (var i = 0; i < gomls.length; i++) {
            this.loadScriptTag(gomls[i]);
        }
    };
    GomlLoader.prototype.attemptToLoadGomlInScriptAttr = function () {
        var _this = this;
        var url = this.selfTag.getAttribute('x-goml');
        if (!url)
            return;
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', function () {
            _this.scriptLoaded((new DOMParser()).parseFromString(xhr.response, 'text/xml').documentElement);
        });
        xhr.open('GET', url);
        xhr.responseType = 'text';
        xhr.send();
    };
    GomlLoader.prototype.loadScriptTag = function (scriptTag) {
        var _this = this;
        var srcSource = scriptTag.getAttribute('src'), xhr = new XMLHttpRequest();
        if (srcSource) {
            xhr.addEventListener('load', function () {
                _this.scriptLoaded((new DOMParser()).parseFromString(xhr.response, 'text/xml').documentElement);
            });
            xhr.open('GET', srcSource);
            xhr.responseType = 'text';
            xhr.send();
        }
        else {
            this.scriptLoaded(scriptTag.childNodes[0]);
        }
    };
    GomlLoader.prototype.loadTags = function (top) {
        top.callRecursive(function (v) { return v.beforeLoad(); });
        top.callRecursive(function (v) { return v.Load(); });
        top.callRecursive(function (v) { return v.afterLoad(); });
        top.callRecursive(function (v) { return v.attributes.applyDefaultValue(); });
    };
    GomlLoader.prototype.scriptLoaded = function (source) {
        var catched = this.nodeManager.htmlRoot = source;
        if (catched.children[0].tagName.toUpperCase() === "PARSERERROR") {
            JThreeLogger.sectionError('Goml loader', "Invalid Goml was passed. Parsing goml was aborted. Error code will be appear below");
            JThreeLogger.sectionLongLog('Goml loader', catched.innerHTML);
        }
        if (catched === undefined || catched.tagName.toUpperCase() !== 'GOML')
            throw new Exceptions.InvalidArgumentException('Root should be goml');
        this.nodeManager.gomlRoot = GomlParser.parse(source, this.nodeManager.configurator);
        this.loadTags(this.nodeManager.gomlRoot);
        JThreeLogger.sectionLog("Goml loader", "Goml loading was completed");
        this.nodeManager.ready = true;
        this.nodeManager.loadedHandler.fire(this, source);
        this.gomlLoadingDeferred.resolve(null);
    };
    return GomlLoader;
})(jThreeObject);
module.exports = GomlLoader;

},{"../Base/JThreeLogger":8,"../Base/JThreeObject":9,"../ContextComponents":12,"../Exceptions":141,"../JThreeContext":226,"./GomlParser":178}],175:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var jThreeObject = require("../Base/JThreeObject");
var AssociativeArray = require("../Base/Collections/AssociativeArray");
var JThreeEvent = require("../Base/JThreeEvent");
var JThreeLogger = require("../Base/JThreeLogger");
var GomlNodeDictionary = (function (_super) {
    __extends(GomlNodeDictionary, _super);
    function GomlNodeDictionary() {
        _super.apply(this, arguments);
        this.dictionary = new AssociativeArray();
        this.onAliasMemberChanged = new AssociativeArray();
    }
    GomlNodeDictionary.prototype.addObject = function (alias, name, obj) {
        if (!this.dictionary.has(alias)) {
            this.dictionary.set(alias, new AssociativeArray());
            this.onAliasMemberChanged.set(alias, new JThreeEvent());
        }
        this.dictionary.get(alias).set(name, obj);
        this.onAliasMemberChanged.get(alias).fire(this, obj);
    };
    GomlNodeDictionary.prototype.hasAlias = function (alias) {
        return this.dictionary.has(alias);
    };
    GomlNodeDictionary.prototype.getObject = function (alias, name) {
        if (!this.dictionary.has(alias)) {
            JThreeLogger.sectionError("GOML loader", "Unknown group name '" + alias + "' was requested.");
            return null;
        }
        else {
            return this.dictionary.get(alias).get(name);
        }
    };
    GomlNodeDictionary.prototype.getAliasMap = function (alias) {
        return this.dictionary.get(alias);
    };
    GomlNodeDictionary.prototype.onAliasObjectChanged = function (alias, handler) {
        if (this.hasAlias(alias)) {
            this.onAliasMemberChanged.get(alias).addListener(handler);
        }
        else {
            console.warn("there is no such alias");
        }
    };
    return GomlNodeDictionary;
})(jThreeObject);
module.exports = GomlNodeDictionary;

},{"../Base/Collections/AssociativeArray":2,"../Base/JThreeEvent":6,"../Base/JThreeLogger":8,"../Base/JThreeObject":9}],176:[function(require,module,exports){
var GomlNodeListElement = require("./GomlNodeListElement");
var gomlList = [new GomlNodeListElement("jthree.toplevel", require("./Factories/TagFactory"), {
        "CANVASES": require("./Nodes/TopLevel/CanvasesNode"),
        "RESOURCES": require("./Nodes/TopLevel/ResourcesNode"),
        "SCENES": require("./Nodes/TopLevel/ScenesNode"),
        "TEMPLATES": require("./Nodes/TopLevel/TemplatesNode"),
        "LOADERS": require("./Nodes/TopLevel/LoadersNode"),
        "GOML": require("./Nodes/TopLevel/GomlNode")
    }),
    new GomlNodeListElement("jthree.geometries", require("./Factories/TagFactory"), {
        "TRI": require("./Nodes/Geometries/TriangleGeometryNode"),
        "GRID": require("./Nodes/Geometries/GridGeometryNode"),
        "CUBE": require("./Nodes/Geometries/CubeGeometryNode"),
        "CIRCLE": require("./Nodes/Geometries/CircleGeometryNode"),
        "CYLINDER": require("./Nodes/Geometries/CylinderGeometryNode"),
        "QUAD": require("./Nodes/Geometries/QuadGeometryNode")
    }),
    new GomlNodeListElement("jthree.basic", require("./Factories/TagFactory"), {
        "CANVAS": require("./Nodes/Canvases/CanvasNode"),
        "VIEWPORT": require("./Nodes/Renderers/ViewPortNode"),
        "SCENE": require("./Nodes/SceneNode"),
    }),
    new GomlNodeListElement("jthree.materials", require("./Factories/TagFactory"), {
        "SOLID": require("./Nodes/Materials/SolidColorNode"),
        "PHONG": require("./Nodes/Materials/PhongNode"),
        "SPRITE": require("./Nodes/Materials/SpriteNode"),
        "DDEBUG": require("./Nodes/Materials/DefferedDebugNode"),
        "TDEBUG": require("./Nodes/Materials/TextureDebugNode")
    }),
    new GomlNodeListElement("jthree.sceneobject", require("./Factories/SceneObjectTagFactory"), {
        "CAMERA": require("./Nodes/SceneObjects/Cameras/CameraNode"),
        "OCAMERA": require("./Nodes/SceneObjects/Cameras/OrthoCameraNode"),
        "MESH": require("./Nodes/SceneObjects/MeshNode"),
        "OBJECT": require("./Nodes/SceneObjects/ObjectNode"),
        "PLIGHT": require("./Nodes/SceneObjects/Lights/PointLightNode"),
        "DLIGHT": require("./Nodes/SceneObjects/Lights/DirectionalLightNode"),
        "ALIGHT": require("./Nodes/SceneObjects/Lights/AreaLightNode"),
        "SLIGHT": require("./Nodes/SceneObjects/Lights/SpotLightNode"),
        "SCENELIGHT": require('./Nodes/SceneObjects/Lights/SceneLightNode'),
        "PMX": require("../PMX/Goml/PMXNode")
    }),
    new GomlNodeListElement("jthree.textures", require("./Factories/TagFactory"), {
        "TEXTURE": require("./Nodes/Texture/TextureNode"),
        "CUBETEXTURE": require("./Nodes/Texture/CubeTextureNode")
    }),
    new GomlNodeListElement("jthree.behaviors", require("./Factories/TagFactory"), {
        "BEHAVIORS": require("./Nodes/Behaviors/BehaviorsNode"),
    }),
    new GomlNodeListElement("jthree.behavior", require("./Factories/BehaviorTagFactory"), {
        "BEHAVIOR": require("./Nodes/Behaviors/BehaviorNode")
    }),
    new GomlNodeListElement("jthree.template", require("./Factories/ChildrenParseSkipFactory"), {
        "TEMPLATE": require("./Nodes/Templates/TemplateNode")
    }),
    new GomlNodeListElement("jthree.loader", require("./Factories/ChildrenParseSkipFactory"), {
        "LOADER": require("./Nodes/Loaders/LoaderNode")
    }),
    new GomlNodeListElement("jthree.pmx.morph", require("../PMX/Goml/Factory/PMXMorphTagFactory"), {
        "MORPH": require("../PMX/Goml/PMXMorphNode"),
    }),
    new GomlNodeListElement("jthree.pmx.bone", require("../PMX/Goml/Factory/PMXBoneTagFactory"), {
        "BONE": require("../PMX/Goml/PMXBoneNode"),
    }),
    new GomlNodeListElement("jthree.pmx.contents", require("./Factories/TagFactory"), {
        "MORPHS": require("../PMX/Goml/PMXMorphsNode"),
        "BONES": require("../PMX/Goml/PMXBonesNode"),
        "VMD": require("../VMD/Goml/VMDNode")
    })
];
module.exports = gomlList;

},{"../PMX/Goml/Factory/PMXBoneTagFactory":251,"../PMX/Goml/Factory/PMXMorphTagFactory":252,"../PMX/Goml/PMXBoneNode":253,"../PMX/Goml/PMXBonesNode":254,"../PMX/Goml/PMXMorphNode":255,"../PMX/Goml/PMXMorphsNode":256,"../PMX/Goml/PMXNode":257,"../VMD/Goml/VMDNode":273,"./Factories/BehaviorTagFactory":167,"./Factories/ChildrenParseSkipFactory":168,"./Factories/SceneObjectTagFactory":169,"./Factories/TagFactory":170,"./GomlNodeListElement":177,"./Nodes/Behaviors/BehaviorNode":181,"./Nodes/Behaviors/BehaviorsNode":182,"./Nodes/Canvases/CanvasNode":183,"./Nodes/Geometries/CircleGeometryNode":185,"./Nodes/Geometries/CubeGeometryNode":186,"./Nodes/Geometries/CylinderGeometryNode":187,"./Nodes/Geometries/GridGeometryNode":189,"./Nodes/Geometries/QuadGeometryNode":190,"./Nodes/Geometries/TriangleGeometryNode":191,"./Nodes/Loaders/LoaderNode":192,"./Nodes/Materials/DefferedDebugNode":193,"./Nodes/Materials/PhongNode":195,"./Nodes/Materials/SolidColorNode":196,"./Nodes/Materials/SpriteNode":197,"./Nodes/Materials/TextureDebugNode":198,"./Nodes/Renderers/ViewPortNode":199,"./Nodes/SceneNode":200,"./Nodes/SceneObjects/Cameras/CameraNode":201,"./Nodes/SceneObjects/Cameras/OrthoCameraNode":203,"./Nodes/SceneObjects/Lights/AreaLightNode":204,"./Nodes/SceneObjects/Lights/DirectionalLightNode":205,"./Nodes/SceneObjects/Lights/PointLightNode":207,"./Nodes/SceneObjects/Lights/SceneLightNode":208,"./Nodes/SceneObjects/Lights/SpotLightNode":209,"./Nodes/SceneObjects/MeshNode":210,"./Nodes/SceneObjects/ObjectNode":211,"./Nodes/Templates/TemplateNode":213,"./Nodes/Texture/CubeTextureNode":214,"./Nodes/Texture/TextureNode":215,"./Nodes/TopLevel/CanvasesNode":217,"./Nodes/TopLevel/GomlNode":218,"./Nodes/TopLevel/LoadersNode":219,"./Nodes/TopLevel/ResourcesNode":221,"./Nodes/TopLevel/ScenesNode":222,"./Nodes/TopLevel/TemplatesNode":223}],177:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JThreeObject = require("../Base/JThreeObject");
var GomlNodeListElement = (function (_super) {
    __extends(GomlNodeListElement, _super);
    function GomlNodeListElement(group, factory, nodeTypes) {
        _super.call(this);
        this.group = group;
        this.nodeTypes = nodeTypes;
        this.factory = factory;
    }
    Object.defineProperty(GomlNodeListElement.prototype, "Group", {
        get: function () {
            return this.group;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GomlNodeListElement.prototype, "NodeTypes", {
        get: function () {
            return this.nodeTypes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GomlNodeListElement.prototype, "Factory", {
        get: function () {
            return this.factory;
        },
        enumerable: true,
        configurable: true
    });
    return GomlNodeListElement;
})(JThreeObject);
module.exports = GomlNodeListElement;

},{"../Base/JThreeObject":9}],178:[function(require,module,exports){
var GomlParser = (function () {
    function GomlParser() {
    }
    GomlParser.parse = function (soruce, configurator) {
        return GomlParser.parseChild(null, soruce, configurator);
    };
    GomlParser.parseChild = function (parent, child, configurator) {
        var elem = child;
        var tagFactory = configurator.getGomlTagFactory(elem.tagName.toUpperCase());
        if (tagFactory) {
            var newNode = tagFactory.CreateNodeForThis(elem, parent);
            if (newNode == null) {
                console.warn(elem.tagName + " tag was parsed,but failed to create instance. Skipped.");
                return;
            }
            if (!tagFactory.NoNeedParseChildren) {
                var children = elem.childNodes;
                if (!children)
                    return;
                if (children.length == 0)
                    return;
                for (var i = 0; i < children.length; i++) {
                    if (!children[i].tagName)
                        continue;
                    var e = children[i];
                    GomlParser.parseChild(newNode, e, configurator);
                }
            }
            return newNode;
        }
        else {
            console.warn(elem.tagName + " was not parsed.'");
        }
    };
    return GomlParser;
})();
module.exports = GomlParser;

},{}],179:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AttributeDictionary = require("./AttributeDictionary");
var TreeNodeBase = require('./TreeNodeBase');
var JThreeContext = require("../JThreeContext");
var ContextComponents = require('../ContextComponents');
var AssociativeArray = require("../Base/Collections/AssociativeArray");
var GomlTreeNodeBase = (function (_super) {
    __extends(GomlTreeNodeBase, _super);
    function GomlTreeNodeBase(elem, parent) {
        _super.call(this, elem, parent);
        this.behaviors = new AssociativeArray();
        this.nodeManager = JThreeContext.getContextComponent(ContextComponents.NodeManager);
        elem.classList.add("x-j3-" + this.ID);
        elem.setAttribute('x-j3-id', this.ID);
        this.nodeManager.NodesById.set(this.ID, this);
        this.attributes = new AttributeDictionary(this, elem);
    }
    GomlTreeNodeBase.prototype.beforeLoad = function () {
    };
    GomlTreeNodeBase.prototype.Load = function () {
    };
    GomlTreeNodeBase.prototype.afterLoad = function () {
    };
    GomlTreeNodeBase.prototype.addBehavior = function (behaviors) {
        this.nodeManager.behaviorRunner.addBehavior(behaviors, this);
        if (!this.behaviors.has(behaviors.BehaviorName))
            this.behaviors.set(behaviors.BehaviorName, []);
        this.behaviors.get(behaviors.BehaviorName).push(behaviors);
    };
    GomlTreeNodeBase.prototype.getBehaviors = function (behaviorName) {
        return this.behaviors.get(behaviorName);
    };
    return GomlTreeNodeBase;
})(TreeNodeBase);
module.exports = GomlTreeNodeBase;

},{"../Base/Collections/AssociativeArray":2,"../ContextComponents":12,"../JThreeContext":226,"./AttributeDictionary":149,"./TreeNodeBase":224}],180:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JThreeObject = require('../Base/JThreeObject');
var GomlNodeDictionary = require('../Goml/GomlNodeDictionary');
var AssociativeArray = require('../Base/Collections/AssociativeArray');
var ContextComponents = require('../ContextComponents');
var BehaviorRegistry = require('./Behaviors/BehaviorRegistry');
var GomlConfigurator = require('./GomlConfigurator');
var GomlParser = require("./GomlParser");
var BehaviorRunner = require("./Behaviors/BehaviorRunner");
var JThreeEvent = require("../Base/JThreeEvent");
var JThreeContext = require("../JThreeContext");
var NodeManager = (function (_super) {
    __extends(NodeManager, _super);
    function NodeManager() {
        var _this = this;
        _super.call(this);
        this.loadedHandler = new JThreeEvent();
        this.nodeRegister = new GomlNodeDictionary();
        this.NodesById = new AssociativeArray();
        this.behaviorRegistry = new BehaviorRegistry();
        this.behaviorRunner = new BehaviorRunner();
        this.ready = false;
        this.configurator = new GomlConfigurator();
        var loopManager = JThreeContext.getContextComponent(ContextComponents.LoopManager);
        loopManager.addAction(3000, function () { return _this.update(); });
    }
    NodeManager.prototype.getContextComponentIndex = function () {
        return ContextComponents.NodeManager;
    };
    NodeManager.prototype.update = function () {
        if (!this.ready)
            return;
        this.gomlRoot.callRecursive(function (v) { return v.update(); });
        this.behaviorRunner.executeForAllBehaviors("updateBehavior");
    };
    NodeManager.prototype.getNode = function (id) {
        return this.NodesById.get(id);
    };
    NodeManager.prototype.getNodeByQuery = function (query) {
        var result = [];
        var found = this.htmlRoot.querySelectorAll(query);
        for (var index = 0; index < found.length; index++) {
            var id = found[index].getAttribute("x-j3-id");
            result.push(this.getNode(id));
        }
        return result;
    };
    NodeManager.prototype.instanciateTemplate = function (template, parentNode) {
        var templateInElems = (new DOMParser()).parseFromString(template, 'text/xml').documentElement;
        this.append(templateInElems, parentNode.Element, false);
    };
    NodeManager.prototype.loadTags = function (top) {
        top.callRecursive(function (v) { return v.beforeLoad(); });
        top.callRecursive(function (v) { return v.Load(); });
        top.callRecursive(function (v) { return v.afterLoad(); });
        top.callRecursive(function (v) { return v.attributes.applyDefaultValue(); });
    };
    NodeManager.prototype.append = function (source, parent, needLoad) {
        if (typeof needLoad === 'undefined')
            needLoad = true;
        var id = parent.getAttribute("x-j3-id");
        var parentOfGoml = this.NodesById.get(id);
        var loadedGomls = GomlParser.parseChild(parentOfGoml, source, this.configurator);
        this.loadTags(loadedGomls);
    };
    return NodeManager;
})(JThreeObject);
module.exports = NodeManager;

},{"../Base/Collections/AssociativeArray":2,"../Base/JThreeEvent":6,"../Base/JThreeObject":9,"../ContextComponents":12,"../Goml/GomlNodeDictionary":175,"../JThreeContext":226,"./Behaviors/BehaviorRegistry":151,"./Behaviors/BehaviorRunner":152,"./GomlConfigurator":172,"./GomlParser":178}],181:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GomlTreeNodeBase = require("../../GomlTreeNodeBase");
var BehaviorNode = (function (_super) {
    __extends(BehaviorNode, _super);
    function BehaviorNode(elem, parent, componentTarget) {
        var _this = this;
        _super.call(this, elem, parent);
        this.awakenCache = false;
        this.cachedOrder = 1000;
        this.cachedEnabled = undefined;
        this.updateDelegate = function () { };
        this.startCalled = false;
        this.startDelegate = function () { };
        this.awakeDelegate = function () { };
        this.onEnabledDelegate = function () { };
        this.onDisabledDelegate = function () { };
        this.componentTarget = componentTarget;
        this.componentName = elem.getAttribute("name");
        if (this.componentName) {
            var component = this.nodeManager.behaviorRegistry.getBehavior(this.componentName);
            if (component) {
                if (typeof component.order !== "undefined")
                    this.cachedOrder = component.order;
                if (typeof component.enabled !== "undefined")
                    var componentEnabled = component.enabled;
                else
                    componentEnabled = true;
                if (typeof component.awake === "function")
                    this.awakeDelegate = component.awake;
                if (typeof component.update === "function")
                    this.updateDelegate = component.update;
                if (typeof component.start === "function")
                    this.startDelegate = component.start;
                if (typeof component.onEnabled === "function")
                    this.onEnabledDelegate = component.onEnabled;
                if (typeof component.onDisabled === "function")
                    this.onDisabledDelegate = component.onDisabled;
                this.attributes.defineAttribute({
                    "enabled": {
                        converter: "boolean",
                        value: componentEnabled,
                        handler: function (v) {
                            if (v.Value === _this.enabled && typeof v.Value === "undefined") {
                                _this.cachedEnabled = true;
                                _this.onEnabled(_this.componentTarget);
                            }
                            if (v.Value === _this.enabled)
                                return;
                            if (v.Value)
                                _this.onEnabled(_this.componentTarget);
                            else
                                _this.onDisabled(_this.componentTarget);
                            _this.enabled = v.Value;
                        }
                    }
                });
                for (var attrKey in component.attributes) {
                    var attr = component.attributes[attrKey];
                    if (BehaviorNode.ignoreNode.indexOf(attrKey) !== -1 || this.attributes.isDefined(attrKey)) {
                        console.error("attribute name '" + attrKey + "' is protected attribute name. please change name");
                        continue;
                    }
                    this.defineAccessor(attrKey);
                    var attributeContainer = {};
                    attributeContainer[attrKey] = attr;
                    this.attributes.defineAttribute(attributeContainer);
                }
                componentTarget.addBehavior(this);
                this.attributes.applyDefaultValue();
            }
            else {
                console.warn("component\"" + elem.getAttribute("name") + "\" is not found.");
            }
        }
        else {
            console.warn("component name was not specified");
        }
        var attributes = this.Element.attributes;
        for (var i = 0; i < attributes.length; i++) {
            var attributeItem = attributes.item(i);
            if (!(attributeItem.name in this))
                this.defineDefaultAccessor(attributeItem);
        }
    }
    BehaviorNode.prototype.defineDefaultAccessor = function (attr) {
        Object.defineProperty(this, attr.name, {
            get: function () {
                return attr.value;
            },
            set: function (v) {
                attr.value = v;
            }
        });
    };
    BehaviorNode.prototype.defineAccessor = function (attrKey) {
        var _this = this;
        Object.defineProperty(this, attrKey, {
            get: function () {
                return _this.attributes.getValue(attrKey);
            },
            set: function (v) {
                _this.attributes.setValue(attrKey, v);
            }
        });
    };
    Object.defineProperty(BehaviorNode.prototype, "BehaviorName", {
        get: function () {
            return this.componentName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BehaviorNode.prototype, "awaken", {
        get: function () {
            return this.awakenCache;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BehaviorNode.prototype, "order", {
        get: function () {
            return this.cachedOrder;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BehaviorNode.prototype, "enabled", {
        get: function () {
            return this.cachedEnabled;
        },
        set: function (en) {
            this.cachedEnabled = en;
        },
        enumerable: true,
        configurable: true
    });
    BehaviorNode.prototype.updateBehavior = function (target) {
        if (!this.startCalled)
            this.start(target);
        this.updateDelegate(target);
    };
    BehaviorNode.prototype.start = function (target) {
        this.startDelegate(target);
        this.startCalled = true;
    };
    BehaviorNode.prototype.awake = function (target) {
        this.awakeDelegate(target);
        this.awakenCache = true;
    };
    BehaviorNode.prototype.onEnabled = function (target) {
        this.onEnabledDelegate(target);
    };
    BehaviorNode.prototype.onDisabled = function (target) {
        this.onDisabledDelegate(target);
    };
    BehaviorNode.ignoreNode = ["name", "cachedOrder", "cachedEnabled", "children", "parent", "element"];
    return BehaviorNode;
})(GomlTreeNodeBase);
module.exports = BehaviorNode;

},{"../../GomlTreeNodeBase":179}],182:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GomlTreeNodeBase = require("../../GomlTreeNodeBase");
var BehaviorsNode = (function (_super) {
    __extends(BehaviorsNode, _super);
    function BehaviorsNode(elem, parent) {
        _super.call(this, elem, parent);
        this.componentTarget = parent;
    }
    Object.defineProperty(BehaviorsNode.prototype, "ComponentTarget", {
        get: function () {
            return this.componentTarget;
        },
        enumerable: true,
        configurable: true
    });
    return BehaviorsNode;
})(GomlTreeNodeBase);
module.exports = BehaviorsNode;

},{"../../GomlTreeNodeBase":179}],183:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Canvas = require("../../../Core/Canvas");
var JThreeContext = require("../../../JThreeContext");
var ContextComponents = require("../../../ContextComponents");
var CanvasNodeBase = require('./CanvasNodeBase');
var CanvasNode = (function (_super) {
    __extends(CanvasNode, _super);
    function CanvasNode(elem, parent) {
        _super.call(this, elem, parent);
        this.resizedFunctions = [];
        this.targetFrame = document.querySelector(this.Frame);
        var defaultLoader;
        if (this.attributes.getValue("loader") !== "undefined" && this.nodeManager.nodeRegister.hasAlias("jthree.loader")) {
            var loaderNode = this.nodeManager.nodeRegister.getObject("jthree.loader", this.attributes.getValue("loader"));
            if (loaderNode)
                defaultLoader = loaderNode.loaderHTML;
        }
        if (!defaultLoader)
            defaultLoader = require('../../../static/defaultLoader.html');
        var resizeElement = document.createElement("div");
        resizeElement.style.position = "relative";
        resizeElement.style.margin = "0";
        resizeElement.style.padding = "0";
        resizeElement.style.height = "100%";
        this.targetFrame.appendChild(resizeElement);
        this.canvasElement = document.createElement("canvas");
        this.canvasElement.style.position = "absolute";
        if (this.targetFrame)
            resizeElement.appendChild(this.canvasElement);
        this.canvasElement.classList.add("x-j3-c-" + this.ID);
        this.setCanvas(new Canvas(this.canvasElement));
        JThreeContext.getContextComponent(ContextComponents.CanvasManager).addCanvas(this.Canvas);
        var loaderContainer = document.createElement('div');
        loaderContainer.style.position = 'absolute';
        loaderContainer.style.width = this.canvasElement.width + "px";
        loaderContainer.style.height = this.canvasElement.height + "px";
        loaderContainer.classList.add("x-j3-loader-container");
        loaderContainer.innerHTML = defaultLoader;
        resizeElement.appendChild(loaderContainer);
        this.attributes.applyDefaultValue();
        var progressLoaders = loaderContainer.querySelectorAll(".x-j3-loader-progress");
        JThreeContext.getContextComponent(ContextComponents.ResourceLoader).promise.then(function () {
            var loaders = resizeElement.querySelectorAll(".x-j3-loader-container");
            for (var i = 0; i < loaders.length; i++) {
                var loader = loaders.item(i);
                loader.remove();
            }
        }, function () { }, function (p) {
            for (var i = 0; i < progressLoaders.length; i++) {
                var progress = progressLoaders.item(i);
                progress.style.width = p.completedResource / p.resourceCount * 100 + "%";
            }
        });
    }
    Object.defineProperty(CanvasNode.prototype, "Frame", {
        get: function () {
            return this.element.getAttribute("frame") || "body";
        },
        enumerable: true,
        configurable: true
    });
    CanvasNode.prototype.resize = function (func) {
        if (typeof arguments[0] === "function") {
            this.resizedFunctions.indexOf(arguments[0]) === -1 && this.resizedFunctions.push(arguments[0]);
        }
        else {
            this.sizeChanged(this.DefaultWidth, this.DefaultHeight);
            this.resizedFunctions.forEach(function (f) {
                f(this);
            }.bind(this));
        }
    };
    Object.defineProperty(CanvasNode.prototype, "DefaultWidth", {
        get: function () {
            return this.targetFrame.clientWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasNode.prototype, "DefaultHeight", {
        get: function () {
            return this.targetFrame.clientHeight;
        },
        enumerable: true,
        configurable: true
    });
    CanvasNode.prototype.sizeChanged = function (width, height) {
        this.canvasElement.width = width;
        this.canvasElement.height = height;
    };
    return CanvasNode;
})(CanvasNodeBase);
module.exports = CanvasNode;

},{"../../../ContextComponents":12,"../../../Core/Canvas":17,"../../../JThreeContext":226,"../../../static/defaultLoader.html":298,"./CanvasNodeBase":184}],184:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GomlTreeNodeBase = require("../../GomlTreeNodeBase");
var CanvasNodeBase = (function (_super) {
    __extends(CanvasNodeBase, _super);
    function CanvasNodeBase(elem, parent) {
        var _this = this;
        _super.call(this, elem, parent);
        this.attributes.defineAttribute({
            "width": {
                value: 128, converter: "number", handler: function (v) { _this.sizeChanged(v.Value, _this.attributes.getValue("height")); }
            },
            "height": {
                value: 128, converter: "number", handler: function (v) { _this.sizeChanged(_this.attributes.getValue("width"), v.Value); }
            },
            "clearColor": {
                value: "#0FF", converter: "color4", handler: function (v) { _this.canvas.clearColor = v.Value; }
            },
            "loader": {
                value: undefined, converter: "string", handler: function (v) { }
            }
        });
    }
    CanvasNodeBase.prototype.beforeLoad = function () {
        this.attributes.setValue("width", this.DefaultWidth);
        this.attributes.setValue("height", this.DefaultHeight);
    };
    CanvasNodeBase.prototype.setCanvas = function (canvas) {
        this.canvas = canvas;
        this.sizeChanged(this.DefaultWidth, this.DefaultHeight);
    };
    Object.defineProperty(CanvasNodeBase.prototype, "Canvas", {
        get: function () {
            return this.canvas;
        },
        enumerable: true,
        configurable: true
    });
    CanvasNodeBase.prototype.sizeChanged = function (width, height) {
    };
    Object.defineProperty(CanvasNodeBase.prototype, "DefaultWidth", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasNodeBase.prototype, "DefaultHeight", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    return CanvasNodeBase;
})(GomlTreeNodeBase);
module.exports = CanvasNodeBase;

},{"../../GomlTreeNodeBase":179}],185:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GeometryNodeBase = require("./GeometryNodeBase");
var CircleGeometry = require("../../../Core/Geometries/CircleGeometry");
var CircleGeometryNode = (function (_super) {
    __extends(CircleGeometryNode, _super);
    function CircleGeometryNode(elem, parent) {
        var _this = this;
        _super.call(this, elem, parent);
        this.attributes.defineAttribute({
            "divide": {
                value: 30,
                converter: "integer",
                handler: function (v) { _this.gridGeometry.DiviceCount = v.Value; }
            }
        });
    }
    CircleGeometryNode.prototype.ConstructGeometry = function () {
        this.gridGeometry = new CircleGeometry(this.Name);
        return this.gridGeometry;
    };
    CircleGeometryNode.prototype.beforeLoad = function () {
        _super.prototype.beforeLoad.call(this);
    };
    return CircleGeometryNode;
})(GeometryNodeBase);
module.exports = CircleGeometryNode;

},{"../../../Core/Geometries/CircleGeometry":25,"./GeometryNodeBase":188}],186:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GeometryNodeBase = require("./GeometryNodeBase");
var CubeGeometry = require("../../../Core/Geometries/CubeGeometry");
var CubeGeometryNode = (function (_super) {
    __extends(CubeGeometryNode, _super);
    function CubeGeometryNode(elem, parent) {
        _super.call(this, elem, parent);
    }
    CubeGeometryNode.prototype.ConstructGeometry = function () {
        return this.gridGeometry = new CubeGeometry(this.Name);
    };
    CubeGeometryNode.prototype.beforeLoad = function () {
        _super.prototype.beforeLoad.call(this);
    };
    return CubeGeometryNode;
})(GeometryNodeBase);
module.exports = CubeGeometryNode;

},{"../../../Core/Geometries/CubeGeometry":26,"./GeometryNodeBase":188}],187:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GeometryNodeBase = require("./GeometryNodeBase");
var CylinderGeometry = require("../../../Core/Geometries/CylinderGeometry");
var CylinderGeometryNode = (function (_super) {
    __extends(CylinderGeometryNode, _super);
    function CylinderGeometryNode(elem, parent) {
        var _this = this;
        _super.call(this, elem, parent);
        this.attributes.defineAttribute({
            "divide": {
                value: 30,
                converter: "integer",
                handler: function (v) { _this.gridGeometry.DivideCount = v.Value; }
            }
        });
    }
    CylinderGeometryNode.prototype.ConstructGeometry = function () {
        return this.gridGeometry = new CylinderGeometry(this.Name);
    };
    CylinderGeometryNode.prototype.beforeLoad = function () {
        _super.prototype.beforeLoad.call(this);
        this.gridGeometry.DivideCount = this.attributes.getValue("divide");
    };
    return CylinderGeometryNode;
})(GeometryNodeBase);
module.exports = CylinderGeometryNode;

},{"../../../Core/Geometries/CylinderGeometry":27,"./GeometryNodeBase":188}],188:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GomlTreeNodeBase = require("../../GomlTreeNodeBase");
var JThreeID = require("../../../Base/JThreeID");
var GomlTreeGeometryNode = (function (_super) {
    __extends(GomlTreeGeometryNode, _super);
    function GomlTreeGeometryNode(elem, parent) {
        _super.call(this, elem, parent);
        this.lazy = undefined;
    }
    Object.defineProperty(GomlTreeGeometryNode.prototype, "Name", {
        get: function () {
            this.name = this.name || this.element.getAttribute('name') || JThreeID.getUniqueRandom(10);
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GomlTreeGeometryNode.prototype, "Lazy", {
        get: function () {
            this.lazy = typeof this.lazy === 'undefined' ? this.element.getAttribute('lazy').toLowerCase() == 'true' : this.lazy;
            return this.lazy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GomlTreeGeometryNode.prototype, "TargetGeometry", {
        get: function () {
            return this.targetGeometry;
        },
        enumerable: true,
        configurable: true
    });
    GomlTreeGeometryNode.prototype.ConstructGeometry = function () {
        return null;
    };
    GomlTreeGeometryNode.prototype.beforeLoad = function () {
        _super.prototype.beforeLoad.call(this);
        this.targetGeometry = this.ConstructGeometry();
        this.nodeManager.nodeRegister.addObject("jthree.geometries", this.Name, this);
    };
    return GomlTreeGeometryNode;
})(GomlTreeNodeBase);
module.exports = GomlTreeGeometryNode;

},{"../../../Base/JThreeID":7,"../../GomlTreeNodeBase":179}],189:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GeometryNodeBase = require("./GeometryNodeBase");
var GridGeometry = require("../../../Core/Geometries/GridGeometry");
var GridGeometryNode = (function (_super) {
    __extends(GridGeometryNode, _super);
    function GridGeometryNode(elem, parent) {
        _super.call(this, elem, parent);
        this.hdiv = 10;
        this.vdiv = 10;
    }
    GridGeometryNode.prototype.ConstructGeometry = function () {
        return this.gridGeometry = new GridGeometry(this.Name);
    };
    GridGeometryNode.prototype.beforeLoad = function () {
        _super.prototype.beforeLoad.call(this);
        this.gridGeometry.HolizontalDivide = this.HDiv;
        this.gridGeometry.VerticalDivide = this.VDiv;
    };
    Object.defineProperty(GridGeometryNode.prototype, "HDiv", {
        get: function () {
            this.hdiv = parseFloat(this.element.getAttribute("hdiv"));
            this.hdiv = this.hdiv || 10;
            return this.hdiv;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridGeometryNode.prototype, "VDiv", {
        get: function () {
            this.vdiv = parseFloat(this.element.getAttribute("vdiv"));
            this.vdiv = this.vdiv || 10;
            return this.vdiv;
        },
        enumerable: true,
        configurable: true
    });
    return GridGeometryNode;
})(GeometryNodeBase);
module.exports = GridGeometryNode;

},{"../../../Core/Geometries/GridGeometry":29,"./GeometryNodeBase":188}],190:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GeometryNodeBase = require("./GeometryNodeBase");
var QuadGeometry = require("../../../Core/Geometries/QuadGeometry");
var QuadGeometryNode = (function (_super) {
    __extends(QuadGeometryNode, _super);
    function QuadGeometryNode(elem, parent) {
        _super.call(this, elem, parent);
    }
    QuadGeometryNode.prototype.ConstructGeometry = function () {
        return this.TriGeometry = new QuadGeometry(this.Name);
    };
    QuadGeometryNode.prototype.beforeLoad = function () {
        _super.prototype.beforeLoad.call(this);
    };
    return QuadGeometryNode;
})(GeometryNodeBase);
module.exports = QuadGeometryNode;

},{"../../../Core/Geometries/QuadGeometry":30,"./GeometryNodeBase":188}],191:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GeometryNodeBase = require("./GeometryNodeBase");
var Vector3 = require("../../../Math/Vector3");
var TriangleGeometry = require("../../../Core/Geometries/TriangleGeometry");
var GomlTreeTriNode = (function (_super) {
    __extends(GomlTreeTriNode, _super);
    function GomlTreeTriNode(elem, parent) {
        _super.call(this, elem, parent);
    }
    GomlTreeTriNode.prototype.ConstructGeometry = function () {
        return this.TriGeometry = new TriangleGeometry(this.Name);
    };
    GomlTreeTriNode.prototype.beforeLoad = function () {
        _super.prototype.beforeLoad.call(this);
        this.TriGeometry.First = this.First;
        this.TriGeometry.Second = this.Second;
        this.TriGeometry.Third = this.Third;
    };
    Object.defineProperty(GomlTreeTriNode.prototype, "First", {
        get: function () {
            this.first = this.first || Vector3.parse(this.element.getAttribute('first') || "(-1,0,0)");
            return this.first;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GomlTreeTriNode.prototype, "Second", {
        get: function () {
            this.second = this.second || Vector3.parse(this.element.getAttribute('second') || "(0,1,0)");
            return this.second;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GomlTreeTriNode.prototype, "Third", {
        get: function () {
            this.third = this.third || Vector3.parse(this.element.getAttribute('third') || "(1,0,0)");
            return this.third;
        },
        enumerable: true,
        configurable: true
    });
    return GomlTreeTriNode;
})(GeometryNodeBase);
module.exports = GomlTreeTriNode;

},{"../../../Core/Geometries/TriangleGeometry":31,"../../../Math/Vector3":235,"./GeometryNodeBase":188}],192:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GomlTreeNodeBase = require("../../GomlTreeNodeBase");
var LoaderNode = (function (_super) {
    __extends(LoaderNode, _super);
    function LoaderNode(elem, parent) {
        _super.call(this, elem, parent);
        this.loaderHTML = elem.innerHTML;
        this.attributes.defineAttribute({
            "name": {
                value: undefined,
                handler: function (v) { },
                converter: "string"
            }
        });
        this.nodeManager.nodeRegister.addObject("jthree.loader", this.attributes.getValue("name"), this);
    }
    return LoaderNode;
})(GomlTreeNodeBase);
module.exports = LoaderNode;

},{"../../GomlTreeNodeBase":179}],193:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DebugSprite = require("../../../Core/Materials/Forward/SpriteMaterial");
var MaterialNodeBase = require('./MaterialNodeBase');
var JThreeContext = require("../../../JThreeContext");
var ContextComponents = require("../../../ContextComponents");
var DefferedDebugNode = (function (_super) {
    __extends(DefferedDebugNode, _super);
    function DefferedDebugNode(elem, parent) {
        var _this = this;
        _super.call(this, elem, parent);
        this.attributes.defineAttribute({
            "target": {
                value: "rb1", converter: "string"
            },
            "viewport": {
                value: "viewport", converter: "string", handler: function (v) {
                    var viewportTargets = _this.nodeManager.getNodeByQuery(v.Value);
                    if (viewportTargets.length > 0) {
                        var viewport = viewportTargets[0];
                        JThreeContext.getContextComponent(ContextComponents.ResourceManager).
                            getTextureHandler(viewport.TargetViewport.ID + "." + _this.attributes.getValue("target"), function (v) {
                            _this.material.texture = v;
                        });
                    }
                }
            },
            "R": {
                value: "0", converter: "number", handler: function (v) { _this.material.ctR = v.Value; }
            },
            "G": {
                value: "1", converter: "number", handler: function (v) { _this.material.ctG = v.Value; }
            },
            "B": {
                value: "2", converter: "number", handler: function (v) { _this.material.ctB = v.Value; }
            },
            "A": {
                value: "3", converter: "number", handler: function (v) { _this.material.ctA = v.Value; }
            }
        });
    }
    DefferedDebugNode.prototype.ConstructMaterial = function () {
        this.material = new DebugSprite();
        return this.material;
    };
    DefferedDebugNode.prototype.beforeLoad = function () {
        _super.prototype.beforeLoad.call(this);
    };
    return DefferedDebugNode;
})(MaterialNodeBase);
module.exports = DefferedDebugNode;

},{"../../../ContextComponents":12,"../../../Core/Materials/Forward/SpriteMaterial":53,"../../../JThreeContext":226,"./MaterialNodeBase":194}],194:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GomlTreeNodeBase = require("../../GomlTreeNodeBase");
var JThreeID = require("../../../Base/JThreeID");
var MaterialNodeBase = (function (_super) {
    __extends(MaterialNodeBase, _super);
    function MaterialNodeBase(elem, parent) {
        _super.call(this, elem, parent);
        this.attributes.defineAttribute({});
    }
    MaterialNodeBase.prototype.ConstructMaterial = function () {
        return null;
    };
    MaterialNodeBase.prototype.beforeLoad = function () {
        this.targetMaterial = this.ConstructMaterial();
        this.nodeManager.nodeRegister.addObject("jthree.materials", this.Name, this);
    };
    Object.defineProperty(MaterialNodeBase.prototype, "Name", {
        get: function () {
            this.name = this.name || this.element.getAttribute('name') || JThreeID.getUniqueRandom(10);
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    return MaterialNodeBase;
})(GomlTreeNodeBase);
module.exports = MaterialNodeBase;

},{"../../../Base/JThreeID":7,"../../GomlTreeNodeBase":179}],195:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Phong = require("../../../Core/Materials/Forward/PhongMaterial");
var MaterialNodeBase = require('./MaterialNodeBase');
var PhongNode = (function (_super) {
    __extends(PhongNode, _super);
    function PhongNode(elem, parent) {
        var _this = this;
        _super.call(this, elem, parent);
        this.attributes.defineAttribute({
            "diffuse": {
                value: "#f0C", converter: "color4", handler: function (v) { _this.material.diffuse = v.Value; }
            },
            "ambient": {
                value: "#222", converter: "color4", handler: function (v) { _this.material.ambient = v.Value; }
            },
            "specular": {
                value: "#CCC", converter: "color3", handler: function (v) { _this.material.specular = v.Value; }
            },
            "specularpower": {
                value: 10, converter: "number", handler: function (v) { _this.material.specularCoefficient = v.Value; }
            },
            "texture": {
                value: null, converter: "string", handler: function (v) {
                    if (v.Value)
                        _this.material.texture = _this.nodeManager.nodeRegister.getObject("jthree.resource.texture2d", v.Value).TargetTexture;
                }
            }
        });
    }
    PhongNode.prototype.ConstructMaterial = function () {
        this.material = new Phong();
        return this.material;
    };
    PhongNode.prototype.beforeLoad = function () {
        _super.prototype.beforeLoad.call(this);
    };
    PhongNode.prototype.afterLoad = function () {
        _super.prototype.afterLoad.call(this);
        this.attributes.applyDefaultValue();
    };
    return PhongNode;
})(MaterialNodeBase);
module.exports = PhongNode;

},{"../../../Core/Materials/Forward/PhongMaterial":51,"./MaterialNodeBase":194}],196:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SolidColor = require("../../../Core/Materials/Forward/SolidColorMaterial");
var MaterialNodeBase = require('./MaterialNodeBase');
var SolidColorNode = (function (_super) {
    __extends(SolidColorNode, _super);
    function SolidColorNode(elem, parent) {
        var _this = this;
        _super.call(this, elem, parent);
        this.attributes.defineAttribute({
            "color": {
                value: "#0FC", converter: "color4", handler: function (v) { _this.material.Color = v.Value; }
            }
        });
    }
    SolidColorNode.prototype.ConstructMaterial = function () {
        this.material = new SolidColor();
        return this.material;
    };
    SolidColorNode.prototype.beforeLoad = function () {
        _super.prototype.beforeLoad.call(this);
    };
    return SolidColorNode;
})(MaterialNodeBase);
module.exports = SolidColorNode;

},{"../../../Core/Materials/Forward/SolidColorMaterial":52,"./MaterialNodeBase":194}],197:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Sprite = require("../../../Core/Materials/Forward/SpriteMaterial");
var MaterialNodeBase = require('./MaterialNodeBase');
var JThreeContext = require("../../../JThreeContext");
var ContextComponents = require("../../../ContextComponents");
var SpriteNode = (function (_super) {
    __extends(SpriteNode, _super);
    function SpriteNode(elem, parent) {
        var _this = this;
        _super.call(this, elem, parent);
        this.attributes.defineAttribute({
            "texture": {
                value: "tex", converter: "string", handler: function (v) {
                    JThreeContext.getContextComponent(ContextComponents.ResourceManager).getTextureHandler(v.Value, function (v) {
                        _this.material.texture = v;
                    });
                }
            }
        });
    }
    SpriteNode.prototype.ConstructMaterial = function () {
        this.material = new Sprite();
        return this.material;
    };
    SpriteNode.prototype.beforeLoad = function () {
        _super.prototype.beforeLoad.call(this);
    };
    return SpriteNode;
})(MaterialNodeBase);
module.exports = SpriteNode;

},{"../../../ContextComponents":12,"../../../Core/Materials/Forward/SpriteMaterial":53,"../../../JThreeContext":226,"./MaterialNodeBase":194}],198:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DebugSprite = require("../../../Core/Materials/Forward/SpriteMaterial");
var MaterialNodeBase = require('./MaterialNodeBase');
var ContextComponents = require("../../../ContextComponents");
var JThreeContext = require("../../../JThreeContext");
var TextureDebugNode = (function (_super) {
    __extends(TextureDebugNode, _super);
    function TextureDebugNode(elem, parent) {
        var _this = this;
        _super.call(this, elem, parent);
        this.attributes.defineAttribute({
            "target": {
                value: "rb1", converter: "string",
                handler: function (v) {
                    JThreeContext.getContextComponent(ContextComponents.ResourceManager)
                        .getTextureHandler(_this.attributes.getValue("target"), function (v) {
                        _this.material.texture = v;
                    });
                }
            },
            "R": {
                value: "0", converter: "number", handler: function (v) { _this.material.ctR = v.Value; }
            },
            "G": {
                value: "1", converter: "number", handler: function (v) { _this.material.ctG = v.Value; }
            },
            "B": {
                value: "2", converter: "number", handler: function (v) { _this.material.ctB = v.Value; }
            },
            "A": {
                value: "3", converter: "number", handler: function (v) { _this.material.ctA = v.Value; }
            },
        });
    }
    TextureDebugNode.prototype.ConstructMaterial = function () {
        this.material = new DebugSprite();
        return this.material;
    };
    TextureDebugNode.prototype.beforeLoad = function () {
        _super.prototype.beforeLoad.call(this);
    };
    return TextureDebugNode;
})(MaterialNodeBase);
module.exports = TextureDebugNode;

},{"../../../ContextComponents":12,"../../../Core/Materials/Forward/SpriteMaterial":53,"../../../JThreeContext":226,"./MaterialNodeBase":194}],199:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GomlTreeNodeBase = require("../../GomlTreeNodeBase");
var Rectangle = require("../../../Math/Rectangle");
var SkyboxStage = require("../../../Core/Renderers/RenderStages/SkyBoxStage");
var RendererFactory = require("../../../Core/Renderers/RendererFactory");
var ViewPortNode = (function (_super) {
    __extends(ViewPortNode, _super);
    function ViewPortNode(elem, parent) {
        _super.call(this, elem, parent);
    }
    Object.defineProperty(ViewPortNode.prototype, "TargetViewport", {
        get: function () {
            return this.targetRenderer;
        },
        enumerable: true,
        configurable: true
    });
    ViewPortNode.prototype.afterLoad = function () {
        var _this = this;
        var rdr = this.parentCanvas = this.parent;
        var defaultRect = rdr.Canvas.region;
        this.targetRenderer = RendererFactory.generateRenderer(rdr.Canvas, defaultRect, this.attributes.getValue("config"));
        var cameraNode = this.resolveCamera();
        this.targetRenderer.Camera = cameraNode.TargetCamera;
        var scene = cameraNode.ContainedSceneNode.targetScene;
        scene.addRenderer(this.targetRenderer);
        if ("resize" in rdr) {
            var castedRdr = rdr;
            castedRdr.resize(this.updateViewportArea.bind(this));
        }
        this.attributes.defineAttribute({
            "width": {
                value: defaultRect.Width,
                converter: "number", handler: function (v) {
                    _this.width = v.Value;
                    _this.updateViewportArea();
                }
            },
            "height": {
                value: defaultRect.Height,
                converter: "number", handler: function (v) {
                    _this.height = v.Value;
                    _this.updateViewportArea();
                }
            },
            "left": {
                value: defaultRect.Left,
                converter: "number", handler: function (v) {
                    _this.left = v.Value;
                    _this.updateViewportArea();
                }
            },
            "top": {
                value: defaultRect.Top,
                converter: "number", handler: function (v) {
                    _this.top = v.Value;
                    _this.updateViewportArea();
                }
            },
            "backgroundType": {
                value: "color",
                converter: "string",
                handler: function (v) {
                    if (v.Value !== "skybox" && _this.skyBoxStageChain) {
                        _this.targetRenderer.renderPath.deleteStage(_this.skyBoxStageChain);
                        _this.skyBoxStageChain = null;
                    }
                }
            },
            "skybox": {
                value: null,
                converter: "string",
                handler: function (v) {
                    if (_this.attributes.getValue("backgroundType") === "skybox") {
                        var cubeTexture = _this.nodeManager.nodeRegister.getObject("jthree.resource.cubetexture", v.Value);
                        if (cubeTexture) {
                            if (!_this.skyBoxStageChain) {
                                _this.skyBoxStageChain = {
                                    buffers: {
                                        OUT: "default"
                                    },
                                    stage: new SkyboxStage(_this.targetRenderer)
                                };
                                _this.targetRenderer.renderPath.insertWithIndex(0, _this.skyBoxStageChain);
                            }
                            _this.skyBoxStageChain.stage.skyBoxTexture = cubeTexture.TargetTexture;
                        }
                    }
                }
            },
            "config": {
                converter: "string",
                value: "default"
            },
            "name": {
                converter: "string",
                value: undefined,
                handler: function (v) {
                    if (v.Value)
                        _this.targetRenderer.name = v.Value;
                }
            }
        });
        this.attributes.applyDefaultValue();
    };
    ViewPortNode.prototype.updateViewportArea = function () {
        if ("targetFrame" in this.parentCanvas) {
            var castedRdr = this.parentCanvas;
            var frame = castedRdr.targetFrame;
            castedRdr.resize(this.updateViewportArea.bind(this));
            var W = frame.clientWidth;
            var H = frame.clientHeight;
            var left = this.left > 1 ? this.left : W * this.left;
            var top = this.top > 1 ? this.top : H * this.top;
            var width = this.width > 1 ? this.width : W * this.width;
            var height = this.height > 1 ? this.height : H * this.height;
            this.targetRenderer.region = new Rectangle(left, top, width, height);
            if ("Aspect" in this.targetRenderer.Camera) {
                var castedCam = this.targetRenderer.Camera;
                castedCam.Aspect = width / height;
            }
        }
        else {
            this.targetRenderer.region = new Rectangle(this.left, this.top, this.width, this.height);
            if ("Aspect" in this.targetRenderer.Camera) {
                var castedCam = this.targetRenderer.Camera;
                castedCam.Aspect = this.width / this.height;
            }
        }
    };
    ViewPortNode.prototype.resolveCamera = function () {
        var camTags = this.nodeManager.nodeRegister.getAliasMap("jthree.camera");
        if (!camTags.has(this.Cam)) {
            console.error("can not find camera");
            if (camTags.size == 0) {
                console.error("There is no scene.");
            }
            else {
            }
            return null;
        }
        var targetCam = camTags.get(this.Cam);
        if (targetCam.ContainedSceneNode != null) {
            return targetCam;
        }
        else {
            console.error("cant retrieve scene!");
        }
    };
    Object.defineProperty(ViewPortNode.prototype, "Cam", {
        get: function () {
            this.cam = this.cam || this.element.getAttribute('cam');
            return this.cam;
        },
        enumerable: true,
        configurable: true
    });
    return ViewPortNode;
})(GomlTreeNodeBase);
module.exports = ViewPortNode;

},{"../../../Core/Renderers/RenderStages/SkyBoxStage":64,"../../../Core/Renderers/RendererFactory":68,"../../../Math/Rectangle":233,"../../GomlTreeNodeBase":179}],200:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GomlTreeNodeBase = require("../GomlTreeNodeBase");
var Scene = require("../../Core/Scene");
var JThreeContext = require('../../JThreeContext');
var ContextComponents = require("../../ContextComponents");
var SceneNode = (function (_super) {
    __extends(SceneNode, _super);
    function SceneNode(elem, parent) {
        _super.call(this, elem, parent);
    }
    SceneNode.prototype.beforeLoad = function () {
        var _this = this;
        this.attributes.defineAttribute({
            "ambient": {
                value: "#111",
                converter: "color3",
                handler: function (v) {
                    _this.targetScene.sceneAmbient = v.Value;
                }
            },
            "name": {
                value: "",
                converter: "string"
            }
        });
        var sceneName = this.attributes.getValue("name");
        if (sceneName == "")
            sceneName = null;
        this.targetScene = new Scene(sceneName);
        JThreeContext.getContextComponent(ContextComponents.SceneManager).addScene(this.targetScene);
    };
    return SceneNode;
})(GomlTreeNodeBase);
module.exports = SceneNode;

},{"../../ContextComponents":12,"../../Core/Scene":106,"../../JThreeContext":226,"../GomlTreeNodeBase":179}],201:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PerspectiveCamera = require("../../../../Core/Camera/PerspectiveCamera");
var GomlTreeCameraNodeBase = require("./CameraNodeBase");
var GomlTreeCameraNode = (function (_super) {
    __extends(GomlTreeCameraNode, _super);
    function GomlTreeCameraNode(elem, parent, parentSceneNode, parentObject) {
        var _this = this;
        _super.call(this, elem, parent, parentSceneNode, parentObject);
        this.attributes.defineAttribute({
            "fovy": {
                value: Math.PI / 4,
                converter: "angle",
                handler: function (v) { _this.targetPerspective.Fovy = v.Value; }
            },
            "aspect": {
                value: 0,
                converter: "number",
                handler: function (v) { _this.targetPerspective.Aspect = v.Value; }
            },
            "near": {
                value: 0.1,
                converter: "number",
                handler: function (v) { _this.targetPerspective.Near = v.Value; }
            },
            "far": {
                value: 10,
                converter: "number",
                handler: function (v) { _this.targetPerspective.Far = v.Value; }
            }
        });
    }
    GomlTreeCameraNode.prototype.ConstructCamera = function () {
        var camera = new PerspectiveCamera();
        this.targetPerspective = camera;
        camera.Fovy = this.Fovy;
        camera.Aspect = this.Aspect;
        camera.Near = this.Near;
        camera.Far = this.Far;
        return camera;
    };
    Object.defineProperty(GomlTreeCameraNode.prototype, "Fovy", {
        get: function () {
            return this.attributes.getValue("fovy");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GomlTreeCameraNode.prototype, "Aspect", {
        get: function () {
            return this.attributes.getValue("aspect");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GomlTreeCameraNode.prototype, "Near", {
        get: function () {
            return this.attributes.getValue("near");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GomlTreeCameraNode.prototype, "Far", {
        get: function () {
            return this.attributes.getValue("far");
        },
        enumerable: true,
        configurable: true
    });
    return GomlTreeCameraNode;
})(GomlTreeCameraNodeBase);
module.exports = GomlTreeCameraNode;

},{"../../../../Core/Camera/PerspectiveCamera":15,"./CameraNodeBase":202}],202:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JThreeID = require("../../../../Base/JThreeID");
var SceneObjectNodeBase = require("../SceneObjectNodeBase");
var GomlTreeCameraNodeBase = (function (_super) {
    __extends(GomlTreeCameraNodeBase, _super);
    function GomlTreeCameraNodeBase(elem, parent, parentSceneNode, parentObject) {
        _super.call(this, elem, parent, parentSceneNode, parentObject);
        this.nodeManager.nodeRegister.addObject("jthree.camera", this.Name, this);
    }
    Object.defineProperty(GomlTreeCameraNodeBase.prototype, "TargetCamera", {
        get: function () {
            return this.targetCamera;
        },
        enumerable: true,
        configurable: true
    });
    GomlTreeCameraNodeBase.prototype.ConstructCamera = function () {
        return null;
    };
    GomlTreeCameraNodeBase.prototype.ConstructTarget = function () {
        this.targetCamera = this.ConstructCamera();
        return this.targetCamera;
    };
    GomlTreeCameraNodeBase.prototype.beforeLoad = function () {
        _super.prototype.beforeLoad.call(this);
    };
    GomlTreeCameraNodeBase.prototype.Load = function () {
        _super.prototype.Load.call(this);
    };
    Object.defineProperty(GomlTreeCameraNodeBase.prototype, "Name", {
        get: function () {
            this.name = this.name || this.element.getAttribute('name') || JThreeID.getUniqueRandom(10);
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    return GomlTreeCameraNodeBase;
})(SceneObjectNodeBase);
module.exports = GomlTreeCameraNodeBase;

},{"../../../../Base/JThreeID":7,"../SceneObjectNodeBase":212}],203:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OrthoCamera = require("../../../../Core/Camera/OrthoCamera");
var GomlTreeCameraNodeBase = require("./CameraNodeBase");
var OrthoCameraNode = (function (_super) {
    __extends(OrthoCameraNode, _super);
    function OrthoCameraNode(elem, parent, parentSceneNode, parentObject) {
        var _this = this;
        _super.call(this, elem, parent, parentSceneNode, parentObject);
        this.attributes.defineAttribute({
            "left": {
                value: -100,
                converter: "number",
                handler: function (v) {
                    _this.targetOrtho.Left = v.Value;
                }
            },
            "right": {
                value: 100,
                converter: "number",
                handler: function (v) {
                    _this.targetOrtho.Right = v.Value;
                }
            },
            "bottom": {
                value: -100,
                converter: "number",
                handler: function (v) {
                    _this.targetOrtho.Bottom = v.Value;
                }
            },
            "top": {
                value: 100,
                converter: "number",
                handler: function (v) {
                    _this.targetOrtho.Top = v.Value;
                }
            },
            "near": {
                value: -100,
                converter: "number",
                handler: function (v) {
                    _this.targetOrtho.Near = v.Value;
                }
            },
            "far": {
                value: -100,
                converter: "number",
                handler: function (v) {
                    _this.targetOrtho.Far = v.Value;
                }
            }
        });
    }
    OrthoCameraNode.prototype.ConstructCamera = function () {
        var camera = new OrthoCamera();
        this.targetOrtho = camera;
        camera.Left = this.attributes.getValue("left");
        camera.Bottom = this.attributes.getValue("right");
        camera.Top = this.attributes.getValue("top");
        camera.Right = this.attributes.getValue("right");
        camera.Far = this.attributes.getValue('far');
        camera.Near = this.attributes.getValue('near');
        return camera;
    };
    return OrthoCameraNode;
})(GomlTreeCameraNodeBase);
module.exports = OrthoCameraNode;

},{"../../../../Core/Camera/OrthoCamera":14,"./CameraNodeBase":202}],204:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LightNodeBase = require('./LightNodeBase');
var AreaLight = require("../../../../Core/Light/Impl/AreaLight");
var AreaLightNode = (function (_super) {
    __extends(AreaLightNode, _super);
    function AreaLightNode(elem, parent, parentSceneNode, parentObject) {
        var _this = this;
        _super.call(this, elem, parent, parentSceneNode, parentObject);
        this.attributes.defineAttribute({
            "intensity": {
                value: 1, converter: "number", handler: function (v) { _this.targetLight.intensity = v.Value; }
            },
            "right": {
                value: 1,
                converter: "number",
                handler: function (v) {
                    _this.targetLight.rightLength = v.Value;
                }
            },
            "top": {
                value: 1,
                converter: "number",
                handler: function (v) {
                    _this.targetLight.topLength = v.Value;
                }
            },
            "far": {
                value: 1,
                converter: "number",
                handler: function (v) {
                    _this.targetLight.farLength = v.Value;
                }
            }
        });
    }
    AreaLightNode.prototype.constructLight = function () {
        this.targetLight = new AreaLight(this.ContainedSceneNode.targetScene);
        return this.targetLight;
    };
    return AreaLightNode;
})(LightNodeBase);
module.exports = AreaLightNode;

},{"../../../../Core/Light/Impl/AreaLight":33,"./LightNodeBase":206}],205:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LightNodeBase = require('./LightNodeBase');
var DirectionalLight = require('../../../../Core/Light/Impl/DirectionalLight');
var DirectionalLightNode = (function (_super) {
    __extends(DirectionalLightNode, _super);
    function DirectionalLightNode(elem, parent, parentSceneNode, parentObject) {
        var _this = this;
        _super.call(this, elem, parent, parentSceneNode, parentObject);
        this.attributes.defineAttribute({
            "intensity": {
                value: 1, converter: "number", handler: function (v) { _this.targetLight.intensity = v.Value; }
            },
            "shadow": {
                value: false,
                converter: "boolean",
                handler: function (v) {
                    _this.targetLight.isShadowDroppable = v.Value;
                }
            },
            "bias": {
                value: 0.01,
                converter: "number",
                handler: function (v) {
                    _this.targetLight.bias = v.Value;
                }
            }
        });
    }
    DirectionalLightNode.prototype.afterLoad = function () {
        this.attributes.applyDefaultValue();
    };
    DirectionalLightNode.prototype.constructLight = function () {
        this.targetLight = new DirectionalLight(this.ContainedSceneNode.targetScene);
        return this.targetLight;
    };
    return DirectionalLightNode;
})(LightNodeBase);
module.exports = DirectionalLightNode;

},{"../../../../Core/Light/Impl/DirectionalLight":34,"./LightNodeBase":206}],206:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SceneObjectNodeBase = require("../SceneObjectNodeBase");
var LightNodeBase = (function (_super) {
    __extends(LightNodeBase, _super);
    function LightNodeBase(elem, parent, parentSceneNode, parentObject) {
        var _this = this;
        _super.call(this, elem, parent, parentSceneNode, parentObject);
        this.attributes.defineAttribute({
            "color": {
                value: "white", converter: "color4", handler: function (v) {
                    _this.targetLightBase.Color = v.Value;
                }
            }
        });
    }
    LightNodeBase.prototype.constructLight = function () {
        return null;
    };
    LightNodeBase.prototype.ConstructTarget = function () {
        this.targetLightBase = this.constructLight();
        return this.targetLightBase;
    };
    return LightNodeBase;
})(SceneObjectNodeBase);
module.exports = LightNodeBase;

},{"../SceneObjectNodeBase":212}],207:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LightNodeBase = require('./LightNodeBase');
var PointLight = require('../../../../Core/Light/Impl/PointLight');
var PointLightNode = (function (_super) {
    __extends(PointLightNode, _super);
    function PointLightNode(elem, parent, parentSceneNode, parentObject) {
        var _this = this;
        _super.call(this, elem, parent, parentSceneNode, parentObject);
        this.attributes.defineAttribute({
            "intensity": {
                value: 1, converter: "number", handler: function (v) { _this.targetLight.intensity = v.Value; }
            },
            "decay": {
                value: 1, converter: "number", handler: function (v) { _this.targetLight.decay = v.Value; }
            },
            "distance": {
                value: 1, converter: "number", handler: function (v) { _this.targetLight.distance = v.Value; }
            }
        });
    }
    PointLightNode.prototype.constructLight = function () {
        this.targetLight = new PointLight(this.ContainedSceneNode.targetScene);
        return this.targetLight;
    };
    return PointLightNode;
})(LightNodeBase);
module.exports = PointLightNode;

},{"../../../../Core/Light/Impl/PointLight":35,"./LightNodeBase":206}],208:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LightNodeBase = require('./LightNodeBase');
var SceneLight = require('../../../../Core/Light/Impl/SceneLight');
var SceneLightNode = (function (_super) {
    __extends(SceneLightNode, _super);
    function SceneLightNode(elem, parent, parentSceneNode, parentObject) {
        var _this = this;
        _super.call(this, elem, parent, parentSceneNode, parentObject);
        this.attributes.defineAttribute({
            "intensity": {
                value: 1, converter: "number", handler: function (v) { _this.targetLight.intensity = v.Value; }
            }
        });
    }
    SceneLightNode.prototype.afterLoad = function () {
        this.attributes.applyDefaultValue();
    };
    SceneLightNode.prototype.constructLight = function () {
        this.targetLight = new SceneLight(this.ContainedSceneNode.targetScene);
        return this.targetLight;
    };
    return SceneLightNode;
})(LightNodeBase);
module.exports = SceneLightNode;

},{"../../../../Core/Light/Impl/SceneLight":36,"./LightNodeBase":206}],209:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LightNodeBase = require('./LightNodeBase');
var SpotLight = require('../../../../Core/Light/Impl/SpotLight');
var SpotLightNode = (function (_super) {
    __extends(SpotLightNode, _super);
    function SpotLightNode(elem, parent, parentSceneNode, parentObject) {
        var _this = this;
        _super.call(this, elem, parent, parentSceneNode, parentObject);
        this.attributes.defineAttribute({
            "intensity": {
                value: 1, converter: "number", handler: function (v) { _this.targetLight.intensity = v.Value; }
            },
            "decay": {
                value: 1, converter: "number", handler: function (v) { _this.targetLight.decay = v.Value; }
            },
            "inner": {
                value: "10d", converter: "angle", handler: function (v) {
                    _this.targetLight.inner = v.Value;
                }
            },
            "outer": {
                value: "25d",
                converter: "angle",
                handler: function (v) {
                    _this.targetLight.outer = v.Value;
                }
            }
        });
    }
    SpotLightNode.prototype.constructLight = function () {
        this.targetLight = new SpotLight(this.ContainedSceneNode.targetScene);
        return this.targetLight;
    };
    return SpotLightNode;
})(LightNodeBase);
module.exports = SpotLightNode;

},{"../../../../Core/Light/Impl/SpotLight":37,"./LightNodeBase":206}],210:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SceneObjectNodeBase = require("./SceneObjectNodeBase");
var BasicMeshObject = require("../../../Shapes/BasicMeshObject");
var SolidColor = require("../../../Core/Materials/Forward/SolidColorMaterial");
var GomlTreeMeshNode = (function (_super) {
    __extends(GomlTreeMeshNode, _super);
    function GomlTreeMeshNode(elem, parent, parentSceneNode, parentObject) {
        _super.call(this, elem, parent, parentSceneNode, parentObject);
    }
    GomlTreeMeshNode.prototype.ConstructTarget = function () {
        var geo = this.nodeManager.nodeRegister.getObject("jthree.geometries", this.Geo);
        var mat = this.nodeManager.nodeRegister.getObject("jthree.materials", this.Mat);
        this.targetMesh = new BasicMeshObject(geo.TargetGeometry, mat ? mat.targetMaterial : new SolidColor());
        return this.targetMesh;
    };
    GomlTreeMeshNode.prototype.beforeLoad = function () {
        _super.prototype.beforeLoad.call(this);
    };
    GomlTreeMeshNode.prototype.Load = function () {
        _super.prototype.Load.call(this);
    };
    Object.defineProperty(GomlTreeMeshNode.prototype, "Geo", {
        get: function () {
            this.geo = this.geo || this.element.getAttribute("geo");
            return this.geo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GomlTreeMeshNode.prototype, "Mat", {
        get: function () {
            this.mat = this.mat || this.element.getAttribute("mat");
            return this.mat;
        },
        enumerable: true,
        configurable: true
    });
    return GomlTreeMeshNode;
})(SceneObjectNodeBase);
module.exports = GomlTreeMeshNode;

},{"../../../Core/Materials/Forward/SolidColorMaterial":52,"../../../Shapes/BasicMeshObject":271,"./SceneObjectNodeBase":212}],211:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SceneObjectNodeBase = require("./SceneObjectNodeBase");
var SceneObject = require("../../../Core/SceneObject");
var ObjectNode = (function (_super) {
    __extends(ObjectNode, _super);
    function ObjectNode(elem, parent, parentSceneNode, parentObject) {
        _super.call(this, elem, parent, parentSceneNode, parentObject);
    }
    ObjectNode.prototype.ConstructTarget = function () {
        this.targetObject = new SceneObject();
        return this.targetObject;
    };
    ObjectNode.prototype.beforeLoad = function () {
        _super.prototype.beforeLoad.call(this);
    };
    ObjectNode.prototype.Load = function () {
        _super.prototype.Load.call(this);
    };
    return ObjectNode;
})(SceneObjectNodeBase);
module.exports = ObjectNode;

},{"../../../Core/SceneObject":108,"./SceneObjectNodeBase":212}],212:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GomlTreeNodeBase = require("../../GomlTreeNodeBase");
var Vector3 = require("../../../Math/Vector3");
var Quaternion = require("../../../Math/Quaternion");
var AttributeParser = require("../../AttributeParser");
var SceneObjectNodeBase = (function (_super) {
    __extends(SceneObjectNodeBase, _super);
    function SceneObjectNodeBase(elem, parent, parentSceneNode, parentObject) {
        var _this = this;
        _super.call(this, elem, parent);
        this.containedSceneNode = null;
        this.parentSceneObjectNode = null;
        this.containedSceneNode = parentSceneNode;
        this.parentSceneObjectNode = parentObject;
        this.attributes.defineAttribute({
            "position": {
                value: new Vector3(0, 0, 0),
                converter: "vector3", handler: function (v) {
                    if (_this.targetSceneObject != null)
                        _this.targetSceneObject.Transformer.Position = v.Value;
                }
            },
            "scale": {
                value: new Vector3(1, 1, 1),
                converter: "vector3", handler: function (v) { if (_this.targetSceneObject != null)
                    _this.targetSceneObject.Transformer.Scale = v.Value; }
            },
            "rotation": {
                value: Quaternion.Identity,
                converter: "rotation",
                handler: function (v) {
                    if (_this.targetSceneObject != null)
                        _this.targetSceneObject.Transformer.Rotation = v.Value;
                }
            },
            "name": {
                value: undefined,
                converter: "string",
                handler: function (v) {
                    if (_this.targetSceneObject && v.Value)
                        _this.targetSceneObject.name = v.Value;
                }
            }
        });
    }
    SceneObjectNodeBase.prototype.ConstructTarget = function () {
        return null;
    };
    SceneObjectNodeBase.prototype.targetUpdated = function () {
    };
    SceneObjectNodeBase.prototype.beforeLoad = function () {
        _super.prototype.beforeLoad.call(this);
        this.targetSceneObject = this.ConstructTarget();
        if (this.targetSceneObject == null)
            return;
        if (!this.targetSceneObject.name || this.targetSceneObject.ID == this.targetSceneObject.name)
            this.targetSceneObject.name = this.targetSceneObject.getTypeName() + "(" + this.targetSceneObject.ID + ")";
        this.applyHierarchy();
        this.attributes.applyDefaultValue();
    };
    SceneObjectNodeBase.prototype.applyHierarchy = function () {
        if (!this.targetSceneObject) {
            console.error("SceneObject node must override ConstructTarget and return the object extending SceneObjnect");
        }
        else {
            if (this.parentSceneObjectNode == null)
                this.containedSceneNode.targetScene.addObject(this.targetSceneObject);
            else {
                if (this.parentSceneObjectNode.targetSceneObject == null)
                    return;
                this.parentSceneObjectNode.targetSceneObject.addChild(this.targetSceneObject);
            }
        }
    };
    SceneObjectNodeBase.prototype.parentChanged = function () {
        this.applyHierarchy();
    };
    Object.defineProperty(SceneObjectNodeBase.prototype, "TargetObject", {
        get: function () {
            return this.targetSceneObject;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneObjectNodeBase.prototype, "ContainedSceneNode", {
        get: function () {
            return this.containedSceneNode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneObjectNodeBase.prototype, "ParentSceneObjectNode", {
        get: function () {
            return this.parentSceneObjectNode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneObjectNodeBase.prototype, "Position", {
        get: function () {
            return this.position || Vector3.parse(this.element.getAttribute('position') || "0");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneObjectNodeBase.prototype, "Rotation", {
        get: function () {
            return this.rotation || AttributeParser.ParseRotation3D(this.element.getAttribute('rotation') || "x(0)");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneObjectNodeBase.prototype, "Scale", {
        get: function () {
            return this.scale || Vector3.parse(this.element.getAttribute('scale') || "1");
        },
        enumerable: true,
        configurable: true
    });
    return SceneObjectNodeBase;
})(GomlTreeNodeBase);
module.exports = SceneObjectNodeBase;

},{"../../../Math/Quaternion":232,"../../../Math/Vector3":235,"../../AttributeParser":150,"../../GomlTreeNodeBase":179}],213:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GomlTreeNodeBase = require("../../GomlTreeNodeBase");
var TemplateNode = (function (_super) {
    __extends(TemplateNode, _super);
    function TemplateNode(elem, parent) {
        _super.call(this, elem, parent);
        this.templateGoml = "";
        var name = elem.getAttribute("name");
        if (name) {
            this.nodeManager.nodeRegister.addObject("jthree.template", name, this);
            this.templateGoml = elem.innerHTML;
        }
        else {
            console.error("template tag should be specified name.");
        }
    }
    Object.defineProperty(TemplateNode.prototype, "TemplateGoml", {
        get: function () {
            return this.templateGoml;
        },
        enumerable: true,
        configurable: true
    });
    TemplateNode.prototype.GetGomlToInstanciate = function (instanciateParent) {
        var valueMap = {};
        var templateAttributes = this.element.attributes;
        for (var i = 0; i < templateAttributes.length; i++) {
            var attribute = templateAttributes.item(i);
            if (TemplateNode.templateIgnore.indexOf(attribute.name) === -1) {
                valueMap[attribute.name] = attribute.value;
            }
        }
        var instanciateParentAttributes = instanciateParent.attributes;
        for (var i = 0; i < instanciateParentAttributes.length; i++) {
            var attribute = instanciateParentAttributes.item(i);
            if (TemplateNode.parentIgnore.indexOf(attribute.name) === -1) {
                valueMap[attribute.name] = attribute.value;
            }
        }
        var replaceTarget = this.TemplateGoml;
        for (var replaceKey in valueMap) {
            var value = valueMap[replaceKey];
            replaceTarget = replaceTarget.replace("{{" + replaceKey + "}}", value);
        }
        return replaceTarget;
    };
    TemplateNode.parentIgnore = ["template"];
    TemplateNode.templateIgnore = ["name"];
    return TemplateNode;
})(GomlTreeNodeBase);
module.exports = TemplateNode;

},{"../../GomlTreeNodeBase":179}],214:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TextureNodeBase = require("./TextureNodeBase");
var CubeTextureNode = (function (_super) {
    __extends(CubeTextureNode, _super);
    function CubeTextureNode(elem, parent) {
        _super.call(this, elem, parent);
        this.loadedFlags = [false, false, false, false, false, false];
        this.loadedImages = [null, null, null, null, null, null];
        this.attributes.defineAttribute({
            srcs: {
                converter: "string",
                src: ""
            }
        });
    }
    CubeTextureNode.prototype.generateTexture = function (name, rm) {
        var texture = rm.createCubeTextureWithSource("jthree.goml.cubetexture." + name, null, false);
        var srcsv = this.attributes.getValue("srcs");
        if (srcsv) {
            var srcs = srcsv.split(" ");
            for (var i = 0; i < 6; i++) {
                this.loadImg(i, srcs[i]);
            }
        }
        return texture;
    };
    Object.defineProperty(CubeTextureNode.prototype, "TextureGroupName", {
        get: function () {
            return "cubetexture";
        },
        enumerable: true,
        configurable: true
    });
    CubeTextureNode.prototype.loadImg = function (index, src) {
        var _this = this;
        var img = this.loadedImages[index] = new Image();
        img.onload = function () {
            _this.loadedFlags[index] = true;
            var allTrue = true;
            for (var j = 0; j < 6; j++) {
                if (!_this.loadedFlags[j])
                    allTrue = false;
            }
            if (allTrue) {
                _this.TargetTexture.ImageSource = _this.loadedImages;
            }
        };
        img.src = src;
    };
    return CubeTextureNode;
})(TextureNodeBase);
module.exports = CubeTextureNode;

},{"./TextureNodeBase":216}],215:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TextureNodeBase = require("./TextureNodeBase");
var TextureNode = (function (_super) {
    __extends(TextureNode, _super);
    function TextureNode(elem, parent) {
        _super.call(this, elem, parent);
        this.attributes.defineAttribute({
            src: {
                converter: "string",
                src: ""
            }
        });
    }
    TextureNode.prototype.generateTexture = function (name, rm) {
        var _this = this;
        var texture = rm.createTextureWithSource("jthree.goml.texture." + name, null);
        var img = new Image();
        img.onload = function () {
            _this.TargetTexture.ImageSource = img;
        };
        img.src = this.attributes.getValue("src");
        return texture;
    };
    Object.defineProperty(TextureNode.prototype, "TextureGroupName", {
        get: function () {
            return "texture2d";
        },
        enumerable: true,
        configurable: true
    });
    return TextureNode;
})(TextureNodeBase);
module.exports = TextureNode;

},{"./TextureNodeBase":216}],216:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GomlTreeNodeBase = require("../../GomlTreeNodeBase");
var MinFilterType = require("../../../Wrapper/Texture/TextureMinFilterType");
var MagFilterType = require("../../../Wrapper/Texture/TextureMagFilterType");
var TextureWrapType = require("../../../Wrapper/Texture/TextureWrapType");
var JThreeContext = require("../../../JThreeContext");
var ContextComponents = require("../../../ContextComponents");
var TextureNodeBase = (function (_super) {
    __extends(TextureNodeBase, _super);
    function TextureNodeBase(elem, parent) {
        var _this = this;
        _super.call(this, elem, parent);
        this.attributes.defineAttribute({
            name: {
                converter: "string",
                value: "",
                constant: true
            },
            minFilter: {
                converter: "string",
                value: "LINEAR",
                handler: function (v) {
                    _this.targetTexture.MinFilter = _this.toMinFilterParameter(v.Value);
                }
            },
            magFilter: {
                converter: "string",
                value: "LINEAR",
                handler: function (v) {
                    _this.targetTexture.MagFilter = _this.toMagFilterParameter(v.Value);
                }
            },
            twrap: {
                converter: "string",
                value: "clamp",
                handler: function (v) {
                    _this.targetTexture.TWrap = _this.toWrapParameter(v.Value);
                }
            },
            swrap: {
                converter: "string",
                value: "clamp",
                handler: function (v) {
                    _this.targetTexture.SWrap = _this.toWrapParameter(v.Value);
                }
            }
        });
    }
    Object.defineProperty(TextureNodeBase.prototype, "TargetTexture", {
        get: function () {
            return this.targetTexture;
        },
        enumerable: true,
        configurable: true
    });
    TextureNodeBase.prototype.beforeLoad = function () {
        _super.prototype.beforeLoad.call(this);
        var rm = JThreeContext.getContextComponent(ContextComponents.ResourceManager);
        var name = this.attributes.getValue("name");
        this.targetTexture = this.generateTexture(name, rm);
        this.nodeManager.nodeRegister.addObject("jthree.resource." + this.TextureGroupName, name, this);
    };
    TextureNodeBase.prototype.generateTexture = function (name, rm) {
        return null;
    };
    Object.defineProperty(TextureNodeBase.prototype, "TextureGroupName", {
        get: function () {
            return "";
        },
        enumerable: true,
        configurable: true
    });
    TextureNodeBase.prototype.toMinFilterParameter = function (attr) {
        attr = attr.toUpperCase();
        switch (attr) {
            case "NEARESTMIPLINEAR":
                return MinFilterType.NearestMipmapLinear;
            case "NEARESTMIPNEAREST":
                return MinFilterType.NearestMipmapNearest;
            case "LINEARMIPLINEAR":
                return MinFilterType.LinearMipmapLinear;
            case "LINEARMIPNEAREST":
                return MinFilterType.LinearMipmapNearest;
            case "NEAREST":
                return MinFilterType.Nearest;
            case "LINEAR":
            default:
                return MinFilterType.Linear;
        }
    };
    TextureNodeBase.prototype.toMagFilterParameter = function (attr) {
        attr = attr.toUpperCase();
        switch (attr) {
            case "NEAREST":
                return MagFilterType.Nearest;
            case "LINEAR":
            default:
                return MagFilterType.Linear;
        }
    };
    TextureNodeBase.prototype.toWrapParameter = function (attr) {
        attr = attr.toUpperCase();
        switch (attr) {
            case "REPEAT":
                return TextureWrapType.Repeat;
            case "MIRRORED_REPEAT":
                return TextureWrapType.MirroredRepeat;
            default:
            case "CLAMP":
                return TextureWrapType.ClampToEdge;
        }
    };
    return TextureNodeBase;
})(GomlTreeNodeBase);
module.exports = TextureNodeBase;

},{"../../../ContextComponents":12,"../../../JThreeContext":226,"../../../Wrapper/Texture/TextureMagFilterType":290,"../../../Wrapper/Texture/TextureMinFilterType":291,"../../../Wrapper/Texture/TextureWrapType":294,"../../GomlTreeNodeBase":179}],217:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OrderedTopLevelNodeBase = require("./OrderedTopLevelNodeBase");
var CanvasesNode = (function (_super) {
    __extends(CanvasesNode, _super);
    function CanvasesNode(elem, parent) {
        _super.call(this, elem, parent);
    }
    Object.defineProperty(CanvasesNode.prototype, "loadPriorty", {
        get: function () {
            return 2000;
        },
        enumerable: true,
        configurable: true
    });
    return CanvasesNode;
})(OrderedTopLevelNodeBase);
module.exports = CanvasesNode;

},{"./OrderedTopLevelNodeBase":220}],218:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GomlTreeNodeBase = require("../../GomlTreeNodeBase");
var GomlNode = (function (_super) {
    __extends(GomlNode, _super);
    function GomlNode(elem, parent) {
        _super.call(this, elem, parent);
    }
    GomlNode.prototype.addChild = function (child) {
        _super.prototype.addChild.call(this, child);
        this.children.sort(function (n1, n2) { return n1.loadPriorty - n2.loadPriorty; });
    };
    return GomlNode;
})(GomlTreeNodeBase);
module.exports = GomlNode;

},{"../../GomlTreeNodeBase":179}],219:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OrderedTopLevelNodeBase = require("./OrderedTopLevelNodeBase");
var LoadersNode = (function (_super) {
    __extends(LoadersNode, _super);
    function LoadersNode(elem, parent) {
        _super.call(this, elem, parent);
    }
    Object.defineProperty(LoadersNode.prototype, "loadPriorty", {
        get: function () {
            return 1000;
        },
        enumerable: true,
        configurable: true
    });
    return LoadersNode;
})(OrderedTopLevelNodeBase);
module.exports = LoadersNode;

},{"./OrderedTopLevelNodeBase":220}],220:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GomlTreeNodeBase = require("../../GomlTreeNodeBase");
var OrderedTopLevelNodeBase = (function (_super) {
    __extends(OrderedTopLevelNodeBase, _super);
    function OrderedTopLevelNodeBase(elem, parent) {
        _super.call(this, elem, parent);
    }
    Object.defineProperty(OrderedTopLevelNodeBase.prototype, "loadPriorty", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    return OrderedTopLevelNodeBase;
})(GomlTreeNodeBase);
module.exports = OrderedTopLevelNodeBase;

},{"../../GomlTreeNodeBase":179}],221:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OrderedTopLevelNodeBase = require("./OrderedTopLevelNodeBase");
var ResourcesNode = (function (_super) {
    __extends(ResourcesNode, _super);
    function ResourcesNode(elem, parent) {
        _super.call(this, elem, parent);
    }
    Object.defineProperty(ResourcesNode.prototype, "loadPriorty", {
        get: function () {
            return 3000;
        },
        enumerable: true,
        configurable: true
    });
    return ResourcesNode;
})(OrderedTopLevelNodeBase);
module.exports = ResourcesNode;

},{"./OrderedTopLevelNodeBase":220}],222:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OrderedTopLevelNodeBase = require("./OrderedTopLevelNodeBase");
var ScenesNode = (function (_super) {
    __extends(ScenesNode, _super);
    function ScenesNode(elem, parent) {
        _super.call(this, elem, parent);
    }
    Object.defineProperty(ScenesNode.prototype, "loadPriorty", {
        get: function () {
            return 5000;
        },
        enumerable: true,
        configurable: true
    });
    return ScenesNode;
})(OrderedTopLevelNodeBase);
module.exports = ScenesNode;

},{"./OrderedTopLevelNodeBase":220}],223:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OrderedTopLevelNodeBase = require("./OrderedTopLevelNodeBase");
var TemplatesNode = (function (_super) {
    __extends(TemplatesNode, _super);
    function TemplatesNode(elem, parent) {
        _super.call(this, elem, parent);
    }
    Object.defineProperty(TemplatesNode.prototype, "loadPriorty", {
        get: function () {
            return 4000;
        },
        enumerable: true,
        configurable: true
    });
    return TemplatesNode;
})(OrderedTopLevelNodeBase);
module.exports = TemplatesNode;

},{"./OrderedTopLevelNodeBase":220}],224:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JThreeObjectWithID = require("../Base/JThreeObjectWithID");
var TreeNodeBase = (function (_super) {
    __extends(TreeNodeBase, _super);
    function TreeNodeBase(elem, parent) {
        _super.call(this);
        this.children = [];
        this.events = {};
        this.element = elem;
        if (parent != null)
            parent.addChild(this);
    }
    Object.defineProperty(TreeNodeBase.prototype, "Element", {
        get: function () {
            return this.element;
        },
        enumerable: true,
        configurable: true
    });
    TreeNodeBase.prototype.addChild = function (child) {
        child.parent = this;
        this.children.push(child);
    };
    TreeNodeBase.prototype.callRecursive = function (act) {
        act(this);
        this.children.forEach(function (v) { return v.callRecursive(act); });
    };
    TreeNodeBase.prototype.update = function () {
    };
    TreeNodeBase.prototype.bubbleEvent = function (eventName, eventParam) {
        eventParam.needPropagation = true;
        eventParam.stopPropagation = function () {
            eventParam.needPropagation = false;
        };
        this.bubblingEvent(eventName, eventParam);
    };
    TreeNodeBase.prototype.bubblingEvent = function (eventName, eventParam) {
        if (this.events[eventName]) {
            var handlers = this.events[eventName];
            for (var i = 0; i < handlers.length; i++) {
                handlers[i](eventParam);
            }
        }
        if (eventParam.needPropagation && this.parent)
            this.parent.bubblingEvent(eventName, eventParam);
    };
    return TreeNodeBase;
})(JThreeObjectWithID);
module.exports = TreeNodeBase;

},{"../Base/JThreeObjectWithID":10}],225:[function(require,module,exports){
var MaterialManager = require("./Core/Materials/Base/MaterialManager");
var ShaderProgramParser = require("./Core/Materials/Base/ShaderProgramParser");
var Timer = require("./Core/Timer");
var JThreeInterface = require('./JThreeInterface');
var JThreeContext = require("./JThreeContext");
var SceneManager = require("./Core/SceneManager");
var CanvasManager = require("./Core/CanvasManager");
var LoopManager = require("./Core/LoopManager");
var ContextComponents = require("./ContextComponents");
var ResourceManager = require("./Core/ResourceManager");
var NodeManager = require("./Goml/NodeManager");
var Debugger = require("./Debug/Debugger");
var GomlLoader = require("./Goml/GomlLoader");
var ResourceLoader = require("./Core/ResourceLoader");
var JThreeStatic = (function () {
    function JThreeStatic() {
    }
    JThreeStatic.prototype.defineBehavior = function (nameOrDeclarations, declaration) {
        JThreeContext.getContextComponent(ContextComponents.NodeManager).behaviorRegistry.defineBehavior(nameOrDeclarations, declaration);
    };
    Object.defineProperty(JThreeStatic.prototype, "Math", {
        get: function () {
            return {
                Quaternion: require("./Math/Quaternion"),
                Vector2: require("./Math/Vector2"),
                Vector3: require("./Math/Vector3"),
                Vector4: require("./Math/Vector4")
            };
        },
        enumerable: true,
        configurable: true
    });
    return JThreeStatic;
})();
var JThreeInit = (function () {
    function JThreeInit() {
    }
    JThreeInit.j3 = function (query) {
        var nodeManager = JThreeContext.getContextComponent(ContextComponents.NodeManager);
        if (typeof query === 'function') {
            nodeManager.loadedHandler.addListener(query);
            return undefined;
        }
        var targetObject = nodeManager.htmlRoot.querySelectorAll(query);
        return new JThreeInterface(targetObject);
    };
    JThreeInit.Init = function () {
        var scripts = document.getElementsByTagName('script');
        JThreeInit.SelfTag = scripts[scripts.length - 1];
        window["j3"] = JThreeInit.j3;
        var pro = Object.getPrototypeOf(window["j3"]);
        for (var key in JThreeStatic.prototype) {
            pro[key] = JThreeStatic.prototype[key];
        }
        window["j3"]["lateStart"] = JThreeInit.startInitialize;
        JThreeContext.init();
        JThreeContext.registerContextComponent(new Timer());
        JThreeContext.registerContextComponent(new LoopManager());
        JThreeContext.registerContextComponent(new ResourceLoader());
        JThreeContext.registerContextComponent(new SceneManager());
        JThreeContext.registerContextComponent(new CanvasManager());
        JThreeContext.registerContextComponent(new ResourceManager());
        JThreeContext.registerContextComponent(new NodeManager());
        JThreeContext.registerContextComponent(new Debugger());
        JThreeContext.registerContextComponent(new MaterialManager());
        ShaderProgramParser.parseCombined("\n//@import jthree.builtin.vertex\n//@import jthree.builtin.vertex\n\n//@fragonly\n//This is main function\nvoid main(void)\n{\n\n}\n//@vertonly\nvoid frag(void)\n{\n\n}\n          ", "vert", "frag");
        var canvasManager = JThreeContext.getContextComponent(ContextComponents.CanvasManager);
        var loopManager = JThreeContext.getContextComponent(ContextComponents.LoopManager);
        var timer = JThreeContext.getContextComponent(ContextComponents.Timer);
        var sceneManager = JThreeContext.getContextComponent(ContextComponents.SceneManager);
        loopManager.addAction(1000, function () { return timer.updateTimer(); });
        loopManager.addAction(4000, function () { return canvasManager.beforeRenderAll(); });
        loopManager.addAction(5000, function () { return sceneManager.renderAll(); });
        loopManager.addAction(6000, function () { return canvasManager.afterRenderAll(); });
        if (JThreeInit.SelfTag.getAttribute('x-lateLoad') !== "true")
            window.addEventListener('DOMContentLoaded', function () {
                JThreeInit.startInitialize();
            });
    };
    JThreeInit.startInitialize = function () {
        var nodeManager = JThreeContext.getContextComponent(ContextComponents.NodeManager);
        var loader = new GomlLoader(nodeManager, JThreeInit.SelfTag);
        loader.initForPage();
        JThreeContext.getContextComponent(ContextComponents.Debugger).attach();
        var resourceLoader = JThreeContext.getContextComponent(ContextComponents.ResourceLoader);
        resourceLoader.promise.then(function () {
            JThreeContext.getContextComponent(ContextComponents.LoopManager).begin();
        });
    };
    return JThreeInit;
})();
module.exports = JThreeInit;

},{"./ContextComponents":12,"./Core/CanvasManager":19,"./Core/LoopManager":44,"./Core/Materials/Base/MaterialManager":45,"./Core/Materials/Base/ShaderProgramParser":46,"./Core/ResourceLoader":73,"./Core/ResourceManager":74,"./Core/SceneManager":107,"./Core/Timer":134,"./Debug/Debugger":136,"./Goml/GomlLoader":174,"./Goml/NodeManager":180,"./JThreeContext":226,"./JThreeInterface":227,"./Math/Quaternion":232,"./Math/Vector2":234,"./Math/Vector3":235,"./Math/Vector4":236}],226:[function(require,module,exports){
var JThreeContext = (function () {
    function JThreeContext() {
        this.contextComponents = {};
    }
    JThreeContext.init = function () {
        if (!window.j3.context)
            window.j3.context = new JThreeContext();
    };
    Object.defineProperty(JThreeContext, "context", {
        get: function () {
            return window.j3.context;
        },
        enumerable: true,
        configurable: true
    });
    JThreeContext.registerContextComponent = function (contextComponent) {
        if (JThreeContext.context.contextComponents[contextComponent.getContextComponentIndex()])
            console.warn("Reregisteration of context component");
        JThreeContext.context.contextComponents[contextComponent.getContextComponentIndex()] = contextComponent;
    };
    JThreeContext.getContextComponent = function (index) {
        return JThreeContext.context.contextComponents[index];
    };
    return JThreeContext;
})();
module.exports = JThreeContext;

},{}],227:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JThreeObject = require("./Base/JThreeObject");
var JThreeContext = require("./JThreeContext");
var ContextComponents = require("./ContextComponents");
var JThreeInterface = (function (_super) {
    __extends(JThreeInterface, _super);
    function JThreeInterface(target) {
        _super.call(this);
        this.queuedActions = [];
        this.isExecuting = false;
        this.target = target;
    }
    JThreeInterface.prototype.dequeue = function () {
        this.queuedActions.shift();
        this.isExecuting = false;
        this.tryStartQueue();
        return this;
    };
    JThreeInterface.prototype.tryStartQueue = function () {
        if (!this.isExecuting && this.queuedActions.length > 0) {
            this.isExecuting = true;
            this.queuedActions[0].call(this);
        }
    };
    JThreeInterface.prototype.queue = function (act) {
        this.queuedActions.push(act);
        this.tryStartQueue();
        return this;
    };
    JThreeInterface.prototype.delay = function (time) {
        var _this = this;
        this.queue(function () {
            window.setTimeout(function (t) { t.dequeue(); }, time, _this);
        });
        return this;
    };
    JThreeInterface.prototype.attr = function (attrTarget, val) {
        var _this = this;
        if (typeof attrTarget === "string") {
            if (val) {
                if (typeof val === "function") {
                    var f1 = function (attrName, func) {
                        for (var i = 0; i < _this.target.length; i++) {
                            (function (i) {
                                var e = _this.target[i];
                                var gomlNode = JThreeInterface.getNode(e);
                                _this.setAttrValue(attrName, func(i, attrName), e, gomlNode);
                            })(i);
                        }
                        _this.dequeue();
                    };
                    this.queue(function () { f1(attrTarget, val); });
                    return this;
                }
                else {
                    var f2 = function (attrName, value) {
                        for (var i = 0; i < _this.target.length; i++) {
                            (function (i) {
                                var e = _this.target[i];
                                var gomlNode = JThreeInterface.getNode(e);
                                _this.setAttrValue(attrName, value, e, gomlNode);
                            })(i);
                        }
                        _this.dequeue();
                    };
                    this.queue(function () { f2(attrTarget, val); });
                    return this;
                }
            }
            else
                return this.getAttr(attrTarget);
        }
        else if (typeof attrTarget === "object") {
            var f = function (attrTarget) {
                for (var i = 0; i < _this.target.length; i++) {
                    (function (i) {
                        var e = _this.target[i];
                        var gomlNode = JThreeInterface.getNode(e);
                        for (var attrName in attrTarget) {
                            var value = attrTarget[attrName];
                            _this.setAttrValue(attrName, value, e, gomlNode);
                        }
                    })(i);
                }
                _this.dequeue();
            };
            this.queue(function () { f(attrTarget); });
            return this;
        }
    };
    JThreeInterface.prototype.getAttr = function (attrName) {
        if (this.target.length === 0)
            return undefined;
        var target = this.target[0];
        var targetGoml = JThreeInterface.getNode(target);
        if (targetGoml.attributes.isDefined(attrName)) {
            return targetGoml.attributes.getValue(attrName);
        }
        else {
            return target.attributes.getNamedItem(attrName).value;
        }
    };
    JThreeInterface.prototype.setAttrValue = function (attrName, attrValue, e, gomlNode) {
        if (gomlNode.attributes.isDefined(attrName)) {
            gomlNode.attributes.setValue(attrName, attrValue);
        }
        else {
            e.setAttribute(attrName, attrValue);
        }
    };
    JThreeInterface.prototype.animate = function (attrTarget, duration, easing, onComplete) {
        var _this = this;
        var t = this;
        var f = function (attrTarget, duration, easing, onComplete) {
            easing = easing || "linear";
            for (var i = 0; i < t.target.length; i++) {
                var e = _this.target[i];
                for (var attrName in attrTarget) {
                    var value = attrTarget[attrName];
                    var gomlNode = JThreeInterface.getNode(e);
                    if (gomlNode.attributes.isDefined(attrName)) {
                        var easingFunc = JThreeInterface.NodeManager.configurator.getEasingFunction(easing);
                        var timer = JThreeContext.getContextComponent(ContextComponents.Timer);
                    }
                }
            }
        };
        this.queue(function () { return f(attrTarget, duration, easing, onComplete); });
        return this;
    };
    JThreeInterface.prototype.on = function (eventName, eventHandler) {
        for (var i = 0; i < this.target.length; i++) {
            var e = this.target[i];
            var node = JThreeInterface.getNode(e);
            if (!node.events[eventName])
                node.events[eventName] = [];
            node.events[eventName].push(eventHandler);
        }
    };
    JThreeInterface.getNode = function (elem) {
        var id = elem.getAttribute("x-j3-id");
        return JThreeInterface.NodeManager.getNode(id);
    };
    Object.defineProperty(JThreeInterface, "NodeManager", {
        get: function () {
            return JThreeContext.getContextComponent(ContextComponents.NodeManager);
        },
        enumerable: true,
        configurable: true
    });
    return JThreeInterface;
})(JThreeObject);
module.exports = JThreeInterface;

},{"./Base/JThreeObject":9,"./ContextComponents":12,"./JThreeContext":226}],228:[function(require,module,exports){
var Vector3 = require("./Vector3");
var AABB = (function () {
    function AABB() {
    }
    Object.defineProperty(AABB.prototype, "Width", {
        get: function () {
            return Math.abs(this.pointLBF.X - this.pointRTN.X);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AABB.prototype, "Height", {
        get: function () {
            return Math.abs(this.pointLBF.Y - this.pointRTN.Y);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AABB.prototype, "Distance", {
        get: function () {
            return Math.abs(this.pointLBF.Z - this.pointRTN.Z);
        },
        enumerable: true,
        configurable: true
    });
    AABB.prototype.expandAABB = function (newPoint) {
        if (this.pointLBF == null) {
            this.pointLBF = Vector3.copy(newPoint);
            this.pointRTN = Vector3.copy(newPoint);
        }
        this.pointLBF = Vector3.min(newPoint, this.pointLBF);
        this.pointRTN = Vector3.max(newPoint, this.pointRTN);
    };
    AABB.prototype.clear = function () {
        this.pointLBF = null;
        this.pointRTN = null;
    };
    AABB.prototype.toMathematicaCuboid = function () {
        return "Cuboid[" + this.pointLBF.toMathematicaString() + "," + this.pointRTN.toMathematicaString() + "]";
    };
    return AABB;
})();
module.exports = AABB;

},{"./Vector3":235}],229:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MatrixBase = require("./MatrixBase");
var Vector3 = require("./Vector3");
var Vector4 = require("./Vector4");
var glm = require('gl-matrix');
var Matrix = (function (_super) {
    __extends(Matrix, _super);
    function Matrix(arr) {
        _super.call(this);
        if (arr)
            this.rawElements = arr;
        else
            this.rawElements = glm.mat4.create();
    }
    Matrix.zero = function () {
        return new Matrix([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    };
    Matrix.identity = function () {
        return new Matrix(glm.mat4.create());
    };
    Matrix.fromElements = function (m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
        return new Matrix([m00, m10, m20, m30, m01, m11, m21, m31, m02, m12, m22, m32, m03, m13, m23, m33]);
    };
    Matrix.fromFunc = function (f) {
        return new Matrix([f(0, 0), f(1, 0), f(2, 0), f(3, 0), f(0, 1), f(1, 1), f(2, 1), f(3, 1), f(0, 2), f(1, 2), f(2, 2), f(3, 2), f(0, 3), f(1, 3), f(2, 3), f(3, 3)]);
    };
    Matrix.prototype.isValidArray = function (arr) {
        if (arr.length !== 16)
            return false;
        return true;
    };
    Matrix.prototype.getAt = function (row, colmun) {
        return this.rawElements[colmun * 4 + row];
    };
    Matrix.prototype.setAt = function (row, colmun, val) {
        this.rawElements[colmun * 4 + row] = val;
    };
    Matrix.prototype.getBySingleIndex = function (index) {
        return this.rawElements[index];
    };
    Matrix.prototype.getColmun = function (col) {
        return new Vector4(this.rawElements[col * 4], this.rawElements[col * 4 + 1], this.rawElements[col * 4 + 2], this.rawElements[col * 4 + 3]);
    };
    Matrix.prototype.getRow = function (row) {
        return new Vector4(this.rawElements[row], this.rawElements[row + 4], this.rawElements[row + 8], this.rawElements[row + 12]);
    };
    Matrix.equal = function (m1, m2) {
        return Matrix.elementEqual(m1, m2);
    };
    Matrix.add = function (m1, m2) {
        var mat = glm.mat4.create();
        for (var i = 0; i < 16; i++) {
            mat[i] = m1.rawElements[i] + m2.rawElements[i];
        }
        return new Matrix(mat);
    };
    Matrix.subtract = function (m1, m2) {
        return Matrix.add(m1, Matrix.negate(m2));
    };
    Matrix.scalarMultiply = function (s, m) {
        var newMat = glm.mat4.create();
        glm.mat4.multiply(newMat, [s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s], m.rawElements);
        return new Matrix(newMat);
    };
    Matrix.multiply = function (m1, m2) {
        var newMat = glm.mat4.create();
        return new Matrix(glm.mat4.mul(newMat, m1.rawElements, m2.rawElements));
    };
    Matrix.TRS = function (t, rot, s) {
        var newMat = glm.mat4.create();
        var cacheMat = glm.mat4.create();
        glm.mat4.mul(newMat, glm.mat4.translate(newMat, glm.mat4.create(), t.rawElements), glm.mat4.fromQuat(cacheMat, rot.rawElements));
        glm.mat4.scale(newMat, newMat, s.rawElements);
        return new Matrix(newMat);
    };
    Matrix.negate = function (m) {
        return this.scalarMultiply(-1, m);
    };
    Matrix.transpose = function (m) {
        var newMat = glm.mat4.create();
        return new Matrix(glm.mat4.transpose(newMat, m.rawElements));
    };
    Matrix.transformPoint = function (m, t) {
        var newVec = glm.vec3.create();
        glm.vec3.transformMat4(newVec, t.rawElements, m.rawElements);
        return new Vector3(newVec);
    };
    Matrix.transformNormal = function (m, t) {
        var newVec = glm.vec4.create();
        var trans = glm.vec4.create();
        trans[0] = t.X;
        trans[1] = t.Y;
        trans[2] = t.Z;
        trans[3] = 0;
        glm.vec4.transformMat4(newVec, trans, m.rawElements);
        return new Vector3(newVec[0], newVec[1], newVec[2]);
    };
    Matrix.transform = function (m, t) {
        var newVec = glm.vec4.create();
        var trans = glm.vec4.create();
        trans[0] = t.X;
        trans[1] = t.Y;
        trans[2] = t.Z;
        trans[3] = t.W;
        glm.vec4.transformMat4(newVec, trans, m.rawElements);
        return new Vector4(newVec[0], newVec[1], newVec[2], newVec[3]);
    };
    Matrix.determinant = function (m) {
        return glm.mat4.determinant(m.rawElements);
    };
    Matrix.inverse = function (m) {
        var newMat = glm.mat4.create();
        return new Matrix(glm.mat4.invert(newMat, m.rawElements));
    };
    Matrix.translate = function (v) {
        var newMat = glm.mat4.create();
        glm.mat4.translate(newMat, newMat, v.rawElements);
        return new Matrix(newMat);
    };
    Matrix.scale = function (v) {
        var newMat = glm.mat4.create();
        glm.mat4.scale(newMat, newMat, v.rawElements);
        return new Matrix(newMat);
    };
    Matrix.rotateX = function (angle) {
        var newMat = glm.mat4.create();
        glm.mat4.rotateX(newMat, newMat, angle);
        return new Matrix(newMat);
    };
    Matrix.rotateY = function (angle) {
        var newMat = glm.mat4.create();
        glm.mat4.rotateY(newMat, newMat, angle);
        return new Matrix(newMat);
    };
    Matrix.rotateZ = function (angle) {
        var newMat = glm.mat4.create();
        glm.mat4.rotateZ(newMat, newMat, angle);
        return new Matrix(newMat);
    };
    Matrix.RotationQuaternion = function (quat) {
        var quaternion = glm.quat.create();
        var newMat = glm.mat4.create();
        glm.quat.normalize(quaternion, quat.rawElements);
        glm.mat4.fromQuat(newMat, quaternion);
        return new Matrix(newMat);
    };
    Matrix.frustum = function (left, right, bottom, top, near, far) {
        var newMat = glm.mat4.create();
        glm.mat4.frustum(newMat, left, right, bottom, top, near, far);
        return new Matrix(newMat);
    };
    Matrix.ortho = function (left, right, bottom, top, near, far) {
        var newMat = glm.mat4.create();
        glm.mat4.ortho(newMat, left, right, bottom, top, near, far);
        return new Matrix(newMat);
    };
    Matrix.perspective = function (fovy, aspect, near, far) {
        var newMat = glm.mat4.create();
        glm.mat4.perspective(newMat, fovy, aspect, near, far);
        return new Matrix(newMat);
    };
    Matrix.lookAt = function (eye, lookAt, up) {
        var newMat = glm.mat4.create();
        glm.mat4.lookAt(newMat, eye.rawElements, lookAt.rawElements, up.rawElements);
        return new Matrix(newMat);
    };
    Matrix.prototype.multiplyWith = function (m) {
        return Matrix.multiply(this, m);
    };
    Matrix.prototype.toString = function () {
        return ("|" + this.getBySingleIndex(0) + " " + this.getBySingleIndex(4) + " " + this.getBySingleIndex(8) + " " + this.getBySingleIndex(12) + "|\n\n                 |" + this.getBySingleIndex(1) + " " + this.getBySingleIndex(5) + " " + this.getBySingleIndex(9) + " " + this.getBySingleIndex(13) + "|\n\n                 |" + this.getBySingleIndex(2) + " " + this.getBySingleIndex(6) + " " + this.getBySingleIndex(10) + " " + this.getBySingleIndex(14) + "|\n\n                 |" + this.getBySingleIndex(3) + " " + this.getBySingleIndex(7) + " " + this.getBySingleIndex(11) + " " + this.getBySingleIndex(15) + "|");
    };
    Matrix.prototype.toMathematicaString = function () {
        return ("{{" + this.getBySingleIndex(0) + "," + this.getBySingleIndex(4) + "," + this.getBySingleIndex(8) + "," + this.getBySingleIndex(12) + "},\n                  {" + this.getBySingleIndex(1) + "," + this.getBySingleIndex(5) + "," + this.getBySingleIndex(9) + "," + this.getBySingleIndex(13) + "},\n                  {" + this.getBySingleIndex(2) + "," + this.getBySingleIndex(6) + "," + this.getBySingleIndex(10) + "," + this.getBySingleIndex(14) + "},\n                  {" + this.getBySingleIndex(3) + "," + this.getBySingleIndex(7) + "," + this.getBySingleIndex(11) + "," + this.getBySingleIndex(15) + "}}");
    };
    Object.defineProperty(Matrix.prototype, "ElementCount", {
        get: function () { return 16; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "RowCount", {
        get: function () { return 4; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "ColmunCount", {
        get: function () { return 4; },
        enumerable: true,
        configurable: true
    });
    return Matrix;
})(MatrixBase);
module.exports = Matrix;

},{"./MatrixBase":230,"./Vector3":235,"./Vector4":236,"gl-matrix":299}],230:[function(require,module,exports){
var MatrixBase = (function () {
    function MatrixBase() {
    }
    MatrixBase.elementEqual = function (m1, m2) {
        if (m1.RowCount !== m2.RowCount || m1.ColmunCount !== m2.ColmunCount)
            return false;
        var count = m1.RowCount * m2.ColmunCount;
        for (var i = 0; i < count; i++) {
            if (m1.getBySingleIndex(i) !== m2.getBySingleIndex(i))
                return false;
        }
        return true;
    };
    Object.defineProperty(MatrixBase.prototype, "RowCount", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatrixBase.prototype, "ColmunCount", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    MatrixBase.prototype.getAt = function (row, colmun) {
        throw new Error("Not implemented");
    };
    MatrixBase.prototype.getBySingleIndex = function (index) {
        throw new Error("Not implemented");
    };
    return MatrixBase;
})();
module.exports = MatrixBase;

},{}],231:[function(require,module,exports){
var Vector3 = require("./Vector3");
var glm = require("gl-matrix");
var JThreeLogger = require("../Base/JThreeLogger");
var AABB = require("./AABB");
var PointList = (function () {
    function PointList(pointList) {
        if (pointList) {
            this.points = new Array(pointList.points.length);
            for (var i = 0; i < pointList.points.length; i++) {
                this.points[i] = Vector3.copy(pointList.points[i]);
            }
        }
        else {
            this.points = [];
        }
    }
    PointList.prototype.addPoint = function (point) {
        this.points.push(point);
    };
    PointList.prototype.transform = function (transformMatrix) {
        for (var i = 0; i < this.points.length; i++) {
            glm.vec3.transformMat4(this.points[i].rawElements, this.points[i].rawElements, transformMatrix.rawElements);
        }
    };
    PointList.prototype.clear = function () {
        this.points.length = 0;
    };
    PointList.prototype.debugShow = function () {
        var log = "";
        for (var i = 0; i < this.points.length; i++) {
            log += this.points[i] + "\n";
        }
        JThreeLogger.sectionLongLog("Pointlist", log);
    };
    PointList.prototype.getBoundingBox = function () {
        var aabb = new AABB();
        for (var i = 0; i < this.points.length; i++) {
            aabb.expandAABB(this.points[i]);
        }
        return aabb;
    };
    PointList.initializeWithCube = function (list) {
        list.clear();
        list.addPoint(new Vector3(-1.0, +1.0, -1.0));
        list.addPoint(new Vector3(-1.0, -1.0, -1.0));
        list.addPoint(new Vector3(+1.0, -1.0, -1.0));
        list.addPoint(new Vector3(+1.0, +1.0, -1.0));
        list.addPoint(new Vector3(-1.0, +1.0, +1.0));
        list.addPoint(new Vector3(-1.0, -1.0, +1.0));
        list.addPoint(new Vector3(+1.0, -1.0, +1.0));
        list.addPoint(new Vector3(+1.0, +1.0, +1.0));
        return list;
    };
    PointList.prototype.toMathematicaPoints = function () {
        var points = "";
        for (var i = 0; i < this.points.length; i++) {
            if (i != 0)
                points += ",";
            points += this.points[i].toMathematicaString();
        }
        return "Point[{" + points + "}]";
    };
    return PointList;
})();
module.exports = PointList;

},{"../Base/JThreeLogger":8,"./AABB":228,"./Vector3":235,"gl-matrix":299}],232:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JThreeObject = require("../Base/JThreeObject");
var Vector3 = require("./Vector3");
var glm = require("gl-matrix");
var Matrix = require("./Matrix");
var Quaternion = (function (_super) {
    __extends(Quaternion, _super);
    function Quaternion(rawElements) {
        _super.call(this);
        this.rawElements = rawElements;
    }
    Object.defineProperty(Quaternion, "Identity", {
        get: function () {
            return new Quaternion(glm.quat.create());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Quaternion.prototype, "eularAngles", {
        get: function () {
            var eular = this.FactoringQuaternionZXY();
            return new Vector3(eular.x, eular.y, eular.z);
        },
        set: function (v) {
            this.rawElements = Quaternion.Euler(v.X, v.Y, v.Z).rawElements;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Quaternion.prototype, "X", {
        get: function () {
            return this.rawElements[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Quaternion.prototype, "Y", {
        get: function () {
            return this.rawElements[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Quaternion.prototype, "Z", {
        get: function () {
            return this.rawElements[2];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Quaternion.prototype, "W", {
        get: function () {
            return this.rawElements[3];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Quaternion.prototype, "ImaginaryPart", {
        get: function () {
            return new Vector3(this.X, this.Y, this.Z);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Quaternion.prototype, "Conjugate", {
        get: function () {
            var newQuat = glm.quat.create();
            return new Quaternion(glm.quat.conjugate(newQuat, this.rawElements));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Quaternion.prototype, "Length", {
        get: function () {
            return glm.quat.len(this.rawElements);
        },
        enumerable: true,
        configurable: true
    });
    Quaternion.prototype.Normalize = function () {
        var newQuat = glm.quat.create();
        return new Quaternion(glm.quat.normalize(newQuat, this.rawElements));
    };
    Quaternion.prototype.Inverse = function () {
        var newQuat = glm.quat.create();
        return new Quaternion(glm.quat.invert(newQuat, this.rawElements));
    };
    Quaternion.Add = function (q1, q2) {
        var newQuat = glm.quat.create();
        return new Quaternion(glm.quat.add(newQuat, q1.rawElements, q2.rawElements));
    };
    Quaternion.Multiply = function (q1, q2) {
        var newQuat = glm.quat.create();
        return new Quaternion(glm.quat.mul(newQuat, q1.rawElements, q2.rawElements));
    };
    Quaternion.AngleAxis = function (angle, axis) {
        var axisVec = glm.vec3.create();
        axisVec[0] = axis.X;
        axisVec[1] = axis.Y;
        axisVec[2] = axis.Z;
        var newQuat = glm.quat.create();
        return new Quaternion(glm.quat.setAxisAngle(newQuat, axisVec, +angle));
    };
    Quaternion.Euler = function (x, y, z) {
        return Quaternion.Multiply(Quaternion.AngleAxis(z, Vector3.ZUnit), Quaternion.Multiply(Quaternion.AngleAxis(x, Vector3.XUnit), Quaternion.AngleAxis(y, Vector3.YUnit)));
    };
    Quaternion.EulerXYZ = function (x, y, z) {
        return Quaternion.Multiply(Quaternion.AngleAxis(z, Vector3.ZUnit), Quaternion.Multiply(Quaternion.AngleAxis(y, Vector3.YUnit), Quaternion.AngleAxis(x, Vector3.XUnit)));
    };
    Quaternion.Slerp = function (q1, q2, t) {
        var newQuat = glm.quat.create();
        return new Quaternion(glm.quat.slerp(newQuat, q1.rawElements, q2.rawElements, +t));
    };
    Quaternion.Angle = function (q1, q2) {
        var delta = Quaternion.Multiply(q2, q1.Inverse());
        delta = delta.Normalize();
        return 2 * Math.acos(delta.W);
    };
    Quaternion.FromToRotation = function (from, to) {
        var crossed = Vector3.cross(from.normalized, to.normalized);
        var angle = Vector3.dot(from.normalized, to.normalized);
        return Quaternion.AngleAxis(angle, crossed);
    };
    Quaternion.LookRotation = function (forward, upVec) {
        upVec = upVec || Vector3.YUnit;
        var normalizedForward = forward.normalized;
        var upForwardCross = Vector3.cross(upVec, normalizedForward).normalized;
        var thirdAxis = Vector3.cross(normalizedForward, upForwardCross);
        var m00 = upForwardCross.X;
        var m01 = upForwardCross.Y;
        var m02 = upForwardCross.Z;
        var m10 = thirdAxis.X;
        var m11 = thirdAxis.Y;
        var m12 = thirdAxis.Z;
        var m20 = normalizedForward.X;
        var m21 = normalizedForward.Y;
        var m22 = normalizedForward.Z;
        var num8 = m00 + m11 + m22;
        if (num8 > 0) {
            var num = Math.sqrt(1 + num8);
            return new Quaternion([(m12 - m21) * 0.5 / num, (m20 - m02) * 0.5 / num, (m01 - m10) * 0.5 / num, num / 2]);
        }
        if (m00 >= m11 && m00 >= m22) {
            var num7 = Math.sqrt(1 + m00 - m11 - m22);
            return new Quaternion([(m01 + m10) * 0.5 / num7, (m02 + m20) * 0.5 / num7, (m12 - m21) * 0.5 / num7, num7 / 2]);
        }
        if (m11 > m22) {
            var num6 = Math.sqrt(1 + m11 - m00 - m22);
            return new Quaternion([(m10 + m01) * 0, 5 / num6, 0.5 * num6, (m21 + m12) * 0.5 / num6, (m20 - m02) * 0.5 / num6]);
        }
        var num5 = Math.sqrt(1 + m22 - m00 - m11);
        return new Quaternion([(m20 + m02) * 0.5 / num5, (m21 + m12) * 0.5 / num5, 0.5 * num5, (m01 - m10) * 0.5 / num5]);
    };
    Quaternion.prototype.toAngleAxisString = function () {
        var angle = 2 * Math.acos(this.W);
        var imm = Math.sqrt(1 - this.W * this.W);
        if (angle != 180 && angle != 0) {
            return "axis(" + angle + "," + this.X / imm + "," + this.Y / imm + "," + this.Z / imm + ")";
        }
        else if (angle == 0) {
            return "axis(" + angle + ",0,1,0)";
        }
        else {
            return "axis(180d," + this.X + "," + this.Y + "," + this.Z + ")";
        }
    };
    Quaternion.prototype.FactoringQuaternionZXY = function () {
        var result = { x: 0, y: 0, z: 0 };
        var mat = Matrix.RotationQuaternion(this);
        var sx = mat.rawElements[6];
        if (Math.abs(sx) < 1 - 1.0E-4) {
            result.x = Math.asin(sx);
            result.z = Math.atan2(-mat.rawElements[4], mat.rawElements[5]);
            result.y = Math.atan2(-mat.rawElements[2], mat.rawElements[10]);
        }
        else {
            result.y = 0;
            result.x = Math.PI / 2 * sx;
            result.z = Math.atan2(mat.rawElements[1], mat.rawElements[0]);
        }
        return result;
    };
    Quaternion.prototype.FactoringQuaternionXYZ = function () {
        var result = { x: 0, y: 0, z: 0 };
        var mat = Matrix.RotationQuaternion(this);
        var sy = -mat.rawElements[2];
        if (Math.abs(sy) < 1 - 1.0E-4) {
            result.x = Math.atan2(mat.rawElements[6], mat.rawElements[10]);
            result.y = Math.asin(sy);
            result.z = Math.atan2(mat.rawElements[1], mat.rawElements[0]);
        }
        else {
            result.x = 0;
            result.y = Math.PI / 2 * sy;
            result.z = Math.atan2(-mat.rawElements[4], mat.rawElements[5]);
        }
        return result;
    };
    return Quaternion;
})(JThreeObject);
module.exports = Quaternion;

},{"../Base/JThreeObject":9,"./Matrix":229,"./Vector3":235,"gl-matrix":299}],233:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var jThreeObject = require("../Base/JThreeObject");
var Rectangle = (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(left, top, width, height) {
        _super.call(this);
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }
    Object.defineProperty(Rectangle.prototype, "Left", {
        get: function () {
            return this.left;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "Right", {
        get: function () {
            return this.left + this.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "Top", {
        get: function () {
            return this.top;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "Bottom", {
        get: function () {
            return this.top + this.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "Width", {
        get: function () {
            return this.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "Height", {
        get: function () {
            return this.height;
        },
        enumerable: true,
        configurable: true
    });
    Rectangle.prototype.contains = function (x, y) {
        return this.Left <= x && this.Right >= x && this.Top <= y && this.Bottom >= y;
    };
    Rectangle.prototype.toString = function () {
        return "Rectangle(" + this.left + "," + this.top + "-" + this.Right + "," + this.Bottom + ")";
    };
    Rectangle.Equals = function (r1, r2) {
        return r1.Left === r2.Left && r1.Right === r2.Right && r1.Top === r2.Top && r1.Bottom === r2.Bottom;
    };
    Rectangle.SizeEquals = function (r1, r2) {
        return r1.Width === r2.Width && r1.Height === r2.Height;
    };
    return Rectangle;
})(jThreeObject);
module.exports = Rectangle;

},{"../Base/JThreeObject":9}],234:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var VectorBase = require("./VectorBase");
var glm = require('gl-matrix');
var Vector2 = (function (_super) {
    __extends(Vector2, _super);
    function Vector2(x, y) {
        _super.call(this);
        if (typeof y === 'undefined') {
            this.rawElements = x;
            return;
        }
        this.rawElements = [x, y];
    }
    Object.defineProperty(Vector2, "XUnit", {
        get: function () {
            return new Vector2(1, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2, "YUnit", {
        get: function () {
            return new Vector2(0, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2, "One", {
        get: function () {
            return new Vector2(1, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2, "Zero", {
        get: function () {
            return new Vector2(0, 0);
        },
        enumerable: true,
        configurable: true
    });
    Vector2.copy = function (vec) {
        return new Vector2(vec.X, vec.Y);
    };
    Object.defineProperty(Vector2.prototype, "normalized", {
        get: function () {
            return this.multiplyWith(1 / this.magnitude);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "X", {
        get: function () {
            return this.rawElements[0];
        },
        set: function (x) {
            this.rawElements[0] = +x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "Y", {
        get: function () {
            return this.rawElements[1];
        },
        set: function (y) {
            this.rawElements[1] = +y;
        },
        enumerable: true,
        configurable: true
    });
    Vector2.dot = function (v1, v2) {
        return glm.vec2.dot(v1.rawElements, v2.rawElements);
    };
    Vector2.add = function (v1, v2) {
        var newVec = glm.vec2.create();
        return new Vector2(glm.vec2.add(newVec, v1.rawElements, v2.rawElements));
    };
    Vector2.subtract = function (v1, v2) {
        var newVec = glm.vec2.create();
        return new Vector2(glm.vec2.sub(newVec, v1.rawElements, v2.rawElements));
    };
    Vector2.multiply = function (s, v) {
        var newVec = glm.vec2.create();
        return new Vector2(glm.vec2.scale(newVec, v.rawElements, s));
    };
    Vector2.negate = function (v1) {
        return Vector2.multiply(-1, v1);
    };
    Vector2.equal = function (v1, v2) {
        return VectorBase.elementEqual(v1, v2);
    };
    Vector2.normalize = function (v1) {
        var newVec = glm.vec2.create();
        return new Vector2(glm.vec2.normalize(newVec, v1.rawElements));
    };
    Vector2.min = function (v1, v2) {
        return new Vector2(VectorBase.fromGenerationFunction(v1, v2, function (i, v1, v2) { return Math.min(v1.rawElements[i], v2.rawElements[i]); }));
    };
    Vector2.max = function (v1, v2) {
        return new Vector2(VectorBase.fromGenerationFunction(v1, v2, function (i, v1, v2) { return Math.max(v1.rawElements[i], v2.rawElements[i]); }));
    };
    Vector2.angle = function (v1, v2) {
        return Math.acos(Vector2.dot(v1.normalized, v2.normalized));
    };
    Vector2.prototype.dotWith = function (v) {
        return Vector2.dot(this, v);
    };
    Vector2.prototype.addWith = function (v) {
        return Vector2.add(this, v);
    };
    Vector2.prototype.subtractWith = function (v) {
        return Vector2.subtract(v, this);
    };
    Vector2.prototype.multiplyWith = function (s) {
        return Vector2.multiply(s, this);
    };
    Vector2.prototype.negateThis = function () {
        return Vector2.negate(this);
    };
    Vector2.prototype.equalWith = function (v) {
        return Vector2.equal(this, v);
    };
    Vector2.prototype.normalizeThis = function () {
        return Vector2.normalize(this);
    };
    Vector2.prototype.toString = function () {
        return "Vector2(x=" + this.X + "},y=" + this.Y + ")";
    };
    Object.defineProperty(Vector2.prototype, "ElementCount", {
        get: function () { return 2; },
        enumerable: true,
        configurable: true
    });
    Vector2.prototype.toMathematicaString = function () {
        return "{" + this.X + "," + this.Y + "}";
    };
    return Vector2;
})(VectorBase);
module.exports = Vector2;

},{"./VectorBase":237,"gl-matrix":299}],235:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var VectorBase = require("./VectorBase");
var glm = require('gl-matrix');
var Vector3 = (function (_super) {
    __extends(Vector3, _super);
    function Vector3(x, y, z) {
        _super.call(this);
        if (typeof y === 'undefined') {
            this.rawElements = x;
            return;
        }
        this.rawElements = [x, y, z];
    }
    Object.defineProperty(Vector3, "XUnit", {
        get: function () {
            return new Vector3(1, 0, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3, "YUnit", {
        get: function () {
            return new Vector3(0, 1, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3, "ZUnit", {
        get: function () {
            return new Vector3(0, 0, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3, "Zero", {
        get: function () {
            return new Vector3(0, 0, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3, "One", {
        get: function () {
            return new Vector3(1, 1, 1);
        },
        enumerable: true,
        configurable: true
    });
    Vector3.copy = function (source) {
        return new Vector3(source.X, source.Y, source.Z);
    };
    Object.defineProperty(Vector3.prototype, "normalized", {
        get: function () {
            return this.multiplyWith(1 / this.magnitude);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3.prototype, "X", {
        get: function () {
            return this.rawElements[0];
        },
        set: function (x) {
            this.rawElements[0] = +x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3.prototype, "Y", {
        get: function () {
            return this.rawElements[1];
        },
        set: function (y) {
            this.rawElements[1] = +y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3.prototype, "Z", {
        get: function () {
            return this.rawElements[2];
        },
        set: function (z) {
            this.rawElements[2] = +z;
        },
        enumerable: true,
        configurable: true
    });
    Vector3.dot = function (v1, v2) {
        return glm.vec3.dot(v1.rawElements, v2.rawElements);
    };
    Vector3.add = function (v1, v2) {
        var newVec = glm.vec3.create();
        return new Vector3(glm.vec3.add(newVec, v1.rawElements, v2.rawElements));
    };
    Vector3.subtract = function (v1, v2) {
        var newVec = glm.vec3.create();
        return new Vector3(glm.vec3.sub(newVec, v1.rawElements, v2.rawElements));
    };
    Vector3.multiply = function (s, v) {
        var newVec = glm.vec3.create();
        return new Vector3(glm.vec3.scale(newVec, v.rawElements, s));
    };
    Vector3.negate = function (v1) {
        return Vector3.multiply(-1, v1);
    };
    Vector3.equal = function (v1, v2) {
        return VectorBase.elementEqual(v1, v2);
    };
    Vector3.normalize = function (v1) {
        var newVec = glm.vec3.create();
        return new Vector3(glm.vec3.normalize(newVec, v1.rawElements));
    };
    Vector3.cross = function (v1, v2) {
        var newVec = glm.vec3.create();
        return new Vector3(glm.vec3.cross(newVec, v1.rawElements, v2.rawElements));
    };
    Vector3.min = function (v1, v2) {
        return new Vector3(VectorBase.fromGenerationFunction(v1, v2, function (i, v1, v2) { return Math.min(v1.rawElements[i], v2.rawElements[i]); }));
    };
    Vector3.max = function (v1, v2) {
        return new Vector3(VectorBase.fromGenerationFunction(v1, v2, function (i, v1, v2) { return Math.max(v1.rawElements[i], v2.rawElements[i]); }));
    };
    Vector3.angle = function (v1, v2) {
        return Math.acos(Vector3.dot(v1.normalized, v2.normalized));
    };
    Vector3.prototype.normalizeThis = function () {
        return Vector3.normalize(this);
    };
    Vector3.prototype.dotWith = function (v) {
        return Vector3.dot(this, v);
    };
    Vector3.prototype.addWith = function (v) {
        return Vector3.add(this, v);
    };
    Vector3.prototype.subtractWith = function (v) {
        return Vector3.subtract(this, v);
    };
    Vector3.prototype.multiplyWith = function (s) {
        return Vector3.multiply(s, this);
    };
    Vector3.prototype.negateThis = function () {
        return Vector3.negate(this);
    };
    Vector3.prototype.equalWith = function (v) {
        return Vector3.equal(this, v);
    };
    Vector3.prototype.crossWith = function (v) {
        return Vector3.cross(this, v);
    };
    Vector3.prototype.toString = function () {
        return "Vector3(" + this.X + ", " + this.Y + ", " + this.Z + ")";
    };
    Object.defineProperty(Vector3.prototype, "ElementCount", {
        get: function () { return 3; },
        enumerable: true,
        configurable: true
    });
    Vector3.parse = function (str) {
        var resultVec;
        var negativeMatch = str.match(/^-n?(\(.+\))$/);
        var needNegate = false;
        if (negativeMatch) {
            needNegate = true;
            str = negativeMatch[1];
        }
        var normalizeMatch = str.match(/^n(\(.+\))$/);
        var needNormalize = false;
        if (normalizeMatch) {
            needNormalize = true;
            str = normalizeMatch[1];
        }
        str = str.match(/^n?\(?([^\)]+)\)?$/)[1];
        var strNums = str.split(/,/g);
        if (strNums.length == 1) {
            var elemNum = parseFloat(strNums[0]);
            resultVec = new Vector3(elemNum, elemNum, elemNum);
        }
        else if (strNums.length == 3) {
            resultVec = new Vector3(parseFloat(strNums[0]), parseFloat(strNums[1]), parseFloat(strNums[2]));
        }
        else {
            throw Error("passed argument was invalid");
        }
        if (needNormalize)
            resultVec = resultVec.normalizeThis();
        if (needNegate)
            resultVec = resultVec.negateThis();
        return resultVec;
    };
    Vector3.prototype.toMathematicaString = function () {
        return "{" + this.X + "," + this.Y + "," + this.Z + "}";
    };
    return Vector3;
})(VectorBase);
module.exports = Vector3;

},{"./VectorBase":237,"gl-matrix":299}],236:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var VectorBase = require("./VectorBase");
var glm = require('gl-matrix');
var Vector4 = (function (_super) {
    __extends(Vector4, _super);
    function Vector4(x, y, z, w) {
        _super.call(this);
        if (typeof y === 'undefined') {
            this.rawElements = x;
            return;
        }
        this.rawElements = [x, y, z, w];
    }
    Object.defineProperty(Vector4, "XUnit", {
        get: function () {
            return new Vector4(1, 0, 0, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector4, "YUnit", {
        get: function () {
            return new Vector4(0, 1, 0, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector4, "ZUnit", {
        get: function () {
            return new Vector4(0, 0, 1, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector4, "WUnit", {
        get: function () {
            return new Vector4(0, 0, 0, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector4, "One", {
        get: function () {
            return new Vector4(1, 1, 1, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector4, "Zero", {
        get: function () {
            return new Vector4(0, 0, 0, 0);
        },
        enumerable: true,
        configurable: true
    });
    Vector4.copy = function (vec) {
        return new Vector4(vec.X, vec.Y, vec.Z, vec.W);
    };
    Object.defineProperty(Vector4.prototype, "normalized", {
        get: function () {
            return this.multiplyWith(1 / this.magnitude);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector4.prototype, "X", {
        get: function () {
            return this.rawElements[0];
        },
        set: function (x) {
            this.rawElements[0] = +x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector4.prototype, "Y", {
        get: function () {
            return this.rawElements[1];
        },
        set: function (y) {
            this.rawElements[1] = +y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector4.prototype, "Z", {
        get: function () {
            return this.rawElements[2];
        },
        set: function (z) {
            this.rawElements[2] = +z;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector4.prototype, "W", {
        get: function () {
            return this.rawElements[3];
        },
        set: function (w) {
            this.rawElements[3] = +w;
        },
        enumerable: true,
        configurable: true
    });
    Vector4.dot = function (v1, v2) {
        return glm.vec4.dot(v1.rawElements, v2.rawElements);
    };
    Vector4.add = function (v1, v2) {
        var newVec = glm.vec4.create();
        return new Vector4(glm.vec4.add(newVec, v1.rawElements, v2.rawElements));
    };
    Vector4.subtract = function (v1, v2) {
        var newVec = glm.vec4.create();
        return new Vector4(glm.vec4.sub(newVec, v1.rawElements, v2.rawElements));
    };
    Vector4.multiply = function (s, v) {
        var newVec = glm.vec4.create();
        return new Vector4(glm.vec4.scale(newVec, v.rawElements, s));
    };
    Vector4.negate = function (v1) {
        return Vector4.multiply(-1, v1);
    };
    Vector4.equal = function (v1, v2) {
        return VectorBase.elementEqual(v1, v2);
    };
    Vector4.normalize = function (v1) {
        var newVec = glm.vec4.create();
        return new Vector4(glm.vec4.normalize(newVec, v1.rawElements));
    };
    Vector4.min = function (v1, v2) {
        return new Vector4(VectorBase.fromGenerationFunction(v1, v2, function (i, v1, v2) { return Math.min(v1.rawElements[i], v2.rawElements[i]); }));
    };
    Vector4.max = function (v1, v2) {
        return new Vector4(VectorBase.fromGenerationFunction(v1, v2, function (i, v1, v2) { return Math.max(v1.rawElements[i], v2.rawElements[i]); }));
    };
    Vector4.angle = function (v1, v2) {
        return Math.acos(Vector4.dot(v1.normalized, v2.normalized));
    };
    Vector4.prototype.normalizeThis = function () {
        return Vector4.normalize(this);
    };
    Vector4.prototype.dotWith = function (v) {
        return Vector4.dot(this, v);
    };
    Vector4.prototype.addWith = function (v) {
        return Vector4.add(this, v);
    };
    Vector4.prototype.subtractWith = function (v) {
        return Vector4.subtract(v, this);
    };
    Vector4.prototype.multiplyWith = function (s) {
        return Vector4.multiply(s, this);
    };
    Vector4.prototype.negateThis = function () {
        return Vector4.negate(this);
    };
    Vector4.prototype.equalWith = function (v) {
        return Vector4.equal(this, v);
    };
    Object.defineProperty(Vector4.prototype, "ElementCount", {
        get: function () { return 4; },
        enumerable: true,
        configurable: true
    });
    Vector4.prototype.toString = function () {
        return "Vector4(" + this.X + ", " + this.Y + ", " + this.Z + "," + this.W + ")";
    };
    Vector4.prototype.toMathematicaString = function () {
        return "{" + this.X + "," + this.Y + "," + this.Z + "," + this.W + "}";
    };
    return Vector4;
})(VectorBase);
module.exports = Vector4;

},{"./VectorBase":237,"gl-matrix":299}],237:[function(require,module,exports){
var VectorBase = (function () {
    function VectorBase() {
        this.magnitudeSquaredCache = -1;
        this.magnitudeCache = -1;
    }
    Object.defineProperty(VectorBase.prototype, "sqrMagnitude", {
        get: function () {
            if (this.magnitudeSquaredCache < 0) {
                var sum = 0;
                var r = this.rawElements;
                for (var i = 0; i < this.ElementCount; i++) {
                    sum += r[i] * r[i];
                }
                this.magnitudeSquaredCache = sum;
            }
            return this.magnitudeSquaredCache;
        },
        enumerable: true,
        configurable: true
    });
    VectorBase.elementEqual = function (v1, v2) {
        if (v1.ElementCount !== v2.ElementCount)
            return false;
        for (var i = 0; i < v1.ElementCount; i++) {
            if (v1.rawElements[i] !== v2.rawElements[i])
                return false;
        }
        return true;
    };
    VectorBase.fromGenerationFunction = function (v1, v2, gen) {
        var f = new Float32Array(v1.ElementCount);
        for (var i = 0; i < f.length; i++) {
            f[i] = gen(i, v1, v2);
        }
        return f;
    };
    Object.defineProperty(VectorBase.prototype, "magnitude", {
        get: function () {
            if (this.magnitudeCache < 0) {
                this.magnitudeCache = Math.sqrt(this.sqrMagnitude);
            }
            return this.magnitudeCache;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VectorBase.prototype, "ElementCount", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    return VectorBase;
})();
module.exports = VectorBase;

},{}],238:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Material = require('../../../Core/Materials/Material');
var Matrix = require("../../../Math/Matrix");
var Vector4 = require("../../../Math/Vector4");
var PMXMaterialParamContainer = require("./../PMXMaterialMorphParamContainer");
var PMXGBufferMaterial = (function (_super) {
    __extends(PMXGBufferMaterial, _super);
    function PMXGBufferMaterial(material) {
        _super.call(this);
        this.associatedMaterial = material;
        var vs = require('../../Shader/PMXGBufferVertex.glsl');
        var fs = require('../../Shader/PMXPrimaryGBufferFragment.glsl');
        this.primaryProgram = this.loadProgram("jthree.shaders.vertex.pmx.gbuffer", "jthree.shaders.fragment.pmx.gbuffer", "jthree.programs.pmx.gbuffer", vs, fs);
        var fs = require('../../Shader/PMXSecoundaryGBufferFragment.glsl');
        this.secoundaryProgram = this.loadProgram("jthree.shaders.vertex.pmx.gbuffer.s", "jthree.shaders.fragment.gbuffer.s", "jthree.programs.pmx.gbuffer.s", vs, fs);
        fs = require('../../Shader/PMXThirdGBufferFragment.glsl');
        this.thirdProgram = this.loadProgram("jthree.shaders.vertex.pmx.gbuffer.t", "jthree.shaders.fragment.gbuffer.t", "jthree.programs.pmx.gbuffer.t", vs, fs);
        this.setLoaded();
    }
    Object.defineProperty(PMXGBufferMaterial.prototype, "VerticiesCount", {
        get: function () {
            return this.associatedMaterial.VerticiesCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PMXGBufferMaterial.prototype, "VerticiesOffset", {
        get: function () {
            return this.associatedMaterial.VerticiesOffset;
        },
        enumerable: true,
        configurable: true
    });
    PMXGBufferMaterial.prototype.configureMaterial = function (scene, renderStage, object, texs, techniqueIndex, passIndex) {
        if (!this.primaryProgram || this.associatedMaterial.Diffuse.A < 1.0E-3)
            return;
        var renderer = renderStage.Renderer;
        _super.prototype.configureMaterial.call(this, scene, renderStage, object, texs, techniqueIndex, passIndex);
        switch (techniqueIndex) {
            case 0:
                this.configurePrimaryBuffer(scene, renderer, object, texs, techniqueIndex);
                break;
            case 1:
                this.configureSecoundaryBuffer(scene, renderer, object, texs, techniqueIndex);
                break;
            case 2:
                this.configureThirdBuffer(scene, renderer, object, texs, techniqueIndex);
                break;
        }
        object.Geometry.bindIndexBuffer(renderer.ContextManager);
    };
    PMXGBufferMaterial.prototype.configurePrimaryBuffer = function (scene, renderer, object, texs, pass) {
        var geometry = object.Geometry;
        var programWrapper = this.primaryProgram.getForContext(renderer.ContextManager);
        var v = Matrix.multiply(renderer.Camera.projectionMatrix, renderer.Camera.viewMatrix);
        programWrapper.register({
            attributes: {
                position: geometry.PositionBuffer,
                normal: geometry.NormalBuffer,
                boneWeights: geometry.boneWeightBuffer,
                boneIndicies: geometry.boneIndexBuffer,
                uv: geometry.UVBuffer
            },
            uniforms: {
                boneMatricies: { type: "texture", value: this.associatedMaterial.ParentModel.skeleton.MatrixTexture, register: 0 },
                matVP: { type: "matrix", value: v },
                matV: { type: "matrix", value: renderer.Camera.viewMatrix },
                specularCoefficient: { type: "float", value: this.associatedMaterial.Specular.W },
                boneCount: { type: "float", value: this.associatedMaterial.ParentModel.skeleton.BoneCount }
            }
        });
    };
    PMXGBufferMaterial.prototype.configureSecoundaryBuffer = function (cene, renderer, object, texs, pass) {
        var geometry = object.Geometry;
        var programWrapper = this.secoundaryProgram.getForContext(renderer.ContextManager);
        var v = Matrix.multiply(renderer.Camera.projectionMatrix, renderer.Camera.viewMatrix);
        programWrapper.register({
            attributes: {
                position: geometry.PositionBuffer,
                normal: geometry.NormalBuffer,
                boneWeights: geometry.boneWeightBuffer,
                boneIndicies: geometry.boneIndexBuffer,
                uv: geometry.UVBuffer
            },
            uniforms: {
                boneMatricies: { type: "texture", value: this.associatedMaterial.ParentModel.skeleton.MatrixTexture, register: 0 },
                matVP: { type: "matrix", value: v },
                matV: { type: "matrix", value: renderer.Camera.viewMatrix },
                specularCoefficient: { type: "float", value: this.associatedMaterial.Specular.W },
                boneCount: { type: "float", value: this.associatedMaterial.ParentModel.skeleton.BoneCount },
                diffuse: {
                    type: "vector",
                    value: PMXMaterialParamContainer.calcMorphedVectorValue(this.associatedMaterial.Diffuse.toVector(), this.associatedMaterial.addMorphParam, this.associatedMaterial.mulMorphParam, function (t) { return t.diffuse; }, 4)
                },
                texture: {
                    type: "texture",
                    value: this.associatedMaterial.Texture,
                    register: 1
                },
                sphere: {
                    type: "texture",
                    value: this.associatedMaterial.Sphere,
                    register: 2
                },
                textureUsed: {
                    type: "integer",
                    value: this.associatedMaterial.Texture == null || this.associatedMaterial.Texture.ImageSource == null ? 0 : 1
                },
                sphereMode: {
                    type: "integer",
                    value: this.associatedMaterial.Sphere == null || this.associatedMaterial.Sphere.ImageSource == null ? 0 : this.associatedMaterial.SphereMode
                },
                addTextureCoefficient: { type: "vector", value: new Vector4(this.associatedMaterial.addMorphParam.textureCoeff) },
                mulTextureCoefficient: { type: "vector", value: new Vector4(this.associatedMaterial.mulMorphParam.textureCoeff) },
                addSphereCoefficient: { type: "vector", value: new Vector4(this.associatedMaterial.addMorphParam.sphereCoeff) },
                mulSphereCoefficient: { type: "vector", value: new Vector4(this.associatedMaterial.mulMorphParam.sphereCoeff) }
            }
        });
    };
    PMXGBufferMaterial.prototype.configureThirdBuffer = function (cene, renderer, object, texs, pass) {
        var geometry = object.Geometry;
        var programWrapper = this.thirdProgram.getForContext(renderer.ContextManager);
        var v = Matrix.multiply(renderer.Camera.projectionMatrix, renderer.Camera.viewMatrix);
        programWrapper.register({
            attributes: {
                position: geometry.PositionBuffer,
                normal: geometry.NormalBuffer,
                boneWeights: geometry.boneWeightBuffer,
                boneIndicies: geometry.boneIndexBuffer,
                uv: geometry.UVBuffer
            },
            uniforms: {
                boneMatricies: { type: "texture", value: this.associatedMaterial.ParentModel.skeleton.MatrixTexture, register: 0 },
                matVP: { type: "matrix", value: v },
                matV: { type: "matrix", value: renderer.Camera.viewMatrix },
                boneCount: { type: "float", value: this.associatedMaterial.ParentModel.skeleton.BoneCount },
                specular: {
                    type: "vector",
                    value: PMXMaterialParamContainer.calcMorphedVectorValue(this.associatedMaterial.Specular, this.associatedMaterial.addMorphParam, this.associatedMaterial.mulMorphParam, function (t) { return t.specular; }, 3)
                }
            }
        });
    };
    Object.defineProperty(PMXGBufferMaterial.prototype, "Priorty", {
        get: function () {
            return 100;
        },
        enumerable: true,
        configurable: true
    });
    PMXGBufferMaterial.prototype.getDrawGeometryLength = function (geo) {
        return this.associatedMaterial.Diffuse.A > 0 ? this.VerticiesCount : 0;
    };
    PMXGBufferMaterial.prototype.getDrawGeometryOffset = function (geo) {
        return this.VerticiesOffset * 4;
    };
    Object.defineProperty(PMXGBufferMaterial.prototype, "MaterialGroup", {
        get: function () {
            return "jthree.materials.gbuffer";
        },
        enumerable: true,
        configurable: true
    });
    PMXGBufferMaterial.prototype.getMaterialConfig = function (pass, technique) {
        if (technique == 0) {
            return {
                blend: false,
                cull: "ccw"
            };
        }
        if (technique == 1) {
            return {
                cull: "ccw",
                blend: true
            };
        }
        else {
            return {
                cull: "ccw",
                blend: false
            };
        }
    };
    return PMXGBufferMaterial;
})(Material);
module.exports = PMXGBufferMaterial;

},{"../../../Core/Materials/Material":54,"../../../Math/Matrix":229,"../../../Math/Vector4":236,"../../Shader/PMXGBufferVertex.glsl":262,"../../Shader/PMXPrimaryGBufferFragment.glsl":265,"../../Shader/PMXSecoundaryGBufferFragment.glsl":266,"../../Shader/PMXThirdGBufferFragment.glsl":269,"./../PMXMaterialMorphParamContainer":245}],239:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Material = require('../../../Core/Materials/Material');
var Vector4 = require("../../../Math/Vector4");
var PMXHitAreaMaterial = (function (_super) {
    __extends(PMXHitAreaMaterial, _super);
    function PMXHitAreaMaterial(material) {
        _super.call(this);
        this.associatedMaterial = material;
        var vs = require('../../Shader/PMXHitAreaVertex.glsl');
        var fs = require('../../Shader/PMXHitAreaFragment.glsl');
        this.program = this.loadProgram("jthree.shaders.vertex.pmx.hitarea", "jthree.shaders.fragment.pmx.hitarea", "jthree.programs.pmx.hitarea", vs, fs);
        this.setLoaded();
    }
    Object.defineProperty(PMXHitAreaMaterial.prototype, "VerticiesCount", {
        get: function () {
            return this.associatedMaterial.VerticiesCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PMXHitAreaMaterial.prototype, "VerticiesOffset", {
        get: function () {
            return this.associatedMaterial.VerticiesOffset;
        },
        enumerable: true,
        configurable: true
    });
    PMXHitAreaMaterial.prototype.getMaterialConfig = function (pass, technique) {
        return {
            blend: false,
            cull: this.associatedMaterial.cullEnabled ? "ccw" : undefined
        };
    };
    PMXHitAreaMaterial.prototype.configureMaterial = function (scene, renderStage, object, texs, techniqueIndex, passIndex) {
        if (!this.program || this.associatedMaterial.Diffuse.A < 1.0E-3)
            return;
        _super.prototype.configureMaterial.call(this, scene, renderStage, object, texs, techniqueIndex, passIndex);
        var r = 0xFF00 & renderStage.___objectIndex;
        var g = 0x00FF & renderStage.___objectIndex;
        var b = this.associatedMaterial.materialIndex;
        var renderer = renderStage.Renderer;
        var geometry = object.Geometry;
        var light = scene.LightRegister.shadowDroppableLights[techniqueIndex];
        var programWrapper = this.program.getForContext(renderer.ContextManager);
        programWrapper.register({
            attributes: {
                position: geometry.PositionBuffer,
                boneWeights: geometry.boneWeightBuffer,
                boneIndicies: geometry.boneIndexBuffer,
            },
            uniforms: {
                boneMatricies: { type: "texture", value: this.associatedMaterial.ParentModel.skeleton.MatrixTexture, register: 0 },
                matVP: { type: "matrix", value: renderer.Camera.viewProjectionMatrix },
                boneCount: { type: "float", value: this.associatedMaterial.ParentModel.skeleton.BoneCount },
                areaIndex: { type: "vector", value: new Vector4(r / 0xFF, g / 0xFF, b / 0xFF, 1) }
            }
        });
        object.Geometry.bindIndexBuffer(renderer.ContextManager);
    };
    Object.defineProperty(PMXHitAreaMaterial.prototype, "Priorty", {
        get: function () {
            return 100;
        },
        enumerable: true,
        configurable: true
    });
    PMXHitAreaMaterial.prototype.getDrawGeometryLength = function (geo) {
        return this.associatedMaterial.Diffuse.A > 0 ? this.VerticiesCount : 0;
    };
    PMXHitAreaMaterial.prototype.getDrawGeometryOffset = function (geo) {
        return this.VerticiesOffset * 4;
    };
    Object.defineProperty(PMXHitAreaMaterial.prototype, "MaterialGroup", {
        get: function () {
            return "jthree.materials.hitarea";
        },
        enumerable: true,
        configurable: true
    });
    return PMXHitAreaMaterial;
})(Material);
module.exports = PMXHitAreaMaterial;

},{"../../../Core/Materials/Material":54,"../../../Math/Vector4":236,"../../Shader/PMXHitAreaFragment.glsl":263,"../../Shader/PMXHitAreaVertex.glsl":264}],240:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Material = require('../../../Core/Materials/Material');
var Vector4 = require('../../../Math/Vector4');
var Color4 = require("../../../Base/Color/Color4");
var Color3 = require('../../../Base/Color/Color3');
var BlendFuncParamType = require("../../../Wrapper/BlendFuncParamType");
var PmxMaterialMorphParamContainer = require('./../PMXMaterialMorphParamContainer');
var ContextComponents = require("../../../ContextComponents");
var JThreeContext = require("../../../JThreeContext");
var PMXMaterial = (function (_super) {
    __extends(PMXMaterial, _super);
    function PMXMaterial(pmx, index, offset) {
        _super.call(this);
        this.edgeColor = null;
        this.sphere = null;
        this.texture = null;
        this.toon = null;
        this.textureCaches = [];
        this.addMorphParam = new PmxMaterialMorphParamContainer(1);
        this.mulMorphParam = new PmxMaterialMorphParamContainer(0);
        this.parentModel = pmx;
        this.pmxData = pmx.ModelData;
        this.materialIndex = index;
        var materialData = this.pmxData.Materials[index];
        this.verticiesCount = materialData.vertexCount;
        this.verticiesOffset = offset;
        this.Name = materialData.materialName;
        this.cullEnabled = !((materialData.drawFlag & 0x01) > 0);
        this.ambient = new Color3(materialData.ambient[0], materialData.ambient[1], materialData.ambient[2]);
        this.diffuse = new Color4(materialData.diffuse[0], materialData.diffuse[1], materialData.diffuse[2], materialData.diffuse[3]);
        if ((materialData.drawFlag & 0x10) > 0)
            this.edgeColor = new Color4(materialData.edgeColor[0], materialData.edgeColor[1], materialData.edgeColor[2], materialData.edgeColor[3]);
        this.specular = new Vector4(materialData.specular);
        this.edgeSize = materialData.edgeSize;
        this.sphereMode = materialData.sphereMode;
        var vs = require('../../Shader/PMXVertex.glsl');
        var fs = require('../../Shader/PMXFragment.glsl');
        this.program = this.loadProgram("jthree.shaders.vertex.pmx.basic", "jthree.shaders.fragment.pmx.basic", "jthree.programs.pmx.basic", vs, fs);
        var vs = require('../../Shader/PMXEdgeVertex.glsl');
        var fs = require('../../Shader/PMXEdgeFragment.glsl');
        this.edgeProgram = this.loadProgram("jthree.shaders.vertex.pmx.edge", "jthree.shaders.fragment.pmx.edge", "jthree.programs.pmx.edge", vs, fs);
        this.sphere = this.loadPMXTexture(materialData.sphereTextureIndex, "sphere");
        this.texture = this.loadPMXTexture(materialData.textureIndex, "texture");
        if (materialData.sharedToonFlag == 0) {
            this.toon = this.loadPMXTexture(materialData.targetToonIndex, "toon");
        }
        this.setLoaded();
    }
    PMXMaterial.prototype.getMaterialConfig = function (pass, technique) {
        if (pass == 0) {
            return {
                cull: this.cullEnabled ? "ccw" : undefined,
                blend: true
            };
        }
        else {
            return {
                cull: "cw"
            };
        }
    };
    Object.defineProperty(PMXMaterial.prototype, "VerticiesCount", {
        get: function () {
            return this.verticiesCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PMXMaterial.prototype, "VerticiesOffset", {
        get: function () {
            return this.verticiesOffset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PMXMaterial.prototype, "ParentModel", {
        get: function () {
            return this.parentModel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PMXMaterial.prototype, "Diffuse", {
        get: function () {
            return this.diffuse;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PMXMaterial.prototype, "Texture", {
        get: function () {
            return this.texture;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PMXMaterial.prototype, "Sphere", {
        get: function () {
            return this.sphere;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PMXMaterial.prototype, "SphereMode", {
        get: function () {
            return this.sphereMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PMXMaterial.prototype, "Specular", {
        get: function () {
            return this.specular;
        },
        enumerable: true,
        configurable: true
    });
    PMXMaterial.prototype.getPassCount = function (techniqueIndex) {
        return this.edgeColor == null ? 1 : 2;
    };
    Object.defineProperty(PMXMaterial.prototype, "SelfShadow", {
        get: function () {
            return (this.pmxData.Materials[this.materialIndex].drawFlag & 0x04) > 0;
        },
        enumerable: true,
        configurable: true
    });
    PMXMaterial.prototype.configureMaterial = function (scene, renderStage, object, texs, techniqueIndex, passIndex) {
        var renderer = renderStage.Renderer;
        _super.prototype.configureMaterial.call(this, scene, renderStage, object, texs, techniqueIndex, passIndex);
        if (passIndex == 1) {
            this.configureEdgeMaterial(renderer, object);
            return;
        }
        if (!this.program)
            return;
        renderer.GL.blendFunc(BlendFuncParamType.SrcAlpha, BlendFuncParamType.OneMinusSrcAlpha);
        var geometry = object.Geometry;
        var programWrapper = this.program.getForContext(renderer.ContextManager);
        var v = object.Transformer.calculateMVPMatrix(renderer);
        programWrapper.register({
            attributes: {
                position: geometry.PositionBuffer,
                normal: geometry.NormalBuffer,
                uv: geometry.UVBuffer,
                boneWeights: geometry.boneWeightBuffer,
                boneIndicies: geometry.boneIndexBuffer
            },
            uniforms: {
                dlight: {
                    type: "texture",
                    value: texs["DLIGHT"],
                    register: 0
                }, slight: {
                    type: "texture",
                    value: texs["SLIGHT"],
                    register: 5
                },
                u_texture: {
                    type: "texture",
                    value: this.texture,
                    register: 1
                },
                u_toon: {
                    type: "texture",
                    value: this.toon,
                    register: 2
                },
                u_sphere: {
                    type: "texture",
                    value: this.sphere,
                    register: 3
                },
                u_boneMatricies: {
                    type: "texture",
                    value: this.parentModel.skeleton.MatrixTexture,
                    register: 4
                },
                u_textureUsed: {
                    type: "integer",
                    value: this.texture == null || this.texture.ImageSource == null ? 0 : 1
                },
                u_sphereMode: {
                    type: "integer",
                    value: this.sphere == null || this.sphere.ImageSource == null ? 0 : this.sphereMode
                },
                u_toonFlag: {
                    type: "integer",
                    value: this.toon == null || this.toon.ImageSource == null ? 0 : 1
                },
                u_ambient: {
                    type: "vector",
                    value: PmxMaterialMorphParamContainer.calcMorphedVectorValue(this.ambient.toVector(), this.addMorphParam, this.mulMorphParam, function (t) { return t.ambient; }, 3)
                },
                u_diffuse: {
                    type: "vector",
                    value: PmxMaterialMorphParamContainer.calcMorphedVectorValue(this.diffuse.toVector(), this.addMorphParam, this.mulMorphParam, function (t) { return t.diffuse; }, 4)
                },
                u_addTexCoeff: { type: "vector", value: new Vector4(this.addMorphParam.textureCoeff) },
                u_mulTexCoeff: { type: "vector", value: new Vector4(this.mulMorphParam.textureCoeff) },
                u_addSphereCoeff: { type: "vector", value: new Vector4(this.addMorphParam.sphereCoeff) },
                u_mulSphereCoeff: { type: "vector", value: new Vector4(this.mulMorphParam.sphereCoeff) },
                u_addToonCoeff: { type: "vector", value: new Vector4(this.addMorphParam.toonCoeff) },
                u_mulToonCoeff: { type: "vector", value: new Vector4(this.mulMorphParam.toonCoeff) },
                matMVP: { type: "matrix", value: v },
                matVP: { type: "matrix", value: renderer.Camera.viewProjectionMatrix },
                u_boneCount: {
                    type: "float",
                    value: this.parentModel.skeleton.BoneCount
                },
                ambientCoefficient: {
                    type: "vector",
                    value: scene.sceneAmbient.toVector()
                }
            }
        });
        geometry.bindIndexBuffer(renderer.ContextManager);
    };
    PMXMaterial.prototype.configureEdgeMaterial = function (renderer, object) {
        if (!this.program)
            return;
        var geometry = object.Geometry;
        var programWrapper = this.edgeProgram.getForContext(renderer.ContextManager);
        programWrapper.register({
            attributes: {
                position: geometry.PositionBuffer,
                edgeScaling: geometry.edgeSizeBuffer,
                boneWeights: geometry.boneWeightBuffer,
                boneIndicies: geometry.boneIndexBuffer
            },
            uniforms: {
                u_boneMatricies: {
                    type: "texture", register: 0, value: this.ParentModel.skeleton.MatrixTexture
                },
                matVP: {
                    type: "matrix", value: renderer.Camera.viewProjectionMatrix
                },
                u_edgeSize: {
                    type: "float", value: PmxMaterialMorphParamContainer.calcMorphedSingleValue(this.edgeSize, this.addMorphParam, this.mulMorphParam, function (t) { return t.edgeSize; })
                },
                u_edgeColor: {
                    type: "vector", value: PmxMaterialMorphParamContainer.calcMorphedVectorValue(this.edgeColor.toVector(), this.addMorphParam, this.mulMorphParam, function (t) { return t.edgeColor; }, 4)
                },
                u_boneCount: {
                    type: "float", value: this.parentModel.skeleton.BoneCount
                }
            }
        });
        geometry.bindIndexBuffer(renderer.ContextManager);
    };
    PMXMaterial.prototype.loadPMXTexture = function (index, prefix) {
        if (index < 0)
            return null;
        var rm = JThreeContext.getContextComponent(ContextComponents.ResourceManager);
        var resourceName = this.pmxData.Header.modelName + "jthree.pmx." + prefix + "." + index;
        if (rm.getTexture(resourceName)) {
            return rm.getTexture(resourceName);
        }
        else {
            var texture = rm.createTextureWithSource(resourceName, null);
            this.loadImage(index).then(function (t) {
                texture.ImageSource = t;
            });
            return texture;
        }
    };
    PMXMaterial.prototype.loadImage = function (index) {
        return this.parentModel.pmxTextureManager.loadTexture(index);
    };
    Object.defineProperty(PMXMaterial.prototype, "Priorty", {
        get: function () {
            return 100 + this.materialIndex;
        },
        enumerable: true,
        configurable: true
    });
    PMXMaterial.prototype.getDrawGeometryLength = function (geo) {
        return this.diffuse.A > 0 ? this.VerticiesCount : 0;
    };
    PMXMaterial.prototype.getDrawGeometryOffset = function (geo) {
        return this.VerticiesOffset * 4;
    };
    return PMXMaterial;
})(Material);
module.exports = PMXMaterial;

},{"../../../Base/Color/Color3":3,"../../../Base/Color/Color4":4,"../../../ContextComponents":12,"../../../Core/Materials/Material":54,"../../../JThreeContext":226,"../../../Math/Vector4":236,"../../../Wrapper/BlendFuncParamType":276,"../../Shader/PMXEdgeFragment.glsl":259,"../../Shader/PMXEdgeVertex.glsl":260,"../../Shader/PMXFragment.glsl":261,"../../Shader/PMXVertex.glsl":270,"./../PMXMaterialMorphParamContainer":245}],241:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Material = require('../../../Core/Materials/Material');
var PMXShadowMapMaterial = (function (_super) {
    __extends(PMXShadowMapMaterial, _super);
    function PMXShadowMapMaterial(material) {
        _super.call(this);
        this.associatedMaterial = material;
        var vs = require('../../Shader/PMXShadowMapVertex.glsl');
        var fs = require('../../Shader/PMXShadowMapFragment.glsl');
        this.program = this.loadProgram("jthree.shaders.vertex.pmx.shadowmap", "jthree.shaders.fragment.pmx.shadowmap", "jthree.programs.pmx.shadowmap", vs, fs);
        this.setLoaded();
    }
    Object.defineProperty(PMXShadowMapMaterial.prototype, "VerticiesCount", {
        get: function () {
            return this.associatedMaterial.VerticiesCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PMXShadowMapMaterial.prototype, "VerticiesOffset", {
        get: function () {
            return this.associatedMaterial.VerticiesOffset;
        },
        enumerable: true,
        configurable: true
    });
    PMXShadowMapMaterial.prototype.getMaterialConfig = function (pass, technique) {
        return {
            blend: false,
            cull: this.associatedMaterial.cullEnabled ? "ccw" : undefined
        };
    };
    PMXShadowMapMaterial.prototype.configureMaterial = function (scene, renderStage, object, texs, techniqueIndex, passIndex) {
        if (!this.program || this.associatedMaterial.Diffuse.A < 1.0E-3)
            return;
        _super.prototype.configureMaterial.call(this, scene, renderStage, object, texs, techniqueIndex, passIndex);
        var renderer = renderStage.Renderer;
        var geometry = object.Geometry;
        var light = scene.LightRegister.shadowDroppableLights[techniqueIndex];
        var programWrapper = this.program.getForContext(renderer.ContextManager);
        programWrapper.register({
            attributes: {
                position: geometry.PositionBuffer,
                boneWeights: geometry.boneWeightBuffer,
                boneIndicies: geometry.boneIndexBuffer,
            },
            uniforms: {
                boneMatricies: { type: "texture", value: this.associatedMaterial.ParentModel.skeleton.MatrixTexture, register: 0 },
                matLVP: { type: "matrix", value: light.matLightViewProjection },
                boneCount: { type: "float", value: this.associatedMaterial.ParentModel.skeleton.BoneCount }
            }
        });
        object.Geometry.bindIndexBuffer(renderer.ContextManager);
    };
    Object.defineProperty(PMXShadowMapMaterial.prototype, "Priorty", {
        get: function () {
            return 100;
        },
        enumerable: true,
        configurable: true
    });
    PMXShadowMapMaterial.prototype.getDrawGeometryLength = function (geo) {
        return this.associatedMaterial.Diffuse.A > 0 ? this.VerticiesCount : 0;
    };
    PMXShadowMapMaterial.prototype.getDrawGeometryOffset = function (geo) {
        return this.VerticiesOffset * 4;
    };
    Object.defineProperty(PMXShadowMapMaterial.prototype, "MaterialGroup", {
        get: function () {
            return "jthree.materials.shadowmap";
        },
        enumerable: true,
        configurable: true
    });
    return PMXShadowMapMaterial;
})(Material);
module.exports = PMXShadowMapMaterial;

},{"../../../Core/Materials/Material":54,"../../Shader/PMXShadowMapFragment.glsl":267,"../../Shader/PMXShadowMapVertex.glsl":268}],242:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SceneObject = require("../../Core/SceneObject");
var PMXBoneTransformer = require("./PMXBoneTransformer");
var Vector3 = require("../../Math/Vector3");
var PMXBone = (function (_super) {
    __extends(PMXBone, _super);
    function PMXBone(model, skeleton, boneIndex) {
        _super.call(this, new PMXBoneTransformer(this, model, boneIndex));
        this.targetModel = model;
        this.targetSkeleton = skeleton;
        this.boneIndex = boneIndex;
        this.name = this.TargetBoneData.boneName;
    }
    Object.defineProperty(PMXBone.prototype, "TargetBoneData", {
        get: function () {
            return this.targetModel.ModelData.Bones[this.boneIndex];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PMXBone.prototype, "IsRootBone", {
        get: function () {
            return this.TargetBoneData.parentBoneIndex == -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PMXBone.prototype, "OrderCriteria", {
        get: function () {
            var latex = this.targetModel.ModelData.Bones.length;
            return this.boneIndex + this.TargetBoneData.transformLayer * latex + (this.AfterPhysics ? latex * latex : 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PMXBone.prototype, "AfterPhysics", {
        get: function () {
            return (this.TargetBoneData.boneFlag & 0x1000) > 0;
        },
        enumerable: true,
        configurable: true
    });
    PMXBone.prototype.boneDictionaryConstructed = function () {
        if (this.IsRootBone) {
            this.targetModel.addChild(this);
        }
        else {
            this.targetSkeleton.getBoneByIndex(this.TargetBoneData.parentBoneIndex).addChild(this);
        }
        this.Transformer.LocalOrigin = new Vector3(this.TargetBoneData.position);
        var transformer = this.transformer;
        if (transformer.IsIKBone)
            for (var i = 0; i < this.TargetBoneData.ikLinkCount; i++)
                this.targetSkeleton.getBoneByIndex(this.TargetBoneData.ikLinks[i].ikLinkBoneIndex).transformer.isIKLink = true;
    };
    PMXBone.prototype.updateBoneTransform = function () {
        var t = this.transformer;
        t.updateTransformForPMX();
    };
    PMXBone.prototype.structureToString = function (layer) {
        var result = "";
        for (var i = 0; i < layer; i++)
            result += "  ";
        result += this.toString() + "\n";
        var arr = this.Children;
        for (var index = 0; index < arr.length; index++) {
            if (typeof arr[index] !== "undefined")
                result += arr[index].structureToString(layer + 1);
        }
        return result;
    };
    PMXBone.prototype.toString = function () {
        return this.TargetBoneData.boneName + "(" + this.TargetBoneData.boneNameEn + ")";
    };
    PMXBone.prototype.applyMatrixToBuffer = function (buffer) {
        for (var i = 0; i < 16; i++) {
            buffer[16 * this.boneIndex + i] = this.Transformer.LocalToGlobal.rawElements[i];
        }
    };
    return PMXBone;
})(SceneObject);
module.exports = PMXBone;

},{"../../Core/SceneObject":108,"../../Math/Vector3":235,"./PMXBoneTransformer":243}],243:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Transformer = require('../../Core/Transform/Transformer');
var glm = require('gl-matrix');
var Quaternion = require('../../Math/Quaternion');
var Vector3 = require('../../Math/Vector3');
var Matrix = require('../../Math/Matrix');
var PMXBoneTransformer = (function (_super) {
    __extends(PMXBoneTransformer, _super);
    function PMXBoneTransformer(sceneObj, pmx, index) {
        _super.call(this, sceneObj);
        this.ikLinkRotation = Quaternion.Identity;
        this.userRotation = Quaternion.Identity;
        this.userTranslation = Vector3.Zero;
        this.morphRotation = Quaternion.Identity;
        this.morphTranslation = Vector3.Zero;
        this.providingRotation = Quaternion.Identity;
        this.providingTranslation = Vector3.Zero;
        this.isIKLink = false;
        this.transformUpdated = false;
        this.pmx = pmx;
        this.boneIndex = index;
    }
    Object.defineProperty(PMXBoneTransformer.prototype, "PMXModelData", {
        get: function () {
            return this.pmx.ModelData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PMXBoneTransformer.prototype, "BoneData", {
        get: function () {
            return this.PMXModelData.Bones[this.boneIndex];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PMXBoneTransformer.prototype, "ProvidingBone", {
        get: function () {
            return this.pmx.skeleton.getBoneByIndex(this.BoneData.providingBoneIndex);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PMXBoneTransformer.prototype, "ProvidingBoneTransformer", {
        get: function () {
            return this.ProvidingBone.Transformer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PMXBoneTransformer.prototype, "IsLocalProvidingBone", {
        get: function () {
            return (this.BoneData.boneFlag & 0x0080) > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PMXBoneTransformer.prototype, "IsRotationProvidingBone", {
        get: function () {
            return (this.BoneData.boneFlag & 0x0100) > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PMXBoneTransformer.prototype, "IsTranslationProvidingBone", {
        get: function () {
            return (this.BoneData.boneFlag & 0x0200) > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PMXBoneTransformer.prototype, "IsIKBone", {
        get: function () {
            return (this.BoneData.boneFlag & 0x0020) > 0;
        },
        enumerable: true,
        configurable: true
    });
    PMXBoneTransformer.prototype.updateTransform = function () {
        _super.prototype.updateTransform.call(this);
    };
    PMXBoneTransformer.prototype.updateTransformForPMX = function () {
        if (this.pmx == null)
            return;
        this.updateLocalTranslation();
        if (this.IsIKBone && this.pmx.skeleton) {
            this.applyCCDIK();
        }
        else {
            this.updateLocalRotation();
            _super.prototype.updateTransform.call(this);
        }
    };
    PMXBoneTransformer.prototype.updateLocalRotation = function () {
        glm.quat.identity(this.Rotation.rawElements);
        if (this.IsRotationProvidingBone) {
            if (this.IsLocalProvidingBone) {
                console.error("Local providing is not implemented yet!");
            }
            if (this.ProvidingBoneTransformer.isIKLink) {
                glm.quat.slerp(this.Rotation.rawElements, this.Rotation.rawElements, this.ProvidingBoneTransformer.ikLinkRotation.rawElements, this.BoneData.providingRate);
            }
        }
        glm.quat.mul(this.Rotation.rawElements, this.Rotation.rawElements, this.userRotation.rawElements);
        glm.quat.mul(this.Rotation.rawElements, this.Rotation.rawElements, this.morphRotation.rawElements);
        if (this.IsRotationProvidingBone) {
            glm.quat.copy(this.providingRotation.rawElements, this.Rotation.rawElements);
        }
        glm.quat.mul(this.Rotation.rawElements, this.Rotation.rawElements, this.ikLinkRotation.rawElements);
    };
    PMXBoneTransformer.prototype.updateLocalTranslation = function () {
        this.Position.rawElements[0] = 0;
        this.Position.rawElements[1] = 0;
        this.Position.rawElements[2] = 0;
        if (this.IsTranslationProvidingBone) {
            if (this.IsLocalProvidingBone) {
                console.error("Local providing is not implemented yet!");
            }
            glm.vec3.lerp(this.Position.rawElements, this.Position.rawElements, this.ProvidingBone.Transformer.Position.rawElements, this.BoneData.providingRate);
        }
        glm.vec3.add(this.Position.rawElements, this.Position.rawElements, this.userTranslation.rawElements);
        glm.vec3.add(this.Position.rawElements, this.Position.rawElements, this.morphTranslation.rawElements);
        if (this.IsTranslationProvidingBone) {
            glm.vec3.copy(this.providingTranslation.rawElements, this.Position.rawElements);
        }
    };
    PMXBoneTransformer.prototype.applyCCDIK = function () {
        for (var i = 0; i < this.BoneData.ikLinkCount; i++) {
            var link = this.getIkLinkTransformerByIndex(i);
            link.ikLinkRotation = Quaternion.Identity;
            link.updateTransformForPMX();
        }
        for (var i = 0; i < this.BoneData.ikLoopCount; i++) {
            this.CCDIKOperation(i);
        }
    };
    PMXBoneTransformer.prototype.CCDIKOperation = function (it) {
        var effector = this.PMXModelData.Bones[this.BoneData.ikTargetBoneIndex];
        var effectorTransformer = this.pmx.skeleton.getBoneByIndex(this.BoneData.ikTargetBoneIndex).Transformer;
        var TargetGlobalPos = Matrix.transformPoint(this.LocalToGlobal, this.LocalOrigin);
        for (var i = 0; i < this.BoneData.ikLinkCount; i++) {
            var ikLinkData = this.BoneData.ikLinks[i];
            var ikLinkTransform = this.getIkLinkTransformerByIndex(i);
            var link2Effector = this.getLink2Effector(ikLinkTransform, effectorTransformer);
            var link2Target = this.getLink2Target(ikLinkTransform, TargetGlobalPos);
            this.ikLinkCalc(ikLinkTransform, link2Effector, link2Target, this.BoneData.ikLimitedRotation, ikLinkData, it);
        }
    };
    PMXBoneTransformer.prototype.getLink2Effector = function (link, effector) {
        var ToLinkLocal = Matrix.inverse(link.LocalToGlobal);
        var ep = effector.LocalOrigin;
        var local2effectorLocal = Matrix.multiply(ToLinkLocal, effector.LocalToGlobal);
        var effectorPos = Matrix.transformPoint(local2effectorLocal, ep);
        return effectorPos.subtractWith(link.LocalOrigin).normalizeThis();
    };
    PMXBoneTransformer.prototype.getLink2Target = function (link, tp) {
        var ToLinkLocal = Matrix.inverse(link.LocalToGlobal);
        var effectorPos = Matrix.transformPoint(ToLinkLocal, tp);
        return effectorPos.subtractWith(link.LocalOrigin).normalizeThis();
    };
    PMXBoneTransformer.prototype.ikLinkCalc = function (link, effector, target, rotationLimit, ikLink, it) {
        var dot = Vector3.dot(effector, target);
        if (dot > 1.0)
            dot = 1.0;
        var rotationAngle = this.clampFloat(Math.acos(dot), rotationLimit);
        if (isNaN(rotationAngle)) {
            return;
        }
        if (rotationAngle <= 1.0e-3) {
            return;
        }
        var rotationAxis = Vector3.cross(effector, target).normalizeThis();
        var rotation = Quaternion.AngleAxis(rotationAngle, rotationAxis);
        link.ikLinkRotation = rotation;
        link.updateTransformForPMX();
        var restrictedRotation = this.RestrictRotation(ikLink, link.Rotation);
        var ikLinkAdust = Quaternion.Multiply(link.Rotation.Inverse(), restrictedRotation);
        link.ikLinkRotation = Quaternion.Multiply(link.ikLinkRotation, ikLinkAdust);
        link.updateTransformForPMX();
    };
    PMXBoneTransformer.prototype.getIkLinkTransformerByIndex = function (index) {
        return this.pmx.skeleton.getBoneByIndex(this.BoneData.ikLinks[index].ikLinkBoneIndex).Transformer;
    };
    PMXBoneTransformer.prototype.RestrictRotation = function (link, rot) {
        if (!link.isLimitedRotation)
            return rot;
        var decomposed = rot.FactoringQuaternionXYZ();
        var xRotation = Math.max(link.limitedRotation[0], Math.min(link.limitedRotation[3], -decomposed.x));
        var yRotation = Math.max(link.limitedRotation[1], Math.min(link.limitedRotation[4], -decomposed.y));
        var zRotation = Math.max(link.limitedRotation[2], Math.min(link.limitedRotation[5], decomposed.z));
        return Quaternion.EulerXYZ(-xRotation, -yRotation, zRotation);
    };
    PMXBoneTransformer.prototype.clampFloat = function (f, limit) {
        return Math.max(Math.min(f, limit), -limit);
    };
    return PMXBoneTransformer;
})(Transformer);
module.exports = PMXBoneTransformer;

},{"../../Core/Transform/Transformer":135,"../../Math/Matrix":229,"../../Math/Quaternion":232,"../../Math/Vector3":235,"gl-matrix":299}],244:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Geometry = require('../../Core/Geometries/Geometry');
var PrimitiveTopology = require('../../Wrapper/PrimitiveTopology');
var BufferTargetType = require('../../Wrapper/BufferTargetType');
var BufferUsageType = require('../../Wrapper/BufferUsageType');
var ElementType = require('../../Wrapper/ElementType');
var ContextComponents = require("../../ContextComponents");
var JThreeContext = require("../../JThreeContext");
var PMXGeometry = (function (_super) {
    __extends(PMXGeometry, _super);
    function PMXGeometry(pmx) {
        _super.call(this);
        var name = pmx.Header.modelName + "(" + pmx.Header.modelNameEn + ")";
        var rm = JThreeContext.getContextComponent(ContextComponents.ResourceManager);
        this.primitiveTopology = PrimitiveTopology.Triangles;
        this.indexBuffer = rm.createBuffer(name + "-index", BufferTargetType.ElementArrayBuffer, BufferUsageType.StaticDraw, 1, ElementType.UnsignedInt);
        this.positionBuffer = rm.createBuffer(name + "-pos", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 3, ElementType.Float);
        this.normalBuffer = rm.createBuffer(name + "-nor", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 3, ElementType.Float);
        this.uvBuffer = rm.createBuffer(name + "-uv", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 2, ElementType.Float);
        this.edgeSizeBuffer = rm.createBuffer(name + "-edgeSize", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 1, ElementType.Float);
        this.boneIndexBuffer = rm.createBuffer(name + "-boneIndex", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 4, ElementType.Float);
        this.boneWeightBuffer = rm.createBuffer(name + "-boneWeight", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 4, ElementType.Float);
        this.updateBuffers(pmx);
    }
    PMXGeometry.prototype.updateBuffers = function (pmx) {
        var surfaceBuffer = new Uint32Array(pmx.Surfaces);
        var verticies = pmx.Verticies;
        this.positionBuferSource = new Float32Array(verticies.positions);
        this.uvBufferSource = new Float32Array(verticies.uvs);
        this.indexBuffer.update(surfaceBuffer, surfaceBuffer.length);
        this.normalBuffer.update(verticies.normals, verticies.normals.length);
        this.uvBuffer.update(this.uvBufferSource, this.uvBufferSource.length);
        this.positionBuffer.update(this.positionBuferSource, this.positionBuferSource.length);
        this.edgeSizeBuffer.update(verticies.edgeScaling, verticies.edgeScaling.length);
        this.boneIndexBuffer.update(verticies.boneIndicies, verticies.boneIndicies.length);
        this.boneWeightBuffer.update(verticies.boneWeights, verticies.boneWeights.length);
    };
    PMXGeometry.prototype.updatePositionBuffer = function () {
        this.positionBuffer.update(this.positionBuferSource, this.positionBuferSource.length);
    };
    PMXGeometry.prototype.updateUVBuffer = function () {
        this.uvBuffer.update(this.uvBufferSource, this.uvBufferSource.length);
    };
    return PMXGeometry;
})(Geometry);
module.exports = PMXGeometry;

},{"../../ContextComponents":12,"../../Core/Geometries/Geometry":28,"../../JThreeContext":226,"../../Wrapper/BufferTargetType":277,"../../Wrapper/BufferUsageType":278,"../../Wrapper/ElementType":280,"../../Wrapper/PrimitiveTopology":284}],245:[function(require,module,exports){
var Vector4 = require("../../Math/Vector4");
var Vector3 = require("../../Math/Vector3");
var PMXMaterialMorphParamContainer = (function () {
    function PMXMaterialMorphParamContainer(calcFlag) {
        this.calcFlag = calcFlag;
        var def = 1 - calcFlag;
        this.diffuse = [def, def, def, def];
        this.specular = [def, def, def, def];
        this.ambient = [def, def, def];
        this.edgeColor = [def, def, def, def];
        this.edgeSize = def;
        this.textureCoeff = [def, def, def, def];
        this.sphereCoeff = [def, def, def, def];
        this.toonCoeff = [def, def, def, def];
    }
    PMXMaterialMorphParamContainer.calcMorphedSingleValue = function (base, add, mul, target) {
        return base * target(mul) + target(add);
    };
    PMXMaterialMorphParamContainer.calcMorphedVectorValue = function (base, add, mul, target, vecLength) {
        switch (vecLength) {
            case 3:
                return new Vector3(base.X * target(mul)[0] + target(add)[0], base.Y * target(mul)[1] + target(add)[1], base.Z * target(mul)[2] + target(add)[2]);
            case 4:
                return new Vector4(base.X * target(mul)[0] + target(add)[0], base.Y * target(mul)[1] + target(add)[1], base.Z * target(mul)[2] + target(add)[2], base.W * target(mul)[3] + target(add)[3]);
        }
    };
    return PMXMaterialMorphParamContainer;
})();
module.exports = PMXMaterialMorphParamContainer;

},{"../../Math/Vector3":235,"../../Math/Vector4":236}],246:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PMXHitAreaMaterial = require("./Materials/PMXHitAreaMaterial");
var SceneObject = require("../../Core/SceneObject");
var PMXModelData = require("../PMXLoader");
var PMXGeometry = require("./PMXGeometry");
var PMXMaterial = require("./Materials/PMXMaterial");
var PMXSkeleton = require("./PMXSkeleton");
var PMXMorphManager = require("./PMXMorphManager");
var AssociativeArray = require("../../Base/Collections/AssociativeArray");
var PMXGBufferMaterial = require("./Materials/PMXGBufferMaterial");
var PMXShadowMapMaterial = require("./Materials/PMXShadowMapMaterial");
var JThreeEvent = require("../../Base/JThreeEvent");
var PMXTextureManager = require("./PMXTextureManager");
var Q = require("q");
var PMXModel = (function (_super) {
    __extends(PMXModel, _super);
    function PMXModel(pmx, resourceDirectory) {
        var _this = this;
        _super.call(this);
        this.materialDictionary = new AssociativeArray();
        this.loadingTextureCount = 0;
        this.loadedTextureCount = 0;
        this.onload = new JThreeEvent();
        this.loaded = false;
        this.onload.addListener(function () { _this.loaded = true; });
        this.modelData = pmx;
        this.modelDirectory = resourceDirectory;
        this.pmxTextureManager = new PMXTextureManager(this);
        this.geometry = new PMXGeometry(pmx);
        this.skeleton = new PMXSkeleton(this);
        this.pmxMaterials = new Array(pmx.Materials.length);
        this.name = pmx.Header.modelName;
        var offset = 0;
        for (var materialCount = 0; materialCount < pmx.Materials.length; materialCount++) {
            var currentMat = pmx.Materials[materialCount];
            var mat = new PMXMaterial(this, materialCount, offset);
            this.addMaterial(mat);
            this.addMaterial(new PMXGBufferMaterial(mat));
            this.addMaterial(new PMXShadowMapMaterial(mat));
            this.addMaterial(new PMXHitAreaMaterial(mat));
            this.pmxMaterials[materialCount] = mat;
            this.materialDictionary.set(currentMat.materialName, mat);
            offset += currentMat.vertexCount;
        }
        this.morphManager = new PMXMorphManager(this);
    }
    PMXModel.LoadFromUrl = function (url) {
        var d = Q.defer();
        var targetUrl = url;
        var targetDirectory = targetUrl.substr(0, targetUrl.lastIndexOf("/") + 1);
        var oReq = new XMLHttpRequest();
        oReq.open("GET", targetUrl, true);
        oReq.setRequestHeader("Accept", "*/*");
        oReq.responseType = "arraybuffer";
        oReq.onload = function () {
            var pmx = new PMXModelData(oReq.response);
            var model = new PMXModel(pmx, targetDirectory);
            if (model.loaded)
                d.resolve(model);
            else {
                model.onload.addListener(function () {
                    d.resolve(model);
                });
            }
        };
        oReq.send(null);
        return d.promise;
    };
    PMXModel.prototype.getPMXMaterialByName = function (name) {
        return this.materialDictionary.get(name);
    };
    PMXModel.prototype.getPMXMaterialByIndex = function (index) {
        return this.pmxMaterials[index];
    };
    Object.defineProperty(PMXModel.prototype, "ModelData", {
        get: function () {
            return this.modelData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PMXModel.prototype, "Materials", {
        get: function () {
            return this.pmxMaterials;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PMXModel.prototype, "MorphManager", {
        get: function () {
            return this.morphManager;
        },
        enumerable: true,
        configurable: true
    });
    PMXModel.prototype.update = function () {
        this.morphManager.applyMorph();
        this.skeleton.updateMatricies();
    };
    return PMXModel;
})(SceneObject);
module.exports = PMXModel;

},{"../../Base/Collections/AssociativeArray":2,"../../Base/JThreeEvent":6,"../../Core/SceneObject":108,"../PMXLoader":258,"./Materials/PMXGBufferMaterial":238,"./Materials/PMXHitAreaMaterial":239,"./Materials/PMXMaterial":240,"./Materials/PMXShadowMapMaterial":241,"./PMXGeometry":244,"./PMXMorphManager":248,"./PMXSkeleton":249,"./PMXTextureManager":250,"q":309}],247:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PMXMorph = (function () {
    function PMXMorph(pmxModel, index, morphManager) {
        this.progress = 0;
        this.progressCurrentCache = 0;
        this.model = pmxModel;
        this.morphIndex = index;
        this.morphManager = morphManager;
    }
    PMXMorph.CreateMorph = function (model, index, morphManager) {
        var morphData = model.ModelData.Morphs[index];
        switch (morphData.morphKind) {
            case 0:
                return new PMXGroupMorph(model, index, morphManager);
            case 1:
                return new PMXVertexMorph(model, index, morphManager);
            case 3:
                return new PMXUVMorph(model, index, morphManager);
            case 8:
                return new PMXMaterialMorph(model, index, morphManager);
            default:
                return null;
        }
    };
    PMXMorph.PostProcess = function (model, morphType) {
        switch (morphType) {
            case 1:
                PMXVertexMorph.PostProcess(model);
                return;
            case 2:
                PMXUVMorph.PostProcess(model);
                return;
        }
    };
    Object.defineProperty(PMXMorph.prototype, "Progress", {
        get: function () {
            return this.progress;
        },
        set: function (val) {
            if (this.progressCurrentCache != val) {
                this.progressCurrentCache = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PMXMorph.prototype, "MorphName", {
        get: function () {
            return this.TargetMorphData.morphName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PMXMorph.prototype, "TargetMorphData", {
        get: function () {
            return this.model.ModelData.Morphs[this.morphIndex];
        },
        enumerable: true,
        configurable: true
    });
    PMXMorph.prototype.update = function () {
        if (this.progress != this.progressCurrentCache) {
            this.updateProgress(this.progressCurrentCache, this.progress);
            this.progress = this.progressCurrentCache;
            this.morphManager.postProcessFlag[this.TargetMorphData.morphKind] = true;
        }
    };
    PMXMorph.prototype.updateProgress = function (current, last) {
    };
    return PMXMorph;
})();
var PMXVertexMorph = (function (_super) {
    __extends(PMXVertexMorph, _super);
    function PMXVertexMorph() {
        _super.apply(this, arguments);
    }
    PMXVertexMorph.PostProcess = function (model) {
        model.Geometry.updatePositionBuffer();
    };
    PMXVertexMorph.prototype.updateProgress = function (current, last) {
        var ratio = current - last;
        for (var i = 0; i < this.TargetMorphData.morphOffsetCount; ++i) {
            var vm = this.TargetMorphData.vertexMorph[i];
            this.model.Geometry.positionBuferSource[3 * vm.vertexIndex + 0] += vm.vertexOffset[0] * ratio;
            this.model.Geometry.positionBuferSource[3 * vm.vertexIndex + 1] += vm.vertexOffset[1] * ratio;
            this.model.Geometry.positionBuferSource[3 * vm.vertexIndex + 2] += vm.vertexOffset[2] * ratio;
        }
    };
    return PMXVertexMorph;
})(PMXMorph);
var PMXUVMorph = (function (_super) {
    __extends(PMXUVMorph, _super);
    function PMXUVMorph() {
        _super.apply(this, arguments);
    }
    PMXUVMorph.PostProcess = function (model) {
        model.Geometry.updateUVBuffer();
    };
    PMXUVMorph.prototype.updateProgress = function (current, last) {
        var ratio = current - last;
        for (var i = 0; i < this.TargetMorphData.morphOffsetCount; ++i) {
            var vm = this.TargetMorphData.uvMorph[i];
            this.model.Geometry.uvBufferSource[3 * vm.vertexIndex + 0] += vm.uvOffset[0] * ratio;
            this.model.Geometry.uvBufferSource[3 * vm.vertexIndex + 1] += vm.uvOffset[1] * ratio;
            this.model.Geometry.uvBufferSource[3 * vm.vertexIndex + 2] += vm.uvOffset[2] * ratio;
        }
    };
    return PMXUVMorph;
})(PMXMorph);
var PMXGroupMorph = (function (_super) {
    __extends(PMXGroupMorph, _super);
    function PMXGroupMorph() {
        _super.apply(this, arguments);
    }
    PMXGroupMorph.prototype.updateProgress = function (current, last) {
        var ratio = current - last;
        for (var i = 0; i < this.TargetMorphData.morphOffsetCount; ++i) {
            var vm = this.TargetMorphData.groupMorph[i];
            var m = this.morphManager.getMorphByIndex(vm.morphIndex);
            if (m)
                m.Progress += ratio * vm.morphRate;
        }
    };
    return PMXGroupMorph;
})(PMXMorph);
var PMXMaterialMorph = (function (_super) {
    __extends(PMXMaterialMorph, _super);
    function PMXMaterialMorph() {
        _super.apply(this, arguments);
    }
    PMXMaterialMorph.prototype.updateProgress = function (current, last) {
        var ratio = current - last;
        for (var i = 0; i < this.TargetMorphData.morphOffsetCount; ++i) {
            var vm = this.TargetMorphData.materialMorph[i];
            if (vm.materialIndex == -1) {
                var targetMaterials = this.model.Materials;
            }
            else {
                var targetMaterials = [this.model.getPMXMaterialByIndex(vm.materialIndex)];
            }
            for (var j = 0; j < targetMaterials.length; j++) {
                var targetMaterial = targetMaterials[j];
                var target = vm.operationType == 1 ? targetMaterial.addMorphParam : targetMaterial.mulMorphParam;
                target.edgeSize += ratio * (vm.edgeSize + vm.operationType - 1);
                this.assignMorphValues(3, target.ambient, vm.ambient, ratio, vm.operationType);
                this.assignMorphValues(4, target.diffuse, vm.diffuse, ratio, vm.operationType);
                this.assignMorphValues(4, target.specular, vm.specular, ratio, vm.operationType);
                this.assignMorphValues(4, target.edgeColor, vm.edgeColor, ratio, vm.operationType);
                this.assignMorphValues(4, target.textureCoeff, vm.textureCoefficient, ratio, vm.operationType);
                this.assignMorphValues(4, target.sphereCoeff, vm.sphereTextureCoefficient, ratio, vm.operationType);
                this.assignMorphValues(4, target.toonCoeff, vm.toonTextureCoefficient, ratio, vm.operationType);
            }
        }
    };
    PMXMaterialMorph.prototype.assignMorphValues = function (vecLength, target, morphValues, ratio, opType) {
        for (var i = 0; i < vecLength; i++) {
            target[i] += ratio * (morphValues[i] + opType - 1);
        }
    };
    return PMXMaterialMorph;
})(PMXMorph);
module.exports = PMXMorph;

},{}],248:[function(require,module,exports){
var PMXMorph = require("./PMXMorph");
var AssociativeArray = require("./../../Base/Collections/AssociativeArray");
var PMXMorphManager = (function () {
    function PMXMorphManager(model) {
        this.morphsDictionary = new AssociativeArray();
        this.postProcessFlag = [false, false, false, false, false, false, false, false, false];
        this.model = model;
        this.morphs = new Array(model.ModelData.Morphs.length);
        for (var i = 0; i < model.ModelData.Morphs.length; ++i) {
            this.morphs[i] = PMXMorph.CreateMorph(model, i, this);
            if (this.morphs[i] != null)
                this.morphsDictionary.set(this.morphs[i].MorphName, this.morphs[i]);
        }
    }
    PMXMorphManager.prototype.applyMorph = function () {
        for (var i = 0; i < this.morphs.length; ++i) {
            if (this.morphs[i] != null)
                this.morphs[i].update();
        }
        for (var i = 0; i < this.postProcessFlag.length; i++) {
            if (this.postProcessFlag[i]) {
                PMXMorph.PostProcess(this.model, i);
                this.postProcessFlag[i] = false;
            }
        }
    };
    PMXMorphManager.prototype.getMorphByName = function (name) {
        return this.morphsDictionary.get(name);
    };
    PMXMorphManager.prototype.getMorphByIndex = function (index) {
        return this.morphs[index];
    };
    return PMXMorphManager;
})();
module.exports = PMXMorphManager;

},{"./../../Base/Collections/AssociativeArray":2,"./PMXMorph":247}],249:[function(require,module,exports){
var PMXBone = require('./PMXBone');
var AssociativeArray = require('../../Base/Collections/AssociativeArray');
var TextureFormat = require('../../Wrapper/TextureInternalFormatType');
var ElementFormat = require('../../Wrapper/TextureType');
var ContextComponents = require("../../ContextComponents");
var JThreeContext = require("../../JThreeContext");
var PMXSkeleton = (function () {
    function PMXSkeleton(model) {
        this.rootBones = [];
        this.boneDictionary = new AssociativeArray();
        model.skeleton = this;
        var bones = model.ModelData.Bones;
        this.bones = new Array(model.ModelData.Bones.length);
        this.bonesInTransformOrder = new Array(model.ModelData.Bones.length);
        this.matricies = new Float32Array(model.ModelData.Bones.length * 16);
        for (var i = 0; i < bones.length; i++) {
            var bone = bones[i];
            var pmxBone = new PMXBone(model, this, i);
            if (bone.parentBoneIndex == -1) {
                this.rootBones.push(pmxBone);
            }
            this.bonesInTransformOrder[i] = this.bones[i] = pmxBone;
            this.boneDictionary.set(bone.boneName, pmxBone);
        }
        this.bones.forEach(function (v) { return v.boneDictionaryConstructed(); });
        this.bonesInTransformOrder.sort(function (a, b) { return a.OrderCriteria - b.OrderCriteria; });
        this.matrixTexture = JThreeContext.getContextComponent(ContextComponents.ResourceManager).createTexture("jthree.pmx.bonetransform" + model.ID, 4, this.bones.length, TextureFormat.RGBA, ElementFormat.Float);
    }
    Object.defineProperty(PMXSkeleton.prototype, "MatrixTexture", {
        get: function () {
            return this.matrixTexture;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PMXSkeleton.prototype, "BoneCount", {
        get: function () {
            return this.bones.length;
        },
        enumerable: true,
        configurable: true
    });
    PMXSkeleton.prototype.getBoneByName = function (name) {
        return this.boneDictionary.get(name);
    };
    PMXSkeleton.prototype.getBoneByIndex = function (index) {
        return this.bones[index];
    };
    PMXSkeleton.prototype.updateMatricies = function () {
        this.updateBoneTransforms();
        for (var i = 0; i < this.bones.length; i++) {
            this.bones[i].applyMatrixToBuffer(this.matricies);
        }
        this.matrixTexture.updateTexture(this.matricies);
    };
    PMXSkeleton.prototype.updateBoneTransforms = function () {
        this.bonesInTransformOrder.forEach(function (v) { return (v.updateBoneTransform()); });
    };
    PMXSkeleton.prototype.structureToString = function () {
        var result = "";
        this.rootBones.forEach(function (v) { return result += v.structureToString(0); });
        return result;
    };
    return PMXSkeleton;
})();
module.exports = PMXSkeleton;

},{"../../Base/Collections/AssociativeArray":2,"../../ContextComponents":12,"../../JThreeContext":226,"../../Wrapper/TextureInternalFormatType":295,"../../Wrapper/TextureType":296,"./PMXBone":242}],250:[function(require,module,exports){
var JThreeLogger = require("../../Base/JThreeLogger");
var Q = require("q");
var PMXTextureManager = (function () {
    function PMXTextureManager(model) {
        this.textures = [];
        this.model = model;
    }
    PMXTextureManager.prototype.loadTexture = function (index) {
        var _this = this;
        if (this.textures[index] && typeof this.textures[index] === "object")
            return Q.Promise(function (resolver, reject, notify) { resolver(_this.textures[index]); });
        if (this.textures[index] && typeof this.textures[index] === "function")
            return this.textures[index];
        var loadingPromise = Q.Promise(function (resolver, reject, notify) {
            var img = new Image();
            img.onload = function () {
                _this.textures[index] = img;
                resolver(img);
                _this.model.loadedTextureCount++;
                JThreeLogger.sectionLog("pmx texture", "loaded texture " + _this.model.loadedTextureCount + " / " + _this.model.loadingTextureCount);
                if (_this.model.loadingTextureCount == _this.model.loadedTextureCount)
                    _this.model.onload.fire(_this.model, _this.model);
            };
            img.onerror = function () {
                _this.textures[index] = img;
                resolver(img);
                _this.model.loadedTextureCount++;
                JThreeLogger.sectionError("pmx texture", "load failure texture " + _this.model.loadedTextureCount + " / " + _this.model.loadingTextureCount + " " + img.src);
                if (_this.model.loadingTextureCount == _this.model.loadedTextureCount)
                    _this.model.onload.fire(_this.model, _this.model);
            };
            img.src = _this.model.modelDirectory + _this.model.ModelData.Textures[index];
            _this.model.loadingTextureCount++;
        });
        this.textures[index] = loadingPromise;
        return loadingPromise;
    };
    return PMXTextureManager;
})();
module.exports = PMXTextureManager;

},{"../../Base/JThreeLogger":8,"q":309}],251:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TagFactory = require("../../../Goml/Factories/TagFactory");
var PMXBoneTagFactory = (function (_super) {
    __extends(PMXBoneTagFactory, _super);
    function PMXBoneTagFactory() {
        _super.apply(this, arguments);
    }
    PMXBoneTagFactory.prototype.CreateNodeForThis = function (elem, parent) {
        if (parent.getTypeName() === "PMXBonesNode") {
            var castedParent = parent;
            return new this.nodeType(elem, parent, castedParent.TargetPMXNode);
        }
    };
    return PMXBoneTagFactory;
})(TagFactory);
module.exports = PMXBoneTagFactory;

},{"../../../Goml/Factories/TagFactory":170}],252:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TagFactory = require("../../../Goml/Factories/TagFactory");
var PMXMorphTagFactory = (function (_super) {
    __extends(PMXMorphTagFactory, _super);
    function PMXMorphTagFactory() {
        _super.apply(this, arguments);
    }
    PMXMorphTagFactory.prototype.CreateNodeForThis = function (elem, parent) {
        if (parent.getTypeName() === "PMXMorphsNode") {
            var castedParent = parent;
            return new this.nodeType(elem, parent, castedParent.TargetPMXNode);
        }
    };
    return PMXMorphTagFactory;
})(TagFactory);
module.exports = PMXMorphTagFactory;

},{"../../../Goml/Factories/TagFactory":170}],253:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SceneObjectNodeBase = require("../../Goml/Nodes/SceneObjects/SceneObjectNodeBase");
var PMXBoneNode = (function (_super) {
    __extends(PMXBoneNode, _super);
    function PMXBoneNode(elem, parent, pmx) {
        var _this = this;
        _super.call(this, elem, parent, pmx.ContainedSceneNode, pmx);
        this.targetPMX = pmx;
        this.targetPMX.onPMXTargetUpdate(function (e, o) { _this.attributes.updateValue(); });
        this.attributes.defineAttribute({
            "name": {
                value: "",
                converter: "string",
                handler: function (v) {
                    if (!_this.targetPMX.PMXModelReady)
                        return;
                    var bone = _this.targetPMX.PMXModel.skeleton.getBoneByName(v.Value);
                    if (bone != null && bone != _this.targetSceneObject) {
                        _this.targetSceneObject = bone;
                        if (_this.children) {
                            for (var i = 0; i < _this.children.length; i++) {
                                _this.children[i].TargetObject.Transformer.Position = bone.Transformer.LocalOrigin;
                                _this.children[i].parentChanged();
                            }
                        }
                    }
                }
            }
        });
    }
    PMXBoneNode.prototype.ConstructTarget = function () {
        return this.targetSceneObject || null;
    };
    return PMXBoneNode;
})(SceneObjectNodeBase);
module.exports = PMXBoneNode;

},{"../../Goml/Nodes/SceneObjects/SceneObjectNodeBase":212}],254:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GomlTreeNodeBase = require("../../Goml/GomlTreeNodeBase");
var PMXBonesNode = (function (_super) {
    __extends(PMXBonesNode, _super);
    function PMXBonesNode(elem, parent) {
        _super.call(this, elem, parent);
        this.targetPMXNode = parent;
    }
    Object.defineProperty(PMXBonesNode.prototype, "TargetPMXNode", {
        get: function () {
            return this.targetPMXNode;
        },
        enumerable: true,
        configurable: true
    });
    return PMXBonesNode;
})(GomlTreeNodeBase);
module.exports = PMXBonesNode;

},{"../../Goml/GomlTreeNodeBase":179}],255:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GomlTreeNodeBase = require("../../Goml/GomlTreeNodeBase");
var PMXMorphNode = (function (_super) {
    __extends(PMXMorphNode, _super);
    function PMXMorphNode(elem, parent, pmx) {
        var _this = this;
        _super.call(this, elem, parent);
        this.targetPMX = pmx;
        this.targetPMX.onPMXTargetUpdate(function (e, o) { _this.attributes.updateValue(); });
        this.attributes.defineAttribute({
            "name": {
                value: "",
                converter: "string"
            },
            "value": {
                value: 0,
                converter: "number",
                handler: function (v) {
                    if (_this.targetPMX.PMXModelReady) {
                        var key = _this.attributes.getValue("name");
                        var target = _this.targetPMX.PMXModel.MorphManager.getMorphByName(key);
                        if (target != null) {
                            target.Progress = v.Value;
                        }
                    }
                }
            }
        });
    }
    return PMXMorphNode;
})(GomlTreeNodeBase);
module.exports = PMXMorphNode;

},{"../../Goml/GomlTreeNodeBase":179}],256:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GomlTreeNodeBase = require("../../Goml/GomlTreeNodeBase");
var PMXMorphsNode = (function (_super) {
    __extends(PMXMorphsNode, _super);
    function PMXMorphsNode(elem, parent) {
        _super.call(this, elem, parent);
        this.targetPMXNode = parent;
    }
    Object.defineProperty(PMXMorphsNode.prototype, "TargetPMXNode", {
        get: function () {
            return this.targetPMXNode;
        },
        enumerable: true,
        configurable: true
    });
    return PMXMorphsNode;
})(GomlTreeNodeBase);
module.exports = PMXMorphsNode;

},{"../../Goml/GomlTreeNodeBase":179}],257:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SceneObjectNodeBase = require("./../../Goml/Nodes/SceneObjects/SceneObjectNodeBase");
var PMXModel = require('../Core/PMXModel');
var JThreeEvent = require('../../Base/JThreeEvent');
var JThreeContext = require("../../JThreeContext");
var ContextComponents = require("../../ContextComponents");
var PMXNode = (function (_super) {
    __extends(PMXNode, _super);
    function PMXNode(elem, parent, parentSceneNode, parentObject) {
        _super.call(this, elem, parent, parentSceneNode, parentObject);
        this.pmxModel = null;
        this.pmxTargetUpdated = new JThreeEvent();
        this.pmxLoadingDeferred = JThreeContext.getContextComponent(ContextComponents.ResourceLoader).getResourceLoadingDeffered();
        this.attributes.defineAttribute({
            "src": {
                converter: "string", value: ""
            }
        });
    }
    Object.defineProperty(PMXNode.prototype, "PMXModel", {
        get: function () {
            return this.pmxModel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PMXNode.prototype, "PMXModelReady", {
        get: function () {
            return this.PMXModel != null;
        },
        enumerable: true,
        configurable: true
    });
    PMXNode.prototype.onPMXTargetUpdate = function (handler) {
        this.pmxTargetUpdated.addListener(handler);
    };
    PMXNode.prototype.ConstructTarget = function () {
        return this.pmxModel;
    };
    PMXNode.prototype.beforeLoad = function () {
        var _this = this;
        _super.prototype.beforeLoad.call(this);
        PMXModel.LoadFromUrl(this.attributes.getValue("src"))
            .then(function (m) {
            _this.pmxModel = m;
            _this.targetUpdated();
            _this.pmxTargetUpdated.fire(_this, m);
            _this.bubbleEvent("loaded", { target: _this });
            _this.pmxLoadingDeferred.resolve(null);
        });
    };
    PMXNode.prototype.targetUpdated = function () {
        _super.prototype.beforeLoad.call(this);
    };
    PMXNode.prototype.Load = function () {
        _super.prototype.Load.call(this);
    };
    return PMXNode;
})(SceneObjectNodeBase);
module.exports = PMXNode;

},{"../../Base/JThreeEvent":6,"../../ContextComponents":12,"../../JThreeContext":226,"../Core/PMXModel":246,"./../../Goml/Nodes/SceneObjects/SceneObjectNodeBase":212}],258:[function(require,module,exports){
var PMX = (function () {
    function PMX(data) {
        this.reader = new jDataView(data, 0, data.byteLength, true);
        this.loadHeader();
        this.loadVerticies();
        this.loadSurfaces();
        this.loadTextures();
        this.loadMaterials();
        this.loadBones();
        this.loadMorphs();
        this.loadDisplayFrames();
        this.loadRigidBodies();
        this.loadJoints();
    }
    Object.defineProperty(PMX.prototype, "Header", {
        get: function () {
            return this.header;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PMX.prototype, "Verticies", {
        get: function () {
            return this.verticies;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PMX.prototype, "Surfaces", {
        get: function () {
            return this.surfaces;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PMX.prototype, "Materials", {
        get: function () {
            return this.materials;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PMX.prototype, "Textures", {
        get: function () {
            return this.textures;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PMX.prototype, "Bones", {
        get: function () {
            return this.bones;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PMX.prototype, "Morphs", {
        get: function () {
            return this.morphs;
        },
        enumerable: true,
        configurable: true
    });
    PMX.prototype.readTextBuf = function () {
        var length = this.reader.getInt32();
        if (this.header.encoding == 0) {
            var textArr = [];
            for (var i = 0; i < length / 2; i++) {
                var c = this.reader.getUint16();
                if (c == 0)
                    continue;
                textArr.push(c);
            }
            return String.fromCharCode.apply(null, textArr);
        }
        return this.reader.getString(length, this.reader.tell(), "utf8");
    };
    PMX.prototype.toUTF8Array = function (str) {
        var utf8 = [];
        for (var i = 0; i < str.length; i++) {
            var charcode = str.charCodeAt(i);
            if (charcode < 0x80)
                utf8.push(charcode);
            else if (charcode < 0x800) {
                utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f));
            }
            else if (charcode < 0xd800 || charcode >= 0xe000) {
                utf8.push(0xe0 | (charcode >> 12), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f));
            }
            else {
                i++;
                charcode = 0x10000 + (((charcode & 0x3ff) << 10)
                    | (str.charCodeAt(i) & 0x3ff));
                utf8.push(0xf0 | (charcode >> 18), 0x80 | ((charcode >> 12) & 0x3f), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f));
            }
        }
        return utf8;
    };
    PMX.prototype.loadHeader = function () {
        var r = this.reader;
        this.reader.getUint32();
        this.header =
            {
                version: r.getFloat32(),
                headerByteSize: r.getUint8(),
                encoding: r.getUint8(),
                uvAddition: r.getUint8(),
                vertexIndexSize: r.getUint8(),
                textureIndexSize: r.getUint8(),
                materialIndexSize: r.getUint8(),
                boneIndexSize: r.getUint8(),
                morphIndexSize: r.getUint8(),
                rigidBodyIndexSize: r.getUint8(),
                modelName: "",
                modelNameEn: "",
                comment: "",
                commentEn: ""
            };
        this.header.modelName = this.readTextBuf();
        this.header.modelNameEn = this.readTextBuf();
        this.header.comment = this.readTextBuf();
        this.header.commentEn = this.readTextBuf();
    };
    PMX.prototype.readBoneIndex = function () {
        return this.readIndexExceptVertex(this.header.boneIndexSize);
    };
    PMX.prototype.readTextureIndex = function () {
        return this.readIndexExceptVertex(this.header.textureIndexSize);
    };
    PMX.prototype.readMorphIndex = function () {
        return this.readIndexExceptVertex(this.header.morphIndexSize);
    };
    PMX.prototype.readMaterialIndex = function () {
        return this.readIndexExceptVertex(this.header.materialIndexSize);
    };
    PMX.prototype.readRigidBodyIndex = function () {
        return this.readIndexExceptVertex(this.header.rigidBodyIndexSize);
    };
    PMX.prototype.readVertexIndex = function () {
        switch (this.header.vertexIndexSize) {
            case 1:
                return this.reader.getUint8();
            case 2:
                return this.reader.getUint16();
            case 4:
                return this.reader.getInt32();
        }
    };
    PMX.prototype.readIndexExceptVertex = function (byte) {
        switch (byte) {
            case 1:
                return this.reader.getInt8();
            case 2:
                return this.reader.getInt16();
            case 4:
                return this.reader.getInt32();
        }
    };
    PMX.prototype.loadVerticies = function () {
        var r = this.reader;
        var count = r.getInt32();
        var uvCount = this.header.uvAddition;
        var additionalUvs = new Array(uvCount);
        for (var i = 0; i < uvCount; i++) {
            additionalUvs[i] = new Array(count * 4);
        }
        var bi1 = 0, bi2 = 0, bi3 = 0, bi4 = 0;
        var bw1 = 0, bw2 = 0, bw3 = 0, bw4 = 0;
        var sumCache = 0;
        var result = {
            positions: new Array(count * 3),
            normals: new Float32Array(count * 3),
            uvs: new Array(count * 2),
            additionalUV: additionalUvs,
            edgeScaling: new Float32Array(count),
            verticies: new Array(count),
            boneIndicies: new Float32Array(count * 4),
            boneWeights: new Float32Array(count * 4)
        };
        for (var i = 0; i < count; i++) {
            bi1 = 0;
            bi2 = 0;
            bi3 = 0;
            bi4 = 0;
            bw1 = 0;
            bw2 = 0;
            bw3 = 0;
            bw4 = 0;
            result.positions[3 * i + 0] = r.getFloat32();
            result.positions[3 * i + 1] = r.getFloat32();
            result.positions[3 * i + 2] = -r.getFloat32();
            result.normals[3 * i + 0] = r.getFloat32();
            result.normals[3 * i + 1] = r.getFloat32();
            result.normals[3 * i + 2] = -r.getFloat32();
            result.uvs[2 * i + 0] = r.getFloat32();
            result.uvs[2 * i + 1] = r.getFloat32();
            for (var j = 0; j < uvCount; j++) {
                result.additionalUV[j][4 * i + 0] = r.getFloat32();
                result.additionalUV[j][4 * i + 1] = r.getFloat32();
                result.additionalUV[j][4 * i + 2] = r.getFloat32();
                result.additionalUV[j][4 * i + 3] = r.getFloat32();
            }
            result.verticies[i] = { weightTransform: r.getUint8() };
            switch (result.verticies[i].weightTransform) {
                case 0:
                    bi1 = this.readBoneIndex();
                    bw1 = 1;
                    break;
                case 1:
                    bi1 = this.readBoneIndex();
                    bi2 = this.readBoneIndex();
                    bw1 = r.getFloat32();
                    bw2 = 1 - bw1;
                    break;
                case 2:
                    bi1 = this.readBoneIndex();
                    bi2 = this.readBoneIndex();
                    bi3 = this.readBoneIndex();
                    bi4 = this.readBoneIndex();
                    bw1 = r.getFloat32();
                    bw2 = r.getFloat32();
                    bw3 = r.getFloat32();
                    bw4 = r.getFloat32();
                    sumCache = bw1 + bw2 + bw3 + bw4;
                    bw1 /= sumCache;
                    bw2 /= sumCache;
                    bw3 /= sumCache;
                    bw4 /= sumCache;
                    break;
                case 3:
                    bi1 = this.readBoneIndex();
                    bi2 = this.readBoneIndex();
                    bw1 = r.getFloat32();
                    bw2 = 1 - bw1;
                    result.verticies[i].sdef =
                        {
                            boneParams: [
                                r.getFloat32(),
                                r.getFloat32(),
                                r.getFloat32(),
                                r.getFloat32(),
                                r.getFloat32(),
                                r.getFloat32(),
                                r.getFloat32(),
                                r.getFloat32(),
                                r.getFloat32(),
                            ]
                        };
                    break;
            }
            result.boneIndicies[4 * i + 0] = bi1;
            result.boneIndicies[4 * i + 1] = bi2;
            result.boneIndicies[4 * i + 2] = bi3;
            result.boneIndicies[4 * i + 3] = bi4;
            result.boneWeights[4 * i + 0] = bw1;
            result.boneWeights[4 * i + 1] = bw2;
            result.boneWeights[4 * i + 2] = bw3;
            result.boneWeights[4 * i + 3] = bw4;
            result.edgeScaling[i] = r.getFloat32();
        }
        this.verticies = result;
    };
    PMX.prototype.loadSurfaces = function () {
        var r = this.reader;
        var count = r.getInt32();
        this.surfaces = new Array(count);
        for (var i = 0; i < count / 3; i++) {
            this.surfaces[3 * i + 0] = this.readVertexIndex();
            this.surfaces[3 * i + 2] = this.readVertexIndex();
            this.surfaces[3 * i + 1] = this.readVertexIndex();
        }
    };
    PMX.prototype.loadTextures = function () {
        var r = this.reader;
        var count = r.getInt32();
        this.textures = new Array(count);
        for (var i = 0; i < count; i++) {
            this.textures[i] = this.readTextBuf();
        }
    };
    PMX.prototype.loadMaterials = function () {
        var r = this.reader;
        var count = r.getInt32();
        this.materials = new Array(count);
        var cache = 0;
        for (var i = 0; i < count; i++) {
            this.materials[i] = {
                materialName: this.readTextBuf(),
                materialNameEn: this.readTextBuf(),
                diffuse: [r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32()],
                specular: [r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32()],
                ambient: [r.getFloat32(), r.getFloat32(), r.getFloat32()],
                drawFlag: r.getUint8(),
                edgeColor: [r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32()],
                edgeSize: r.getFloat32(),
                textureIndex: this.readTextureIndex(),
                sphereTextureIndex: this.readTextureIndex(),
                sphereMode: r.getUint8(),
                sharedToonFlag: cache = r.getUint8(),
                targetToonIndex: cache == 0 ? this.readTextureIndex() : r.getUint8(),
                memo: this.readTextBuf(),
                vertexCount: r.getInt32(),
            };
        }
    };
    PMX.prototype.loadBones = function () {
        var r = this.reader;
        var count = r.getUint32();
        this.bones = new Array(count);
        var boneFlagCache = 0;
        var ikLinkCountCache = 0;
        var ikLimitedCache = 0;
        for (var i = 0; i < count; i++) {
            this.bones[i] = {
                boneName: this.readTextBuf(),
                boneNameEn: this.readTextBuf(),
                position: [r.getFloat32(), r.getFloat32(), -r.getFloat32()],
                parentBoneIndex: this.readBoneIndex(),
                transformLayer: r.getInt32(),
                boneFlag: boneFlagCache = r.getUint16(),
                positionOffset: (boneFlagCache & 0x0001) == 0 ? [r.getFloat32(), r.getFloat32(), -r.getFloat32()] : undefined,
                connectingBoneIndex: (boneFlagCache & 0x0001) > 0 ? this.readBoneIndex() : undefined,
                providingBoneIndex: (boneFlagCache & 0x0100) > 0 || (boneFlagCache & 0x0200) > 0 ? this.readBoneIndex() : undefined,
                providingRate: (boneFlagCache & 0x0100) > 0 || (boneFlagCache & 0x0200) > 0 ? r.getFloat32() : undefined,
                fixedAxis: (boneFlagCache & 0x0400) > 0 ? [r.getFloat32(), r.getFloat32(), -r.getFloat32()] : undefined,
                localAxisX: (boneFlagCache & 0x0800) > 0 ? [r.getFloat32(), r.getFloat32(), -r.getFloat32()] : undefined,
                localAxisZ: (boneFlagCache & 0x0800) > 0 ? [r.getFloat32(), r.getFloat32(), -r.getFloat32()] : undefined,
                externalParentTransformKey: (boneFlagCache & 0x2000) > 0 ? r.getInt32() : undefined,
                ikTargetBoneIndex: (boneFlagCache & 0x0020) > 0 ? this.readBoneIndex() : undefined,
                ikLoopCount: (boneFlagCache & 0x0020) > 0 ? r.getInt32() : undefined,
                ikLimitedRotation: (boneFlagCache & 0x0020) > 0 ? r.getFloat32() : undefined,
                ikLinkCount: (boneFlagCache & 0x0020) > 0 ? ikLinkCountCache = r.getInt32() : ikLinkCountCache = undefined,
                ikLinks: (boneFlagCache & 0x0020) > 0 ? new Array(ikLinkCountCache) : undefined
            };
            if (ikLinkCountCache)
                for (var j = 0; j < ikLinkCountCache; j++) {
                    this.bones[i].ikLinks[j] = {
                        ikLinkBoneIndex: this.readBoneIndex(),
                        isLimitedRotation: ikLimitedCache = r.getUint8(),
                        limitedRotation: ikLimitedCache > 0 ? [r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32()] : undefined
                    };
                }
        }
    };
    PMX.prototype.loadMorphs = function () {
        var r = this.reader;
        var count = r.getInt32();
        this.morphs = new Array(count);
        var morphCountCache = 0;
        for (var i = 0; i < count; i++) {
            this.morphs[i] = {
                morphName: this.readTextBuf(),
                morphNameEn: this.readTextBuf(),
                editPanel: r.getUint8(),
                morphKind: r.getUint8(),
                morphOffsetCount: morphCountCache = r.getInt32()
            };
            switch (this.morphs[i].morphKind) {
                case 0:
                    this.morphs[i].groupMorph = new Array(morphCountCache);
                    for (var j = 0; j < morphCountCache; j++) {
                        this.morphs[i].groupMorph[j] = {
                            morphIndex: this.readMorphIndex(),
                            morphRate: r.getFloat32()
                        };
                    }
                    break;
                case 1:
                    this.morphs[i].vertexMorph = new Array(morphCountCache);
                    for (var j = 0; j < morphCountCache; j++) {
                        this.morphs[i].vertexMorph[j] =
                            {
                                vertexIndex: this.readVertexIndex(),
                                vertexOffset: [r.getFloat32(), r.getFloat32(), -r.getFloat32()]
                            };
                    }
                    break;
                case 2:
                    this.morphs[i].boneMorph = new Array(morphCountCache);
                    for (var j = 0; j < morphCountCache; j++) {
                        this.morphs[i].boneMorph[j]
                            = {
                                boneIndex: this.readBoneIndex(),
                                translationOffset: [r.getFloat32(), r.getFloat32(), -r.getFloat32()],
                                rotationOffset: [r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32()]
                            };
                    }
                    break;
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    this.morphs[i].uvMorph = new Array(morphCountCache);
                    for (var j = 0; j < morphCountCache; j++) {
                        this.morphs[i].uvMorph[j]
                            = {
                                vertexIndex: this.readVertexIndex(),
                                uvOffset: [r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32()]
                            };
                    }
                    break;
                case 8:
                    this.morphs[i].materialMorph = new Array(morphCountCache);
                    for (var j = 0; j < morphCountCache; j++) {
                        this.morphs[i].materialMorph[j]
                            = {
                                materialIndex: this.readMaterialIndex(),
                                operationType: r.getUint8(),
                                diffuse: [r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32()],
                                specular: [r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32()],
                                ambient: [r.getFloat32(), r.getFloat32(), r.getFloat32()],
                                edgeColor: [r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32()],
                                edgeSize: r.getFloat32(),
                                textureCoefficient: [r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32()],
                                sphereTextureCoefficient: [r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32()],
                                toonTextureCoefficient: [r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32()]
                            };
                    }
                    break;
            }
        }
    };
    PMX.prototype.loadDisplayFrames = function () {
        var r = this.reader;
        var count = r.getInt32();
        this.displayFrames = new Array(count);
        var countCache = 0;
        var targetCache = 0;
        for (var i = 0; i < count; i++) {
            this.displayFrames[i] =
                {
                    frameName: this.readTextBuf(),
                    frameNameEn: this.readTextBuf(),
                    specialFrameFlag: r.getUint8(),
                    elementCount: countCache = r.getInt32(),
                    targetElementTypes: new Array(countCache),
                    targetIndex: new Array(countCache)
                };
            for (var j = 0; j < countCache; j++) {
                this.displayFrames[i].targetElementTypes[j] = targetCache = r.getUint8();
                this.displayFrames[i].targetIndex[j] = targetCache > 0 ? this.readMorphIndex() : this.readBoneIndex();
            }
        }
    };
    PMX.prototype.loadRigidBodies = function () {
        var r = this.reader;
        var count = r.getInt32();
        this.rigidBodies = new Array(count);
        for (var i = 0; i < count; i++) {
            this.rigidBodies[i] = {
                rigidBodyName: this.readTextBuf(),
                rigidBodyNameEn: this.readTextBuf(),
                boneIndex: this.readBoneIndex(),
                group: r.getUint8(),
                unCollisionGroupFlag: r.getUint16(),
                shape: r.getUint8(),
                size: [r.getFloat32(), r.getFloat32(), r.getFloat32()],
                position: [r.getFloat32(), r.getFloat32(), -r.getFloat32()],
                rotation: [r.getFloat32(), r.getFloat32(), r.getFloat32()],
                mass: r.getFloat32(),
                translationFraction: r.getFloat32(),
                rotationFraction: r.getFloat32(),
                boundness: r.getFloat32(),
                fraction: r.getFloat32(),
                calcType: r.getUint8(),
            };
        }
    };
    PMX.prototype.loadJoints = function () {
        var r = this.reader;
        var count = r.getInt32();
        this.joints = new Array(count);
        var typeCache = 0;
        for (var i = 0; i < count; i++) {
            this.joints[i] = {
                jointName: this.readTextBuf(),
                jointNameEn: this.readTextBuf(),
                jointType: typeCache = r.getUint8(),
                spring: typeCache == 0 ?
                    {
                        targetRigidBody1: this.readRigidBodyIndex(),
                        targetRigidBody2: this.readRigidBodyIndex(),
                        position: [r.getFloat32(), r.getFloat32(), r.getFloat32()],
                        rotation: [r.getFloat32(), r.getFloat32(), r.getFloat32()],
                        translationLimit: [r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32()],
                        rotationLimit: [r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32()],
                        springCoefficientLimit: [r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32()]
                    } : undefined
            };
        }
    };
    return PMX;
})();
module.exports = PMX;

},{}],259:[function(require,module,exports){
module.exports = "precision mediump float;\nuniform vec4 u_edgeColor;\n\nvoid main(void)\n{\n   gl_FragColor=u_edgeColor;\n}"
},{}],260:[function(require,module,exports){
module.exports = "precision mediump float;\nattribute vec3 position;\nattribute vec3 normal;\nattribute float edgeScaling;\nattribute vec4 boneWeights;\nattribute vec4 boneIndicies;\n\nuniform mat4 matVP;\nuniform float u_edgeSize;\n\n\nuniform mediump sampler2D u_boneMatricies;\nuniform float u_boneCount;\n\nmat4 matFromIndex(float index)\n{\n\tfloat y =index/u_boneCount+1./u_boneCount/2.;\n\ty=y;\n\treturn mat4(\n\ttexture2D(u_boneMatricies,vec2(0.125,y)),\n\ttexture2D(u_boneMatricies,vec2(0.375,y)),\n\ttexture2D(u_boneMatricies,vec2(0.625,y)),\n\ttexture2D(u_boneMatricies,vec2(0.875,y)));\n}\n\nmat4 getBoneTransform()\n{\n\treturn boneWeights.x*matFromIndex(boneIndicies.x)\n\t+boneWeights.y*matFromIndex(boneIndicies.y)\n\t+boneWeights.z*matFromIndex(boneIndicies.z)\n\t+boneWeights.w*matFromIndex(boneIndicies.w);\n}\nvoid main(void){\n\tmat4 matMVP=matVP*getBoneTransform();\n\tvec4 p0 = matMVP*vec4(position,1);\n\tvec4 p1 = matMVP*vec4(position+normal,1);\n\tp0.xy/=p0.w;\n\tp1.xy/=p1.w;\n\tfloat coeff=(512./2.0)*distance(p0.xy,p1.xy);\n\tif(coeff > 1.0) coeff = 1.0/coeff;\n\tcoeff*=u_edgeSize*edgeScaling;\n\tgl_Position = matMVP*vec4(position + coeff*normal,1);\n}\n"
},{}],261:[function(require,module,exports){
module.exports = "precision mediump float;\nvarying vec3 v_normal;\nvarying  vec2 v_uv;\nvarying vec4 v_pos;\nuniform vec4 u_diffuse;\n\nuniform vec4 u_specular;\nuniform vec3 u_ambient;\nuniform vec3 u_DirectionalLight;\nuniform mat4 matMVP;\nuniform mat4 matMV;\nuniform mat4 matV;\nuniform sampler2D dlight;\nuniform sampler2D slight;\nuniform sampler2D u_texture;\nuniform sampler2D u_sphere;\nuniform sampler2D u_toon;\nvarying vec2 v_spuv;\nuniform int u_textureUsed;\nuniform int u_sphereMode;\nuniform int u_toonFlag;\nuniform vec4 u_addTexCoeff;\nuniform vec4 u_mulTexCoeff;\nuniform vec4 u_addSphereCoeff;\nuniform vec4 u_mulSphereCoeff;\nuniform vec4 u_addToonCoeff;\nuniform vec4 u_mulToonCoeff;\nuniform vec3 ambientCoefficient;\n\nvec2 calcLightUV(vec4 projectionSpacePos)\n{\n   return (projectionSpacePos.xy/projectionSpacePos.w+vec2(1,1))/2.;\n}\n\nvec4 blendPMXTexture(sampler2D source,vec2 uv,vec4 addCoeff,vec4 mulCoeff)\n{\n    vec4 result=texture2D(source,uv);\n    result.rgb=mix(mix(result.rgb,vec3(0,0,0),addCoeff.a),vec3(1,1,1),1.-mulCoeff.a);\n    result.rgb=result.rgb*mulCoeff.rgb+addCoeff.rgb;\n    return result;\n}\n\n\n\nvoid main(void){\n  gl_FragColor = vec4(0,0,0,0);\n  vec2 lightUV=calcLightUV(v_pos);\n  vec3 dlc = texture2D(dlight,lightUV).rgb;\n  vec3 slc = texture2D(slight,lightUV).rgb;\n  vec3 alc = u_ambient * ambientCoefficient;\n  if(u_toonFlag==1)\n  {\n\t\t  float brightness = max(max(dlc.r,dlc.g),dlc.b);\n      gl_FragColor.rgb+=blendPMXTexture(u_toon,vec2(0,1.-brightness),u_addToonCoeff  ,u_mulToonCoeff ).rgb * dlc;\n  }else\n  {\n      gl_FragColor.rgb+=dlc;\n  }\n\tgl_FragColor.a=u_diffuse.a;\n  gl_FragColor.rgb += slc + alc;\n}\n"
},{}],262:[function(require,module,exports){
module.exports = "precision mediump float;\nattribute vec4 position;\nattribute vec3 normal;\nattribute vec4 boneWeights;\nattribute vec4 boneIndicies;\nattribute vec2 uv;\n\nuniform mat4 matVP;\nuniform mat4 matV;\nuniform mediump sampler2D boneMatricies;\nuniform float boneCount;\n\nvarying vec4 vPosition;\nvarying vec3 vNormal;\nvarying vec2 vUV;\nvarying vec2 vSphereUV;\n\nmat4 matFromIndex(float index)\n{\n\tfloat y =index/boneCount+1./boneCount/2.;\n\treturn mat4(\n\ttexture2D(boneMatricies,vec2(0.125,y)),\n\ttexture2D(boneMatricies,vec2(0.375,y)),\n\ttexture2D(boneMatricies,vec2(0.625,y)),\n\ttexture2D(boneMatricies,vec2(0.875,y)));\n}\n\nmat4 getBoneTransform()\n{\n\treturn boneWeights.x*matFromIndex(boneIndicies.x)\n\t+boneWeights.y*matFromIndex(boneIndicies.y)\n\t+boneWeights.z*matFromIndex(boneIndicies.z)\n\t+boneWeights.w*matFromIndex(boneIndicies.w);\n}\n\nvoid main(void){\nmat4 boneTransform=getBoneTransform();\nvec4 tNormal = matV * boneTransform * vec4(normal,0);\nvPosition=gl_Position = matVP*boneTransform*position;\nvNormal=normalize(tNormal.xyz);\nvSphereUV=vNormal.xy/2.+vec2(0.5,0.5);\nvUV=uv;\n}\n"
},{}],263:[function(require,module,exports){
module.exports = "precision mediump float;\nuniform vec4 areaIndex;\nvoid main(void)\n{\n  gl_FragColor = areaIndex;\n}\n"
},{}],264:[function(require,module,exports){
module.exports = "precision mediump float;\n\nattribute vec4 position;\nattribute vec4 boneWeights;\nattribute vec4 boneIndicies;\n\nuniform mat4 matVP;\nuniform mediump sampler2D boneMatricies;\nuniform float boneCount;\n\nmat4 matFromIndex(float index)\n{\n\tfloat y =index/boneCount+1./boneCount/2.;\n\treturn mat4(\n\ttexture2D(boneMatricies,vec2(0.125,y)),\n\ttexture2D(boneMatricies,vec2(0.375,y)),\n\ttexture2D(boneMatricies,vec2(0.625,y)),\n\ttexture2D(boneMatricies,vec2(0.875,y)));\n}\n\nmat4 getBoneTransform()\n{\n\treturn boneWeights.x*matFromIndex(boneIndicies.x)\n\t+boneWeights.y*matFromIndex(boneIndicies.y)\n\t+boneWeights.z*matFromIndex(boneIndicies.z)\n\t+boneWeights.w*matFromIndex(boneIndicies.w);\n}\n\nvoid main(void){\nmat4 boneTransform=getBoneTransform();\ngl_Position = matVP*boneTransform*position;\n}\n"
},{}],265:[function(require,module,exports){
module.exports = "precision mediump float;\n\n//UNIFORM VARIABLES\nuniform float specularCoefficient;\n\n//VARYING VARIABLES\nvarying vec3 vNormal;\nvarying vec4 vPosition;\nvarying vec2 vUV;\nvarying vec2 vSphereUV;\n\nvec2 compressNormal()\n{\n\tfloat p = sqrt(vNormal.z * 8. + 8.);\n\treturn vNormal.xy/p + 0.5;\n}\n\nfloat calcDepth()\n{\n\treturn vPosition.z/vPosition.w;\n}\n\nvoid main(void)\n{\n\tgl_FragColor = vec4(compressNormal(),calcDepth(),specularCoefficient);\n}\n"
},{}],266:[function(require,module,exports){
module.exports = "precision mediump float;\n\nvarying vec4 vPosition;\nvarying vec3 vNormal;\nvarying vec2 vUV;\nvarying vec2 vSphereUV;\n\nuniform vec4 diffuse;\nuniform sampler2D texture;\nuniform sampler2D sphere;\nuniform mat4 matV;\nuniform int textureUsed;\nuniform int sphereMode;\nuniform vec4 addTextureCoefficient;\nuniform vec4 mulTextureCoefficient;\nuniform vec4 addSphereCoefficient;\nuniform vec4 mulSphereCoefficient;\n\n\nvec4 blendPMXTexture(sampler2D source,vec2 uv,vec4 addCoeff,vec4 mulCoeff)\n{\n    vec4 result=texture2D(source,abs(fract(uv)));\n    result.rgb=mix(mix(result.rgb,vec3(0,0,0),addCoeff.a),vec3(1,1,1),1.-mulCoeff.a);\n    result.rgb=result.rgb*mulCoeff.rgb+addCoeff.rgb;\n    return result;\n}\n\nvoid main(void){\n  gl_FragColor.rgba=diffuse;\n    if(textureUsed > 0){\n       gl_FragColor=blendPMXTexture(texture,vUV,addTextureCoefficient,mulTextureCoefficient);\n  }\n    if(sphereMode==1)\n    {\n      gl_FragColor.rgb*=blendPMXTexture(sphere,vSphereUV,addSphereCoefficient,mulSphereCoefficient).rgb;\n    }else if(sphereMode==2)\n    {\n      gl_FragColor.rgb+=blendPMXTexture(sphere,vSphereUV,addSphereCoefficient,mulSphereCoefficient).rgb;\n    }\n}\n"
},{}],267:[function(require,module,exports){
arguments[4][127][0].apply(exports,arguments)
},{"dup":127}],268:[function(require,module,exports){
module.exports = "precision mediump float;\nattribute vec4 position;\nattribute vec4 boneWeights;\nattribute vec4 boneIndicies;\n\nuniform mat4 matLVP;\nuniform mediump sampler2D boneMatricies;\nuniform float boneCount;\n\nvarying vec4 vPosition;\n\nmat4 matFromIndex(float index)\n{\n\tfloat y =index/boneCount+1./boneCount/2.;\n\treturn mat4(\n\ttexture2D(boneMatricies,vec2(0.125,y)),\n\ttexture2D(boneMatricies,vec2(0.375,y)),\n\ttexture2D(boneMatricies,vec2(0.625,y)),\n\ttexture2D(boneMatricies,vec2(0.875,y)));\n}\n\nmat4 getBoneTransform()\n{\n\treturn boneWeights.x*matFromIndex(boneIndicies.x)\n\t+boneWeights.y*matFromIndex(boneIndicies.y)\n\t+boneWeights.z*matFromIndex(boneIndicies.z)\n\t+boneWeights.w*matFromIndex(boneIndicies.w);\n}\n\nvoid main(void){\nmat4 boneTransform=getBoneTransform();\nvec4 tPos = boneTransform * position;\n vPosition = gl_Position = matLVP * tPos;\n}\n"
},{}],269:[function(require,module,exports){
module.exports = "precision mediump float;\n\nvarying vec4 vPosition;\nvarying vec3 vNormal;\nvarying vec2 vUV;\nvarying vec2 vSphereUV;\n\nuniform vec3 specular;\n\nvoid main(void)\n{\n\tgl_FragColor.rgb = specular;\n}\n"
},{}],270:[function(require,module,exports){
module.exports = "precision mediump float;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec4 boneWeights;\nattribute vec4 boneIndicies;\nuniform mat4 matMVP;\nuniform mat4 matMV;\nuniform mat4 matVP;\n\nvarying vec3 v_normal;\nvarying vec2 v_uv;\nvarying vec4 v_pos;\nvarying vec2 v_spuv;\n\n\nuniform sampler2D u_boneMatricies;\nuniform float u_boneCount;\n\nmat4 matFromIndex(float index)\n{\n\tfloat y =index/u_boneCount+1./u_boneCount/2.;\n\ty=y;\n\treturn mat4(\n\ttexture2D(u_boneMatricies,vec2(0.125,y)),\n\ttexture2D(u_boneMatricies,vec2(0.375,y)),\n\ttexture2D(u_boneMatricies,vec2(0.625,y)),\n\ttexture2D(u_boneMatricies,vec2(0.875,y)));\n}\n\nmat4 getBoneTransform()\n{\n\treturn boneWeights.x*matFromIndex(boneIndicies.x)\n\t+boneWeights.y*matFromIndex(boneIndicies.y)\n\t+boneWeights.z*matFromIndex(boneIndicies.z)\n\t+boneWeights.w*matFromIndex(boneIndicies.w);\n}\n\nvoid main(void){\nmat4 boneTransform=getBoneTransform();\nv_pos=gl_Position = matVP*boneTransform*vec4(position,1.0);\nv_normal=normalize((matMV*vec4(normal,0)).xyz);\nv_spuv=v_normal.xy/2.+vec2(0.5,0.5);\nv_uv=uv;\t\n}\n"
},{}],271:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Mesh = require('./Mesh');
var GBufferMaterial = require("../Core/Materials/Buffering/GBufferMaterial");
var ShadowMapMaterial = require("../Core/Materials/Buffering/ShadowMapMaterial");
var HitAreaTestMaterial = require("../Core/Materials/Buffering/HitTestMaterial");
var BasicMeshObject = (function (_super) {
    __extends(BasicMeshObject, _super);
    function BasicMeshObject(geometry, mat) {
        _super.call(this, geometry, mat);
        this.addMaterial(new GBufferMaterial());
        this.addMaterial(new ShadowMapMaterial());
        this.addMaterial(new HitAreaTestMaterial());
    }
    return BasicMeshObject;
})(Mesh);
module.exports = BasicMeshObject;

},{"../Core/Materials/Buffering/GBufferMaterial":47,"../Core/Materials/Buffering/HitTestMaterial":48,"../Core/Materials/Buffering/ShadowMapMaterial":49,"./Mesh":272}],272:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SceneObject = require("../Core/SceneObject");
var Mesh = (function (_super) {
    __extends(Mesh, _super);
    function Mesh(geometry, mat) {
        _super.call(this);
        if (mat)
            this.addMaterial(mat);
        if (geometry)
            this.geometry = geometry;
    }
    return Mesh;
})(SceneObject);
module.exports = Mesh;

},{"../Core/SceneObject":108}],273:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GomlTreeNodeBase = require("../../Goml/GomlTreeNodeBase");
var VMDData = require("../Parser/VMDData");
var Vector3 = require("../../Math/Vector3");
var Quaternion = require("../../Math/Quaternion");
var JThreeContext = require("../../JThreeContext");
var ContextComponents = require("../../ContextComponents");
var VMDNode = (function (_super) {
    __extends(VMDNode, _super);
    function VMDNode(elem, parent) {
        var _this = this;
        _super.call(this, elem, parent);
        this.autoSpeed = 0;
        this.lastTime = null;
        this.frame = 0;
        this.targetPMX = this.parent;
        this.targetPMX.onPMXTargetUpdate(function (e, o) { _this.attributes.updateValue(); });
        this.attributes.defineAttribute({
            "src": {
                value: "",
                converter: "string",
                handler: function (v) {
                    if (!v.Value || v.Value == _this.lastURL)
                        return;
                    if (_this.vmdLoadingDeferred)
                        _this.vmdLoadingDeferred.resolve(null);
                    _this.vmdLoadingDeferred = JThreeContext.getContextComponent(ContextComponents.ResourceLoader).getResourceLoadingDeffered();
                    VMDData.LoadFromUrl(v.Value).then(function (data) {
                        _this.lastURL = v.Value;
                        _this.targetVMD = data;
                        _this.attributes.applyDefaultValue();
                        _this.vmdLoadingDeferred.resolve(null);
                    });
                }
            },
            "frame": {
                value: 0,
                converter: "number",
                handler: function (v) {
                    _this.frame = Math.max(0, v.Value);
                    if (!_this.attributes.getValue("enabled"))
                        return;
                    if (_this.targetPMX.PMXModelReady && _this.targetVMD) {
                        for (var boneName in _this.targetVMD.Motions) {
                            var bone;
                            if (bone = _this.targetPMX.PMXModel.skeleton.getBoneByName(boneName)) {
                                var current = _this.targetVMD.getBoneFrame(_this.frame, boneName);
                                bone.Transformer.Position = new Vector3(current.position);
                                bone.Transformer.userRotation = new Quaternion(current.rotation);
                            }
                        }
                        for (var morphName in _this.targetVMD.Morphs) {
                            var morph;
                            if (morph = _this.targetPMX.PMXModel.MorphManager.getMorphByName(morphName)) {
                                var morphCurrent = _this.targetVMD.getMorphFrame(_this.frame, morphName);
                                if (morph)
                                    morph.Progress = morphCurrent.value;
                            }
                        }
                    }
                }
            },
            "enabled": {
                value: false,
                converter: "boolean",
                handler: function (v) {
                    _this.enabled = v.Value;
                }
            },
            "autoSpeed": {
                value: "0",
                converter: "number",
                handler: function (v) {
                    _this.autoSpeed = v.Value;
                }
            }
        });
    }
    VMDNode.prototype.update = function () {
        if (this.enabled && this.autoSpeed !== 0) {
            var timer = JThreeContext.getContextComponent(ContextComponents.Timer);
            if (this.lastTime === null) {
                this.lastTime = timer.Time;
                return;
            }
            else {
                var dt = timer.Time - this.lastTime;
                this.lastTime = timer.Time;
                this.attributes.setValue("frame", this.frame + dt / 1000 * 30 * this.autoSpeed);
            }
        }
    };
    return VMDNode;
})(GomlTreeNodeBase);
module.exports = VMDNode;

},{"../../ContextComponents":12,"../../Goml/GomlTreeNodeBase":179,"../../JThreeContext":226,"../../Math/Quaternion":232,"../../Math/Vector3":235,"../Parser/VMDData":275}],274:[function(require,module,exports){
var BezierCurve = (function () {
    function BezierCurve(v1x, v1y, v2x, v2y) {
        this.v1x = v1x;
        this.v1y = v1y;
        this.v2x = v2x;
        this.v2y = v2y;
    }
    BezierCurve.prototype.evaluate = function (progress) {
        var t = this.clamp(progress, 0, 1);
        var dt;
        do {
            dt = -(this.fx(t) - progress) / this.dfxdt(t);
            if (isNaN(dt))
                break;
            t += this.clamp(dt, -1, 1);
        } while (Math.abs(dt) > BezierCurve.Epsilon);
        return this.clamp(this.fy(t), 0, 1);
    };
    BezierCurve.prototype.clamp = function (p, min, max) {
        return Math.max(min, Math.min(p, max));
    };
    BezierCurve.prototype.fy = function (t) {
        return 3 * (1 - t) * (1 - t) * t * this.v1y + 3 * (1 - t) * t * t * this.v2y + t * t * t;
    };
    BezierCurve.prototype.fx = function (t) {
        return 3 * (1 - t) * (1 - t) * t * this.v1x + 3 * (1 - t) * t * t * this.v2x + t * t * t;
    };
    BezierCurve.prototype.dfxdt = function (t) {
        return -6 * (1 - t) * t * this.v1x + 3 * (1 - t) * (1 - t) * this.v1x - 3 * t * t * this.v2x + 6 * (1 - t) * t * this.v2x + 3 * t * t;
    };
    BezierCurve.Epsilon = 1.0E-3;
    return BezierCurve;
})();
module.exports = BezierCurve;

},{}],275:[function(require,module,exports){
var glm = require("gl-matrix");
var BezierCurve = require("./BezierCurve");
var Q = require("q");
var VMDData = (function () {
    function VMDData(data) {
        this.reader = new jDataView(data, 0, data.byteLength, true);
        this.loadHeader();
        this.loadMotion();
        this.loadMorph();
    }
    VMDData.LoadFromUrl = function (url) {
        var d = Q.defer();
        var targetUrl = url;
        var oReq = new XMLHttpRequest();
        oReq.open("GET", targetUrl, true);
        oReq.setRequestHeader("Accept", "*/*");
        oReq.responseType = "arraybuffer";
        oReq.onload = function () {
            var data = new VMDData(oReq.response);
            d.resolve(data);
        };
        oReq.send(null);
        return d.promise;
    };
    Object.defineProperty(VMDData.prototype, "Motions", {
        get: function () {
            return this.motions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VMDData.prototype, "Morphs", {
        get: function () {
            return this.morphs;
        },
        enumerable: true,
        configurable: true
    });
    VMDData.prototype.loadHeader = function () {
        var r = this.reader;
        this.header
            = {
                header: this.loadString(30),
                modelName: this.loadString(20)
            };
    };
    VMDData.prototype.loadMotion = function () {
        this.motions = {};
        var r = this.reader;
        var frameCount = r.getUint32();
        for (var i = 0; i < frameCount; i++) {
            var frameName = this.loadString(15);
            var data = {
                frameNumber: r.getUint32(),
                position: [r.getFloat32(), r.getFloat32(), -r.getFloat32()],
                rotation: [-r.getFloat32(), -r.getFloat32(), r.getFloat32(), r.getFloat32()],
                interpolation: this.loadInterpolation()
            };
            if (typeof this.motions[frameName] === "undefined") {
                this.motions[frameName] = [];
            }
            this.motions[frameName].push(data);
        }
        for (var motion in this.motions) {
            this.motions[motion].sort(function (i1, i2) { return i1.frameNumber - i2.frameNumber; });
        }
    };
    VMDData.prototype.loadMorph = function () {
        this.morphs = {};
        var r = this.reader;
        var frameCount = r.getUint32();
        for (var i = 0; i < frameCount; i++) {
            var frameName = this.loadString(15);
            var data = {
                frameNumber: r.getUint32(),
                morphValue: r.getFloat32()
            };
            if (typeof this.morphs[frameName] === "undefined") {
                this.morphs[frameName] = [];
            }
            this.morphs[frameName].push(data);
        }
        for (var morph in this.morphs) {
            this.morphs[morph].sort(function (i1, i2) { return i1.frameNumber - i2.frameNumber; });
        }
    };
    VMDData.prototype.loadBytes = function (byteLength) {
        var isPadding = false;
        var arr = [];
        for (var i = 0; i < byteLength; i++) {
            var current = this.reader.getUint8();
            if (current == 0x00) {
                isPadding = true;
            }
            if (!isPadding)
                arr.push(current);
        }
        return new Uint8Array(arr);
    };
    VMDData.prototype.loadString = function (length) {
        var decoder = new TextDecoder("shift-jis");
        return decoder.decode(this.loadBytes(length));
    };
    VMDData.prototype.loadInterpolation = function () {
        var interpolation = new Array(4);
        for (var i = 0; i < 4; i++) {
            interpolation[i] = new Array(4);
            for (var j = 0; j < 4; j++) {
                interpolation[i][j] = new Array(4);
            }
        }
        for (var i = 0; i < 4; i++)
            for (var j = 0; j < 4; j++)
                for (var k = 0; k < 4; k++)
                    interpolation[i][j][k] = this.reader.getUint8();
        var result = new Array(4);
        for (var i = 0; i < 4; i++) {
            result[i] = new BezierCurve(interpolation[0][0][i] / 128.0, interpolation[0][1][i] / 128.0, interpolation[0][2][i] / 128.0, interpolation[0][3][i] / 128);
        }
        return result;
    };
    VMDData.prototype.binaryframeSearch = function (source, frame) {
        var minIndex = 0;
        var maxIndex = source.length - 1;
        var currentIndex = -1;
        var currentElement;
        if (source.length == 1)
            return 0;
        while (minIndex <= maxIndex) {
            currentIndex = (minIndex + maxIndex) / 2 | 0;
            currentElement = source[currentIndex];
            if (currentElement.frameNumber < frame) {
                if (currentIndex + 1 < source.length && source[currentIndex + 1].frameNumber > frame) {
                    return currentIndex;
                }
                minIndex = currentIndex + 1;
            }
            else if (currentElement.frameNumber > frame) {
                maxIndex = currentIndex - 1;
                if (currentIndex - 1 >= 0 && source[currentIndex - 1].frameNumber < frame) {
                    return currentIndex - 1;
                }
            }
            else {
                return currentIndex;
            }
        }
        return currentIndex;
    };
    VMDData.prototype.getBoneFrame = function (frame, boneName) {
        var frames = this.motions[boneName];
        if (typeof frames === "undefined") {
            return null;
        }
        else {
            var index = this.binaryframeSearch(frames, frame);
            if (index + 1 < frames.length) {
                var nextFrame = frames[index + 1];
                var currentFrame = frames[index];
                var progress = (frame - currentFrame.frameNumber) / (nextFrame.frameNumber - currentFrame.frameNumber);
                return {
                    frameNumber: frame,
                    position: this.complementBoneTranslation(currentFrame.position, nextFrame.position, progress, currentFrame.interpolation),
                    rotation: glm.quat.slerp([0, 0, 0, 0], currentFrame.rotation, nextFrame.rotation, currentFrame.interpolation[3].evaluate(progress))
                };
            }
            else {
                return {
                    frameNumber: frame,
                    position: frames[index].position,
                    rotation: frames[index].rotation
                };
            }
        }
    };
    VMDData.prototype.complementBoneTranslation = function (begin, end, progress, bezierCurves) {
        var result = [0, 0, 0];
        for (var i = 0; i < 3; i++)
            result[i] = begin[i] + (end[i] - begin[i]) * bezierCurves[i].evaluate(progress);
        return result;
    };
    VMDData.prototype.getMorphFrame = function (frame, morphName) {
        var frames = this.morphs[morphName];
        if (typeof frames === "undefined") {
            return null;
        }
        else {
            var index = this.binaryframeSearch(frames, frame);
            if (index + 1 < frames.length) {
                var nextFrame = frames[index + 1];
                var currentFrame = frames[index];
                var progress = (frame - currentFrame.frameNumber) / (nextFrame.frameNumber - currentFrame.frameNumber);
                return {
                    frameNumber: frame,
                    value: currentFrame.morphValue + (nextFrame.morphValue - currentFrame.morphValue) * progress,
                };
            }
            else {
                return {
                    frameNumber: frame,
                    value: frames[index].morphValue,
                };
            }
        }
    };
    return VMDData;
})();
module.exports = VMDData;

},{"./BezierCurve":274,"gl-matrix":299,"q":309}],276:[function(require,module,exports){
var BlendFuncParamType;
(function (BlendFuncParamType) {
    BlendFuncParamType[BlendFuncParamType["Zero"] = 0] = "Zero";
    BlendFuncParamType[BlendFuncParamType["One"] = 1] = "One";
    BlendFuncParamType[BlendFuncParamType["SrcColor"] = 768] = "SrcColor";
    BlendFuncParamType[BlendFuncParamType["OneMinusSrcColor"] = 769] = "OneMinusSrcColor";
    BlendFuncParamType[BlendFuncParamType["OneMinusDstColor"] = 775] = "OneMinusDstColor";
    BlendFuncParamType[BlendFuncParamType["SrcAlpha"] = 770] = "SrcAlpha";
    BlendFuncParamType[BlendFuncParamType["OneMinusSrcAlpha"] = 771] = "OneMinusSrcAlpha";
    BlendFuncParamType[BlendFuncParamType["DstAlpha"] = 772] = "DstAlpha";
    BlendFuncParamType[BlendFuncParamType["OneMinusDstAlpha"] = 773] = "OneMinusDstAlpha";
    BlendFuncParamType[BlendFuncParamType["ConstantColor"] = 32769] = "ConstantColor";
    BlendFuncParamType[BlendFuncParamType["OneMinusConstantColor"] = 32770] = "OneMinusConstantColor";
    BlendFuncParamType[BlendFuncParamType["ConstantAlpha"] = 32771] = "ConstantAlpha";
    BlendFuncParamType[BlendFuncParamType["OneMinusConstantAlpha"] = 32772] = "OneMinusConstantAlpha";
    BlendFuncParamType[BlendFuncParamType["SrcAlphaSaturate"] = 776] = "SrcAlphaSaturate";
})(BlendFuncParamType || (BlendFuncParamType = {}));
module.exports = BlendFuncParamType;

},{}],277:[function(require,module,exports){
var BufferTargetType;
(function (BufferTargetType) {
    BufferTargetType[BufferTargetType["ArrayBuffer"] = 34962] = "ArrayBuffer";
    BufferTargetType[BufferTargetType["ElementArrayBuffer"] = 34963] = "ElementArrayBuffer";
})(BufferTargetType || (BufferTargetType = {}));
module.exports = BufferTargetType;

},{}],278:[function(require,module,exports){
var BufferUsageType;
(function (BufferUsageType) {
    BufferUsageType[BufferUsageType["StaticDraw"] = 35044] = "StaticDraw";
    BufferUsageType[BufferUsageType["StreamDraw"] = 35040] = "StreamDraw";
    BufferUsageType[BufferUsageType["DynamicDraw"] = 35048] = "DynamicDraw";
})(BufferUsageType || (BufferUsageType = {}));
module.exports = BufferUsageType;

},{}],279:[function(require,module,exports){
var ClearTargetType;
(function (ClearTargetType) {
    ClearTargetType[ClearTargetType["ColorBits"] = 16384] = "ColorBits";
    ClearTargetType[ClearTargetType["DepthBits"] = 256] = "DepthBits";
    ClearTargetType[ClearTargetType["StencilBits"] = 1024] = "StencilBits";
})(ClearTargetType || (ClearTargetType = {}));
module.exports = ClearTargetType;

},{}],280:[function(require,module,exports){
var ElementType;
(function (ElementType) {
    ElementType[ElementType["Float"] = 5126] = "Float";
    ElementType[ElementType["UnsignedByte"] = 5121] = "UnsignedByte";
    ElementType[ElementType["Short"] = 5122] = "Short";
    ElementType[ElementType["UnsignedShort"] = 5123] = "UnsignedShort";
    ElementType[ElementType["UnsignedInt"] = 5125] = "UnsignedInt";
    ElementType[ElementType["Int"] = 5124] = "Int";
})(ElementType || (ElementType = {}));
module.exports = ElementType;

},{}],281:[function(require,module,exports){
var FrameBufferAttachmentType;
(function (FrameBufferAttachmentType) {
    FrameBufferAttachmentType[FrameBufferAttachmentType["ColorAttachment0"] = 36064] = "ColorAttachment0";
    FrameBufferAttachmentType[FrameBufferAttachmentType["ColorAttachment1"] = 36065] = "ColorAttachment1";
    FrameBufferAttachmentType[FrameBufferAttachmentType["ColorAttachment2"] = 36066] = "ColorAttachment2";
    FrameBufferAttachmentType[FrameBufferAttachmentType["ColorAttachment3"] = 36067] = "ColorAttachment3";
    FrameBufferAttachmentType[FrameBufferAttachmentType["ColorAttachment4"] = 36068] = "ColorAttachment4";
    FrameBufferAttachmentType[FrameBufferAttachmentType["ColorAttachment5"] = 36069] = "ColorAttachment5";
    FrameBufferAttachmentType[FrameBufferAttachmentType["ColorAttachment6"] = 36070] = "ColorAttachment6";
    FrameBufferAttachmentType[FrameBufferAttachmentType["ColorAttachment7"] = 36071] = "ColorAttachment7";
    FrameBufferAttachmentType[FrameBufferAttachmentType["ColorAttachment8"] = 36072] = "ColorAttachment8";
    FrameBufferAttachmentType[FrameBufferAttachmentType["ColorAttachment9"] = 36073] = "ColorAttachment9";
    FrameBufferAttachmentType[FrameBufferAttachmentType["ColorAttachment10"] = 36074] = "ColorAttachment10";
    FrameBufferAttachmentType[FrameBufferAttachmentType["ColorAttachment11"] = 36075] = "ColorAttachment11";
    FrameBufferAttachmentType[FrameBufferAttachmentType["ColorAttachment12"] = 36076] = "ColorAttachment12";
    FrameBufferAttachmentType[FrameBufferAttachmentType["ColorAttachment13"] = 36077] = "ColorAttachment13";
    FrameBufferAttachmentType[FrameBufferAttachmentType["ColorAttachment14"] = 36078] = "ColorAttachment14";
    FrameBufferAttachmentType[FrameBufferAttachmentType["ColorAttachment15"] = 36079] = "ColorAttachment15";
    FrameBufferAttachmentType[FrameBufferAttachmentType["DepthAttachment"] = 36096] = "DepthAttachment";
    FrameBufferAttachmentType[FrameBufferAttachmentType["StencilAttachment"] = 36128] = "StencilAttachment";
    FrameBufferAttachmentType[FrameBufferAttachmentType["DepthStencilAttachment"] = 33306] = "DepthStencilAttachment";
})(FrameBufferAttachmentType || (FrameBufferAttachmentType = {}));
module.exports = FrameBufferAttachmentType;

},{}],282:[function(require,module,exports){
var GLFeatureType;
(function (GLFeatureType) {
    GLFeatureType[GLFeatureType["DepthTest"] = 2929] = "DepthTest";
    GLFeatureType[GLFeatureType["CullFace"] = 2884] = "CullFace";
    GLFeatureType[GLFeatureType["Blend"] = 3042] = "Blend";
})(GLFeatureType || (GLFeatureType = {}));
module.exports = GLFeatureType;

},{}],283:[function(require,module,exports){
var GetParameterType;
(function (GetParameterType) {
    GetParameterType[GetParameterType["MaxCombinedTextureImageUnits"] = 35661] = "MaxCombinedTextureImageUnits";
    GetParameterType[GetParameterType["MaxCubeMapTextureSize"] = 34076] = "MaxCubeMapTextureSize";
    GetParameterType[GetParameterType["MaxFragmentUniformVectors"] = 36349] = "MaxFragmentUniformVectors";
    GetParameterType[GetParameterType["MaxRenderbufferSize"] = 34024] = "MaxRenderbufferSize";
    GetParameterType[GetParameterType["MaxTextureImageUnits"] = 34930] = "MaxTextureImageUnits";
    GetParameterType[GetParameterType["MaxTextureSize"] = 3379] = "MaxTextureSize";
    GetParameterType[GetParameterType["MaxVaryingVectors"] = 36348] = "MaxVaryingVectors";
    GetParameterType[GetParameterType["MaxVertexAttribs"] = 34921] = "MaxVertexAttribs";
    GetParameterType[GetParameterType["MaxVertexTextureImageUnits"] = 35660] = "MaxVertexTextureImageUnits";
    GetParameterType[GetParameterType["MaxVertexUniformVectors"] = 36347] = "MaxVertexUniformVectors";
    GetParameterType[GetParameterType["MaxViewportDims"] = 3386] = "MaxViewportDims";
})(GetParameterType || (GetParameterType = {}));
module.exports = GetParameterType;

},{}],284:[function(require,module,exports){
var PrimitiveTopology;
(function (PrimitiveTopology) {
    PrimitiveTopology[PrimitiveTopology["Triangles"] = 4] = "Triangles";
    PrimitiveTopology[PrimitiveTopology["TriangleStrip"] = 5] = "TriangleStrip";
    PrimitiveTopology[PrimitiveTopology["TriangleFan"] = 6] = "TriangleFan";
    PrimitiveTopology[PrimitiveTopology["Lines"] = 1] = "Lines";
    PrimitiveTopology[PrimitiveTopology["LineStrip"] = 3] = "LineStrip";
    PrimitiveTopology[PrimitiveTopology["LineLoop"] = 2] = "LineLoop";
    PrimitiveTopology[PrimitiveTopology["Points"] = 0] = "Points";
})(PrimitiveTopology || (PrimitiveTopology = {}));
module.exports = PrimitiveTopology;

},{}],285:[function(require,module,exports){
var RBOInternalFormat;
(function (RBOInternalFormat) {
    RBOInternalFormat[RBOInternalFormat["RGBA4"] = 32854] = "RGBA4";
    RBOInternalFormat[RBOInternalFormat["RGB565"] = 36194] = "RGB565";
    RBOInternalFormat[RBOInternalFormat["RGB5A1"] = 32855] = "RGB5A1";
    RBOInternalFormat[RBOInternalFormat["DepthComponent16"] = 33189] = "DepthComponent16";
})(RBOInternalFormat || (RBOInternalFormat = {}));
module.exports = RBOInternalFormat;

},{}],286:[function(require,module,exports){
var ShaderType;
(function (ShaderType) {
    ShaderType[ShaderType["VertexShader"] = 35633] = "VertexShader";
    ShaderType[ShaderType["FragmentShader"] = 35632] = "FragmentShader";
})(ShaderType || (ShaderType = {}));
module.exports = ShaderType;

},{}],287:[function(require,module,exports){
var TargetTextureType;
(function (TargetTextureType) {
    TargetTextureType[TargetTextureType["Texture2D"] = 3553] = "Texture2D";
    TargetTextureType[TargetTextureType["CubeTexture"] = 34067] = "CubeTexture";
})(TargetTextureType || (TargetTextureType = {}));
module.exports = TargetTextureType;

},{}],288:[function(require,module,exports){
var PixelStoreParamType;
(function (PixelStoreParamType) {
    PixelStoreParamType[PixelStoreParamType["PackAlignment"] = 3333] = "PackAlignment";
    PixelStoreParamType[PixelStoreParamType["UnpackAlignment"] = 3317] = "UnpackAlignment";
    PixelStoreParamType[PixelStoreParamType["UnpackFlipYWebGL"] = 37440] = "UnpackFlipYWebGL";
    PixelStoreParamType[PixelStoreParamType["UnpackPremultiplyAlphaWebGL"] = 37441] = "UnpackPremultiplyAlphaWebGL";
    PixelStoreParamType[PixelStoreParamType["UnpackColorSpaceConversionWebGL"] = 37443] = "UnpackColorSpaceConversionWebGL";
})(PixelStoreParamType || (PixelStoreParamType = {}));
module.exports = PixelStoreParamType;

},{}],289:[function(require,module,exports){
var TargetTextureType;
(function (TargetTextureType) {
    TargetTextureType[TargetTextureType["Texture2D"] = 3553] = "Texture2D";
    TargetTextureType[TargetTextureType["CubePositiveX"] = 34069] = "CubePositiveX";
    TargetTextureType[TargetTextureType["CubeNegativeX"] = 34070] = "CubeNegativeX";
    TargetTextureType[TargetTextureType["CubePositiveY"] = 34071] = "CubePositiveY";
    TargetTextureType[TargetTextureType["CubeNegativeY"] = 34072] = "CubeNegativeY";
    TargetTextureType[TargetTextureType["CubePositiveZ"] = 34073] = "CubePositiveZ";
    TargetTextureType[TargetTextureType["CubeNegativeZ"] = 34074] = "CubeNegativeZ";
})(TargetTextureType || (TargetTextureType = {}));
module.exports = TargetTextureType;

},{}],290:[function(require,module,exports){
var TextureMagFilterType;
(function (TextureMagFilterType) {
    TextureMagFilterType[TextureMagFilterType["Nearest"] = 9728] = "Nearest";
    TextureMagFilterType[TextureMagFilterType["Linear"] = 9729] = "Linear";
})(TextureMagFilterType || (TextureMagFilterType = {}));
module.exports = TextureMagFilterType;

},{}],291:[function(require,module,exports){
var TextureMinFilterType;
(function (TextureMinFilterType) {
    TextureMinFilterType[TextureMinFilterType["Nearest"] = 9728] = "Nearest";
    TextureMinFilterType[TextureMinFilterType["Linear"] = 9729] = "Linear";
    TextureMinFilterType[TextureMinFilterType["NearestMipmapNearest"] = 9984] = "NearestMipmapNearest";
    TextureMinFilterType[TextureMinFilterType["LinearMipmapNearest"] = 9985] = "LinearMipmapNearest";
    TextureMinFilterType[TextureMinFilterType["NearestMipmapLinear"] = 9986] = "NearestMipmapLinear";
    TextureMinFilterType[TextureMinFilterType["LinearMipmapLinear"] = 9987] = "LinearMipmapLinear";
})(TextureMinFilterType || (TextureMinFilterType = {}));
module.exports = TextureMinFilterType;

},{}],292:[function(require,module,exports){
var TextureParameterType;
(function (TextureParameterType) {
    TextureParameterType[TextureParameterType["MinFilter"] = 10241] = "MinFilter";
    TextureParameterType[TextureParameterType["MagFilter"] = 10240] = "MagFilter";
    TextureParameterType[TextureParameterType["WrapS"] = 10242] = "WrapS";
    TextureParameterType[TextureParameterType["WrapT"] = 10243] = "WrapT";
})(TextureParameterType || (TextureParameterType = {}));
module.exports = TextureParameterType;

},{}],293:[function(require,module,exports){
var TextureRegister;
(function (TextureRegister) {
    TextureRegister[TextureRegister["Texture0"] = 33984] = "Texture0";
    TextureRegister[TextureRegister["Texture1"] = 33985] = "Texture1";
    TextureRegister[TextureRegister["Texture2"] = 33986] = "Texture2";
    TextureRegister[TextureRegister["Texture3"] = 33987] = "Texture3";
    TextureRegister[TextureRegister["Texture4"] = 33988] = "Texture4";
    TextureRegister[TextureRegister["Texture5"] = 33989] = "Texture5";
    TextureRegister[TextureRegister["Texture6"] = 33990] = "Texture6";
    TextureRegister[TextureRegister["Texture7"] = 33991] = "Texture7";
    TextureRegister[TextureRegister["Texture8"] = 33992] = "Texture8";
    TextureRegister[TextureRegister["Texture9"] = 33993] = "Texture9";
    TextureRegister[TextureRegister["Texture10"] = 33994] = "Texture10";
    TextureRegister[TextureRegister["Texture11"] = 33995] = "Texture11";
    TextureRegister[TextureRegister["Texture12"] = 33996] = "Texture12";
    TextureRegister[TextureRegister["Texture13"] = 33997] = "Texture13";
})(TextureRegister || (TextureRegister = {}));
module.exports = TextureRegister;

},{}],294:[function(require,module,exports){
var TextureWrapType;
(function (TextureWrapType) {
    TextureWrapType[TextureWrapType["ClampToEdge"] = 33071] = "ClampToEdge";
    TextureWrapType[TextureWrapType["MirroredRepeat"] = 33648] = "MirroredRepeat";
    TextureWrapType[TextureWrapType["Repeat"] = 10497] = "Repeat";
})(TextureWrapType || (TextureWrapType = {}));
module.exports = TextureWrapType;

},{}],295:[function(require,module,exports){
var TextureInternalFormatType;
(function (TextureInternalFormatType) {
    TextureInternalFormatType[TextureInternalFormatType["Alpha"] = 6406] = "Alpha";
    TextureInternalFormatType[TextureInternalFormatType["Luminance"] = 6409] = "Luminance";
    TextureInternalFormatType[TextureInternalFormatType["LuminanceAlpha"] = 6410] = "LuminanceAlpha";
    TextureInternalFormatType[TextureInternalFormatType["RGB"] = 6407] = "RGB";
    TextureInternalFormatType[TextureInternalFormatType["RGBA"] = 6408] = "RGBA";
    TextureInternalFormatType[TextureInternalFormatType["DEPTH_COMPONENT"] = 6402] = "DEPTH_COMPONENT";
    TextureInternalFormatType[TextureInternalFormatType["DEPTH_STENCIL"] = 34041] = "DEPTH_STENCIL";
})(TextureInternalFormatType || (TextureInternalFormatType = {}));
module.exports = TextureInternalFormatType;

},{}],296:[function(require,module,exports){
var TextureType;
(function (TextureType) {
    TextureType[TextureType["UnsignedByte"] = 5121] = "UnsignedByte";
    TextureType[TextureType["Float"] = 5126] = "Float";
    TextureType[TextureType["UnsignedShort565"] = 33635] = "UnsignedShort565";
    TextureType[TextureType["UnsignedShort4444"] = 32819] = "UnsignedShort4444";
    TextureType[TextureType["UnsignedShort5551"] = 32820] = "UnsignedShort5551";
    TextureType[TextureType["UnsignedShort"] = 5123] = "UnsignedShort";
    TextureType[TextureType["UnsignedInt"] = 5125] = "UnsignedInt";
    TextureType[TextureType["UnsignedInt24_8WebGL"] = 34042] = "UnsignedInt24_8WebGL";
})(TextureType || (TextureType = {}));
module.exports = TextureType;

},{}],297:[function(require,module,exports){
module.exports=﻿{
	"aliceblue": "#F0F8FF",
	"antiquewhite": "#FAEBD7",
	"aqua": "#00FFFF",
	"aquamarine": "#7FFFD4",
	"azure": "#F0FFFF",
	"beige": "#F5F5DC",
	"bisque": "#FFE4C4",
	"black": "#000000",
	"blanchedalmond": "#FFEBCD",
	"blue": "#0000FF",
	"blueviolet": "#8A2BE2",
	"brown": "#A52A2A",
	"burlywood": "#DEB887",
	"cadetblue": "#5F9EA0",
	"chartreuse": "#7FFF00",
	"chocolate": "#D2691E",
	"coral": "#FF7F50",
	"cornflowerblue": "#6495ED",
	"cornsilk": "#FFF8DC",
	"crimson": "#DC143C",
	"cyan": "#00FFFF",
	"darkblue": "#00008B",
	"darkcyan": "#008B8B",
	"darkgoldenrod": "#B8860B",
	"darkgray": "#A9A9A9",
	"darkgreen": "#006400",
	"darkgrey": "#A9A9A9",
	"darkkhaki": "#BDB76B",
	"darkmagenta": "#8B008B",
	"darkolivegreen": "#556B2F",
	"darkorange": "#FF8C00",
	"darkorchid": "#9932CC",
	"darkred": "#8B0000",
	"darksalmon": "#E9967A",
	"darkseagreen": "#8FBC8F",
	"darkslateblue": "#483D8B",
	"darkslategray": "#2F4F4F",
	"darkslategrey": "#2F4F4F",
	"darkturquoise": "#00CED1",
	"darkviolet": "#9400D3",
	"deeppink": "#FF1493",
	"deepskyblue": "#00BFFF",
	"dimgray": "#696969",
	"dimgrey": "#696969",
	"dodgerblue": "#1E90FF",
	"firebrick": "#B22222",
	"floralwhite": "#FFFAF0",
	"forestgreen": "#228B22",
	"fuchsia": "#FF00FF",
	"gainsboro": "#DCDCDC",
	"ghostwhite": "#F8F8FF",
	"gold": "#FFD700",
	"goldenrod": "#DAA520",
	"gray": "#808080",
	"green": "#008000",
	"greenyellow": "#ADFF2F",
	"grey": "#808080",
	"honeydew": "#F0FFF0",
	"hotpink": "#FF69B4",
	"indianred": "#CD5C5C",
	"indigo": "#4B0082",
	"ivory": "#FFFFF0",
	"khaki": "#F0E68C",
	"lavender": "#E6E6FA",
	"lavenderblush": "#FFF0F5",
	"lawngreen": "#7CFC00",
	"lemonchiffon": "#FFFACD",
	"lightblue": "#ADD8E6",
	"lightcoral": "#F08080",
	"lightcyan": "#E0FFFF",
	"lightgoldenrodyellow": "#FAFAD2",
	"lightgray": "#D3D3D3",
	"lightgreen": "#90EE90",
	"lightgrey": "#D3D3D3",
	"lightpink": "#FFB6C1",
	"lightsalmon": "#FFA07A",
	"lightseagreen": "#20B2AA",
	"lightskyblue": "#87CEFA",
	"lightslategray": "#778899",
	"lightslategrey": "#778899",
	"lightsteelblue": "#B0C4DE",
	"lightyellow": "#FFFFE0",
	"lime": "#00FF00",
	"limegreen": "#32CD32",
	"linen": "#FAF0E6",
	"magenta": "#FF00FF",
	"maroon": "#800000",
	"mediumaquamarine": "#66CDAA",
	"mediumblue": "#0000CD",
	"mediumorchid": "#BA55D3",
	"mediumpurple": "#9370DB",
	"mediumseagreen": "#3CB371",
	"mediumslateblue": "#7B68EE",
	"mediumspringgreen": "#00FA9A",
	"mediumturquoise": "#48D1CC",
	"mediumvioletred": "#C71585",
	"midnightblue": "#191970",
	"mintcream": "#F5FFFA",
	"mistyrose": "#FFE4E1",
	"moccasin": "#FFE4B5",
	"navajowhite": "#FFDEAD",
	"navy": "#000080",
	"oldlace": "#FDF5E6",
	"olive": "#808000",
	"olivedrab": "#6B8E23",
	"orange": "#FFA500",
	"orangered": "#FF4500",
	"orchid": "#DA70D6",
	"palegoldenrod": "#EEE8AA",
	"palegreen": "#98FB98",
	"paleturquoise": "#AFEEEE",
	"palevioletred": "#DB7093",
	"papayawhip": "#FFEFD5",
	"peachpuff": "#FFDAB9",
	"peru": "#CD853F",
	"pink": "#FFC0CB",
	"plum": "#DDA0DD",
	"powderblue": "#B0E0E6",
	"purple": "#800080",
	"red": "#FF0000",
	"rosybrown": "#BC8F8F",
	"royalblue": "#4169E1",
	"saddlebrown": "#8B4513",
	"salmon": "#FA8072",
	"sandybrown": "#F4A460",
	"seagreen": "#2E8B57",
	"seashell": "#FFF5EE",
	"sienna": "#A0522D",
	"silver": "#C0C0C0",
	"skyblue": "#87CEEB",
	"slateblue": "#6A5ACD",
	"slategray": "#708090",
	"slategrey": "#708090",
	"snow": "#FFFAFA",
	"springgreen": "#00FF7F",
	"steelblue": "#4682B4",
	"tan": "#D2B48C",
	"teal": "#008080",
	"thistle": "#D8BFD8",
	"tomato": "#FF6347",
	"turquoise": "#40E0D0",
	"violet": "#EE82EE",
	"wheat": "#F5DEB3",
	"white": "#FFFFFF",
	"whitesmoke": "#F5F5F5",
	"yellow": "#FFFF00",
	"yellowgreen": "#9ACD32"
}

},{}],298:[function(require,module,exports){
module.exports = "<div style=\"background:black;height:100%;\">\n  <div style=\"position:relative;top: 50%;-webkit-transform: translateY(-50%);-ms-transform: translateY(-50%);transform: translateY(-50%);\">\n      <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 128 128\" style=\"width:128px;height:128px;display:block;position:relative;left: 50%;-webkit-transform: translateX(-50%);-ms-transform: translateX(-50%);transform: translateX(-50%);\" xml:space=\"preserve\">\n        <g>\n          <path style=\"fill:none;stroke:#FFFFFF;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;\" d=\"M64,55.967L1.5,20.701l14.223,62.696l11.873,10.601L16.819,29.244l4.079,24.204l21.555,15.126l3.713,42.002L64,126.5V55.967z\"/>\n          <path style=\"fill:none;stroke:#FFFFFF;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;\" d=\"M126.5,20.701L64,1.5L1.5,20.701l15.021,8.476L64,11.686l23.507,8.655L39.754,42.286L64,55.967L126.5,20.701z\"/>\n          <path style=\"fill:none;stroke:#FFFFFF;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;\" d=\"M64,109.793l38.989-32.105l3.905-23.793L64,83.405V55.967l62.5-35.266l-13.822,62.696L64,126.5V109.793z\"/>\n        </g>\n      </svg>\n    <div style=\"height:5px;background:white;width:30%;margin-left:auto;margin-right:auto;margin-top:30px;border:white solid 2px;\">\n      <div class=\"x-j3-loader-progress\" style=\"background:lime;height:5px;width:0%;\"/>\n    </div>\n  </div>\n</div>\n"
},{}],299:[function(require,module,exports){
/**
 * @fileoverview gl-matrix - High performance matrix and vector operations
 * @author Brandon Jones
 * @author Colin MacKenzie IV
 * @version 2.3.0
 */

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */
// END HEADER

exports.glMatrix = require("./gl-matrix/common.js");
exports.mat2 = require("./gl-matrix/mat2.js");
exports.mat2d = require("./gl-matrix/mat2d.js");
exports.mat3 = require("./gl-matrix/mat3.js");
exports.mat4 = require("./gl-matrix/mat4.js");
exports.quat = require("./gl-matrix/quat.js");
exports.vec2 = require("./gl-matrix/vec2.js");
exports.vec3 = require("./gl-matrix/vec3.js");
exports.vec4 = require("./gl-matrix/vec4.js");
},{"./gl-matrix/common.js":300,"./gl-matrix/mat2.js":301,"./gl-matrix/mat2d.js":302,"./gl-matrix/mat3.js":303,"./gl-matrix/mat4.js":304,"./gl-matrix/quat.js":305,"./gl-matrix/vec2.js":306,"./gl-matrix/vec3.js":307,"./gl-matrix/vec4.js":308}],300:[function(require,module,exports){
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

/**
 * @class Common utilities
 * @name glMatrix
 */
var glMatrix = {};

// Constants
glMatrix.EPSILON = 0.000001;
glMatrix.ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
glMatrix.RANDOM = Math.random;

/**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */
glMatrix.setMatrixArrayType = function(type) {
    GLMAT_ARRAY_TYPE = type;
}

var degree = Math.PI / 180;

/**
* Convert Degree To Radian
*
* @param {Number} Angle in Degrees
*/
glMatrix.toRadian = function(a){
     return a * degree;
}

module.exports = glMatrix;

},{}],301:[function(require,module,exports){
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = require("./common.js");

/**
 * @class 2x2 Matrix
 * @name mat2
 */
var mat2 = {};

/**
 * Creates a new identity mat2
 *
 * @returns {mat2} a new 2x2 matrix
 */
mat2.create = function() {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Creates a new mat2 initialized with values from an existing matrix
 *
 * @param {mat2} a matrix to clone
 * @returns {mat2} a new 2x2 matrix
 */
mat2.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Copy the values from one mat2 to another
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set a mat2 to the identity matrix
 *
 * @param {mat2} out the receiving matrix
 * @returns {mat2} out
 */
mat2.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Transpose the values of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a1 = a[1];
        out[1] = a[2];
        out[2] = a1;
    } else {
        out[0] = a[0];
        out[1] = a[2];
        out[2] = a[1];
        out[3] = a[3];
    }
    
    return out;
};

/**
 * Inverts a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],

        // Calculate the determinant
        det = a0 * a3 - a2 * a1;

    if (!det) {
        return null;
    }
    det = 1.0 / det;
    
    out[0] =  a3 * det;
    out[1] = -a1 * det;
    out[2] = -a2 * det;
    out[3] =  a0 * det;

    return out;
};

/**
 * Calculates the adjugate of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.adjoint = function(out, a) {
    // Caching this value is nessecary if out == a
    var a0 = a[0];
    out[0] =  a[3];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] =  a0;

    return out;
};

/**
 * Calculates the determinant of a mat2
 *
 * @param {mat2} a the source matrix
 * @returns {Number} determinant of a
 */
mat2.determinant = function (a) {
    return a[0] * a[3] - a[2] * a[1];
};

/**
 * Multiplies two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
mat2.multiply = function (out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    return out;
};

/**
 * Alias for {@link mat2.multiply}
 * @function
 */
mat2.mul = mat2.multiply;

/**
 * Rotates a mat2 by the given angle
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
mat2.rotate = function (out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = a0 *  c + a2 * s;
    out[1] = a1 *  c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    return out;
};

/**
 * Scales the mat2 by the dimensions in the given vec2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2} out
 **/
mat2.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    return out;
};

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.rotate(dest, dest, rad);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
mat2.fromRotation = function(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = -s;
    out[3] = c;
    return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.scale(dest, dest, vec);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat2} out
 */
mat2.fromScaling = function(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = v[1];
    return out;
}

/**
 * Returns a string representation of a mat2
 *
 * @param {mat2} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2.str = function (a) {
    return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

/**
 * Returns Frobenius norm of a mat2
 *
 * @param {mat2} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat2.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2)))
};

/**
 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
 * @param {mat2} L the lower triangular matrix 
 * @param {mat2} D the diagonal matrix 
 * @param {mat2} U the upper triangular matrix 
 * @param {mat2} a the input matrix to factorize
 */

mat2.LDU = function (L, D, U, a) { 
    L[2] = a[2]/a[0]; 
    U[0] = a[0]; 
    U[1] = a[1]; 
    U[3] = a[3] - L[2] * U[1]; 
    return [L, D, U];       
}; 


module.exports = mat2;

},{"./common.js":300}],302:[function(require,module,exports){
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = require("./common.js");

/**
 * @class 2x3 Matrix
 * @name mat2d
 * 
 * @description 
 * A mat2d contains six elements defined as:
 * <pre>
 * [a, c, tx,
 *  b, d, ty]
 * </pre>
 * This is a short form for the 3x3 matrix:
 * <pre>
 * [a, c, tx,
 *  b, d, ty,
 *  0, 0, 1]
 * </pre>
 * The last row is ignored so the array is shorter and operations are faster.
 */
var mat2d = {};

/**
 * Creates a new identity mat2d
 *
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.create = function() {
    var out = new glMatrix.ARRAY_TYPE(6);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Creates a new mat2d initialized with values from an existing matrix
 *
 * @param {mat2d} a matrix to clone
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(6);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Copy the values from one mat2d to another
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Set a mat2d to the identity matrix
 *
 * @param {mat2d} out the receiving matrix
 * @returns {mat2d} out
 */
mat2d.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Inverts a mat2d
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.invert = function(out, a) {
    var aa = a[0], ab = a[1], ac = a[2], ad = a[3],
        atx = a[4], aty = a[5];

    var det = aa * ad - ab * ac;
    if(!det){
        return null;
    }
    det = 1.0 / det;

    out[0] = ad * det;
    out[1] = -ab * det;
    out[2] = -ac * det;
    out[3] = aa * det;
    out[4] = (ac * aty - ad * atx) * det;
    out[5] = (ab * atx - aa * aty) * det;
    return out;
};

/**
 * Calculates the determinant of a mat2d
 *
 * @param {mat2d} a the source matrix
 * @returns {Number} determinant of a
 */
mat2d.determinant = function (a) {
    return a[0] * a[3] - a[1] * a[2];
};

/**
 * Multiplies two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
mat2d.multiply = function (out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    out[4] = a0 * b4 + a2 * b5 + a4;
    out[5] = a1 * b4 + a3 * b5 + a5;
    return out;
};

/**
 * Alias for {@link mat2d.multiply}
 * @function
 */
mat2d.mul = mat2d.multiply;

/**
 * Rotates a mat2d by the given angle
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */
mat2d.rotate = function (out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = a0 *  c + a2 * s;
    out[1] = a1 *  c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    out[4] = a4;
    out[5] = a5;
    return out;
};

/**
 * Scales the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2d} out
 **/
mat2d.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    out[4] = a4;
    out[5] = a5;
    return out;
};

/**
 * Translates the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to translate the matrix by
 * @returns {mat2d} out
 **/
mat2d.translate = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        v0 = v[0], v1 = v[1];
    out[0] = a0;
    out[1] = a1;
    out[2] = a2;
    out[3] = a3;
    out[4] = a0 * v0 + a2 * v1 + a4;
    out[5] = a1 * v0 + a3 * v1 + a5;
    return out;
};

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.rotate(dest, dest, rad);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */
mat2d.fromRotation = function(out, rad) {
    var s = Math.sin(rad), c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = -s;
    out[3] = c;
    out[4] = 0;
    out[5] = 0;
    return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.scale(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat2d} out
 */
mat2d.fromScaling = function(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = v[1];
    out[4] = 0;
    out[5] = 0;
    return out;
}

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.translate(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {vec2} v Translation vector
 * @returns {mat2d} out
 */
mat2d.fromTranslation = function(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = v[0];
    out[5] = v[1];
    return out;
}

/**
 * Returns a string representation of a mat2d
 *
 * @param {mat2d} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2d.str = function (a) {
    return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
                    a[3] + ', ' + a[4] + ', ' + a[5] + ')';
};

/**
 * Returns Frobenius norm of a mat2d
 *
 * @param {mat2d} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat2d.frob = function (a) { 
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + 1))
}; 

module.exports = mat2d;

},{"./common.js":300}],303:[function(require,module,exports){
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = require("./common.js");

/**
 * @class 3x3 Matrix
 * @name mat3
 */
var mat3 = {};

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */
mat3.create = function() {
    var out = new glMatrix.ARRAY_TYPE(9);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */
mat3.fromMat4 = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[4];
    out[4] = a[5];
    out[5] = a[6];
    out[6] = a[8];
    out[7] = a[9];
    out[8] = a[10];
    return out;
};

/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {mat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */
mat3.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(9);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
mat3.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a12 = a[5];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a01;
        out[5] = a[7];
        out[6] = a02;
        out[7] = a12;
    } else {
        out[0] = a[0];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a[1];
        out[4] = a[4];
        out[5] = a[7];
        out[6] = a[2];
        out[7] = a[5];
        out[8] = a[8];
    }
    
    return out;
};

/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b01 = a22 * a11 - a12 * a21,
        b11 = -a22 * a10 + a12 * a20,
        b21 = a21 * a10 - a11 * a20,

        // Calculate the determinant
        det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
};

/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    out[0] = (a11 * a22 - a12 * a21);
    out[1] = (a02 * a21 - a01 * a22);
    out[2] = (a01 * a12 - a02 * a11);
    out[3] = (a12 * a20 - a10 * a22);
    out[4] = (a00 * a22 - a02 * a20);
    out[5] = (a02 * a10 - a00 * a12);
    out[6] = (a10 * a21 - a11 * a20);
    out[7] = (a01 * a20 - a00 * a21);
    out[8] = (a00 * a11 - a01 * a10);
    return out;
};

/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */
mat3.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
};

/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b00 = b[0], b01 = b[1], b02 = b[2],
        b10 = b[3], b11 = b[4], b12 = b[5],
        b20 = b[6], b21 = b[7], b22 = b[8];

    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;

    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;

    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
};

/**
 * Alias for {@link mat3.multiply}
 * @function
 */
mat3.mul = mat3.multiply;

/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */
mat3.translate = function(out, a, v) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],
        x = v[0], y = v[1];

    out[0] = a00;
    out[1] = a01;
    out[2] = a02;

    out[3] = a10;
    out[4] = a11;
    out[5] = a12;

    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;
    return out;
};

/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
mat3.rotate = function (out, a, rad) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        s = Math.sin(rad),
        c = Math.cos(rad);

    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;

    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;

    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
};

/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/
mat3.scale = function(out, a, v) {
    var x = v[0], y = v[1];

    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];

    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];

    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.translate(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Translation vector
 * @returns {mat3} out
 */
mat3.fromTranslation = function(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = v[0];
    out[7] = v[1];
    out[8] = 1;
    return out;
}

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.rotate(dest, dest, rad);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
mat3.fromRotation = function(out, rad) {
    var s = Math.sin(rad), c = Math.cos(rad);

    out[0] = c;
    out[1] = s;
    out[2] = 0;

    out[3] = -s;
    out[4] = c;
    out[5] = 0;

    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.scale(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat3} out
 */
mat3.fromScaling = function(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;

    out[3] = 0;
    out[4] = v[1];
    out[5] = 0;

    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
}

/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat2d} a the matrix to copy
 * @returns {mat3} out
 **/
mat3.fromMat2d = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = 0;

    out[3] = a[2];
    out[4] = a[3];
    out[5] = 0;

    out[6] = a[4];
    out[7] = a[5];
    out[8] = 1;
    return out;
};

/**
* Calculates a 3x3 matrix from the given quaternion
*
* @param {mat3} out mat3 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat3} out
*/
mat3.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[3] = yx - wz;
    out[6] = zx + wy;

    out[1] = yx + wz;
    out[4] = 1 - xx - zz;
    out[7] = zy - wx;

    out[2] = zx - wy;
    out[5] = zy + wx;
    out[8] = 1 - xx - yy;

    return out;
};

/**
* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
*
* @param {mat3} out mat3 receiving operation result
* @param {mat4} a Mat4 to derive the normal matrix from
*
* @returns {mat3} out
*/
mat3.normalFromMat4 = function (out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

    return out;
};

/**
 * Returns a string representation of a mat3
 *
 * @param {mat3} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat3.str = function (a) {
    return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
                    a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + 
                    a[6] + ', ' + a[7] + ', ' + a[8] + ')';
};

/**
 * Returns Frobenius norm of a mat3
 *
 * @param {mat3} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat3.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2)))
};


module.exports = mat3;

},{"./common.js":300}],304:[function(require,module,exports){
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = require("./common.js");

/**
 * @class 4x4 Matrix
 * @name mat4
 */
var mat4 = {};

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
mat4.create = function() {
    var out = new glMatrix.ARRAY_TYPE(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
mat4.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
mat4.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3],
            a12 = a[6], a13 = a[7],
            a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }
    
    return out;
};

/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
};

/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    out[0]  =  (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
    out[1]  = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2]  =  (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
    out[3]  = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4]  = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5]  =  (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
    out[6]  = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7]  =  (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
    out[8]  =  (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
    out[9]  = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] =  (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] =  (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] =  (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
    return out;
};

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
mat4.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
};

/**
 * Multiplies two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    // Cache only the current line of the second matrix
    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];  
    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    return out;
};

/**
 * Alias for {@link mat4.multiply}
 * @function
 */
mat4.mul = mat4.multiply;

/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.translate = function (out, a, v) {
    var x = v[0], y = v[1], z = v[2],
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
};

/**
 * Scales the mat4 by the dimensions in the given vec3
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
mat4.scale = function(out, a, v) {
    var x = v[0], y = v[1], z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4.rotate = function (out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        b00, b01, b02,
        b10, b11, b12,
        b20, b21, b22;

    if (Math.abs(len) < glMatrix.EPSILON) { return null; }
    
    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateX = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[0]  = a[0];
        out[1]  = a[1];
        out[2]  = a[2];
        out[3]  = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateY = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[4]  = a[4];
        out[5]  = a[5];
        out[6]  = a[6];
        out[7]  = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateZ = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[8]  = a[8];
        out[9]  = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
};

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4.fromTranslation = function(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.scale(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Scaling vector
 * @returns {mat4} out
 */
mat4.fromScaling = function(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = v[1];
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = v[2];
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotate(dest, dest, rad, axis);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4.fromRotation = function(out, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t;
    
    if (Math.abs(len) < glMatrix.EPSILON) { return null; }
    
    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;
    
    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;
    
    // Perform rotation-specific matrix multiplication
    out[0] = x * x * t + c;
    out[1] = y * x * t + z * s;
    out[2] = z * x * t - y * s;
    out[3] = 0;
    out[4] = x * y * t - z * s;
    out[5] = y * y * t + c;
    out[6] = z * y * t + x * s;
    out[7] = 0;
    out[8] = x * z * t + y * s;
    out[9] = y * z * t - x * s;
    out[10] = z * z * t + c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from the given angle around the X axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateX(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.fromXRotation = function(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);
    
    // Perform axis-specific matrix multiplication
    out[0]  = 1;
    out[1]  = 0;
    out[2]  = 0;
    out[3]  = 0;
    out[4] = 0;
    out[5] = c;
    out[6] = s;
    out[7] = 0;
    out[8] = 0;
    out[9] = -s;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from the given angle around the Y axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateY(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.fromYRotation = function(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);
    
    // Perform axis-specific matrix multiplication
    out[0]  = c;
    out[1]  = 0;
    out[2]  = -s;
    out[3]  = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = s;
    out[9] = 0;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from the given angle around the Z axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateZ(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.fromZRotation = function(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);
    
    // Perform axis-specific matrix multiplication
    out[0]  = c;
    out[1]  = s;
    out[2]  = 0;
    out[3]  = 0;
    out[4] = -s;
    out[5] = c;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4.fromRotationTranslation = function (out, q, v) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    
    return out;
};

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @returns {mat4} out
 */
mat4.fromRotationTranslationScale = function (out, q, v, s) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2,
        sx = s[0],
        sy = s[1],
        sz = s[2];

    out[0] = (1 - (yy + zz)) * sx;
    out[1] = (xy + wz) * sx;
    out[2] = (xz - wy) * sx;
    out[3] = 0;
    out[4] = (xy - wz) * sy;
    out[5] = (1 - (xx + zz)) * sy;
    out[6] = (yz + wx) * sy;
    out[7] = 0;
    out[8] = (xz + wy) * sz;
    out[9] = (yz - wx) * sz;
    out[10] = (1 - (xx + yy)) * sz;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    
    return out;
};

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     mat4.translate(dest, origin);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *     mat4.translate(dest, negativeOrigin);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @param {vec3} o The origin vector around which to scale and rotate
 * @returns {mat4} out
 */
mat4.fromRotationTranslationScaleOrigin = function (out, q, v, s, o) {
  // Quaternion math
  var x = q[0], y = q[1], z = q[2], w = q[3],
      x2 = x + x,
      y2 = y + y,
      z2 = z + z,

      xx = x * x2,
      xy = x * y2,
      xz = x * z2,
      yy = y * y2,
      yz = y * z2,
      zz = z * z2,
      wx = w * x2,
      wy = w * y2,
      wz = w * z2,
      
      sx = s[0],
      sy = s[1],
      sz = s[2],

      ox = o[0],
      oy = o[1],
      oz = o[2];
      
  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0] + ox - (out[0] * ox + out[4] * oy + out[8] * oz);
  out[13] = v[1] + oy - (out[1] * ox + out[5] * oy + out[9] * oz);
  out[14] = v[2] + oz - (out[2] * ox + out[6] * oy + out[10] * oz);
  out[15] = 1;
        
  return out;
};

mat4.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.frustum = function (out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left),
        tb = 1 / (top - bottom),
        nf = 1 / (near - far);
    out[0] = (near * 2) * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = (near * 2) * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (far * near * 2) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.perspective = function (out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (2 * far * near) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.perspectiveFromFieldOfView = function (out, fov, near, far) {
    var upTan = Math.tan(fov.upDegrees * Math.PI/180.0),
        downTan = Math.tan(fov.downDegrees * Math.PI/180.0),
        leftTan = Math.tan(fov.leftDegrees * Math.PI/180.0),
        rightTan = Math.tan(fov.rightDegrees * Math.PI/180.0),
        xScale = 2.0 / (leftTan + rightTan),
        yScale = 2.0 / (upTan + downTan);

    out[0] = xScale;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    out[4] = 0.0;
    out[5] = yScale;
    out[6] = 0.0;
    out[7] = 0.0;
    out[8] = -((leftTan - rightTan) * xScale * 0.5);
    out[9] = ((upTan - downTan) * yScale * 0.5);
    out[10] = far / (near - far);
    out[11] = -1.0;
    out[12] = 0.0;
    out[13] = 0.0;
    out[14] = (far * near) / (near - far);
    out[15] = 0.0;
    return out;
}

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.ortho = function (out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
};

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
mat4.lookAt = function (out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (Math.abs(eyex - centerx) < glMatrix.EPSILON &&
        Math.abs(eyey - centery) < glMatrix.EPSILON &&
        Math.abs(eyez - centerz) < glMatrix.EPSILON) {
        return mat4.identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return out;
};

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat4.str = function (a) {
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
                    a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
                    a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + 
                    a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
};

/**
 * Returns Frobenius norm of a mat4
 *
 * @param {mat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat4.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2) ))
};


module.exports = mat4;

},{"./common.js":300}],305:[function(require,module,exports){
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = require("./common.js");
var mat3 = require("./mat3.js");
var vec3 = require("./vec3.js");
var vec4 = require("./vec4.js");

/**
 * @class Quaternion
 * @name quat
 */
var quat = {};

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */
quat.create = function() {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {vec3} a the initial vector
 * @param {vec3} b the destination vector
 * @returns {quat} out
 */
quat.rotationTo = (function() {
    var tmpvec3 = vec3.create();
    var xUnitVec3 = vec3.fromValues(1,0,0);
    var yUnitVec3 = vec3.fromValues(0,1,0);

    return function(out, a, b) {
        var dot = vec3.dot(a, b);
        if (dot < -0.999999) {
            vec3.cross(tmpvec3, xUnitVec3, a);
            if (vec3.length(tmpvec3) < 0.000001)
                vec3.cross(tmpvec3, yUnitVec3, a);
            vec3.normalize(tmpvec3, tmpvec3);
            quat.setAxisAngle(out, tmpvec3, Math.PI);
            return out;
        } else if (dot > 0.999999) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        } else {
            vec3.cross(tmpvec3, a, b);
            out[0] = tmpvec3[0];
            out[1] = tmpvec3[1];
            out[2] = tmpvec3[2];
            out[3] = 1 + dot;
            return quat.normalize(out, out);
        }
    };
})();

/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {vec3} view  the vector representing the viewing direction
 * @param {vec3} right the vector representing the local "right" direction
 * @param {vec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */
quat.setAxes = (function() {
    var matr = mat3.create();

    return function(out, view, right, up) {
        matr[0] = right[0];
        matr[3] = right[1];
        matr[6] = right[2];

        matr[1] = up[0];
        matr[4] = up[1];
        matr[7] = up[2];

        matr[2] = -view[0];
        matr[5] = -view[1];
        matr[8] = -view[2];

        return quat.normalize(out, quat.fromMat3(out, matr));
    };
})();

/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {quat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */
quat.clone = vec4.clone;

/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */
quat.fromValues = vec4.fromValues;

/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */
quat.copy = vec4.copy;

/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */
quat.set = vec4.set;

/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
quat.identity = function(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/
quat.setAxisAngle = function(out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
};

/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */
quat.add = vec4.add;

/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */
quat.multiply = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
};

/**
 * Alias for {@link quat.multiply}
 * @function
 */
quat.mul = quat.multiply;

/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */
quat.scale = vec4.scale;

/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateX = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateY = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        by = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateZ = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bz = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
};

/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate W component of
 * @returns {quat} out
 */
quat.calculateW = function (out, a) {
    var x = a[0], y = a[1], z = a[2];

    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
    return out;
};

/**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */
quat.dot = vec4.dot;

/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 * @function
 */
quat.lerp = vec4.lerp;

/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */
quat.slerp = function (out, a, b, t) {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    var        omega, cosom, sinom, scale0, scale1;

    // calc cosine
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    // adjust signs (if necessary)
    if ( cosom < 0.0 ) {
        cosom = -cosom;
        bx = - bx;
        by = - by;
        bz = - bz;
        bw = - bw;
    }
    // calculate coefficients
    if ( (1.0 - cosom) > 0.000001 ) {
        // standard case (slerp)
        omega  = Math.acos(cosom);
        sinom  = Math.sin(omega);
        scale0 = Math.sin((1.0 - t) * omega) / sinom;
        scale1 = Math.sin(t * omega) / sinom;
    } else {        
        // "from" and "to" quaternions are very close 
        //  ... so we can do a linear interpolation
        scale0 = 1.0 - t;
        scale1 = t;
    }
    // calculate final values
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;
    
    return out;
};

/**
 * Performs a spherical linear interpolation with two control points
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {quat} c the third operand
 * @param {quat} d the fourth operand
 * @param {Number} t interpolation amount
 * @returns {quat} out
 */
quat.sqlerp = (function () {
  var temp1 = quat.create();
  var temp2 = quat.create();
  
  return function (out, a, b, c, d, t) {
    quat.slerp(temp1, a, d, t);
    quat.slerp(temp2, b, c, t);
    quat.slerp(out, temp1, temp2, 2 * t * (1 - t));
    
    return out;
  };
}());

/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */
quat.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        dot = a0*a0 + a1*a1 + a2*a2 + a3*a3,
        invDot = dot ? 1.0/dot : 0;
    
    // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

    out[0] = -a0*invDot;
    out[1] = -a1*invDot;
    out[2] = -a2*invDot;
    out[3] = a3*invDot;
    return out;
};

/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */
quat.conjugate = function (out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
};

/**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 * @function
 */
quat.length = vec4.length;

/**
 * Alias for {@link quat.length}
 * @function
 */
quat.len = quat.length;

/**
 * Calculates the squared length of a quat
 *
 * @param {quat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */
quat.squaredLength = vec4.squaredLength;

/**
 * Alias for {@link quat.squaredLength}
 * @function
 */
quat.sqrLen = quat.squaredLength;

/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */
quat.normalize = vec4.normalize;

/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */
quat.fromMat3 = function(out, m) {
    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
    // article "Quaternion Calculus and Fast Animation".
    var fTrace = m[0] + m[4] + m[8];
    var fRoot;

    if ( fTrace > 0.0 ) {
        // |w| > 1/2, may as well choose w > 1/2
        fRoot = Math.sqrt(fTrace + 1.0);  // 2w
        out[3] = 0.5 * fRoot;
        fRoot = 0.5/fRoot;  // 1/(4w)
        out[0] = (m[5]-m[7])*fRoot;
        out[1] = (m[6]-m[2])*fRoot;
        out[2] = (m[1]-m[3])*fRoot;
    } else {
        // |w| <= 1/2
        var i = 0;
        if ( m[4] > m[0] )
          i = 1;
        if ( m[8] > m[i*3+i] )
          i = 2;
        var j = (i+1)%3;
        var k = (i+2)%3;
        
        fRoot = Math.sqrt(m[i*3+i]-m[j*3+j]-m[k*3+k] + 1.0);
        out[i] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot;
        out[3] = (m[j*3+k] - m[k*3+j]) * fRoot;
        out[j] = (m[j*3+i] + m[i*3+j]) * fRoot;
        out[k] = (m[k*3+i] + m[i*3+k]) * fRoot;
    }
    
    return out;
};

/**
 * Returns a string representation of a quatenion
 *
 * @param {quat} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
quat.str = function (a) {
    return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

module.exports = quat;

},{"./common.js":300,"./mat3.js":303,"./vec3.js":307,"./vec4.js":308}],306:[function(require,module,exports){
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = require("./common.js");

/**
 * @class 2 Dimensional Vector
 * @name vec2
 */
var vec2 = {};

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
vec2.create = function() {
    var out = new glMatrix.ARRAY_TYPE(2);
    out[0] = 0;
    out[1] = 0;
    return out;
};

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */
vec2.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(2);
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */
vec2.fromValues = function(x, y) {
    var out = new glMatrix.ARRAY_TYPE(2);
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */
vec2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */
vec2.set = function(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
};

/**
 * Alias for {@link vec2.subtract}
 * @function
 */
vec2.sub = vec2.subtract;

/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
};

/**
 * Alias for {@link vec2.multiply}
 * @function
 */
vec2.mul = vec2.multiply;

/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
};

/**
 * Alias for {@link vec2.divide}
 * @function
 */
vec2.div = vec2.divide;

/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    return out;
};

/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    return out;
};

/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */
vec2.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
};

/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */
vec2.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
vec2.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.distance}
 * @function
 */
vec2.dist = vec2.distance;

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec2.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */
vec2.sqrDist = vec2.squaredDistance;

/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
vec2.length = function (a) {
    var x = a[0],
        y = a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.length}
 * @function
 */
vec2.len = vec2.length;

/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec2.squaredLength = function (a) {
    var x = a[0],
        y = a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */
vec2.sqrLen = vec2.squaredLength;

/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */
vec2.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
};

/**
 * Returns the inverse of the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to invert
 * @returns {vec2} out
 */
vec2.inverse = function(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  return out;
};

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
vec2.normalize = function(out, a) {
    var x = a[0],
        y = a[1];
    var len = x*x + y*y;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
vec2.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1];
};

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */
vec2.cross = function(out, a, b) {
    var z = a[0] * b[1] - a[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out;
};

/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */
vec2.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */
vec2.random = function (out, scale) {
    scale = scale || 1.0;
    var r = glMatrix.RANDOM() * 2.0 * Math.PI;
    out[0] = Math.cos(r) * scale;
    out[1] = Math.sin(r) * scale;
    return out;
};

/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
};

/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2d = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
};

/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat3 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
};

/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat4 = function(out, a, m) {
    var x = a[0], 
        y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
};

/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec2.forEach = (function() {
    var vec = vec2.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 2;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec2} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec2.str = function (a) {
    return 'vec2(' + a[0] + ', ' + a[1] + ')';
};

module.exports = vec2;

},{"./common.js":300}],307:[function(require,module,exports){
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = require("./common.js");

/**
 * @class 3 Dimensional Vector
 * @name vec3
 */
var vec3 = {};

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
vec3.create = function() {
    var out = new glMatrix.ARRAY_TYPE(3);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
};

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
vec3.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
vec3.fromValues = function(x, y, z) {
    var out = new glMatrix.ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
vec3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
vec3.set = function(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};

/**
 * Alias for {@link vec3.subtract}
 * @function
 */
vec3.sub = vec3.subtract;

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};

/**
 * Alias for {@link vec3.multiply}
 * @function
 */
vec3.mul = vec3.multiply;

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
};

/**
 * Alias for {@link vec3.divide}
 * @function
 */
vec3.div = vec3.divide;

/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
};

/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
};

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
vec3.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
};

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */
vec3.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
vec3.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.distance}
 * @function
 */
vec3.dist = vec3.distance;

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec3.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */
vec3.sqrDist = vec3.squaredDistance;

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
vec3.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.length}
 * @function
 */
vec3.len = vec3.length;

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec3.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */
vec3.sqrLen = vec3.squaredLength;

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
vec3.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
};

/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to invert
 * @returns {vec3} out
 */
vec3.inverse = function(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  return out;
};

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
vec3.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var len = x*x + y*y + z*z;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
vec3.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.cross = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
};

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
};

/**
 * Performs a hermite interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.hermite = function (out, a, b, c, d, t) {
  var factorTimes2 = t * t,
      factor1 = factorTimes2 * (2 * t - 3) + 1,
      factor2 = factorTimes2 * (t - 2) + t,
      factor3 = factorTimes2 * (t - 1),
      factor4 = factorTimes2 * (3 - 2 * t);
  
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  
  return out;
};

/**
 * Performs a bezier interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.bezier = function (out, a, b, c, d, t) {
  var inverseFactor = 1 - t,
      inverseFactorTimesTwo = inverseFactor * inverseFactor,
      factorTimes2 = t * t,
      factor1 = inverseFactorTimesTwo * inverseFactor,
      factor2 = 3 * t * inverseFactorTimesTwo,
      factor3 = 3 * factorTimes2 * inverseFactor,
      factor4 = factorTimes2 * t;
  
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  
  return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */
vec3.random = function (out, scale) {
    scale = scale || 1.0;

    var r = glMatrix.RANDOM() * 2.0 * Math.PI;
    var z = (glMatrix.RANDOM() * 2.0) - 1.0;
    var zScale = Math.sqrt(1.0-z*z) * scale;

    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale;
    return out;
};

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2],
        w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1.0;
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out;
};

/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat3 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
};

/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
vec3.transformQuat = function(out, a, q) {
    // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3.rotateX = function(out, a, b, c){
   var p = [], r=[];
	  //Translate point to the origin
	  p[0] = a[0] - b[0];
	  p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];

	  //perform rotation
	  r[0] = p[0];
	  r[1] = p[1]*Math.cos(c) - p[2]*Math.sin(c);
	  r[2] = p[1]*Math.sin(c) + p[2]*Math.cos(c);

	  //translate to correct position
	  out[0] = r[0] + b[0];
	  out[1] = r[1] + b[1];
	  out[2] = r[2] + b[2];

  	return out;
};

/**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3.rotateY = function(out, a, b, c){
  	var p = [], r=[];
  	//Translate point to the origin
  	p[0] = a[0] - b[0];
  	p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];
  
  	//perform rotation
  	r[0] = p[2]*Math.sin(c) + p[0]*Math.cos(c);
  	r[1] = p[1];
  	r[2] = p[2]*Math.cos(c) - p[0]*Math.sin(c);
  
  	//translate to correct position
  	out[0] = r[0] + b[0];
  	out[1] = r[1] + b[1];
  	out[2] = r[2] + b[2];
  
  	return out;
};

/**
 * Rotate a 3D vector around the z-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3.rotateZ = function(out, a, b, c){
  	var p = [], r=[];
  	//Translate point to the origin
  	p[0] = a[0] - b[0];
  	p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];
  
  	//perform rotation
  	r[0] = p[0]*Math.cos(c) - p[1]*Math.sin(c);
  	r[1] = p[0]*Math.sin(c) + p[1]*Math.cos(c);
  	r[2] = p[2];
  
  	//translate to correct position
  	out[0] = r[0] + b[0];
  	out[1] = r[1] + b[1];
  	out[2] = r[2] + b[2];
  
  	return out;
};

/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec3.forEach = (function() {
    var vec = vec3.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 3;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2];
        }
        
        return a;
    };
})();

/**
 * Get the angle between two 3D vectors
 * @param {vec3} a The first operand
 * @param {vec3} b The second operand
 * @returns {Number} The angle in radians
 */
vec3.angle = function(a, b) {
   
    var tempA = vec3.fromValues(a[0], a[1], a[2]);
    var tempB = vec3.fromValues(b[0], b[1], b[2]);
 
    vec3.normalize(tempA, tempA);
    vec3.normalize(tempB, tempB);
 
    var cosine = vec3.dot(tempA, tempB);

    if(cosine > 1.0){
        return 0;
    } else {
        return Math.acos(cosine);
    }     
};

/**
 * Returns a string representation of a vector
 *
 * @param {vec3} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec3.str = function (a) {
    return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
};

module.exports = vec3;

},{"./common.js":300}],308:[function(require,module,exports){
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = require("./common.js");

/**
 * @class 4 Dimensional Vector
 * @name vec4
 */
var vec4 = {};

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */
vec4.create = function() {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    return out;
};

/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {vec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */
vec4.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */
vec4.fromValues = function(x, y, z, w) {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */
vec4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */
vec4.set = function(out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
};

/**
 * Alias for {@link vec4.subtract}
 * @function
 */
vec4.sub = vec4.subtract;

/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    out[3] = a[3] * b[3];
    return out;
};

/**
 * Alias for {@link vec4.multiply}
 * @function
 */
vec4.mul = vec4.multiply;

/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    out[3] = a[3] / b[3];
    return out;
};

/**
 * Alias for {@link vec4.divide}
 * @function
 */
vec4.div = vec4.divide;

/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    out[3] = Math.min(a[3], b[3]);
    return out;
};

/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    out[3] = Math.max(a[3], b[3]);
    return out;
};

/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */
vec4.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
};

/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */
vec4.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} distance between a and b
 */
vec4.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.distance}
 * @function
 */
vec4.dist = vec4.distance;

/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec4.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */
vec4.sqrDist = vec4.squaredDistance;

/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */
vec4.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.length}
 * @function
 */
vec4.len = vec4.length;

/**
 * Calculates the squared length of a vec4
 *
 * @param {vec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec4.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */
vec4.sqrLen = vec4.squaredLength;

/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to negate
 * @returns {vec4} out
 */
vec4.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = -a[3];
    return out;
};

/**
 * Returns the inverse of the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to invert
 * @returns {vec4} out
 */
vec4.inverse = function(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  out[3] = 1.0 / a[3];
  return out;
};

/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */
vec4.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    var len = x*x + y*y + z*z + w*w;
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        out[0] = x * len;
        out[1] = y * len;
        out[2] = z * len;
        out[3] = w * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */
vec4.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
};

/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec4} out
 */
vec4.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */
vec4.random = function (out, scale) {
    scale = scale || 1.0;

    //TODO: This is a pretty awful way of doing this. Find something better.
    out[0] = glMatrix.RANDOM();
    out[1] = glMatrix.RANDOM();
    out[2] = glMatrix.RANDOM();
    out[3] = glMatrix.RANDOM();
    vec4.normalize(out, out);
    vec4.scale(out, out, scale);
    return out;
};

/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec4} out
 */
vec4.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
};

/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec4} out
 */
vec4.transformQuat = function(out, a, q) {
    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    out[3] = a[3];
    return out;
};

/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec4.forEach = (function() {
    var vec = vec4.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 4;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2]; vec[3] = a[i+3];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2]; a[i+3] = vec[3];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec4} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec4.str = function (a) {
    return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

module.exports = vec4;

},{"./common.js":300}],309:[function(require,module,exports){
// vim:ts=4:sts=4:sw=4:
/*!
 *
 * Copyright 2009-2012 Kris Kowal under the terms of the MIT
 * license found at http://github.com/kriskowal/q/raw/master/LICENSE
 *
 * With parts by Tyler Close
 * Copyright 2007-2009 Tyler Close under the terms of the MIT X license found
 * at http://www.opensource.org/licenses/mit-license.html
 * Forked at ref_send.js version: 2009-05-11
 *
 * With parts by Mark Miller
 * Copyright (C) 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

(function (definition) {
    "use strict";

    // This file will function properly as a <script> tag, or a module
    // using CommonJS and NodeJS or RequireJS module formats.  In
    // Common/Node/RequireJS, the module exports the Q API and when
    // executed as a simple <script>, it creates a Q global instead.

    // Montage Require
    if (typeof bootstrap === "function") {
        bootstrap("promise", definition);

    // CommonJS
    } else if (typeof exports === "object" && typeof module === "object") {
        module.exports = definition();

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
        define(definition);

    // SES (Secure EcmaScript)
    } else if (typeof ses !== "undefined") {
        if (!ses.ok()) {
            return;
        } else {
            ses.makeQ = definition;
        }

    // <script>
    } else if (typeof window !== "undefined" || typeof self !== "undefined") {
        // Prefer window over self for add-on scripts. Use self for
        // non-windowed contexts.
        var global = typeof window !== "undefined" ? window : self;

        // Get the `window` object, save the previous Q global
        // and initialize Q as a global.
        var previousQ = global.Q;
        global.Q = definition();

        // Add a noConflict function so Q can be removed from the
        // global namespace.
        global.Q.noConflict = function () {
            global.Q = previousQ;
            return this;
        };

    } else {
        throw new Error("This environment was not anticipated by Q. Please file a bug.");
    }

})(function () {
"use strict";

var hasStacks = false;
try {
    throw new Error();
} catch (e) {
    hasStacks = !!e.stack;
}

// All code after this point will be filtered from stack traces reported
// by Q.
var qStartingLine = captureLine();
var qFileName;

// shims

// used for fallback in "allResolved"
var noop = function () {};

// Use the fastest possible means to execute a task in a future turn
// of the event loop.
var nextTick =(function () {
    // linked list of tasks (single, with head node)
    var head = {task: void 0, next: null};
    var tail = head;
    var flushing = false;
    var requestTick = void 0;
    var isNodeJS = false;
    // queue for late tasks, used by unhandled rejection tracking
    var laterQueue = [];

    function flush() {
        /* jshint loopfunc: true */
        var task, domain;

        while (head.next) {
            head = head.next;
            task = head.task;
            head.task = void 0;
            domain = head.domain;

            if (domain) {
                head.domain = void 0;
                domain.enter();
            }
            runSingle(task, domain);

        }
        while (laterQueue.length) {
            task = laterQueue.pop();
            runSingle(task);
        }
        flushing = false;
    }
    // runs a single function in the async queue
    function runSingle(task, domain) {
        try {
            task();

        } catch (e) {
            if (isNodeJS) {
                // In node, uncaught exceptions are considered fatal errors.
                // Re-throw them synchronously to interrupt flushing!

                // Ensure continuation if the uncaught exception is suppressed
                // listening "uncaughtException" events (as domains does).
                // Continue in next event to avoid tick recursion.
                if (domain) {
                    domain.exit();
                }
                setTimeout(flush, 0);
                if (domain) {
                    domain.enter();
                }

                throw e;

            } else {
                // In browsers, uncaught exceptions are not fatal.
                // Re-throw them asynchronously to avoid slow-downs.
                setTimeout(function () {
                    throw e;
                }, 0);
            }
        }

        if (domain) {
            domain.exit();
        }
    }

    nextTick = function (task) {
        tail = tail.next = {
            task: task,
            domain: isNodeJS && process.domain,
            next: null
        };

        if (!flushing) {
            flushing = true;
            requestTick();
        }
    };

    if (typeof process === "object" &&
        process.toString() === "[object process]" && process.nextTick) {
        // Ensure Q is in a real Node environment, with a `process.nextTick`.
        // To see through fake Node environments:
        // * Mocha test runner - exposes a `process` global without a `nextTick`
        // * Browserify - exposes a `process.nexTick` function that uses
        //   `setTimeout`. In this case `setImmediate` is preferred because
        //    it is faster. Browserify's `process.toString()` yields
        //   "[object Object]", while in a real Node environment
        //   `process.nextTick()` yields "[object process]".
        isNodeJS = true;

        requestTick = function () {
            process.nextTick(flush);
        };

    } else if (typeof setImmediate === "function") {
        // In IE10, Node.js 0.9+, or https://github.com/NobleJS/setImmediate
        if (typeof window !== "undefined") {
            requestTick = setImmediate.bind(window, flush);
        } else {
            requestTick = function () {
                setImmediate(flush);
            };
        }

    } else if (typeof MessageChannel !== "undefined") {
        // modern browsers
        // http://www.nonblocking.io/2011/06/windownexttick.html
        var channel = new MessageChannel();
        // At least Safari Version 6.0.5 (8536.30.1) intermittently cannot create
        // working message ports the first time a page loads.
        channel.port1.onmessage = function () {
            requestTick = requestPortTick;
            channel.port1.onmessage = flush;
            flush();
        };
        var requestPortTick = function () {
            // Opera requires us to provide a message payload, regardless of
            // whether we use it.
            channel.port2.postMessage(0);
        };
        requestTick = function () {
            setTimeout(flush, 0);
            requestPortTick();
        };

    } else {
        // old browsers
        requestTick = function () {
            setTimeout(flush, 0);
        };
    }
    // runs a task after all other tasks have been run
    // this is useful for unhandled rejection tracking that needs to happen
    // after all `then`d tasks have been run.
    nextTick.runAfter = function (task) {
        laterQueue.push(task);
        if (!flushing) {
            flushing = true;
            requestTick();
        }
    };
    return nextTick;
})();

// Attempt to make generics safe in the face of downstream
// modifications.
// There is no situation where this is necessary.
// If you need a security guarantee, these primordials need to be
// deeply frozen anyway, and if you don’t need a security guarantee,
// this is just plain paranoid.
// However, this **might** have the nice side-effect of reducing the size of
// the minified code by reducing x.call() to merely x()
// See Mark Miller’s explanation of what this does.
// http://wiki.ecmascript.org/doku.php?id=conventions:safe_meta_programming
var call = Function.call;
function uncurryThis(f) {
    return function () {
        return call.apply(f, arguments);
    };
}
// This is equivalent, but slower:
// uncurryThis = Function_bind.bind(Function_bind.call);
// http://jsperf.com/uncurrythis

var array_slice = uncurryThis(Array.prototype.slice);

var array_reduce = uncurryThis(
    Array.prototype.reduce || function (callback, basis) {
        var index = 0,
            length = this.length;
        // concerning the initial value, if one is not provided
        if (arguments.length === 1) {
            // seek to the first value in the array, accounting
            // for the possibility that is is a sparse array
            do {
                if (index in this) {
                    basis = this[index++];
                    break;
                }
                if (++index >= length) {
                    throw new TypeError();
                }
            } while (1);
        }
        // reduce
        for (; index < length; index++) {
            // account for the possibility that the array is sparse
            if (index in this) {
                basis = callback(basis, this[index], index);
            }
        }
        return basis;
    }
);

var array_indexOf = uncurryThis(
    Array.prototype.indexOf || function (value) {
        // not a very good shim, but good enough for our one use of it
        for (var i = 0; i < this.length; i++) {
            if (this[i] === value) {
                return i;
            }
        }
        return -1;
    }
);

var array_map = uncurryThis(
    Array.prototype.map || function (callback, thisp) {
        var self = this;
        var collect = [];
        array_reduce(self, function (undefined, value, index) {
            collect.push(callback.call(thisp, value, index, self));
        }, void 0);
        return collect;
    }
);

var object_create = Object.create || function (prototype) {
    function Type() { }
    Type.prototype = prototype;
    return new Type();
};

var object_hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);

var object_keys = Object.keys || function (object) {
    var keys = [];
    for (var key in object) {
        if (object_hasOwnProperty(object, key)) {
            keys.push(key);
        }
    }
    return keys;
};

var object_toString = uncurryThis(Object.prototype.toString);

function isObject(value) {
    return value === Object(value);
}

// generator related shims

// FIXME: Remove this function once ES6 generators are in SpiderMonkey.
function isStopIteration(exception) {
    return (
        object_toString(exception) === "[object StopIteration]" ||
        exception instanceof QReturnValue
    );
}

// FIXME: Remove this helper and Q.return once ES6 generators are in
// SpiderMonkey.
var QReturnValue;
if (typeof ReturnValue !== "undefined") {
    QReturnValue = ReturnValue;
} else {
    QReturnValue = function (value) {
        this.value = value;
    };
}

// long stack traces

var STACK_JUMP_SEPARATOR = "From previous event:";

function makeStackTraceLong(error, promise) {
    // If possible, transform the error stack trace by removing Node and Q
    // cruft, then concatenating with the stack trace of `promise`. See #57.
    if (hasStacks &&
        promise.stack &&
        typeof error === "object" &&
        error !== null &&
        error.stack &&
        error.stack.indexOf(STACK_JUMP_SEPARATOR) === -1
    ) {
        var stacks = [];
        for (var p = promise; !!p; p = p.source) {
            if (p.stack) {
                stacks.unshift(p.stack);
            }
        }
        stacks.unshift(error.stack);

        var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
        error.stack = filterStackString(concatedStacks);
    }
}

function filterStackString(stackString) {
    var lines = stackString.split("\n");
    var desiredLines = [];
    for (var i = 0; i < lines.length; ++i) {
        var line = lines[i];

        if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
            desiredLines.push(line);
        }
    }
    return desiredLines.join("\n");
}

function isNodeFrame(stackLine) {
    return stackLine.indexOf("(module.js:") !== -1 ||
           stackLine.indexOf("(node.js:") !== -1;
}

function getFileNameAndLineNumber(stackLine) {
    // Named functions: "at functionName (filename:lineNumber:columnNumber)"
    // In IE10 function name can have spaces ("Anonymous function") O_o
    var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
    if (attempt1) {
        return [attempt1[1], Number(attempt1[2])];
    }

    // Anonymous functions: "at filename:lineNumber:columnNumber"
    var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
    if (attempt2) {
        return [attempt2[1], Number(attempt2[2])];
    }

    // Firefox style: "function@filename:lineNumber or @filename:lineNumber"
    var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
    if (attempt3) {
        return [attempt3[1], Number(attempt3[2])];
    }
}

function isInternalFrame(stackLine) {
    var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);

    if (!fileNameAndLineNumber) {
        return false;
    }

    var fileName = fileNameAndLineNumber[0];
    var lineNumber = fileNameAndLineNumber[1];

    return fileName === qFileName &&
        lineNumber >= qStartingLine &&
        lineNumber <= qEndingLine;
}

// discover own file name and line number range for filtering stack
// traces
function captureLine() {
    if (!hasStacks) {
        return;
    }

    try {
        throw new Error();
    } catch (e) {
        var lines = e.stack.split("\n");
        var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
        var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
        if (!fileNameAndLineNumber) {
            return;
        }

        qFileName = fileNameAndLineNumber[0];
        return fileNameAndLineNumber[1];
    }
}

function deprecate(callback, name, alternative) {
    return function () {
        if (typeof console !== "undefined" &&
            typeof console.warn === "function") {
            console.warn(name + " is deprecated, use " + alternative +
                         " instead.", new Error("").stack);
        }
        return callback.apply(callback, arguments);
    };
}

// end of shims
// beginning of real work

/**
 * Constructs a promise for an immediate reference, passes promises through, or
 * coerces promises from different systems.
 * @param value immediate reference or promise
 */
function Q(value) {
    // If the object is already a Promise, return it directly.  This enables
    // the resolve function to both be used to created references from objects,
    // but to tolerably coerce non-promises to promises.
    if (value instanceof Promise) {
        return value;
    }

    // assimilate thenables
    if (isPromiseAlike(value)) {
        return coerce(value);
    } else {
        return fulfill(value);
    }
}
Q.resolve = Q;

/**
 * Performs a task in a future turn of the event loop.
 * @param {Function} task
 */
Q.nextTick = nextTick;

/**
 * Controls whether or not long stack traces will be on
 */
Q.longStackSupport = false;

// enable long stacks if Q_DEBUG is set
if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
    Q.longStackSupport = true;
}

/**
 * Constructs a {promise, resolve, reject} object.
 *
 * `resolve` is a callback to invoke with a more resolved value for the
 * promise. To fulfill the promise, invoke `resolve` with any value that is
 * not a thenable. To reject the promise, invoke `resolve` with a rejected
 * thenable, or invoke `reject` with the reason directly. To resolve the
 * promise to another thenable, thus putting it in the same state, invoke
 * `resolve` with that other thenable.
 */
Q.defer = defer;
function defer() {
    // if "messages" is an "Array", that indicates that the promise has not yet
    // been resolved.  If it is "undefined", it has been resolved.  Each
    // element of the messages array is itself an array of complete arguments to
    // forward to the resolved promise.  We coerce the resolution value to a
    // promise using the `resolve` function because it handles both fully
    // non-thenable values and other thenables gracefully.
    var messages = [], progressListeners = [], resolvedPromise;

    var deferred = object_create(defer.prototype);
    var promise = object_create(Promise.prototype);

    promise.promiseDispatch = function (resolve, op, operands) {
        var args = array_slice(arguments);
        if (messages) {
            messages.push(args);
            if (op === "when" && operands[1]) { // progress operand
                progressListeners.push(operands[1]);
            }
        } else {
            Q.nextTick(function () {
                resolvedPromise.promiseDispatch.apply(resolvedPromise, args);
            });
        }
    };

    // XXX deprecated
    promise.valueOf = function () {
        if (messages) {
            return promise;
        }
        var nearerValue = nearer(resolvedPromise);
        if (isPromise(nearerValue)) {
            resolvedPromise = nearerValue; // shorten chain
        }
        return nearerValue;
    };

    promise.inspect = function () {
        if (!resolvedPromise) {
            return { state: "pending" };
        }
        return resolvedPromise.inspect();
    };

    if (Q.longStackSupport && hasStacks) {
        try {
            throw new Error();
        } catch (e) {
            // NOTE: don't try to use `Error.captureStackTrace` or transfer the
            // accessor around; that causes memory leaks as per GH-111. Just
            // reify the stack trace as a string ASAP.
            //
            // At the same time, cut off the first line; it's always just
            // "[object Promise]\n", as per the `toString`.
            promise.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
        }
    }

    // NOTE: we do the checks for `resolvedPromise` in each method, instead of
    // consolidating them into `become`, since otherwise we'd create new
    // promises with the lines `become(whatever(value))`. See e.g. GH-252.

    function become(newPromise) {
        resolvedPromise = newPromise;
        promise.source = newPromise;

        array_reduce(messages, function (undefined, message) {
            Q.nextTick(function () {
                newPromise.promiseDispatch.apply(newPromise, message);
            });
        }, void 0);

        messages = void 0;
        progressListeners = void 0;
    }

    deferred.promise = promise;
    deferred.resolve = function (value) {
        if (resolvedPromise) {
            return;
        }

        become(Q(value));
    };

    deferred.fulfill = function (value) {
        if (resolvedPromise) {
            return;
        }

        become(fulfill(value));
    };
    deferred.reject = function (reason) {
        if (resolvedPromise) {
            return;
        }

        become(reject(reason));
    };
    deferred.notify = function (progress) {
        if (resolvedPromise) {
            return;
        }

        array_reduce(progressListeners, function (undefined, progressListener) {
            Q.nextTick(function () {
                progressListener(progress);
            });
        }, void 0);
    };

    return deferred;
}

/**
 * Creates a Node-style callback that will resolve or reject the deferred
 * promise.
 * @returns a nodeback
 */
defer.prototype.makeNodeResolver = function () {
    var self = this;
    return function (error, value) {
        if (error) {
            self.reject(error);
        } else if (arguments.length > 2) {
            self.resolve(array_slice(arguments, 1));
        } else {
            self.resolve(value);
        }
    };
};

/**
 * @param resolver {Function} a function that returns nothing and accepts
 * the resolve, reject, and notify functions for a deferred.
 * @returns a promise that may be resolved with the given resolve and reject
 * functions, or rejected by a thrown exception in resolver
 */
Q.Promise = promise; // ES6
Q.promise = promise;
function promise(resolver) {
    if (typeof resolver !== "function") {
        throw new TypeError("resolver must be a function.");
    }
    var deferred = defer();
    try {
        resolver(deferred.resolve, deferred.reject, deferred.notify);
    } catch (reason) {
        deferred.reject(reason);
    }
    return deferred.promise;
}

promise.race = race; // ES6
promise.all = all; // ES6
promise.reject = reject; // ES6
promise.resolve = Q; // ES6

// XXX experimental.  This method is a way to denote that a local value is
// serializable and should be immediately dispatched to a remote upon request,
// instead of passing a reference.
Q.passByCopy = function (object) {
    //freeze(object);
    //passByCopies.set(object, true);
    return object;
};

Promise.prototype.passByCopy = function () {
    //freeze(object);
    //passByCopies.set(object, true);
    return this;
};

/**
 * If two promises eventually fulfill to the same value, promises that value,
 * but otherwise rejects.
 * @param x {Any*}
 * @param y {Any*}
 * @returns {Any*} a promise for x and y if they are the same, but a rejection
 * otherwise.
 *
 */
Q.join = function (x, y) {
    return Q(x).join(y);
};

Promise.prototype.join = function (that) {
    return Q([this, that]).spread(function (x, y) {
        if (x === y) {
            // TODO: "===" should be Object.is or equiv
            return x;
        } else {
            throw new Error("Can't join: not the same: " + x + " " + y);
        }
    });
};

/**
 * Returns a promise for the first of an array of promises to become settled.
 * @param answers {Array[Any*]} promises to race
 * @returns {Any*} the first promise to be settled
 */
Q.race = race;
function race(answerPs) {
    return promise(function (resolve, reject) {
        // Switch to this once we can assume at least ES5
        // answerPs.forEach(function (answerP) {
        //     Q(answerP).then(resolve, reject);
        // });
        // Use this in the meantime
        for (var i = 0, len = answerPs.length; i < len; i++) {
            Q(answerPs[i]).then(resolve, reject);
        }
    });
}

Promise.prototype.race = function () {
    return this.then(Q.race);
};

/**
 * Constructs a Promise with a promise descriptor object and optional fallback
 * function.  The descriptor contains methods like when(rejected), get(name),
 * set(name, value), post(name, args), and delete(name), which all
 * return either a value, a promise for a value, or a rejection.  The fallback
 * accepts the operation name, a resolver, and any further arguments that would
 * have been forwarded to the appropriate method above had a method been
 * provided with the proper name.  The API makes no guarantees about the nature
 * of the returned object, apart from that it is usable whereever promises are
 * bought and sold.
 */
Q.makePromise = Promise;
function Promise(descriptor, fallback, inspect) {
    if (fallback === void 0) {
        fallback = function (op) {
            return reject(new Error(
                "Promise does not support operation: " + op
            ));
        };
    }
    if (inspect === void 0) {
        inspect = function () {
            return {state: "unknown"};
        };
    }

    var promise = object_create(Promise.prototype);

    promise.promiseDispatch = function (resolve, op, args) {
        var result;
        try {
            if (descriptor[op]) {
                result = descriptor[op].apply(promise, args);
            } else {
                result = fallback.call(promise, op, args);
            }
        } catch (exception) {
            result = reject(exception);
        }
        if (resolve) {
            resolve(result);
        }
    };

    promise.inspect = inspect;

    // XXX deprecated `valueOf` and `exception` support
    if (inspect) {
        var inspected = inspect();
        if (inspected.state === "rejected") {
            promise.exception = inspected.reason;
        }

        promise.valueOf = function () {
            var inspected = inspect();
            if (inspected.state === "pending" ||
                inspected.state === "rejected") {
                return promise;
            }
            return inspected.value;
        };
    }

    return promise;
}

Promise.prototype.toString = function () {
    return "[object Promise]";
};

Promise.prototype.then = function (fulfilled, rejected, progressed) {
    var self = this;
    var deferred = defer();
    var done = false;   // ensure the untrusted promise makes at most a
                        // single call to one of the callbacks

    function _fulfilled(value) {
        try {
            return typeof fulfilled === "function" ? fulfilled(value) : value;
        } catch (exception) {
            return reject(exception);
        }
    }

    function _rejected(exception) {
        if (typeof rejected === "function") {
            makeStackTraceLong(exception, self);
            try {
                return rejected(exception);
            } catch (newException) {
                return reject(newException);
            }
        }
        return reject(exception);
    }

    function _progressed(value) {
        return typeof progressed === "function" ? progressed(value) : value;
    }

    Q.nextTick(function () {
        self.promiseDispatch(function (value) {
            if (done) {
                return;
            }
            done = true;

            deferred.resolve(_fulfilled(value));
        }, "when", [function (exception) {
            if (done) {
                return;
            }
            done = true;

            deferred.resolve(_rejected(exception));
        }]);
    });

    // Progress propagator need to be attached in the current tick.
    self.promiseDispatch(void 0, "when", [void 0, function (value) {
        var newValue;
        var threw = false;
        try {
            newValue = _progressed(value);
        } catch (e) {
            threw = true;
            if (Q.onerror) {
                Q.onerror(e);
            } else {
                throw e;
            }
        }

        if (!threw) {
            deferred.notify(newValue);
        }
    }]);

    return deferred.promise;
};

Q.tap = function (promise, callback) {
    return Q(promise).tap(callback);
};

/**
 * Works almost like "finally", but not called for rejections.
 * Original resolution value is passed through callback unaffected.
 * Callback may return a promise that will be awaited for.
 * @param {Function} callback
 * @returns {Q.Promise}
 * @example
 * doSomething()
 *   .then(...)
 *   .tap(console.log)
 *   .then(...);
 */
Promise.prototype.tap = function (callback) {
    callback = Q(callback);

    return this.then(function (value) {
        return callback.fcall(value).thenResolve(value);
    });
};

/**
 * Registers an observer on a promise.
 *
 * Guarantees:
 *
 * 1. that fulfilled and rejected will be called only once.
 * 2. that either the fulfilled callback or the rejected callback will be
 *    called, but not both.
 * 3. that fulfilled and rejected will not be called in this turn.
 *
 * @param value      promise or immediate reference to observe
 * @param fulfilled  function to be called with the fulfilled value
 * @param rejected   function to be called with the rejection exception
 * @param progressed function to be called on any progress notifications
 * @return promise for the return value from the invoked callback
 */
Q.when = when;
function when(value, fulfilled, rejected, progressed) {
    return Q(value).then(fulfilled, rejected, progressed);
}

Promise.prototype.thenResolve = function (value) {
    return this.then(function () { return value; });
};

Q.thenResolve = function (promise, value) {
    return Q(promise).thenResolve(value);
};

Promise.prototype.thenReject = function (reason) {
    return this.then(function () { throw reason; });
};

Q.thenReject = function (promise, reason) {
    return Q(promise).thenReject(reason);
};

/**
 * If an object is not a promise, it is as "near" as possible.
 * If a promise is rejected, it is as "near" as possible too.
 * If it’s a fulfilled promise, the fulfillment value is nearer.
 * If it’s a deferred promise and the deferred has been resolved, the
 * resolution is "nearer".
 * @param object
 * @returns most resolved (nearest) form of the object
 */

// XXX should we re-do this?
Q.nearer = nearer;
function nearer(value) {
    if (isPromise(value)) {
        var inspected = value.inspect();
        if (inspected.state === "fulfilled") {
            return inspected.value;
        }
    }
    return value;
}

/**
 * @returns whether the given object is a promise.
 * Otherwise it is a fulfilled value.
 */
Q.isPromise = isPromise;
function isPromise(object) {
    return object instanceof Promise;
}

Q.isPromiseAlike = isPromiseAlike;
function isPromiseAlike(object) {
    return isObject(object) && typeof object.then === "function";
}

/**
 * @returns whether the given object is a pending promise, meaning not
 * fulfilled or rejected.
 */
Q.isPending = isPending;
function isPending(object) {
    return isPromise(object) && object.inspect().state === "pending";
}

Promise.prototype.isPending = function () {
    return this.inspect().state === "pending";
};

/**
 * @returns whether the given object is a value or fulfilled
 * promise.
 */
Q.isFulfilled = isFulfilled;
function isFulfilled(object) {
    return !isPromise(object) || object.inspect().state === "fulfilled";
}

Promise.prototype.isFulfilled = function () {
    return this.inspect().state === "fulfilled";
};

/**
 * @returns whether the given object is a rejected promise.
 */
Q.isRejected = isRejected;
function isRejected(object) {
    return isPromise(object) && object.inspect().state === "rejected";
}

Promise.prototype.isRejected = function () {
    return this.inspect().state === "rejected";
};

//// BEGIN UNHANDLED REJECTION TRACKING

// This promise library consumes exceptions thrown in handlers so they can be
// handled by a subsequent promise.  The exceptions get added to this array when
// they are created, and removed when they are handled.  Note that in ES6 or
// shimmed environments, this would naturally be a `Set`.
var unhandledReasons = [];
var unhandledRejections = [];
var reportedUnhandledRejections = [];
var trackUnhandledRejections = true;

function resetUnhandledRejections() {
    unhandledReasons.length = 0;
    unhandledRejections.length = 0;

    if (!trackUnhandledRejections) {
        trackUnhandledRejections = true;
    }
}

function trackRejection(promise, reason) {
    if (!trackUnhandledRejections) {
        return;
    }
    if (typeof process === "object" && typeof process.emit === "function") {
        Q.nextTick.runAfter(function () {
            if (array_indexOf(unhandledRejections, promise) !== -1) {
                process.emit("unhandledRejection", reason, promise);
                reportedUnhandledRejections.push(promise);
            }
        });
    }

    unhandledRejections.push(promise);
    if (reason && typeof reason.stack !== "undefined") {
        unhandledReasons.push(reason.stack);
    } else {
        unhandledReasons.push("(no stack) " + reason);
    }
}

function untrackRejection(promise) {
    if (!trackUnhandledRejections) {
        return;
    }

    var at = array_indexOf(unhandledRejections, promise);
    if (at !== -1) {
        if (typeof process === "object" && typeof process.emit === "function") {
            Q.nextTick.runAfter(function () {
                var atReport = array_indexOf(reportedUnhandledRejections, promise);
                if (atReport !== -1) {
                    process.emit("rejectionHandled", unhandledReasons[at], promise);
                    reportedUnhandledRejections.splice(atReport, 1);
                }
            });
        }
        unhandledRejections.splice(at, 1);
        unhandledReasons.splice(at, 1);
    }
}

Q.resetUnhandledRejections = resetUnhandledRejections;

Q.getUnhandledReasons = function () {
    // Make a copy so that consumers can't interfere with our internal state.
    return unhandledReasons.slice();
};

Q.stopUnhandledRejectionTracking = function () {
    resetUnhandledRejections();
    trackUnhandledRejections = false;
};

resetUnhandledRejections();

//// END UNHANDLED REJECTION TRACKING

/**
 * Constructs a rejected promise.
 * @param reason value describing the failure
 */
Q.reject = reject;
function reject(reason) {
    var rejection = Promise({
        "when": function (rejected) {
            // note that the error has been handled
            if (rejected) {
                untrackRejection(this);
            }
            return rejected ? rejected(reason) : this;
        }
    }, function fallback() {
        return this;
    }, function inspect() {
        return { state: "rejected", reason: reason };
    });

    // Note that the reason has not been handled.
    trackRejection(rejection, reason);

    return rejection;
}

/**
 * Constructs a fulfilled promise for an immediate reference.
 * @param value immediate reference
 */
Q.fulfill = fulfill;
function fulfill(value) {
    return Promise({
        "when": function () {
            return value;
        },
        "get": function (name) {
            return value[name];
        },
        "set": function (name, rhs) {
            value[name] = rhs;
        },
        "delete": function (name) {
            delete value[name];
        },
        "post": function (name, args) {
            // Mark Miller proposes that post with no name should apply a
            // promised function.
            if (name === null || name === void 0) {
                return value.apply(void 0, args);
            } else {
                return value[name].apply(value, args);
            }
        },
        "apply": function (thisp, args) {
            return value.apply(thisp, args);
        },
        "keys": function () {
            return object_keys(value);
        }
    }, void 0, function inspect() {
        return { state: "fulfilled", value: value };
    });
}

/**
 * Converts thenables to Q promises.
 * @param promise thenable promise
 * @returns a Q promise
 */
function coerce(promise) {
    var deferred = defer();
    Q.nextTick(function () {
        try {
            promise.then(deferred.resolve, deferred.reject, deferred.notify);
        } catch (exception) {
            deferred.reject(exception);
        }
    });
    return deferred.promise;
}

/**
 * Annotates an object such that it will never be
 * transferred away from this process over any promise
 * communication channel.
 * @param object
 * @returns promise a wrapping of that object that
 * additionally responds to the "isDef" message
 * without a rejection.
 */
Q.master = master;
function master(object) {
    return Promise({
        "isDef": function () {}
    }, function fallback(op, args) {
        return dispatch(object, op, args);
    }, function () {
        return Q(object).inspect();
    });
}

/**
 * Spreads the values of a promised array of arguments into the
 * fulfillment callback.
 * @param fulfilled callback that receives variadic arguments from the
 * promised array
 * @param rejected callback that receives the exception if the promise
 * is rejected.
 * @returns a promise for the return value or thrown exception of
 * either callback.
 */
Q.spread = spread;
function spread(value, fulfilled, rejected) {
    return Q(value).spread(fulfilled, rejected);
}

Promise.prototype.spread = function (fulfilled, rejected) {
    return this.all().then(function (array) {
        return fulfilled.apply(void 0, array);
    }, rejected);
};

/**
 * The async function is a decorator for generator functions, turning
 * them into asynchronous generators.  Although generators are only part
 * of the newest ECMAScript 6 drafts, this code does not cause syntax
 * errors in older engines.  This code should continue to work and will
 * in fact improve over time as the language improves.
 *
 * ES6 generators are currently part of V8 version 3.19 with the
 * --harmony-generators runtime flag enabled.  SpiderMonkey has had them
 * for longer, but under an older Python-inspired form.  This function
 * works on both kinds of generators.
 *
 * Decorates a generator function such that:
 *  - it may yield promises
 *  - execution will continue when that promise is fulfilled
 *  - the value of the yield expression will be the fulfilled value
 *  - it returns a promise for the return value (when the generator
 *    stops iterating)
 *  - the decorated function returns a promise for the return value
 *    of the generator or the first rejected promise among those
 *    yielded.
 *  - if an error is thrown in the generator, it propagates through
 *    every following yield until it is caught, or until it escapes
 *    the generator function altogether, and is translated into a
 *    rejection for the promise returned by the decorated generator.
 */
Q.async = async;
function async(makeGenerator) {
    return function () {
        // when verb is "send", arg is a value
        // when verb is "throw", arg is an exception
        function continuer(verb, arg) {
            var result;

            // Until V8 3.19 / Chromium 29 is released, SpiderMonkey is the only
            // engine that has a deployed base of browsers that support generators.
            // However, SM's generators use the Python-inspired semantics of
            // outdated ES6 drafts.  We would like to support ES6, but we'd also
            // like to make it possible to use generators in deployed browsers, so
            // we also support Python-style generators.  At some point we can remove
            // this block.

            if (typeof StopIteration === "undefined") {
                // ES6 Generators
                try {
                    result = generator[verb](arg);
                } catch (exception) {
                    return reject(exception);
                }
                if (result.done) {
                    return Q(result.value);
                } else {
                    return when(result.value, callback, errback);
                }
            } else {
                // SpiderMonkey Generators
                // FIXME: Remove this case when SM does ES6 generators.
                try {
                    result = generator[verb](arg);
                } catch (exception) {
                    if (isStopIteration(exception)) {
                        return Q(exception.value);
                    } else {
                        return reject(exception);
                    }
                }
                return when(result, callback, errback);
            }
        }
        var generator = makeGenerator.apply(this, arguments);
        var callback = continuer.bind(continuer, "next");
        var errback = continuer.bind(continuer, "throw");
        return callback();
    };
}

/**
 * The spawn function is a small wrapper around async that immediately
 * calls the generator and also ends the promise chain, so that any
 * unhandled errors are thrown instead of forwarded to the error
 * handler. This is useful because it's extremely common to run
 * generators at the top-level to work with libraries.
 */
Q.spawn = spawn;
function spawn(makeGenerator) {
    Q.done(Q.async(makeGenerator)());
}

// FIXME: Remove this interface once ES6 generators are in SpiderMonkey.
/**
 * Throws a ReturnValue exception to stop an asynchronous generator.
 *
 * This interface is a stop-gap measure to support generator return
 * values in older Firefox/SpiderMonkey.  In browsers that support ES6
 * generators like Chromium 29, just use "return" in your generator
 * functions.
 *
 * @param value the return value for the surrounding generator
 * @throws ReturnValue exception with the value.
 * @example
 * // ES6 style
 * Q.async(function* () {
 *      var foo = yield getFooPromise();
 *      var bar = yield getBarPromise();
 *      return foo + bar;
 * })
 * // Older SpiderMonkey style
 * Q.async(function () {
 *      var foo = yield getFooPromise();
 *      var bar = yield getBarPromise();
 *      Q.return(foo + bar);
 * })
 */
Q["return"] = _return;
function _return(value) {
    throw new QReturnValue(value);
}

/**
 * The promised function decorator ensures that any promise arguments
 * are settled and passed as values (`this` is also settled and passed
 * as a value).  It will also ensure that the result of a function is
 * always a promise.
 *
 * @example
 * var add = Q.promised(function (a, b) {
 *     return a + b;
 * });
 * add(Q(a), Q(B));
 *
 * @param {function} callback The function to decorate
 * @returns {function} a function that has been decorated.
 */
Q.promised = promised;
function promised(callback) {
    return function () {
        return spread([this, all(arguments)], function (self, args) {
            return callback.apply(self, args);
        });
    };
}

/**
 * sends a message to a value in a future turn
 * @param object* the recipient
 * @param op the name of the message operation, e.g., "when",
 * @param args further arguments to be forwarded to the operation
 * @returns result {Promise} a promise for the result of the operation
 */
Q.dispatch = dispatch;
function dispatch(object, op, args) {
    return Q(object).dispatch(op, args);
}

Promise.prototype.dispatch = function (op, args) {
    var self = this;
    var deferred = defer();
    Q.nextTick(function () {
        self.promiseDispatch(deferred.resolve, op, args);
    });
    return deferred.promise;
};

/**
 * Gets the value of a property in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of property to get
 * @return promise for the property value
 */
Q.get = function (object, key) {
    return Q(object).dispatch("get", [key]);
};

Promise.prototype.get = function (key) {
    return this.dispatch("get", [key]);
};

/**
 * Sets the value of a property in a future turn.
 * @param object    promise or immediate reference for object object
 * @param name      name of property to set
 * @param value     new value of property
 * @return promise for the return value
 */
Q.set = function (object, key, value) {
    return Q(object).dispatch("set", [key, value]);
};

Promise.prototype.set = function (key, value) {
    return this.dispatch("set", [key, value]);
};

/**
 * Deletes a property in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of property to delete
 * @return promise for the return value
 */
Q.del = // XXX legacy
Q["delete"] = function (object, key) {
    return Q(object).dispatch("delete", [key]);
};

Promise.prototype.del = // XXX legacy
Promise.prototype["delete"] = function (key) {
    return this.dispatch("delete", [key]);
};

/**
 * Invokes a method in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of method to invoke
 * @param value     a value to post, typically an array of
 *                  invocation arguments for promises that
 *                  are ultimately backed with `resolve` values,
 *                  as opposed to those backed with URLs
 *                  wherein the posted value can be any
 *                  JSON serializable object.
 * @return promise for the return value
 */
// bound locally because it is used by other methods
Q.mapply = // XXX As proposed by "Redsandro"
Q.post = function (object, name, args) {
    return Q(object).dispatch("post", [name, args]);
};

Promise.prototype.mapply = // XXX As proposed by "Redsandro"
Promise.prototype.post = function (name, args) {
    return this.dispatch("post", [name, args]);
};

/**
 * Invokes a method in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of method to invoke
 * @param ...args   array of invocation arguments
 * @return promise for the return value
 */
Q.send = // XXX Mark Miller's proposed parlance
Q.mcall = // XXX As proposed by "Redsandro"
Q.invoke = function (object, name /*...args*/) {
    return Q(object).dispatch("post", [name, array_slice(arguments, 2)]);
};

Promise.prototype.send = // XXX Mark Miller's proposed parlance
Promise.prototype.mcall = // XXX As proposed by "Redsandro"
Promise.prototype.invoke = function (name /*...args*/) {
    return this.dispatch("post", [name, array_slice(arguments, 1)]);
};

/**
 * Applies the promised function in a future turn.
 * @param object    promise or immediate reference for target function
 * @param args      array of application arguments
 */
Q.fapply = function (object, args) {
    return Q(object).dispatch("apply", [void 0, args]);
};

Promise.prototype.fapply = function (args) {
    return this.dispatch("apply", [void 0, args]);
};

/**
 * Calls the promised function in a future turn.
 * @param object    promise or immediate reference for target function
 * @param ...args   array of application arguments
 */
Q["try"] =
Q.fcall = function (object /* ...args*/) {
    return Q(object).dispatch("apply", [void 0, array_slice(arguments, 1)]);
};

Promise.prototype.fcall = function (/*...args*/) {
    return this.dispatch("apply", [void 0, array_slice(arguments)]);
};

/**
 * Binds the promised function, transforming return values into a fulfilled
 * promise and thrown errors into a rejected one.
 * @param object    promise or immediate reference for target function
 * @param ...args   array of application arguments
 */
Q.fbind = function (object /*...args*/) {
    var promise = Q(object);
    var args = array_slice(arguments, 1);
    return function fbound() {
        return promise.dispatch("apply", [
            this,
            args.concat(array_slice(arguments))
        ]);
    };
};
Promise.prototype.fbind = function (/*...args*/) {
    var promise = this;
    var args = array_slice(arguments);
    return function fbound() {
        return promise.dispatch("apply", [
            this,
            args.concat(array_slice(arguments))
        ]);
    };
};

/**
 * Requests the names of the owned properties of a promised
 * object in a future turn.
 * @param object    promise or immediate reference for target object
 * @return promise for the keys of the eventually settled object
 */
Q.keys = function (object) {
    return Q(object).dispatch("keys", []);
};

Promise.prototype.keys = function () {
    return this.dispatch("keys", []);
};

/**
 * Turns an array of promises into a promise for an array.  If any of
 * the promises gets rejected, the whole array is rejected immediately.
 * @param {Array*} an array (or promise for an array) of values (or
 * promises for values)
 * @returns a promise for an array of the corresponding values
 */
// By Mark Miller
// http://wiki.ecmascript.org/doku.php?id=strawman:concurrency&rev=1308776521#allfulfilled
Q.all = all;
function all(promises) {
    return when(promises, function (promises) {
        var pendingCount = 0;
        var deferred = defer();
        array_reduce(promises, function (undefined, promise, index) {
            var snapshot;
            if (
                isPromise(promise) &&
                (snapshot = promise.inspect()).state === "fulfilled"
            ) {
                promises[index] = snapshot.value;
            } else {
                ++pendingCount;
                when(
                    promise,
                    function (value) {
                        promises[index] = value;
                        if (--pendingCount === 0) {
                            deferred.resolve(promises);
                        }
                    },
                    deferred.reject,
                    function (progress) {
                        deferred.notify({ index: index, value: progress });
                    }
                );
            }
        }, void 0);
        if (pendingCount === 0) {
            deferred.resolve(promises);
        }
        return deferred.promise;
    });
}

Promise.prototype.all = function () {
    return all(this);
};

/**
 * Returns the first resolved promise of an array. Prior rejected promises are
 * ignored.  Rejects only if all promises are rejected.
 * @param {Array*} an array containing values or promises for values
 * @returns a promise fulfilled with the value of the first resolved promise,
 * or a rejected promise if all promises are rejected.
 */
Q.any = any;

function any(promises) {
    if (promises.length === 0) {
        return Q.resolve();
    }

    var deferred = Q.defer();
    var pendingCount = 0;
    array_reduce(promises, function (prev, current, index) {
        var promise = promises[index];

        pendingCount++;

        when(promise, onFulfilled, onRejected, onProgress);
        function onFulfilled(result) {
            deferred.resolve(result);
        }
        function onRejected() {
            pendingCount--;
            if (pendingCount === 0) {
                deferred.reject(new Error(
                    "Can't get fulfillment value from any promise, all " +
                    "promises were rejected."
                ));
            }
        }
        function onProgress(progress) {
            deferred.notify({
                index: index,
                value: progress
            });
        }
    }, undefined);

    return deferred.promise;
}

Promise.prototype.any = function () {
    return any(this);
};

/**
 * Waits for all promises to be settled, either fulfilled or
 * rejected.  This is distinct from `all` since that would stop
 * waiting at the first rejection.  The promise returned by
 * `allResolved` will never be rejected.
 * @param promises a promise for an array (or an array) of promises
 * (or values)
 * @return a promise for an array of promises
 */
Q.allResolved = deprecate(allResolved, "allResolved", "allSettled");
function allResolved(promises) {
    return when(promises, function (promises) {
        promises = array_map(promises, Q);
        return when(all(array_map(promises, function (promise) {
            return when(promise, noop, noop);
        })), function () {
            return promises;
        });
    });
}

Promise.prototype.allResolved = function () {
    return allResolved(this);
};

/**
 * @see Promise#allSettled
 */
Q.allSettled = allSettled;
function allSettled(promises) {
    return Q(promises).allSettled();
}

/**
 * Turns an array of promises into a promise for an array of their states (as
 * returned by `inspect`) when they have all settled.
 * @param {Array[Any*]} values an array (or promise for an array) of values (or
 * promises for values)
 * @returns {Array[State]} an array of states for the respective values.
 */
Promise.prototype.allSettled = function () {
    return this.then(function (promises) {
        return all(array_map(promises, function (promise) {
            promise = Q(promise);
            function regardless() {
                return promise.inspect();
            }
            return promise.then(regardless, regardless);
        }));
    });
};

/**
 * Captures the failure of a promise, giving an oportunity to recover
 * with a callback.  If the given promise is fulfilled, the returned
 * promise is fulfilled.
 * @param {Any*} promise for something
 * @param {Function} callback to fulfill the returned promise if the
 * given promise is rejected
 * @returns a promise for the return value of the callback
 */
Q.fail = // XXX legacy
Q["catch"] = function (object, rejected) {
    return Q(object).then(void 0, rejected);
};

Promise.prototype.fail = // XXX legacy
Promise.prototype["catch"] = function (rejected) {
    return this.then(void 0, rejected);
};

/**
 * Attaches a listener that can respond to progress notifications from a
 * promise's originating deferred. This listener receives the exact arguments
 * passed to ``deferred.notify``.
 * @param {Any*} promise for something
 * @param {Function} callback to receive any progress notifications
 * @returns the given promise, unchanged
 */
Q.progress = progress;
function progress(object, progressed) {
    return Q(object).then(void 0, void 0, progressed);
}

Promise.prototype.progress = function (progressed) {
    return this.then(void 0, void 0, progressed);
};

/**
 * Provides an opportunity to observe the settling of a promise,
 * regardless of whether the promise is fulfilled or rejected.  Forwards
 * the resolution to the returned promise when the callback is done.
 * The callback can return a promise to defer completion.
 * @param {Any*} promise
 * @param {Function} callback to observe the resolution of the given
 * promise, takes no arguments.
 * @returns a promise for the resolution of the given promise when
 * ``fin`` is done.
 */
Q.fin = // XXX legacy
Q["finally"] = function (object, callback) {
    return Q(object)["finally"](callback);
};

Promise.prototype.fin = // XXX legacy
Promise.prototype["finally"] = function (callback) {
    callback = Q(callback);
    return this.then(function (value) {
        return callback.fcall().then(function () {
            return value;
        });
    }, function (reason) {
        // TODO attempt to recycle the rejection with "this".
        return callback.fcall().then(function () {
            throw reason;
        });
    });
};

/**
 * Terminates a chain of promises, forcing rejections to be
 * thrown as exceptions.
 * @param {Any*} promise at the end of a chain of promises
 * @returns nothing
 */
Q.done = function (object, fulfilled, rejected, progress) {
    return Q(object).done(fulfilled, rejected, progress);
};

Promise.prototype.done = function (fulfilled, rejected, progress) {
    var onUnhandledError = function (error) {
        // forward to a future turn so that ``when``
        // does not catch it and turn it into a rejection.
        Q.nextTick(function () {
            makeStackTraceLong(error, promise);
            if (Q.onerror) {
                Q.onerror(error);
            } else {
                throw error;
            }
        });
    };

    // Avoid unnecessary `nextTick`ing via an unnecessary `when`.
    var promise = fulfilled || rejected || progress ?
        this.then(fulfilled, rejected, progress) :
        this;

    if (typeof process === "object" && process && process.domain) {
        onUnhandledError = process.domain.bind(onUnhandledError);
    }

    promise.then(void 0, onUnhandledError);
};

/**
 * Causes a promise to be rejected if it does not get fulfilled before
 * some milliseconds time out.
 * @param {Any*} promise
 * @param {Number} milliseconds timeout
 * @param {Any*} custom error message or Error object (optional)
 * @returns a promise for the resolution of the given promise if it is
 * fulfilled before the timeout, otherwise rejected.
 */
Q.timeout = function (object, ms, error) {
    return Q(object).timeout(ms, error);
};

Promise.prototype.timeout = function (ms, error) {
    var deferred = defer();
    var timeoutId = setTimeout(function () {
        if (!error || "string" === typeof error) {
            error = new Error(error || "Timed out after " + ms + " ms");
            error.code = "ETIMEDOUT";
        }
        deferred.reject(error);
    }, ms);

    this.then(function (value) {
        clearTimeout(timeoutId);
        deferred.resolve(value);
    }, function (exception) {
        clearTimeout(timeoutId);
        deferred.reject(exception);
    }, deferred.notify);

    return deferred.promise;
};

/**
 * Returns a promise for the given value (or promised value), some
 * milliseconds after it resolved. Passes rejections immediately.
 * @param {Any*} promise
 * @param {Number} milliseconds
 * @returns a promise for the resolution of the given promise after milliseconds
 * time has elapsed since the resolution of the given promise.
 * If the given promise rejects, that is passed immediately.
 */
Q.delay = function (object, timeout) {
    if (timeout === void 0) {
        timeout = object;
        object = void 0;
    }
    return Q(object).delay(timeout);
};

Promise.prototype.delay = function (timeout) {
    return this.then(function (value) {
        var deferred = defer();
        setTimeout(function () {
            deferred.resolve(value);
        }, timeout);
        return deferred.promise;
    });
};

/**
 * Passes a continuation to a Node function, which is called with the given
 * arguments provided as an array, and returns a promise.
 *
 *      Q.nfapply(FS.readFile, [__filename])
 *      .then(function (content) {
 *      })
 *
 */
Q.nfapply = function (callback, args) {
    return Q(callback).nfapply(args);
};

Promise.prototype.nfapply = function (args) {
    var deferred = defer();
    var nodeArgs = array_slice(args);
    nodeArgs.push(deferred.makeNodeResolver());
    this.fapply(nodeArgs).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Passes a continuation to a Node function, which is called with the given
 * arguments provided individually, and returns a promise.
 * @example
 * Q.nfcall(FS.readFile, __filename)
 * .then(function (content) {
 * })
 *
 */
Q.nfcall = function (callback /*...args*/) {
    var args = array_slice(arguments, 1);
    return Q(callback).nfapply(args);
};

Promise.prototype.nfcall = function (/*...args*/) {
    var nodeArgs = array_slice(arguments);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.fapply(nodeArgs).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Wraps a NodeJS continuation passing function and returns an equivalent
 * version that returns a promise.
 * @example
 * Q.nfbind(FS.readFile, __filename)("utf-8")
 * .then(console.log)
 * .done()
 */
Q.nfbind =
Q.denodeify = function (callback /*...args*/) {
    var baseArgs = array_slice(arguments, 1);
    return function () {
        var nodeArgs = baseArgs.concat(array_slice(arguments));
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        Q(callback).fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };
};

Promise.prototype.nfbind =
Promise.prototype.denodeify = function (/*...args*/) {
    var args = array_slice(arguments);
    args.unshift(this);
    return Q.denodeify.apply(void 0, args);
};

Q.nbind = function (callback, thisp /*...args*/) {
    var baseArgs = array_slice(arguments, 2);
    return function () {
        var nodeArgs = baseArgs.concat(array_slice(arguments));
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        function bound() {
            return callback.apply(thisp, arguments);
        }
        Q(bound).fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };
};

Promise.prototype.nbind = function (/*thisp, ...args*/) {
    var args = array_slice(arguments, 0);
    args.unshift(this);
    return Q.nbind.apply(void 0, args);
};

/**
 * Calls a method of a Node-style object that accepts a Node-style
 * callback with a given array of arguments, plus a provided callback.
 * @param object an object that has the named method
 * @param {String} name name of the method of object
 * @param {Array} args arguments to pass to the method; the callback
 * will be provided by Q and appended to these arguments.
 * @returns a promise for the value or error
 */
Q.nmapply = // XXX As proposed by "Redsandro"
Q.npost = function (object, name, args) {
    return Q(object).npost(name, args);
};

Promise.prototype.nmapply = // XXX As proposed by "Redsandro"
Promise.prototype.npost = function (name, args) {
    var nodeArgs = array_slice(args || []);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Calls a method of a Node-style object that accepts a Node-style
 * callback, forwarding the given variadic arguments, plus a provided
 * callback argument.
 * @param object an object that has the named method
 * @param {String} name name of the method of object
 * @param ...args arguments to pass to the method; the callback will
 * be provided by Q and appended to these arguments.
 * @returns a promise for the value or error
 */
Q.nsend = // XXX Based on Mark Miller's proposed "send"
Q.nmcall = // XXX Based on "Redsandro's" proposal
Q.ninvoke = function (object, name /*...args*/) {
    var nodeArgs = array_slice(arguments, 2);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    Q(object).dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

Promise.prototype.nsend = // XXX Based on Mark Miller's proposed "send"
Promise.prototype.nmcall = // XXX Based on "Redsandro's" proposal
Promise.prototype.ninvoke = function (name /*...args*/) {
    var nodeArgs = array_slice(arguments, 1);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

/**
 * If a function would like to support both Node continuation-passing-style and
 * promise-returning-style, it can end its internal promise chain with
 * `nodeify(nodeback)`, forwarding the optional nodeback argument.  If the user
 * elects to use a nodeback, the result will be sent there.  If they do not
 * pass a nodeback, they will receive the result promise.
 * @param object a result (or a promise for a result)
 * @param {Function} nodeback a Node.js-style callback
 * @returns either the promise or nothing
 */
Q.nodeify = nodeify;
function nodeify(object, nodeback) {
    return Q(object).nodeify(nodeback);
}

Promise.prototype.nodeify = function (nodeback) {
    if (nodeback) {
        this.then(function (value) {
            Q.nextTick(function () {
                nodeback(null, value);
            });
        }, function (error) {
            Q.nextTick(function () {
                nodeback(error);
            });
        });
    } else {
        return this;
    }
};

Q.noConflict = function() {
    throw new Error("Q.noConflict only works when Q is used as a global");
};

// All code before this point will be filtered from stack traces.
var qEndingLine = captureLine();

return Q;

});

},{}]},{},[1])


//# sourceMappingURL=j3.js.map
