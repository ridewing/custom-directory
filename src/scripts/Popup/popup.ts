/// <reference path="../app.ts"/>
/// <reference path="../Helpers.ts"/>

module CustomDirectory {
	export class Popup
	{
		private $context:JQuery;
		private $input:JQuery;
		private $button:JQuery;

		constructor($context:JQuery)
		{
			this.$context = $context;
			this.$input = this.$context.find('input')
			this.$button = this.$context.find('.button-save');
			this.hide();
		}

		public show( callback:Function, callbackClose:Function ):void
		{
			this.$context.show();

			Helpers.focus( this.$input );

			Helpers.wait(100, () =>
			{
				Helpers.opacity( this.$context, 1.0 );
				Helpers.scale( this.$context, 1.0 );
			});

			this.$button.off('click');
			this.$button.on('click', () =>
			{
				this.submit(callback);
			});

			this.$input.off('keyup');
			this.$input.on('keyup', (e:JQueryEventObject) =>
			{
				if(e.keyCode == 13)
				{
					this.$input.trigger('blur');
					this.submit(callback);
				}
			});

			this.$input.off('blur');
			this.$input.on('blur', () =>
			{
				this.hide();
				callbackClose();
			});
		}

		public submit(callback:Function):void
		{
			var value = this.$input.val();
			callback(value);
			this.hide();
		}

		public hide():void
		{
			Helpers.opacity( this.$context, 0.0 );
			Helpers.scale( this.$context, 0.0 );
			Helpers.wait(300, () =>
			{
				this.$context.hide();
			});
		}

		public setValue( value:string ):void
		{
			this.$input.val( value );
		}
	}
}