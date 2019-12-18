import Habit from './Habit';
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const GET_HABITS = gql`
  query getHabits {
    habits {
      _id
      name
    }
  }
`;

const HabitList = () => {
  const { data, loading } = useQuery(GET_HABITS);
  if(loading) return <section />

  const { habits } = data;

  return (
    <section>
      <h2>My Habits</h2>

      {habits.map((habit, index) => (
        <Habit index={habit._id} key={habit} habit={habit}/>
      ))}
    </section>
  )
}

export default HabitList;