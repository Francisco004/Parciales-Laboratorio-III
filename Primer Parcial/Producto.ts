namespace Entidades
{
    export class Producto
    {
        public nombre : string;
        public origen : string;

        constructor (nombre : string, origen : string)
        {
            this.nombre = nombre;
            this.origen = origen;
        }

        public toString(): string 
        {
            return "nombre: " + this.nombre +", origen: " + this.origen;
        }

        public ToJSON(): string 
        {
            return JSON.stringify("{ " + this.toString() + " }");
        }
    }
}