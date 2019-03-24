describe("App", function() {

    // rober es global asi que no se necesita insanciar el objeto


    it("al girar 2 veces debera estar a 180°", function() {

        let tipodeMovimiento='r';
        rover.resetPosicion();
        rover.mover(tipodeMovimiento).mover(tipodeMovimiento);

        expect('S').toEqual(rover.direccion);
        //no cambio de posicion
        expect(0).toEqual(rover.posicion.x);
        expect(0).toEqual(rover.posicion.y);

    });


    it("al f , r , f  debera apuntar E y estar a  1,1", function() {


        rover.resetPosicion();
        rover.mover('f').mover('r').mover('f');

        expect('E').toEqual(rover.direccion);
        expect(1).toEqual(rover.posicion.x);
        expect(1).toEqual(rover.posicion.y);

    });

    it(" mover con el comando rrr nos debe dar posicion 0,0 (no se movio) y direccion W ", function() {

        rover.resetPosicion();
        rover.moverConComandos('rrr');

        expect('W').toEqual(rover.direccion);
        expect(0).toEqual(rover.posicion.x);
        expect(0).toEqual(rover.posicion.y);

    });

    it("al frf  debera apuntar E y estar a  1,1", function() {


        rover.resetPosicion();
        rover.moverConComandos('frf');

        expect('E').toEqual(rover.direccion);
        expect(1).toEqual(rover.posicion.x);
        expect(1).toEqual(rover.posicion.y);

    });


    it("al rrrrr  debera apuntar E y estar 0,0", function() {


        rover.resetPosicion();
        rover.moverConComandos('rrrrr');

        expect('E').toEqual(rover.direccion);
        expect(0).toEqual(rover.posicion.x);
        expect(0).toEqual(rover.posicion.y);

    });


    it("al lllll  debera apuntar W y estar 0,0", function() {


        rover.resetPosicion();
        rover.moverConComandos('lllll');

        expect('W').toEqual(rover.direccion);
        expect(0).toEqual(rover.posicion.x);
        expect(0).toEqual(rover.posicion.y);

    });

    it("al  avanza 5,gira derecha y avanza 5, gira derecha y avanza 5  fffffrfffffrfffff  debera apuntar S y estar 5,0 ", function() {


        rover.resetPosicion();
        rover.moverConComandos('fffffrfffffrfffff');

        expect('S').toEqual(rover.direccion);
        expect(5).toEqual(rover.posicion.x);
        expect(0).toEqual(rover.posicion.y);

    });




});