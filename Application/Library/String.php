<?php namespace CustomDirectory\Library;

class String {

	static function test()
	{
		return 'test';
	}

	static function beginsWith($start, $subject)
	{
		return strpos($subject, $start) === 0;
	}

}