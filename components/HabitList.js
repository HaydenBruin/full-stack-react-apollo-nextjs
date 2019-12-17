import Habit from './Habit'

const HabitList = ({ habits }) => {
  return (
    <section>
      <h2>My Habits</h2>

      {habits.map((habit, index) => (
        <Habit index={index} key={habit} habit={habit}/>
      ))}
    </section>
  )
}

export default HabitList;