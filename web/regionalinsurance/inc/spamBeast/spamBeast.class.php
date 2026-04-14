<?php
// Version: 0.2.2
class spamBeast
{
    protected $badWords;
    protected $scores;
    protected $found_words;

    public function __construct() {
        // set default dict
        $dict = dirname(__FILE__) . '/badWordDict.json';
        // load the bad words dict
        $this->load_dict($dict);

        $this->scores = array(
            'email' => 0,
            'message' => 0,
            'links' => 0
        );
        $this->found_words = array();
    }

    public function load_email($email) {
        $email_pattern = '/^[A-Z0-9\._\-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i';
        // return 5 if email doesnt appear valid
        $this->scores['email'] = preg_match($email_pattern, $email) == 0 ? 5 : 0;
    }

    public function load_message($message) {
        $message_lower = strtolower($message);

        $this->found_words = array();

        // loop through a list of known "bad" words
        foreach ($this->badWords as $filter) {
            // compare lower case with lower case
            $filter['word'] = strtolower($filter['word']);

            // get filter score (points * number of occurrences)
            $score = $filter['val'] * substr_count($message_lower, $filter['word']);
            // check if we found any occurances
            if ($score > 0) {
                $this->found_words[] = $filter['word'];
                // add filter score to total message score
                $this->scores['message'] += $score;
            }
        }

        $message_length = strlen($message);
        // check if the message is
        if ($message_length >= 15) {
            // remove the domain name from the content
            // this will not punish a user for posting a long link. only the domain name is counted.
            $message_short = preg_replace('/(?:https?|ftps?)\:\/\/[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}/', '\1', $message);
            // replace more then 1 space with a single space
            $message_short = preg_replace('/ +/', ' ', $message_short);
            // add score based on % of non link content
            $this->scores['links'] = (10 - round(strlen($message_short) / $message_length * 10));
        }
    }

    public function get_score() {
        return array_sum($this->scores);
    }

    public function get_email_score() {
        return $this->scores['email'];
    }

    public function get_message_score() {
        return $this->scores['message'];
    }

    public function get_message_link_score() {
        return $this->scores['links'];
    }

    public function get_words() {
        return $this->found_words;
    }

    public function load_dict($bad_words_file) {
        // make sure file exists
        if (!file_exists($bad_words_file)) {
            trigger_error('spamBeast load_dict() file does not exist');
        }
        $raw_conts = file_get_contents($bad_words_file);
        $this->badWords = json_decode($raw_conts, true);
    }

    public function __get($var) {
        return $this->$var;
    }
}
