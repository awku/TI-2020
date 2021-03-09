<?php

class db {
      static $dsn = 'sqlite:../sql/baza.db'  ;
      protected static $db ;
      private $sth ;
 
      function __construct() {
            $data = explode(':',self::$dsn) ;
            if ( ! file_exists ( $data[1] ) ) { throw new Exception ( "Database file doesn't exist." ) ;  }
            self::$db = new PDO ( self::$dsn ) ;
            self::$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION) ; 
      }
 
      function insert($data) {
            $this->sth = self::$db->prepare('INSERT INTO survey (dateandtime, gender, age, season) VALUES (:dateandtime, :gender, :age, :season) ') ;
            $this->sth->bindValue(':dateandtime',$data['dateandtime'],PDO::PARAM_STR) ; 
            $this->sth->bindValue(':gender',$data['gender'],PDO::PARAM_STR) ; 
            $this->sth->bindValue(':age',$data['age'],PDO::PARAM_STR) ; 
            $this->sth->bindValue(':season',$data['season'],PDO::PARAM_STR) ; 
            $resp = $this->sth->execute() ;
            return $resp ; 
      }
      
	function register($user) {
            $this->sth = self::$db->prepare('SELECT email FROM user WHERE email = :email ') ;
            $this->sth->bindValue(':email',$user['email'],PDO::PARAM_STR) ; 
            $this->sth->execute() ;
            $result = $this->sth->fetch();
	      if($result){
		      return false;
	      }else{
		      $this->sth->closeCursor();
		      $this->sth = self::$db->prepare('INSERT INTO user (email, pswd) VALUES ( :email, :pswd) ') ;
                  $this->sth->bindValue(':email',$user['email'],PDO::PARAM_STR) ; 
                  $this->sth->bindValue(':pswd',$user['password'],PDO::PARAM_STR) ; 
                  $resp = $this->sth->execute();
		      return $resp;
	      }
	}

	function login($user) {
            $this->sth = self::$db->prepare('SELECT email FROM user WHERE email = :email AND pswd = :pswd ') ;
            $this->sth->bindValue(':email',$user['email'],PDO::PARAM_STR) ; 
            $this->sth->bindValue(':pswd',$user['password'],PDO::PARAM_STR) ; 
            $this->sth->execute();
            $result = $this->sth->fetch();
	      return $result;
      }
	
	function get_by_gender() {
            $this->sth = self::$db->prepare('SELECT season, gender, count(*) AS count FROM survey GROUP BY season, gender;') ;
            $this->sth->execute() ;
            $result = $this->sth->fetchAll(PDO::FETCH_GROUP|PDO::FETCH_ASSOC) ;
            return $result;
      }

      function get_by_age() {
	      $this->sth = self::$db->prepare('SELECT season, age, count(*) AS count FROM survey GROUP BY season, age;') ;
            $this->sth->execute() ;
            $result = $this->sth->fetchAll(PDO::FETCH_GROUP|PDO::FETCH_ASSOC) ;
            return $result;
      }

}