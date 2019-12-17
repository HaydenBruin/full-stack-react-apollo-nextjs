import { useState } from 'react'
import React from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/react-hooks'
import { withApollo } from '../lib/apollo'
import gql from 'graphql-tag'

import Head from '../components/head'
import Nav from '../components/nav'
import HabitList from '../components/HabitList'
import HabitForm from '../components/HabitForm'

const HELLO_QUERY = gql`
  query HelloQuery {
    sayHello
  }
`;

const Home = () => {
  const [ habits, setHabits ] = useState(['Do the dishes'])
  const { data, loading, error } = useQuery(HELLO_QUERY);

  if(loading) return <div>loading...</div>
  console.log('data: ',data);
  return (
    <div>
      <Head title="Home" />
      <Nav />

      <div className="hero">
        <h1 className="title">{data.sayHello}</h1>
        <div className="list">
          <HabitForm setHabits={setHabits} />
          <HabitList habits={habits} />
        </div>
      </div>

      <style jsx>{`
        .hero {
          width: 100%;
          color: #333;
        }
        .title {
          margin-top: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
          text-align: center;
        }
        .list {
          max-width: 600px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  )
}

export default withApollo(Home)