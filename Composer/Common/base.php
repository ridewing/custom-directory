<?php namespace CustomDirectory\Composer\Common;

use CustomDirectory\Library\View;

class Base {

	public function index( $view )
	{
		global $application;

		// Base
		$header = new View('Common.header');
		$list 	= new View('Item.contentList');
		$footer = new View('Common.footer');

		$favorites 	= new View('Overlay.favorites');
		$settings 	= new View('Overlay.settings');
		$info		= new View('Overlay.info');
		$popup 		= new View('Common.popup');

		$view->with('header', $header);
		$view->with('list', $list);
		$view->with('footer', $footer);
		$view->with('favorites', $favorites);
		$view->with('settings', $settings);
		$view->with('info', $info);
		$view->with('popup', $popup);

		return $view;
	}
}