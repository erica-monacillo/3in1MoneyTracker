import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, FileText, Target } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function Reports() {
  const navigate = useNavigate();

  // Mock data for reports
  const summaryData = {
    totalIncome: 50000,
    totalExpenses: 32000,
    remainingBalance: 18000,
    paidDues: 2500,
    unpaidDues: 8500,
    totalSaved: 2100, // From ipon challenges
  };

  const monthlyData = [
    { month: 'Jan', income: 45000, expenses: 28000 },
    { month: 'Feb', income: 48000, expenses: 30000 },
    { month: 'Mar', income: 50000, expenses: 32000 },
  ];

  const expenseBreakdown = [
    { name: 'Food', value: 12000 },
    { name: 'Utilities', value: 5000 },
    { name: 'Transportation', value: 3000 },
    { name: 'Shopping', value: 7000 },
    { name: 'Others', value: 5000 },
  ];

  const savingsProgress = [
    { challenge: '20 pesos', saved: 700, target: 2000 },
    { challenge: '50 pesos', saved: 600, target: 5000 },
    { challenge: '100 pesos', saved: 800, target: 10000 },
    { challenge: '500 pesos', saved: 0, target: 50000 },
    { challenge: '1000 pesos', saved: 0, target: 100000 },
  ];

  const COLORS = ['#10b981', '#ef4444', '#f59e0b', '#8b5cf6', '#06b6d4'];

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          <Button
            variant="ghost"
            className="text-white hover:bg-blue-700 mb-4 -ml-2"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold">Reports & Summary</h1>
          <p className="text-blue-100 mt-1">Your complete financial overview</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="shadow-md border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ₱{summaryData.totalIncome.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">This month</p>
            </CardContent>
          </Card>

          <Card className="shadow-md border-l-4 border-l-red-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                ₱{summaryData.totalExpenses.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">This month</p>
            </CardContent>
          </Card>

          <Card className="shadow-md border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Remaining Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                ₱{summaryData.remainingBalance.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Available</p>
            </CardContent>
          </Card>

          <Card className="shadow-md border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Dues Status</CardTitle>
              <FileText className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <div className="text-xl font-bold text-green-600">
                  ₱{summaryData.paidDues.toLocaleString()}
                </div>
                <span className="text-sm text-muted-foreground">paid</span>
              </div>
              <div className="flex items-baseline gap-2 mt-1">
                <div className="text-xl font-bold text-orange-600">
                  ₱{summaryData.unpaidDues.toLocaleString()}
                </div>
                <span className="text-sm text-muted-foreground">unpaid</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-l-4 border-l-purple-500 md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Saved (Ipon Challenges)</CardTitle>
              <Target className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                ₱{summaryData.totalSaved.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Across all challenges</p>
            </CardContent>
          </Card>
        </div>

        {/* Income vs Expenses Chart */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Income vs Expenses (Last 3 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#10b981" name="Income" />
                <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Expense Breakdown */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Expense Breakdown (This Month)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={expenseBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {expenseBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <div className="space-y-3">
                {expenseBreakdown.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <span className="font-bold">₱{item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Savings Progress */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Ipon Challenge Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {savingsProgress.map((item) => {
                const percentage = (item.saved / item.target) * 100;
                return (
                  <div key={item.challenge} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{item.challenge}</span>
                      <span className="text-muted-foreground">
                        ₱{item.saved.toLocaleString()} / ₱{item.target.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-purple-600 h-3 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Financial Health Score */}
        <Card className="shadow-md bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Financial Health Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Savings Rate</p>
                <p className="text-2xl font-bold text-green-600">
                  {((summaryData.remainingBalance / summaryData.totalIncome) * 100).toFixed(1)}%
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  ₱{summaryData.remainingBalance.toLocaleString()} saved from income
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Expense Ratio</p>
                <p className="text-2xl font-bold text-orange-600">
                  {((summaryData.totalExpenses / summaryData.totalIncome) * 100).toFixed(1)}%
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  ₱{summaryData.totalExpenses.toLocaleString()} spent from income
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <p className="font-semibold text-gray-800 mb-2">💡 Financial Tip:</p>
              <p className="text-sm text-gray-700">
                Great job! You're saving {((summaryData.remainingBalance / summaryData.totalIncome) * 100).toFixed(1)}% 
                of your income. Financial experts recommend saving at least 20% of your income. Keep it up! 🎯
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            className="bg-green-600 hover:bg-green-700 h-14"
            onClick={() => navigate('/cash-flow')}
          >
            Add Transaction
          </Button>
          <Button 
            className="bg-red-600 hover:bg-red-700 h-14"
            onClick={() => navigate('/dues')}
          >
            Pay Bills
          </Button>
          <Button 
            className="bg-purple-600 hover:bg-purple-700 h-14"
            onClick={() => navigate('/ipon-challenge')}
          >
            Save More
          </Button>
        </div>
      </div>
    </div>
  );
}
