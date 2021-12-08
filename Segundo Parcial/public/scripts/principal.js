var SPL;
(function (SPL) {
    var URL = "http://SPP/";
    var Principal = /** @class */ (function () {
        function Principal() {
        }
        Principal.MostrarUsuarios = function () {
            $.ajax({
                type: 'GET',
                url: URL,
                async: true
            })
                .done(function (resultado) {
                if (resultado.exito) {
                    var tabla = SPL.Principal.ArmarListaUsuarios(resultado);
                    $("#divUsuarios").html(tabla);
                }
                else {
                    $("#errorPrincipal").removeClass("hide");
                    $("#errorPrincipal").html(resultado.mensaje);
                }
            })
                .fail(function (jqXHR, textStatus, errorThrown) {
                var resultado = JSON.parse(jqXHR.responseText);
                if (!resultado.exito) {
                    if (resultado.status == 403) {
                        window.location.replace(URL + "/front-end-login");
                    }
                    $("#errorPrincipal").removeClass("hide");
                    $("#errorPrincipal").html(resultado.mensaje);
                    $("#divUsuarios").html(" ");
                }
            });
        };
        Principal.ArmarListaUsuarios = function (lista) {
            var dato = JSON.parse(lista.dato);
            var exitos = JSON.parse(lista.exito);
            var tabla = '<table class="table table-succes"><thead class="thead-succes"><tr><th>Correo</th><th>Nombre</th><th>Apellido</th><th>Perfil</th><th>Foto</th></tr></thead>';
            if (!exitos) {
                $('#errorPrincipal').removeClass("hide");
                var aux = document.getElementById("errorPrincipal");
                if (aux != null) {
                    aux.innerHTML = "No se puedo acceder a la tabla de usuarios!";
                }
            }
            else {
                for (var i = 0; i < dato.length; i++) {
                    tabla += "<tr><td>" + dato[i].correo;
                    tabla += "</td><td>" + dato[i].nombre;
                    tabla += "</td><td>" + dato[i].apellido;
                    tabla += "</td><td>" + dato[i].perfil;
                    tabla += "</td><td>";
                    var validacion = dato[i].foto[dato[i].foto.length - 1];
                    if (validacion != "." && validacion != " " && validacion != "o") {
                        tabla += "<img style='width: 50px; height: 50px;' src='." + dato[i].foto + "'>";
                    }
                    else {
                        tabla += "sin foto";
                    }
                    tabla += "<td><button class='btn btn-danger' onclick=" + 'SPL.Principal.EliminarUsuario(' + JSON.stringify(dato[i]) + ')' + ">Borrar</button></td><td><button class='btn btn-info' onclick=" + 'SPL.Principal.ModificarUsuario(' + JSON.stringify(dato[i]) + ')' + '>Modificar</button>' + "</td></tr>";
                    tabla += "</td></tr>";
                }
            }
            tabla += "</table>";
            return tabla;
        };
        Principal.EliminarUsuario = function (usuarios) {
            SPL.Principal.DivReset();
            if (confirm("Confirma para eliminar el usuario:\nNombre: " + usuarios.nombre + "\nApellido: " + usuarios.apellido + "\nPerfil: " + usuarios.perfil)) {
                var usuario = {
                    "id_usuario": usuarios.id
                };
                $.ajax({
                    type: 'POST',
                    url: URL + "users/delete",
                    dataType: 'json',
                    data: "usuario=" + JSON.stringify(usuario),
                    async: true
                })
                    .done(function (resultado) {
                    console.log(resultado);
                    if (resultado.exito) {
                        SPL.Principal.MostrarUsuarios();
                    }
                })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                    var retorno = JSON.parse(jqXHR.responseText);
                    if (!retorno.exito) {
                        if (retorno.status == 403) {
                            window.location.replace(URL + "/front-end-login");
                        }
                        $("#warning").removeClass("hide");
                        $("#warning").html(retorno.mensaje + '<button type="button" class="close" onclick="SPL.Principal.DivReset()">&times;</button>');
                        SPL.Principal.MostrarUsuarios();
                    }
                });
            }
        };
        Principal.MostrarAutos = function () {
            $.ajax({
                type: 'GET',
                url: URL + "autos",
                async: true
            })
                .done(function (resultado) {
                if (resultado.exito) {
                    var tabla = SPL.Principal.ArmarListaAutos(resultado);
                    $("#divAutos").html(tabla);
                }
            })
                .fail(function (jqXHR, textStatus, errorThrown) {
                var resultado = JSON.parse(jqXHR.responseText);
                console.log(resultado);
                if (!resultado.exito) {
                    if (resultado.status == 403) {
                        window.location.replace(URL + "/front-end-login");
                    }
                    $("#errorPrincipal").removeClass("hide");
                    $("#errorPrincipal").html(resultado.mensaje);
                    $("#divAutos").html(" ");
                }
            });
        };
        Principal.ArmarListaAutos = function (lista) {
            var dato = JSON.parse(lista.dato);
            var exitos = JSON.parse(lista.exito);
            var tabla = '<table class="table table-succes"><thead class="thead-succes"><tr><th>Color</th><th>Marca</th><th>Precio</th><th>Modelo</th><th>Eliminar</th><th>Modificar</th></tr></thead>';
            if (!exitos) {
                $('#errorPrincipal').removeClass("hide");
                var aux = document.getElementById("errorPrincipal");
                if (aux != null) {
                    aux.innerHTML = "No se puedo acceder a la tabla de autos!";
                }
                return "";
            }
            else {
                for (var i = 0; i < dato.length; i++) {
                    tabla += "<tr><td>" + dato[i].color;
                    tabla += "</td><td>" + dato[i].marca;
                    tabla += "</td><td>" + dato[i].precio;
                    tabla += "</td><td>" + dato[i].modelo;
                    tabla += "</td>";
                    tabla += "<td><button class='btn btn-danger' onclick=" + 'SPL.Principal.EliminarAuto(' + JSON.stringify(dato[i]) + ')' + ">Borrar</button></td><td><button class='btn btn-info' onclick=" + 'SPL.Principal.ModificarAuto(' + JSON.stringify(dato[i]) + ')' + '>Modificar</button>' + "</td></tr>";
                }
            }
            tabla += "</table>";
            return tabla;
        };
        Principal.DivReset = function () {
            $("#exito").html("");
            $("#warning").html("");
            $("#errorPrincipal").html("");
            $("#exito").addClass("hide");
            $("#warning").addClass("hide");
            $("#errorPrincipal").addClass("hide");
        };
        Principal.EliminarAuto = function (auto) {
            SPL.Principal.DivReset();
            if (confirm("Confirma para eliminar el auto:\nmodelo: " + auto.modelo + "\ncolor: " + auto.color + "\nmarca: " + auto.marca)) {
                $.ajax({
                    type: 'DELETE',
                    url: URL + "cars/" + auto.id,
                    dataType: 'json',
                    data: JSON.stringify(auto.id),
                    async: true
                })
                    .done(function (resultado) {
                    console.log(resultado);
                    if (resultado.exito) {
                        SPL.Principal.MostrarAutos();
                    }
                })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                    var resultado = JSON.parse(jqXHR.responseText);
                    console.log(resultado);
                    if (!resultado.exito) {
                        if (resultado.status == 403) {
                            window.location.replace(URL + "/front-end-login");
                        }
                        $("#warning").removeClass("hide");
                        $("#warning").html(resultado.mensaje + '<button type="button" class="close" onclick="SPL.Principal.DivReset()">&times;</button>');
                    }
                });
            }
        };
        Principal.ModificarUsuario = function (auto) {
            SPL.Principal.DivReset();
            SPL.Principal.CrearForm2("Modificar");
            $("#marca").val(auto.nombre);
            $("#color").val(auto.apellido);
            $("#divHidden").val(auto.id);
            $("#modelo").val(auto.perfil);
            $("#precio").val(auto.correo);
        };
        Principal.ModificarU = function () {
            SPL.Principal.DivReset();
            var color = $("#color").val();
            var marca = $("#marca").val();
            var id = $("#divHidden").val();
            var modelo = $("#modelo").val();
            var precio = $("#precio").val();
            var Usuario = {};
            Usuario.id = id;
            Usuario.color = color;
            Usuario.marca = marca;
            Usuario.precio = precio;
            Usuario.modelo = modelo;
            var json = '{"id_usuario": ' + Usuario.id + ', "correo":' + Usuario.color + ', "clave": ' + Usuario.marca + ', "nombre": ' + Usuario.precio + ', "apellido": ' + Usuario.modelo + '})';
            var xd = {
                id_usuario: Usuario.id,
                correo: Usuario.color,
                clave: Usuario.marca,
                nombre: Usuario.precio,
                apellido: Usuario.modelo
            };
            var form = new FormData();
            //let foto:any = (<HTMLInputElement>document.getElementById("foto")).files;
            form.append("foto", "null");
            //let fotovieja= foto;
            form.append("usuario", JSON.stringify(xd));
            $.ajax({
                type: 'POST',
                contentType: false,
                processData: false,
                data: form,
                url: URL + "users/edit",
                dataType: 'json',
                async: true
            })
                .done(function (resultado) {
                console.log(resultado);
                if (resultado.exito) {
                    SPL.Principal.MostrarUsuarios();
                }
            })
                .fail(function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.responseText);
                var resultado = JSON.parse(jqXHR.responseText);
                console.log(resultado);
                if (!resultado.exito) {
                    if (resultado.status == 403) {
                        window.location.replace(URL + "/front-end-login");
                    }
                    $("#warning").removeClass("hide");
                    $("#warning").html(resultado.mensaje + '<button type="button" class="close" onclick="SPL.Principal.DivReset()">&times;</button>');
                    SPL.Principal.MostrarUsuarios();
                }
            });
        };
        Principal.CrearForm2 = function (metodo) {
            SPL.Principal.DivReset();
            var form = '<form action="" id="loginForm" method="post" class="well form-horizontal col-md-6" style="background-color:darkcyan; margin-left:125px">' +
                '<div class="form-group">' +
                '<div class="col-md-12 inputGroupContainer">' +
                '<div class="input-group">' +
                '<span class="input-group-addon"><i class="fas fa-trademark"></i></span>' +
                '<input type="text" name="marca" id="marca" class="form-control" placeholder="Nombre">' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="form-group">' +
                '<div class="col-md-12 inputGroupContainer">' +
                '<div class="input-group">' +
                '<span class="input-group-addon"><i class="fas fa-palette"></i></span>' +
                '<input type="text" name="color" id="color" class="form-control" placeholder="Apellido">' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="form-group">' +
                '<div class="col-md-12 inputGroupContainer">' +
                '<div class="input-group">' +
                '<span class="input-group-addon"><i class="fas fa-car"></i></span>' +
                '<input type="text" name="modelo" id="modelo" class="form-control" placeholder="Perfil">' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="form-group">' +
                '<div class="col-md-12 inputGroupContainer">' +
                '<div class="input-group">' +
                '<span class="input-group-addon"><i class="fas fa-dollar-sign"></i></span>' +
                '<input type="text" name="precio" id="precio" class="form-control" placeholder="Email">' +
                '</div>' +
                '</div>' +
                '</div>';
            if (metodo == "Modificar") {
                form += '<div class="form-group">' +
                    '<label class="control-label col-md-1"></label>' +
                    '<button class="btn btn-success col-md-4" type="button" id="btnEnviar" onclick="SPL.Principal.ModificarU()">' +
                    'Modificar' +
                    '</button>' +
                    '<label class="control-label col-md-1"></label>' +
                    '<button class="btn btn-warning col-md-4" type="reset">' +
                    'Limpiar' +
                    '</button>';
            }
            form += '</div>' + '</form>';
            $("#divUsuarios").html(form);
        };
        Principal.ModificarAuto = function (auto) {
            SPL.Principal.DivReset();
            SPL.Principal.CrearForm("Modificar");
            $("#marca").val(auto.marca);
            $("#color").val(auto.color);
            $("#divHidden").val(auto.id);
            $("#modelo").val(auto.modelo);
            $("#precio").val(auto.precio);
        };
        Principal.Modificar = function () {
            SPL.Principal.DivReset();
            var color = $("#color").val();
            var marca = $("#marca").val();
            var id = $("#divHidden").val();
            var modelo = $("#modelo").val();
            var precio = $("#precio").val();
            var auto = {};
            auto.id = id;
            auto.color = color;
            auto.marca = marca;
            auto.precio = precio;
            auto.modelo = modelo;
            var json = JSON.stringify({ "id_auto": auto.id, "color": auto.color, "marca": auto.marca, "precio": auto.precio, "modelo": auto.modelo });
            $.ajax({
                type: 'PUT',
                url: URL + "cars/" + json,
                dataType: 'json',
                data: JSON.stringify(auto),
                async: true
            })
                .done(function (resultado) {
                console.log(resultado);
                if (resultado.exito) {
                    SPL.Principal.MostrarAutos();
                }
            })
                .fail(function (jqXHR, textStatus, errorThrown) {
                var resultado = JSON.parse(jqXHR.responseText);
                console.log(resultado);
                if (!resultado.exito) {
                    if (resultado.status == 403) {
                        window.location.replace(URL + "/front-end-login");
                    }
                    $("#warning").removeClass("hide");
                    $("#warning").html(resultado.mensaje + '<button type="button" class="close" onclick="SPL.Principal.DivReset()">&times;</button>');
                    SPL.Principal.MostrarAutos();
                }
            });
        };
        Principal.AltaAuto = function () {
            SPL.Principal.DivReset();
            var color = $("#color").val();
            var marca = $("#marca").val();
            var modelo = $("#modelo").val();
            var precio = $("#precio").val();
            var auto = {};
            auto.color = color;
            auto.marca = marca;
            auto.precio = precio;
            auto.modelo = modelo;
            var form = new FormData();
            form.append("auto", JSON.stringify(auto));
            $.ajax({
                type: 'POST',
                url: URL,
                dataType: 'json',
                contentType: false,
                processData: false,
                data: form,
                async: true
            })
                .done(function (resultado) {
                console.log(resultado);
                if (resultado.exito) {
                    $("#exito").removeClass("hide");
                    $("#exito").html(resultado.mensaje + '<button type="button" class="close" onclick="SPL.Principal.DivReset()">&times;</button>');
                }
            })
                .fail(function (jqXHR, textStatus, errorThrown) {
                var resultado = JSON.parse(jqXHR.responseText);
                console.log(resultado);
                if (!resultado.exito) {
                    $("#errorPrincipal").removeClass("hide");
                    $("#errorPrincipal").html(resultado.mensaje + '<button type="button" class="close" onclick="SPL.Principal.DivReset()">&times;</button>');
                }
            });
        };
        Principal.CrearForm = function (metodo) {
            SPL.Principal.DivReset();
            var form = '<form action="" id="loginForm" method="post" class="well form-horizontal col-md-6" style="background-color:darkcyan; margin-left:125px">' +
                '<div class="form-group">' +
                '<div class="col-md-12 inputGroupContainer">' +
                '<div class="input-group">' +
                '<span class="input-group-addon"><i class="fas fa-trademark"></i></span>' +
                '<input type="text" name="marca" id="marca" class="form-control" placeholder="Marca">' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="form-group">' +
                '<div class="col-md-12 inputGroupContainer">' +
                '<div class="input-group">' +
                '<span class="input-group-addon"><i class="fas fa-palette"></i></span>' +
                '<input type="text" name="color" id="color" class="form-control" placeholder="Color">' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="form-group">' +
                '<div class="col-md-12 inputGroupContainer">' +
                '<div class="input-group">' +
                '<span class="input-group-addon"><i class="fas fa-car"></i></span>' +
                '<input type="text" name="modelo" id="modelo" class="form-control" placeholder="Modelo">' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="form-group">' +
                '<div class="col-md-12 inputGroupContainer">' +
                '<div class="input-group">' +
                '<span class="input-group-addon"><i class="fas fa-dollar-sign"></i></span>' +
                '<input type="text" name="precio" id="precio" class="form-control" placeholder="Precio">' +
                '</div>' +
                '</div>' +
                '</div>';
            if (metodo == "Modificar") {
                form += '<div class="form-group">' +
                    '<label class="control-label col-md-1"></label>' +
                    '<button class="btn btn-success col-md-4" type="button" id="btnEnviar" onclick="SPL.Principal.Modificar()">' +
                    'Modificar' +
                    '</button>' +
                    '<label class="control-label col-md-1"></label>' +
                    '<button class="btn btn-warning col-md-4" type="reset">' +
                    'Limpiar' +
                    '</button>';
            }
            else {
                form += '<div class="form-group">' +
                    '<label class="control-label col-md-1"></label>' +
                    '<button class="btn btn-success col-md-4" type="button" id="btnEnviar" onclick="SPL.Principal.AltaAuto()">' +
                    'Agregar' +
                    '</button>' +
                    '<label class="control-label col-md-1"></label>' +
                    '<button class="btn btn-warning col-md-4" type="reset">' +
                    'Limpiar' +
                    '</button>';
            }
            form += '</div>' + '</form>';
            $("#divAutos").html(form);
        };
        return Principal;
    }());
    SPL.Principal = Principal;
})(SPL || (SPL = {}));
