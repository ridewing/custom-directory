<?php namespace CustomDirectory\Composer\Overlay;

class Info {

	public function index($view)
	{
		$view->with('items', $this->getInfo());

		return $view;
	}

	protected function getInfo()
	{
		global $application;

		$items = array();
		$unsorted = array(
			'Application version' => $application->version,
			'PHP version' => phpversion(),
			'Owner'	=> get_current_user(),
			'Build date' => $application->getBuildDate(),
			'Memory usage' => round(memory_get_usage(true)/1024,2) . ' KB',
			'Agent' => $_SERVER['HTTP_USER_AGENT']
		);

		foreach($unsorted as $key => $value)
		{
			$items[] = (object)array('name' => $key, 'value' => $value);
		}

		return $items;
	}
}