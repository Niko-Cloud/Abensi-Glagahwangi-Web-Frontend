import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { fetchUserData } from '../dataProvider/userCustomProvider';

const fetchAndCombineData = async (data: any[]) => {
    const userIds = data.map(record => record.uid).filter(Boolean);
    const users = await fetchUserData(userIds);

    return data.map(record => {
        const user = users.flat().find(u => u.uid === record.uid);
        return {
            ...record,
            name: user ? user.displayName : '',
            role: user ? user.role : '',
            email: user ? user.email : '',
        };
    });
};

export const exporter = async (data: any[]) => {
    const combinedData = await fetchAndCombineData(data);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Overtime');


    worksheet.columns = [
        { header: 'Name', key: 'name', width: 20 },
        { header: 'Date', key: 'date', width: 15 },
        { header: 'Description', key: 'description', width: 30 },
    ];


    combinedData.forEach(record => {
        worksheet.addRow({
            name: record.name,
            date: record.date,
            description: record.description,
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
    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'logExport.xlsx');
};
