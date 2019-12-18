import Habit from './Habit';
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const GET_HABITS = gql`
  query getHabits {
    habits {
      _id
      name
      events {
        _id
        date
      }
    }
  }
`;

const HabitList = () => {
  const { data, loading, error } = useQuery(GET_HABITS);
  if(error) {
    console.log('error: ',error);
    return <section />;
  }
  if(loading) return <section />

  const { habits } = data;

  return (
    <section>
      <h2>My Habits</h2>

      {habits.map((habit, index) => (
        <Habit index={habit._id} key={habit._id} habit={habit}/>
      ))}
    </section>
  )
}

export default HabitList;