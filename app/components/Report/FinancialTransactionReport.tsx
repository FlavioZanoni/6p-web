import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, CircularProgress } from '@mui/material';
import { axiosInstance } from '@/app/lib/api/axiosInstance';

const FinancialTransactionsReport: React.FC = () => {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const fetchTransactions = async () => {
        if (!startDate || !endDate) return;

        setLoading(true);

        try {
            const response = await axiosInstance.get('/report/financial-transactions', { params: { startDate, endDate, type } });
            setTransactions(response.data);
        } catch (error) {
            console.error("Erro ao buscar relatório de transações financeiras", error);
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
            <TextField
                label="Tipo de Transação"
                value={type}
                onChange={(e) => setType(e.target.value)}
            />
            <Button onClick={fetchTransactions} variant="contained">Gerar Relatório</Button>

            {loading && <CircularProgress />}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID da Transação</TableCell>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Valor</TableCell>
                            <TableCell>Data</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.type}</TableCell>
                                <TableCell>{item.amount}</TableCell>
                                <TableCell>{item.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default FinancialTransactionsReport;
