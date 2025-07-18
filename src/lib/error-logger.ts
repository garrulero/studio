
'use client';

const WEBHOOK_URL = 'https://n8n.garrulero.xyz/webhook/recibir-error';

interface ErrorData {
  message: string;
  stack?: string;
  componentStack?: string;
  timestamp: string;
  url: string;
  userAgent: string;
  environment: 'production' | 'development';
}

export async function logError(errorData: Omit<ErrorData, 'timestamp' | 'url' | 'userAgent' | 'environment'>) {
  if (process.env.NODE_ENV === 'development') {
    console.info('Error logging is active, but not sending to webhook in dev mode. Error data:', errorData);
    // Para no saturar el webhook en desarrollo, no enviamos el error.
    // Si necesitas probar el webhook, puedes comentar la siguiente línea.
    return;
  }

  try {
    const fullErrorData: ErrorData = {
      ...errorData,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : 'N/A',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A',
      environment: process.env.NODE_ENV,
    };
    
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fullErrorData),
      keepalive: true,
    });
  } catch (e) {
    console.error('Failed to log error to webhook:', e);
  }
}
