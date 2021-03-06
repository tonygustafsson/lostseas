<header class="area-header"
	title="<?=$game['town_human'] . ' ' . $game['place']?>">
	<h2 class="area-header__heading"><?=$game['town_human'] . ' ' . $game['place']?>
	</h2>
	<img src="<?=base_url('assets/images/places/shipyard_' . $game['nation'] . '.png')?>"
		class="area-header__img">
</header>

<div class="container">
	<div class="button-area">
		<a class="ajaxHTML button big-icon" title="Buy ships and equipments"
			href="<?=base_url('shipyard')?>">
			<svg width="32" height="32" alt="Buy">
				<use xlink:href="#icon-ship"></use>
			</svg>
			Buy
		</a>
		<a class="ajaxHTML button big-icon" title="Sell ships and equipments"
			href="<?=base_url('shipyard/sell')?>">
			<svg width="32" height="32" alt="Buy">
				<use xlink:href="#icon-ship"></use>
			</svg>
			Sell
		</a>
		<a class="ajaxHTML button big-icon" title="Repair damaged ships"
			href="<?=base_url('shipyard/repair')?>">
			<svg width="32" height="32" alt="Buy">
				<use xlink:href="#icon-wrench"></use>
			</svg>
			Repair
		</a>
	</div>

	<p><?=$game['greeting']?>
	</p>

	<h3>Fixings</h3>

	<form method="post" class="ajaxJSON" id="buy"
		action="<?=base_url()?>shipyard/fixings_post">
		<input type="hidden" name="current_money" id="current_money"
			value="<?=$game['doubloons']?>">

		<?php foreach ($prices as $product => $price): ?>
		<input type="hidden" id="<?=$product?>_buy"
			value="<?=$price['buy']?>">
		<input type="hidden" id="<?=$product?>_sell"
			value="<?=$price['sell']?>">
		<?php endforeach; ?>

		<fieldset>
			<legend>
				<svg width="32" height="32" alt="Cannons">
					<use xlink:href="#icon-cannons"></use>
				</svg>
				Cannons (<?=$prices['cannons']['buy']?>/<?=floor($prices['cannons']['sell'] * 0.7)?>
				dbl)
			</legend>
			<p style="margin: 0 auto; width: 90%">It's your cannons that make you win at sea battles! You need 2 crew
				members per cannon though, or else it will not be used.</p>

			<div class="slider-container">
				<div id="cannons-slider" class="slider"></div>

				<table>
					<tr>
						<td>Cannons</td>
						<td><span id="cannons_new_quantity_presenter"><?=$game['cannons']?></span>
							pcs</td>
					</tr>
					<tr>
						<td>Doubloons</td>
						<td><span class="money_left"
								style="color: <?=($game['doubloons'] < 0) ? '#d52525' : '#000'; ?>;"><?=$game['doubloons']?></span>
							dbl</td>
					</tr>
				</table>
			</div>

			<input type="hidden" name="cannons_quantity" id="cannons_quantity"
				value="<?=$game['cannons']?>">
			<input type="hidden" name="cannons_new_quantity" id="cannons_new_quantity"
				value="<?=$game['cannons']?>">
		</fieldset>

		<fieldset>
			<legend>
				<svg width="32" height="32" alt="Buy">
					<use xlink:href="#icon-raft"></use>
				</svg>
				Rafts (<?=$prices['rafts']['buy']?>/<?=floor($prices['rafts']['sell'] * 0.7)?>
				dbl)
			</legend>
			<p style="margin: 0 auto; width: 90%">If all your ships are destroyed at sea, you can save 10 crew members
				per
				raft.</p>

			<div class="slider-container">
				<div id="rafts-slider" class="slider"></div>

				<table>
					<tr>
						<td>Rafts</td>
						<td><span id="rafts_new_quantity_presenter"><?=$game['rafts']?></span>
							pcs</td>
					</tr>
					<tr>
						<td>Doubloons</td>
						<td><span class="money_left"
								style="color: <?=($game['doubloons'] < 0) ? '#d52525' : '#000'; ?>;"><?=$game['doubloons']?></span>
							dbl</td>
					</tr>
				</table>
			</div>

			<input type="hidden" name="rafts_quantity" id="rafts_quantity"
				value="<?=$game['rafts']?>">
			<input type="hidden" name="rafts_new_quantity" id="rafts_new_quantity"
				value="<?=$game['rafts']?>">
		</fieldset>

		<p style="text-align: right;">
			<button type="button" class="js-shipyard-reset mt-1">Reset</button>
			<button type="submit" class="primary mt-1">Transfer</button>
		</p>
	</form>

	<h3>Ships</h3>

	<p>Buy ships by clicking the images, see their specifications below...</p>

	<div class="button-area">
		<a class="ajaxJSON button big-image"
			href="<?=base_url('shipyard/buy_ship/brig')?>"
			data-prompt-heading="Buy this brig?"
			data-prompt-text="<?=$ship_specs['brig']['description']?> It will cost you <?=$prices['brig']['buy']?> dbl.">
			<img src="<?=base_url('assets/images/ships/brig.jpg')?>"
				title="A standard ship, affordable.">Brig<br>
			<?=$prices['brig']['buy']?>
			dbl
		</a>

		<a class="ajaxJSON button big-image"
			href="<?=base_url('shipyard/buy_ship/merchantman')?>"
			data-prompt-heading="Buy this merchantman?"
			data-prompt-text="<?=$ship_specs['merchantman']['description']?> It will cost you <?=$prices['merchantman']['buy']?> dbl.">
			<img src="<?=base_url('assets/images/ships/merchantman.jpg')?>"
				title="A ship that is great for loading a lot of cartons.">Merchantman<br>
			<?=$prices['merchantman']['buy']?>
			dbl
		</a>
		<a class="ajaxJSON button big-image"
			href="<?=base_url('shipyard/buy_ship/galleon')?>"
			data-prompt-heading="Buy this galleon?"
			data-prompt-text="<?=$ship_specs['galleon']['description']?> It will cost you <?=$prices['galleon']['buy']?> dbl.">
			<img src="<?=base_url('assets/images/ships/galleon.jpg')?>"
				title="A war ship.">Galleon<br>
			<?=$prices['galleon']['buy']?>
			dbl
		</a>
		<a class="ajaxJSON button big-image"
			href="<?=base_url('shipyard/buy_ship/frigate')?>"
			data-prompt-heading="Buy this brig?"
			data-prompt-text="<?=$ship_specs['frigate']['description']?> It will cost you <?=$prices['frigate']['buy']?> dbl.">
			<img src="<?=base_url('assets/images/ships/frigate.jpg')?>"
				title="The biggest and strongest war ship.">Frigate<br>
			<?=$prices['frigate']['buy']?>
			dbl
		</a>
	</div>

	<table>
		<tr>
			<th>Type</th>
			<th>Min crew</th>
			<th>Max crew</th>
			<th>Max cannons</th>
			<th>Max load</th>
		</tr>
		<tr>
			<td>Brig</td>
			<td><?=$ship_specs['brig']['min_crew']?>
			</td>
			<td><?=$ship_specs['brig']['max_crew']?>
			</td>
			<td><?=$ship_specs['brig']['max_cannons']?>
			</td>
			<td><?=$ship_specs['brig']['load_capacity']?>
				cartons</td>
		</tr>
		<tr>
			<td>Merchantman</td>
			<td><?=$ship_specs['merchantman']['min_crew']?>
			</td>
			<td><?=$ship_specs['merchantman']['max_crew']?>
			</td>
			<td><?=$ship_specs['merchantman']['max_cannons']?>
			</td>
			<td><?=$ship_specs['merchantman']['load_capacity']?>
				cartons</td>
		</tr>
		<tr>
			<td>Galleon</td>
			<td><?=$ship_specs['galleon']['min_crew']?>
			</td>
			<td><?=$ship_specs['galleon']['max_crew']?>
			</td>
			<td><?=$ship_specs['galleon']['max_cannons']?>
			</td>
			<td><?=$ship_specs['galleon']['load_capacity']?>
				cartons</td>
		</tr>
		<tr>
			<td>Frigate</td>
			<td><?=$ship_specs['frigate']['min_crew']?>
			</td>
			<td><?=$ship_specs['frigate']['max_crew']?>
			</td>
			<td><?=$ship_specs['frigate']['max_cannons']?>
			</td>
			<td><?=$ship_specs['frigate']['load_capacity']?>
				cartons</td>
		</tr>
	</table>
</div>