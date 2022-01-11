import { useState, useEffect } from "react"
import { GetStaticProps } from 'next'
import { EnhancedTable } from '../components'
import { dataForTable } from '../utils'
import { list } from "postcss"

const URL = process.env.URL

export default function Home(props) {
  const [rows, setRows] = useState([
    {Server: "Server", DN: "DN", CN: "CN", KeyStore_Location: "KeyStore_Location", EP_Dependancy: "EP_Dependancy", Valid_Upto: "Valid_Upto", Env: "Env", SF_Group: "SF_Group", ITSI: "ITSI", Thumbprint: "Thumbprint"}
  ])

  
  useEffect(() => {
    let list = []
    {props.data && props.data.map((row) => {
      console.log({row})
      list = [...list, dataForTable(row.Server, row.DN, row.CN, row["KeyStore Location"], row["EP Dependancy"], row["Valid Upto"].$date, row.Env, row["SF Group"], row.ITSI, row.Thumbprint)]
    })}
    setRows(list)
    return () => {
      console.log('Un mounted')
    }
  }, [])

  // console.log({rows})

  return (
    <div className='flex-grow' >
      <div className="text-center text-4xl font-semibold text-white mb-8">
        Certificate List
      </div>
      <div className="px-24">
        <EnhancedTable rows={rows} />
      </div>
    </div>
  )
}

export const getStaticProps = async (context) => {

  const res = await fetch(`${URL}/data.json`)
  const data = await res.json()
  // console.log({data})
  if (!data) {
    return {
      notFound: true,
    }
  }
  return {
    props: { data }, // will be passed to the page component as props
    revalidate: 10
  }
}