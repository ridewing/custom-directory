<?php namespace CustomDirectory\Composer\Overlay;

use CustomDirectory\Library\Storage;
use CustomDirectory\Library\View;

class Favorites {

	public function index($view)
	{
		$view->with('items', $this->getFavorites());

		return $view;
	}

	public function getFavorites()
	{
		global $application;
		$files = $application->storage->favorites();

		foreach($files as &$file)
		{
			$file = new View('Overlay.favoriteItem', $file);
		}

		return $files;
	}
}