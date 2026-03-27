import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { ArrowLeft, Plus, Edit2, Trash2, Save } from 'lucide-react';
import { toast } from 'sonner';

interface Due {
  id: string;
  payment: string;
  amount: number;
  dueDate: string;
  category: string;
  isPaid: boolean;
}

export function DuesTracker() {
  const navigate = useNavigate();
  const [month, setMonth] = useState('March');
  const [dues, setDues] = useState<Due[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newDue, setNewDue] = useState({
    payment: '',
    amount: '',
    dueDate: '',
    category: '',
  });

  const [notes, setNotes] = useState('');
  const [utangList, setUtangList] = useState('');

  // Load data when month changes
  useEffect(() => {
    loadMonthData();
  }, [month]);

  const loadMonthData = () => {
    const key = `dues-${month}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      const data = JSON.parse(saved);
      setDues(data.dues || []);
      setNotes(data.notes || '');
      setUtangList(data.utangList || '');
    } else {
      setDues([]);
      setNotes('');
      setUtangList('');
    }
  };

  const saveMonthData = () => {
    const key = `dues-${month}`;
    const data = {
      dues,
      notes,
      utangList,
      month,
    };
    localStorage.setItem(key, JSON.stringify(data));
    toast.success('Data saved successfully!');
  };

  const togglePaid = (id: string) => {
    setDues(dues.map(due => 
      due.id === id ? { ...due, isPaid: !due.isPaid } : due
    ));
  };

  const handleAddDue = () => {
    if (newDue.payment && newDue.amount) {
      const due: Due = {
        id: editingId || Date.now().toString(),
        payment: newDue.payment,
        amount: Number(newDue.amount),
        dueDate: newDue.dueDate,
        category: newDue.category,
        isPaid: false,
      };

      let updatedDues;
      if (editingId) {
        updatedDues = dues.map(d => 
          d.id === editingId ? due : d
        );
        toast.success('Bill updated!');
      } else {
        updatedDues = [...dues, due];
        toast.success('Bill added!');
      }

      setDues(updatedDues);
      setIsDialogOpen(false);
      setEditingId(null);
      setNewDue({
        payment: '',
        amount: '',
        dueDate: '',
        category: '',
      });
    }
  };

  const handleEdit = (due: Due) => {
    setEditingId(due.id);
    setNewDue({
      payment: due.payment,
      amount: due.amount.toString(),
      dueDate: due.dueDate,
      category: due.category,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setDues(dues.filter(d => d.id !== id));
    toast.success('Bill deleted!');
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
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Dues ko po !
              </h1>
            </div>

            {/* Month */}
            <div className="flex items-center gap-4 mb-6">
              <label className="text-lg font-semibold text-gray-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Month of:
              </label>
              <Input
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="flex-1 bg-transparent border-0 border-b-2 border-dotted border-gray-600 rounded-none"
                placeholder="................................."
              />
            </div>

            {/* Table */}
            <div className="border-4 border-[#8b6f47] mb-6">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#dba6a6]">
                    <th className="border-2 border-[#8b6f47] p-3 text-left font-bold text-gray-800 uppercase">Bayarin</th>
                    <th className="border-2 border-[#8b6f47] p-3 text-center font-bold text-gray-800 uppercase">Magkano</th>
                    <th className="border-2 border-[#8b6f47] p-3 text-center font-bold text-gray-800 uppercase">Due Date</th>
                    <th className="border-2 border-[#8b6f47] p-3 text-center font-bold text-gray-800 uppercase text-xs">Ano? Bayad na ba?<br/>YES or NO</th>
                    <th className="border-2 border-[#8b6f47] p-3 text-center font-bold text-gray-800 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dues.map((due) => (
                    <tr key={due.id} className="bg-[#f5e6d3] hover:bg-[#eddcc9]">
                      <td className="border-2 border-[#8b6f47] p-3">{due.payment}</td>
                      <td className="border-2 border-[#8b6f47] p-3 text-center font-semibold">
                        ₱{due.amount.toLocaleString()}
                      </td>
                      <td className="border-2 border-[#8b6f47] p-3 text-center">{due.dueDate}</td>
                      <td className="border-2 border-[#8b6f47] p-3">
                        <div className="flex justify-center gap-6">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={due.isPaid}
                              onChange={() => togglePaid(due.id)}
                              className="w-5 h-5 cursor-pointer"
                            />
                            <span className="text-sm font-semibold">YES</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={!due.isPaid}
                              onChange={() => togglePaid(due.id)}
                              className="w-5 h-5 cursor-pointer"
                            />
                            <span className="text-sm font-semibold">NO</span>
                          </label>
                        </div>
                      </td>
                      <td className="border-2 border-[#8b6f47] p-3 text-center">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => handleEdit(due)}
                            className="p-1 hover:bg-blue-100 rounded"
                          >
                            <Edit2 className="h-4 w-4 text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(due.id)}
                            className="p-1 hover:bg-red-100 rounded"
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {/* Empty rows for visual effect */}
                  {Array.from({ length: Math.max(0, 8 - dues.length) }).map((_, i) => (
                    <tr key={`empty-${i}`} className="bg-[#f5e6d3]">
                      <td className="border-2 border-[#8b6f47] p-3 h-12">&nbsp;</td>
                      <td className="border-2 border-[#8b6f47] p-3">&nbsp;</td>
                      <td className="border-2 border-[#8b6f47] p-3">&nbsp;</td>
                      <td className="border-2 border-[#8b6f47] p-3">
                        <div className="flex justify-center gap-6">
                          <div className="w-5 h-5 border-2 border-gray-400"></div>
                          <div className="w-5 h-5 border-2 border-gray-400"></div>
                        </div>
                      </td>
                      <td className="border-2 border-[#8b6f47] p-3">&nbsp;</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Bill Button */}
            <div className="mb-6">
              <Dialog open={isDialogOpen} onOpenChange={(open) => {
                setIsDialogOpen(open);
                if (!open) {
                  setEditingId(null);
                  setNewDue({
                    payment: '',
                    amount: '',
                    dueDate: '',
                    category: '',
                  });
                }
              }}>
                <DialogTrigger asChild>
                  <Button className="bg-[#8b6f47] hover:bg-[#6d5638] text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Bill
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#f5e6d3]">
                  <DialogHeader>
                    <DialogTitle>{editingId ? 'Edit Bill' : 'Add New Bill'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Bayarin (Payment)</Label>
                      <Input
                        value={newDue.payment}
                        onChange={(e) => setNewDue({...newDue, payment: e.target.value})}
                        placeholder="e.g., Electric Bill"
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Magkano (How Much)</Label>
                      <Input
                        type="number"
                        value={newDue.amount}
                        onChange={(e) => setNewDue({...newDue, amount: e.target.value})}
                        placeholder="0"
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Due Date (MM/DD)</Label>
                      <Input
                        value={newDue.dueDate}
                        onChange={(e) => setNewDue({...newDue, dueDate: e.target.value})}
                        placeholder="03/15"
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Ano? (Category)</Label>
                      <Input
                        value={newDue.category}
                        onChange={(e) => setNewDue({...newDue, category: e.target.value})}
                        placeholder="e.g., Utilities"
                        className="bg-white"
                      />
                    </div>
                    <Button 
                      onClick={handleAddDue} 
                      className="w-full bg-[#8b6f47] hover:bg-[#6d5638]"
                    >
                      {editingId ? 'Update Bill' : 'Add Bill'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Bottom Section - Notes and Utang List */}
            <div className="grid grid-cols-2 gap-6">
              {/* Notes */}
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  Notes!
                </h3>
                <div className="space-y-2">
                  <Input
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="bg-transparent border-0 border-b-2 border-gray-400 rounded-none"
                    placeholder="................................................."
                  />
                  <div className="border-b-2 border-gray-400 py-2">&nbsp;</div>
                  <div className="border-b-2 border-gray-400 py-2">&nbsp;</div>
                  <div className="border-b-2 border-gray-400 py-2">&nbsp;</div>
                </div>
              </div>

              {/* Utang List */}
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  Utang List!
                </h3>
                <div className="space-y-2">
                  <Input
                    value={utangList}
                    onChange={(e) => setUtangList(e.target.value)}
                    className="bg-transparent border-0 border-b-2 border-gray-400 rounded-none"
                    placeholder="................................................."
                  />
                  <div className="border-b-2 border-gray-400 py-2">&nbsp;</div>
                  <div className="border-b-2 border-gray-400 py-2">&nbsp;</div>
                  <div className="border-b-2 border-gray-400 py-2">&nbsp;</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}