/// <reference path="../../src/scripts/Vendor/jquery/jquery.d.ts" />
declare var settings: any;
declare module Helpers {
    function translate($target: JQuery, x?: number, y?: number, z?: number): void;
    function opacity($target: JQuery, opacity?: number): void;
    function rotateX($target: JQuery, deg?: number): void;
    function scale($target: JQuery, scale?: number): void;
    function setDocumentSize(width: number, height: number): void;
    function releaseDocumentSize(): void;
    function deviceSize(): any;
    function contentHeight(): number;
    function contentWidth(): number;
    function deviceWidth(): number;
    function deviceHeight(): number;
    function wait(time: number, callback: Function): void;
    function focus($input: JQuery): void;
    function blurContent($content: JQuery): void;
    function unblurContent($content: JQuery): void;
    function call(method: string, data: any, callback: Function): void;
    function detectmob(): boolean;
}
declare module CustomDirectory {
    module Overlay {
        class Settings extends Overlay.OverlayBase {
            private currentTheme;
            public initListeners(): void;
            private activate($item);
            private enable($item);
            private disable($item);
            private deactivate($item);
        }
    }
}
declare module CustomDirectory {
    class Popup {
        private $context;
        private $input;
        private $button;
        constructor($context: JQuery);
        public show(callback: Function, callbackClose: Function): void;
        public submit(callback: Function): void;
        public hide(): void;
        public setValue(value: string): void;
    }
}
declare var FastClick: any;
declare module CustomDirectory {
    module App {
        var popup: CustomDirectory.Popup;
        var isMobile: boolean;
        function boot(): void;
    }
}
declare module CustomDirectory {
    module Overlay {
        class OverlayBase {
            public $overlay: JQuery;
            constructor($overlay: JQuery);
            public boot(): void;
            public resize(): void;
            public initListeners(): void;
            public show(): void;
            public close(): void;
            public reset(): void;
            private getOverlayTop();
        }
    }
}
declare module CustomDirectory {
    module Overlay {
        class Favorites extends Overlay.OverlayBase {
            private $edit;
            private timeBeforeEdit;
            public boot(): void;
            public initListeners(): void;
            private editItem($item);
            private removeItem($item);
            public close(): void;
            private startEdit();
            private stopEdit();
            public add(name: any, path: any): void;
            public remove(id: string, path: string, removeItem?: boolean): void;
            private update(name, path);
        }
    }
}
