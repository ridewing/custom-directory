module CustomDirectory {
	export class Search
	{
		private items:JQuery = $('.list li');
		private search:string = "";
		private active:JQuery;
		private currentIndex:number = 0;

		constructor()
		{
			this.initListeners();
		}

		private initListeners():void
		{
			$(window).on('keydown', (e) =>
			{
				if(e.metaKey || e.shiftKey || e.ctrlKey || e.altKey)
				{

				}
				else
				{
					e.preventDefault();

					//console.log(e.keyCode)

					switch(e.keyCode)
					{
						// Esc button
						case 27:
							this.cancel();
							break;

						case 8:

							if(this.search.length == 1)
							{
								this.cancel();
							}
							else
							{
								this.clear();
								this.backspace();
								if(this.search.length > 0)
									this.find(this.search);
								else
									this.cancel();
							}

							break;

						case 40:
						case 9:
							this.moveDown();
							break;
						case 38:
							this.moveUp();
							break;

						case 13:
							this.openActive();
							break;

						default:
							this.clear();
							this.append(String.fromCharCode(e.keyCode));
							this.find(this.search);
							break;
					}
				}
			})
		}

		public find(value:string):void
		{
			value = value.toLowerCase();

			if(value.length > 0)
			{
				this.items.each((key, item) =>
				{
					var defaultName = $(item).data('name');
					var name = defaultName.toLowerCase();
					var index = name.indexOf(value);

					if(index > -1)
					{
						var holder		= $('<div/>', {class : 'search-symbol-holder'});
						var placeholder = $('<span/>', {class : 'search-symbol-placeholder'});
						var symbol 		= $('<span/>', {class : 'search-symbol symbol-inset-' + index});


						var placeholderValue 	= defaultName.substring(0, index);
						var symbolValue 		= defaultName.substring(index, index + value.length);

						symbol.append(symbolValue);
						placeholder.append(placeholderValue);

						holder.append(placeholder);
						holder.append(symbol);


						$(item).find('a').append(holder);
						$(item).addClass('search-find');
					}
					else
					{
						$(item).addClass('disabled');
					}
				})

				this.activate( this.items.filter('.search-find:not(.hidden):first') );

				var wrapper = $('.search-overlay-wrapper');

				wrapper.find('.search-overlay span').text(this.search);

				window.setTimeout(() =>
				{
					wrapper.addClass('show');
				}, 100);
			}
		}

		private append(char:string):void
		{
			this.search += char.toLowerCase();
		}

		private backspace():void
		{
			this.currentIndex = 0;
			this.search = this.search.substring(0, this.search.length - 1);
		}

		private clear():void
		{
			this.active = null;
			this.currentIndex = 0;
			this.items.find('.search-symbol-holder').remove();
			this.items.removeClass('disabled');
			this.items.removeClass('search-find');
			$('body').find('.search-overlay-wrapper').find('.search-overlay span').text('');
		}

		private cancel():void
		{
			$('body').find('.search-overlay-wrapper').removeClass('show')
			window.setTimeout(() =>
			{
				this.items.removeClass('active');
				this.search = "";
				this.clear();
			}, 200);

		}

		private activate(item:JQuery):void
		{
			if(item.length > 0)
			{
				this.active = item;

				$('html, body').animate({
					"scrollTop" :  item.offset().top - 100
				}, 200);
				this.items.removeClass('active');

				this.active.addClass('active');
			}
		}

		private moveUp():void
		{
			if(this.currentIndex > 0)
			{
				this.currentIndex--;
				this.activate(this.items.filter('.search-find').eq(this.currentIndex));
			}
			else
			{
				this.currentIndex = this.items.filter('.search-find').length;
				this.moveUp();
			}
		}

		private moveDown():void
		{
			if(this.currentIndex < (this.items.filter('.search-find').length - 1))
			{
				this.currentIndex++;
				this.activate(this.items.filter('.search-find').eq(this.currentIndex));
			}
			else
			{
				this.currentIndex = -1;
				this.moveDown();
			}
		}

		private openActive():void
		{
			if(this.active !== null)
			{
				window.location.href = <string>this.active.find('a:first').attr('href');
			}
			else
			{
				$('body').find('.search-overlay-wrapper .search-overlay').addClass('shake');

				window.setTimeout(() =>
				{
					$('body').find('.search-overlay-wrapper .search-overlay').removeClass('shake');
				}, 500);
			}
		}

	}
}