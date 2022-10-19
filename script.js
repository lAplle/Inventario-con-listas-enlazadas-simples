class Inventario{
    constructor(){
        this.primero = null;
    }
    agreR(nuevo,item){
        if(item.siguiente == null){
            let temp = this.primero;
            while (temp != null) {
                if (nuevo.codigo == temp.codigo) {
                    console.log('falo');
                    return false;
                }
                temp = temp.siguiente;
            }
            item.siguiente = nuevo;
        }else{
            this.agreR(nuevo, item.siguiente);
        }
    }
    agregar(nuevo){
        if(this.primero == null){
            this.primero = nuevo;
            this.primero.siguiente = null;
        }else{
            if (this.agreR(nuevo, this.primero) == false) {
                return false;
            }
            this.agreR(nuevo,this.primero)
        }
    }
        eliminar(codigo){
        if(this.primero == null){
            return false;
        }else if(this.primero.codigo == codigo){
            this.primero = this.primero.siguiente;
            return true;
        }
        let temp = this.primero;
        while(temp != null){
            if(temp.siguiente.codigo != codigo){
                temp = temp.siguiente;
            }else{
                temp.siguiente = temp.siguiente.siguiente;
                return true;
            }
        }
        return false;
    }
    insertar(posicion, nuevo){
        if(this.primero == null && posicion != 1){
            return false;
        }
        if(this.primero == null && posicion == 1){
            this.primero = nuevo;
            return true;
        }
        let temp = this.primero;
        let count = 1;
        while(temp != null){
            if(count == posicion && posicion == 1){
                this.primero = nuevo;
                nuevo.siguiente = temp;
                return true;
            } else if(count+1 == posicion){
                nuevo.siguiente = temp.siguiente;
                temp.siguiente = nuevo;
                return true;
            } else if(temp.siguiente == null && count < posicion){
                temp.siguiente = nuevo;
                nuevo.siguiente = null;
                return true;
            }
            temp = temp.siguiente;
            count++;
        }
        return false;
    }
    listar(){
        let list="";
        let temp = this.primero;
        while(temp != null){
            list += "<" + temp.codigo + "> Nombre: " + temp.nombre
            + " Costo: " + temp.costo + " Cantidad: " + temp.cantidad + "<br>";
            temp = temp.siguiente;
        }
        return list;
    }
    listarInverso(){
        let listadoInv="";
        let tempList = "";
        let temp = this.primero;
        while(temp != null){
            tempList = listadoInv;
            listadoInv = "";
            listadoInv += "<" + temp.codigo + "> Nombre: " + temp.nombre
            + " Costo: " + temp.costo + " Cantidad: " + temp.cantidad + "<br>" + tempList;
            
            temp = temp.siguiente;
        }
        return listadoInv;
        }
    buscar(codigo){
        if(this.primero == null){
            return false;
        }
        let temp = this.primero;
        while(temp != null){
            if(temp.codigo == codigo){
                return temp;
            }
            temp = temp.siguiente
        }
        return null;
    }
}
class Producto{
    constructor(codigo,nombre,cantidad,costo){
        this.codigo = codigo;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.costo = costo;
    }
}

const inventario = new Inventario();

const nombre = document.getElementById("nombre");
const codigo = document.getElementById("codigo");
const cantidad = document.getElementById("cantidad");
const precio = document.getElementById("precio");
const lista = document.getElementById("lista");
const busqueda = document.getElementById("busqueda");
const posicion = document.getElementById("posicion");

const btnBuscar = document.getElementById("buscar");
const btnListar = document.getElementById("listar");
const btnAgregar = document.getElementById("agregar")
const btnInsertar = document.getElementById("insertar");
const btnEliminar = document.getElementById("eliminar");
const btnInverso = document.getElementById("inverso");


btnListar.addEventListener("click",()=>{
let list = "";
list = inventario.listar()
if(list === ""){
    return lista.innerHTML = "0 registros al hilo.";
}
lista.innerHTML = inventario.listar();
})


// btnAgregar.addEventListener("click",()=>{
//     if(!codigo.value || !nombre.value || !cantidad.value || !precio.value){
//         return lista.innerHTML = "Datos faltantes...";
//     } else if(false == inventario.agregar(producto)){
//         return lista.innerHTML = "Código en uso...";
//     } else{
//         producto = new Producto(Number(codigo.value),nombre.value,cantidad.value,precio.value)
//         lista.innerHTML = inventario.listar();
//     }
// })

btnAgregar.addEventListener("click",()=>{
    if(!codigo.value || !nombre.value || !cantidad.value || !precio.value){
        return lista.innerHTML = "Faltan datos";
    } else{
        var producto = new Producto(Number(codigo.value),nombre.value,cantidad.value,precio.value)
    }
    if(inventario.agregar(producto) == false){
        return lista.innerHTML = "Ya existe el codigo";
    } else {
        lista.innerHTML = inventario.listar();
    }
})


btnInsertar.addEventListener("click",()=>{
    if(!codigo.value || !nombre.value || !cantidad.value || !precio.value){
        return lista.innerHTML = "Datos faltantes...";
    }else if(!posicion.value){
        return lista.innerHTML = "Posición requerida...";
    } else {
        producto = new Producto(Number(codigo.value),nombre.value,cantidad.value,precio.value)
        inventario.insertar(Number(posicion.value), producto); 
        lista.innerHTML = inventario.listar();
    }
})




btnBuscar.addEventListener("click",()=>{
    if(!busqueda.value){
        return lista.innerHTML = "Falta el código para buscar"
    }
    let objeto = inventario.buscar(busqueda.value);
    if(objeto === null){
        return lista.innerHTML = "No existe tal objeto";
    }
    nombre.value = objeto.nombre;
    codigo.value = objeto.codigo;
    precio.value = objeto.costo;
    cantidad.value = objeto.cantidad;
})
btnEliminar.addEventListener("click",()=>{
    if(!busqueda.value){
        return lista.innerHTML = "Y el código?"
    }
    if(null == inventario.eliminar(busqueda.value)){
        return lista.innerHTML = "No existe tal elemento";
    }
    lista.innerHTML = inventario.listar();
})
btnInverso.addEventListener("click",()=>{
    let listadoInv = "";
    listadoInv = inventario.listarInverso()
    if(listadoInv === ""){
        return lista.innerHTML = "No hay registros";
    }
    lista.innerHTML = inventario.listarInverso();
})