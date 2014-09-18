<?php namespace CustomDirectory\Library;

class Storage {

	private $path;
	private $env;
	protected $favorites = array();
	protected $settings = array();

	public function __construct( $path, $env = 'default' )
	{
		$this->path = $path;
		$this->env = $env;
		$this->load();
	}

	protected function load()
	{
		$favoritesFilePath = "{$this->path}/{$this->env}/favorites.json";
		$settingsFilePath = "{$this->path}/{$this->env}/settings.json";

		if(file_exists($favoritesFilePath))
		{
			$content = file_get_contents($favoritesFilePath);
			$content = json_decode($content, true);

			if($content !== null)
				$this->favorites = $content;
		}

		if(file_exists($settingsFilePath))
		{
			$content = file_get_contents($settingsFilePath);
			$content = json_decode($content, true);

			if($content !== null)
				$this->settings = $content;
		}
	}

	public function settings()
	{
		return $this->settings;
	}

	public function addDefaultSetting($id, $name, $value = false, $dependency = null, $counter = true)
	{
		if(!$this->hasSetting($id))
		{
			$this->addSetting($id, $name, $value, $dependency, $counter);
		}
		else
		{
			$this->updateSetting($id, null, $name, $dependency, $counter);
		}
	}

	public function hasSetting($id)
	{
		return (array_key_exists($id, $this->settings));
	}

	public function addSetting($id, $name, $value, $dependency = null, $counter = true)
	{
		$this->settings[$id] = array('id' => $id, 'name' => $name, 'value' => $value, 'dependency' => $dependency, 'counter' => $counter);

		$this->save();
	}

	public function getSetting($id)
	{
		if($this->hasSetting($id))
		{
			return $this->settings[$id];
		}

		return null;
	}

	public function updateSetting($id, $value = null, $name = null, $dependency = null, $counter = true)
	{
		if(array_key_exists($id, $this->settings))
		{
			if($value !== null)
				$this->settings[$id]['value'] = $value;

			if($name !== null)
				$this->settings[$id]['name'] = $name;

			if($dependency !== null)
				$this->settings[$id]['dependency'] = $dependency;

			if($counter !== null)
				$this->settings[$id]['counter'] = $counter;

			$this->save();
		}
	}

	public function getActiveFiletypeSettings()
	{
		$active = array();

		foreach($this->settings as $setting)
		{
			if(String::beginsWith('filetype-', $setting['id']) && !empty($setting['value']) )
			{
				$active[$setting['id']] = $setting;
			}
		}

		return $active;
	}

	public function getActiveSettings()
	{
		$active = array();

		foreach($this->settings as $setting)
		{
			if(String::beginsWith('settings-', $setting['id']) && !empty($setting['value']) )
			{
				$active[$setting['id']] = $setting;
			}
		}

		return $active;
	}

	public function getActiveTheme()
	{
		foreach($this->settings as $setting)
		{
			if( $setting['id'] == 'theme-dark' && $setting['value'] )
			{
				return 'theme-dark';
			}
		}
	}

	public function favorites()
	{
		return $this->favorites;
	}

	public function addFavorite($name, $path)
	{
		$this->favorites[$path] = FileSystem::present($name, $path);

		$this->save();
	}

	public function removeFavorite($path)
	{
		if($this->hasFavorite($path))
		{
			unset($this->favorites[$path]);
			$this->save();
		}
	}

	public function updateFavorite($name, $path)
	{
		if($this->hasFavorite($path))
		{
			$favorite = $this->favorites[$path];

			$favorite['name'] = $name;
			$this->favorites[$path] = $favorite;

			$this->save();
		}
	}

	public function hasFavorite($path)
	{
		if(!is_array($this->favorites))
		{
			return false;
		}

		return (array_key_exists($path, $this->favorites));
	}

	protected function save()
	{
		$favoritesFilePath = "{$this->path}/{$this->env}/favorites.json";
		$settingsFilePath = "{$this->path}/{$this->env}/settings.json";

		FileSystem::ensureStructure($favoritesFilePath);
		FileSystem::ensureStructure($settingsFilePath);

		file_put_contents($favoritesFilePath, json_encode($this->favorites));
		file_put_contents($settingsFilePath, json_encode($this->settings));
	}

	public function removeAll()
	{
		FileSystem::removeDirectory($this->path);
	}
}