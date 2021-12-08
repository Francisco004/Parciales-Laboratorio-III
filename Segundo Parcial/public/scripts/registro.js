/// <reference path="../node_modules/@types/jquery/index.d.ts" />
var SPL;
(function (SPL) {
    var URL = "http://SPP/";
    var Registro = /** @class */ (function () {
        function Registro() {
        }
        Registro.AltaUsuario = function () {
            var fotoReal = null;
            var correo = $("#txtCorreo").val();
            var nombre = $("#txtNombre").val();
            var perfil = $("#txtPerfil").val();
            var clave = $("#txtContraseña").val();
            var apellido = $("#txtApellido").val();
            var foto = document.getElementById("foto").files;
            if (foto != undefined && foto.length > 0) {
                fotoReal = foto[0];
            }
            var dato = {};
            dato.clave = clave;
            dato.correo = correo;
            dato.perfil = perfil;
            dato.nombre = nombre;
            dato.apellido = apellido;
            var form = new FormData();
            form.append("usuario", JSON.stringify(dato));
            form.append("foto", fotoReal);
            $.ajax({
                type: 'POST',
                url: URL + "usuarios",
                dataType: "json",
                contentType: false,
                processData: false,
                data: form,
                async: true
            })
                .done(function (resultado) {
                if (resultado.exito) {
                    window.location.replace(URL + "front-end-login");
                }
                else {
                    $("#errorRegistro").removeClass("hide");
                    $("#errorRegistro").html(resultado.mensaje);
                }
            })
                .fail(function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText);
                var resultado = JSON.parse(jqXHR.responseText);
                console.log(resultado);
                if (!resultado.exito) {
                    $("#errorRegistro").removeClass("hide");
                    $("#errorRegistro").html(resultado.mensaje);
                }
            });
        };
        return Registro;
    }());
    SPL.Registro = Registro;
})(SPL || (SPL = {}));
