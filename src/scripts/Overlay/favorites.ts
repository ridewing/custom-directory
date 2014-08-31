/// <reference path="../app.ts"/>
/// <reference path="overlayBase.ts"/>

module CustomDirectory {
    export module Overlay {
        export class Favorites extends OverlayBase
        {
            private $edit:JQuery;
	        private timeBeforeEdit:number = 600;

	        public boot():void
	        {
		        super.boot();

		        this.stopEdit();
	        }

            public initListeners():void
            {
                super.initListeners();

	            this.$edit = this.$overlay.find('.edit');

	            this.$overlay.on('click', () =>
	            {
					CustomDirectory.App.popup.hide();
					Helpers.unblurContent(this.$overlay);
	            });

                this.$overlay.on('click', '.favorite-item .remove', (e:JQueryEventObject) =>
                {
                    e.preventDefault();

	                this.removeItem( $(e.currentTarget).parents('.favorite-item:first'))

	                return false;
                });

	            this.$overlay.on('click', '.favorite-item .edit-item', (e:JQueryEventObject) =>
                {
                    e.preventDefault();

	                this.editItem( $(e.currentTarget).parents('.favorite-item:first') );

                    return false;
                });

	            var touchtimer:number = null;

	            this.$overlay.on('touchstart', '.favorite-item', (e:JQueryEventObject) =>
	            {
					touchtimer = setTimeout(() =>
					{
						e.preventDefault();

						this.startEdit();
					}, this.timeBeforeEdit);
	            });

	            this.$overlay.on('touchend','.favorite-item', (e:JQueryEventObject) =>
	            {
		            clearTimeout(touchtimer);
	            });

	            this.$overlay.find('.overlay-content.favorites-list').on('click', (e:JQueryEventObject) =>
	            {
		            if(e.currentTarget == e.target)
		            {
			            this.stopEdit();
		            }
	            });

                this.$edit.on('click', (e:JQueryEventObject) =>
                {
                    e.preventDefault();

                    if(this.$edit.hasClass('active'))
                    {
                        this.stopEdit();
                    }
                    else
                    {
                        this.startEdit();
                    }
                });
            }

	        private editItem( $item:JQuery ):void
	        {
		        Helpers.blurContent( this.$overlay );

		        var value:string = $item.find('.name').text();
		        var path:string = $item.data('path');

		        CustomDirectory.App.popup.setValue( value );
		        CustomDirectory.App.popup.show(( newValue ) =>
		        {
			        Helpers.unblurContent( this.$overlay );
				    $item.find('.name').text( newValue );
					this.update( newValue, path );

		        }, () =>
		        {
			        Helpers.unblurContent( this.$overlay );
		        });
	        }

	        private removeItem( $item:JQuery ):void
	        {
		        var path:string = $item.data('path');
		        var id:string = $item.data('id');

		        $item.removeClass('jiggle');
		        $item.addClass('removing');

		        this.remove(id, path, false);

		        Helpers.wait(500, () =>
		        {
			        $item.remove();
			    });
	        }

            public close():void
            {
                this.stopEdit();
                super.close();
            }

            private startEdit():void
            {
	            this.$edit.addClass('active');
                this.$overlay.find('.favorite-item').addClass('jiggle');
            }

            private stopEdit():void
            {
	            this.$edit.removeClass('active');
                this.$overlay.find('.favorite-item').removeClass('jiggle');
            }

            public add(name, path):void
            {
	            console.group('Add favorite');
	            console.info(name);
	            console.info(path);
	            console.groupEnd();

                var data = {
                    name : name,
                    path : path
                };

                Helpers.call('addFavorite', data, (response) =>
                {
                    if(response && response.success)
                    {
                        this.$overlay.find('.favorites-list').append(response.output);
                    }
                })
            }

            public remove(id:string, path:string, removeItem:boolean = true):void
            {
	            $('ul.list li.'+id).removeClass('fav');

                var data = {
                    path : path
                };

                Helpers.call('removeFavorite', data, (response) =>
                {
                    if(response && response.success)
                    {
	                    if(removeItem)
	                    {
		                    this.$overlay.find('.favorites-list .favorite-item.' + id).remove();
	                    }
                    }
                })
            }

	        private update(name, path):void
	        {
		        var data = {
			        name : name,
			        path : path
		        };


		        Helpers.call('updateFavorite', data, (response) =>
		        {
					console.log(response)
		        })
	        }
        }
    }
}