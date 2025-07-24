
'use client';

const WEBHOOK_URL = 'https://n8n.goilab.com/webhook/recibir-error';

interface ErrorData {
  message: string;
  stack?: string;
  componentStack?: string;
  trigger?: string;
  timestamp: string;
  url: string;
  userAgent: string;
  environment: 'production' | 'development';
  source: string; // Nuevo campo para identificar el origen
}

export async function logError(errorData: Omit<ErrorData, 'timestamp' | 'url' | 'userAgent' | 'environment' | 'source'>) {
   if (process.env.NODE_ENV === 'development') {
    console.info('Error logging is active. Data:', { ...errorData, source: 'GoiLab Web' });
   }

  try {
    const fullErrorData: ErrorData = {
      ...errorData,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : 'N/A',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A',
      environment: process.env.NODE_ENV || 'development',
      source: 'GoiLab Web', // Valor fijo para esta aplicación
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
