module CustomDirectory {
	export class Tooltip {

		public visible:boolean;
		public $context:JQuery;
		public $current:JQuery;

		constructor($context:JQuery)
		{
			this.$context = $context;
			this.visible = false;
			this.initListeners();
		}

		private initListeners():void
		{
			$('.list').on('contextmenu', 'li a', (e:JQueryEventObject) =>
			{
				this.$current = $(e.currentTarget).parent();

				e.preventDefault();
				this.updatePosition(e.pageX, e.pageY);

				this.checkFavorite();
				this.checkExec();

				$('.list li').removeClass('active');
				this.show();
			});

			$('.list').on('click', 'li a', (e) =>
			{
				$('.list li').removeClass('active');

				if(this.visible)
				{
					this.hide();
					e.preventDefault();
				}
			});

			this.$context.on('click', 'li.finder', () =>
			{
				CustomDirectory.App.openDirectory(this.$current.data('path'));
				this.hide();
			});

			this.$context.on('click', 'li.sublime', () =>
			{
				CustomDirectory.App.openSublime(this.$current.data('path'));
				this.hide();
			});

			this.$context.on('click', 'li.exec', () =>
			{
				CustomDirectory.App.exec(this.$current.data('path'));
				this.hide();
			});

			this.$context.on('click', 'li.favorite', (e:JQueryEventObject) =>
			{
				if(!this.$current.is('.fav'))
					CustomDirectory.App.addFavorite( this.$current );
				else
					CustomDirectory.App.removeFavorite( this.$current );

				this.hide();
			});

			this.$context.on('click', 'li.hide', () =>
			{
				CustomDirectory.App._settings.deactivateType(this.$current.data('type'));
				this.hide();
			});
		}

		private checkFavorite():void
		{
			if(this.$current.is('.fav'))
			{
				this.$context.find('li.favorite').text('Remove from favorites');
			}
			else
			{
				this.$context.find('li.favorite').text('Add to favorites');
			}
		}

		private checkExec():void
		{
			if(this.$current.is('.command'))
			{
				this.$context.find('li.finder').removeClass('finder').addClass('exec').text('Run');
			}
			else
			{
				this.$context.find('li.exec').removeClass('exec').addClass('finder').text('Show in Finder');
			}
		}

		private show():void
		{
			this.$current.addClass('active');

			this.visible = true;
			this.$context.show();
		}

		private hide():void
		{
			$('.list li').removeClass('active');
			this.visible = false;
			this.$context.hide();
		}

		private updatePosition(x, y):void
		{
			var end = y + this.$context.height();

			// Flip position if we are outeside the screen
			if(end > (Helpers.deviceHeight() + $(document).scrollTop()) )
			{
				y -= this.$context.height();
			}

			this.$context.css({top: y, left: x});
		}
	}
}