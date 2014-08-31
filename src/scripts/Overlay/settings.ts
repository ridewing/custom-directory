/// <reference path="../app.ts"/>
/// <reference path="overlayBase.ts"/>

module CustomDirectory {
    export module Overlay {
        export class Settings extends CustomDirectory.Overlay.OverlayBase
        {
            private currentTheme:string = 'default';

            public initListeners():void
            {
                super.initListeners();

                this.$overlay.find('.filetype-settings .settings-item').on('click', (e:JQueryEventObject) =>
                {
                    var $item:JQuery = $(e.currentTarget);

                    if($item.hasClass('active'))
                    {
                        this.deactivate( $item );
                    }
                    else
                    {
                        this.activate( $item );
                    }
                });

	            this.$overlay.find('.clear-settings .settings-item .button').on('click', (e:JQueryEventObject) =>
	            {
		            console.log('sadsasda');
		            this.clearAllData();
	            });

                this.$overlay.find('.theme-settings .theme').on('click', (e:JQueryEventObject) =>
                {
                    var id:string = $(e.currentTarget).data('id');

                    this.$overlay.find('.theme').removeClass('active');
                    $(e.currentTarget).addClass('active');

                    $('body').removeClass(this.currentTheme);
                    $('body').addClass(id);

                    this.currentTheme = id;
                })
            }

            private activate($item:JQuery):void
            {
	            if(!$item.hasClass('active'))
	            {
		            var idsToActive = [];

		            var id:string = this.enable($item);

		            idsToActive.push(id);

		            var dependency = $item.data('dependency');

		            if(dependency)
		            {
			            var $dep:JQuery = this.$overlay.find('.settings-item.' + dependency);

			            var relatedId:string = this.enable($dep);

			            idsToActive.push(relatedId);
		            }

		            Helpers.call('setting', {ids : idsToActive, active: true}, (response) =>
		            {
			            console.log(response);
		            });
	            }
            }

	        private enable($item):string
	        {
		        var id:string = $item.data('id');
		        $('body').addClass(id);

		        if(!$item.hasClass('active'))
		        {
			        $item.addClass('active');
		        }

		        return id;
	        }

	        private disable($item):string
	        {
				var id:string = $item.data('id');

		        if($item.hasClass('active'))
		        {
			        $item.removeClass('active');
			        $('body').removeClass(id);
		        }

		        return id;
	        }

	        public deactivateType(type):void
	        {
				this.deactivate(this.$overlay.find('.settings-item.filetype-' + type));
	        }

            private deactivate($item:JQuery):void
            {
	            if($item.hasClass('active'))
	            {
		            var idsToDeactivate = [];

		            var id:string = this.disable($item);

		            idsToDeactivate.push(id);

		            var dependentItems:JQuery = this.$overlay.find('.settings-item.dependency-' + id);

		            dependentItems.each((key, item) =>
		            {
			            var id:string = this.disable( $(item) );

			            idsToDeactivate.push(id);
		            });

		            Helpers.call('setting', {ids : idsToDeactivate, active: false}, (response) =>
		            {
			            console.log(response);
		            });
	            }
            }

	        private clearAllData():void
	        {
		        Helpers.call('removeAll', {}, (response) =>
			    {
				    console.log(response);

				    if(response && response.success)
						window.location = window.location;
			    });
	        }
        }
    }
}