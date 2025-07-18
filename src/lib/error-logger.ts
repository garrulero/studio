
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
    console.info('Error logging is active. Sending error to webhook:', errorData);
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
      keepalive: true, // keepalive ayuda a asegurar que la petición se envíe incluso si la página se está cerrando
    });
  } catch (e) {
    console.error('Failed to log error to webhook:', e);
  }
}

// Función específica para probar el sistema de logging de errores.
export function triggerTestError() {
    logError({
        message: 'This is a test error from the GoiLab website.',
        stack: new Error('Test Error Stack').stack,
        componentStack: 'Triggered from test button in Footer.'
    });
}
