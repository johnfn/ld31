/// <reference path="refs.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DialogWidget = (function (_super) {
    __extends(DialogWidget, _super);
    function DialogWidget(attrs) {
        _super.call(this, attrs);
        this.template = F.loadTemplate('dialog-widget');
        _.bindAll(this, 'render');
        this.attrs = attrs;
    }
    DialogWidget.prototype.render = function () {
        var buttons = this.attrs.buttons;
        var self = this;
        // For the body parameter, you can either pass in a string for the body,
        // or a view that should be rendered for the body.
        if (typeof this.attrs.body === "function") {
            var view = this.attrs.body;
            this.attrs.body = "";
            this.el.innerHTML = this.template(this.attrs);
            this.view = new view({
                el: this.$(".modal-body"),
                attrs: this.attrs
            });
            this.view.render();
        }
        else {
            this.el.innerHTML = this.template(this.attrs);
        }
        for (var i = 0; i < buttons.length; i++) {
            var button = new ButtonWidget(buttons[i]);
            this.$(".modal-footer").append(button.render().$el);
            this.listenTo(button, 'close-modal', function () {
                self.$(".modal").modal('hide').on('hidden.bs.modal', function () {
                    self.trigger("modal-gone");
                });
                // Destroy the backdrop manually. In the case where pressing this button will
                // delete the el that contains this modal, the backdrop will stick around awkwardly, like
                // that friend you don't like at your party.
                // That's because deleting the container of the modal deletes the modal before it has a chance
                // to clean up after itself.
                $('.modal-backdrop').remove();
            });
        }
        this.$(".modal").modal();
        return this;
    };
    return DialogWidget;
})(Backbone.View);
var ButtonWidget = (function (_super) {
    __extends(ButtonWidget, _super);
    function ButtonWidget(attrs) {
        attrs.tagName = "button";
        attrs.className += " btn";
        _super.call(this, attrs);
        _.bindAll(this, 'click', 'render');
        attrs.type = attrs.type || "btn-default";
        this.attrs = attrs;
    }
    ButtonWidget.prototype.events = function () {
        return { "click": "click" };
    };
    ButtonWidget.prototype.click = function (e) {
        this.trigger("close-modal");
        if (this.attrs.clickCallback) {
            this.attrs.clickCallback();
        }
    };
    ButtonWidget.prototype.render = function () {
        this.$el.addClass(this.attrs.type);
        this.$el.text(this.attrs.title);
        return this;
    };
    return ButtonWidget;
})(Backbone.View);
