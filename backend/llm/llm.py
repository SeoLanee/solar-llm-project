import os
import httpx
import asyncio
from dotenv import load_dotenv
from langchain_upstage import ChatUpstage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.output_parsers import StrOutputParser
from langchain_core.messages import AIMessage, HumanMessage

# 환경 변수 로드
load_dotenv()

llm = ChatUpstage()

rag_with_history_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", "You are an assistant for writing a technical document."),
        ("system", "You ask some questions from given specifications, and write a document for it."),
        ("system", "I will tell you some steps to do."),
        ("system", "First, ask the specification of document. Abstract, details, result, references... etc."),
        ("system", "Second, ask the field of document."),
        ("system", "Third, ask some questions needed to write the document. Repeat until human says done."),
        ("system", "Initial input is 'init'"),
        MessagesPlaceholder(variable_name="history"),
        ("human", "{input}"),
    ]
)

history = []
chain = rag_with_history_prompt | llm | StrOutputParser()

# 비동기 함수로 변환
async def query_mode_async(question: str) -> str:
    history.append(HumanMessage(question))
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://api.upstage.ai/v1/solar/generate",
            json={"history": history, "input": question},
            headers={"Authorization": f"Bearer {os.environ['UPSTAGE_API_KEY']}"}
        )
        answer = response.json().get("choices", [])[0].get("text", "").strip()
        history.append(AIMessage(answer))
    return answer
