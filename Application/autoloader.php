<?php namespace CustomDirectory;

class Autoloader {

	static $loader;

	public static function init()
	{
		if (self::$loader == NULL)
			self::$loader = new self();

		return self::$loader;
	}

	function __construct()
	{
		spl_autoload_register(array($this,'load'));
	}

	public function load( $class )
	{
		$parts = explode("\\", $class);

		$path = dirname(__FILE__); //get_include_path().PATH_SEPARATOR.'/lib/';

		foreach($parts as $key => $part)
		{
			if($key > 0)
			{
				$path .= "/$part";
			}
		}

		$path .= '.php';

		if(file_exists($path))
		{
			include "$path";
		}
		else
		{
			throw new \Exception("Could not find class $class");
		}
	}
}

Autoloader::init();