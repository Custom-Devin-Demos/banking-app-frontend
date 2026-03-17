import { useEffect } from 'react';

// components
import Layout from '../components/Layout/Layout';
import History from '../components/History/History';
import Divider from '../components/Divider/Divider';
import { logAuditEvent } from '../services/auditLogger';

const Transactions: React.FC = () => {
  useEffect(() => {
    logAuditEvent('current-user', 'PAGE_VIEW', 'page:transactions', 'success');
  }, []);

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
