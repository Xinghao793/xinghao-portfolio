import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { message?: string };
  const message = body.message?.trim() ?? "";

  // 二期接入 DeepSeek：把 DEEPSEEK_API_KEY 放进环境变量，
  // 在这里调用 deepseek-chat，并用 content/profile.json 与实习日志作为知识库。
  const reply = message
    ? "这是 AI 助手的占位接口。二期接入 DeepSeek 后，我会根据你的个人资料和实习日志回答这个问题。"
    : "请先输入一个问题。";

  return NextResponse.json({ reply });
}
