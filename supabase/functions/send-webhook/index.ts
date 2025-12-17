import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const WEBHOOK_URL = "https://primary-production-bd72.up.railway.app/webhook/2848a75f-6836-4752-ad29-360a0f5964fb";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, message, leadName } = await req.json();

    console.log('Sending webhook for:', { email, leadName });

    // Build URL with query parameters for GET request
    const url = new URL(WEBHOOK_URL);
    url.searchParams.set('email', email);
    url.searchParams.set('message', message);
    url.searchParams.set('leadName', leadName);
    url.searchParams.set('timestamp', new Date().toISOString());

    const response = await fetch(url.toString(), {
      method: 'GET',
    });

    const responseText = await response.text();
    console.log('Webhook response:', response.status, responseText);

    if (!response.ok) {
      throw new Error(`Webhook failed: ${response.status} ${responseText}`);
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      data = { message: responseText || 'Email sent successfully' };
    }

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Error in send-webhook function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
