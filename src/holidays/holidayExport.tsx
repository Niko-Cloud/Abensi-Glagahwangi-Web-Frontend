import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';


export const exporter = async (data) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Events');

    
    worksheet.columns = [
        { header: 'Name', key: 'name', width: 30 },
        { header: 'Date', key: 'date', width: 20 },
    ];

    
    data.forEach(record => {
        worksheet.addRow({
            name: record.name,
            date: record.date,
        });
    });

    
    worksheet.getRow(1).eachCell(cell => {
        cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4F81BD' } };
        cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
    });

    
    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber !== 1) {
            row.eachCell(cell => {
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
            });
        }
    });

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'events.xlsx');
};