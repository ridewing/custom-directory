<li data-id="<?php echo $id ?>" data-type="<?php echo $type ?>" class="<?php echo $id ?> <?php echo $type ?> <?php echo !empty($favorite)?'fav':'' ?>" data-path="<?php echo $path ?>" data-name="<?php echo $name ?>">
	<a href="<?php echo $url ?>">
		<?php echo $name ?>
		<span><br /><?php echo $shortPath ?></span>
	</a>

	<div class="favorite"></div>
</li>