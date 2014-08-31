/// <reference path="Vendor/jquery/jquery.d.ts"/>

declare var settings:any;

module Helpers {

    export function translate($target:JQuery, x:number = 0, y:number = 0, z:number = 0):void
    {
        var translate:string = 'translate3d('+x+'px,'+y+'px,'+z+'px)';

        console.log('Translate to: %s', translate);

        $target.css({
            'transform' : translate,
            '-webkit-transform' : translate
        });
    }

	export function opacity($target:JQuery, opacity:number = 0):void
	{
		$target.css({ 'opacity' : opacity });
	}

	export function rotateX($target:JQuery, deg:number = 0):void
	{
		var rotate = "rotateX("+deg+")";

		$target.css({
			'transform' : rotate,
			'-webkit-transform' : rotate
		});
	}

	export function scale($target:JQuery, scale:number = 0)
	{
		var scaleValue:string = "scale("+scale+")";

		$target.css({
			'transform' : scaleValue,
			'-webkit-transform' : scaleValue
		});
	}

    export function setDocumentSize(width:number, height:number)
    {
        $('body').css({width: width, height: height, overflow: 'hidden'});
    }

    export function releaseDocumentSize()
    {
        $('body').css({width: 'auto', height: 'auto', overflow: 'visible'});
    }

    export function deviceSize():any
    {
        return {width: Helpers.deviceWidth(), height: Helpers.deviceHeight()};
    }

    export function contentHeight():number
    {
        return $('.content').height();
    }

    export function contentWidth():number
    {
        return $('.content').width();
    }

    export function deviceWidth():number
    {
        return $(window).width();
    }

    export function deviceHeight():number
    {
        return $(window).height();
    }

    export function wait(time:number, callback:Function):void
    {
        window.setTimeout(() => callback(), time);
    }

	export function focus($input:JQuery):void
	{
		$input.trigger('focus');
	}

	export function blurContent( $content:JQuery )
	{
		$content.addClass('blur');
	}

	export function unblurContent( $content:JQuery )
	{
		$content.removeClass('blur');
	}

    export function call(method:string, data:any, callback:Function):void
    {
        data['method'] = method;

        $.ajax({
            method: 'POST',
            data : data,
            url : <string>settings.ajax,
            dataType : 'json',
            success : <any>callback,
            error : () => {
                callback(null);
            }
        })
    }

	export function detectmob() {
		if( navigator.userAgent.match(/Android/i)
			|| navigator.userAgent.match(/webOS/i)
			|| navigator.userAgent.match(/iPhone/i)
			|| navigator.userAgent.match(/iPad/i)
			|| navigator.userAgent.match(/iPod/i)
			|| navigator.userAgent.match(/BlackBerry/i)
			|| navigator.userAgent.match(/Windows Phone/i)
			){
			return true;
		}
		else {
			return false;
		}
	}
}