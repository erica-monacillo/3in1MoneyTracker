import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { ArrowLeft, Check, TrendingUp, Calendar, Save } from 'lucide-react';
import { toast } from 'sonner';

export function ChallengeDetail() {
  const navigate = useNavigate();
  const { challengeId } = useParams();

  const challengeData = {
    '20': { amount: 20, target: 2000, title: '20 PESOS IPON CHALLENGE' },
    '50': { amount: 50, target: 5000, title: '50 PESOS IPON CHALLENGE' },
    '100': { amount: 100, target: 10000, title: '100 PESOS IPON CHALLENGE' },
    '500': { amount: 500, target: 50000, title: '500 PESOS IPON CHALLENGE' },
    '1000': { amount: 1000, target: 100000, title: '1000 PESOS IPON CHALLENGE' },
  }[challengeId || '20'] || { amount: 20, target: 2000, title: '20 PESOS IPON CHALLENGE' };

  const [checkedCircles, setCheckedCircles] = useState<Set<number>>(new Set());

  // Load saved progress when component mounts or challengeId changes
  useEffect(() => {
    loadProgress();
  }, [challengeId]);

  const loadProgress = () => {
    const key = `ipon-challenge-${challengeId}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      const data = JSON.parse(saved);
      setCheckedCircles(new Set(data.checkedCircles || []));
    } else {
      // Initialize with demo data only if no saved data exists
      const initialChecked = challengeId === '20' ? 35 : challengeId === '50' ? 12 : challengeId === '100' ? 8 : 0;
      setCheckedCircles(new Set(Array.from({ length: initialChecked }, (_, i) => i + 1)));
    }
  };

  const saveProgress = () => {
    const key = `ipon-challenge-${challengeId}`;
    const data = {
      checkedCircles: Array.from(checkedCircles),
      challengeId,
      lastSaved: new Date().toISOString(),
    };
    localStorage.setItem(key, JSON.stringify(data));
    toast.success('Progress saved successfully! 💾');
  };

  const toggleCircle = (num: number) => {
    const newChecked = new Set(checkedCircles);
    if (newChecked.has(num)) {
      newChecked.delete(num);
    } else {
      newChecked.add(num);
    }
    setCheckedCircles(newChecked);
  };

  const saved = checkedCircles.size * challengeData.amount;
  const remaining = challengeData.target - saved;
  const percentage = (saved / challengeData.target) * 100;

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              className="text-white hover:bg-purple-700 -ml-2"
              onClick={() => navigate('/ipon-challenge')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Challenges
            </Button>
            <Button
              onClick={saveProgress}
              className="bg-white text-purple-700 hover:bg-purple-50"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Progress
            </Button>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">{challengeData.title}</h1>
          <p className="text-purple-100 mt-1">
            ₱{challengeData.amount} × 100 = ₱{challengeData.target.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Progress Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">
                {checkedCircles.size}/100
              </div>
              <p className="text-xs text-muted-foreground mt-1">circles filled</p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">You Saved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                ₱{saved.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{percentage.toFixed(1)}% complete</p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Remaining</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">
                ₱{remaining.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{100 - checkedCircles.size} circles left</p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        <Card className="shadow-md">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Overall Progress</span>
                <span className="font-semibold text-purple-600">{percentage.toFixed(1)}%</span>
              </div>
              <Progress value={percentage} className="h-4" />
            </div>
          </CardContent>
        </Card>

        {/* Savings Suggestions */}
        {remaining > 0 && (
          <Card className="shadow-md bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <TrendingUp className="h-5 w-5" />
                Smart Savings Plan (1 year goal)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-semibold text-gray-700">Daily</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">
                    ₱{Math.ceil(remaining / 365).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">Save every day</p>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-semibold text-gray-700">Weekly</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">
                    ₱{Math.ceil(remaining / 52).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">Save every week</p>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-semibold text-gray-700">Monthly</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">
                    ₱{Math.ceil(remaining / 12).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">Save every month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 100 Circles Grid */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Your Savings Progress</CardTitle>
            <p className="text-sm text-muted-foreground">
              Tap on circles to mark them as completed. Each circle = ₱{challengeData.amount}
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-10 gap-2 max-w-4xl mx-auto">
              {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => toggleCircle(num)}
                  className={`
                    aspect-square rounded-full border-2 
                    flex items-center justify-center
                    text-xs font-semibold
                    transition-all duration-200
                    hover:scale-110 active:scale-95
                    ${
                      checkedCircles.has(num)
                        ? 'bg-purple-600 border-purple-700 text-white shadow-md'
                        : 'bg-white border-gray-300 text-gray-400 hover:border-purple-400'
                    }
                  `}
                >
                  {checkedCircles.has(num) ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    num
                  )}
                </button>
              ))}
            </div>
            
            {/* Save reminder after grid */}
            <div className="mt-6 text-center">
              <Button
                onClick={saveProgress}
                size="lg"
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Save className="mr-2 h-5 w-5" />
                Save My Progress
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                Don't forget to save after checking circles! 💾
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Motivational Messages */}
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="py-6">
            <div className="text-center space-y-2">
              {percentage === 0 && (
                <p className="text-lg font-semibold text-gray-800">
                  🎯 Let's get started! Click your first circle to begin your journey!
                </p>
              )}
              {percentage > 0 && percentage < 25 && (
                <p className="text-lg font-semibold text-gray-800">
                  🌟 Great start! Every journey begins with a single step. Keep going!
                </p>
              )}
              {percentage >= 25 && percentage < 50 && (
                <p className="text-lg font-semibold text-gray-800">
                  💪 You're making progress! Konti pa, kaya mo 'yan!
                </p>
              )}
              {percentage >= 50 && percentage < 75 && (
                <p className="text-lg font-semibold text-gray-800">
                  🔥 Halfway there! You're doing amazing! Don't stop now!
                </p>
              )}
              {percentage >= 75 && percentage < 100 && (
                <p className="text-lg font-semibold text-gray-800">
                  🚀 So close! The finish line is near! Push through!
                </p>
              )}
              {percentage === 100 && (
                <p className="text-lg font-semibold text-gray-800">
                  🎉 CONGRATULATIONS! You did it! Goal achieved! 🏆
                </p>
              )}
              <p className="text-sm text-gray-600">
                "Stay consistent every day. 1 step closer to your goal."
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}