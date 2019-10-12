import XLSX from 'xlsx';
import _filter from 'lodash/filter';
import moment from 'moment';

let excel = {};

let style = {
  border: {
    'top': {
      'style': 'hair',
      'color': {
        'rgb': 'DDDDDDDD'
      }
    },
    'left': {
      'style': 'hair',
      'color': {
        'rgb': 'DDDDDDDD'
      }
    },
    'right': {
      'style': 'hair',
      'color': {
        'rgb': 'DDDDDDDD'
      }
    },
    'bottom': {
      'style': 'hair',
      'color': {
        'rgb': 'DDDDDDDD'
      }
    }
  }
};

function datenum(v, date1904) {
  if (date1904) v += 1462;
  let epoch = Date.parse(v);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

function setWS(data) {
  let ws = {};
  let range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
  for (let R = 0; R !== data.length; ++R) {
    for (let C = 0; C !== data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;

      let row = (data[R][C]);

      let cell = { v: row.value };
      if (cell.v === null) continue;
      let cell_ref = XLSX.utils.encode_cell({ c: C, r: R });

      if (typeof cell.v === 'number') cell.t = 'n';
      else if (typeof cell.v === 'boolean') cell.t = 'b';
      else if (cell.v instanceof Date) {
        cell.t = 'n';
        cell.z = XLSX.SSF._table[14];
        cell.v = datenum(cell.v);
      }
      else cell.t = 's';

      if (row.style) {
        cell.s = row.style;
      }

      ws[cell_ref] = cell;
    }
  }

  if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
  return ws;
}

function Workbook() {
  if (!(this instanceof Workbook)) return new Workbook();
  this.SheetNames = [];
  this.Sheets = {};
}

function s2ab(s) {
  let buf = new ArrayBuffer(s.length);
  let view = new Uint8Array(buf);
  for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}

function resolveTable(table) {
  let result = [];

  // resolve subtitle
  if (table.title) {
    result.push([{
      value: table.title || '', style: {
        'font': {
          'sz': 18
        }
      }
    }]);
  }

  // resolve title
  if (table.subTitles) {
    table.subTitles.forEach((subTitle) => {
      result.push([{
        value: subTitle || '', style: {
          'font': {
            'sz': 14
          }
        }
      }]);
    });
  }

  let fields = [];

  let headerStyle = {
    'font': {
      'color': {
        'rgb': '000000'
      }
    },
    'fill': {
      'fgColor': {
        'rgb': 'ebebeb'
      }
    },
    'border': style.border
  };

  table.fields.forEach((field) => {
    fields.push({ value: field.title || 'Undefined', style: headerStyle });
  });

  result.push(fields);

  table.data.forEach((row) => {
    let tableRow = [];
    table.fields.forEach((field) => {
      let text;

      if (field.type === 'currency') {
        text = row[field.id] || '';
      } else if (field.type === 'date') {
        text = moment(row[field.id]).format('L');
      } else {
        text = row[field.id];
      }
      tableRow.push({
        value: text || '-', style: {
          'alignment': {
            'wrapText': 1,
            'horizontal': 'left',
            'vertical': 'center'
          },
          'border': style.border
        }
      });
    });

    result.push(tableRow);
  });

  let isFooterExist = _filter(table.fields, (f) => {
    return f.footer !== undefined;
  }).length > 0;

  // resolve footer
  if (isFooterExist) {
    let footers = [];
    table.fields.forEach((field) => {
      footers.push({ value: field.footer || '', style: headerStyle });
    });

    result.push(footers);
  }

  result.push([]);

  return result;
}

function resolveFormGroup(columns) {
  let cols = [];

  columns.forEach((col) => {
    col.forEach((child) => {
      if (!child.hidden) {
        let text;

        if (child.type === 'currency') {
          text = child.value || '';
        } else if (child.type === 'date') {
          text = moment(child.value).format('L');
        } else {
          text = child.value;
        }

        cols.push([
          { value: child.label }, { value: ':' }, { value: text }
        ]);
      }
    });
  });

  cols.push([]);

  return cols;
}

function resolveColGroup(columns) {
  let result = [];

  columns.forEach((col) => {
    col.forEach((col1) => {
      col1.forEach((col2, key2) => {
        if (!col2.hidden) {
          if (key2.toLowerCase() === 'formgroups') {
            result = result.concat(resolveFormGroup(col2));
          } else if (key2.toLowerCase() === 'table') {
            result = result.concat(resolveTable(col2));
          }
        }
      });
    });
  }
  );

  result.push([]);

  return result;
}

function resolveContent(content) {
  let result = [];

  content.forEach((val) => {
    result = result.concat(resolveChildContent(val));
  });

  return result;
}

function resolveChildContent(item) {
  let result = [];

  for (var key in item) {
    const val = item[key];
    if (key.toLowerCase() === 'title') {
      result.push([{
        value: val,
        style: {
          'font': {
            'sz': 24
          }
        }
      }]);
    } else if (key.toLowerCase() === 'subtitle') {
      result.push([{
        value: val,
        style: {
          'font': {
            'sz': 18
          }
        }
      }]);
    } else if (key.toLowerCase() === 'formgroups') {
      result = result.concat(resolveFormGroup(val));
    } else if (key.toLowerCase() === 'colgroups') {
      result = result.concat(resolveColGroup(val));
    } else if (key.toLowerCase() === 'table') {
      result = result.concat(resolveTable(val));
    } else if (key.toLowerCase() === 'break') {
      result.push([]);
    }
  }

  return result;
}

excel.generateDocDefinition = function (content, filename) {
  /* original data */
  let data = resolveContent(content);
  let ws_name = filename;

  let wb = new Workbook(), ws = setWS(data);

  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;

  return [s2ab(XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' }))];
};

export default excel;