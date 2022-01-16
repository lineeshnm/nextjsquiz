import Link from 'next/link'
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import React, { useState, useEffect } from 'react'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Stack from '@mui/material/Stack';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import MonthPicker from '@mui/lab/MonthPicker';

const URL = process.env.URL
const environments = [
  {
    value: 'Select',
    label: 'Select',
  },
  {
    value: 'PROD',
    label: 'PROD',
  },
  {
    value: 'DR',
    label: 'DR',
  },
  {
    value: 'UAT',
    label: 'UAT',
  },
  {
    value: 'DEV',
    label: 'DEV',
  },
  {
    value: 'LAB',
    label: 'LAB',
  },
  {
    value: 'Unknown',
    label: 'Unknown',
  },
];

const dependancies = [
  {
    value: 'Select',
    label: 'Select',
  },
  {
    value: 'True',
    label: 'True',
  },
  {
    value: 'False',
    label: 'False',
  },
];

export default function Dashboard({certs}) {
  // console.log({certs})
  const [serverSearch, setServerSearch] = useState('');
  const [dnSearch, setDnSearch] = useState('')
  const [cnSearch, setCnSearch] = useState('')
  const [itsiSearch, setItsiSearch] = useState('')
  const [resourceSearch, setResourceSearch] = useState('')
  const [sfGroupSerach, setSfGroupSerach] = useState('')
  const [environment, setEnvironment] = useState('Select')
  const [dependancy, setDependancy] = useState('Select')
  const [certList, setCertList] = useState(certs)
  // const [date, setDate] = useState(new Date())
  const [date, setDate] = useState()

  const filterServer = (array) => {
    if (serverSearch === '') {
      return array
    }
    return array.filter((item) => item.serverName.toLowerCase().includes(serverSearch.toLowerCase()))
  }

  const filterDate = (array) => {
    if (date) {
      let dateNew = date.toLocaleString().split(/\D/).slice(0,3).map(num=>num.padStart(2,"0")).join("/")
      return array.filter((item) => {
        // console.log(item.validTo)
        return (item.validTo.split('-')[0] === dateNew.split('/')[2] && item.validTo.split('-')[1] === dateNew.split('/')[0])
      })
    } else {
      return array
    }
  }

  const filterDN = (array) => {
    if (dnSearch === '') {
      return array
    }
    return array.filter((item) => item.managedDN.toLowerCase().includes(dnSearch.toLowerCase()))
  }
  const filterCN = (array) => {
    if (cnSearch === '') {
      return array
    }
    return array.filter((item) => item.commonName.toLowerCase().includes(cnSearch.toLowerCase()))
  }

  const filterITSI = (array) => {
    // console.log(array, itsiSearch)
    if (itsiSearch === '') {
      return array
    }
    return array.filter((item) => item.itServiceInstance.toLowerCase().includes(itsiSearch.toLowerCase()))
  }

  const filterEnv = (array) => {
    if (environment === 'Select') {
      return array
    }
    return array.filter((item) => item.environment.toLowerCase().includes(environment.toLowerCase()))
  }
  const filterDep = (array) => {
    // console.log({dependancy})
    if (dependancy === 'Select') {
      return array
    }
    return array.filter((item) => String(item.endPointDependancy).toLowerCase().includes(dependancy.toLowerCase()))
  }

  const filterResource = (array) => {
    if (resourceSearch === '') {
      return array
    }
    return array.filter((item) => item.resource.toLowerCase().includes(resourceSearch.toLowerCase()))
  }

  const filterSFGroup = (array) => {
    if (sfGroupSerach === '') {
      return array
    }
    return array.filter((item) => item.sfGroup.toLowerCase().includes(sfGroupSerach.toLowerCase()))
  }

  useEffect(() => {
    let result = certs
    result = filterServer(result)
    result = filterDate(result)
    result = filterDN(result)
    result = filterCN(result)
    result = filterITSI(result)
    result = filterEnv(result)
    result = filterDep(result)
    result = filterResource(result)
    result = filterSFGroup(result)
    setCertList(result)
    return () => {
      console.log('Unmounted')
    }
  }, [serverSearch, date, dnSearch, cnSearch, itsiSearch, environment, dependancy, resourceSearch, sfGroupSerach])

  return (
    <div className='flex-grow px-12'>
      <div className="text-center text-4xl font-semibold text-white mb-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Middleware Certificate Dashboard</div>
      <div >
        <Card sx={{ minWidth: 275 }} className='px-12' >
        <Grid container spacing={1} className='py-8'>
        <Grid item xs={1}>
          Server Name
          <br />
          <TextField label="Server Search" color="secondary" onChange={(event) => setServerSearch(event.target.value)} />
        </Grid>
        <Grid item xs={1}>
          Expiry Date
          <br />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <DesktopDatePicker
                label="Month & year"
                inputFormat="MMM-yyyy"
                value={date}
                views={["year", "month"]}
                onChange={(newDate) => setDate(newDate)}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={2}>
          Managed DN
          <br />
          <TextField label="DN Search" color="secondary" onChange={(event) => setDnSearch(event.target.value)} />
        </Grid>
        <Grid item xs={1}>
          C Name
          <br />
          <TextField label="CN Search" color="secondary" onChange={(event) => setCnSearch(event.target.value)} />
        </Grid>
        <Grid item xs={2}>
          ITSI
          <br />
          <TextField label="ITSI Search" color="secondary" onChange={(event) => setItsiSearch(event.target.value)} />
        </Grid>
        <Grid item xs={1}>
          Environment
          <br />
          <TextField
            id="environment"
            select
            label="Environment"
            value={environment}
            onChange={(event) => setEnvironment(event.target.value)}
          >
            {environments.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
              // <div>{option.label}</div>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={1}>
          Resource Name
          <br />
          <TextField label="Resource Search" color="secondary" onChange={(event) => setResourceSearch(event.target.value)} />
        </Grid>
        <Grid item xs={1}>
          Dependancy
          <br />
          <TextField
            id="dependancy"
            select
            label="End Point Dependancy"
            value={dependancy}
            onChange={(event) => setDependancy(event.target.value)}
          >
            {dependancies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
              // <div>{option.label}</div>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={1}>
          SF Group
          <br />
          <TextField label="SF Group Search" color="secondary" onChange={(event) => setSfGroupSerach(event.target.value)} />
        </Grid>
        </Grid>
          {certList.map((cert, index) => (
            <div key={index} >
              <Box sx={{ flexGrow: 1 }}
              >
                <Grid container spacing={1}>
                  <Grid item xs={1}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='px-2'>
                      <Link href={`/modify/${cert._id}`}>
                        <a>{cert.serverName}</a>
                      </Link>
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='px-2'>
                      {cert.validTo}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='px-2'>
                      {cert.managedDN}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='px-2'>
                      {cert.commonName}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='px-2'>
                      {cert.itServiceInstance}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='px-2'>
                      {cert.environment}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='px-2'>
                      {cert.resource}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='px-2'>
                      {String(cert.endPointDependancy)}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='px-2'>
                      {String(cert.sfGroup)}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </div>
          ))}
        </Card>
      </div>
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
    props: { certs: data.data.filter(row => !row.hasOwnProperty('renew')) }, // will be passed to the page component as props
    revalidate: 10
  }
}