"use strict";
// Rover Object Goes Here
// ======================

// ======================
function turnLeft(rover) {
    console.log("turnLeft was called!");
}

function turnRight(rover) {
    console.log("turnRight was called!");
}

function moveForward(rover) {
    console.log("moveForward was called")
}


function getNewDireccion(direccionActual, tipoMovimiento) {
    let listaDireccion = ['W', 'N', 'E', 'S'];

    if (tipoMovimiento === 'forward' || tipoMovimiento === 'f') {
        return direccionActual;
    }


    let indexDir = listaDireccion.findIndex(function (letra) {
        return letra === direccionActual;
    });

    let newIndex = 0;
    if (tipoMovimiento === 'turnLeft' || tipoMovimiento === 'l') {
        newIndex = indexDir - 1;
    } else if(tipoMovimiento==='turnRight' || tipoMovimiento==='r'){
        newIndex = indexDir + 1;
    }else{

    }

    if (newIndex < 0) {
        newIndex = 3;
    }

    if (newIndex > 3) {
        newIndex = 0;
    }

    return listaDireccion[newIndex];
}

//direcciones para facil usar console
var l = 'l';
var f = 'f';
var r = 'r';

var rover = {
    direccion: 'N',
    posicion: {
        x: 0,
        y: 0
    },
    posicionOld: {
        x: 0,
        y: 0
    },
    historialMovimientos: [],
    travelLog: [],
    mover: function (tipoMovimiento) {

        //guardar la posicion y el movimiento
        rover.historialMovimientos.push(tipoMovimiento);

        rover.posicionOld.x = rover.posicion.x;
        rover.posicionOld.y = rover.posicion.y;


        if (tipoMovimiento === 'forward' || tipoMovimiento === 'f') {
            //cambia la posicion

            if (rover.direccion === 'N') {
                rover.posicion.y++;
            } else if (rover.direccion === 'S') {
                rover.posicion.y--;
            } else if (rover.direccion === 'E') {
                rover.posicion.x++;
            } else if (rover.direccion === 'W') {
                rover.posicion.y++;
            }

        } else {
            //cambia la direccion
            rover.direccion = getNewDireccion(rover.direccion, tipoMovimiento);
        }

        console.log(tipoMovimiento + " was called!");
        console.log('Direccion ' + rover.direccion);
        console.log(rover.posicion);
        console.log(''); /* para una simple  salto*/


        //guardar historial de ubicaciones
        rover.travelLog.push({x: rover.posicion.x, y: rover.posicion.y});

        return rover;
    },
    moverConComandos: function (comandos) {

        comandos = comandos || '';
        if (comandos === '') {
            return;
        }

        let listaCodigo = comandos.split('');

        let listaMovimiento = listaCodigo.map(function (letra) {
            if(letra==='f'){
                return 'forward'
            }else if (letra==='l') {
                return 'turnLeft';
            }else if(letra==='r'){
                return 'turnRight';
            }else{
                return '';
            }
        });


        for (let i = 0; i < listaMovimiento.length ; i++) {
            let m =listaMovimiento[i];
            rover.mover(m);
        }


    },
    resetPosicion:function(){
        rover.direccion='N';
        rover.posicion.x=0;
        rover.posicion.y=0;
        rover.posicionOld.x=0;
        rover.posicionOld.y=0;
    }

};