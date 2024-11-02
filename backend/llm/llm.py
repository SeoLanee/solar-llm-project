import os
from openai import OpenAI
from pprint import pprint
from dotenv import load_dotenv

from langchain_upstage import ChatUpstage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.output_parsers import StrOutputParser
from langchain_core.messages import AIMessage, HumanMessage

client = OpenAI(
    api_key=os.environ["UPSTAGE_API_KEY"], base_url="https://api.upstage.ai/v1/solar"
)

llm = ChatUpstage(api_key=os.getenv("UPSTAGE_API_KEY"))

rag_with_history_prompt_query = ChatPromptTemplate.from_messages(
    [
        ("system", "You are a assistant for writing an technical document."),
        ("system", "You ask some questions from given specifications, and write a document for it."),
        ("system", "I will tell you some steps to do."),
        ("system", "First, ask the specification of document. Abstract, details, result, referencs... etc."),
        ("system", "Second, ask the field of document."),
        ("system", "Third, ask some questions need for write document. repeat till human say done."),
        ("system", "Initial input is 'init'"),

        MessagesPlaceholder(variable_name="history"),

        ("human", "{input}"),
    ]
)

rag_with_history_prompt_report = ChatPromptTemplate.from_messages(
    [
        ("system", "You are a assistant for writing an technical document."),
        ("system", "You should write a report in detail."),
        ("system", "You should write in a report format."),
        ("system", "You ask some questions from given specifications, and write a document for it."),
        ("system", "Answer me in markdown language. Using ### like that"),
        ("system", "businesslike, formal, official answers."),

        MessagesPlaceholder(variable_name="history"),

        ("human", "{input}"),
    ]
)


def query_mode(chain, question: str) -> str:
    answer = chain.invoke({"history": history, "input": "init"})

    history.append(HumanMessage(question))
    answer = chain.invoke({"history": history, "input": question})
    history.append(AIMessage(answer))

    return answer


def report_mode(chain) -> str:
    answer = chain.invoke({"history": history, "input": "마크다운언어로 써야해. 지금까지 주고받은 내용을 기반으로 보고서를 길게 작성해줘. <마크다운 언어>로"})

    return answer


history = []

query_chain = rag_with_history_prompt_query | llm | StrOutputParser()
report_chain = rag_with_history_prompt_report | llm | StrOutputParser()
answer = query_chain.invoke({"history": history, "input": "init"})
print(answer)

for i in range(6):
    question = input()
    if question == '1':
        print(report_mode(report_chain))
    else:
        print(query_mode(query_chain, question))