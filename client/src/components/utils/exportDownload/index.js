import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import FileSaver from 'file-saver';
import Excel from './excel';
import Pdf from './pdf';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function base64ToByteArray(base64) {
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

function downloadExcel(content, filename) {
  var wbout = Excel.generateDocDefinition(content, filename);
  FileSaver.saveAs(new Blob(wbout, { type: 'application/octet-stream' }), filename + '.xlsx');
}

function excelByteArray(content, filename) {
  var wbout = Excel.generateDocDefinition(content, filename);
  var bytes = new Uint8Array(wbout[0]);
  var binary = '';
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  var base64 = window.btoa(binary);
  return base64ToByteArray(base64);
}

function downloadPdf(content, filename, orientation, pageSize) {
  var docDefinition = Pdf.generateDocDefinition(content, filename, orientation, pageSize);
  pdfMake.createPdf(docDefinition).download(filename + '.pdf');
}

function pdfByteArray(content, filename, orientation, pageSize) {
  var docDefinition = Pdf.generateDocDefinition(content, filename, orientation, pageSize);

  var deferred = new Promise(((resolve) => {
    pdfMake.createPdf(docDefinition).getBase64((encodedString) => {
      resolve(base64ToByteArray(encodedString));
    });
  }));

  return deferred;
}

function printPdf(content, filename, orientation, pageSize) {
  var docDefinition = Pdf.generateDocDefinition(content, filename, orientation, pageSize);
  pdfMake.createPdf(docDefinition).print();
}

export { downloadExcel, excelByteArray, downloadPdf, pdfByteArray, printPdf };