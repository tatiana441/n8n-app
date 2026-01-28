import type { UserData } from '@/types';

// n8n Webhook URLs
const CHAT_WEBHOOK_URL = 'https://n8n.srv1122579.hstgr.cloud/webhook/0a9f80ce-a76b-4965-a737-50fe442bec4b';
const REGISTRATION_WEBHOOK_URL = 'https://n8n.srv1122579.hstgr.cloud/webhook/keimi-user-registration';

// Email verification webhooks
const SEND_CODE_URL = 'https://n8n.srv1122579.hstgr.cloud/webhook/keimi-send-code';
const VERIFY_CODE_URL = 'https://n8n.srv1122579.hstgr.cloud/webhook/keimi-verify-code';

// Send chat message to n8n
export async function sendChatMessage(message: string): Promise<{ success: boolean; response: string }> {
  try {
    const response = await fetch(CHAT_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor');
    }

    const data = await response.json();
    return {
      success: true,
      response: data.response || data.output || 'Sin respuesta',
    };
  } catch (error) {
    console.error('Error sending chat message:', error);
    return {
      success: false,
      response: 'Lo siento, hubo un error al procesar tu mensaje. Intenta de nuevo.',
    };
  }
}

// Send user registration data to n8n for storage in Google Sheets
export async function sendUserRegistration(userData: UserData): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(REGISTRATION_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        phone: userData.phone || '',
        skinType: userData.skinType,
        concern: userData.concern,
        experience: userData.experience,
        createdAt: userData.createdAt,
        source: 'keimi-app',
      }),
    });

    if (!response.ok) {
      console.error('Registration webhook error:', response.status);
      // Don't block the user even if webhook fails
      return { success: false, error: 'Webhook error' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending user registration:', error);
    // Don't block the user - registration data is also in localStorage
    return { success: false, error: String(error) };
  }
}

// Send verification code to email
export async function sendVerificationCode(email: string): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const response = await fetch(SEND_CODE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return { success: false, error: data.error || 'Error al enviar el codigo' };
    }

    return { success: true, message: data.message };
  } catch (error) {
    console.error('Error sending verification code:', error);
    return { success: false, error: 'Error de conexion. Intenta de nuevo.' };
  }
}

// Verify the code entered by user
export async function verifyCode(email: string, code: string): Promise<{ success: boolean; verified: boolean; error?: string }> {
  try {
    const response = await fetch(VERIFY_CODE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, code }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return { success: false, verified: false, error: data.error || 'Codigo invalido' };
    }

    return { success: true, verified: data.verified };
  } catch (error) {
    console.error('Error verifying code:', error);
    return { success: false, verified: false, error: 'Error de conexion. Intenta de nuevo.' };
  }
}
