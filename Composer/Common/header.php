<?php namespace CustomDirectory\Composer\Common;

use CustomDirectory\Library\FileSystem;

class Header {

	public function index( $view, $data = array() )
	{
		global $application;

		$view->with('title', $application->getTitle());
		$view->with('includes', $application->getIncludesUrl());
		$view->with('currentDirectory', FileSystem::getShortPath());
		$view->with('home', FileSystem::getRootUrl());
		$view->with('ajax', $application->getAjaxUrl());
		$view->with('path', FileSystem::getCurrentDirectoryPath());
		$view->with('owner', $application->isOwner());
		$view->with('filetypes', $this->getActiveFiletypesClasses());

		return $view;
	}

	protected function getActiveFiletypesClasses()
	{
		global $application;

		$activeTypes = $application->storage->getActiveFiletypeSettings();
		$classes = '';

		foreach($activeTypes as $type)
		{
			$classes .= " {$type['id']}";
		}

		return $classes;
	}
}