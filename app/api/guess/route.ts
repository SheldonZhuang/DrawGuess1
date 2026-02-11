import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { imageData } = await request.json()

    if (!imageData) {
      return NextResponse.json(
        { error: '缺少图片数据' },
        { status: 400 }
      )
    }

    const apiKey = process.env.SILICONFLOW_API_KEY
    const apiUrl = process.env.SILICONFLOW_API_URL

    if (!apiKey || !apiUrl) {
      return NextResponse.json(
        { error: 'API 配置错误' },
        { status: 500 }
      )
    }

    // 调用硅基流动 API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'Qwen/Qwen2.5-VL-72B-Instruct',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: {
                  url: imageData,
                },
              },
              {
                type: 'text',
                text: '请仔细观察这幅画，猜测画的是什么？请直接说出你的猜测，用简短的词语回答，不要解释。',
              },
            ],
          },
        ],
        max_tokens: 100,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('API 错误:', errorText)
      return NextResponse.json(
        { error: `API 调用失败: ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    const guess = data.choices?.[0]?.message?.content || '无法识别'

    return NextResponse.json({ guess })
  } catch (error) {
    console.error('处理请求时出错:', error)
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    )
  }
}
