/// <reference path="refs.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// globals
var G = (function () {
    function G() {
    }
    G.SCREEN_WIDTH = 500;
    G.SCREEN_HEIGHT = 500;
    G.MAP_W = 500;
    G.MAP_H = 500;
    return G;
})();
// more globals
var Editor = (function () {
    function Editor() {
    }
    Editor.toolbarNames = ['Inspect', 'Add Item'];
    return Editor;
})();
var fileCache = {};
// global functions
var F = (function () {
    function F() {
    }
    F.loadTemplate = function (file) {
        if (!(file in fileCache)) {
            fileCache[file] = $.ajax({
                url: "templates/" + file + ".html",
                async: false
            }).responseText;
        }
        return _.template(fileCache[file]);
    };
    // merge 2 objects together, returning the result.
    // no more overwriting objects any more, that was annoying.
    F.merge = function (o1, o2) {
        var result = {};
        for (var key in o1)
            result[key] = o1[key];
        for (var key in o2)
            result[key] = o2[key];
        return result;
    };
    return F;
})();
var ToolbarItemCollection = (function (_super) {
    __extends(ToolbarItemCollection, _super);
    function ToolbarItemCollection() {
        _super.call(this);
        var items = Editor.toolbarNames;
        for (var i = 0; i < items.length; i++) {
            var item = new ToolbarItem();
            item.set('name', items[i]);
            this.add(item);
        }
    }
    return ToolbarItemCollection;
})(Backbone.Collection);
var ToolbarItem = (function (_super) {
    __extends(ToolbarItem, _super);
    function ToolbarItem() {
        _super.apply(this, arguments);
    }
    return ToolbarItem;
})(Backbone.Model);
var ToolbarItemView = (function (_super) {
    __extends(ToolbarItemView, _super);
    function ToolbarItemView() {
        _super.apply(this, arguments);
        this.template = F.loadTemplate('tool');
    }
    ToolbarItemView.prototype.events = function () {
        return {
            'click a': 'switchTool'
        };
    };
    ToolbarItemView.prototype.switchTool = function () {
        this.trigger('switch-tool', this.model);
        // TODO:: not in the right place...hah
        /*
        this.dialog = new DialogWidget({
          title: 'Add Game Entity',
          body: 'Lets add a game entity!',
          buttons: [{
            title: 'Ok!'
          }, {
            title: 'Cancel',
            type: "btn-danger",
            clickCallback: () => { console.log(' you cancelled... ya dumb'); }
          }]
        });
        this.dialog.render().$el.appendTo(this.$el);
        */
        return false;
    };
    return ToolbarItemView;
})(MagicView);
var PhaserIDE = (function (_super) {
    __extends(PhaserIDE, _super);
    function PhaserIDE(attrs) {
        var _this = this;
        _super.call(this, attrs);
        this.template = F.loadTemplate('editor');
        this.subviews = {
            '.toolbar': function (_attrs) {
                return new Toolbar(F.merge(_attrs, { collection: new ToolbarItemCollection() }));
            }
        };
        this.listenTo(this, 'switch-tool', function (m) {
            var toolbar = _this.getSubview('.toolbar');
            toolbar.selectedTool = m;
        });
    }
    return PhaserIDE;
})(MagicView);
var SelectedToolView = (function (_super) {
    __extends(SelectedToolView, _super);
    function SelectedToolView() {
        _super.apply(this, arguments);
        this.template = F.loadTemplate('selected-tool');
    }
    return SelectedToolView;
})(MagicView);
var Toolbar = (function (_super) {
    __extends(Toolbar, _super);
    function Toolbar(attrs) {
        var _this = this;
        _super.call(this, attrs);
        this.template = F.loadTemplate('toolbar');
        this.subviews = {
            '.selected-tool': function (_attrs) {
                return new SelectedToolView(F.merge(_attrs, { model: _this._selectedTool }));
            }
        };
        this._selectedTool = this.collection.first();
    }
    Toolbar.prototype.subview = function () {
        return ToolbarItemView;
    };
    Object.defineProperty(Toolbar.prototype, "selectedTool", {
        set: function (val) {
            this._selectedTool = val;
            this.render();
        },
        enumerable: true,
        configurable: true
    });
    return Toolbar;
})(MagicListView);
var MainState = (function (_super) {
    __extends(MainState, _super);
    function MainState() {
        _super.apply(this, arguments);
    }
    MainState.prototype.preload = function () {
        // fw, fh, num frames,
        this.load.spritesheet("default", "assets/default.png", 32, 32);
    };
    MainState.prototype.init = function () {
        G.game.stage.backgroundColor = "#356b92";
    };
    MainState.prototype.create = function () {
        G.game.world.setBounds(0, 0, G.MAP_W, G.MAP_H);
        G.game.add.sprite(25, 25, "default");
    };
    return MainState;
})(Phaser.State);
var Game = (function () {
    function Game() {
        this.state = new MainState();
        G.game = new Phaser.Game(G.SCREEN_WIDTH, G.SCREEN_HEIGHT, Phaser.WEBGL, "main", this.state);
    }
    return Game;
})();
$(function () {
    var ide = new PhaserIDE({ el: $("#main-content") });
    ide.render();
    new Game();
});
