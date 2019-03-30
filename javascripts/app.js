"use strict";


//direcciones para facil usar console
var l = 'turnLeft';
var f = 'forward';
var r = 'turnRight';
var b='backward';



function Rover(nombre, xinicio, yinicio, direccionInicial) {

    this.nombre = nombre;
    this.colorStyle='';


    this.isVerbose=true;

    this.direccion = direccionInicial || 'N';

    this.getNewDireccion = function (direccionActual, tipoMovimiento) {
        let listaDireccion = ['W', 'N', 'E', 'S'];

        if (tipoMovimiento === 'forward' || tipoMovimiento === 'backward') {
            return direccionActual;
        }


        let indexDir = listaDireccion.findIndex(function (letra) {
            return letra === direccionActual;
        });

        let newIndex = 0;
        if (tipoMovimiento === 'turnLeft') {
            newIndex = indexDir - 1;
        } else {
            newIndex = indexDir + 1;
        }

        if (newIndex < 0) {
            newIndex = 3;
        }

        if (newIndex > 3) {
            newIndex = 0;
        }

        return listaDireccion[newIndex];
    };

    this.posicion = {
        x: (xinicio || 0),
        y: (yinicio || 0)
    };

    this.historialMovimientos = [];
    this.travelLog = [];

    this.validarMovimiento = function (movimiento) {

        let listaMovPermitidos = ['forward', 'backward', 'turnLeft', 'turnRight'];

        let indexMov = listaMovPermitidos.findIndex(function (texto) {
            return texto === movimiento;
        });

        return indexMov>=0;
    };

    this.mover = function (tipoMovimiento) {

        //validar
        let isValid = this.validarMovimiento(tipoMovimiento);

        if (!isValid) {
            return this;
        }


        let dir = this.direccion;

        this.historialMovimientos.push(tipoMovimiento);


        if (tipoMovimiento === 'forward') {
            //cambia la posicion

            if (dir === 'N') {
                this.posicion.y++;
            } else if (dir === 'S') {
                this.posicion.y--;
            } else if (dir === 'E') {
                this.posicion.x++;
            } else if (dir === 'W') {
                this.posicion.x--;
            }

        } else if (tipoMovimiento === 'backward') {

            if (dir === 'N') {
                this.posicion.y--;
            } else if (dir === 'S') {
                this.posicion.y++;
            } else if (dir === 'E') {
                this.posicion.x--;
            } else if (dir === 'W') {
                this.posicion.x++;
            }

        } else {
            //cambia la direccion
            this.direccion = this.getNewDireccion(this.direccion, tipoMovimiento);
        }

        if(this.isVerbose){
            console.log(tipoMovimiento + " was called!");
            console.log('Direccion ' + this.direccion);
        }

        /* validar limites */

        this.posicion.x= (this.posicion.x<-10)?-10:this.posicion.x;
        this.posicion.x= (this.posicion.x>10)?10:this.posicion.x;
        this.posicion.y= (this.posicion.y)<-10?-10:this.posicion.y;
        this.posicion.y= (this.posicion.y)>10?10:this.posicion.y;


        if(this.isVerbose){
            console.log(this.posicion);
        }



        //guardar historial de ubicaciones
        this.travelLog.push({x: this.posicion.x, y: this.posicion.y});



        return this;
    };

    this.moverConComandos = function (comandos) {

        comandos = comandos || '';
        if (comandos === '') {
            return;
        }

        let listaCodigo = comandos.split('');


        for (let i = 0; i < listaCodigo.length; i++) {

            let letra = listaCodigo[i];
            let m = '';

            if (letra === 'f') {
                m = 'forward'
            } else if (letra === 'b') {
                m = 'backward';
            } else if (letra === 'l') {
                m = 'turnLeft';
            } else if (letra === 'r') {
                m = 'turnRight';
            } else {
                m = '';
            }

            this.mover(m);
        }


    };

    this.resetPosicion = function () {
        this.direccion = 'N';
        this.posicion.x = 0;
        this.posicion.y = 0;

    };


    this.randomPosicion=function(){

        let n1 =  Math.random() * 20 + -10;
        let n2 = Math.random() * 20 + -10;

        n1=parseInt(n1);
        n2=parseInt(n2);

        if(n1<-10){
            n1=-10
        }
        if(n1>10){
            n1=10;
        }

        if(n2<-10){
            n2=-10
        }
        if(n2>10){
            n2=10;
        }

        this.direccion = 'N';
        this.posicion.x = n1;
        this.posicion.y = n2;

    };

    this.setRandomColor=function(){

        let n1 =  Math.random() * 255;
        let n2 = Math.random() * 255;
        let n3 = Math.random() * 255;

        this.colorStyle='rgb('+ n1+','+n2+','+n3+')';

    }




}


var rover = new Rover('rover1');
var explorer = new Rover('explorer');