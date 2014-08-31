<?php namespace CustomDirectory\Library;

class FileSystem {

	static $files = array();

	public static function get( $path, $nameFilters = array(), $typeFilters = array() )
	{
		$files = array();

		if ($handle = opendir($path))
		{
			while (false !== ($entry = readdir($handle)))
			{
				$fullPath = "{$path}{$entry}";

				if(static::filter($entry, $nameFilters) && static::filter(filetype($fullPath), $typeFilters))
				{
					$file = static::present($entry, $fullPath);
					static::$files[$entry] = $file;
					$files[$entry] = $file;
				}
			}

			closedir($handle);
		}

		return $files;
	}

	public static function filter($subject, $filters)
	{
		// TODO: Create a better filter method

		foreach($filters as $filter)
		{
			if($subject == $filter)
			{
				return false;
			}
		}

		return true;
	}

	public static function present($name, $path)
	{
		return array(
			'name'  => $name,
			'url'   => static::getFileUrl($path),
			'path'  => $path,
			'type'	=> static::getFileType( $path ),
			'id'	=> static::getPathId( $path )
		);
	}

	public static function getFileType($path)
	{
		$info = pathinfo($path);

		if($info && !empty($info['extension']))
		{
			// name starts with dot
			if(String::beginsWith('.', $info['basename']))
			{
				return 'hidden';
			}
			else
			{
				$ext = $info['extension'];

				if($ext == 'jpg' || $ext == 'jpeg' || $ext == 'png' || $ext == 'gif' || $ext == 'psd' || $ext == 'psb')
				{
					return 'image';
				}
				else if($ext == 'ttf' || $ext == 'svg' || $ext == 'woff' || $ext == 'eot' || $ext == '')
				{
					return 'font';
				}
				else if($ext == 'css' || $ext == 'less' || $ext == 'sass')
				{
					return 'style';
				}
				else if($ext == 'sql')
				{
					return 'database';
				}
				else if($ext == 'command')
				{
					return 'command';
				}
				else
				{
					return 'file';
				}
			}

		}
		else
			return 'directory';
	}

	public static function getPathId($path)
	{
		return md5($path);
	}

	public static function countType($type)
	{
		global $application;

		$count = 0;
		foreach(static::$files as $file)
		{
			if($file['type'] == $type)
			{
				$count++;
			}
			else if($type == 'files')
			{
				$setting = $application->storage->getSetting("filetype-{$file['type']}");
				if($setting && $setting['dependency'] == 'filetype-files')
				{
					$count++;
				}
			}
		}

		return $count;
	}

	public static function getFileUrl($path = '/')
	{
		$base = self::getRootPath();
		$url = self::getRootUrl();

		$url = str_replace($base, $url, $path);

		return $url;
	}

	public static function getFileShortPath( $path )
	{
		$base = self::getRootPath();

		return str_replace($base, '', $path);
	}

	public static function getShortPath()
	{
		return urldecode($_SERVER['REQUEST_URI']);
	}

	public static function getCurrentDirectoryPath()
	{
		return static::getRootPath() . urldecode($_SERVER['REQUEST_URI']);
	}

	public static function getCurrentDirectoryUrl()
	{
		return static::getRootUrl() . urldecode($_SERVER['REQUEST_URI']);
	}

	public static function getRootUrl()
	{
		return 'http://' .$_SERVER['HTTP_HOST'];
	}

	public static function getRootPath()
	{
		$root = $_SERVER['DOCUMENT_ROOT'];

		return $root;
	}


	public static function ensureStructure($path, $mode = 0775)
	{
		if(!is_dir($path))
			$path = dirname($path);

		if (!file_exists($path))
			return mkdir($path, $mode, true);
		else
			return true;
	}

	public static function removeDirectory($path)
	{
		return is_file($path) ?
			@unlink($path) :
			array_map(function($_path)
			{
				static::removeDirectory($_path);
			}, glob($path.'/*')) == @rmdir($path);
	}
}