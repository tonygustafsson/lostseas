﻿<div class="container">
	<h3>Character Settings</h3>

	<div class="button-area">
		<a class="ajaxHTML button big-icon" title="Change your account settings, such as name, birthday, presentation"
			href="<?=base_url('settings/account')?>">
			<svg width="32" height="32" class="Account">
				<use xlink:href="#icon-player"></use>
			</svg>
			Account
		</a>
		<a class="ajaxHTML button big-icon" title="Change your character name, age and such"
			href="<?=base_url('settings/character')?>">
			<svg width="32" height="32" class="Character">
				<use xlink:href="#icon-crew-man"></use>
			</svg>
			Character
		</a>
	</div>

	<form id="settings" class="ajaxJSON" method="post"
		action="<?=base_url('settings/character_post')?>">
		<fieldset>
			<legend>Your character</legend>

			<div class="row">
				<div class="col-2 text-center">
					<input type="hidden" id="character_avatar" name="character_avatar"
						value="<?=$game['character_avatar']?>">

					<img id="current_avatar_img" style="border: 1px black solid;"
						src="<?=$game['character_avatar_path']?>"
						alt="Avatar"><br>

					<button class="small mt-1 mb-1 mt-m-2 mb-m-2" type="button"
						id="js-start-avatar-selector-trigger">Change</button><br />

					<a class="ajaxJSON"
						href="<?=base_url('settings/generate_character')?>"
						title="Generate random character">
						<svg width="32" height="32" alt="Randomize">
							<use xlink:href="#icon-dices"></use>
						</svg>
					</a>
				</div>

				<div class="col-10">
					<label for="character_name">Name</label>
					<input id="character_name" type="text" name="character_name"
						value="<?=$game['character_name']?>" />

					<div>
						<input class="js-gender-selector" id="male" type="radio" name="character_gender" value="M"
							<?=$game['character_gender'] === 'M' ? 'checked' : ''?>
						/><label for="male">Male</label>
						<input class="js-gender-selector" id="female" type="radio" name="character_gender" value="F"
							<?=$game['character_gender'] === 'F' ? 'checked' : ''?>
						/><label for="female">Female</label>
					</div>

					<label for="character_age">Age</label>
					<input id="character_age" type="number" name="character_age" placeholder="Character age"
						value="<?=$game['character_age']?>"><br>

					<label for="character_description">Description</label>
					<textarea name="character_description"
						id="character_description"><?=$game['character_description']?></textarea>

					<button type="submit" class="primary mt-2">Save</button>
				</div>
			</div>
		</fieldset>
	</form>

	<hr />

	<form class="ajaxJSON"
		action="<?=base_url('settings/reset')?>"
		method="POST">
		<fieldset>
			<legend>Reset game</legend>

			<p>If you reset the game all your progress will be lost. You will keep all your user settings and login,
				but everything will be as if you just registered. That means 1 ship, four new crew members and 300 dbl.
			</p>

			<p>
				Please write your password and click the Reset button to let us know you mean business.
			</p>

			<label for="password">Password</label>
			<input type="password" name="password" id="password" required />

			<button type="submit" class="primary mt-2">Reset</button>
		</fieldset>
	</form>
</div>

<div id="js-start-avatar-selector-dialog" class="dialog" tabindex="-1" role="dialog"
	data-base-url="<?=base_url('settings/avatar_selector/')?>"
	data-img-base-url="<?=base_url('assets/images/avatars')?>">
	<h3 class="dialog-title">Choose an avatar</h3>
	<div class="avatar-selector-wrapper"></div>
</div>