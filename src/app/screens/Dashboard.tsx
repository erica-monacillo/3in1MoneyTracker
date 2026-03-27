import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  Wallet, 
  FileText, 
  Target, 
  BarChart3,
  ArrowUpCircle,
  ArrowDownCircle,
  DollarSign,
  AlertCircle,
  Coins
} from 'lucide-react';
import { format } from 'date-fns';

export function Dashboard() {
  const [personName, setPersonName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem('personName');
    if (!name) {
      navigate('/');
    } else {
      setPersonName(name);
    }
  }, [navigate]);

  // Mock data - will be replaced with real data from Supabase
  const summaryData = {
    totalIncome: 50000,
    totalExpenses: 32000,
    remainingBalance: 18000,
    unpaidDues: 8500,
    totalSaved: 12500,
  };

  const currentDate = format(new Date(), 'MMMM yyyy');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold">3-in-1 Money Tracker</h1>
          <p className="text-green-100 mt-1">Hi, {personName}! 👋</p>
          <p className="text-sm text-green-100 mt-1">{currentDate}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              <ArrowUpCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ₱{summaryData.totalIncome.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">This month</p>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <ArrowDownCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                ₱{summaryData.totalExpenses.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">This month</p>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Remaining Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                ₱{summaryData.remainingBalance.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Available now</p>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unpaid Dues</CardTitle>
              <AlertCircle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                ₱{summaryData.unpaidDues.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Need to pay</p>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Saved</CardTitle>
              <Coins className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                ₱{summaryData.totalSaved.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Ipon challenges</p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-br from-green-50 to-green-100 border-green-200"
            onClick={() => navigate('/cash-flow')}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-600 rounded-lg">
                  <Wallet className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Cash Flow Tracker</CardTitle>
                  <p className="text-sm text-gray-600">Track income & expenses</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Open Tracker
              </Button>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-br from-red-50 to-red-100 border-red-200"
            onClick={() => navigate('/dues')}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-600 rounded-lg">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Dues Ko Po!</CardTitle>
                  <p className="text-sm text-gray-600">Bayarin tracker</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-red-600 hover:bg-red-700">
                View Bills
              </Button>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200"
            onClick={() => navigate('/ipon-challenge')}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-600 rounded-lg">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Ipon Challenge</CardTitle>
                  <p className="text-sm text-gray-600">Mission Impossible</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Start Saving
              </Button>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
            onClick={() => navigate('/reports')}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-600 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Reports</CardTitle>
                  <p className="text-sm text-gray-600">View summary</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                View Reports
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Tips */}
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-lg">💡 Quick Tip</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              "Konti pa, kaya mo 'yan!" Remember: Small steps lead to big results. 
              Track your expenses daily and watch your savings grow! 🎯
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
