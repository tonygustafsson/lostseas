<?php

class Log extends CI_Model
{
    public function get($input)
    {
        $input['first_entry'] = (isset($input['first_entry'])) ? $input['first_entry'] : 0;
        $input['entries'] = (isset($input['entries'])) ? $input['entries']	: 20;

        if (isset($input['user_id'])) {
            $this->db->where($this->db->log_table . '.user_id', $input['user_id']);
        }

        if (isset($input['type'])) {
            $this->db->where($this->db->log_table . '.type', $input['type']);
        }
               
        // Query for getting logs
        $this->db->select($this->db->log_table . '.id, ' . $this->db->game_table . '.character_name, ' . $this->db->game_table . '.character_avatar, ' . $this->db->game_table . '.character_gender, ' . $this->db->log_table . '.user_id, time, ' . $this->db->log_table . '.week, ' . $this->db->log_table . '.entry, ' . $this->db->log_table . '.type');
        $this->db->join($this->db->user_table, 'ls_user.id = ls_log.user_id');
        $this->db->join($this->db->game_table, 'ls_game.user_id = ls_log.user_id');
        $this->db->order_by('time DESC');
        $this->db->limit($input['entries'], $input['first_entry']);

        $log = $this->db->get($this->db->log_table);
        $log = $log->result_array();
        
        if (! isset($input['get_num_rows']) || $input['get_num_rows'] === true) {
            // Query for num rows, count_all_result did not work with join?
            if (isset($input['user_id'])) {
                $this->db->where($this->db->log_table . '.user_id', $input['user_id']);
            }

            if (isset($input['type'])) {
                $this->db->where($this->db->log_table . '.type', $input['type']);
            }

            $this->db->select($this->db->log_table . '.id');
            $this->db->join($this->db->user_table, 'ls_user.id = ls_log.user_id');
            
            $log_num_rows = $this->db->get($this->db->log_table);
            $log['num_rows'] = $log_num_rows->num_rows();
        }

        return $log;
    }

    public function create($input)
    {
        if (empty($input['entry'])) {
            // No empty inserts
            return;
        }

        $input['user_id'] = (isset($input['user_id'])) ? $input['user_id'] : $this->data['user']['id'];
        $input['week'] = (isset($input['week'])) ? $input['week'] : $this->data['game']['week'];
        $input['type'] = (isset($input['type'])) ? $input['type'] : 'general';
        $input['time'] = (isset($input['time'])) ? $input['time'] : date('Y-m-d H:i:s', time());
        
        $this->db->insert($this->db->log_table, $input);
    }
    
    public function erase($user_id)
    {
        $this->db->delete($this->db->log_table, array('user_id' => $user_id));
    }
}
