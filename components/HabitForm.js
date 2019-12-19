import { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const ADD_HABIT = gql`
  mutation addHabit($habit: HabitInput) {
    addHabit(habit: $habit) {
      _id
      name
    }
  }
`;

const HabitForm = () => {
  const [newHabit, setNewHabit] = useState('');
  const [addHabit] = useMutation(ADD_HABIT, {
    refetchQueries: ['getHabits']
  });
  return (
    <form onSubmit={e => {
      e.preventDefault();
      if(newHabit) {
        addHabit({
          variables: {
            habit: {
              name: newHabit
            }
          }
        })
      }
      else {
        co
      }
    }}>
      <div className="fields">
        <input type="text" name="habit" value={newHabit} onChange={(e) => setNewHabit(e.target.value)} placeholder="Enter new habit..."/>
        <button>Create</button>
      </div>

      <style jsx>{`
        .fields {
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          margin-bottom: 15px;
        }
        input {
          width: 100%;
          border: 1px solid #eee;
          height: 50px;
          padding: 0 15px;
          font-size: 18px;
          border-radius: 5px;
        }
        button {
          margin-left: 15px;
          border: 0;
          display:inline-block;
          padding: 0 15px;
          height: 50px;
          line-height: 50px;
          border-radius: 5px;
          box-sizing: border-box;
          text-decoration:none;
          font-family:'Roboto',sans-serif;
          font-weight:400;
          color:#FFFFFF;
          background-color:#3369ff;
          box-shadow:inset 0 -0.6em 1em -0.35em rgba(0,0,0,0.17),inset 0 0.6em 2em -0.3em rgba(255,255,255,0.15),inset 0 0 0em 0.05em rgba(255,255,255,0.12);
          text-align:center;
          position:relative;
          cursor: pointer;
        }
        button:hover {
          box-shadow:inset 0 0.6em 2em -0.3em rgba(0,0,0,0.15),inset 0 0 0em 0.05em rgba(255,255,255,0.12);
        }
      `}
      </style>
    </form>
  )
}

export default HabitForm