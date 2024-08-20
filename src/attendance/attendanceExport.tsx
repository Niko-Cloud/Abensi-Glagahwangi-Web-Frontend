import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { fetchUserData } from '../dataProvider/userCustomProvider';

const fetchAndCombineData = async (data) => {
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

export const exporterAll = async (data) => {
    const combinedData = await fetchAndCombineData(data);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Attendance');

    
    worksheet.columns = [
        { header: 'Name', key: 'name', width: 20 },
        { header: 'Role', key: 'role', width: 15 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Date', key: 'date', width: 15 },
        { header: 'Description', key: 'description', width: 30 },
        { header: 'Attendance Status', key: 'attendanceStatus', width: 15 },
        { header: 'Status', key: 'status', width: 15 },
        { header: 'In Time', key: 'inTime', width: 15 },
        { header: 'In Location', key: 'inLocation', width: 20 },
        { header: 'In Status', key: 'inStatus', width: 20 },
        { header: 'In Image', key: 'inImage', width: 30 },
        { header: 'Out Time', key: 'outTime', width: 15 },
        { header: 'Out Location', key: 'outLocation', width: 20 },
        { header: 'Out Status', key: 'outStatus', width: 20 },
        { header: 'Out Image', key: 'outImage', width: 30 },
    ];

    
    combinedData.forEach(record => {
        worksheet.addRow({
            name: record.name,
            role: record.role,
            email: record.email,
            date: record.date,
            description: record.description,
            attendanceStatus: record.attendanceStatus,
            status: record.status,
            inTime: record.in.time,
            inLocation: record.in.location,
            inStatus: record.in.status,
            inImage: record.in.image,
            outTime: record.out.time,
            outLocation: record.out.location,
            outStatus: record.out.status,
            outImage: record.out.image,
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
    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'attendance.xlsx');
};

export const exporterIn = async (data) => {
    const combinedData = await fetchAndCombineData(data);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Attendance In');

    
    worksheet.columns = [
        { header: 'Name', key: 'name', width: 20 },
        { header: 'Role', key: 'role', width: 15 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Date', key: 'date', width: 15 },
        { header: 'In Time', key: 'inTime', width: 15 },
        { header: 'In Location', key: 'inLocation', width: 20 },
        { header: 'In Status', key: 'inStatus', width: 20 },
        { header: 'In Image', key: 'inImage', width: 30 },
    ];

    
    combinedData.forEach(record => {
        worksheet.addRow({
            name: record.name,
            role: record.role,
            email: record.email,
            date: record.date,
            inTime: record.in.time,
            inLocation: record.in.location,
            inStatus: record.in.status,
            inImage: record.in.image,
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
    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'attendance_in.xlsx');
};

export const exporterOut = async (data) => {
    const combinedData = await fetchAndCombineData(data);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Attendance Out');

    
    worksheet.columns = [
        { header: 'Name', key: 'name', width: 20 },
        { header: 'Role', key: 'role', width: 15 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Date', key: 'date', width: 15 },
        { header: 'Out Time', key: 'outTime', width: 15 },
        { header: 'Out Location', key: 'outLocation', width: 20 },
        { header: 'Out Status', key: 'outStatus', width: 20 },
        { header: 'Out Image', key: 'outImage', width: 30 },
    ];

    
    combinedData.forEach(record => {
        worksheet.addRow({
            name: record.name,
            role: record.role,
            email: record.email,
            date: record.date,
            outTime: record.out.time,
            outLocation: record.out.location,
            outStatus: record.out.status,
            outImage: record.out.image,
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
    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'attendance_out.xlsx');
};