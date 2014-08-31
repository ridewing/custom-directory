
<div class="overlay overlay-info">
	<div class="overlay-header">
		Info
		<a href="#" class="close"></a>
	</div>

	<div class="overlay-content info-list">
		<?php foreach($items as $item): ?>

			<div class="info-item">
				<div class="name">
					<?php echo $item->name; ?>
				</div>
				<div class="value">
					<?php echo $item->value; ?>
				</div>
			</div>

		<?php endforeach; ?>
	</div>

</div>