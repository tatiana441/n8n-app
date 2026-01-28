import type { UserData } from '@/types';

// n8n Webhook URLs
const CHAT_WEBHOOK_URL = 'https://n8n.srv1122579.hstgr.cloud/webhook/0a9f80ce-a76b-4965-a737-50fe442bec4b';

// This webhook will receive user registration data
// You need to create this webhook in n8n and connect it to Google Sheets
const REGISTRATION_WEBHOOK_URL = 'https://n8n.srv1122579.hstgr.cloud/webhook/user-registration';

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
