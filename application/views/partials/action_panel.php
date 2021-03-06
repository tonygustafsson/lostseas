<?php
    $in_town = array('dock', 'shop', 'tavern', 'shipyard', 'cityhall', 'market', 'bank');
    $nav_dock_display = in_array($game['place'], $in_town) ? 'flex' : 'none';
    $nav_harbor_display = $game['place'] == 'harbor' && !isset($game['event']['ship_meeting']) ? 'flex' : 'none';
    
    $nation = isset($this->data['game']['event']['ship_meeting']['nation']) ? $this->data['game']['event']['ship_meeting']['nation'] : null;

    $nav_ocean_display = $game['place'] == 'ocean' && (!isset($game['event']['ship_meeting']) && !isset($game['event']['ship_won_results']) && !isset($game['event']['ship_trade'])) ? 'flex' : 'none';
    $nav_unfriendly_ship_display = isset($game['event']['ship_meeting']) && ($nation == 'pirate' || $nation == $game['enemy']) ? 'flex' : 'none';
    $nav_friendly_ship_display = isset($game['event']['ship_meeting']) && !isset($game['event']['ship_trade']) && $nation == $game['nationality'] ? 'flex' : 'none';
    $nav_neutral_ship_display = isset($game['event']['ship_meeting']) && $nation != $game['nationality'] && $nation != 'pirate' && $nation != $game['enemy'] && $nation !== null ? 'flex' : 'none';
?>

<aside id="action_panel" class="action-panel">
	<a class="js-panel-close action-panel__close-btn">
		<svg width="20" height="20" alt="Close">
			<use xlink:href="#icon-close"></use>
		</svg>
	</a>

	<h3>Actions</h3>

	<nav id="nav_dock" style="display: <?=$nav_dock_display?>">
		<a class="action-panel__item ajaxHTML" title="Visit the shop"
			href="<?=base_url('shop')?>">
			<svg alt="Shop" width="28" height="28">
				<use xlink:href="#icon-shop"></use>
			</svg>
			Shop
		</a>

		<a class="action-panel__item ajaxHTML" title="Visit the tavern"
			href="<?=base_url('tavern')?>">
			<svg alt="Tavern" width="28" height="28">
				<use xlink:href="#icon-tavern"></use>
			</svg>
			Tavern
		</a>

		<a class="action-panel__item ajaxHTML" title="Visit the city hall"
			href="<?=base_url('cityhall')?>">
			<svg alt="CityHall" width="28" height="28">
				<use xlink:href="#icon-cityhall"></use>
			</svg>
			City Hall
		</a>

		<a class="action-panel__item ajaxHTML" title="Visit the bank"
			href="<?=base_url('bank')?>">
			<svg alt="Tavern" width="28" height="28">
				<use xlink:href="#icon-bank"></use>
			</svg>
			Bank
		</a>

		<a class="action-panel__item ajaxHTML" title="Visit the shipyard"
			href="<?=base_url('shipyard')?>">
			<svg alt="Shipyard" width="28" height="28">
				<use xlink:href="#icon-shipyard"></use>
			</svg>
			Shipyard
		</a>

		<a class="action-panel__item ajaxHTML" title="Visit the market"
			href="<?=base_url('market')?>">
			<svg alt="Market" width="28" height="28">
				<use xlink:href="#icon-market"></use>
			</svg>
			Market
		</a>

		<a class="action-panel__item ajaxHTML" title="Go out to sea!"
			href="<?=base_url('harbor')?>">
			<svg alt="Harbor" width="28" height="28">
				<use xlink:href="#icon-harbor"></use>
			</svg>
			Harbor
		</a>
	</nav>

	<nav id="nav_harbor" style="display: <?=$nav_harbor_display?>">
		<a class="action-panel__item ajaxHTML" title="Explore the ocean"
			href="<?=base_url('ocean')?>">
			<svg alt="Explore" width="28" height="28">
				<use xlink:href="#icon-compass"></use>
			</svg>
			Set sail
		</a>

		<a class="action-panel__item ajaxHTML" title="Land at this town"
			href="<?=base_url('dock')?>">
			<svg alt="Harbor" width="28" height="28">
				<use xlink:href="#icon-harbor"></use>
			</svg>
			Land
		</a>
	</nav>

	<nav id="nav_ocean" style="display: <?=$nav_ocean_display?>">
		<a class="action-panel__item ajaxHTML" title="Explore the ocean"
			href="<?=base_url('ocean')?>">
			<svg alt="Explore" width="28" height="28">
				<use xlink:href="#icon-compass"></use>
			</svg>
			Explore
		</a>
	</nav>

	<nav id="nav_ship_meeting_unfriendly"
		style="display: <?=$nav_unfriendly_ship_display?>">
		<a class="action-panel__item ajaxHTML" title="Attack this ship!"
			href="<?=base_url('ocean/attack')?>">
			<svg alt="Attack" width="28" height="28">
				<use xlink:href="#icon-cannons"></use>
			</svg>
			Attack
		</a>

		<a class="action-panel__item ajaxHTML" title="Try to flee!"
			href="<?=base_url('ocean/flee')?>">
			<svg alt="Flee" width="28" height="28">
				<use xlink:href="#icon-steer"></use>
			</svg>
			Flee
		</a>
	</nav>

	<nav id="nav_ship_meeting_friendly"
		style="display: <?=$nav_friendly_ship_display?>">
		<a class="action-panel__item ajaxHTML" title="Attack this ship!"
			href="<?=base_url('ocean/attack')?>">
			<svg alt="Attack" width="28" height="28">
				<use xlink:href="#icon-cannons"></use>
			</svg>
			Attack
		</a>

		<a class="action-panel__item ajaxHTML" title="Trade with these sea men"
			href="<?=base_url('ocean/trade')?>">
			<svg alt="Flee" width="28" height="28">
				<use xlink:href="#icon-barrels"></use>
			</svg>
			Trade
		</a>

		<a class="action-panel__item ajaxHTML" title="Ignore this ship"
			href="<?=base_url('ocean/ignore')?>">
			<svg alt="Flee" width="28" height="28">
				<use xlink:href="#icon-steer"></use>
			</svg>
			Ignore
		</a>
	</nav>

	<nav id="nav_ship_meeting_neutral"
		style="display: <?=$nav_neutral_ship_display?>">
		<a class="action-panel__item ajaxHTML" title="Attack this ship!"
			href="<?=base_url('ocean/attack')?>">
			<svg alt="Attack" width="28" height="28">
				<use xlink:href="#icon-cannons"></use>
			</svg>
			Attack
		</a>

		<a class="action-panel__item ajaxHTML" title="Ignore this ship"
			href="<?=base_url('ocean/ignore')?>">
			<svg alt="Flee" width="28" height="28">
				<use xlink:href="#icon-steer"></use>
			</svg>
			Ignore
		</a>
	</nav>
</aside>