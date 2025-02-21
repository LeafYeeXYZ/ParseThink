import type OpenAI from 'jsr:@openai/openai@4.85.3'

const REG_DEEPSEEK = /<think>[\s\S]*?<\/think>/

/**
 * Parse think process of LLMs like DeepSeek-R1 and return the clean result and the think process.
 * @param raw raw response message from OpenAI
 * @returns parsed message with think field if exists
 */
export default function parse(raw: OpenAI.Chat.ChatCompletionAssistantMessageParam | string): { content: string, think?: string } {
  if (typeof raw === 'string') {
    const match = raw.match(REG_DEEPSEEK)
    return {
      content: match ? raw.replace(REG_DEEPSEEK, '').trim() : raw,
      think: match ? match[0].slice(7, -8).trim() : undefined,
    }
  } else if (typeof raw.content !== 'string') {
    throw new TypeError('Missing content field in the response, this might be a function call response')
  } else {
    // @ts-ignore DeepSeek API custom field
    let think = raw.reasoning_content as string | undefined ?? undefined
    const match = think?.match(REG_DEEPSEEK)
    if (match) {
      think = match[0].slice(7, -8).trim()
    }
    return {
      content: match ? raw.content.replace(REG_DEEPSEEK, '').trim() : raw.content,
      think,
    }
  }
}
