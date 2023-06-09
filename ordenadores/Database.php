<?php

    class database{

        public function conectar(){
            $driver = 'mysql';
            $host ='localhost';
            $port = '3306';
            $user = 'DANIEL';//en el usuario daniel la tabla esta vacia no se si pintara la de root que esta llena
            $password = '123456';
            $db = 'practicaordenadores';

            $dsn = "$driver:dbname=$db;host=$host;port=$port";

            try{
                $gbd = new PDO($dsn, $user, $password);
                echo 'Conectado correctamente';

            }catch (PDOException $e){
                echo 'Falló la conexión: ' . $e->getMessage();
            }
            return $gbd;
        }
        public function getAll(){
            $sql="SELECT * FROM ordenadores";
            $resultado = self::conectar()->query($sql);

            

            return $resultado;
        }
        

    }
?>