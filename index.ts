import type OpenAI from 'jsr:@openai/openai@4.85.3'

export default function parse(raw: OpenAI.Chat.ChatCompletion | string): { content: string, think?: string } {

  let content: string = ''
  let think: string | undefined = undefined

  if (typeof raw !== 'string') {
    content = raw.choices[0].message.content ?? ''
    // @ts-expect-error DeepSeek 官方 API 的自定义字段
    think = raw.choices[0].message.reasoning_content ?? undefined
  } else {
    content = raw
  }
  if (!content) {
    throw new Error('解析模型输出时出现错误')
  }
  const reg = /<think>[\s\S]*?<\/think>/
  const match = content.match(reg)
  if (match) {
    think = match[0].slice(7, -8).trim()
    content = content.replace(reg, '').trim()
  }
  return { content, think }
}
