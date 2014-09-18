<?php echo $header; ?>

<?php echo $list; ?>

<div class="tooltip">
	<ul>
		<li class="finder">Show in Finder</li>
		<li class="favorite">Add to Favorites</li>
		<li class="hide">Hide this type</li>
	</ul>
</div>

</div>

<div class="overlays">
	<?php echo $favorites; ?>
	<?php echo $settings; ?>
	<?php echo $info; ?>
	<div class="overlay-closer"></div>
</div>
<div class="search-overlay-wrapper">
	<div class="search-overlay">
		<p>Looking for</p>
		<span></span>
	</div>
	<div class="search-hint">Press ESC to cancel</div>
</div>

<?php echo $popup ?>

<?php echo $footer; ?>