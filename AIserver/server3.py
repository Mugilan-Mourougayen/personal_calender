import pandas as pd
from langchain import PromptTemplate, LLMChain
from langchain.llms import OpenAI
from dotenv import load_dotenv

import logging
logging.getLogger().setLevel(logging.CRITICAL)
load_dotenv()

import giskard 
df = pd.read_csv("D:\personal_calender\publicholiday.csv")
df_filtered = pd.DataFrame(df["date"].sample(10, random_state=11))
print(df_filtered)

cdate = "11-11-2023"
prompt_template = "'{cdate}'  is the given date is a public holiday listed in the file if listed what holiday it is"

from langchain.chat_models import ChatOpenAI


llm = OpenAI(
    request_timeout=20,
    max_retries=100,
    temperature=0,
    model="gpt-3.5-turbo-0613",
) 
chain = LLMChain(prompt=PromptTemplate.from_template(prompt_template), llm=llm)

dataset = giskard.Dataset(df=df_filtered, column_types={"date": "text"})

model = giskard.Model(chain, model_type="text_generation")

results = giskard.scan(model, dataset)
pd.set_option("display.max_colwidth", 999)
print(results)
logging.getLogger().setLevel(logging.NOTSET)