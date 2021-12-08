///<reference path="./Producto.ts" />

namespace Entidades
{
    export class ProductoEnvasado extends Producto
    {
        public id : number;
        public codigoBarra : string;
        public precio : number;
        public pathFoto : string;

        constructor (nombre : string, origen : string, id : number, codigoBarra : string, precio : number, pathFoto : string)
        {
            super(nombre, origen);

            this.id = id;
            this.codigoBarra = codigoBarra;
            this.precio = precio;
            this.pathFoto = pathFoto;
        }
        
        public ToJSON(): string 
        {
            return JSON.stringify("{ " + this.toString() + ",id: " + this.id + ", codigoBarra: " + this.codigoBarra + ", precio: " + this.precio+", pathFoto:" + this.pathFoto + " }");
        }
    }
}