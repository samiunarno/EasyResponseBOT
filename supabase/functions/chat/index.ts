import { Configuration, OpenAIApi } from 'npm:openai@^4.0.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not set in environment variables');
    }

    const { message } = await req.json();
    if (!message) {
      throw new Error('Message is required');
    }

    const configuration = new Configuration({
      apiKey: apiKey,
    });
    const openai = new OpenAIApi(configuration);

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are BondhuBot, a helpful and friendly bilingual assistant that can communicate in both English and Bangla.
            If the user writes in English, respond in English.
            If the user writes in Bangla, respond in Bangla.
            If they mix languages, you should also mix languages in your response.
            Keep your responses clear, helpful, and friendly.
            You can help with writing, translation, explanations, coding, and general questions.`
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      const response = completion.choices[0].message.content;

      return new Response(
        JSON.stringify({ response }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      );
    } catch (openaiError) {
      console.error('OpenAI API Error:', openaiError);
      throw new Error(`OpenAI API Error: ${openaiError.message}`);
    }
  } catch (error) {
    console.error('Edge Function Error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'If this persists, please ensure OPENAI_API_KEY is properly set in Supabase environment variables'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});