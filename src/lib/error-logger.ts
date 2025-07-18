
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
  // Desactivado por defecto en desarrollo para no saturar. Se puede comentar para probar.
  if (process.env.NODE_ENV === 'development') {
    console.info('Error logging is active in development mode for testing purposes.', errorData);
    // En un entorno de producción, podrías querer descomentar la siguiente línea para evitar el envío de errores en desarrollo
    // return; 
  }

  try {
    const fullErrorData: ErrorData = {
      ...errorData,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    };
    
    // Usamos sendBeacon si está disponible para asegurar el envío en caso de que la página se cierre.
    // Si no, recurrimos a fetch.
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
    // Si el logger falla, lo mostramos en la consola para no entrar en un bucle infinito.
    console.error('Failed to log error to webhook:', e);
  }
}
