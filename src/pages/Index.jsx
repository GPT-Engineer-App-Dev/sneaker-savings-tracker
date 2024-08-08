import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "sonner"

const initialTransactions = [
  { id: 1, date: '2024-03-01', amount: 150, type: 'expense', category: 'Nike' },
  { id: 2, date: '2024-03-05', amount: 200, type: 'income', category: 'Adidas' },
  { id: 3, date: '2024-03-10', amount: 180, type: 'expense', category: 'Jordan' },
];

const Index = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [newTransaction, setNewTransaction] = useState({
    date: '',
    amount: '',
    type: 'expense',
    category: '',
  });
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setNewTransaction(prev => ({ ...prev, [name]: value }));
  };

  const addTransaction = () => {
    if (!newTransaction.date || !newTransaction.amount || !newTransaction.category) {
      toast.error("Please fill in all fields");
      return;
    }
    const transaction = {
      ...newTransaction,
      id: Date.now(),
      amount: parseFloat(newTransaction.amount)
    };
    setTransactions(prev => [...prev, transaction]);
    setNewTransaction({ date: '', amount: '', type: 'expense', category: '' });
    toast.success("Transaction added successfully");
  };

  const startEditing = (transaction) => {
    setEditingId(transaction.id);
    setNewTransaction(transaction);
  };

  const saveEdit = () => {
    setTransactions(prev => prev.map(t => t.id === editingId ? { ...newTransaction, id: editingId } : t));
    setEditingId(null);
    setNewTransaction({ date: '', amount: '', type: 'expense', category: '' });
    toast.success("Transaction updated successfully");
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    toast.success("Transaction deleted successfully");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Sneaker Side-Hustle Accounting</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Input
          type="date"
          name="date"
          value={newTransaction.date}
          onChange={handleInputChange}
          className="w-full"
        />
        <Input
          type="number"
          name="amount"
          placeholder="Amount"
          value={newTransaction.amount}
          onChange={handleInputChange}
          className="w-full"
        />
        <Select name="type" value={newTransaction.type} onValueChange={(value) => handleSelectChange('type', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>
        <Select name="category" value={newTransaction.category} onValueChange={(value) => handleSelectChange('category', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Nike">Nike</SelectItem>
            <SelectItem value="Adidas">Adidas</SelectItem>
            <SelectItem value="Jordan">Jordan</SelectItem>
            <SelectItem value="Yeezy">Yeezy</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={editingId ? saveEdit : addTransaction}>
          {editingId ? 'Save Edit' : 'Add Transaction'}
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>${transaction.amount.toFixed(2)}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>
                <Button variant="outline" className="mr-2" onClick={() => startEditing(transaction)}>Edit</Button>
                <Button variant="destructive" onClick={() => deleteTransaction(transaction.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Index;
