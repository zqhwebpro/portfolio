<?php
/********************************************
The MIT License (MIT)

Copyright (c) 2015 Alex Mayer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*********************************************
PDO Database Wrapper Class
*********************************************
Version: 1.3.2
Last Updated: 2016-06-10
********************************************/
class database
{
    // a handle for the database connection
    protected $handle = null;
    // database connection variables
    private $host = '';
    private $username = '';
    private $password = '';
    private $dbname = '';
    protected $tables = array();

    public function __construct($creds = null)
    {
        if (!empty($creds)) {
            $this->host = $creds['host'];
            $this->username = $creds['username'];
            $this->password = $creds['password'];
            $this->dbname = $creds['dbname'];
        } elseif (defined('DATABASE_HOST') && defined('DATABASE_USERNAME') && defined('DATABASE_PASSWORD') && defined('DATABASE_DBNAME')) {
            $this->host = DATABASE_HOST;
            $this->username = DATABASE_USERNAME;
            $this->password = DATABASE_PASSWORD;
            $this->dbname = DATABASE_DBNAME;
        }
    }
    public function query($sql, $params = null, $obj = null, $jfo = false, $sort_by = false)
    {
        // make sure we have a database connection
        if (is_null($this->handle) && !$this->openCon()) {
            die('openCon(): Could not connect to database');
        }
        // make sure we were passed some sql
        if (!isset($sql)) {
            die('query(): no sql was passed');
        }
        // validate the return object class
        if (isset($obj)) {
            if (!is_string($obj)) {
                die('query(): return object class must be a string');
            }
            if (!class_exists($obj)) {
                die('query(): Class ' . $obj . ' does not exist');
            }
            // make sure the class is a subclass of dbRow
            $parent = $obj;
            while (!in_array($parent, array('dbRow', false))) {
                $parent = get_parent_class($parent);
            }
            if ($parent != 'dbRow') {
                die('query(): class ' . $obj . ' is not a subclass of dbRow');
            }
        }
        // get info about the query
        $tbl = $this->handle->prepare('explain ' . $sql);
        $tbl->setFetchMode(PDO::FETCH_ASSOC);
        $tbl->execute($params);
        $tblinfo = $tbl->fetchAll();
        foreach ($tblinfo as $tmp) {
            // cache the table if dont have it yet
            if (!in_array($tmp['table'], $this->tables)) {
                $this->tables[$tmp['table']] = new dbTable($this->handle, $tmp['table']);
            }
            // append the table name to the current tables
            $tables[] = $this->tables[$tmp['table']];
        }
        // prepare the sql
        $stmt = $this->handle->prepare($sql);
        if (!isset($obj)) {
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
        } else {
            // make sure we are fetching into a dbRow or subclass instance
            $stmt->setFetchMode(PDO::FETCH_CLASS, $obj, array($this->handle, $tables));
        }
        // check if we have an array of params
        if (is_array($params)) {
            // bind each param using its data type
            foreach ($params as $param_key => $param) {
                switch (gettype($param)) {
                    case 'integer':
                        $param_type = PDO::PARAM_INT;
                        break;
                    case 'NULL':
                        $param_type = PDO::PARAM_NULL;
                        break;
                    case 'boolean':
                        $param_type = PDO::PARAM_BOOL;
                        break;
                    default:
                        $param_type = PDO::PARAM_STR;
                        break;
                }
                $stmt->bindValue($param_key, $param, $param_type);
            }
        }
        // execute the query and check if it worked
        if (!$stmt->execute()) {
            // get the reason why the query didnt work
            list(,,$err) = $stmt->errorInfo();
            die('query(): ' . $err);
        }
        // get one object or an array of objects depending which was asked for
        $raw_results = $jfo ? $stmt->fetch() : $stmt->fetchAll();
        $results = array();
        // check if we need to sort by a field
        if (!$jfo && $sort_by && preg_match('/^select.+from.+?([^`\s;]+).*/i', $sql, $table_name)) {
            $table_name = $table_name[1];
            // get the field name we are going to use based on the datatype of $sort_by
            if (is_bool($sort_by)) {
                $field_name = $this->tables[$table_name]->priKey;
            } else {
                // make sure the field exists
                if (!in_array($sort_by, $this->tables[$table_name]->cols)) {
                    die('query(): field ' . $sort_by . ' is not in table ' . $table_name);
                }
                $field_name = $sort_by;
            }
            foreach ($raw_results as $result) {
                if (empty($result[$field_name])) {
                    die('query(): field ' . $field_name . ' is empty. Cannot assign key to sorted array.');
                }
                $results[$result[$field_name]] = $result;
            }
        } else {
            $results = $raw_results;
        }
        // return the desired results or empty array if failed
        return $results === false ? array() : $results;
    }
    public function openCon()
    {
        try {
            $this->handle = new PDO('mysql:host=' . $this->host . ';dbname=' . $this->dbname, $this->username, $this->password, array());
        } catch(PDOException $e) {
            die('openCon() Error: ' . $e->getMessage());
        }
        return true;
    }
    public function closeCon()
    {
        $this->handle = null;
        return !isset($this->handle);
    }
    public function insertID($name = null)
    {
        return $this->handle->lastInsertId($name);
    }
    public function setCredentials($host, $user, $pass, $db)
    {
        if (!isset($host) || !isset($user) || !isset($pass) || !isset($db)) {
            return false;
        }
        $this->host = $host;
        $this->username = $user;
        $this->password = $pass;
        $this->dbname = $db;
        return true;
    }
    public function __get($var)
    {
        if (in_array($var, array('handle'))) {
            // get a connection if one is asked for
            if ($var == 'handle' && is_null($this->handle)) {
                $this->openCon();
            }
            return $this->$var;
        }
    }
    public function __set($var, $val)
    {
        if (in_array($var, array('host', 'user', 'password', 'dbname'))) {
            $this->$var = $val;
        }
    }
}

class dbTable
{
    protected $dbh;
    protected $name;
    protected $priKey;
    protected $cols = array();

    public function __construct($dbh, $table_name)
    {
        $this->dbh = $dbh;
        $this->name = $table_name;
        $stmt = $this->dbh->prepare('DESCRIBE ' . $table_name);
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $stmt->execute();
        foreach ($stmt->fetchAll() as $tmp) {
            if ($tmp['Key'] == 'PRI') {
                $this->priKey = $tmp['Field'];
            }
            $this->cols[] = $tmp['Field'];
        }
    }
    public function __get($var)
    {
        switch ($var) {
            case 'dbh':
            case 'name':
            case 'priKey':
            case 'cols':
                return $this->$var;
                break;
            default:
                return $this->cols[$var];
                break;
        }
    }
}

class dbRow
{
    protected $dbh = null;
    protected $tables = null;
    protected $data = array();

    public function __construct($dbh, $tables)
    {
        // save the database handle
        $this->dbh = $dbh;
        // check what type of tables we were passed
        if (is_string($tables)) {
            $this->tables = array(new dbTable($this->dbh, $tables));
        } elseif (is_array($tables)) {
            $this->tables = $tables;
        }
    }
    public function save()
    {
        // make sure we have info to put into the database
        if (empty($this->data)) {
            return false;
        }
        $params = array();
        $setdata = array();
        foreach ($this->tables[0]->cols as $tmp) {
            // dont save things we dont have
            if (!in_array($tmp, array_keys($this->data))) {
                continue;
            }
            $params[':' . $tmp] = $this->data[$tmp];
            if($tmp == $this->tables[0]->priKey){ continue; }
            $setdata[] = '`' . $tmp . '`=:' . $tmp;
        }
        if (isset($this->data[$this->tables[0]->priKey])) {
            $q = 'UPDATE ' . $this->tables[0]->name . ' SET ' . implode(', ', $setdata) . ' WHERE `' . $this->tables[0]->priKey . '`=:' . $this->tables[0]->priKey . ';';
        } else {
            $q = 'INSERT INTO ' . $this->tables[0]->name . ' SET ' . implode(', ', $setdata) . ';';
        }
        // run the query
        $stmt = $this->dbh->prepare($q);
        $worked = $stmt->execute($params);

        // get the insert id if we dont have it
        if (!isset($this->data[$this->tables[0]->priKey])) {
            $this->data[$this->tables[0]->priKey] = $this->dbh->lastInsertId();
        }
        return $worked;
    }
    // will delete the row from the database
    public function delete()
    {
        // make sure we really know which row we are deleting
        if (!isset($this->data[$this->tables[0]->priKey])) {
            die('delete(): You can not delete an item that is not in the database yet');
        }
        // run the query
        $stmt = $this->dbh->prepare('DELETE FROM ' . $this->tables[0]->name . ' WHERE `' . $this->tables[0]->priKey . '`=:id');
        return $stmt->execute(array(':id' => $this->data[$this->tables[0]->priKey]));
    }
    public function __get($var)
    {
        switch ($var) {
            case 'tables':
                return $this->tables;
                break;
            case 'table':
                return isset($this->tables[0]) ? $this->tables[0] : null;
                break;
            case 'db':
            case 'dbh':
                return $this->dbh;
                break;
            case 'data':
                return $this->data;
                break;
            default:
                return $this->data[$var];
                break;
        }
    }
    public function __set($var, $val)
    {
        $this->data[$var] = $val;
    }
    public function __isset($var)
    {
        switch ($var) {
            case 'table':
                return isset($this->tables[0]);
                break;
            case 'dbh':
            case 'tables':
                return isset($this->$var);
                break;
            default:
                return isset($this->data[$var]);
                break;
        }
    }
}
