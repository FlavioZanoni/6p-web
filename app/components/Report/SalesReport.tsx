import React, { useState, useEffect } from 'react';
import { axiosInstance } from '@/app/lib/api/axiosInstance';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, CircularProgress } from '@mui/material';

const SalesReport: React.FC = () => {
    const [sales, setSales] = useState<any[]>([]);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const fetchSales = async () => {
        if (!startDate || !endDate) return;

        setLoading(true);

        try {
            const response = await axiosInstance.get('/report/sales', { params: { startDate, endDate } });
            setSales(response.data);
        } catch (error) {
            console.error("Erro ao buscar relatório de vendas", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <TextField
                label="Data Inicial"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
            />
            <TextField
                label="Data Final"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
            />
            <Button onClick={fetchSales} variant="contained">Gerar Relatório</Button>

            {loading && <CircularProgress />}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Produto ID</TableCell>
                            <TableCell>Total Vendido</TableCell>
                            <TableCell>Receita Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sales.map((item) => (
                            <TableRow key={item.productId}>
                                <TableCell>{item.productId}</TableCell>
                                <TableCell>{item.totalSold}</TableCell>
                                <TableCell>{item.totalRevenue}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default SalesReport;
