<?php

include('Main.php');

class Inventory extends Main
{
    public function __construct()
    {
        // Checks if it's the current users inventory or someones elses.
        // If it's someone elses we get their data.
        parent::__construct();

        $this->player_id = $this->uri->segment(3);
        $this->url_page = $this->uri->segment(4);

        $this->data['player'] = ($this->player_id != "" && $this->player_id != $this->data['user']['id']) ? $this->get_user_data($this->player_id) : $this->data;

        if (! $this->data['player'] || ($this->player_id == "" && $this->uri->segment(2) != 'players')) {
            exit;
        }
    }
    
    public function players()
    {
        if ($this->data['user']['verified'] != 1) {
            return;
        }
        
        $this->data['players'] = $this->User->get_players(array('verified_only' => true));

        if ($this->data['user']['admin'] == 1) {
            $this->data['temp_players'] = $this->User->get_players(array('temp_only' => true));
        }

        $this->load->view_ajax('inventory/view_players', $this->data);
    }

    private function get_total_net_worth($game, $ships)
    {
        require(__DIR__ . "/../constants/shop.php");

        // Old way of getting prices
        $prices = $this->config->item('prices');

        $worth = $game['doubloons'];
        $worth += $game['stock_total_worth'];
        $worth += $game['bank_account'];
        $worth -= $game['bank_loan'];

        $worth += $game['food'] * constant('FOOD_SELL_PRICE');
        $worth += $game['water'] * constant('WATER_SELL_PRICE');
        $worth += $game['porcelain'] * constant('PORCELAIN_SELL_PRICE');
        $worth += $game['spices'] * constant('SPICES_SELL_PRICE');
        $worth += $game['silk'] * constant('SILK_SELL_PRICE');
        $worth += $game['medicine'] * constant('MEDICINE_SELL_PRICE');
        $worth += $game['tobacco'] * constant('TOBACCO_SELL_PRICE');
        $worth += $game['rum'] * constant('RUM_SELL_PRICE');

        $worth += $game['cannons'] * $prices['cannons']['sell'];
        $worth += $game['rafts'] * $prices['rafts']['sell'];

        foreach ($ships as $ship) {
            $worth += $prices[$ship['type']]['sell'];
        }

        return $worth;
    }

    public function player()
    {
        // User info about a player
        if ($this->data['player']['user']['verified'] == 1) {
            $this->data['player']['user']['age'] = $this->calc_age($this->data['player']['user']['birthday']);
        }
        
        $this->data['player']['game']['character_description'] = nl2br($this->data['player']['game']['character_description']);
        $this->data['player']['game']['character_real_age'] = $this->data['player']['game']['character_age'] + floor($this->data['player']['game']['week'] / 52);
        
        $this->data['viewdata']['profile_picture'] = file_exists(APPPATH . '../assets/images/profile_pictures/' . $this->data['player']['user']['id'] . '.jpg')
            ? base_url('assets/images/profile_pictures/' . $this->data['player']['user']['id'] . '.jpg')
            : base_url('assets/images/profile_pictures/nopic.jpg');
        $this->data['viewdata']['gender'] = $this->data['player']['user']['gender'] == 'M' ? 'Male' : 'Female';

        $this->data['viewdata']['total_net_worth'] = $this->get_total_net_worth($this->data['player']['game'], $this->data['player']['ship']);

        $this->load->view_ajax('inventory/view_player', $this->data);
    }

    public function history()
    {
        $this->load->model('history');

        $this->data['history_weeks'] = array(10, 25, 50, 100, 500);
                    
        $history_input['user_id'] = $this->data['player']['user']['id'];
        $history_input['weeks'] = $this->uri->segment(4) != "" ? $this->uri->segment(4) : 50;

        $history_data = $this->history->get($history_input);
        $chart_data = $this->history->get_chart_data($history_data, 'doubloons');

        if (count($chart_data) > 0) {
            $this->data['chart_data']['labels'] = htmlspecialchars(json_encode($chart_data['labels']));

            $this->data['chart_data']['victories'] = count($chart_data['victories']) > 1 ? htmlspecialchars(json_encode($chart_data['victories'])) : false;
            $this->data['chart_data']['level'] = count($chart_data['level']) > 1 ? htmlspecialchars(json_encode($chart_data['level'])) : false;
            $this->data['chart_data']['stock_value'] = count($chart_data['stock_value']) > 1 ? htmlspecialchars(json_encode($chart_data['stock_value'])) : false;
            $this->data['chart_data']['ships'] = count($chart_data['ships']) > 1 ? htmlspecialchars(json_encode($chart_data['ships'])) : false;
            $this->data['chart_data']['doubloons'] = count($chart_data['doubloons']) > 1 ? htmlspecialchars(json_encode($chart_data['doubloons'])) : false;
            $this->data['chart_data']['crew_members'] = count($chart_data['crew_members']) > 1 ? htmlspecialchars(json_encode($chart_data['crew_members'])) : false;
            $this->data['chart_data']['crew_mood'] = count($chart_data['crew_mood']) > 1 ? htmlspecialchars(json_encode($chart_data['crew_mood'])) : false;
            $this->data['chart_data']['crew_health'] = count($chart_data['crew_health']) > 1 ? htmlspecialchars(json_encode($chart_data['crew_health'])) : false;
        }
        
        $this->load->view_ajax('inventory/view_history', $this->data);
    }

    public function crew()
    {
        $this->data['actions'] = array('medicine' => 'Give medicine (heal)', 'tobacco' => 'Give tobacco (+1 mood)', 'doubloons' => 'Give 100 dbl (+2 mood)', 'rum' => 'Give rum (+3 mood)', 'discard' => 'Discard crew members');
        $this->data['action'] = ($this->input->post('action') != "") ? $this->input->post('action') : false;
        $this->data['edited_crew'] = ($this->input->post('crew') != "") ? $this->input->post('crew') : false;
        
        $accepted_orders = array('name_asc', 'name_desc', 'health_asc', 'health_desc', 'nationality_asc', 'nationality_desc', 'created_asc', 'created_desc', 'doubloons_asc', 'doubloons_desc', 'mood_asc', 'mood_desc');

        if (in_array($this->uri->segment(4), $accepted_orders)) {
            list($order, $direction) = explode("_", $this->uri->segment(4));
            $this->data['player']['crew'] = $this->Crew->get(array('user_id' => $this->data['player']['user']['id'], 'order' => $order . ' ' . $direction));
        } else {
            $this->data['player']['crew'] = $this->Crew->get(array('user_id' => $this->data['player']['user']['id']));
        }
        
        $this->load->view_ajax('inventory/view_crew', $this->data);
    }
    
    public function crew_post()
    {
        if ($this->input->post('crew') != "" && $this->input->post('action') != "" && $this->data['user']['id'] === $this->data['player']['user']['id']) {
            // Edit your crew...
            $data['success'] = "";
            $data['changeElements'] = array();
            
            $edited_crew = $this->input->post('crew');
            $number_of_men = count($edited_crew);
            $action_array = $this->input->post('action');
            $action = $action_array[0];
            $affected_crew = array();
            
            $this->data['crew'] = $this->Crew->get(array('user_id' => $this->data['user']['id']));
            
            if (isset($edited_crew[0])) {
                if ($action == 'discard') {
                    foreach ($edited_crew as $man_id) {
                        $crew_input['id'] = $man_id;
                        $crew_result = $this->Crew->erase($crew_input);
                        $data['changeElements']['crew_' . $man_id]['remove'] = true;
                        $data['changeElements'] = array_merge($data['changeElements'], $crew_result['changeElements']);
                    }

                    if ($this->data['user']['sound_effects_play'] == 1) {
                        $data['playSound'] = 'death';
                    }
                    
                    $data['success'] .= 'You discarded ' . $number_of_men . ' of your crew.';
                    
                    $log_input['entry'] = 'discarded ' . $number_of_men . ' of the crew members.';
                    $log_input['type'] = 'crew-management';
                    $this->Log->create($log_input);
                } elseif ($action == 'medicine') {
                    $number_of_healed_men = 0;
                    $number_of_ignored_men = 0;
                    
                    if ($number_of_men <= $this->data['game']['medicine']) {
                        foreach ($edited_crew as $man_id) {
                            if ($this->data['crew'][$man_id]['health'] < 100) {
                                $crew_updates[$man_id]['health'] = 100;
                                $data['changeElements']['crew_health_' . $man_id]['text'] = 100;
                                $number_of_healed_men++;
                            } else {
                                $number_of_ignored_men++;
                            }
                        }

                        if (isset($crew_updates)) {
                            $crew_result = $this->Crew->update($crew_updates);
                        }

                        if ($number_of_healed_men > 0) {
                            $updates['medicine']['sub'] = true;
                            $updates['medicine']['value'] = $number_of_healed_men;
                            $game_result = $this->Game->update($updates);
                            
                            $data['changeElements'] = array_merge($data['changeElements'], $game_result['changeElements']);
                            
                            $data['changeElements'] = array_merge($data['changeElements'], $crew_result['changeElements']);
                            
                            $data['success'] .= $number_of_healed_men . ' of your crew members were healed with medicine.';
                            
                            if ($this->data['user']['sound_effects_play'] == 1) {
                                $data['playSound'] = 'mmm';
                            }
                            
                            $log_input['entry'] = 'healed ' . $number_of_healed_men . ' crew members with medicine.';
                            $log_input['type'] = 'crew-management';
                            $this->Log->create($log_input);
                        }
                        
                        if ($number_of_ignored_men > 0) {
                            $data['success'] .= ' ' . $number_of_ignored_men . ' of your crew members did not need medicine so they gave it back.';
                        }
                    } else {
                        $data['error'] = 'You don\'t have enough medicine boxes to do that!';
                    }
                } elseif ($action == 'tobacco') {
                    if ($number_of_men <= $this->data['game']['tobacco']) {
                        foreach ($edited_crew as $man_id) {
                            $crew_updates[$man_id]['mood'] = "+1";
                            $data['changeElements']['crew_mood_' . $man_id]['text'] = $this->data['crew'][$man_id]['mood'] + 1;
                        }
                        
                        $crew_result = $this->Crew->update($crew_updates);

                        $data['changeElements'] = array_merge($data['changeElements'], $crew_result['changeElements']);
                                
                        $data['success'] = 'You gave ' . $number_of_men . ' of your crew tobacco which increased their mood by 1.';
                        
                        $updates['tobacco']['sub'] = true;
                        $updates['tobacco']['value'] = $number_of_men;
                        $game_result = $this->Game->update($updates);
                        
                        if ($this->data['user']['sound_effects_play'] == 1) {
                            $data['playSound'] = 'mmm';
                        }
                        
                        $log_input['entry'] = 'gave ' . $number_of_men . ' of the crew members tobacco which increased their mood by 1.';
                        $log_input['type'] = 'crew-management';
                        $this->Log->create($log_input);
                        
                        $data['changeElements'] = array_merge($data['changeElements'], $game_result['changeElements']);
                    } else {
                        $data['error'] = 'You do not have enough tobacco!';
                    }
                } elseif ($action == 'doubloons') {
                    if (($number_of_men * 100) <= $this->data['game']['doubloons']) {
                        foreach ($edited_crew as $man_id) {
                            $crew_updates[$man_id]['mood'] = "+2";
                            $crew_updates[$man_id]['doubloons'] = "+100";
                            $data['changeElements']['crew_mood_' . $man_id]['text'] = $this->data['crew'][$man_id]['mood'] + 2;
                            $data['changeElements']['crew_doubloons_' . $man_id]['text'] = $this->data['crew'][$man_id]['doubloons'] + 100;
                        }
                        
                        $crew_result = $this->Crew->update($crew_updates);

                        $data['changeElements'] = array_merge($data['changeElements'], $crew_result['changeElements']);
                                
                        $data['success'] = 'You gave ' . $number_of_men . ' of the crew members 100 dbl which, increased their mood by 2.';
                        
                        $updates['doubloons']['sub'] = true;
                        $updates['doubloons']['value'] = ($number_of_men * 100);
                        $game_result = $this->Game->update($updates);
                        
                        if ($this->data['user']['sound_effects_play'] == 1) {
                            $data['playSound'] = 'coins';
                        }
                        
                        $log_input['entry'] = 'gave ' . $number_of_men . ' of the crew members 100 dbl, which increased their mood by 2.';
                        $log_input['type'] = 'crew-management';
                        $this->Log->create($log_input);
                        
                        $data['changeElements'] = array_merge($data['changeElements'], $game_result['changeElements']);
                    } else {
                        $data['error'] = 'You do not have ' . ($number_of_men * 100) . ' doubloons!';
                    }
                } elseif ($action == 'rum') {
                    if ($number_of_men <= $this->data['game']['rum']) {
                        foreach ($edited_crew as $man_id) {
                            $crew_updates[$man_id]['mood'] = "+3";
                            $data['changeElements']['crew_mood_' . $man_id]['text'] = $this->data['crew'][$man_id]['mood'] + 3;
                        }
                        
                        $crew_result = $this->Crew->update($crew_updates);

                        $data['changeElements'] = array_merge($data['changeElements'], $crew_result['changeElements']);
                                
                        $data['success'] = 'You gave ' . $number_of_men . ' of your crew rum which increased their mood by 3.';
                        
                        $updates['rum']['sub'] = true;
                        $updates['rum']['value'] = $number_of_men;
                        $result = $this->Game->update($updates);
                        
                        if ($this->data['user']['sound_effects_play'] == 1) {
                            $data['playSound'] = 'mmm';
                        }
                        
                        $log_input['entry'] = 'gave ' . $number_of_men . ' of the crew members rum which increased their mood by 3.';
                        $log_input['type'] = 'crew-management';
                        $this->Log->create($log_input);
                        
                        $data['changeElements'] = array_merge($data['changeElements'], $result['changeElements']);
                    } else {
                        $data['error'] = 'You do not have enough rum!';
                    }
                }
            }
        } else {
            $data['info'] = 'No changes made...';
        }
        
        echo json_encode($data);
    }

    public function ships()
    {
        $this->data['player']['ship'] = $this->Ship->get($this->data['player']['user']['id']);
        $this->data['ship_specs'] = $this->config->item('ship_types');

        $this->load->view_ajax('inventory/view_ships', $this->data);
    }

    public function change_ship_name()
    {
        $ships = $this->Ship->get($this->data['player']['user']['id']);
        $ship_id = $this->input->post('ship_id');

        if (!isset($ships[$ship_id])) {
            $data['error'] = 'Something wen\'t wrong when changing the ship name.';
            echo json_encode($data);
            return;
        }

        $ship = $ships[$ship_id];
        $new_ship_name = $this->input->post('ship_name');

        if (strlen($new_ship_name) < 3 || strlen($new_ship_name) > 50) {
            $data['error'] = 'The name must be between 3-50 characters.';
            echo json_encode($data);
            return;
        }

        if ($ship['name'] === $new_ship_name) {
            $data['info'] = 'No changes made.';
            echo json_encode($data);
            return;
        }

        $updates[$ship_id]['name'] = $new_ship_name;
        $result = $this->Ship->update($updates);
            
        if (!$result['success']) {
            $data['error'] = 'Something wen\'t wrong when changing the ship name.';
            echo json_encode($data);
            return;
        }

        $data['changeElements']['js-ship-name-' . $ship_id]['text'] = $new_ship_name;
        $data['success'] = 'You changed the name of the ship to ' . $new_ship_name . '.';

        echo json_encode($data);
    }

    public function log()
    {
        $filter = $this->uri->segment(4);
        $page = $this->uri->segment(5);
        $entries_per_page = 50;

        $get_entry_first = !empty($page) ? (int)$page : 0;
        $get_entry_last = $entries_per_page;

        $log_input['user_id'] = $this->data['player']['user']['id'];
        $log_input['first_entry'] = $get_entry_first;
        $log_input['entries'] = $get_entry_last;

        $base_url = "";

        if (!empty($filter) && $filter != 'all') {
            $log_input['type'] = $filter;
            $base_url = base_url('inventory/log/' . $this->data['player']['user']['id'] . '/' . $filter);
        } else {
            $base_url = base_url('inventory/log/' . $this->data['player']['user']['id'] . '/all');
        }

        $this->data['player']['log'] = $this->Log->get($log_input);
        
        // Set up pagination
        $this->load->library('pagination');
        $config['uri_segment'] = 5;
        $config['base_url'] = $base_url;
        $config['total_rows'] = $this->data['player']['log']['num_rows'];
        $config['per_page'] = $entries_per_page;
        $config['num_links'] = 14;
        $config['prev_link'] = '⬅';
        $config['next_link'] = '➡';
        $config['attributes'] = array('class' => 'ajaxHTML');
        $this->pagination->initialize($config);

        // Unset this to now make it show up in the log results
        unset($this->data['player']['log']['num_rows']);
        
        $this->data['pages'] = $this->pagination->create_links();

        $this->data['viewdata']['log_types'] = array(
            'travel' => 'Travels',
            'general' => 'General',
            'ship-interaction' => 'Ship interactions',
            'transaction' => 'Transactions',
            'gambling' => 'Gambling',
            'funds' => 'Funds',
            'social-status' => 'Social status',
            'labor' => 'Labor',
            'crew-management' => 'Crew management'
        );
        
        $this->load->view_ajax('inventory/view_log', $this->data);
    }
    
    public function user_remove()
    {
        if ($this->uri->segment(4) != "" && $this->data['user']['admin'] == 1) {
            $id = $this->uri->segment(4);
            $this->User->erase($id);
            
            $data['changeElements']['player-' . $id]['remove'] = true;
            $data['success'] = "Player was deleted.";
            
            echo json_encode($data);
        }
    }

    public function calc_age($birthday)
    {
        list($birthday, $time) = explode(" ", $birthday);
        list($year, $month, $day) = explode("-", $birthday);

        $year_diff  = date("Y") - $year;
        $month_diff = date("m") - $month;
        $day_diff   = date("d") - $day;

        if ($month_diff < 0) {
            $year_diff--;
        } elseif ($month_diff == 0 && $day_diff < 0) {
            $year_diff--;
        }

        return $year_diff;
    }
}

/*  End of inventory.php */
/* Location: ./application/controllers/inventory.php */
