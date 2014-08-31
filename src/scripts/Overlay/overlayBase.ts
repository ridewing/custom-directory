/// <reference path="../Vendor/jquery/jquery.d.ts"/>
/// <reference path="../Helpers.ts"/>

module CustomDirectory {
    export module Overlay {

        export class OverlayBase {

            public $overlay:JQuery;
	        public isVisible:boolean;

            constructor( $overlay:JQuery )
            {
                this.$overlay = $overlay;

                this.initListeners();
                this.boot();
                this.resize();
            }

            public boot():void
            {
                Helpers.translate(this.$overlay, 0, Helpers.deviceHeight());
            }

            public resize():void
            {
                var maxWidth = 568;
	            var width = Helpers.deviceWidth();
	            var height = Helpers.contentHeight();

	            if(width > maxWidth)
	            {
		            width = maxWidth;
		            var padding = (Helpers.deviceWidth() - maxWidth) * 0.5;
		            this.$overlay.css({ 'left' : padding }).addClass('modular');

		            this.$overlay.css({
			            'width'         : width,
			            'min-height'    : 0
		            });

		            this.$overlay.find('.overlay-content').css({
			            'height' : this.$overlay.height() - (this.$overlay.find('.overlay-header').outerHeight())
		            });

		            if(this.isVisible)
		            {
			            $('body').css({height: Helpers.deviceHeight(), overflow : 'hidden'});
		                $('.overlay-closer').show();
		            }
	            }
	            else
	            {
		            this.$overlay.removeClass('modular');

		            this.$overlay.css({
			            'width'         : width,
			            'min-height'    : height
		            });

		            this.$overlay.find('.overlay-content').css({
			            'height' : 'auto'
		            });

		            Helpers.releaseDocumentSize();
		            $('.overlay-closer').hide();
	            }


            }

            public initListeners():void
            {
                this.$overlay.find('.close').on('click', (e:JQueryEventObject)  =>
                {
                    e.preventDefault();

                    this.close();
                });

                $(window).resize(() => this.resize());
            }

            public show():void
            {
	            this.isVisible = true;
	            this.$overlay.show();
	            Helpers.wait(50, () =>
                {
	                this.resize();

                    Helpers.translate(this.$overlay, 0, 0);
                    Helpers.wait(1, () =>
                    {
                        Helpers.blurContent( $('.content') );
                    });
                });
            }

            public close():void
            {
	            this.isVisible = false;
	            $('.overlay-closer').hide();
	            Helpers.unblurContent( $('.content') );
                this.reset();
                Helpers.wait(300, () =>
                {
                   this.$overlay.hide();
                   Helpers.releaseDocumentSize();
                });
            }

	        public reset():void
	        {
		        Helpers.translate(this.$overlay, 0, this.getOverlayTop());
	        }

	        private getOverlayTop():number
	        {
		        return Helpers.deviceHeight() + $(window).scrollTop();
	        }
        }
    }
}