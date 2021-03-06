<div class="container">
	<h3>God mode: User</h3>

	<div class="button-area">
		<a class="ajaxHTML button big-icon" title="Change user parameters"
			href="<?=base_url('godmode/user/' . $this->uri->segment(3))?>">
			<svg width="32" height="32" alt="User">
				<use xlink:href="#icon-player"></use>
			</svg>
			User
		</a>
		<a class="ajaxHTML button big-icon" title="Change game parameters"
			href="<?=base_url('godmode/index/' . $this->uri->segment(3))?>">
			<svg width="32" height="32" alt="User">
				<use xlink:href="#icon-swords"></use>
			</svg>
			Game
		</a>
		<a class="ajaxHTML button big-icon" title="Change ship parameters"
			href="<?=base_url('godmode/ship/' . $this->uri->segment(3))?>">
			<svg width="32" height="32" alt="Ships">
				<use xlink:href="#icon-ship"></use>
			</svg>
			Ships
		</a>
		<a class="ajaxHTML button big-icon" title="Change crew parameters"
			href="<?=base_url('godmode/crew/' . $this->uri->segment(3))?>">
			<svg width="32" height="32" alt="Crew">
				<use xlink:href="#icon-crew-man"></use>
			</svg>
			Crew
		</a>
		<a class="ajaxHTML button big-icon" title="View design system"
			href="<?=base_url('godmode/design/' . $this->uri->segment(3))?>">
			<svg width="32" height="32" alt="Crew">
				<use xlink:href="#icon-design"></use>
			</svg>
			Design
		</a>
	</div>

	<div class="text-center mt-4 mb-4">
		<form method="post" id="godmode_change_user" action="">
			<select name="godmode_change_user">
				<?php foreach ($players as $this_player): ?>
				<?php if (empty($this_player['name'])): ?>
				<?php if ($player['user']['id'] === $this_player['id']): ?>
				<option
					value="<?=$this_player['id']?>"
					selected>TempUser (<?=$this_player['id']?>)</option>
				<?php else: ?>
				<option
					value="<?=$this_player['id']?>">
					TempUser (<?=$this_player['id']?>)
				</option>
				<?php endif; ?>
				<?php else: ?>
				<?php if ($player['user']['id'] === $this_player['id']): ?>
				<option
					value="<?=$this_player['id']?>"
					selected><?=$this_player['name']?>
					(<?=$this_player['id']?>)
				</option>
				<?php else: ?>
				<option
					value="<?=$this_player['id']?>">
					<?=$this_player['name']?>
					(<?=$this_player['id']?>)
				</option>
				<?php endif; ?>
				<?php endif; ?>
				<?php endforeach; ?>
			</select>

			<a id="godmode_change_user_url" class="ajaxHTML"
				data-baseurl="<?=base_url('godmode/index')?>"
				href="<?=base_url('godmode/index/' . $user['id'])?>">Change</a>
		</form>
	</div>

	<form method="post" class="ajaxJSON"
		action="<?=base_url('godmode/user_update')?>">
		<input type="hidden" name="id"
			value="<?=$player['user']['id']?>">

		<h3>User</h3>

		<table class="godmode">
			<tr>
				<th>Setting</th>
				<th>Value</th>
			</tr>

			<tr>
				<td>Name</td>
				<td><input type="text" id="name" name="name"
						value="<?=$player['user']['name']?>">
				</td>
			</tr>
			<tr>
				<td>Gender</td>
				<td><input type="text" id="gender" name="gender"
						value="<?=$player['user']['gender']?>">
				</td>
			</tr>
			<tr>
				<td>Birthday</td>
				<td><input type="text" id="birthday" name="birthday"
						value="<?=$player['user']['birthday']?>">
				</td>
			</tr>
			<tr>
				<td>Email</td>
				<td><input type="text" id="email" name="email"
						value="<?=$player['user']['email']?>">
				</td>
			</tr>
		</table>

		<hr />

		<h3>Settings</h3>

		<table class="godmode">
			<tr>
				<th>Setting</th>
				<th>Value</th>
			</tr>

			<tr>
				<td>Verified</td>
				<td><input type="number" id="verified" name="verified"
						value="<?=$player['user']['verified']?>">
				</td>
			</tr>
			<tr>
				<td>Admin</td>
				<td><input type="number" id="admin" name="admin"
						value="<?=$player['user']['admin']?>">
				</td>
			</tr>
			<tr>
				<td>Music play</td>
				<td><input type="number" id="music_play" name="music_play"
						value="<?=$player['user']['music_play']?>">
				</td>
			</tr>
			<tr>
				<td>Music volume</td>
				<td><input type="number" id="music_volume" name="music_volume"
						value="<?=$player['user']['music_volume']?>">
				</td>
			</tr>
			<tr>
				<td>Sound effects</td>
				<td><input type="number" id="sound_effects_play" name="sound_effects_play"
						value="<?=$player['user']['sound_effects_play']?>">
				</td>
			</tr>
			<tr>
				<td>Show gender</td>
				<td><input type="number" id="show_gender" name="show_gender"
						value="<?=$player['user']['show_gender']?>">
				</td>
			</tr>
			<tr>
				<td>Show age</td>
				<td><input type="number" id="show_age" name="show_age"
						value="<?=$player['user']['show_age']?>">
				</td>
			</tr>
		</table>

		<hr />

		<h3>Presentation</h3>

		<table class="godmode">
			<tr>
				<td style="padding-top: 1em;"><textarea
						name="presentation"><?=$player['user']['presentation']?></textarea>
				</td>
			</tr>
		</table>

		<p class="text-right">
			<button type="submit">Save</button>
		</p>
	</form>
</div>