import streamlit as st
import pickle
import pandas as pd



st.title('IPL win predictor')
pipe=pickle.load(open('pipe.pkl','rb'))
teams=['Sunrisers Hyderabad',
 'Mumbai Indians',
 'Royal Challengers Bangalore',
 'Kolkata Knight Riders',
 'Kings XI Punjab',
 'Chennai Super Kings',
 'Rajasthan Royals',
 'Delhi Capitals']
cities=['Hyderabad', 'Bangalore', 'Mumbai', 'Indore', 'Kolkata', 'Delhi',
       'Chandigarh', 'Jaipur', 'Chennai', 'Cape Town', 'Port Elizabeth',
       'Durban', 'Centurion', 'East London', 'Johannesburg', 'Kimberley',
       'Bloemfontein', 'Ahmedabad', 'Cuttack', 'Nagpur', 'Dharamsala',
       'Visakhapatnam', 'Pune', 'Raipur', 'Ranchi', 'Abu Dhabi',
       'Sharjah','Mohali', 'Bengaluru']

col1,col2=st.columns(2)

with col1:
    batting_team=st.selectbox('Select Batting Team',sorted(teams))
with col2:
    bowling_team=st.selectbox('Select Bowling Team',sorted(teams))

selected_city=st.selectbox('Select host city',sorted(cities))
target=st.number_input('Target')
col3,col4,col5=st.columns(3)

with col3:
    score=st.number_input('Score')
with col4:
    overs=st.number_input('Overs_completed')
with col5:
    wickets=st.number_input('Wickets out')

if st.button('Predict Probability'):
    runs_left=target-score
    balls_left=120-(overs*6)
    wickets=10-wickets
    crr=score/overs
    rrr=(runs_left*6)/balls_left

    intput_df=pd.DataFrame({'batting_team':[batting_team],'bowling_team':[bowling_team],
             'city':[selected_city],'runs_left':[runs_left],'balls_left':[balls_left],
                  'wickets_left':[wickets],'total_runs_x':[target],'crr':[crr],
                            'rrr':[rrr]})
    st.table(intput_df)
    result=pipe.predict_proba(intput_df)
    # st.text(result)



