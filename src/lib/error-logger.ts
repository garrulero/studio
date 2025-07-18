
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
    console.info('Error logging is active. Sending test error to webhook:', errorData);
  }

  try {
    const fullErrorData: ErrorData = {
      ...errorData,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : 'N/A',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A',
    };
    
    // Usamos fetch porque sendBeacon puede ser bloqueado por algunos ad-blockers y es menos flexible.
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fullErrorData),
      keepalive: true, // Importante para que la petición no se cancele si la página se cierra.
    });
  } catch (e) {
    console.error('Failed to log error to webhook:', e);
  }
}

// Función específica para probar el sistema de logging de errores.
export function triggerTestError() {
  try {
    // @ts-ignore
    nonExistentFunction();
  } catch (error: any) {
    // Capturamos el error para obtener un stack trace real
    logError({
        message: `Test Error: ${error.message}`,
        stack: error.stack,
        componentStack: 'Triggered from test button in Footer.'
    });
  }
}
