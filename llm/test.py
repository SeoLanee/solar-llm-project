import os
from openai import OpenAI
from pprint import pprint
from dotenv import load_dotenv

from langchain_upstage import ChatUpstage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.output_parsers import StrOutputParser
from langchain_core.messages import AIMessage, HumanMessage

load_dotenv()
if "UPSTAGE_API_KEY" not in os.environ:
    os.environ["UPSTAGE_API_KEY"] = getpass.getpass("Enter your Upstage API key: ")

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

# 3. define chain

history = []

chain = rag_with_history_prompt | llm | StrOutputParser()

chain_result = chain.invoke({"history": history, "input": "init"})
print(chain_result)
for i in range (0, 5):
    user_input = input("Enter an input: ")
    history.append(HumanMessage(user_input))
    chain_result = chain.invoke({"history": history, "input": user_input})
    history.append(AIMessage(chain_result))
    print(chain_result)

print(history)
