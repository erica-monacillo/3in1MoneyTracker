import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { ArrowLeft, Plus, Coins, Edit2, Trash2, Save } from 'lucide-react';
import { toast } from 'sonner';

interface Transaction {
  id: string;
  date: string;
  description: string;
  type: 'in' | 'out';
  amount: number;
  balance: number;
}

export function CashFlowTracker() {
  const navigate = useNavigate();
  const [month, setMonth] = useState('March');
  const [year, setYear] = useState('2026');
  const [startingBalance, setStartingBalance] = useState('20000');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTransaction, setNewTransaction] = useState({
    date: '',
    description: '',
    type: 'in' as 'in' | 'out',
    amount: '',
  });

  // Load data when month/year changes
  useEffect(() => {
    loadMonthData();
  }, [month, year]);

  const loadMonthData = () => {
    const key = `cashflow-${month}-${year}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      const data = JSON.parse(saved);
      setTransactions(data.transactions || []);
      setStartingBalance(data.startingBalance || '0');
    } else {
      setTransactions([]);
      setStartingBalance('20000');
    }
  };

  const saveMonthData = () => {
    const key = `cashflow-${month}-${year}`;
    const data = {
      transactions,
      startingBalance,
      month,
      year,
    };
    localStorage.setItem(key, JSON.stringify(data));
    toast.success('Data saved successfully!');
  };

  const recalculateBalances = (txns: Transaction[], starting: number) => {
    let currentBalance = starting;
    return txns.map(txn => {
      if (txn.type === 'in') {
        currentBalance += txn.amount;
      } else {
        currentBalance -= txn.amount;
      }
      return { ...txn, balance: currentBalance };
    });
  };

  const totalIncome = transactions
    .filter(t => t.type === 'in')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'out')
    .reduce((sum, t) => sum + t.amount, 0);

  const remainingBalance = Number(startingBalance) + totalIncome - totalExpenses;

  const handleAddTransaction = () => {
    if (newTransaction.description && newTransaction.amount && newTransaction.date) {
      const amount = Number(newTransaction.amount);
      
      const transaction: Transaction = {
        id: editingId || Date.now().toString(),
        date: newTransaction.date,
        description: newTransaction.description,
        type: newTransaction.type,
        amount: amount,
        balance: 0, // Will be recalculated
      };

      let updatedTransactions;
      if (editingId) {
        updatedTransactions = transactions.map(t => 
          t.id === editingId ? transaction : t
        );
        toast.success('Transaction updated!');
      } else {
        updatedTransactions = [...transactions, transaction];
        toast.success('Transaction added!');
      }

      // Recalculate all balances
      const withBalances = recalculateBalances(updatedTransactions, Number(startingBalance));
      setTransactions(withBalances);
      
      setIsDialogOpen(false);
      setEditingId(null);
      setNewTransaction({
        date: '',
        description: '',
        type: 'in',
        amount: '',
      });
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingId(transaction.id);
    setNewTransaction({
      date: transaction.date,
      description: transaction.description,
      type: transaction.type,
      amount: transaction.amount.toString(),
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    const updatedTransactions = transactions.filter(t => t.id !== id);
    const withBalances = recalculateBalances(updatedTransactions, Number(startingBalance));
    setTransactions(withBalances);
    toast.success('Transaction deleted!');
  };

  const handleStartingBalanceChange = (value: string) => {
    setStartingBalance(value);
    // Recalculate all balances when starting balance changes
    const withBalances = recalculateBalances(transactions, Number(value));
    setTransactions(withBalances);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Simple Header */}
      <div className="bg-white border-b-2 border-gray-300 p-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={saveMonthData}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Data
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6">
        {/* Notebook Style Card */}
        <Card className="bg-[#f5e6d3] border-4 border-[#8b6f47] shadow-2xl relative">
          {/* Spiral Binding Effect */}
          <div className="absolute -top-3 left-0 right-0 flex justify-around px-8">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className="w-4 h-6 bg-gray-400 rounded-t-full border border-gray-500" />
            ))}
          </div>

          <CardContent className="p-8 pt-12">
            {/* Title */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <h1 className="text-4xl font-bold text-gray-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                CASH FLOW TRACKER
              </h1>
              <Coins className="h-10 w-10 text-yellow-600" />
            </div>

            {/* Month/Year and Starting Balance */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-4">
                <label className="text-lg font-semibold text-gray-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  Month / Year:
                </label>
                <Input
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-32 bg-white border-2 border-gray-400"
                  placeholder="Month"
                />
                <Input
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-24 bg-white border-2 border-gray-400"
                  placeholder="Year"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="text-lg font-semibold text-gray-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  Starting Balance:
                </label>
                <Input
                  type="number"
                  value={startingBalance}
                  onChange={(e) => handleStartingBalanceChange(e.target.value)}
                  className="w-40 bg-white border-2 border-gray-400"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Table */}
            <div className="border-4 border-[#8b6f47] mb-6">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#dba6a6]">
                    <th className="border-2 border-[#8b6f47] p-3 text-left font-bold text-gray-800">Date</th>
                    <th className="border-2 border-[#8b6f47] p-3 text-left font-bold text-gray-800">Description</th>
                    <th className="border-2 border-[#8b6f47] p-3 text-center font-bold text-gray-800">In</th>
                    <th className="border-2 border-[#8b6f47] p-3 text-center font-bold text-gray-800">Out</th>
                    <th className="border-2 border-[#8b6f47] p-3 text-right font-bold text-gray-800">Amount</th>
                    <th className="border-2 border-[#8b6f47] p-3 text-right font-bold text-gray-800">Balance</th>
                    <th className="border-2 border-[#8b6f47] p-3 text-center font-bold text-gray-800">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr key={transaction.id} className="bg-[#f5e6d3] hover:bg-[#eddcc9]">
                      <td className="border-2 border-[#8b6f47] p-3">{transaction.date}</td>
                      <td className="border-2 border-[#8b6f47] p-3">{transaction.description}</td>
                      <td className="border-2 border-[#8b6f47] p-3 text-center">
                        {transaction.type === 'in' && <span className="text-2xl">✓</span>}
                      </td>
                      <td className="border-2 border-[#8b6f47] p-3 text-center">
                        {transaction.type === 'out' && <span className="text-2xl">✓</span>}
                      </td>
                      <td className="border-2 border-[#8b6f47] p-3 text-right font-semibold">
                        ₱{transaction.amount.toLocaleString()}
                      </td>
                      <td className="border-2 border-[#8b6f47] p-3 text-right font-semibold">
                        ₱{transaction.balance.toLocaleString()}
                      </td>
                      <td className="border-2 border-[#8b6f47] p-3 text-center">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => handleEdit(transaction)}
                            className="p-1 hover:bg-blue-100 rounded"
                          >
                            <Edit2 className="h-4 w-4 text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(transaction.id)}
                            className="p-1 hover:bg-red-100 rounded"
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {/* Empty rows for visual effect */}
                  {Array.from({ length: Math.max(0, 8 - transactions.length) }).map((_, i) => (
                    <tr key={`empty-${i}`} className="bg-[#f5e6d3]">
                      <td className="border-2 border-[#8b6f47] p-3 h-12">&nbsp;</td>
                      <td className="border-2 border-[#8b6f47] p-3">&nbsp;</td>
                      <td className="border-2 border-[#8b6f47] p-3">&nbsp;</td>
                      <td className="border-2 border-[#8b6f47] p-3">&nbsp;</td>
                      <td className="border-2 border-[#8b6f47] p-3">&nbsp;</td>
                      <td className="border-2 border-[#8b6f47] p-3">&nbsp;</td>
                      <td className="border-2 border-[#8b6f47] p-3">&nbsp;</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Transaction Button */}
            <div className="mb-6">
              <Dialog open={isDialogOpen} onOpenChange={(open) => {
                setIsDialogOpen(open);
                if (!open) {
                  setEditingId(null);
                  setNewTransaction({
                    date: '',
                    description: '',
                    type: 'in',
                    amount: '',
                  });
                }
              }}>
                <DialogTrigger asChild>
                  <Button className="bg-[#8b6f47] hover:bg-[#6d5638] text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Transaction Row
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#f5e6d3]">
                  <DialogHeader>
                    <DialogTitle>{editingId ? 'Edit Transaction' : 'Add New Transaction'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Date (MM/DD)</Label>
                      <Input
                        value={newTransaction.date}
                        onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                        placeholder="03/15"
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Input
                        value={newTransaction.description}
                        onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                        placeholder="e.g., Salary, Grocery"
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            checked={newTransaction.type === 'in'}
                            onChange={() => setNewTransaction({...newTransaction, type: 'in'})}
                          />
                          <span>In (Income)</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            checked={newTransaction.type === 'out'}
                            onChange={() => setNewTransaction({...newTransaction, type: 'out'})}
                          />
                          <span>Out (Expense)</span>
                        </label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Amount</Label>
                      <Input
                        type="number"
                        value={newTransaction.amount}
                        onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                        placeholder="0"
                        className="bg-white"
                      />
                    </div>
                    <Button 
                      onClick={handleAddTransaction} 
                      className="w-full bg-[#8b6f47] hover:bg-[#6d5638]"
                    >
                      {editingId ? 'Update Transaction' : 'Add Transaction'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Bottom Summary Section */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="bg-[#dba6a6] border-2 border-[#8b6f47] p-4 rounded">
                  <div className="text-lg font-bold text-gray-800 mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                    Total Expenses:
                  </div>
                  <div className="text-2xl font-bold text-gray-800">
                    ₱{totalExpenses.toLocaleString()}
                  </div>
                </div>
                <div className="bg-[#dba6a6] border-2 border-[#8b6f47] p-4 rounded">
                  <div className="text-lg font-bold text-gray-800 mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                    Total Income:
                  </div>
                  <div className="text-2xl font-bold text-gray-800">
                    ₱{totalIncome.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="bg-[#c8a882] border-2 border-[#8b6f47] p-4 rounded relative">
                <div className="text-lg font-bold text-gray-800 mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  May natira pa ba? 🤔
                </div>
                <div className="text-sm font-semibold text-gray-700 mb-1">Remaining Bal</div>
                <div className="text-3xl font-bold text-gray-800">
                  ₱{remainingBalance.toLocaleString()}
                </div>
                <div className="absolute top-2 right-2 text-4xl">📝</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}