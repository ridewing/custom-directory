<?php namespace CustomDirectory\Library;

class View {

	protected $data = array();
	protected $path;
	protected $view;
	protected $composer;

	function __construct( $view, $data = array() )
	{
		$this->data = $data;
		$this->view = $view;
		$this->load( $view );
	}

	public function load( $view )
	{
		global $application;

		$parts = explode('.', $view);
		$viewPath = implode('/', $parts);
		$this->path = "{$application->path}/View/{$viewPath}.php";
		$composerPath = "{$application->path}/Composer/{$viewPath}.php";

		if(file_exists($composerPath))
		{
			include_once"$composerPath";
			$class = $parts[count($parts) - 1];
			$composerName = ucfirst($class);
			$composer = str_replace('.', '\\', $view);
			$composer = str_replace($class, $composerName, $composer);
			$composer = "\\CustomDirectory\\Composer\\{$composer}";
			$this->composer =  new $composer;
		}
	}

	public function with($key, $value)
	{
		$this->data[$key] = $value;
	}

	public function render($data = array())
	{
		if(!empty($this->composer))
		{
			$view = $this->composer->index($this, $data);

			if($view)
			{
				$data = $view->data;
				return $this->renderViewFile($this->path, $data);
			}
			else
			{
				$name = get_class($this->composer);
				return "Error in composer \"$name\" must return View. ";
				die();
			}
		}
		else
		{
			$data = array_replace($this->data, $data);

			return $this->renderViewFile($this->path, $data);
		}
	}

	private function renderViewFile($_path, $data)
	{
		try
		{
			if(file_exists($_path))
			{
				if(!empty($data))
					extract($data);

				ob_start();
				include "$_path";
				$content = ob_get_contents();
				ob_end_clean();

				return $content;
			}

			return '';

		}
		catch(\Exception $e)
		{
			return $e->getMessage();
		}
	}

	public function __toString()
	{
		return $this->render();
	}
}
