import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { ArrowLeft, Target, TrendingUp } from 'lucide-react';

interface Challenge {
  id: string;
  amount: number;
  target: number;
  completed: number;
  title: string;
}

export function IponChallenge() {
  const navigate = useNavigate();

  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: '20',
      amount: 20,
      target: 2000,
      completed: 0,
      title: '20 PESOS IPON CHALLENGE',
    },
    {
      id: '50',
      amount: 50,
      target: 5000,
      completed: 0,
      title: '50 PESOS IPON CHALLENGE',
    },
    {
      id: '100',
      amount: 100,
      target: 10000,
      completed: 0,
      title: '100 PESOS IPON CHALLENGE',
    },
    {
      id: '500',
      amount: 500,
      target: 50000,
      completed: 0,
      title: '500 PESOS IPON CHALLENGE',
    },
    {
      id: '1000',
      amount: 1000,
      target: 100000,
      completed: 0,
      title: '1000 PESOS IPON CHALLENGE',
    },
  ]);

  // Load saved progress for all challenges
  useEffect(() => {
    const updatedChallenges = challenges.map(challenge => {
      const key = `ipon-challenge-${challenge.id}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        const data = JSON.parse(saved);
        return {
          ...challenge,
          completed: data.checkedCircles?.length || 0,
        };
      }
      return challenge;
    });
    setChallenges(updatedChallenges);
  }, []);

  const totalSaved = challenges.reduce((sum, c) => sum + (c.completed * c.amount), 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          <Button
            variant="ghost"
            className="text-white hover:bg-purple-700 mb-4 -ml-2"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold">Mission Impossible Ipon Challenge</h1>
          <p className="text-purple-100 mt-1">Start saving today! Kaya mo 'yan! 💪</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Total Saved Card */}
        <Card className="shadow-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Target className="h-6 w-6" />
              Total Saved Across All Challenges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">₱{totalSaved.toLocaleString()}</div>
            <p className="text-purple-100 mt-2">Keep going! Every peso counts! 🎯</p>
          </CardContent>
        </Card>

        {/* Challenge Cards */}
        <div className="space-y-4">
          {challenges.map((challenge) => {
            const saved = challenge.completed * challenge.amount;
            const remaining = challenge.target - saved;
            const percentage = (saved / challenge.target) * 100;
            
            return (
              <Card 
                key={challenge.id} 
                className="shadow-md hover:shadow-lg transition-all cursor-pointer"
                onClick={() => navigate(`/ipon-challenge/${challenge.id}`)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{challenge.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        ₱{challenge.amount} × 100 circles = ₱{challenge.target.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">
                        {challenge.completed}/100
                      </div>
                      <p className="text-xs text-muted-foreground">circles</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold">{percentage.toFixed(1)}%</span>
                    </div>
                    <Progress value={percentage} className="h-3" />
                  </div>

                  {/* Amounts */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">You already saved</p>
                      <p className="text-lg font-bold text-green-600">
                        ₱{saved.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">You still need</p>
                      <p className="text-lg font-bold text-orange-600">
                        ₱{remaining.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Savings Suggestions */}
                  {remaining > 0 && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        Savings Suggestions (to finish in 1 year):
                      </p>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-gray-600">Daily:</span>
                          <p className="font-semibold text-blue-700">
                            ₱{Math.ceil(remaining / 365).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Weekly:</span>
                          <p className="font-semibold text-blue-700">
                            ₱{Math.ceil(remaining / 52).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Monthly:</span>
                          <p className="font-semibold text-blue-700">
                            ₱{Math.ceil(remaining / 12).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={() => navigate(`/ipon-challenge/${challenge.id}`)}
                  >
                    {challenge.completed === 0 ? 'Start Challenge' : 'Continue Saving'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Motivational Card */}
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="py-6">
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-800 mb-2">
                💡 Pro Tip: Stay Consistent!
              </p>
              <p className="text-gray-700">
                "Konti pa, kaya mo 'yan!" Even small daily savings add up to big results. 
                Every circle you fill brings you closer to your goal! 🎯
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}