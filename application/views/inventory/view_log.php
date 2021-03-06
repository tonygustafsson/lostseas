<div class="container">
	<?php if ($user['id'] == $player['user']['id']): ?>
	<h3>Inventory: Log book</h3>
	<?php else: ?>
	<h3>
		<?=$player['game']['character_name']?>:
		Log book
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

	<p>
		Here you can see your ship's log and keep track of what has happend.
	</p>

	<?php if ($player['log']): ?>

	<hr />

	<div class="row row-justify-center">
		<input type="hidden" name="base_url" id="base_url"
			value="<?=base_url('inventory/log/' . $this->uri->segment(3))?>">

		<select name="log_filter" id="log_filter" class="w-m-100">
			<option value="all">All</option>

			<?php foreach ($viewdata['log_types'] as $type => $type_title): ?>
			<?php if (!empty($this->uri->segment(4)) && $type == $this->uri->segment(4)): ?>
			<option value="<?=$type?>" selected>
				<?=$type_title?>
			</option>
			<?php else: ?>
			<option value="<?=$type?>">
				<?=$type_title?>
			</option>
			<?php endif; ?>
			<?php endforeach; ?>
		</select>

		<a class="button ajaxHTML ml-1 ml-m-0 mt-m-2"
			href="<?=base_url('inventory/log/' . $this->uri->segment(3))?>"
			id="log_filter_trigger">Filter</a>
	</div>

	<p class="text-center pagination">
		<?=$pages?>
	</p>

	<?php $current_week = $player['log'][0]['week']; ?>

	<h4>
		Week <?=$player['log'][0]['week']?>
	</h4>

	<table class="inventory__log__table">
		<tr>
			<th>Time</th>
			<th>Entry</th>
		</tr>

		<?php for ($x = 0; $x < count($player['log']); $x++): ?>
		<?php $entry = $player['log'][$x]; ?>

		<?php if ($entry['week'] < $current_week): ?>
		<?php $current_week = $entry['week']; ?>
	</table>

	<h4>
		Week <?=$entry['week']?>
	</h4>

	<table class="inventory__log__table">
		<tr>
			<th>Time</th>
			<th>Entry</th>
		</tr>
		<?php endif; ?>

		<tr>
			<td>
				<?=$entry['time']?>
			</td>
			<td>
				<svg width="24" height="24" class="Guide">
					<?php if ($entry['type'] === 'funds'): ?>
					<use xlink:href="#icon-doubloons"></use>
					<?php elseif ($entry['type'] === 'transaction'): ?>
					<use xlink:href="#icon-doubloons"></use>
					<?php elseif ($entry['type'] === 'travel'): ?>
					<use xlink:href="#icon-steer"></use>
					<?php elseif ($entry['type'] === 'ship-interaction'): ?>
					<use xlink:href="#icon-ship"></use>
					<?php elseif ($entry['type'] === 'gambling'): ?>
					<use xlink:href="#icon-dices"></use>
					<?php elseif ($entry['type'] === 'social-status'): ?>
					<use xlink:href="#icon-hat"></use>
					<?php elseif ($entry['type'] === 'labor'): ?>
					<use xlink:href="#icon-pickaxe"></use>
					<?php elseif ($entry['type'] === 'crew-management'): ?>
					<use xlink:href="#icon-crew-man"></use>
					<?php elseif ($entry['type'] === 'general'): ?>
					<use xlink:href="#icon-logbook"></use>
					<?php else: ?>
					<use xlink:href="#icon-logbook"></use>
					<?php endif; ?>
				</svg>

				<?=ucfirst($entry['entry'])?>
			</td>
		</tr>

		<?php endfor; ?>
	</table>

	<?php else: ?>
	<p>No log entries yet...</p>
	<?php endif; ?>

	<hr />

	<p class="text-center pagination">
		<?=$pages?>
	</p>
</div>