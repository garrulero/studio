
'use client';

const WEBHOOK_URL = 'https://n8n.garrulero.xyz/webhook/error-logger-goilab';

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
    // En desarrollo, solo mostramos el error en la consola local
    console.info('Error logging is disabled in development mode.', errorData);
    return;
  }

  try {
    const fullErrorData: ErrorData = {
      ...errorData,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    };
    
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fullErrorData),
      // Keep-alive puede ayudar a asegurar que la solicitud se envíe incluso si la página se está cerrando
      keepalive: true,
    });
  } catch (e) {
    // Si el logger falla, lo mostramos en la consola para no entrar en un bucle infinito.
    console.error('Failed to log error to webhook:', e);
  }
}
