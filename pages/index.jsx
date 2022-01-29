import React from 'react'
import Dashboard from '../components/Dashboard'
const URL = process.env.URL

export default function Home({certs}) {
  // console.log({certs})
  return (
    <Dashboard certs={certs} pageName="Dashboard" />
  )
}

export const getStaticProps = async (context) => {

  const res = await fetch(`${URL}/api/certs`)
  const data = await res.json()
  // console.log({data})
  if (!data.success) {
    return {
      notFound: true,
      revalidate: 10
    }
  }
  return {
    props: { certs: data.data.filter(row => !row.hasOwnProperty('renew') && !row.hasOwnProperty('renewed') ) }, // will be passed to the page component as props
    revalidate: 10
  }
}