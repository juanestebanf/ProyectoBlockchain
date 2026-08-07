const PDFDocument = require("pdfkit");

class PdfService {

    generarContrato(contrato, res) {

        const doc = new PDFDocument({

            margin: 50

        });

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename=Contrato_${contrato.id}.pdf`
        );

        doc.pipe(res);

        doc.fontSize(22)
            .text("SMARTRENT", {
                align: "center"
            });

        doc.moveDown();

        doc.fontSize(18)
            .text(`Contrato #${contrato.id}`);

        doc.moveDown();

        doc.fontSize(12);

        doc.text(`Propietario: ${contrato.propietario}`);
        doc.text(`Cliente: ${contrato.cliente}`);

        doc.moveDown();

        doc.text(`Inmueble: ${contrato.titulo}`);
        doc.text(`Dirección: ${contrato.direccion}`);

        doc.moveDown();

        doc.text(`Monto: $${contrato.monto}`);
        doc.text(`Estado: ${contrato.estado}`);

        doc.moveDown();

        doc.text(`Fecha de creación: ${new Date(contrato.fecha_creacion).toLocaleString()}`);

        doc.moveDown();

        doc.text("Hash Blockchain:");

        doc.fontSize(10)
            .text(contrato.tx_hash || "Sin registrar");

        doc.moveDown();

        doc.fontSize(12)
            .text("Documento generado automáticamente por SmartRent.");

        doc.end();

    }

}

module.exports = new PdfService();