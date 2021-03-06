<div class="container">
	<h3>Players</h3>

	<p>Here you can check out other players and contact them. They are sorted after activity.</p>

	<div class="table-responsive">
		<table style="padding-bottom: 2em;">
			<tr>
				<th></th>
				<th>Name</th>
				<th></th>
				<th>Character</th>
				<th>Level</th>
				<th>Week</th>
				<th>Active</th>
			</tr>

			<?php foreach ($players as $this_player): ?>
			<tr
				id="player_<?=$this_player['id']?>">
				<td width="40">
					<?php if (file_exists(APPPATH . '../assets/images/profile_pictures/' . $this_player['id'] . '_thumb.jpg')): ?>
					<img width="40" height="40"
						src="<?=base_url('assets/images/profile_pictures/' . $this_player['id'] . '_thumb.jpg')?>"
						alt="<?=$this_player['name']?>">
					<?php else: ?>
					<img width="40" height="40"
						src="<?=base_url('assets/images/profile_pictures/nopic_thumb.jpg')?>"
						alt="<?=$this_player['name']?>">
					<?php endif; ?>
				</td>

				<td>
					<a class="ajaxJSON"
						href="<?=base_url('inventory/user_remove/' . $user['id'] . '/' . $this_player['id'])?>"
						title="Erase this user" data-prompt-heading="Delete this user?"
						data-prompt-text="This change will be permanent.">
						<svg width="16" height="16" alt="Remove">
							<use xlink:href="#icon-trashcan"></use>
						</svg>
					</a>

					<a class="ajaxHTML"
						href="<?=base_url('inventory/player/' . $this_player['id'])?>"><?=$this_player['name']?></a>
				</td>
				<td width="40"><img width="40" height="40"
						alt="Avatar of <?=$this_player['character_name']?>"
						src="<?=base_url('assets/images/avatars/' . (($this_player['character_gender'] == 'M') ? 'male' : 'female') . '/avatar_' . $this_player['character_avatar'] . '.png')?>">
				</td>
				<td>
					<?=$this_player['character_name']?>
				</td>
				<td>
					<?=$this_player['level']?>
				</td>
				<td>
					<?=$this_player['week']?>
				</td>
				<td>
					<?php
                $activity_color = $this_player['last_activity_unix'] > (time() - 500) ? '#3bb120"' : '#000';
            ?>

					<span style="color: <?=$activity_color?>">
						<?=substr($this_player['last_activity'], 0, -3)?>
					</span>
				</td>
			</tr>
			<?php endforeach; ?>
		</table>
	</div>

	<?php if ($user['admin'] == 1 && count($temp_players) > 0): ?>
	<hr />

	<h3>Temporary players</h3>

	<p class="text-right"><a class="ajaxJSON"
			href="<?=base_url('godmode/erase_temp_users')?>"
			data-prompt-heading="Delete temporary users?" data-prompt-text="This change will be permanent.">Delete
			tempusers older than 24 hours</a></p>

	<div class="table-responsive">
		<table>
			<tr>
				<th>Character</th>
				<th>Level</th>
				<th>Week</th>
				<th>Created</th>
				<th>Active</th>
			</tr>

			<?php foreach ($temp_players as $this_player): ?>
			<tr
				id="player-<?=$this_player['id']?>">
				<td><a class="ajaxJSON"
						href="<?=base_url('inventory/user_remove/' . $user['id'] . '/' . $this_player['id'])?>"
						title="Erase this user" data-prompt-heading="Delete this user?"
						data-prompt-text="This change will be permanent.">
						<svg width="16" height="16" alt="Remove">
							<use xlink:href="#icon-trashcan"></use>
						</svg>
					</a>
					<a class="ajaxHTML"
						href="<?=base_url('inventory/player/' . $this_player['id'])?>"><?=$this_player['character_name']?></a>
				</td>
				<td><?=$this_player['level']?>
				</td>
				<td><?=$this_player['week']?>
				</td>
				<td><?=substr($this_player['created'], 0, -3)?>
				</td>
				<td><?=substr($this_player['last_activity'], 0, -3)?>
				</td>
			</tr>
			<?php endforeach; ?>
		</table>
	</div>
	<?php endif; ?>
</div>