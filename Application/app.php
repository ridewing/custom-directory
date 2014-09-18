<?php namespace CustomDirectory;

use CustomDirectory\Library\FileSystem;
use CustomDirectory\Library\Storage;
use CustomDirectory\Library\View;

if(!defined('AJAX'))
	define('AJAX', false);

include "autoloader.php";

class App {

	public $version = '3.0.3';

	// Public
	public $path;
	public $env;
	public $storage;

	// Protected
	protected $nameFilters = array();
	protected $typeFilters = array(); // file, dir, ...

	// Defaults
	protected $_nameFilters = array('.','..','.idea');
	protected $_typeFilters = array();

	// Private
	private $files = array();

	function __construct()
	{
		if($this->isOwner())
		{
			$this->env = 'owner';
		}
		else
		{
			$this->env 	= isset($_SERVER['REMOTE_ADDR'])?$_SERVER['REMOTE_ADDR']:uniqid();
		}

		$this->path = dirname(dirname(__FILE__));
		$this->storage = new Storage("{$this->path}/Storage", $this->env);

		if(!AJAX)
		{
			$this->storage->addDefaultSetting('filetype-directory', 'Show folders', true);
			$this->storage->addDefaultSetting('filetype-files', 'Show files', true);
			$this->storage->addDefaultSetting('filetype-image', 'Images', true, 'filetype-files');
			$this->storage->addDefaultSetting('filetype-font', 'Fonts', true, 'filetype-files');
			$this->storage->addDefaultSetting('filetype-style', 'Stylesheets', true, 'filetype-files');
			$this->storage->addDefaultSetting('filetype-database', 'Database', true, 'filetype-files');
			$this->storage->addDefaultSetting('filetype-file', 'Other files', true, 'filetype-files');
			$this->storage->addDefaultSetting('filetype-command', 'Command files', true, 'filetype-files');
			$this->storage->addDefaultSetting('filetype-hidden', 'Hidden files', false, 'filetype-files');


			$this->storage->addDefaultSetting('theme-dark', 'Light/Dark', false, null, false);
			$this->storage->addDefaultSetting('settings-animations', 'Animations', true, null, false);

			// Load dir
			$this->loadCurrentDirectory();
		}
	}

	public function isOwner()
	{
		if( isset($_SERVER['SERVER_ADDR']) && isset($_SERVER['REMOTE_ADDR']) )
			return ($_SERVER['SERVER_ADDR'] == $_SERVER['REMOTE_ADDR']);
		else
			return false;
	}

	public function getSettings()
	{
		return $this->storage->settings();
	}

	public function getTitle()
	{
		return $_SERVER['SERVER_NAME'];
	}

	public function getBuildDate()
	{
		$time = filemtime(__FILE__);
		$tz = new \DateTimeZone('Europe/Stockholm');
		$date = new \DateTime('', $tz);
		$date->setTimestamp($time);
		return $date->format('Y-m-d H:i:s');
	}

	public function index()
	{
		$view = new View('Common.base');

		return $view;
	}

	public function ajax( $method, $args = array() )
	{
		$response = array('success' => false);

		switch($method)
		{
			case 'addFavorite':

				$this->storage->addFavorite($args['name'], $args['path']);
				$item = new View('Overlay.favoriteItem', FileSystem::present($args['name'], $args['path']));

				$response['output'] = $item->render();
				$response['success'] = true;

				break;

			case 'removeFavorite':

				$this->storage->removeFavorite( $args['path'] );
				$response['success'] = true;

				break;

			case 'updateFavorite':

				$this->storage->updateFavorite($args['name'], $args['path']);
				$response['success'] = true;

				break;

			case 'setting':

				if($args['active'] === "true")
				{
					foreach($args['ids'] as $id)
					{
						$this->storage->updateSetting($id, true);
					}

					$response['success'] = true;
					$response['activated'] = $args['ids'];
				}
				else
				{
					foreach($args['ids'] as $id)
					{
						$this->storage->updateSetting($id, false);
					}

					$response['success'] = true;
					$response['deactivated'] = $args['ids'];
				}

				break;
			case 'open':
				if($this->isOwner())
				{
					$this->openDirectory($args['path']);
					$response['success'] = true;
				}

				break;
			case 'exec':
				if($this->isOwner())
				{
					$this->exec($args['path']);
					$response['success'] = true;
				}
				break;

			case 'removeAll':
				if($this->isOwner())
				{
					$this->storage->removeAll();
					$response['success'] = true;
				}
				break;
		}

		return $response;
	}

	protected function openDirectory($path)
	{
		$path = str_replace(' ', '\ ', $path);

		// Reveal in finder
		exec("open -R {$path}");
	}

	protected function exec($path)
	{
		$path = str_replace(' ', '\ ', $path);

		exec("open {$path}");
	}

	protected function loadCurrentDirectory()
	{
		$currentDirectory = FileSystem::getCurrentDirectoryPath();

		$files = FileSystem::get( $currentDirectory, $this->getFilter('name'), $this->getFilter('type') );

		if(!empty($files))
		{
			$this->files = $files;
		}
	}

	public function getFiles()
	{
		return $this->files;
	}

	public function getFilter( $what )
	{
		switch($what)
		{
			case 'name':
				return array_replace($this->_nameFilters, $this->nameFilters);
			case 'type':
				return array_replace($this->_typeFilters, $this->typeFilters);
		}

	}

	public function getIncludesUrl()
	{
		return FileSystem::getFileUrl(dirname(dirname(__FILE__))) . DIRECTORY_SEPARATOR . 'Includes';
		//return "http://office.x-com.se/devx/customDirectory/Includes";
	}

	public function getAjaxUrl()
	{
		return FileSystem::getFileUrl(dirname(dirname(__FILE__))) . '/ajax.php';
		//return "http://office.x-com.se/devx/customDirectory/ajax.php";
	}
}

$application = new App;