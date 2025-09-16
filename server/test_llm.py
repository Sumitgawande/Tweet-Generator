from llm import get_llm

llm = get_llm()
response = llm.invoke("Write a funny tweet about AI taking over coffee shops.")
print(response.content)

