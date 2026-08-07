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

        bool firmaPropietario;

        bool firmaCliente;
    }

    mapping(uint256 => Contrato) public contratos;

    // ===================================================
    // EVENTOS
    // ===================================================

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

        uint256 indexed idContrato,

        address firmante,

        string tipoFirma

    );

    event PagoRegistrado(

        uint256 indexed idContrato,

        uint256 monto

    );

    event ContratoFinalizado(

        uint256 indexed idContrato

    );

    // ===================================================
    // CREAR CONTRATO
    // ===================================================

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

            estado: EstadoContrato.PENDIENTE_FIRMA,

            firmaPropietario: false,

            firmaCliente: false

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

    // ===================================================
    // FIRMA DEL PROPIETARIO
    // ===================================================

    function firmarPropietario(

        uint256 idContrato

    ) public {

        require(

            contratos[idContrato].idContrato != 0,

            "No existe."

        );

        require(

            contratos[idContrato].estado == EstadoContrato.PENDIENTE_FIRMA,

            "El contrato ya no admite firmas."

        );

        require(

            msg.sender == contratos[idContrato].propietario,

            "Solo el propietario puede firmar."

        );

        require(

            !contratos[idContrato].firmaPropietario,

            "El propietario ya firmo."

        );

        contratos[idContrato].firmaPropietario = true;

        emit ContratoFirmado(

            idContrato,

            msg.sender,

            "PROPIETARIO"

        );

        if (

            contratos[idContrato].firmaCliente

        ) {

            contratos[idContrato].estado = EstadoContrato.ACTIVO;

        }

    }

    // ===================================================
    // FIRMA DEL CLIENTE
    // ===================================================

    function firmarCliente(

        uint256 idContrato

    ) public {

        require(

            contratos[idContrato].idContrato != 0,

            "No existe."

        );

        require(

            contratos[idContrato].estado == EstadoContrato.PENDIENTE_FIRMA,

            "El contrato ya no admite firmas."

        );

        require(

            msg.sender == contratos[idContrato].cliente,

            "Solo el cliente puede firmar."

        );

        require(

            !contratos[idContrato].firmaCliente,

            "El cliente ya firmo."

        );

        contratos[idContrato].firmaCliente = true;

        emit ContratoFirmado(

            idContrato,

            msg.sender,

            "CLIENTE"

        );

        if (

            contratos[idContrato].firmaPropietario

        ) {

            contratos[idContrato].estado = EstadoContrato.ACTIVO;

        }

    }

    // ===================================================
    // REGISTRAR PAGO
    // ===================================================

    function registrarPago(

        uint256 idContrato,

        uint256 monto

    ) public {

        require(

            contratos[idContrato].idContrato != 0,

            "No existe."

        );

        require(

            contratos[idContrato].estado == EstadoContrato.ACTIVO,

            "El contrato aun no esta activo."

        );
        require(

            msg.sender == contratos[idContrato].cliente,

            "Solo el cliente puede registrar pagos."

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

    require(

        contratos[idContrato].estado == EstadoContrato.ACTIVO,

        "Solo un contrato activo puede finalizarse."

    );

    require(

        msg.sender == contratos[idContrato].propietario ||

        msg.sender == contratos[idContrato].cliente,

        "No autorizado."

    );

    contratos[idContrato].estado = EstadoContrato.FINALIZADO;

    emit ContratoFinalizado(

        idContrato

    );

}

    // ===================================================
    // CONSULTAR CONTRATO
    // ===================================================

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