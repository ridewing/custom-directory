<div class="settings-item <?php echo $id ?>
 <?php echo !empty($value)?'active':'' ?>
 <?php echo !empty($dependency)?"sub-setting dependency-{$dependency}":'' ?>"
	 data-dependency="<?php echo $dependency ?>"
	 data-id="<?php echo $id ?>">
		<div class="checker"><div class="point"></div></div>
		<span><?php echo $name ?></span>

	<?php if($counter): ?>
		<div class="count"><?php echo $count; ?></div>
	<?php endif ?>
</div>