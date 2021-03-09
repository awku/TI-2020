<?php
$lifetime=0;
session_start();
setcookie(session_name(),session_id(),time()+$lifetime);

require_once("rest.php");
require_once("sqlite.php");

class API extends REST {
     
    public $data = "";
     
    public function __construct(){
        parent::__construct();
        $this->db = new db() ;
    }
             
    public function processApi(){
        $method = $this->get_request_method();
        if ($this->_endpoint=='user'){
            switch($method){
                case "POST":
                    $func = "_reg"; 
                    break;
                case "GET":
                    $func = "_regform"; 
                    break;
                default:
                    $this->response('Page not found',404);
                    break;
            }
        }else if ($this->_endpoint=='survey'){
            switch($method){
                case "POST":
                    $func = "_save"; 
                    break;
                case "GET":
                    if(array_key_exists('sortby',$this->_request))
                        $func = "_by".$this->_request['sortby'];
                    break;
                default:
                    $this->response('Page not found',404);
                    break;
            }
        }else if ($this->_endpoint=='session'){
            switch($method){
                case "POST":
                    $func = "_log"; 
                    break;
                case "GET":
                    $func = "_logform"; 
                    break;
                case "DELETE":
                    $func = "_logout"; 
                    break;
                default:
                    $this->response('Page not found',404);
                   break;
            }
        }
        if((int)method_exists($this,$func) > 0) {
            $this->$func();
        } else {
            $this->response('Page not found',404);
        }
    }

    private function _save() {
        if(!empty($this->_request) ){
            try {
                $json_array = json_decode($this->_request,true);
                $res = $this->db->insert($json_array);
                if ( $res ) {
                    $result = array('return'=>'ok');
                    $this->response($this->json($result), 200);
                } else {
                    $result = array('return'=>'not added');
                    $this->response($this->json($result), 200);
                }
            } catch (Exception $e) {
                $this->response($this->json($e->getMessage()), 400) ;
            }
        } else {
            $error = array('status' => "Failed", "msg" => "Invalid send data");
            $this->response($this->json($error), 400);
        }
    }

    private function _log() {
        if(!empty($this->_request) ){
            try {
                $json_array = json_decode($this->_request,true);
                $json_array['password']=md5($json_array['password']);
                $res = $this->db->login($json_array);
                if ($res) {
                    $result = array('return'=>'ok');
                    $_SESSION['auth'] = 'OK' ;
                    $_SESSION['user'] = $json_array['email'] ;
                    $this->response($this->json($result), 200);
                } else {
                    $result = array('return'=>'not logged');
                    $this->response($this->json($result), 200);
                }
            } catch (Exception $e) {
                $this->response($this->json($e->getMessage()), 400) ;
            }
        } else {
            $error = array('status' => "Failed", "msg" => "Invalid send data");
            $this->response($this->json($error), 400);
        }
    }

    private function _logform() {
        $result = array('template'=>file_get_contents('../templates/loginform.tpl'));
        $this->response($this->json($result), 200);
    }

	private function _reg() {
        if(!empty($this->_request) ){
            try {
                $json_array = json_decode($this->_request,true);
                $json_array['password']=md5($json_array['password']);
			    $res = $this->db->register($json_array);
                if ( $res ) {
                    $result = array('return'=>'ok');
                    $this->response($this->json($result), 200);
                } else {
                    $result = array('return'=>'not registered');
                    $this->response($this->json($result), 200);
                }
            } catch (Exception $e) {
		        $this->response($this->json($e->getMessage()), 400);
            }
        } else {
            $error = array('status' => "Failed", "msg" => "Invalid send data");
            $this->response($this->json($error), 400);
        }
    }

    private function _regform() {
        $result = array('template'=>file_get_contents('../templates/registerform.tpl'));
        $this->response($this->json($result), 200);
    }

    private function json($data){
        if(is_array($data)){
            return json_encode($data);
        }
    }

	private function _bygender(){   
        if (isset($_SESSION['auth']) && $_SESSION['auth'] == 'OK'){
            $result = $this->db->get_by_gender() ;
            $res = array('template'=>file_get_contents('../templates/surveyresults.tpl'), 'answers'=>$result);        
            $this->response($this->json($res), 200);
        } else {
            $this->response('', 401);
        }
    }

    private function _byage(){   
        if (isset($_SESSION['auth']) && $_SESSION['auth'] == 'OK'){
            $result = $this->db->get_by_age();
            $res = array('template'=>file_get_contents('../templates/surveyresults.tpl'), 'answers'=>$result);        
            $this->response($this->json($res), 200);
        } else {
            $this->response('', 401);
        }
    }

    private function _logout() {
        unset($_SESSION);
        session_destroy();

        $result = array('return'=>'ok');
        $this->response($this->json($result), 200);
    }

}
         
    $api = new API;
    $api->processApi();
 
?>
