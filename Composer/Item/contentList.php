<?php namespace CustomDirectory\Composer\Item;

use CustomDirectory\Library\FileSystem;
use CustomDirectory\Library\View;

class ContentList {

	public function index( $view )
	{
		$view->with('items', $this->getItems());

		return $view;
	}

	public function getItems()
	{
		global $application;

		$files = $application->getFiles();

		foreach($files as &$file)
		{
			$file['favorite'] = $application->storage->hasFavorite( $file['path'] );
			$file['shortPath'] = FileSystem::getFileShortPath( $file['path'] );

			$file = new View('Item.item', $file);
		}

		return $files;
	}
}