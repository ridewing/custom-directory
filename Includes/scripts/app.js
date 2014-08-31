
var Helpers;
(function (Helpers) {
    function translate($target, x, y, z) {
        if (typeof x === "undefined") { x = 0; }
        if (typeof y === "undefined") { y = 0; }
        if (typeof z === "undefined") { z = 0; }
        var translate = 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px)';

        console.log('Translate to: %s', translate);

        $target.css({
            'transform': translate,
            '-webkit-transform': translate
        });
    }
    Helpers.translate = translate;

    function opacity($target, opacity) {
        if (typeof opacity === "undefined") { opacity = 0; }
        $target.css({ 'opacity': opacity });
    }
    Helpers.opacity = opacity;

    function rotateX($target, deg) {
        if (typeof deg === "undefined") { deg = 0; }
        var rotate = "rotateX(" + deg + ")";

        $target.css({
            'transform': rotate,
            '-webkit-transform': rotate
        });
    }
    Helpers.rotateX = rotateX;

    function scale($target, scale) {
        if (typeof scale === "undefined") { scale = 0; }
        var scaleValue = "scale(" + scale + ")";

        $target.css({
            'transform': scaleValue,
            '-webkit-transform': scaleValue
        });
    }
    Helpers.scale = scale;

    function setDocumentSize(width, height) {
        $('body').css({ width: width, height: height, overflow: 'hidden' });
    }
    Helpers.setDocumentSize = setDocumentSize;

    function releaseDocumentSize() {
        $('body').css({ width: 'auto', height: 'auto', overflow: 'visible' });
    }
    Helpers.releaseDocumentSize = releaseDocumentSize;

    function deviceSize() {
        return { width: Helpers.deviceWidth(), height: Helpers.deviceHeight() };
    }
    Helpers.deviceSize = deviceSize;

    function contentHeight() {
        return $('.content').height();
    }
    Helpers.contentHeight = contentHeight;

    function contentWidth() {
        return $('.content').width();
    }
    Helpers.contentWidth = contentWidth;

    function deviceWidth() {
        return $(window).width();
    }
    Helpers.deviceWidth = deviceWidth;

    function deviceHeight() {
        return $(window).height();
    }
    Helpers.deviceHeight = deviceHeight;

    function wait(time, callback) {
        window.setTimeout(function () {
            return callback();
        }, time);
    }
    Helpers.wait = wait;

    function focus($input) {
        $input.trigger('focus');
    }
    Helpers.focus = focus;

    function blurContent($content) {
        $content.addClass('blur');
    }
    Helpers.blurContent = blurContent;

    function unblurContent($content) {
        $content.removeClass('blur');
    }
    Helpers.unblurContent = unblurContent;

    function call(method, data, callback) {
        data['method'] = method;

        $.ajax({
            method: 'POST',
            data: data,
            url: settings.ajax,
            dataType: 'json',
            success: callback,
            error: function () {
                callback(null);
            }
        });
    }
    Helpers.call = call;

    function detectmob() {
        if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
            return true;
        } else {
            return false;
        }
    }
    Helpers.detectmob = detectmob;
})(Helpers || (Helpers = {}));
var CustomDirectory;
(function (CustomDirectory) {
    (function (Overlay) {
        var OverlayBase = (function () {
            function OverlayBase($overlay) {
                this.$overlay = $overlay;

                this.initListeners();
                this.boot();
                this.resize();
            }
            OverlayBase.prototype.boot = function () {
                Helpers.translate(this.$overlay, 0, Helpers.deviceHeight());
            };

            OverlayBase.prototype.resize = function () {
                var maxWidth = 568;
                var width = Helpers.deviceWidth();
                var height = Helpers.contentHeight();

                if (width > maxWidth) {
                    width = maxWidth;
                    var padding = (Helpers.deviceWidth() - maxWidth) * 0.5;
                    this.$overlay.css({ 'left': padding }).addClass('modular');

                    this.$overlay.css({
                        'width': width,
                        'min-height': 0
                    });

                    this.$overlay.find('.overlay-content').css({
                        'height': this.$overlay.height() - (this.$overlay.find('.overlay-header').outerHeight())
                    });

                    if (this.isVisible) {
                        $('body').css({ height: Helpers.deviceHeight(), overflow: 'hidden' });
                        $('.overlay-closer').show();
                    }
                } else {
                    this.$overlay.removeClass('modular');

                    this.$overlay.css({
                        'width': width,
                        'min-height': height
                    });

                    this.$overlay.find('.overlay-content').css({
                        'height': 'auto'
                    });

                    Helpers.releaseDocumentSize();
                    $('.overlay-closer').hide();
                }
            };

            OverlayBase.prototype.initListeners = function () {
                var _this = this;
                this.$overlay.find('.close').on('click', function (e) {
                    e.preventDefault();

                    _this.close();
                });

                $(window).resize(function () {
                    return _this.resize();
                });
            };

            OverlayBase.prototype.show = function () {
                var _this = this;
                this.isVisible = true;
                this.$overlay.show();
                Helpers.wait(50, function () {
                    _this.resize();

                    Helpers.translate(_this.$overlay, 0, 0);
                    Helpers.wait(1, function () {
                        Helpers.blurContent($('.content'));
                    });
                });
            };

            OverlayBase.prototype.close = function () {
                var _this = this;
                this.isVisible = false;
                $('.overlay-closer').hide();
                Helpers.unblurContent($('.content'));
                this.reset();
                Helpers.wait(300, function () {
                    _this.$overlay.hide();
                    Helpers.releaseDocumentSize();
                });
            };

            OverlayBase.prototype.reset = function () {
                Helpers.translate(this.$overlay, 0, this.getOverlayTop());
            };

            OverlayBase.prototype.getOverlayTop = function () {
                return Helpers.deviceHeight() + $(window).scrollTop();
            };
            return OverlayBase;
        })();
        Overlay.OverlayBase = OverlayBase;
    })(CustomDirectory.Overlay || (CustomDirectory.Overlay = {}));
    var Overlay = CustomDirectory.Overlay;
})(CustomDirectory || (CustomDirectory = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CustomDirectory;
(function (CustomDirectory) {
    (function (Overlay) {
        var Settings = (function (_super) {
            __extends(Settings, _super);
            function Settings() {
                _super.apply(this, arguments);
                this.currentTheme = 'default';
            }
            Settings.prototype.initListeners = function () {
                var _this = this;
                _super.prototype.initListeners.call(this);

                this.$overlay.find('.filetype-settings .settings-item').on('click', function (e) {
                    var $item = $(e.currentTarget);

                    if ($item.hasClass('active')) {
                        _this.deactivate($item);
                    } else {
                        _this.activate($item);
                    }
                });

                this.$overlay.find('.clear-settings .settings-item .button').on('click', function (e) {
                    console.log('sadsasda');
                    _this.clearAllData();
                });

                this.$overlay.find('.theme-settings .theme').on('click', function (e) {
                    var id = $(e.currentTarget).data('id');

                    _this.$overlay.find('.theme').removeClass('active');
                    $(e.currentTarget).addClass('active');

                    $('body').removeClass(_this.currentTheme);
                    $('body').addClass(id);

                    _this.currentTheme = id;
                });
            };

            Settings.prototype.activate = function ($item) {
                if (!$item.hasClass('active')) {
                    var idsToActive = [];

                    var id = this.enable($item);

                    idsToActive.push(id);

                    var dependency = $item.data('dependency');

                    if (dependency) {
                        var $dep = this.$overlay.find('.settings-item.' + dependency);

                        var relatedId = this.enable($dep);

                        idsToActive.push(relatedId);
                    }

                    Helpers.call('setting', { ids: idsToActive, active: true }, function (response) {
                        console.log(response);
                    });
                }
            };

            Settings.prototype.enable = function ($item) {
                var id = $item.data('id');
                $('body').addClass(id);

                if (!$item.hasClass('active')) {
                    $item.addClass('active');
                }

                return id;
            };

            Settings.prototype.disable = function ($item) {
                var id = $item.data('id');

                if ($item.hasClass('active')) {
                    $item.removeClass('active');
                    $('body').removeClass(id);
                }

                return id;
            };

            Settings.prototype.deactivateType = function (type) {
                this.deactivate(this.$overlay.find('.settings-item.filetype-' + type));
            };

            Settings.prototype.deactivate = function ($item) {
                var _this = this;
                if ($item.hasClass('active')) {
                    var idsToDeactivate = [];

                    var id = this.disable($item);

                    idsToDeactivate.push(id);

                    var dependentItems = this.$overlay.find('.settings-item.dependency-' + id);

                    dependentItems.each(function (key, item) {
                        var id = _this.disable($(item));

                        idsToDeactivate.push(id);
                    });

                    Helpers.call('setting', { ids: idsToDeactivate, active: false }, function (response) {
                        console.log(response);
                    });
                }
            };

            Settings.prototype.clearAllData = function () {
                Helpers.call('removeAll', {}, function (response) {
                    console.log(response);

                    if (response && response.success)
                        window.location = window.location;
                });
            };
            return Settings;
        })(CustomDirectory.Overlay.OverlayBase);
        Overlay.Settings = Settings;
    })(CustomDirectory.Overlay || (CustomDirectory.Overlay = {}));
    var Overlay = CustomDirectory.Overlay;
})(CustomDirectory || (CustomDirectory = {}));
var CustomDirectory;
(function (CustomDirectory) {
    (function (Overlay) {
        var Info = (function (_super) {
            __extends(Info, _super);
            function Info() {
                _super.apply(this, arguments);
            }
            return Info;
        })(CustomDirectory.Overlay.OverlayBase);
        Overlay.Info = Info;
    })(CustomDirectory.Overlay || (CustomDirectory.Overlay = {}));
    var Overlay = CustomDirectory.Overlay;
})(CustomDirectory || (CustomDirectory = {}));
var CustomDirectory;
(function (CustomDirectory) {
    var Tooltip = (function () {
        function Tooltip($context) {
            this.$context = $context;
            this.visible = false;
            this.initListeners();
        }
        Tooltip.prototype.initListeners = function () {
            var _this = this;
            $('.list').on('contextmenu', 'li a', function (e) {
                _this.$current = $(e.currentTarget).parent();

                e.preventDefault();
                _this.updatePosition(e.pageX, e.pageY);

                _this.checkFavorite();
                _this.checkExec();

                $('.list li').removeClass('active');
                _this.show();
            });

            $('.list').on('click', 'li a', function (e) {
                $('.list li').removeClass('active');

                if (_this.visible) {
                    _this.hide();
                    e.preventDefault();
                }
            });

            this.$context.on('click', 'li.finder', function () {
                CustomDirectory.App.openDirectory(_this.$current.data('path'));
                _this.hide();
            });

            this.$context.on('click', 'li.exec', function () {
                CustomDirectory.App.exec(_this.$current.data('path'));
                _this.hide();
            });

            this.$context.on('click', 'li.favorite', function (e) {
                if (!_this.$current.is('.fav'))
                    CustomDirectory.App.addFavorite(_this.$current);
                else
                    CustomDirectory.App.removeFavorite(_this.$current);

                _this.hide();
            });

            this.$context.on('click', 'li.hide', function () {
                CustomDirectory.App._settings.deactivateType(_this.$current.data('type'));
                _this.hide();
            });
        };

        Tooltip.prototype.checkFavorite = function () {
            if (this.$current.is('.fav')) {
                this.$context.find('li.favorite').text('Remove from favorites');
            } else {
                this.$context.find('li.favorite').text('Add to favorites');
            }
        };

        Tooltip.prototype.checkExec = function () {
            if (this.$current.is('.command')) {
                this.$context.find('li.finder').removeClass('finder').addClass('exec').text('Run');
            } else {
                this.$context.find('li.exec').removeClass('exec').addClass('finder').text('Show in Finder');
            }
        };

        Tooltip.prototype.show = function () {
            this.$current.addClass('active');

            this.visible = true;
            this.$context.show();
        };

        Tooltip.prototype.hide = function () {
            $('.list li').removeClass('active');
            this.visible = false;
            this.$context.hide();
        };

        Tooltip.prototype.updatePosition = function (x, y) {
            var end = y + this.$context.height();

            if (end > (Helpers.deviceHeight() + $(document).scrollTop())) {
                y -= this.$context.height();
            }

            this.$context.css({ top: y, left: x });
        };
        return Tooltip;
    })();
    CustomDirectory.Tooltip = Tooltip;
})(CustomDirectory || (CustomDirectory = {}));
var CustomDirectory;
(function (CustomDirectory) {
    var Popup = (function () {
        function Popup($context) {
            this.$context = $context;
            this.$input = this.$context.find('input');
            this.$button = this.$context.find('.button-save');
            this.hide();
        }
        Popup.prototype.show = function (callback, callbackClose) {
            var _this = this;
            this.$context.show();

            Helpers.focus(this.$input);

            Helpers.wait(100, function () {
                Helpers.opacity(_this.$context, 1.0);
                Helpers.scale(_this.$context, 1.0);
            });

            this.$button.off('click');
            this.$button.on('click', function () {
                _this.submit(callback);
            });

            this.$input.off('keyup');
            this.$input.on('keyup', function (e) {
                if (e.keyCode == 13) {
                    _this.$input.trigger('blur');
                    _this.submit(callback);
                }
            });

            this.$input.off('blur');
            this.$input.on('blur', function () {
                _this.hide();
                callbackClose();
            });
        };

        Popup.prototype.submit = function (callback) {
            var value = this.$input.val();
            callback(value);
            this.hide();
        };

        Popup.prototype.hide = function () {
            var _this = this;
            Helpers.opacity(this.$context, 0.0);
            Helpers.scale(this.$context, 0.0);
            Helpers.wait(300, function () {
                _this.$context.hide();
            });
        };

        Popup.prototype.setValue = function (value) {
            this.$input.val(value);
        };
        return Popup;
    })();
    CustomDirectory.Popup = Popup;
})(CustomDirectory || (CustomDirectory = {}));

var CustomDirectory;
(function (CustomDirectory) {
    (function (App) {
        App.popup;
        App.isMobile;
        App.favorites;
        App._settings;

        function boot() {
            App.isMobile = Helpers.detectmob();

            $(document).ready(function () {
                App.popup = new CustomDirectory.Popup($('.popup'));

                FastClick.attach(document.body);

                App.favorites = new CustomDirectory.Overlay.Favorites($('.overlay-favorites'));
                App._settings = new CustomDirectory.Overlay.Settings($('.overlay-settings'));
                var info = new CustomDirectory.Overlay.Info($('.overlay-info'));
                var tooltip = new CustomDirectory.Tooltip($('.tooltip'));

                $('body').on('touchmove', function () {
                    $('body').addClass('moving');
                });

                $('body').on('touchend', function () {
                    $('body').removeClass('moving');
                });

                $(document).on('touchstart', 'a.button', function (e) {
                    $(e.currentTarget).addClass('active');
                });

                $(document).on('touchend', 'a.button', function (e) {
                    $(e.currentTarget).removeClass('active');
                });

                $('.header').on('click', '.icon-open', function (e) {
                    e.preventDefault();
                    openCurrentDirectory();
                });

                $('.header').on('click', '.icon-favorites', function (e) {
                    e.preventDefault();
                    App.favorites.show();
                });

                $('.header').on('click', '.icon-settings', function (e) {
                    e.preventDefault();
                    App._settings.show();
                });

                $('.header').on('click', '.icon-info', function (e) {
                    e.preventDefault();
                    info.show();
                });

                $('.list').on('click', 'li .favorite', function (e) {
                    e.preventDefault();

                    var $item = $(e.currentTarget).parents('li:first');

                    if ($item.hasClass('fav')) {
                        removeFavorite($item);
                    } else {
                        addFavorite($item);
                    }
                });
            });
        }
        App.boot = boot;

        function addFavorite($item) {
            var name = $item.data('name');
            var path = $item.data('path');

            $item.addClass('fav');

            App.favorites.add(name, path);
        }
        App.addFavorite = addFavorite;

        function removeFavorite($item) {
            var path = $item.data('path');
            var id = $item.data('id');

            $item.removeClass('fav');

            App.favorites.remove(id, path);
        }
        App.removeFavorite = removeFavorite;

        function openCurrentDirectory() {
            openDirectory(settings.path);
        }
        App.openCurrentDirectory = openCurrentDirectory;

        function openDirectory(path) {
            Helpers.call('open', { path: path }, function () {
            });
        }
        App.openDirectory = openDirectory;

        function exec(path) {
            Helpers.call('exec', { path: path }, function () {
            });
        }
        App.exec = exec;
    })(CustomDirectory.App || (CustomDirectory.App = {}));
    var App = CustomDirectory.App;
})(CustomDirectory || (CustomDirectory = {}));
var CustomDirectory;
(function (CustomDirectory) {
    (function (Overlay) {
        var Favorites = (function (_super) {
            __extends(Favorites, _super);
            function Favorites() {
                _super.apply(this, arguments);
                this.timeBeforeEdit = 600;
            }
            Favorites.prototype.boot = function () {
                _super.prototype.boot.call(this);

                this.stopEdit();
            };

            Favorites.prototype.initListeners = function () {
                var _this = this;
                _super.prototype.initListeners.call(this);

                this.$edit = this.$overlay.find('.edit');

                this.$overlay.on('click', function () {
                    CustomDirectory.App.popup.hide();
                    Helpers.unblurContent(_this.$overlay);
                });

                this.$overlay.on('click', '.favorite-item .remove', function (e) {
                    e.preventDefault();

                    _this.removeItem($(e.currentTarget).parents('.favorite-item:first'));

                    return false;
                });

                this.$overlay.on('click', '.favorite-item .edit-item', function (e) {
                    e.preventDefault();

                    _this.editItem($(e.currentTarget).parents('.favorite-item:first'));

                    return false;
                });

                var touchtimer = null;

                this.$overlay.on('touchstart', '.favorite-item', function (e) {
                    touchtimer = setTimeout(function () {
                        e.preventDefault();

                        _this.startEdit();
                    }, _this.timeBeforeEdit);
                });

                this.$overlay.on('touchend', '.favorite-item', function (e) {
                    clearTimeout(touchtimer);
                });

                this.$overlay.find('.overlay-content.favorites-list').on('click', function (e) {
                    if (e.currentTarget == e.target) {
                        _this.stopEdit();
                    }
                });

                this.$edit.on('click', function (e) {
                    e.preventDefault();

                    if (_this.$edit.hasClass('active')) {
                        _this.stopEdit();
                    } else {
                        _this.startEdit();
                    }
                });
            };

            Favorites.prototype.editItem = function ($item) {
                var _this = this;
                Helpers.blurContent(this.$overlay);

                var value = $item.find('.name').text();
                var path = $item.data('path');

                CustomDirectory.App.popup.setValue(value);
                CustomDirectory.App.popup.show(function (newValue) {
                    Helpers.unblurContent(_this.$overlay);
                    $item.find('.name').text(newValue);
                    _this.update(newValue, path);
                }, function () {
                    Helpers.unblurContent(_this.$overlay);
                });
            };

            Favorites.prototype.removeItem = function ($item) {
                var path = $item.data('path');
                var id = $item.data('id');

                $item.removeClass('jiggle');
                $item.addClass('removing');

                this.remove(id, path, false);

                Helpers.wait(500, function () {
                    $item.remove();
                });
            };

            Favorites.prototype.close = function () {
                this.stopEdit();
                _super.prototype.close.call(this);
            };

            Favorites.prototype.startEdit = function () {
                this.$edit.addClass('active');
                this.$overlay.find('.favorite-item').addClass('jiggle');
            };

            Favorites.prototype.stopEdit = function () {
                this.$edit.removeClass('active');
                this.$overlay.find('.favorite-item').removeClass('jiggle');
            };

            Favorites.prototype.add = function (name, path) {
                var _this = this;
                console.group('Add favorite');
                console.info(name);
                console.info(path);
                console.groupEnd();

                var data = {
                    name: name,
                    path: path
                };

                Helpers.call('addFavorite', data, function (response) {
                    if (response && response.success) {
                        _this.$overlay.find('.favorites-list').append(response.output);
                    }
                });
            };

            Favorites.prototype.remove = function (id, path, removeItem) {
                if (typeof removeItem === "undefined") { removeItem = true; }
                var _this = this;
                $('ul.list li.' + id).removeClass('fav');

                var data = {
                    path: path
                };

                Helpers.call('removeFavorite', data, function (response) {
                    if (response && response.success) {
                        if (removeItem) {
                            _this.$overlay.find('.favorites-list .favorite-item.' + id).remove();
                        }
                    }
                });
            };

            Favorites.prototype.update = function (name, path) {
                var data = {
                    name: name,
                    path: path
                };

                Helpers.call('updateFavorite', data, function (response) {
                    console.log(response);
                });
            };
            return Favorites;
        })(CustomDirectory.Overlay.OverlayBase);
        Overlay.Favorites = Favorites;
    })(CustomDirectory.Overlay || (CustomDirectory.Overlay = {}));
    var Overlay = CustomDirectory.Overlay;
})(CustomDirectory || (CustomDirectory = {}));
