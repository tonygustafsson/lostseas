<div class="container">
	<?php if ($user['id'] == $player['user']['id']): ?>
	<h3>Inventory: You</h3>
	<?php else: ?>
	<h3>
		<?=$player['game']['character_name']?>:
		Player
	</h3>
	<?php endif; ?>

	<div class="button-area">
		<a class="ajaxHTML button big-icon"
			title="Learn more about <?=$player['game']['character_name']?>"
			href="<?=base_url('inventory/player/' . $this->uri->segment(3))?>">
			<svg width="16" height="16" alt="Player">
				<use xlink:href="#icon-player"></use>
			</svg>
			Player
		</a>
		<a class="ajaxHTML button big-icon"
			title="See <?=$player['game']['character_name']?>s ships"
			href="<?=base_url('inventory/ships/' . $this->uri->segment(3))?>">
			<svg width="16" height="16" alt="Ships">
				<use xlink:href="#icon-ship"></use>
			</svg>
			Ships
		</a>
		<a class="ajaxHTML button big-icon"
			title="See <?=$player['game']['character_name']?>s crew members"
			href="<?=base_url('inventory/crew/' . $this->uri->segment(3))?>">
			<svg width="16" height="16" alt="Crew members">
				<use xlink:href="#icon-crew-man"></use>
			</svg>
			Crew
		</a>
		<a class="ajaxHTML button big-icon"
			title="See graphs and data about <?=$player['game']['character_name']?>s history"
			href="<?=base_url('inventory/history/' . $this->uri->segment(3))?>">
			<svg width="16" height="16" alt="History">
				<use xlink:href="#icon-clock"></use>
			</svg>
			History
		</a>
		<a class="ajaxHTML button big-icon"
			title="Check out <?=$player['game']['character_name']?>s log book"
			href="<?=base_url('inventory/log/' . $this->uri->segment(3))?>">
			<svg width="16" height="16" alt="Log book">
				<use xlink:href="#icon-logbook"></use>
			</svg>
			Log book
		</a>
	</div>

	<h4>Player: <?=$player['user']['name']?>
	</h4>

	<div class="row">
		<div class="col-2">
			<img class="mt-2 inventory__player-image"
				src="<?=$viewdata['profile_picture']?>"
				alt="<?=$player['user']['name']?>">
		</div>

		<div class="col-10">
			<table class="table-fixed">
				<?php if ($player['user']['email'] != "" && $player['user']['id'] == $user['id']): ?>
				<tr>
					<td>Email</td>
					<td><a
							href="mailto:<?=$player['user']['email']?>"><?=$player['user']['email']?></a>
						(only shown for you)
					</td>
				</tr>
				<?php endif; ?>

				<?php if ($player['user']['gender'] != "" && $player['user']['show_gender'] == 1): ?>
				<tr>
					<td>Gender</td>
					<td><?=$viewdata['gender']?>
					</td>
				</tr>
				<?php endif; ?>

				<?php if (isset($player['user']['age']) && $player['user']['birthday'] != "" && $player['user']['show_age'] == 1): ?>
				<tr>
					<td>Age</td>
					<td><?=$player['user']['age']?>
						years old</td>
				</tr>
				<?php endif; ?>

				<tr>
					<td>Last activity</td>
					<td><?=$player['game']['last_activity']?>
					</td>
				</tr>

				<tr>
					<td>Account created</td>
					<td><?=$player['user']['created']?>
					</td>
				</tr>

			</table>
		</div>
	</div>

	<?php if (! empty($player['user']['presentation'])): ?>
	<h4 style="padding-top: 1em; clear: both;">Presentation</h4>
	<p><?=$player['user']['presentation']?>
	</p>
	<?php endif; ?>

	<hr />

	<h4 id="character">Character: <?=$player['game']['character_name']?>
	</h4>

	<div class="row">
		<div class="col-2">
			<img class="mt-2"
				src="<?=$player['game']['character_avatar_path']?>"
				alt="<?=$player['game']['character_name']?>">
		</div>

		<div class="col-10">
			<table class="table-fixed" id="inventory" style="padding-bottom: 2em;">

				<tr>
					<td>Title</td>
					<td><?=ucfirst($player['game']['title'])?>
						from <?=ucfirst($player['game']['nationality'])?>
					</td>
				</tr>

				<tr>
					<td>Level</td>
					<td><?=$player['game']['level']?>
					</td>
				</tr>

				<tr>
					<td>Enemy</td>
					<td><?=ucfirst($player['game']['enemy'])?>
					</td>
				</tr>

				<tr>
					<td>Gender</td>
					<td><?=ucfirst($player['game']['character_gender_long'])?>
					</td>
				</tr>

				<tr>
					<td>Age</td>
					<td><?=$player['game']['character_real_age']?>
						years old</td>
				</tr>

				<tr>
					<td>Location</td>
					<?php if ($player['game']['place'] == 'ocean'): ?>
					<td>Caribbean Sea</td>
					<?php else: ?>
					<td><?=ucwords($player['game']['town_human']) . ' ' . $player['game']['place']?>
						(<?=ucfirst($player['game']['nation'])?>)
					</td>
					<?php endif; ?>
				</tr>

				<tr>
					<td>Played for</td>
					<td><?=$player['game']['week']?>
						weeks</td>
				</tr>

			</table>
		</div>
	</div>

	<?php if (! empty($player['game']['character_description'])): ?>
	<p><strong>Description:</strong> <?=$player['game']['character_description']?>
	</p>
	<?php endif; ?>

	<hr />

	<h4 id="capital">Capital</h4>

	<p>You can transfer doubloons at the bank.</p>

	<table class="table-fixed" id="money" style="padding-bottom: 2em;">

		<tr>
			<td>
				<svg width="24" height="24" alt="Doubloons">
					<use xlink:href="#icon-doubloons"></use>
				</svg>
				Doubloons (Cash)
			</td>
			<td><?=$player['game']['doubloons']?>
				dbl</td>
		</tr>

		<tr>
			<td>
				<svg width="24" height="24" alt="Savings">
					<use xlink:href="#icon-savings"></use>
				</svg>
				Bank account
			</td>
			<td><?=$player['game']['bank_account']?>
				dbl</td>
		</tr>

		<tr>
			<td>
				<svg width="24" height="24" alt="Loan">
					<use xlink:href="#icon-loan"></use>
				</svg>
				Bank loan
			</td>
			<td><?=$player['game']['bank_loan']?>
				dbl</td>
		</tr>
	</table>

	<h4 id="stocks">Stocks</h4>

	<p>You can buy and sell stocks at the bank.</p>

	<?php if (count($game['stocks']) > 0): ?>
	<div class="table-responsive">
		<table>
			<tr>
				<th>Name</th>
				<th>Cost</th>
				<th>Worth</th>
				<th>Earnings</th>
			</tr>
			<?php foreach ($game['stocks'] as $stock_id => $stock): ?>
			<tr>
				<td>
					<?=$stock['name']?>
				</td>
				<td><?=$stock['cost']?> dbl
				</td>
				<td><?=$stock['worth']?> dbl
				</td>
				<td>
					<?php if ($stock['worth'] >= $stock['cost']): ?>
					<?=round((($stock['worth'] - $stock['cost']) / $stock['cost']) * 100)?>%
					<?php else: ?>
					<?=0 - round((($stock['cost'] - $stock['worth']) / $stock['cost']) * 100)?>%
					<?php endif; ?>
				</td>
			</tr>
			<?php endforeach; ?>
			<tr>
				<td><strong>Total worth</strong></td>
				<td></td>
				<td colspan="2"><strong><?=$game['stock_total_worth']?>
						dbl</strong>
				</td>
			</tr>
		</table>
	</div>
	<?php else: ?>
	<p><em>You do not currently own any stocks.</em></p>
	<?php endif; ?>

	<h4>Total net worth: <?=$viewdata['total_net_worth']?> dbl</h4>

	<p><em class="small">This is calculated by adding all your funds including stocks, subtracting loans and adding the
			worth of your
			goods and ships.</em></p>

	<hr />

	<h4 id="goods">Goods</h4>

	<p>You can buy and sell groceries at the shop.</p>

	<table class="table-fixed" id="stock" style="padding-bottom: 2em;">

		<tr>
			<td>
				<svg width="24" height="24" alt="Food">
					<use xlink:href="#icon-food"></use>
				</svg>
				Food
			</td>
			<td><?=$player['game']['food']?>
				cartons</td>
		</tr>

		<tr>
			<td>
				<svg width="24" height="24" alt="Water">
					<use xlink:href="#icon-water"></use>
				</svg>
				Water
			</td>
			<td><?=$player['game']['water']?>
				barrels</td>
		</tr>

		<tr>
			<td>
				<svg width="24" height="24" alt="Porcelain">
					<use xlink:href="#icon-porcelain"></use>
				</svg>
				Porcelain
			</td>
			<td><?=$player['game']['porcelain']?>
				cartons</td>
		</tr>

		<tr>
			<td>
				<svg width="24" height="24" alt="Spices">
					<use xlink:href="#icon-spices"></use>
				</svg>
				Spices
			</td>
			<td><?=$player['game']['spices']?>
				cartons</td>
		</tr>

		<tr>
			<td>
				<svg width="24" height="24" alt="Silk">
					<use xlink:href="#icon-silk"></use>
				</svg>
				Silk
			</td>
			<td><?=$player['game']['silk']?>
				cartons</td>
		</tr>

		<tr>
			<td>
				<svg width="24" height="24" alt="Tobacco">
					<use xlink:href="#icon-tobacco"></use>
				</svg>
				Tobacco
			</td>
			<td><?=$player['game']['tobacco']?>
				cartons</td>
		</tr>

		<tr>
			<td>
				<svg width="24" height="24" alt="Rum">
					<use xlink:href="#icon-rum"></use>
				</svg>
				Rum
			</td>
			<td><?=$player['game']['rum']?>
				barrels</td>
		</tr>

		<tr>
			<td>
				<svg width="24" height="24" alt="Medicine">
					<use xlink:href="#icon-medicine"></use>
				</svg>
				Medicine
			</td>
			<td><?=$player['game']['medicine']?>
				pcs</td>
		</tr>

	</table>

	<hr />

	<h4>Victories</h4>

	<table class="table-fixed" id="inventory" style="padding-bottom: 2em;">

		<tr>
			<td>
				<svg width="24" height="24" alt="England">
					<use xlink:href="#icon-flag-england"></use>
				</svg>
				England
			</td>
			<td><?=$player['game']['victories']['england']?>
				victories</td>
		</tr>

		<tr>
			<td>
				<svg width="24" height="24" alt="France">
					<use xlink:href="#icon-flag-france"></use>
				</svg>
				France
			</td>
			<td><?=$player['game']['victories']['france']?>
				victories</td>
		</tr>

		<tr>
			<td>
				<svg width="24" height="24" alt="Holland">
					<use xlink:href="#icon-flag-holland"></use>
				</svg>
				Holland
			</td>
			<td><?=$player['game']['victories']['holland']?>
				victories</td>
		</tr>

		<tr>
			<td>
				<svg width="24" height="24" alt="Spain">
					<use xlink:href="#icon-flag-spain"></use>
				</svg>
				Spain
			</td>
			<td><?=$player['game']['victories']['spain']?>
				victories</td>
		</tr>

		<tr>
			<td>
				<svg width="24" height="24" alt="Pirates">
					<use xlink:href="#icon-flag-pirates"></use>
				</svg>
				Pirates
			</td>
			<td><?=$player['game']['victories']['pirates']?>
				victories</td>
		</tr>

		<tr>
			<td></td>
			<td><?=$player['game']['victories_total']?>
				total</td>
		</tr>
	</table>
</div>