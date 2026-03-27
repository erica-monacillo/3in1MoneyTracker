import { createBrowserRouter } from 'react-router';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { Dashboard } from './screens/Dashboard';
import { CashFlowTracker } from './screens/CashFlowTracker';
import { DuesTracker } from './screens/DuesTracker';
import { IponChallenge } from './screens/IponChallenge';
import { ChallengeDetail } from './screens/ChallengeDetail';
import { Reports } from './screens/Reports';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: WelcomeScreen,
  },
  {
    path: '/dashboard',
    Component: Dashboard,
  },
  {
    path: '/cash-flow',
    Component: CashFlowTracker,
  },
  {
    path: '/dues',
    Component: DuesTracker,
  },
  {
    path: '/ipon-challenge',
    Component: IponChallenge,
  },
  {
    path: '/ipon-challenge/:challengeId',
    Component: ChallengeDetail,
  },
  {
    path: '/reports',
    Component: Reports,
  },
]);
