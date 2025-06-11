import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface ConversationRequest {
  conversation_name: string;
  conversational_context: string;
  custom_greeting: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { conversation_name, conversational_context, custom_greeting }: ConversationRequest = await req.json()

    // Tavus API configuration with your API key
    const TAVUS_API_KEY = 'cfc37aa236ae48209619c7fa314f315b'
    const REPLICA_ID = 'rb17cf590e15'
    const PERSONA_ID = 'p82a832320c5'

    // Create conversation with Tavus API - Set to 5 minutes (300 seconds)
    const tavusResponse = await fetch('https://tavusapi.com/v2/conversations', {
      method: 'POST',
      headers: {
        'x-api-key': TAVUS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        replica_id: REPLICA_ID,
        persona_id: PERSONA_ID,
        conversation_name,
        conversational_context,
        custom_greeting,
        properties: {
          max_call_duration: 300, // 5 minutes in seconds
          participant_left_timeout: 30, // Reduced timeout
          participant_absent_timeout: 60, // Reduced timeout
          enable_recording: false,
          enable_transcription: true,
        }
      }),
    })

    if (!tavusResponse.ok) {
      const errorText = await tavusResponse.text()
      console.error('Tavus API Error:', errorText)
      throw new Error(`Tavus API error: ${tavusResponse.status} - ${errorText}`)
    }

    const conversationData = await tavusResponse.json()

    return new Response(
      JSON.stringify(conversationData),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error creating conversation:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to create conversation',
        details: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})