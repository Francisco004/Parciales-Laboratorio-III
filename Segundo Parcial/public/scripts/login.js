/// <reference path="../node_modules/@types/jquery/index.d.ts" />
var SPL;
(function (SPL) {
    var URL = "http://SPP/";
    var Login = /** @class */ (function () {
        function Login() {
        }
        Login.Login = function () {
            var correo = $("#txtEmail").val();
            var clave = $("#txtContraseña").val();
            var dato = {};
            dato.correo = correo;
            dato.clave = clave;
            $.ajax({
                type: 'POST',
                url: URL + "login",
                dataType: "json",
                data: { "user": JSON.stringify(dato) },
                async: true
            })
                .done(function (resultado) {
                if (resultado.exito) {
                    window.location.replace(URL + "front-end-principal");
                }
                else if (resultado.status == 409) {
                    $("#errorLogin").removeClass("hide");
                    $("#errorLogin").html(resultado.mensaje);
                }
                else {
                    $("#errorLogin").removeClass("hide");
                    $("#errorLogin").html(resultado.mensaje);
                }
            })
                .fail(function (jqXHR, textStatus, errorThrown) {
                var resultado = JSON.parse(jqXHR.responseText);
                console.log(resultado);
                $("#errorLogin").removeClass("hide");
                $("#errorLogin").html(resultado.mensaje);
            });
        };
        Login.IrRegistro = function () {
            window.location.replace(URL + "front-end-registro");
        };
        return Login;
    }());
    SPL.Login = Login;
})(SPL || (SPL = {}));
