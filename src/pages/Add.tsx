import { useEffect } from 'react';
import { logAuditEvent, AuditActions, getCurrentActor } from '../services/auditLogger';

// components
import Saved from '../components/Add/Saved';
import Arrow from '../components/Arrow/Arrow';
import Button from '../components/Form/Button';
import Layout from '../components/Layout/Layout';
import Divider from '../components/Divider/Divider';
import Destination from '../components/Add/Destination';

const Add: React.FC = () => {
  useEffect(() => {
    logAuditEvent(getCurrentActor(), AuditActions.TRANSACTION_VIEW, 'page:add-money', 'success');
  }, []);

  const handleAddMoney = (): void => {
    logAuditEvent(
      getCurrentActor(),
      AuditActions.TRANSACTION_INITIATE,
      'transaction:add-money',
      'success'
    );
  };

  return (
    <Layout>
      <Divider />

      <h1 className='title no-select'>Add money</h1>

      <Saved />

      <Arrow />

      <Destination />

      <Divider />

      <div className='add-buttons flex flex-space-between'>
        <Button type='submit' text='Add money securely' tabIndex={0} onClick={handleAddMoney} />
      </div>

      <Divider />
    </Layout>
  );
};

export default Add;
