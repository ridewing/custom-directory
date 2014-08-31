var CustomDirectory;
(function (CustomDirectory) {
    (function (Overlay) {
        Overlay.test = 2;
        var OverlayBase = (function () {
            function OverlayBase() {
                this.test = 2;
                console.log('test');
            }
            return OverlayBase;
        })();
        Overlay.OverlayBase = OverlayBase;

        function test() {
            return 'test';
        }
        Overlay.test = test;
    })(CustomDirectory.Overlay || (CustomDirectory.Overlay = {}));
    var Overlay = CustomDirectory.Overlay;
})(CustomDirectory || (CustomDirectory = {}));
//# sourceMappingURL=overlayBase.js.map
