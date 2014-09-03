/// <reference path="Overlay/overlays.ts"/>
/// <reference path="Tooltip/Tooltip.ts"/>
/// <reference path="Popup/popup.ts"/>

declare var FastClick:any;

module CustomDirectory {
    export module App {

	    export var popup:CustomDirectory.Popup;
	    export var isMobile:boolean;
	    export var favorites:CustomDirectory.Overlay.Favorites;
	    export var _settings:CustomDirectory.Overlay.Settings;

        export function boot()
        {
	        App.isMobile = Helpers.detectmob();

            $(document).ready(() =>
            {
	            App.popup = new CustomDirectory.Popup( $('.popup') );

                FastClick.attach(document.body);

                favorites = new CustomDirectory.Overlay.Favorites($('.overlay-favorites'));
                _settings = new CustomDirectory.Overlay.Settings($('.overlay-settings'));
                var info = new CustomDirectory.Overlay.Info($('.overlay-info'));
				var tooltip = new CustomDirectory.Tooltip($('.tooltip'));
	            //settings.show();


	            $('body').on('touchmove', () =>
	            {
		            $('body').addClass('moving');
	            });

	            $('body').on('touchend', () =>
	            {
		            $('body').removeClass('moving');
	            });

                $(document).on('touchstart', 'a.button', (e:JQueryEventObject) =>
                {
                    $(e.currentTarget).addClass('active');
                });

                $(document).on('touchend', 'a.button', (e:JQueryEventObject) =>
                {
                    $(e.currentTarget).removeClass('active');
                });

	            $('.header').on('click', '.icon-open', (e:JQueryEventObject) =>
	            {
		            e.preventDefault();
		            openCurrentDirectory();
	            });

                $('.header').on('click', '.icon-favorites', (e:JQueryEventObject) =>
                {
                    e.preventDefault();
                    favorites.show();
                });

                $('.header').on('click', '.icon-settings', (e:JQueryEventObject) =>
                {
                    e.preventDefault();
                    _settings.show();
                });

	            $('.header').on('click', '.icon-info', (e:JQueryEventObject) =>
	            {
		            e.preventDefault();
		            info.show();
	            });

                $('.list').on('click', 'li .favorite', (e:JQueryEventObject) =>
                {
                    e.preventDefault();

                    var $item = $(e.currentTarget).parents('li:first');

                    if($item.hasClass('fav'))
                    {
                        removeFavorite($item);
                    }
                    else
                    {
	                    addFavorite($item);
                    }
                });
            })
        }

	    export function addFavorite($item:JQuery):void
	    {
		    var name:string = $item.data('name');
		    var path:string = $item.data('path');

		    $item.addClass('fav');

		    favorites.add(name, path);
	    }

	    export function removeFavorite($item:JQuery):void
	    {
		    var path:string = $item.data('path');
		    var id:string = $item.data('id');

		    $item.removeClass('fav');

		    favorites.remove(id, path);
	    }

	    export function openCurrentDirectory()
	    {
		    openDirectory(settings.path);
	    }

	    export function openDirectory(path)
	    {
		    Helpers.call('open', {path : path}, () => {});
	    }

		export function openSublime(path)
		{
			Helpers.call('sublime', {path : path}, () => {});
		}

	    export function exec(path)
	    {
		    Helpers.call('exec', {path : path}, () => {});
	    }

    }
}