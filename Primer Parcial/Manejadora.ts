///<reference path="./ProductoEnvasado.ts" />

namespace PrimerParcial
{
    interface IParte2
    {
        EliminarProducto(json : string) : void;
        ModificarProducto(json : string) : void;
    }

    interface IParte3
    {
        BorrarProductoFoto(json : string) : void;
        AgregarProductoFoto() : void;
        ModificarProductoFoto() : void;
        VerificarProductoEnvasado() : void;
    }

    interface IParte4
    {
        MostrarBorradosJSON() : void;
        MostrarFotosModificados() : void;
        FiltrarListado() : void;
    }

    export class Manejadora implements IParte2, IParte3, IParte4
    {
        constructor ()
        {

        }

        //////////////////////////////////////////////////////////////////////////////////Parte 1
        public static AgregarProductoJSON() : void
        {              
            let nombre: string = (<HTMLInputElement> document.getElementById("nombre")).value;
            let origen: string = (<HTMLInputElement> document.getElementById("cboOrigen")).value;

            const xhr = new XMLHttpRequest();
            xhr.open("POST", "./Backend/AltaProductoJSON.php");
            xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");

            xhr.onreadystatechange = ():void => {

                if (xhr.readyState === 4)
                {
                    if (xhr.status === 200)
                    {
                        let mensaje = JSON.parse(xhr.responseText);
                        alert(mensaje.mensaje);
                        console.log(xhr.responseText);
                    }
                }
            };

            xhr.send('nombre=' + nombre + '&origen=' + origen);
        }

        public static MostrarProductosJSON() : void
        {   
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "./Backend/ListadoProductosJSON.php");
            xhr.send();

            xhr.onreadystatechange = ():void => {

                if (xhr.readyState === 4)
                {
                    if (xhr.status === 200)
                    {
                        let Decodificado = JSON.parse(xhr.responseText);
                        let tabla ="<table><tr><th>Nombre</th><th>Origen</th></tr>";

                        Decodificado.forEach((element:any) => 
                        {
                            tabla +='<tr><td>'+element.nombre+'</td><td>'+element.origen+'</td></tr>';
                        });

                        tabla+="</table>";

                        (<HTMLInputElement>document.getElementById('divTabla')).innerHTML = tabla;
                    }
                }
            };
        }

        public static VerificarProductoJSON() : void
        {            
            let nombre: string = (<HTMLInputElement> document.getElementById("nombre")).value;
            let origen: string = (<HTMLInputElement> document.getElementById("cboOrigen")).value;

            const xhr = new XMLHttpRequest();
            xhr.open("POST","./BACKEND/VerificarProductoJSON.php");
            xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");

            xhr.onreadystatechange = ():void => {

                if (xhr.readyState === 4)
                {
                    if (xhr.status === 200)
                    {
                        let mensaje = JSON.parse(xhr.responseText);
                        alert(mensaje.mensaje);
                        console.log(xhr.responseText);
                    }
                }
            };

            xhr.send('nombre=' + nombre + '&origen=' + origen);
        }

        public static MostrarInfoCookie() : void
        {              
            let nombre: string = (<HTMLInputElement> document.getElementById("nombre")).value;
            let origen: string = (<HTMLInputElement> document.getElementById("cboOrigen")).value;

            const xhr = new XMLHttpRequest();
            xhr.open("GET","./BACKEND/MostrarCookie.php?"+"nombre="+nombre+"&origen="+origen);

            xhr.onreadystatechange = ():void => {

                if (xhr.readyState === 4)
                {
                    if (xhr.status === 200)
                    {
                        console.log(xhr.responseText);
                        (<HTMLDivElement>document.getElementById("divInfo")).innerHTML = xhr.responseText;
                    }
                }
            };

            xhr.send();
        }

        public static AgregarProductoSinFoto() : void
        {            
           let txtOrigen: string = (<HTMLInputElement> document.getElementById("cboOrigen")).value;
           let txtNombre: string = (<HTMLInputElement> document.getElementById("nombre")).value;
           let txtPrecio: string = (<HTMLInputElement> document.getElementById("precio")).value;
           let codigoBarras: string = (<HTMLInputElement> document.getElementById("codigoBarra")).value;

           const xhr = new XMLHttpRequest();
           xhr.open("POST", "./Backend/AgregarProductoSinFoto.php");
           xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");

           xhr.onreadystatechange = ():void => {

               if (xhr.readyState === 4)
               {
                   if (xhr.status === 200)
                   {
                        let mensaje = JSON.parse(xhr.responseText);
                        alert(mensaje.mensaje);
                        console.log(xhr.responseText);
                   }
               }
           };

           const myObj = {
            nombre: txtNombre,
            origen: txtOrigen,
            precio: txtPrecio,
            codigoBarra: codigoBarras
            };
          
           let json = JSON.stringify(myObj);

           xhr.send('producto_json=' + json);
        }

        public static MostrarProductosEnvasados() : void
        {            
            let xhr = new XMLHttpRequest();
            xhr.open("GET","./BACKEND/ListadoProductosEnvasados.php?tabla=json");
            xhr.send();

            xhr.onreadystatechange = ():void => {

                if (xhr.readyState === 4)
                {
                    if (xhr.status === 200)
                    {
                        let Decodificado = JSON.parse(xhr.responseText);
                        let tabla ="<table><tr><th>Nombre</th><th>Origen</th><th>Codigo</th><th>ID</th><th>Precio</th><th>Foto</th></tr>";

                        Decodificado.forEach((element:any) => 
                        {
                            tabla +='<tr><td>'+element.nombre+'</td><td>'+element.origen+'</td><td>'+element.codigoBarra+'</td><td>'+element.id+'</td><td>'+element.precio+'</td>';
     
                            if(element.pathFoto != "./productos/imagenes/" && element.pathFoto != "./productos/imagenes/vacio" && element.pathFoto != null)
                            {
                                tabla +='<td>'+"<img src='./Backend/"+element.pathFoto+"';width='50' height='50'>"+'</td>';
                            }
                            else
                            {
                                tabla +='<td>Sin foto</td>';
                            }

                            let jsonNeiner = JSON.stringify(element);

                            if((<HTMLInputElement> document.getElementById("hdnIdModificacion")).value == "0")
                            {
                                tabla += `<td> <input type="button" value="Eliminar" class="btn btn-danger" onclick=PrimerParcial.Manejadora.EliminarProducto('${jsonNeiner}')></td>`;
                                tabla += `<td> <input type="button" value="Modificar" class="btn btn-danger" onclick=PrimerParcial.Manejadora.ModificarProductoMostrar('${jsonNeiner}')></td></tr>`;
                            }
                            else
                            {
                                tabla += `<td> <input type="button" value="Eliminar" class="btn btn-danger" onclick=PrimerParcial.Manejadora.BorrarProductoFoto('${jsonNeiner}')></td>`;
                                tabla += `<td> <input type="button" value="Modificar" class="btn btn-danger" onclick=PrimerParcial.Manejadora.ModificarProductoFotoMostrar('${jsonNeiner}')></td></tr>`;
                            }

                        });

                        tabla+="</table>";

                        (<HTMLInputElement>document.getElementById('divTabla')).innerHTML = tabla;
                    }
                }
            };
        }

        //////////////////////////////////////////////////////////////////////////////////Parte 2
        public EliminarProducto(json : string)
        {
            Manejadora.EliminarProducto(json);
        }

        public static EliminarProducto(json : string)
        {
            var opcion = confirm("Seleccione si desea eliminar el producto");

            if (opcion == true) 
            {
                const xhr = new XMLHttpRequest();
                xhr.open("POST", "./Backend/EliminarProductoEnvasado.php");
                xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");

                xhr.onreadystatechange = ():void => {

                if (xhr.readyState === 4)
                {
                    if (xhr.status === 200)
                    {
                        alert(xhr.responseText);
                        console.log(xhr.responseText);
                        Manejadora.MostrarProductosEnvasados();
                    }
                }
                };

                xhr.send('producto_json=' + json);
            } 
            else 
            {
                alert("Se cancelo la eliminacion...");
            }
        }

        public ModificarProducto()
        {
           Manejadora.ModificarProducto();
        }

        public static ModificarProducto()
        {
            let nombreD = (<HTMLInputElement> document.getElementById("nombre")).value;
            let origenD = (<HTMLInputElement> document.getElementById("cboOrigen")).value;
            let codigoBarraD = (<HTMLInputElement> document.getElementById("codigoBarra")).value;
            let idD = parseInt((<HTMLInputElement> document.getElementById("idProducto")).value);
            let precioD = parseInt((<HTMLInputElement> document.getElementById("precio")).value);

            const obj = {nombre: nombreD, id: idD, origen: origenD, codigoBarra: codigoBarraD, precio: precioD};

            const xhr = new XMLHttpRequest();
            xhr.open("POST", "./Backend/ModificarProductoEnvadado.php");
            xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");

            xhr.onreadystatechange = ():void => {

            if (xhr.readyState === 4)
            {
                if (xhr.status === 200)
                {
                    let mensaje = JSON.parse(xhr.responseText);

                    if(mensaje.retorno)
                    {
                        alert(mensaje.mensaje);
                        Manejadora.MostrarProductosEnvasados();
                    }
                    else
                    {
                        alert(mensaje.mensaje);
                        console.log(mensaje.mensaje);
                    }
                }
            }
            };

            xhr.send('producto_json=' + JSON.stringify(obj));
        }

        public static ModificarProductoMostrar(json : string)
        {
            let producto : Entidades.ProductoEnvasado = JSON.parse(json);

            (<HTMLInputElement> document.getElementById("idProducto")).value = producto.id.toString();
            (<HTMLInputElement> document.getElementById("nombre")).value = producto.nombre;
            (<HTMLInputElement> document.getElementById("codigoBarra")).value = producto.codigoBarra.toString();
            (<HTMLInputElement> document.getElementById("precio")).value = producto.precio.toString();
            (<HTMLInputElement> document.getElementById("cboOrigen")).value = producto.origen.toString();
        }















       

        public AgregarProductoFoto()
        {
            Manejadora.AgregarProductoFoto();
        }

        public static AgregarProductoFoto()
        {
            let nombre:string = (<HTMLInputElement> document.getElementById("nombre")).value;
            let origen:string = (<HTMLInputElement> document.getElementById("cboOrigen")).value;
            let txtPrecio: string = (<HTMLInputElement> document.getElementById("precio")).value;
            let codigoBarras: string = (<HTMLInputElement> document.getElementById("codigoBarra")).value;
            let foto : any = (<HTMLInputElement> document.getElementById("foto"));

            const xhr = new XMLHttpRequest();
            xhr.open("POST", "./Backend/AgregarProductoEnvasado.php");

            let form = new FormData();
            form.append("nombre",nombre);
            form.append("origen",origen);
            form.append("precio",txtPrecio);
            form.append("codigoBarra",codigoBarras);
            form.append("foto",foto.files[0]);

            xhr.onreadystatechange = ():void => 
            {
                if (xhr.readyState === 4)
                {
                    if (xhr.status === 200)
                    {
                        alert(xhr.responseText);
                        console.log(xhr.responseText);
                        Manejadora.MostrarProductosEnvasados();
                    }
                }
            }
            
            xhr.send(form);
        }

        public VerificarProductoEnvasado()
        {
            Manejadora.VerificarProductoEnvasado();
        }

        public static VerificarProductoEnvasado()
        {
            let nombreD: string = (<HTMLInputElement> document.getElementById("nombre")).value;
            let origenD: string = (<HTMLInputElement> document.getElementById("cboOrigen")).value;

            const xhr = new XMLHttpRequest();
            xhr.open("POST","./BACKEND/VerificarProductoEnvasado.php");
            xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");

            xhr.onreadystatechange = ():void => {

                if (xhr.readyState === 4)
                {
                    if (xhr.status === 200)
                    {
                        const obj = JSON.parse(xhr.responseText);

                        if(obj == "({})")
                        {
                            console.log("No se encontro en la base de datos...");
                        }
                        else
                        {
                            console.log("Exito al encontrar el producto en la base de datos...");
                        }

                        (<HTMLInputElement>document.getElementById('divInfo')).innerHTML = obj;
                    }
                }
            };

            const obj = {nombre: nombreD, origen: origenD};
            xhr.send('obj_producto=' + JSON.stringify(obj));
        }

        public BorrarProductoFoto(json : string)
        {
            Manejadora.BorrarProductoFoto(json);
        }

        public static BorrarProductoFoto(json : string)
        {
            let producto : Entidades.ProductoEnvasado = JSON.parse(json);

            var opcion = confirm("Seleccione si desea eliminar el producto nombre: " + producto.nombre + " - origen: " + producto.origen);

            if (opcion == true) 
            {
                const xhr = new XMLHttpRequest();
                xhr.open("POST", "./Backend/BorrarProductoEnvasado.php");
                xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");

                xhr.onreadystatechange = ():void => {

                if (xhr.readyState === 4)
                {
                    if (xhr.status === 200)
                    {
                        alert(xhr.responseText);
                        console.log(xhr.responseText);
                        Manejadora.MostrarProductosEnvasados();
                    }
                }
                };

                xhr.send('producto_json=' + json);
            } 
            else 
            {
                alert("Se cancelo la eliminacion...");
            }
        }

        public ModificarProductoFoto()
        {
            Manejadora.ModificarProductoFoto();
        }

        public static ModificarProductoFoto()
        {
            let id:string = (<HTMLInputElement> document.getElementById("idProducto")).value;
            let nombre:string = (<HTMLInputElement> document.getElementById("nombre")).value;
            let origen:string = (<HTMLInputElement> document.getElementById("cboOrigen")).value;
            let txtPrecio: string = (<HTMLInputElement> document.getElementById("precio")).value;
            let codigoBarras: string = (<HTMLInputElement> document.getElementById("codigoBarra")).value;
            let foto : any = (<HTMLInputElement> document.getElementById("foto"));

            const xhr = new XMLHttpRequest();
            xhr.open("POST", "./Backend/ModificarProductoEnvadadoFoto.php");

            let json = {nombre: nombre, id: id, origen: origen, precio: txtPrecio, codigoBarra: codigoBarras};

            let form = new FormData();
            form.append("producto_json",JSON.stringify(json));
            form.append("foto",foto.files[0]);

            xhr.onreadystatechange = ():void => 
            {
                if (xhr.readyState === 4)
                {
                    if (xhr.status === 200)
                    {
                        console.log(xhr.responseText);

                        let jsonRespuesta = JSON.parse(xhr.responseText);
                        
                        if(jsonRespuesta.exito)
                        {
                            Manejadora.MostrarProductosEnvasados();
                        }
                        else
                        {
                            alert(xhr.responseText);
                            console.log(xhr.responseText);
                        }
                    }
                }
            }
            xhr.send(form);
        }

        public static ModificarProductoFotoMostrar(json : string)
        {
            let producto : Entidades.ProductoEnvasado = JSON.parse(json);

            (<HTMLInputElement> document.getElementById("idProducto")).value = producto.id.toString();
            (<HTMLInputElement> document.getElementById("nombre")).value = producto.nombre;
            (<HTMLInputElement> document.getElementById("codigoBarra")).value = producto.codigoBarra.toString();
            (<HTMLInputElement> document.getElementById("precio")).value = producto.precio.toString();
            (<HTMLInputElement> document.getElementById("cboOrigen")).value = producto.origen.toString();
        }















       

        public MostrarBorradosJSON()
        {
            Manejadora.MostrarBorradosJSON();
        }

        public static MostrarBorradosJSON()
        {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "./Backend/MostrarBorradosJSON.php");
            xhr.send();

            xhr.onreadystatechange = ():void => {

                if (xhr.readyState === 4)
                {
                    if (xhr.status === 200)
                    {
                        (<HTMLInputElement>document.getElementById('divInfo')).innerHTML = xhr.responseText;
                    }
                }
            };
        }

        public MostrarFotosModificados()
        {
            Manejadora.MostrarFotosModificados();
        }

        public static MostrarFotosModificados()
        {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "./Backend/MostrarFotosDeModificados.php");
            xhr.send();

            xhr.onreadystatechange = ():void => {

                if (xhr.readyState === 4)
                {
                    if (xhr.status === 200)
                    {
                        (<HTMLInputElement>document.getElementById('divTabla')).innerHTML = xhr.responseText;
                    }
                }
            };
        }

        public FiltrarListado()
        {
            Manejadora.FiltrarListado();
        }

        public static FiltrarListado()
        {
            let nombreD = (<HTMLInputElement> document.getElementById("nombre")).value;
            let origenD = (<HTMLInputElement> document.getElementById("cboOrigen")).value;

            const xhr = new XMLHttpRequest();
            xhr.open("POST", "./Backend/FiltrarProductos.php");
            xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");

            xhr.onreadystatechange = ():void => {

            if (xhr.readyState === 4)
            {
                if (xhr.status === 200)
                {
                    (<HTMLInputElement>document.getElementById('divTabla')).innerHTML = xhr.responseText;
                    alert("Vamos river!!!");
                }
            }
            };

            xhr.send('nombre=' + nombreD + '&origen=' + origenD);
        }
    }
}