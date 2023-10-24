from dotenv import load_dotenv
from flask import Flask, request,jsonify
from flask_cors import CORS
import sys
load_dotenv()

from langchain.agents.agent_types import AgentType
from langchain.chat_models import ChatOpenAI

from langchain.agents import create_csv_agent
app = Flask(__name__)

CORS(app)
file = "publicholiday.csv"
agent = create_csv_agent(
     ChatOpenAI(temperature=0, model="gpt-3.5-turbo-0613"),
     file,
     agent_type=AgentType.OPENAI_FUNCTIONS,
     )
@app.route('/ask', methods=['POST'])
def question():
     
   
     data = request.get_json()
     question = data['date']
     print(question, file=sys.stderr)
     prompt = f"there are list of holidays in the file , check wheather the given date is in the list or not if present what is the nom_jour_ferie{question}"
     res=agent.run(prompt)
     print(res, file=sys.stderr)
     return jsonify( {"msg" :res} )
    
if __name__ == "__main__":
    app.run(debug=True,port=4000)


