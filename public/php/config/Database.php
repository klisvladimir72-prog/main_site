<?

class Database
{
    private static $instance = null;
    private $pdo;

    private $host = '127.127.126.32';
    private $dbname = 'opov';
    private $username = 'root';
    private $password = '';

    private function __construct()
    {
        try {
            $this->pdo = new PDO("mysql:host={$this->host}; dbname={$this->dbname}; charset=utf8mb4", $this->username, $this->password);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Ошибка подключения к БД: " . $e->getMessage());
        }
    }

    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function getConnection()
    {
        return $this->pdo;
    }

    private function __clone() {}
    public function __wakeup() {}
}
