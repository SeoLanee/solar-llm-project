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


llm = ChatUpstage()

rag_with_history_prompt = ChatPromptTemplate.from_messages(
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

def query_mode(chain, question: str)-> str:
  answer = chain.invoke({"history": history, "input": "init"})

  history.append(HumanMessage(question))
  answer = chain.invoke({"history": history, "input": question})
  history.append(AIMessage(answer))

  return answer

def report_mode(chain, question: str)-> str:
  pass


history = []

chain = rag_with_history_prompt | llm | StrOutputParser()
answer = chain.invoke({"history": history, "input": "init"})
print(answer)

'''
for i in range (0, 5):
    user_input = input("Enter an input: ")
    history.append(HumanMessage(user_input))
    answer = chain.invoke({"history": history, "input": user_input})
    history.append(AIMessage(answer))
    print(answer)
'''
# print(history)

for i in range(6):
  question=input()
  print(query_mode(chain, question))