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

		<div class="theme-settings">
			<div class="sub-header">
				Theme
			</div>
			<div class="themes">
				<div class="theme theme-default active" data-id="default">
					<div class="color">
						<div class="left"></div>
						<div class="right"></div>
					</div>
					<span>Default</span>
					<div class="option"></div>
				</div>
			</div>
			<div class="themes">
				<div class="theme theme-blue-white " data-id="theme-blue-white">
					<div class="color">
						<div class="left"></div>
						<div class="right"></div>
					</div>
					<span>Blue/white theme</span>
					<div class="option"></div>
				</div>
			</div>
			<div class="themes">
				<div class="theme theme-default " data-id="theme-green-white">
					<div class="color">
						<div class="left"></div>
						<div class="right"></div>
					</div>
					<span>Third theme</span>
					<div class="option"></div>
				</div>
			</div>
		</div>
	</div>

</div>