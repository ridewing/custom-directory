<div class="overlay overlay-settings">

	<div class="overlay-header">
		Settings
		<a href="#" class="close"></a>
	</div>
	<div class="overlay-content settings-list">
		<div class="filetype-settings">
			<?php foreach($items as $item): ?>

				<?php echo $item; ?>

			<?php endforeach; ?>
		</div>
		<?php if($owner): ?>
		<div class="clear-settings">
			<div class="settings-item ">
				<div class="left">
					<div>Clear all data</div>
					<div class="info">Warning! This will permanently delete all saved data.</div>
				</div>
				<div class="button warning right">Delete</div>
			</div>
		</div>
		<?php endif ?>
	</div>

</div>