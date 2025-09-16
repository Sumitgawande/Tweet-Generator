from fastapi import FastAPI
from pydantic import BaseModel
from chains import get_tweet_chain

app = FastAPI()
chain = get_tweet_chain()

class TweetRequest(BaseModel):
    topic: str

class TweetResponse(BaseModel):
    tweet: str

@app.post("/generate-tweet", response_model=TweetResponse)
def generate_tweet(req: TweetRequest):
    result = chain.run(topic=req.topic)
    return {"tweet": result}
