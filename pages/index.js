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
  const { data, loading, error } = useQuery(HELLO_QUERY);

  if(loading) return <div>loading...</div>
  return (
    <div className="habits">
      <Head title="Home" />
      <Nav />

      <div className="hero">
        <h1 className="title">{data.sayHello}</h1>
        <div className="list">
          <HabitForm />
          <HabitList />
        </div>
      </div>

      <style jsx>{`
        .habits {
          width: 800px;
          max-width: 100%;
          margin: 30px auto;
          padding: 30px;
          background: #FFF;
        }
        .hero {
          width: 100%;
          color: #333;
        }
        .hero h1 {
          padding: 0;
          margin: 0 0 30px 0;
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
