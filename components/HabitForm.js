import { Form, Field } from '@leveluptuts/fresh'

const HabitForm = (props) => {
  const { setHabits } = props;
  return (
    <Form onSubmit={data => {
      console.log('form data: ',data);
      setHabits(prevState => [ ...prevState, data.habit])
    }}>
      <Field>Habit</Field>
    </Form>
  )
}

export default HabitForm