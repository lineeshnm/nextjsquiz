import React from 'react';
const APP_NAME = process.env.APP_NAME
const URL = process.env.URL

const Modify = ({certs}) => {
  // console.log(certs)
  return (
    <div className='flex-grow px-12' >
      <div className="text-center text-4xl font-semibold text-white mb-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      {`${APP_NAME} - DB Modify`}
      </div>
      {certs.map(cert => (<div>{cert._id}</div>))}
    </div>
  )
};

export default Modify;

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
    props: { certs: data.data }, // will be passed to the page component as props
    revalidate: 10
  }
}
