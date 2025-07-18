
'use client';

const WEBHOOK_URL = 'https://n8n.garrulero.xyz/webhook/recibir-error';

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
    console.info('Error logging is active. Sending error to webhook:', errorData);
  }

  try {
    const fullErrorData: ErrorData = {
      ...errorData,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : 'N/A',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A',
    };
    
    // Para asegurar la máxima compatibilidad con n8n, enviamos los datos como un formulario.
    // Esto hace que los datos aparezcan directamente en `body` dentro del flujo de n8n.
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

// Función específica para probar el sistema de logging de errores.
export function triggerTestError() {
    logError({
        message: 'This is a test error from the GoiLab website.',
        stack: new Error('Test Error Stack').stack,
        componentStack: 'Triggered from test button in Footer.'
    });
}
