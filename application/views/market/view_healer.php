<header class="area-header"
	title="<?=$game['town_human'] . ' ' . $game['place']?>">
	<h2 class="area-header__heading"><?=$game['town_human'] . ' ' . $game['place']?>
	</h2>
	<img src="<?=base_url('assets/images/places/healer_' . $game['nation'] . '.png')?>"
		class="area-header__img">
</header>

<div class="container">
	<div class="button-area">
		<a class="ajaxHTML button big-icon" title="Browse goods" id="action_goods"
			href="<?=base_url('market')?>">
			<svg width="32" height="32" alt="Goods">
				<use xlink:href="#icon-barrels"></use>
			</svg>
			Browse
		</a>
		<a class="ajaxHTML button big-icon" title="Heal your crew"
			href="<?=base_url('market/healer')?>">
			<svg width="32" height="32" alt="Healer">
				<use xlink:href="#icon-healer"></use>
			</svg>
			Healer
		</a>
	</div>

	<?php if ($game['doubloons'] < $cost): ?>
	<p>
		<?=$injured_crew?> of your crew is injured, but you do not
		have
		<?=$cost?> dbl.
	</p>
	<?php elseif ($injured_crew < 1): ?>
	<p>
		Your crew seems kind of healthy too me... you don't need me!
	</p>
	<?php else: ?>
	<div id="offer">
		<p>
			I can heal your <?=$injured_crew?> injured crew members.
			It
			will cost you <?=$cost?> dbl.
		</p>

		<div class="button-area">
			<a class="ajaxJSON button big primary" href="<?=base_url('market/healer_post/yes')?>" title="Please heal us!">Yes</a>
			<a class="ajaxJSON button big" href="<?=base_url('market/healer_post/no')?>" title="No hokus pokus today please">No</a>
		</div>
	</div>
	<?php endif; ?>
</div>