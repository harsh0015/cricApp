#bring in lighweight depndencies
from fastapi import FastAPI
from pydantic import BaseModel
import pickle
import sys
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

final_df = pd.read_csv(r'C:\Users\harsh\Desktop\projects2\ml_api\final_df.csv')


app=FastAPI()
origins = [
    "*"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScoringItem(BaseModel):
    
    batting_team : str # "Chennai Super Kings",
    bowling_team:  str #"Royal Challengers Bangalore",
    city:  str #"Bengaluru",
    runs_left : int #191,
    balls_left :int #104,
    wickets_left: int #9,
    total_runs_x:int #213,
    crr: float #8.625,
    rrr: float #11.0192

with open('pipe.pkl','rb') as f:
    model=pickle.load(f)



def funct(data):
    one_hot_encoded_data = pd.get_dummies(data, columns = ['batting_team','bowling_team','city'])
    one_hot_encoded_data=pd.DataFrame(one_hot_encoded_data)
    return one_hot_encoded_data

final_df=funct(final_df)

@app.post('/')
async def scoring_endpoint(item:ScoringItem):
    print(item)
    df=pd.DataFrame([item.dict().values()], columns=item.dict().keys())
    df=funct(df)
  
    df = pd.concat([final_df, df], axis=0)
    df = df.replace(np.nan, 0)
    a=df.tail(1)
  
    print(type(a))
    
    yhat=model.predict_proba(a)[0]
    print(type(yhat))
    predict={yhat[0],yhat[1]}
    return {"prediction":predict}    
    return {"hello":"world"}

@app.get("/")
async def helo():
    print("chal na")
    return {"is":"erking"}