import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Wallet, TrendingUp, Target } from 'lucide-react';

export function WelcomeScreen() {
  const [personName, setPersonName] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (personName.trim()) {
      localStorage.setItem('personName', personName.trim());
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center gap-2 text-green-600">
            <Wallet className="w-12 h-12" />
            <TrendingUp className="w-12 h-12" />
            <Target className="w-12 h-12" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-800">
            3-in-1 Money Tracker
          </CardTitle>
          <CardDescription className="text-lg">
            Track your cash flow, bills, and savings goals all in one place!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              What's your name?
            </label>
            <Input
              type="text"
              placeholder="Enter your name"
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleContinue()}
              className="text-lg"
            />
          </div>
          <Button
            onClick={handleContinue}
            disabled={!personName.trim()}
            className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6"
          >
            Continue to Dashboard
          </Button>
          <div className="grid grid-cols-3 gap-2 text-center text-sm text-gray-600 pt-4 border-t">
            <div>
              <div className="font-semibold text-green-600">Track</div>
              <div>Cash Flow</div>
            </div>
            <div>
              <div className="font-semibold text-red-600">Monitor</div>
              <div>Dues & Bills</div>
            </div>
            <div>
              <div className="font-semibold text-purple-600">Save</div>
              <div>Ipon Goals</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
