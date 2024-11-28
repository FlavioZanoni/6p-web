import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import { axiosInstance } from '@/app/lib/api/axiosInstance';

const InventoryReport: React.FC = () => {
  const [inventory, setInventory] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axiosInstance.get('/report/inventory');
        setInventory(response.data);
      } catch (error) {
        console.error("Erro ao buscar relatório de estoque", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Produto ID</TableCell>
            <TableCell>Total em Estoque</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inventory.map((item) => (
            <TableRow key={item.productId}>
              <TableCell>{item.productId}</TableCell>
              <TableCell>{item.totalQuantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InventoryReport;
