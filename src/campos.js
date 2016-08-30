var campos = {
    cabecera: [
    {
        inicio: null,
        fin: null,
        tipo: '',
        etiqueta: 'GrpHdr',
        nivel: 1, // numero de cruces
        hijos: [
        {
            linea: '01',
            inicio: 124,
            fin: 158,
            tipo: 'simple',
            etiqueta: 'MsgId',
            nivel: 2
        },
        {
            linea: '01',
            inicio: 116,
            fin: 119,
            tipo: 'fechaActual',
            etiqueta: 'CreDtTm',
            nivel: 2
        },
        {
            linea: '99',
            inicio: 20,
            fin: 27,
            tipo: 'entero',
            etiqueta: 'NbOfTxs',
            nivel: 2
        },
        {
            linea: '99',
            inicio: 3,
            fin: 19,
            tipo: 'decimal',
            etiqueta: 'CtrlSum',
            nivel: 2
        },
        {
            inicio: null,
            fin: null,
            tipo: '',
            etiqueta: 'InitgPty',
            hijos: [
            {
                linea: '01',
                inicio: 46,
                fin: 115,
                tipo: 'simple',
                etiqueta: 'Nm',
                nivel: 3
            },
            {
                inicio: null,
                fin: null,
                tipo: '',
                etiqueta: 'Id',
                nivel: 3,
                hijos: [
                {
                    inicio: null,
                    fin: null,
                    tipo: '',
                    etiqueta: 'OrgId',
                    nivel: 4,
                    hijos: [
                    {
                        inicio: null,
                        fin: null,
                        tipo: '',
                        etiqueta: 'Othr',
                        nivel: 5,
                        hijos: [
                        {
                            linea: '01',
                            inicio: 11,
                            fin: 45,
                            tipo: 'simple',
                            etiqueta: 'Id',
                            nivel: 6
                        }]
                    }]
                }]
            }]
        }]
    }],

    cuerpo: [
    {
        inicio: null,
        fin: null,
        tipo: '',
        etiqueta: 'PmtInf',
        nivel: 1,
        hijos: [
        {
            linea: '02',
            inicio: 11,
            fin: 27,
            tipo: 'unico',
            etiqueta: 'PmtInfId',
            nivel: 2
        },
        {
            inicio: null,
            fin: null,
            tipo: 'literal',
            valor: 'DD',
            etiqueta: 'PmtMtd', // REVISAR JM. No has puesto ni línea ni inicio ni fin
            nivel: 2
        },
        {
            inicio: null,
            fin: null,
            tipo: 'literal',
            valor: 'true',
            etiqueta: 'BtchBookg', // REVISAR JM. No has puesto ni línea ni inicio ni fin
            nivel: 2
        },
        {
            inicio: null,
            fin: null,
            tipo: '',
            etiqueta: 'PmtTpInf',
            nivel: 2,
            hijos: [
            {
                inicio: null,
                fin: null,
                tipo: '',
                etiqueta: 'SvcLvl',
                nivel: 3,
                hijos: [
                {
                    inicio: null,
                    fin: null,
                    tipo: 'literal',
                    valor: 'SEPA',
                    etiqueta: 'Cd',
                    nivel: 4
                }]
            },
            {
                inicio: null,
                fin: null,
                tipo: '',
                etiqueta: 'LclInstrm',
                nivel: 3,
                hijos: [
                {
                    inicio: null,
                    fin: null,
                    tipo: 'literal',
                    valor: 'CORE',
                    etiqueta: 'Cd',
                    nivel: 4
                }]
            },
            {

                inicio: null,
                fin: null,
                tipo: 'literal',
                valor: 'RCUR',
                etiqueta: 'SeqTp',
                nivel: 3
            }]
        },
        {
            linea: '02',
            inicio: 46,
            fin: 53,
            tipo: 'fechaParseada', // REPASAR DM LA FECHA LA COGE DEL FICHERO Y EL FORMATO ES AAAA-MM-DD
            etiqueta: 'ReqdColltnDt',
            nivel: 2
        },
        {
            inicio: null,
            fin: null,
            tipo: '',
            etiqueta: 'Cdtr',
            nivel: 2,
            hijos: [
            {
                linea: '02',
                inicio: 54,
                fin: 123,
                tipo: 'simple',
                etiqueta: 'Nm',
                nivel: 3
            }]
        },
        {
            inicio: null,
            fin: null,
            tipo: '',
            etiqueta: 'CdtrAcct',
            nivel: 2,
            hijos: [
            {
                inicio: null,
                fin: null,
                tipo: '',
                etiqueta: 'Id',
                nivel: 3,
                hijos: [
                {
                    linea: '02',
                    inicio: 266,
                    fin: 290,
                    tipo: 'simple',
                    etiqueta: 'IBAN',
                    nivel: 4


                }]
            },
            {
                Inicio: null, //REPASAR DM mirar si falta algun corchete, le he incluido nuevo
                fin: null,
                tipo: 'literal',
                valor: 'EUR',
                etiqueta: 'Ccy',
                nivel: 3
            }]
        },
        {
            inicio: null,
            fin: null,
            tipo: '',
            etiqueta: 'CdtrAgt',
            nivel: 2,
            hijos: [
            {
                inicio: null,
                fin: null,
                tipo: '',
                etiqueta: 'FinInstnId',
                nivel: 3,
                hijos: [
                {
                    linea: '02',
                    inicio: 270,
                    fin: 273,
                    tipo: 'convertirBic',
                    valor: 'NOTPROVIDED',
                    etiqueta: 'BIC',
                    nivel: 4
                }]
            }]
        },
        {
            inicio: null,
            fin: null,
            tipo: 'literal',
            valor: 'SLEV',
            etiqueta: 'ChrgBr',
            nivel: 2
        },
        {
            inicio: null,
            fin: null,
            tipo: '',
            etiqueta: 'CdtrSchmeId',
            nivel: 2,
            hijos: [
            {
                inicio: null,
                fin: null,
                tipo: '',
                etiqueta: 'Id',
                nivel: 3,
                hijos: [
                {
                    inicio: null,
                    fin: null,
                    tipo: '',
                    etiqueta: 'PrvtId',
                    nivel: 4,
                    hijos: [
                    {
                        inicio: null,
                        fin: null,
                        tipo: '',
                        etiqueta: 'Othr',
                        nivel: 5,
                        hijos: [
                        {
                            linea: '02',
                            inicio: 11,
                            fin: 45,
                            tipo: 'simple',
                            etiqueta: 'Id',
                            nivel: 6
                        },
                        {
                            inicio: null,
                            fin: null,
                            tipo: '',
                            etiqueta: 'SchmeNm',
                            nivel: 6,
                            hijos: [
                            {
                                inicio: null,
                                fin: null,
                                tipo: 'literal',
                                valor: 'SEPA',
                                etiqueta: 'Prtry',
                                nivel: 7
                            }]
                        }]
                    }]
                }]
            }]
        }]
    },
    {
        inicio: null,
        fin: null,
        tipo: '',
        etiqueta: 'DrctDbtTxInf',
        nivel: 2,
        hijos: [
        {
            inicio: null,
            fin: null,
            tipo: '',
            etiqueta: 'PmtId',
            nivel: 3,
            hijos: [
            {
                linea: '03',
                inicio: 46,
                fin: 80,
                tipo: 'simple',
                etiqueta: 'EndToEndId',
                nivel: 4
            }]
        },
        {
            linea: '03',
            inicio: 88,
            fin: 99,
            tipo: 'decimal',
            etiqueta: 'InstdAmt', // REVISAR JM . A partir de aquí no son hijos de PmtId
            atributos: 'Ccy="EUR"',
            nivel: 3
        },
        {
            inicio: null,
            fin: null,
            tipo: '',
            etiqueta: 'DrctDbtTx',
            nivel: 3,
            hijos: [
            {
                inicio: null,
                fin: null,
                tipo: '',
                etiqueta: 'MndtRltdInf',
                nivel: 4,
                hijos: [
                {
                    linea: '03',
                    inicio: 46,
                    fin: 80,
                    tipo: 'simple',
                    etiqueta: 'MndtId',
                    nivel: 5
                },
                {
                    inicio: null,
                    fin: null,
                    tipo: 'literal',
                    valor: '2009-10-31', //REVISAR JM. Este tipo no vale.Querías un literal? . La norma dice: Fecha en la que el deudor firmó el mandato
                    etiqueta: 'DtOfSgntr',
                    nivel: 5
                },
                {
                    inicio: null,
                    fin: null,
                    tipo: 'literal',
                    valor: 'false', // REVISAR JM. Este tipo no es posible. Querías literal?
                    etiqueta: 'AmdmntInd',
                    nivel: 5
                }]
            }]
        },
        {
            inicio: null,
            fin: null,
            tipo: '',
            etiqueta: 'DbtrAgt',
            nivel: 3,
            hijos: [
            {
                inicio: null,
                fin: null,
                tipo: '',
                etiqueta: 'FinInstnId',
                nivel: 4,
                hijos: [
                {
                    linea: '03',
                    inicio: 108,
                    fin: 118,
                    tipo: 'simple',
                    etiqueta: 'BIC',
                    nivel: 5
                }]
            }]
        },
        {
            inicio: null,
            fin: null,
            tipo: '',
            etiqueta: 'Dbtr',
            nivel: 3,
            hijos: [
            {
                linea: '03',
                inicio: 119,
                fin: 188,
                tipo: 'simple',
                etiqueta: 'Nm',
                nivel: 4
            }]
        },
        {
            inicio: null,
            fin: null,
            tipo: '',
            etiqueta: 'DbtrAcct',
            nivel: 3,
            hijos: [
            {
                inicio: null,
                fin: null,
                tipo: '',
                etiqueta: 'Id',
                nivel: 4,
                hijos: [
                {
                    linea: '03',
                    inicio: 404,
                    fin: 437,
                    tipo: 'simple',
                    etiqueta: 'IBAN',
                    nivel: 5
                }]
            }]
        },
        {
            inicio: null,
            fin: null,
            tipo: '',
            etiqueta: 'RmtInf',
            nivel: 3,
            hijos: [
            {
                linea: '03',
                inicio: 442,
                fin: 581,
                tipo: 'simple',
                etiqueta: 'Ustrd',
                nivel: 4
            }]
        }]
    }]
};
