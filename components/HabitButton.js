import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const ADD_EVENT = gql`
  mutation addEvent($date: Date, $habitId: ID) {
    addEvent(date: $date, habitId: $habitId) {
      _id
      name
      events {
        _id
        date
      }
    }
  }
`;

const REMOVE_EVENT = gql`
  mutation removeEvent($eventId: ID, $habitId: ID) {
    removeEvent(eventId: $eventId, habitId: $habitId) {
      _id
      name
      events {
        _id
        date
      }
    }
  }
`;

const HabitButton = ({ date, habitId, events }) => {
  const [addEvent] = useMutation(ADD_EVENT, {
    refetchQueries: ['getHabits']
  })
  const [removeEvent] = useMutation(REMOVE_EVENT, {
    refetchQueries: ['getHabits']
  })

  const foundDate = events.find(event => {
    const eventDate = new Date(event.date)
    return eventDate.getDate() === date.getDate();
  })

  return (
    <span>
      <div className="date">{date.getMonth() + 1}/{date.getDate()}</div>
      <div className="details">
        {foundDate ? (
          <button onClick={() => removeEvent({ variables: {
            habitId, eventId: foundDate._id
          }})}>X</button>
        ) : (
          <button onClick={() => addEvent({ variables: {
            habitId, date 
          }})}>O</button>
        )}
      </div>

      <style jsx>{`
        span {
          display: flex;
          flex-direction: column;
          background: #FFF;
          width: 60px;
          text-align: center;
        }

        .date {
          background: #4072FF;
          color: #FFF;
          padding: 10px 0;
        }

        .details {
          border: 1px solid #eee;
          border-top: 0;
        }
          
        span + span {
          margin-left: 10px;
        }

        button {
          border: none;
          background: transparent;
          padding: 10px 0;
          font-size: 18px;
          width: 100%;
          cursor: pointer;
        }
        button:hover {
          background: #eee;
        }
      `}</style>
    </span>
  )
}

export default HabitButton