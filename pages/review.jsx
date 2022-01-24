import { useState, useEffect } from "react"
import { EnhancedTable } from '../components'
import { dataForTable } from '../utils/dbUtils'

const APP_NAME = process.env.APP_NAME
const URL = process.env.URL

export default function Home({certs}) {
  const [rows, setRows] = useState([]);
  // console.log(props.data)
    
  useEffect(() => {
    let list = []
    // console.log("props.data", props.data)
    {certs && certs.map((row) => {
      // console.log({row})
      list = [...list, dataForTable(row)]
    })}
    setRows(list)
    return () => {
      console.log('Un mounted')
    }
  }, [])

  // console.log({rows})

  return (
    <div className='flex-grow px-12' >
      <div className="text-center text-4xl font-semibold text-white mb-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      {`${APP_NAME} - Review`}
      </div>
      <EnhancedTable rows={rows} />
    </div>
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
    props: { certs: data.data }, // will be passed to the page component as props
    revalidate: 10
  }
}