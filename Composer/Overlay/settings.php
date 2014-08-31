<?php namespace CustomDirectory\Composer\Overlay;

use CustomDirectory\Library\FileSystem;
use CustomDirectory\Library\View;

class Settings {



	public function index($view)
	{
		global $application;

		$settings = $this->getSettings();

		$view->with('owner', $application->isOwner());
		$view->with('items', $settings);

		return $view;
	}

	protected function getSettings()
	{
		global $application;

		$settings = $application->getSettings();

		foreach($settings as &$setting)
		{
			$setting['count'] = $this->count($setting['id']);

			$setting = new View('Overlay.settingsItemDefault', $setting);
		}

		return $settings;
	}

	protected function count($id)
	{
		$id = str_replace('filetype-', '', $id);

		return FileSystem::countType($id);
	}
}