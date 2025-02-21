# ParseThink

Parse think process of LLMs like DeepSeek-R1 and return the clean result and the think process.

[![JSR Scope](https://jsr.io/badges/@leaf)](https://jsr.io/@leaf)
[![JSR Version](https://jsr.io/badges/@leaf/parse-think)](https://jsr.io/@leaf/parse-think)
[![JSR Score](https://jsr.io/badges/@leaf/parse-think/score)](https://jsr.io/@leaf/parse-think/score)

## Usage

```typescript
import OpenAI from 'npm:openai'
import parse from 'jsr:@leaf/parse-think'

const ai = new OpenAI({
  baseUrl: 'https://api.deepseek.com/v1',
  apiKey: '<YOUR_API_KEY>',
})
const res = await ai.chat.completions.create({
  model: 'deepseek-reasoner',
  messages: [
    { role: 'user', content: 'What is the result of 2 + 2 * 2?' },
  ],
})
const { result, think } = parse(res.choices[0].message)
console.log('Result:', result)
console.log('Think:', think)
```
