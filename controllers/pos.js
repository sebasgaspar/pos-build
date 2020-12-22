const path = require('path');
const escpos = require('escpos');
// install escpos-usb adapter module manually
escpos.USB = require('escpos-usb');
// Select the adapter based on your printer type
const device = new escpos.USB(1155, 22339);

const options = { encoding: "GB18030" /* default */ }
// encoding is optional
const printer = new escpos.Printer(device, options);
// async function searchPrint(res) {
//     try {
//         const usbDevice = escpos.USB.findPrinter();
//         console.log(usbDevice);
//         this.device = new escpos.USB(1155, 22339);
//         this.printer = new escpos.Printer(device, options);

//         console.log( usbDevice['Device']['deviceDescripto']);
//     }
//     catch (e) {
//         console.log(e);
//         return res.status(500).json({
//             ok: false,
//             msg: 'No se ha detectado ninguna impresora'
//         })
//     }
// }

const printerInsert = async (req, res) => {
    try {
        const { placa, time, fecha } = req.body;
        await printIn(placa, time, fecha, res).catch(e => console.log(e));
        res.json({
            ok: true,
            msg: 'Ticket dispensado'
        })
    } catch (e) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
const printerOut = async (req, res) => {
    try {
        const { placa, entrada, salida, fecha, min, total, subtotal, iva, efectivo, cambio, i } = req.body;
        await printOut(placa, entrada, salida, fecha, min, total, subtotal, iva, efectivo, cambio, i, res).catch(e => console.log(e));
        res.json({
            ok: true,
            msg: 'Ticket dispensado'
        })
    } catch (e) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
const printerReport = async (req, res) => {
    try {
        const { report, total, iva, fecha } = req.body;
        await printReport(report, total, iva, fecha, res).catch(e => console.log(e));
        res.json({
            ok: true,
            msg: 'Ticket dispensado'
        })
    } catch (e) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
async function printIn(placa, time, fecha, res) {
    try {
        await device.open(function (error) {
            const tux1 = path.join(__dirname, '../assets/LOGO PARQUEO.png');
            const tux = path.join(__dirname, '../assets/Footer.png');

            escpos.Image.load(tux1, async function (img) {
                printer
                    .align('ct')
                    .size(0.001, 0.001)
                    .image(img, 'D24')
                    .then(
                        escpos.Image.load(tux, async function (img) {
                            printer.font('b')
                                .align('ct')
                                .marginBottom(10)
                                .style('B')
                                .size(1, 1)
                                .text('Manuel Cardenas')
                                .size(0.5, 0.5)
                                .style('NORMAL')
                                .text('NIT. 3.267.112-4')
                                .text('IVA Regimen Comun')
                                .size(1, 1)
                                .text('----------------------------')
                                .size(0.05, 0.05)
                                .text('Calle 3 #8-20 Tel. 8514246 Zipaquira')
                                .text('Horario de 7 a.m. a 7 p.m')
                                .marginBottom(5)
                                .style('B')
                                .size(1.5, 1.5)
                                .text(`Placa: ${placa}`)
                                .font('A')
                                .size(0.05, 0.05)
                                .table([" ", " "])
                                .tableCustom(
                                    [
                                        { text: "Tarifa", align: "LEFT", width: 0.23, style: 'B' },
                                        { text: "Carro VR HR $2.500", align: "RIGHT", width: 0.49 },
                                    ],
                                    [
                                        { text: "Entrada", align: "LEFT", width: 0.33, style: 'B' },
                                        { text: "1:18 PM", align: "RIGHT", width: 0.33 }
                                    ],
                                    { encoding: 'cp857', size: [0.05, 0.05] } // Optional
                                )
                                .tableCustom(
                                    [
                                        { text: "Entrada", align: "LEFT", width: 0.23, style: 'B' },
                                        { text: `${time} ${fecha}`, align: "RIGHT", width: 0.49 }
                                    ],
                                    [
                                        { text: "Entrada", align: "LEFT", width: 0.33, style: 'B' },
                                        { text: "1:18 PM", align: "RIGHT", width: 0.33 }
                                    ],
                                    { encoding: 'cp857', size: [0.05, 0.05] } // Optional
                                )
                                .feed(1)
                                .size(0.001, 0.001)
                                .image(img, 'D24')
                                .then(() => {
                                    printer
                                        .feed(2)
                                        .cut()
                                        .close();
                                })
                        })
                    );
            });
        });
    } catch (e) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
async function printOut(placa, entrada, salida, fecha, min, total, subtotal, iva, efectivo, cambio, i, res) {
    try {
        await device.open(function (error) {
            const tux1 = path.join(__dirname, '../assets/LOGO PARQUEO.png');
            const tux = path.join(__dirname, '../assets/Qubit1.png');

            escpos.Image.load(tux1, async function (img) {
                printer
                    .align('ct')
                    .size(0.001, 0.001)
                    .image(img, 'D24')
                    .then(
                        escpos.Image.load(tux, async function (img) {
                            printer.font('b')
                                .align('ct')
                                .marginBottom(10)
                                .style('B')
                                .size(1, 1)
                                .text('Manuel Cardenas')
                                .size(0.5, 0.5)
                                .style('NORMAL')
                                .text('NIT. 3.267.112-4')
                                .text('IVA Regimen Comun')
                                .size(1, 1)
                                .text('----------------------------')
                                .size(0.05, 0.05)
                                .text('Calle 3 #8-20 Tel. 8514246 Zipaquira')
                                .text('Horario de 7 a.m. a 7 p.m')
                                .marginBottom(5)
                                .style('B')
                                .size(1.5, 1.5)
                                .text(`Placa: ${placa}`)
                                .font('A')
                                .size(0.05, 0.05)
                                .table([" ", " "])
                                .tableCustom(
                                    [
                                        { text: "Tarifa", align: "LEFT", width: 0.23, style: 'B' },
                                        { text: "Carro VR HR $2.500", align: "RIGHT", width: 0.49 },
                                    ],
                                    [
                                        { text: "Entrada", align: "LEFT", width: 0.33, style: 'B' },
                                        { text: "1:18 PM", align: "RIGHT", width: 0.33 }
                                    ],
                                    { encoding: 'cp857', size: [0.05, 0.05] } // Optional
                                )
                                .tableCustom(
                                    [
                                        { text: "Entrada", align: "LEFT", width: 0.23, style: 'B' },
                                        { text: `${entrada} ${fecha}`, align: "RIGHT", width: 0.49 }
                                    ],
                                    [
                                        { text: "Entrada", align: "LEFT", width: 0.33, style: 'B' },
                                        { text: "1:18 PM", align: "RIGHT", width: 0.33 }
                                    ],
                                    { encoding: 'cp857', size: [0.05, 0.05] } // Optional
                                )
                                .tableCustom(
                                    [
                                        { text: "Salida", align: "LEFT", width: 0.23, style: 'B' },
                                        { text: `${salida} ${fecha}`, align: "RIGHT", width: 0.49 }
                                    ],
                                    [
                                        { text: "Entrada", align: "LEFT", width: 0.33, style: 'B' },
                                        { text: "1:18 PM", align: "RIGHT", width: 0.33 }
                                    ],
                                    { encoding: 'cp857', size: [0.05, 0.05] } // Optional
                                )
                                .table(["", "", ""])
                                .tableCustom(
                                    [
                                        { text: "Razon", align: "LEFT", width: 0.39, style: 'B' },
                                        { text: "Cantidad", align: "CENTER", width: 0.26, style: 'B' },
                                        { text: "Total", align: "RIGHT", width: 0.30, style: 'B' }
                                    ],
                                    [
                                        { text: "Entrada", align: "LEFT", width: 0.33, style: 'B' },
                                        { text: "1:18 PM", align: "RIGHT", width: 0.33 },
                                        { text: "1:18 PM", align: "RIGHT", width: 0.33 }
                                    ],
                                    { encoding: 'cp857', size: [0.05, 0.05] } // Optional
                                )
                                .tableCustom(
                                    [
                                        { text: "Parqueo vehiculo", align: "LEFT", width: 0.39, style: 'B' },
                                        { text: `${min} min`, align: "CENTER", width: 0.26 },
                                        { text: `${total}`, align: "RIGHT", width: 0.30 }
                                    ],
                                    [
                                        { text: "Entrada", align: "LEFT", width: 0.33, style: 'B' },
                                        { text: "1:18 PM", align: "RIGHT", width: 0.33 },
                                        { text: "1:18 PM", align: "RIGHT", width: 0.33 }
                                    ],
                                    { encoding: 'cp857', size: [0.05, 0.05] } // Optional
                                )
                                .font('B')
                                .size(1, 1)
                                .text('----------------------------')
                                .font('A')
                                .size(0.05, 0.05)
                                .table([" ", " "])
                                .tableCustom(
                                    [
                                        { text: "Subtotal", align: "LEFT", width: 0.43, style: 'B' },
                                        { text: `${subtotal}`, align: "RIGHT", width: 0.49 },
                                    ],
                                    [
                                        { text: "Entrada", align: "LEFT", width: 0.33, style: 'B' },
                                        { text: "1:18 PM", align: "RIGHT", width: 0.33 }
                                    ],
                                    { encoding: 'cp857', size: [0.05, 0.05] } // Optional
                                )
                                .tableCustom(
                                    [
                                        { text: "Valor IVA", align: "LEFT", width: 0.43, style: 'B' },
                                        { text: `${iva}`, align: "RIGHT", width: 0.49 }
                                    ],
                                    [
                                        { text: "Entrada", align: "LEFT", width: 0.33, style: 'B' },
                                        { text: "1:18 PM", align: "RIGHT", width: 0.33 }
                                    ],
                                    { encoding: 'cp857', size: [0.05, 0.05] } // Optional
                                )
                                .tableCustom(
                                    [
                                        { text: "Valor Total", align: "LEFT", width: 0.43, style: 'B' },
                                        { text: `${total}`, align: "RIGHT", width: 0.49 }
                                    ],
                                    [
                                        { text: "Entrada", align: "LEFT", width: 0.33, style: 'B' },
                                        { text: "1:18 PM", align: "RIGHT", width: 0.33 }
                                    ],
                                    { encoding: 'cp857', size: [0.05, 0.05] } // Optional
                                )
                                .font('B')
                                .size(1, 1)
                                .text('----------------------------')
                                .font('A')
                                .size(0.05, 0.05)
                                .table([" ", " "])
                                .tableCustom(
                                    [
                                        { text: "Efectivo", align: "LEFT", width: 0.23, style: 'B' },
                                        { text: `${efectivo}`, align: "RIGHT", width: 0.49 },
                                    ],
                                    [
                                        { text: "Entrada", align: "LEFT", width: 0.33, style: 'B' },
                                        { text: "1:18 PM", align: "RIGHT", width: 0.33 }
                                    ],
                                    { encoding: 'cp857', size: [0.05, 0.05] } // Optional
                                )
                                .tableCustom(
                                    [
                                        { text: "Cambio", align: "LEFT", width: 0.23, style: 'B' },
                                        { text: `${cambio}`, align: "RIGHT", width: 0.49 }
                                    ],
                                    [
                                        { text: "Entrada", align: "LEFT", width: 0.33, style: 'B' },
                                        { text: "1:18 PM", align: "RIGHT", width: 0.33 }
                                    ],
                                    { encoding: 'cp857', size: [0.05, 0.05] } // Optional
                                )
                                .font('B')
                                .size(1, 1)
                                .text('----------------------------')
                                .size(0.5, 0.5)
                                .style('NORMAL')
                                .text('Numeracion habilitada y/o autorizada por la DIAN')
                                .text(`Modalidad: D.E. / P.O.S. Prefijo: 01M del No. ${i} al 10.000`)
                                .text('Resolucion 0042 del 05/05/2020')
                                .size(0.001, 0.001)
                                .image(img, 'D24')
                                .then(() => {
                                    printer
                                        .feed(2)
                                        .cut()
                                        .close();
                                })
                        })
                    );
            });
        });
    } catch (e) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
async function printReport(report, total, iva, fecha, res) {
    try {
        await device.open(function (error) {
            const tux1 = path.join(__dirname, '../assets/LOGO PARQUEO.png');
            const tux = path.join(__dirname, '../assets/Qubit1.png');

            escpos.Image.load(tux1, async function (img) {
                printer
                    .align('ct')
                    .size(0.001, 0.001)
                    .image(img, 'D24')
                    .then(
                        printer.font('b')
                            .align('ct')
                            .marginBottom(10)
                            .style('B')
                            .size(1, 1)
                            .text('Manuel Cardenas')
                            .size(0.5, 0.5)
                            .style('NORMAL')
                            .text('NIT. 3.267.112-4')
                            .text('IVA Regimen Comun')
                            .size(1, 1)
                            .text('----------------------------')
                            .marginBottom(5)
                            .style('B')
                            .size(1.5, 1.5)
                            .text(`Reporte: ${report}`)
                            .marginBottom(10)
                            .text(`Fecha: ${fecha}`)
                            .font('A')
                            .size(0.05, 0.05)
                            .table([" ", " "])
                            .tableCustom(
                                [
                                    { text: "Total", align: "LEFT", width: 0.23, style: 'B' },
                                    { text: `${total}`, align: "RIGHT", width: 0.49 },
                                ],
                                [
                                    { text: "Entrada", align: "LEFT", width: 0.33, style: 'B' },
                                    { text: "1:18 PM", align: "RIGHT", width: 0.33 }
                                ],
                                { encoding: 'cp857', size: [0.1, 0.1] } // Optional
                            )
                            .tableCustom(
                                [
                                    { text: "Iva", align: "LEFT", width: 0.23, style: 'B' },
                                    { text: `${iva}`, align: "RIGHT", width: 0.49 }
                                ],
                                [
                                    { text: "Entrada", align: "LEFT", width: 0.33, style: 'B' },
                                    { text: "1:18 PM", align: "RIGHT", width: 0.33 }
                                ],
                                { encoding: 'cp857', size: [0.1, 0.1] } // Optional
                            )
                            .feed(2)
                            .cut()
                            .close()
                    );
        });
    });
} catch (e) {
    return res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador'
    })
}
}

module.exports = {
    printerInsert,
    printerOut,
    printerReport
}