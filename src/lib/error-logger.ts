
'use client';

const WEBHOOK_URL = 'https://n8n.garrulero.xyz/webhook-test/recepcion-errores';

interface ErrorData {
  message: string;
  stack?: string;
  componentStack?: string;
  timestamp: string;
  url: string;
  userAgent: string;
}

export async function logError(errorData: Omit<ErrorData, 'timestamp' | 'url' | 'userAgent'>) {
  if (process.env.NODE_ENV === 'development') {
    console.info('Error logging is active and an error would be sent to the webhook:', errorData);
  }

  try {
    const fullErrorData: ErrorData = {
      ...errorData,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    };
    
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(fullErrorData)], { type: 'application/json' });
      navigator.sendBeacon(WEBHOOK_URL, blob);
    } else {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fullErrorData),
        keepalive: true,
      });
    }
  } catch (e) {
    console.error('Failed to log error to webhook:', e);
  }
}

// Función específica para probar el sistema de logging de errores.
export function triggerTestError() {
  // @ts-ignore
  nonExistentFunction();
}
