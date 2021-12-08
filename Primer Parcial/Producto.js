var Entidades;
(function (Entidades) {
    var Producto = /** @class */ (function () {
        function Producto(nombre, origen) {
            this.nombre = nombre;
            this.origen = origen;
        }
        Producto.prototype.toString = function () {
            return "nombre: " + this.nombre + ", origen: " + this.origen;
        };
        Producto.prototype.ToJSON = function () {
            return JSON.stringify("{ " + this.toString() + " }");
        };
        return Producto;
    }());
    Entidades.Producto = Producto;
})(Entidades || (Entidades = {}));
