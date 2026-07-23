// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SmartRent {

    enum EstadoContrato {
        PENDIENTE_FIRMA,
        ACTIVO,
        FINALIZADO,
        CANCELADO
    }

    struct Contrato {

        uint256 idContrato;

        uint256 idInmueble;

        string tituloInmueble;

        address propietario;

        address cliente;

        uint256 monto;

        string tipoOperacion;

        EstadoContrato estado;
    }

    mapping(uint256 => Contrato) public contratos;

    event ContratoCreado(

        uint256 indexed idContrato,

        uint256 idInmueble,

        string tituloInmueble,

        address propietario,

        address cliente,

        uint256 monto,

        string tipoOperacion
    );

    event ContratoFirmado(

        uint256 indexed idContrato

    );

    event PagoRegistrado(

        uint256 indexed idContrato,

        uint256 monto

    );

    event ContratoFinalizado(

        uint256 indexed idContrato

    );

    function crearContrato(

        uint256 _idContrato,

        uint256 _idInmueble,

        string memory _titulo,

        address _propietario,

        address _cliente,

        uint256 _monto,

        string memory _tipoOperacion

    ) public {

        require(

            contratos[_idContrato].idContrato == 0,

            "El contrato ya existe."

        );

        contratos[_idContrato] = Contrato({

            idContrato: _idContrato,

            idInmueble: _idInmueble,

            tituloInmueble: _titulo,

            propietario: _propietario,

            cliente: _cliente,

            monto: _monto,

            tipoOperacion: _tipoOperacion,

            estado: EstadoContrato.PENDIENTE_FIRMA

        });

        emit ContratoCreado(

            _idContrato,

            _idInmueble,

            _titulo,

            _propietario,

            _cliente,

            _monto,

            _tipoOperacion

        );
    }

    function firmarContrato(

        uint256 idContrato

    ) public {

        require(

            contratos[idContrato].idContrato != 0,

            "No existe."

        );

        contratos[idContrato].estado = EstadoContrato.ACTIVO;

        emit ContratoFirmado(idContrato);
    }

    function registrarPago(

        uint256 idContrato,

        uint256 monto

    ) public {

        require(

            contratos[idContrato].idContrato != 0,

            "No existe."

        );

        emit PagoRegistrado(

            idContrato,

            monto

        );
    }

    function finalizarContrato(

        uint256 idContrato

    ) public {

        require(

            contratos[idContrato].idContrato != 0,

            "No existe."

        );

        contratos[idContrato].estado = EstadoContrato.FINALIZADO;

        emit ContratoFinalizado(

            idContrato

        );
    }

    function obtenerContrato(

        uint256 idContrato

    )

        public

        view

        returns (

            Contrato memory

        )

    {

        return contratos[idContrato];

    }

}