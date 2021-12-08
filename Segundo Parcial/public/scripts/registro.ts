/// <reference path="../node_modules/@types/jquery/index.d.ts" />
namespace SPL
{
    const URL:string = "http://SPP/";

    export class Registro
    {
        public static AltaUsuario()
        {
            let fotoReal = null;
            let correo = <string> $("#txtCorreo").val();
            let nombre = <string> $("#txtNombre").val();
            let perfil = <string> $("#txtPerfil").val();
            let clave = <string> $("#txtContraseña").val();
            let apellido = <string> $("#txtApellido").val();
            let foto = (<HTMLInputElement>document.getElementById("foto")).files;
            
            if(foto!=undefined && foto.length > 0)
            {
                fotoReal = foto[0];
            }

            let dato:any = {}; 
            dato.clave = clave;
            dato.correo = correo;
            dato.perfil = perfil;
            dato.nombre = nombre;
            dato.apellido = apellido;
            

            let form = new FormData();
            form.append("usuario", JSON.stringify(dato));
            form.append("foto", fotoReal);

            $.ajax(
            {
                type: 'POST',
                url: URL+"usuarios",
                dataType: "json",
                contentType: false,
                processData: false,
                data: form,
                async: true
            })
            .done(function (resultado:any)
            {     
                if(resultado.exito)
                {
                    window.location.replace(URL+"front-end-login");
                }
                else
                {
                    $("#errorRegistro").removeClass("hide");
                    $("#errorRegistro").html(resultado.mensaje);
                }
            })
            .fail(function (jqXHR:any, textStatus:any, errorThrown:any)
            {
                alert(jqXHR.responseText);
                let resultado = JSON.parse(jqXHR.responseText);
                console.log(resultado);
                
                if(!resultado.exito)
                {
                    $("#errorRegistro").removeClass("hide");
                    $("#errorRegistro").html(resultado.mensaje);
                }
            });
        }

        
    }
}