/* eslint-disable */
require('script-loader!file-saver');
require('script-loader!./Blob');
require('script-loader!xlsx-style/dist/xlsx.full.min.js');
// import XLSX from 'xlsx'
function generateArray(table) {
    var out = [];
    var rows = table.querySelectorAll('tr');
    var ranges = [];
    for (var R = 0; R < rows.length; ++R) {
        var outRow = [];
        var row = rows[R];
        var columns = row.querySelectorAll('td');
        for (var C = 0; C < columns.length; ++C) {
            var cell = columns[C];
            var colspan = cell.getAttribute('colspan');
            var rowspan = cell.getAttribute('rowspan');
            var cellValue = cell.innerText;
            if (cellValue !== "" && cellValue == +cellValue) cellValue = +cellValue;

            //Skip ranges
            ranges.forEach(function(range) {
                if (R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c) {
                    for (var i = 0; i <= range.e.c - range.s.c; ++i) outRow.push(null);
                }
            });

            //Handle Row Span
            if (rowspan || colspan) {
                rowspan = rowspan || 1;
                colspan = colspan || 1;
                ranges.push({ s: { r: R, c: outRow.length }, e: { r: R + rowspan - 1, c: outRow.length + colspan - 1 } });
            };

            //Handle Value
            outRow.push(cellValue !== "" ? cellValue : null);

            //Handle Colspan
            if (colspan)
                for (var k = 0; k < colspan - 1; ++k) outRow.push(null);
        }
        out.push(outRow);
    }
    return [out, ranges];
};

function datenum(v, date1904) {
    if (date1904) v += 1462;
    var epoch = Date.parse(v);
    return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}
/**
 *
 *
 * @export
 * @param {any} opts 表头
 * @param {any} data 表格数据
 */

function sheet_from_array_of_arrays(data, opts) {
    console.log('ncy', JSON.parse(JSON.stringify(data)), opts );
    var ws = {};
    var range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };

    for (var R = 0; R != data.length; ++R) {
        for (var C = 0; C != data[R].length; ++C) {
            if (range.s.r > R) range.s.r = R;
            if (range.s.c > C) range.s.c = C;
            if (range.e.r < R) range.e.r = R;
            if (range.e.c < C) range.e.c = C;
           // 当表头为 城市功能区环境声环境监测数据 时 
            if (opts === "城市功能区环境声环境监测数据" || opts === "城市道路交通声环境监测数据") {
                //  C 第几列 
                if (C === 2) {
                    var cell = { v: Number(data[R][C]) ? data[R][C] : data[R][C] }; // 需求 导出的如果是字符串类型的数字 不进行转化
                } else {
                    var cell = { v: Number(data[R][C]) ? Number(data[R][C]): data[R][C] }; //需求 导出的如果是字符串类型的数字转化为数值类型的数字
                }  
            }else if(opts=="酸雨监测结果报告表"){
                if (C === 5 || C === 6 || C === 7 || C === 8 || C === 10 || C === 11 || C === 12 || C === 13) {
                    var cell = { v:data[R][C] }; // 需求 不转换
                } else {
                    var cell = { v: Number(data[R][C]) ? Number(data[R][C]): data[R][C] }; //需求 导出的如果是字符串类型的数字转化为数值类型的数字
                } 
            } else {
                var cell = { v: Number(data[R][C]) ? Number(data[R][C]) : data[R][C] }; //需求 导出的如果是字符串类型的数字转化为数值类型的数字
            }
           
            if (cell.v == null) continue;
            var cell_ref = XLSX.utils.encode_cell({ c: C, r: R });

            if (typeof cell.v === 'number') cell.t = 'n';
            else if (typeof cell.v === 'boolean') cell.t = 'b';
            else if (cell.v instanceof Date) {
                cell.t = 'n';
                cell.z = XLSX.SSF._table[14];
                cell.v = datenum(cell.v);
            } else cell.t = 's';

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
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

export function export_table_to_excel(id) {
    var theTable = document.getElementById(id);
    var oo = generateArray(theTable);
    var ranges = oo[1];

    /* original data */
    var data = oo[0];
    var ws_name = "SheetJS";

    var wb = new Workbook(),
        ws = sheet_from_array_of_arrays(data);

    /* add ranges to worksheet */
    // ws['!cols'] = ['apple', 'banan'];
    ws['!merges'] = ranges;

    /* add worksheet to workbook */
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;

    var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: false, type: 'binary' });

    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "test.xlsx")
}
/**
 * 
 * 
 * @export
 * @param {any} th 表头
 * @param {any} jsonData 表格数据 
 * @param {any} defaultTitle 导出文件名称
 * @param {any} [merges=[]] 单元格合拼数据格式为[[0,0,0,0],[1,0,2,0]]---[开始列，开始取值范围，结束列，结束范围]
 */
export function export_json_to_excel(th, jsonData, defaultTitle, merges = [], cellColor = []) {
    /* original data */
    jsonData.map(item => {
        item.map((i, index) => {
            if (i == undefined) {
                item[index] = "";
            }
        })
    });
    var data = jsonData;
    data.unshift(th);
    var ws_name = defaultTitle;
    // console.log('当前数据ws_name', ws_name);
    

    var wb = new Workbook(),
        ws = sheet_from_array_of_arrays(data,ws_name);
    /*设置worksheet每列的最大宽度*/
    const colWidth = data.map(row => row.map(val => {
            /*先判断是否为null/undefined*/
            if (val == null || val == undefined) {
                return { 'wch': 15 };
            }
            /*再判断是否为中文*/
            else if (val.toString().charCodeAt(0) > 255) {
                return { 'wch': 15 };
            } else {
                return { 'wch': 15 };
            }
        }))
        /*以第一行为初始值*/
    let result = colWidth[0];
    for (let i = 1; i < colWidth.length; i++) {
        for (let j = 0; j < colWidth[i].length; j++) {
            if (result[j]['wch'] < colWidth[i][j]['wch']) {
                result[j]['wch'] = colWidth[i][j]['wch'];
            }
        }
    }
    ws['!cols'] = result;

    if (merges.length != 0) {
        let ergs = []
        merges.map(item => {
            ergs.push({ //合并第一行数据[B1,C1,D1,E1]
                s: { //s为开始
                    c: item[0], //开始列
                    r: item[1] //开始取值范围
                },
                e: { //e结束
                    c: item[2], //结束列
                    r: item[3] //结束范围
                }
            })
        });
        ws["!merges"] = ergs;
    }
    /* add worksheet to workbook */
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;
    for (var k in wb.Sheets[ws_name]) {
        if (!S(k).include('!')) {
            if (wb.Sheets[ws_name][k].v == '注：PM2.5、PM10、O3浓度单位μg/m3，优良天数比例为%') {
                wb.Sheets[ws_name][k].s = {
                    alignment: { vertical: 'center', horizontal: 'left' },
                    border: {
                        top: { style: 'thin', color: 'black' },
                        bottom: { style: 'thin', color: 'black' },
                        left: { style: 'thin', color: 'black' },
                        right: { style: 'thin', color: 'black' }
                    }
                };
            } else if (wb.Sheets[ws_name][k].v && (wb.Sheets[ws_name][k].v + '').substr(0, 4) == '数据类型') {
                wb.Sheets[ws_name][k].s = {
                    alignment: { vertical: 'center', horizontal: 'left' },
                    border: {
                        top: { style: 'thin', color: 'black' },
                        bottom: { style: 'thin', color: 'black' },
                        left: { style: 'thin', color: 'black' },
                        right: { style: 'thin', color: 'black' }
                    }
                };
            } else {
                wb.Sheets[ws_name][k].s = {
                    alignment: { vertical: 'center', horizontal: 'center' },
                    border: {
                        top: { style: 'thin', color: 'black' },
                        bottom: { style: 'thin', color: 'black' },
                        left: { style: 'thin', color: 'black' },
                        right: { style: 'thin', color: 'black' }
                    }
                };
            }
        }
    }
    cellColor.map(item => {
        var coor = coordinate(item.a);
        if (wb.Sheets[ws_name][coor] != undefined) {


            if (item.b != undefined && item.b != null && item.b != "") {
                wb.Sheets[ws_name][coor].s.fill = { bgColor: { indexed: 64 }, fgColor: { rgb: item.b } }
            }
            if (item.c != undefined && item.c != null && item.c != "") {
                wb.Sheets[ws_name][coor].s.font = { sz: 14, color: { rgb: item.c } }
                    // font: { sz: 14, bold: true, color: { rgb: "FFFFAA00" }
            }
        }
    })
    var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: false, type: 'binary' });
    var title = defaultTitle || 'excel-list'
    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), title + ".xlsx")
}

function coordinate(item) {
    var coordinate = "";
    if (!item == "") {
        var numb = item[0] / 26;
        if (numb < 1) {
            coordinate = AABB(item[0]) + item[1]
        } else {
            // for (let i = 0; i < parseInt(item[0] / 26); i++) {
            //     coordinate = (AABB(parseInt(item[0] / 26)-1) == 0 ? "A" : AABB(parseInt(item[0] / 26)-1)) + AABB(item[0] % 26) + item[1];
            // }
            coordinate = (AABB(parseInt(item[0] / 26) - 1) == 0 ? "A" : AABB(parseInt(item[0] / 26) - 1)) + AABB(item[0] % 26) + item[1];
        }
        return coordinate;
    }
}

function AABB(num) {
    switch (num) {
        case 0:
            num = "A"
            break;
        case 1:
            num = "B"
            break;
        case 2:
            num = "C"
            break;
        case 3:
            num = "D"
            break;
        case 4:
            num = "E"
            break;
        case 5:
            num = "F"
            break;
        case 6:
            num = "G"
            break;
        case 7:
            num = "H"
            break;
        case 8:
            num = "I"
            break;
        case 9:
            num = "J"
            break;
        case 10:
            num = "K"
            break;
        case 11:
            num = "L"
            break;
        case 12:
            num = "M"
            break;
        case 13:
            num = "N"
            break;
        case 14:
            num = "O"
            break;
        case 15:
            num = "P"
            break;
        case 16:
            num = "Q"
            break;
        case 17:
            num = "R"
            break;
        case 18:
            num = "S"
            break;
        case 19:
            num = "T"
            break;
        case 20:
            num = "U"
            break;
        case 21:
            num = "V"
            break;
        case 22:
            num = "W"
            break;
        case 23:
            num = "X"
            break;
        case 24:
            num = "Y"
            break;
        case 25:
            num = "Z"
            break;
        default:
            num = 0;
            break;
    }
    return num;
}