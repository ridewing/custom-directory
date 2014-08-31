<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="sv">
<head>

	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">


	<title><?php echo $title ?></title>

	<link rel="stylesheet" type="text/css" href="<?php echo "{$includes}/style/style.min.css" ?>" />
	<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
	<script src="<?php echo "{$includes}/scripts/fastclick.js" ?>"></script>
	<script src="<?php echo "{$includes}/scripts/app.js" ?>"></script>

	<script>
		var settings = { ajax : "<?php echo $ajax ?>", path : "<?php echo $path ?>"};

		CustomDirectory.App.boot();
	</script>

</head>
<body class="<?php echo $filetypes ?>">
<div class="content">
	<div class="header">
		<a href="<?php echo $home ?>" class="icon icon-home left"><span>Home</span></a>
		<?php if($owner): ?>
			<a href="#finder" class="icon icon-open left"><span>Open Finder</span></a>
		<?php endif; ?>
		<a href="#favorites" class="icon icon-favorites right"><span>Favorites</span></a>
		<a href="#settings" class="icon icon-settings right"><span>Settings</span></a>
		<a href="#info" class="icon icon-info right"><span>Info</span></a>
	</div>