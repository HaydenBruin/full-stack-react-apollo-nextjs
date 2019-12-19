import { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import HabitButton from './HabitButton'

const REMOVE_HABIT = gql`
  mutation removeHabit($habitId: ID) {
    removeHabit(habitId: $habitId) {
      _id
    }
  }
`;

const colors = [
  '#718096',
  '#F56565',
  '#F6E05E',
  '#68D391',
  '#63B3ED'
]

const Habit = ({ habit, index }) => {
  const dates = getLast5Days();
  const [isRemoved, setIsRemoved] = useState(false);
  const [removeHabit] = useMutation(REMOVE_HABIT);

  if(isRemoved) return null;
  return (
    <article>
      <h3 style={{ borderColor: colors[index] }}>{habit.name} ({habit._id})</h3>
      <span onClick={() => {
        removeHabit({
          variables: {
            habitId: habit._id
          }
        })
        setIsRemoved(true)
      }}>X</span>
      <div className="buttons">
        {dates.map(date => {
          return <HabitButton key={date.getTime()} date={date} habitId={habit._id} events={habit.events} />
        })}
      </div>

      <style jsx>{`
        article {
          position: relative;
          margin-bottom: 30px;
          padding: 20px;
          border-radius: 15px;
          box-shadow: 2px 2px 15px rgba(0,0,0, 0.1);
        }
        article span {
          position: absolute;
          top: 10px;
          right: 15px;
          background: red;
          border-radius: 100%;
          color: #FFF;
          width: 32px;
          height: 32px;
          line-height: 32px;
          text-align: center;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        article span:hover {
          opacity: 0.8;
          transform: scale(1.1);
        }
        h3 {
          margin-top: 0;
          padding-bottom: 5px;
          border-bottom: solid 4px ${colors[index]}
        }

        .buttons {
          display: flex;
        }
      `}
      </style>
    </article>
  )
}

const getLast5Days = () => {
  const dates = '01234'.split('').map(day => {
    const tempDate = new Date();
    tempDate.setDate(tempDate.getDate() - day);
    return tempDate
  });
  return dates;
}

export default Habit