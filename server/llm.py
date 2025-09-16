import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI


load_dotenv()

MODEL = "openai/gpt-4.1"  # or any Bedrock-compatible model like Claude

def get_llm():
    return ChatOpenAI(
        model=MODEL, 
        api_key=os.getenv("OPENROUTER_API_KEY"),
        base_url="https://openrouter.ai/api/v1",
        max_tokens= 500
    )
