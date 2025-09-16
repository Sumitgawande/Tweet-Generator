from langchain_core.prompts import PromptTemplate
from langchain.chains import LLMChain
from llm import get_llm  # assuming this returns a ChatOpenAI from langchain_openai

def get_tweet_chain():
    prompt = PromptTemplate(
        input_variables=["topic"],
        template="Write a short, witty tweet about: {topic}"
    )
    llm = get_llm()
    chain = LLMChain(llm=llm, prompt=prompt)
    return chain
