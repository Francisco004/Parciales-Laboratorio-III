<?php 

    include "IParte1.php";
    include "IParte2.php";
    include "IParte3.php";
    include "Producto.php";

    class ProductoEnvasado extends Producto implements IParte1, IParte2, IParte3
    {
        public $id;
        public $precio;
        public $pathFoto;
        public $codigoBarra;

        public function __construct($Nombre, $Origen, $CodigoDeBarras = " ", $Precio = " ", $ID = " ", $Foto = "vacio")
        {
            parent::__construct($Nombre, $Origen);
            $this->id = $ID;
            $this->precio = $Precio;
            $this->pathFoto = $Foto;
            $this->codigoBarra = $CodigoDeBarras;
        }

        public function ToJson()
        {
            return json_encode($this);
        }

        public function Agregar()
        {
            $retorno = false;

            $servername = "localhost";
            $username = "root";
            $dbname = "productos_bd";
            $sql = "Mensaje de error";       

            try 
            {
              $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username);
              $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

              $sql = "INSERT INTO productos (codigo_barra, nombre, origen, precio, foto) 
                      VALUES ('".$this->codigoBarra."', '".$this->nombre."', '".$this->origen."', '".$this->precio."', '".$this->pathFoto."')";

              $conn->exec($sql);

              $retorno = true;
            } 
            catch(PDOException $e) 
            {
              echo $sql . "<br>" . $e->getMessage();
            }

            return $retorno;
        }

        public static function Traer()
        {
            $servername = "localhost";
            $username = "root";
            $dbname = "productos_bd";
            $arrayPersonas = array();

            try 
            {
                $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username);
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                $stmt = $conn->prepare("SELECT id, codigo_barra, nombre, origen, precio, foto FROM productos");

                $stmt->execute();

                $arrayUsuarios = $stmt->fetchAll();

                for($i = 0; $i < count($arrayUsuarios); $i++)
                {
                    $persona = new ProductoEnvasado($arrayUsuarios[$i][2],$arrayUsuarios[$i][3],$arrayUsuarios[$i][1],$arrayUsuarios[$i][4],$arrayUsuarios[$i][0],"./productos/imagenes/".$arrayUsuarios[$i][5]);
                    array_push($arrayPersonas,$persona);
                }
            } 
            catch(PDOException $e) 
            {
                echo "Error: " . $e->getMessage();
            }

            return $arrayPersonas;
        }

        public static function Eliminar($id)
        {
            $retorno = false;
            $servername = "localhost";
            $username = "root";
            $dbname = "productos_bd";

             

            try 
            {
                $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username);

                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                $sql = "DELETE FROM productos WHERE id=".$id;

                if($conn->exec($sql))
                {
                    $retorno = true;
                }
            } 
            catch(PDOException $e) 
            {
                echo $sql . "<br>" . $e->getMessage();
            }
            

            return $retorno;
        }

        public function Modificar()
        {
            $retorno = false;
            $servername = "localhost";
            $username = "root";
            $dbname = "productos_bd";
            
            try {
              $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username);

              $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
              $sql = "UPDATE productos SET id='".$this->id."', codigo_barra='".$this->codigoBarra."', nombre='".$this->nombre."' , origen='".$this->origen."' , precio='".$this->precio."' , foto='".$this->pathFoto."' WHERE id=".$this->id;

              if($conn->exec($sql))
                {
                    $retorno = true;
                }
            } 
            catch(PDOException $e) 
            {
              echo $sql . "<br>" . $e->getMessage();
            }
            
            $conn = null;

            return $retorno;
        }

        public function Existe($objetos)
        {
            $retorno = true;

            for($i = 0; $i < count($objetos); $i++)
            {
                if($objetos[$i]->nombre == $this->nombre && $objetos[$i]->origen == $this->origen)
                {
                    $retorno = false;
                }
            }

            return $retorno;
        }
        
        public function GuardarEnArchivo()
        {
            $path = "./archivos/productos_envasados_borrados.txt";

            $hoy = date("H:i:s"); 
            $hoy = str_replace(":","",$hoy);

            $newPath = "./ProductosBorrados/".$this->id.".".$this->nombre."."."borrado".".".$hoy."."."jpg";

            rename($this->pathFoto, $newPath);

            $this->pathFoto = $newPath;

            if(file_exists($path))
            {
                $archivo = fopen($path,"r");

                if(filesize($path) > 0)
                {
                    $aux = fread($archivo, filesize($path));
                }

                fclose($archivo);

                $archivo = fopen($path,"w");
            }
            else
            {
                $archivo = fopen($path,"a");
            }

            if(filesize($path) == 0)
            {
                if(fwrite($archivo, "[". $this->ToJSON() . "]") != 0)
                {

                }

                fclose($archivo);
            }
            else
            {

                $lectura = explode("]", $aux);

                    if(fwrite($archivo, $lectura[0] . "," . $this->ToJSON() . "]") != 0)
                    {

                    }
                    
                    fclose($archivo);
            }
        }

        public static function MostrarBorradosJSON()
        {
            $string = Producto::TraerJSON("./archivos/productos_eliminados.json");

            echo "<table><tr><th>Nombre</th><th>Origen</th></tr>";

            for($i = 0; $i < count($string); $i++)
            {
                echo '<tr><td>'.$string[$i]->nombre.'</td><td>'.$string[$i]->origen.'</td></tr>';     
            }

            echo"</table>";
        }

        public static function MostrarModificados()
        {
            $all_files = glob("./ProductosModificados/*.*");

            echo "<table>";
            echo "<tr>";
            echo "<th>Fotos</th>";
            echo "</tr>";

            for ($i=0; $i<count($all_files); $i++)
            {
                $image_name = $all_files[$i];
                $supported_format = array('gif','png','jpg','bmp','jpeg');
                $ext = strtolower(pathinfo($image_name, PATHINFO_EXTENSION));

                if (in_array($ext, $supported_format))
                {
                    echo "<tr>";
                    echo "<td>" . '<img src="./Backend'.$image_name.'" width="50" height="50" />'."</td>" ;
                    echo "</tr>";
                } 
                else 
                {
                    continue;
                }
            }

            echo "</table>";
        }
    }
?>