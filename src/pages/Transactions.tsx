import { useState, useEffect, useRef } from 'react';
import { Sentry } from '../sentry';

// components
import Layout from '../components/Layout/Layout';
import History from '../components/History/History';
import Divider from '../components/Divider/Divider';

const SLOW_LOAD_THRESHOLD_MS = 3000;

const Transactions: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const loadStartTime = useRef<number>(Date.now());

  useEffect(() => {
    const simulateSlowApiCall = async () => {
      const artificialDelay = 4000;

      await new Promise((resolve) => setTimeout(resolve, artificialDelay));

      const loadTime = Date.now() - loadStartTime.current;

      if (loadTime > SLOW_LOAD_THRESHOLD_MS) {
        Sentry.captureMessage('Transactions page load exceeded threshold', {
          level: 'error',
          tags: {
            page: 'transactions',
            performance: 'slow_load',
          },
          extra: {
            loadTimeMs: loadTime,
            thresholdMs: SLOW_LOAD_THRESHOLD_MS,
            timestamp: new Date().toISOString(),
          },
        });
      }

      setIsLoading(false);
    };

    simulateSlowApiCall();
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <Divider />
        <h1 className='title no-select'>Transactions</h1>
        <div className='flex flex-col flex-h-center' style={{ padding: '40px 0' }}>
          <div className='loading-spinner' />
          <p className='information text-shadow' style={{ marginTop: '16px' }}>
            Loading transactions...
          </p>
        </div>
        <Divider />
      </Layout>
    );
  }

  return (
    <Layout>
      <Divider />

      <h1 className='title no-select'>Transactions</h1>

      <History detailed date='May 6' dateBalance='-€127.78' />

      <Divider />

      <History detailed date='May 5' dateBalance='-€970.23' />

      <Divider />
    </Layout>
  );
};

export default Transactions;
