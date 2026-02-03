import { Sentry } from '../sentry';

export type AuditOutcome = 'success' | 'failure';

export interface AuditEvent {
  timestamp: string;
  actor: string;
  action: string;
  resource: string;
  outcome: AuditOutcome;
  metadata?: Record<string, unknown>;
}

export const AuditActions = {
  USER_LOGIN: 'USER_LOGIN',
  USER_LOGOUT: 'USER_LOGOUT',
  BALANCE_VIEW: 'BALANCE_VIEW',
  TRANSACTION_VIEW: 'TRANSACTION_VIEW',
  TRANSACTION_INITIATE: 'TRANSACTION_INITIATE',
  PROFILE_VIEW: 'PROFILE_VIEW',
  PROFILE_UPDATE: 'PROFILE_UPDATE',
  CARD_VIEW: 'CARD_VIEW',
  CARD_MANAGE: 'CARD_MANAGE',
  SAVINGS_VIEW: 'SAVINGS_VIEW',
  SAVINGS_SELECT_CURRENCY: 'SAVINGS_SELECT_CURRENCY',
} as const;

export type AuditAction = (typeof AuditActions)[keyof typeof AuditActions];

export const logAuditEvent = (
  actor: string,
  action: AuditAction | string,
  resource: string,
  outcome: AuditOutcome,
  metadata?: Record<string, unknown>
): void => {
  const event: AuditEvent = {
    timestamp: new Date().toISOString(),
    actor,
    action,
    resource,
    outcome,
    metadata,
  };

  console.info('[AUDIT]', JSON.stringify(event));

  Sentry.addBreadcrumb({
    category: 'audit',
    message: action,
    level: outcome === 'success' ? 'info' : 'warning',
    data: event,
  });
};

export const getCurrentActor = (): string => {
  return 'current-user';
};
