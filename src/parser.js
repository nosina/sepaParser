  var Parser = {
      TIPO_JERARQUICO: '',
      TIPO_SIMPLE: 'simple', // String
      TIPO_FECHA_PARSEADA: 'fechaParseada',
      TIPO_FECHA_ACTUAL: 'fechaActual',
      TIPO_ENTERO: 'entero',
      TIPO_DECIMAL: 'decimal',
      TIPO_LITERAL: 'literal',
      TIPO_UNICO: 'unico',
      TIPO_CONVERTIR_BIC: 'convertirBic'
  };

  var XML_DECLARATION = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>';
  var XMLNS_OPEN_TAG = '<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.008.001.02" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';
  var XMLNS_CLOSE_TAG = '</Document>';
  var XML_ROOT_OPEN_TAG = '<CstmrDrctDbtInitn>';
  var XML_ROOT_CLOSE_TAG = '</CstmrDrctDbtInitn>';

  var aRegs = [
  {
      reg: '\ñ\g',
      rp: 'n'
  },
  {
      reg: '\Ñ\g',
      rp: 'N'
  },
  {
      reg: '\Ç\g',
      rp: 'C'
  },
  {
      reg: '\ç\g',
      rp: 'c'
  },
  {
      reg: '\&\g',
      rp: '&amp;'
  },
  {
      reg: '\<\g',
      rp: '&lt;'
  },
  {
      reg: '<\g',
      rp: '&gt;'
  },
  {
      reg: '\"\g',
      rp: '&quot;'
  },
  {
      reg: '\'\g',
      rp: '&apos;'
  }];

  var bics = {
      '0049': 'BSCHESMMXXX',
      '0081': 'BSABESBBXXX',
      '0182': 'BBVAESMMXXX',
      '2038': 'CAHMESMMXXX',
      '2085': 'CAZRES2ZXXX',
      '2100': 'CAIXESBBXXX'
  };



  function handleInputFiles(event)
  {
      var files = event;
      var numFiles = files.length;
      for (var i = 0; i < numFiles; i++)
      {
          var file = files[i];
          var reader = new FileReader();
          reader.onload = (function(loadedFile)
          {
              return function(event)
              {
                  parseFile(event.currentTarget.result, loadedFile);
              };

          })(file);
          reader.readAsText(file);
      }
  }

  function parseFile(inputText, file)
  {
      //console.log(inputText);
      //console.log(file);

      //Debería convertir el inputText en un array de filas
      var aInputText = inputText.split('\n');

      var outputText = XML_DECLARATION + XMLNS_OPEN_TAG;
      outputText += XML_ROOT_OPEN_TAG;
      outputText += generateXML(this.campos.cabecera[0], aInputText);
      var totalPI = getTotalPILines(aInputText);
      var totalDDTI = 0;
      for (var i = 0; i < totalPI; i++)
      {
          // por cada información del pago(PI)
          outputText += generateXML(this.campos.cuerpo[0], aInputText, i, totalDDTI, true);
          totalDDTI += getTotalDDTILines(i, aInputText);

      }

      outputText += XML_ROOT_CLOSE_TAG;
      outputText += XMLNS_CLOSE_TAG;
      console.log('parseFile\n' + outputText);
      // Leer un campo
      //leerCampo(this.campos.presentador, inputText);
      /////////////////TOCA COMPARAR CON UN ARCHIVO YA CONVERTIDO////////////
      ////////PROBAR DIFF CON DOS ARCHIVOS EN BOTÓN DERECHO







      exportFile(file, outputText);
  }

  function generateXML(item, aInputText, ocurrence, totalDDTILinesAcc, PIStart)
  {

      var outputText = '';
      if (item.etiqueta === 'DrctDbtTxInf')
      {
          totalDDTILinesAcc = totalDDTILinesAcc === undefined ? 0 : totalDDTILinesAcc;
          var totalDDTI = getTotalDDTILines(ocurrence, aInputText);
          for (var j = 0; j < totalDDTI; j++)
          {
              outputText += getOTag(item);
              for (var k = 0; k < item.hijos.length; k++)
              {
                  outputText += generateXML(item.hijos[k], aInputText, totalDDTILinesAcc + j);
              }
              outputText += getCTag(item);

          }
          return outputText;
      }
      outputText += getOTag(item);

      if (item.tipo !== Parser.TIPO_JERARQUICO)
      {
          // Implica que es de contenido
          outputText += getContent(item, aInputText, ocurrence);
          outputText += getCTag(item);

          console.log('outputText de contenido: ' + outputText);
      }
      else
      {
          if (!item.hijos)
          {
              console.log('Un jerárquico sin hijos: ' + item.etiqueta);
              return outputText;
          }
          for (var i = 0; i < item.hijos.length; i++)
          {
              outputText += generateXML(item.hijos[i], aInputText, ocurrence);

              console.log('outputText jerarjico: ' + outputText);
          }
          if (PIStart)
          {
              /**
               * Comienzo a leer desde campos[1] que es donde está la info de los DDTI
               */
              outputText += generateXML(this.campos.cuerpo[1], aInputText, ocurrence, totalDDTILinesAcc);

          }

          outputText += getCTag(item);
      }
      return outputText;

  }

  function getOTag(item)
  {

      return item.atributos ? '<' + item.etiqueta + ' ' + item.atributos + '>' : '<' + item.etiqueta + '>';
  }

  function getCTag(item)
  {
      return '</' + item.etiqueta + '>';
  }

  function getContent(item, aInputText, ocurrence)
  {
      // Aquí habrá que meter las funciones que sustituyen caracteres, tanto los prohibidos como los que vienen mal del fichero

      switch (item.tipo)
      {
          case Parser.TIPO_FECHA_ACTUAL:
              return new Date().toISOString().split('.')[0];
          case Parser.TIPO_FECHA_PARSEADA:
              return leerFecha(item, getRow(item.linea, aInputText, ocurrence)[0]);
          case Parser.TIPO_SIMPLE:
              return leerCampo(item, getRow(item.linea, aInputText, ocurrence)[0]);
          case Parser.TIPO_ENTERO:
              return parseInt(leerCampo(item, getRow(item.linea, aInputText, ocurrence)[0]));
          case Parser.TIPO_DECIMAL:
              return (parseFloat(leerCampo(item, getRow(item.linea, aInputText, ocurrence)[0])) / 100).toFixed(2);
          case Parser.TIPO_LITERAL:
              return cleanText(item.valor);
          case Parser.TIPO_UNICO:
              return leerCampo(item, getRow(item.linea, aInputText, ocurrence)[0]) + '-' + ocurrence;
          case Parser.TIPO_CONVERTIR_BIC:
              return bics[leerCampo(item, getRow(item.linea, aInputText, ocurrence)[0])];
      }



      return;
  }
  /**
   * Devuelve el contenido de la fila de aInputText que comienza por el rowId. Ha de ser la ocurrencia
   * ocurrence y se ponde a buscar desde fromLinNumber hasta toLineNumber.
   * También devuelve el índice de aInputText al que corresponde la fila.
   * ouput [row, lineIndex]
   */
  function getRow(rowId, aInputText, ocurrence, fromLineNumber, toLineNumber)
  {
      var row = null;
      ocurrence = ocurrence ? ocurrence : 0;
      fromLineNumber = fromLineNumber ? fromLineNumber : 0;
      toLineNumber = toLineNumber ? toLineNumber : aInputText.length;
      var i = 0;
      var lineIndex = 0;
      aInputText.some(function(currentValue, index, array)
      {
          if (index >= fromLineNumber && index <= toLineNumber)
          {
              if (currentValue.substring(0, 2) === rowId)
              {
                  if (ocurrence == i)
                  {
                      row = currentValue;
                      lineIndex = index;
                      return true;
                  }
                  else
                  {
                      i++;
                  }
              }
          }

      });
      return [row, lineIndex];
  }
  /**
   * Devuelve el número de líneas PI de aInpuntText
   */
  function getTotalPILines(aInputText)
  {
      var i = 0;
      while (getRow('02', aInputText, i)[0])
      {
          i++;
      }
      return i;
  }
  /**
   * Devuelve el número de líneas DDTI a partir de una ocurrencia de PI ( fromPILineOcurrence) determinada para aInputText
   */
  function getTotalDDTILines(fromPILineOcurrence, aInputText)
  {
      var i = 0;
      var fromPILineNumber = getRow('02', aInputText, fromPILineOcurrence)[1] + 1;
      var toPILine = getRow('04', aInputText, fromPILineOcurrence)[1];
      var total = toPILine - fromPILineNumber;
      // while (getRow('03', aInputText, i, fromPILineO-urrence, fromPILineNumber, toPILine)[0])
      // {
      //     i++;
      // }
      return total;

  }

  function leerFecha(campo, inputText)
  {
      var text = leerCampo(campo, inputText);
      return text.substring(0, 4) + '-' + text.substring(4, 6) + '-' + text.substring(6, 8);
  }

  function leerCampo(campo, inputText)
  {
      var text = inputText.substring(campo.inicio - 1, campo.fin);
      return cleanText(text);
  }

  function cleanText(text)
  {
      var filterReg = /[a-z]|[A-Z]|[0-9]|[\/]|[-]|[?]|[:]|[(]|[)]|[.]|[,]|[\']|[+]|[ ]/g;
      for (var i = 0; i < aRegs.length; i++)
      {
          text = text.replace(aRegs[i].reg, aRegs[i].rp);
      }
      text = text.match(filterReg).join('');
      text = text ? text.trim() : '';
      return text;
  }

  function exportFile(inputFile, content)
  {
      var outputFileName = inputFile.name.split('.')[0] + '.xml';
      var filerefToExport = 'data:application/txt;charset=utf-8,' + encodeURIComponent(content);
      var saveDom = document.getElementById('save');
      saveDom.href = filerefToExport;
      saveDom.target = '_blank';
      saveDom.download = outputFileName;
      saveDom.click();
  }
