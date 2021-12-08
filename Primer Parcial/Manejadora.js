///<reference path="./ProductoEnvasado.ts" />
var PrimerParcial;
(function (PrimerParcial) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        //////////////////////////////////////////////////////////////////////////////////Parte 1
        Manejadora.AgregarProductoJSON = function () {
            var nombre = document.getElementById("nombre").value;
            var origen = document.getElementById("cboOrigen").value;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "./Backend/AltaProductoJSON.php");
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var mensaje = JSON.parse(xhr.responseText);
                        alert(mensaje.mensaje);
                        console.log(xhr.responseText);
                    }
                }
            };
            xhr.send('nombre=' + nombre + '&origen=' + origen);
        };
        Manejadora.MostrarProductosJSON = function () {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "./Backend/ListadoProductosJSON.php");
            xhr.send();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var Decodificado = JSON.parse(xhr.responseText);
                        var tabla_1 = "<table><tr><th>Nombre</th><th>Origen</th></tr>";
                        Decodificado.forEach(function (element) {
                            tabla_1 += '<tr><td>' + element.nombre + '</td><td>' + element.origen + '</td></tr>';
                        });
                        tabla_1 += "</table>";
                        document.getElementById('divTabla').innerHTML = tabla_1;
                    }
                }
            };
        };
        Manejadora.VerificarProductoJSON = function () {
            var nombre = document.getElementById("nombre").value;
            var origen = document.getElementById("cboOrigen").value;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "./BACKEND/VerificarProductoJSON.php");
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var mensaje = JSON.parse(xhr.responseText);
                        alert(mensaje.mensaje);
                        console.log(xhr.responseText);
                    }
                }
            };
            xhr.send('nombre=' + nombre + '&origen=' + origen);
        };
        Manejadora.MostrarInfoCookie = function () {
            var nombre = document.getElementById("nombre").value;
            var origen = document.getElementById("cboOrigen").value;
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "./BACKEND/MostrarCookie.php?" + "nombre=" + nombre + "&origen=" + origen);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log(xhr.responseText);
                        document.getElementById("divInfo").innerHTML = xhr.responseText;
                    }
                }
            };
            xhr.send();
        };
        Manejadora.AgregarProductoSinFoto = function () {
            var txtOrigen = document.getElementById("cboOrigen").value;
            var txtNombre = document.getElementById("nombre").value;
            var txtPrecio = document.getElementById("precio").value;
            var codigoBarras = document.getElementById("codigoBarra").value;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "./Backend/AgregarProductoSinFoto.php");
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var mensaje = JSON.parse(xhr.responseText);
                        alert(mensaje.mensaje);
                        console.log(xhr.responseText);
                    }
                }
            };
            var myObj = {
                nombre: txtNombre,
                origen: txtOrigen,
                precio: txtPrecio,
                codigoBarra: codigoBarras
            };
            var json = JSON.stringify(myObj);
            xhr.send('producto_json=' + json);
        };
        Manejadora.MostrarProductosEnvasados = function () {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "./BACKEND/ListadoProductosEnvasados.php?tabla=json");
            xhr.send();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var Decodificado = JSON.parse(xhr.responseText);
                        var tabla_2 = "<table><tr><th>Nombre</th><th>Origen</th><th>Codigo</th><th>ID</th><th>Precio</th><th>Foto</th></tr>";
                        Decodificado.forEach(function (element) {
                            tabla_2 += '<tr><td>' + element.nombre + '</td><td>' + element.origen + '</td><td>' + element.codigoBarra + '</td><td>' + element.id + '</td><td>' + element.precio + '</td>';
                            if (element.pathFoto != "./productos/imagenes/" && element.pathFoto != "./productos/imagenes/vacio" && element.pathFoto != null) {
                                tabla_2 += '<td>' + "<img src='./Backend/" + element.pathFoto + "';width='50' height='50'>" + '</td>';
                            }
                            else {
                                tabla_2 += '<td>Sin foto</td>';
                            }
                            var jsonNeiner = JSON.stringify(element);
                            if (document.getElementById("hdnIdModificacion").value == "0") {
                                tabla_2 += "<td> <input type=\"button\" value=\"Eliminar\" class=\"btn btn-danger\" onclick=PrimerParcial.Manejadora.EliminarProducto('" + jsonNeiner + "')></td>";
                                tabla_2 += "<td> <input type=\"button\" value=\"Modificar\" class=\"btn btn-danger\" onclick=PrimerParcial.Manejadora.ModificarProductoMostrar('" + jsonNeiner + "')></td></tr>";
                            }
                            else {
                                tabla_2 += "<td> <input type=\"button\" value=\"Eliminar\" class=\"btn btn-danger\" onclick=PrimerParcial.Manejadora.BorrarProductoFoto('" + jsonNeiner + "')></td>";
                                tabla_2 += "<td> <input type=\"button\" value=\"Modificar\" class=\"btn btn-danger\" onclick=PrimerParcial.Manejadora.ModificarProductoFotoMostrar('" + jsonNeiner + "')></td></tr>";
                            }
                        });
                        tabla_2 += "</table>";
                        document.getElementById('divTabla').innerHTML = tabla_2;
                    }
                }
            };
        };
        //////////////////////////////////////////////////////////////////////////////////Parte 2
        Manejadora.prototype.EliminarProducto = function (json) {
            Manejadora.EliminarProducto(json);
        };
        Manejadora.EliminarProducto = function (json) {
            var opcion = confirm("Seleccione si desea eliminar el producto");
            if (opcion == true) {
                var xhr_1 = new XMLHttpRequest();
                xhr_1.open("POST", "./Backend/EliminarProductoEnvasado.php");
                xhr_1.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                xhr_1.onreadystatechange = function () {
                    if (xhr_1.readyState === 4) {
                        if (xhr_1.status === 200) {
                            alert(xhr_1.responseText);
                            console.log(xhr_1.responseText);
                            Manejadora.MostrarProductosEnvasados();
                        }
                    }
                };
                xhr_1.send('producto_json=' + json);
            }
            else {
                alert("Se cancelo la eliminacion...");
            }
        };
        Manejadora.prototype.ModificarProducto = function () {
            Manejadora.ModificarProducto();
        };
        Manejadora.ModificarProducto = function () {
            var nombreD = document.getElementById("nombre").value;
            var origenD = document.getElementById("cboOrigen").value;
            var codigoBarraD = document.getElementById("codigoBarra").value;
            var idD = parseInt(document.getElementById("idProducto").value);
            var precioD = parseInt(document.getElementById("precio").value);
            var obj = { nombre: nombreD, id: idD, origen: origenD, codigoBarra: codigoBarraD, precio: precioD };
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "./Backend/ModificarProductoEnvadado.php");
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var mensaje = JSON.parse(xhr.responseText);
                        if (mensaje.retorno) {
                            alert(mensaje.mensaje);
                            Manejadora.MostrarProductosEnvasados();
                        }
                        else {
                            alert(mensaje.mensaje);
                            console.log(mensaje.mensaje);
                        }
                    }
                }
            };
            xhr.send('producto_json=' + JSON.stringify(obj));
        };
        Manejadora.ModificarProductoMostrar = function (json) {
            var producto = JSON.parse(json);
            document.getElementById("idProducto").value = producto.id.toString();
            document.getElementById("nombre").value = producto.nombre;
            document.getElementById("codigoBarra").value = producto.codigoBarra.toString();
            document.getElementById("precio").value = producto.precio.toString();
            document.getElementById("cboOrigen").value = producto.origen.toString();
        };
        Manejadora.prototype.AgregarProductoFoto = function () {
            Manejadora.AgregarProductoFoto();
        };
        Manejadora.AgregarProductoFoto = function () {
            var nombre = document.getElementById("nombre").value;
            var origen = document.getElementById("cboOrigen").value;
            var txtPrecio = document.getElementById("precio").value;
            var codigoBarras = document.getElementById("codigoBarra").value;
            var foto = document.getElementById("foto");
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "./Backend/AgregarProductoEnvasado.php");
            var form = new FormData();
            form.append("nombre", nombre);
            form.append("origen", origen);
            form.append("precio", txtPrecio);
            form.append("codigoBarra", codigoBarras);
            form.append("foto", foto.files[0]);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        alert(xhr.responseText);
                        console.log(xhr.responseText);
                        Manejadora.MostrarProductosEnvasados();
                    }
                }
            };
            xhr.send(form);
        };
        Manejadora.prototype.VerificarProductoEnvasado = function () {
            Manejadora.VerificarProductoEnvasado();
        };
        Manejadora.VerificarProductoEnvasado = function () {
            var nombreD = document.getElementById("nombre").value;
            var origenD = document.getElementById("cboOrigen").value;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "./BACKEND/VerificarProductoEnvasado.php");
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var obj_1 = JSON.parse(xhr.responseText);
                        if (obj_1 == "({})") {
                            console.log("No se encontro en la base de datos...");
                        }
                        else {
                            console.log("Exito al encontrar el producto en la base de datos...");
                        }
                        document.getElementById('divInfo').innerHTML = obj_1;
                    }
                }
            };
            var obj = { nombre: nombreD, origen: origenD };
            xhr.send('obj_producto=' + JSON.stringify(obj));
        };
        Manejadora.prototype.BorrarProductoFoto = function (json) {
            Manejadora.BorrarProductoFoto(json);
        };
        Manejadora.BorrarProductoFoto = function (json) {
            var producto = JSON.parse(json);
            var opcion = confirm("Seleccione si desea eliminar el producto nombre: " + producto.nombre + " - origen: " + producto.origen);
            if (opcion == true) {
                var xhr_2 = new XMLHttpRequest();
                xhr_2.open("POST", "./Backend/BorrarProductoEnvasado.php");
                xhr_2.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                xhr_2.onreadystatechange = function () {
                    if (xhr_2.readyState === 4) {
                        if (xhr_2.status === 200) {
                            alert(xhr_2.responseText);
                            console.log(xhr_2.responseText);
                            Manejadora.MostrarProductosEnvasados();
                        }
                    }
                };
                xhr_2.send('producto_json=' + json);
            }
            else {
                alert("Se cancelo la eliminacion...");
            }
        };
        Manejadora.prototype.ModificarProductoFoto = function () {
            Manejadora.ModificarProductoFoto();
        };
        Manejadora.ModificarProductoFoto = function () {
            var id = document.getElementById("idProducto").value;
            var nombre = document.getElementById("nombre").value;
            var origen = document.getElementById("cboOrigen").value;
            var txtPrecio = document.getElementById("precio").value;
            var codigoBarras = document.getElementById("codigoBarra").value;
            var foto = document.getElementById("foto");
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "./Backend/ModificarProductoEnvadadoFoto.php");
            var json = { nombre: nombre, id: id, origen: origen, precio: txtPrecio, codigoBarra: codigoBarras };
            var form = new FormData();
            form.append("producto_json", JSON.stringify(json));
            form.append("foto", foto.files[0]);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log(xhr.responseText);
                        var jsonRespuesta = JSON.parse(xhr.responseText);
                        if (jsonRespuesta.exito) {
                            Manejadora.MostrarProductosEnvasados();
                        }
                        else {
                            alert(xhr.responseText);
                            console.log(xhr.responseText);
                        }
                    }
                }
            };
            xhr.send(form);
        };
        Manejadora.ModificarProductoFotoMostrar = function (json) {
            var producto = JSON.parse(json);
            document.getElementById("idProducto").value = producto.id.toString();
            document.getElementById("nombre").value = producto.nombre;
            document.getElementById("codigoBarra").value = producto.codigoBarra.toString();
            document.getElementById("precio").value = producto.precio.toString();
            document.getElementById("cboOrigen").value = producto.origen.toString();
        };
        Manejadora.prototype.MostrarBorradosJSON = function () {
            Manejadora.MostrarBorradosJSON();
        };
        Manejadora.MostrarBorradosJSON = function () {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "./Backend/MostrarBorradosJSON.php");
            xhr.send();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        document.getElementById('divInfo').innerHTML = xhr.responseText;
                    }
                }
            };
        };
        Manejadora.prototype.MostrarFotosModificados = function () {
            Manejadora.MostrarFotosModificados();
        };
        Manejadora.MostrarFotosModificados = function () {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "./Backend/MostrarFotosDeModificados.php");
            xhr.send();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        document.getElementById('divTabla').innerHTML = xhr.responseText;
                    }
                }
            };
        };
        Manejadora.prototype.FiltrarListado = function () {
            Manejadora.FiltrarListado();
        };
        Manejadora.FiltrarListado = function () {
            var nombreD = document.getElementById("nombre").value;
            var origenD = document.getElementById("cboOrigen").value;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "./Backend/FiltrarProductos.php");
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        document.getElementById('divTabla').innerHTML = xhr.responseText;
                        alert("Vamos river!!!");
                    }
                }
            };
            xhr.send('nombre=' + nombreD + '&origen=' + origenD);
        };
        return Manejadora;
    }());
    PrimerParcial.Manejadora = Manejadora;
})(PrimerParcial || (PrimerParcial = {}));
