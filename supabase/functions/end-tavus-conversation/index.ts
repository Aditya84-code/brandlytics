const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface EndConversationRequest {
  conversation_id: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { conversation_id }: EndConversationRequest = await req.json()

    if (!conversation_id) {
      throw new Error('conversation_id is required')
    }

    // Tavus API configuration with your API key
    const TAVUS_API_KEY = 'cfc37aa236ae48209619c7fa314f315b'

    // End conversation with Tavus API
    const tavusResponse = await fetch(`https://tavusapi.com/v2/conversations/${conversation_id}/end`, {
      method: 'POST',
      headers: {
        'x-api-key': TAVUS_API_KEY,
        'Content-Type': 'application/json',
      },
    })

    if (!tavusResponse.ok) {
      const errorText = await tavusResponse.text()
      console.error('Tavus API Error:', errorText)
      throw new Error(`Tavus API error: ${tavusResponse.status} - ${errorText}`)
    }

    // Handle response based on status and content
    let endResponse = {}
    
    // Check if response has content before trying to parse JSON
    const contentLength = tavusResponse.headers.get('Content-Length')
    const contentType = tavusResponse.headers.get('Content-Type')
    
    if (tavusResponse.status === 204 || contentLength === '0') {
      // No content response (204 No Content or empty body)
      endResponse = { status: 'ended', conversation_id }
    } else if (contentType && contentType.includes('application/json')) {
      // Only parse as JSON if content type indicates JSON
      try {
        endResponse = await tavusResponse.json()
      } catch (jsonError) {
        // If JSON parsing fails, treat as successful with basic response
        console.warn('Failed to parse JSON response, treating as successful:', jsonError)
        endResponse = { status: 'ended', conversation_id }
      }
    } else {
      // Non-JSON response, treat as successful
      endResponse = { status: 'ended', conversation_id }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Conversation ended successfully',
        data: endResponse
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error ending conversation:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to end conversation',
        details: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})