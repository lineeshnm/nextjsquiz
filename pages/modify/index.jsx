import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Stack from '@mui/material/Stack';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import PublishIcon from '@mui/icons-material/Publish';
import BackspaceIcon from '@mui/icons-material/Backspace';
import PreviewIcon from '@mui/icons-material/Preview';
import Tooltip from '@mui/material/Tooltip';
import ReadOnlyRow from '../../components/ReadOnlyRow';
import EditableRow from '../../components/EditableRow';

const APP_NAME = process.env.APP_NAME
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


const Modify = ({certs}) => {
  const [serverSearch, setServerSearch] = useState('');
  const [dnSearch, setDnSearch] = useState('')
  const [cnSearch, setCnSearch] = useState('')
  const [itsiSearch, setItsiSearch] = useState('')
  const [thumbPrintSearch, seThumbPrintSearch] = useState('')
  const [resource, setResource] = useState('');
  const [environment, setEnvironment] = useState('Select')
  const [certList, setCertList] = useState(certs)
  // const [date, setDate] = useState(new Date())
  const [date, setDate] = useState()
  const [editCertId, setEditCertId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    thumbPrint: "",
    serverName: "",
    validTo: "",
    managedDN: "",
    commonName: "",
    itServiceInstance: "",
    environment: "",
    resource: "",
  });

  const handleSaveClick = (event) => {
    event.preventDefault();

    const editedCert = {
      _id: editCertId,
      thumbPrint: editFormData.thumbPrint,
      serverName: editFormData.serverName,
      validTo: editFormData.validTo,
      managedDN: editFormData.managedDN,
      commonName: editFormData.commonName,
      itServiceInstance: editFormData.itServiceInstance,
      environment: editFormData.environment,
      resource: editFormData.resource,
    };

    const newCertList = [...certList];

    const index = certList.findIndex((cert) => cert._id === editCertId);

    newCertList[index] = {...newCertList[index], ...editedCert}; // Lineesh Modified

    setCertList(newCertList);
    setEditCertId(null);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditClick = (event, cert) => {
    event.preventDefault();
    setEditCertId(cert._id);

    const formValues = {
      thumbPrint: cert.thumbPrint,
      serverName: cert.serverName,
      validTo: cert.validTo,
      managedDN: cert.managedDN,
      commonName: cert.commonName,
      itServiceInstance: cert.itServiceInstance,
      environment: cert.environment,
      resource: cert.resource
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditCertId(null);
  };

  const handleDeleteClick = (certId) => {
    const newCertList = [...certList];

    const index = certList.findIndex((cert) => cert._id === certId);

    newCertList.splice(index, 1);

    setCertList(newCertList);
  };

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

  const filterThumbPrint = (array) => {
    if (thumbPrintSearch === '') {
      return array
    }
    return array.filter((item) => item.thumbPrint.toLowerCase().includes(thumbPrintSearch.toLowerCase()))
  }

  const filterResource = (array) => {
    if (resource === '') {
      return array
    }
    return array.filter((item) => item.resource.toLowerCase().includes(resource.toLowerCase()))
  }

  useEffect(() => {
    let result = certs
    result = filterServer(result)
    result = filterDate(result)
    result = filterDN(result)
    result = filterCN(result)
    result = filterITSI(result)
    result = filterEnv(result)
    result = filterThumbPrint(result)
    result = filterResource(result)
    setCertList(result)
    return () => {
      console.log('Unmounted')
    }
  }, [serverSearch, date, dnSearch, cnSearch, itsiSearch, environment, thumbPrintSearch, resource])

  return (
    <div className='flex-grow px-12' >
      <div className="text-center text-4xl font-semibold text-white mb-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      {`${APP_NAME} - DB Modify`}
      </div>
      <div >
        <Card sx={{ minWidth: 275 }} className='px-12' >
          <Grid container spacing={1} className='py-8'>
            <Grid item xs={2}>
              Thumb Print
              <br />
              <TextField label="ThumbPrint Search" color="secondary" onChange={(event) => seThumbPrintSearch(event.target.value)} />
            </Grid>
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
              Resource
              <br />
              <TextField label="Resource Search" color="secondary" onChange={(event) => setResource(event.target.value)} />
            </Grid>
            <Grid item xs={1} className='space-x-3'>
              Action
              <br />
              <Tooltip title="Preview changes" arrow>
                <PreviewIcon color="primary" sx={{ fontSize: 32 }} />
              </Tooltip>
              <Tooltip title="Update DataBase" arrow>
                <PublishIcon color="primary" sx={{ fontSize: 32 }} />
              </Tooltip>
              <Tooltip title="Discard changes" arrow>
                <BackspaceIcon color="error" sx={{ fontSize: 32 }} />
              </Tooltip>             
            </Grid>
          </Grid>
          {certList.map((cert) => (
            <>
            {
              editCertId === cert._id ? (
                <EditableRow 
                cert={cert} 
                editFormData={editFormData}
                handleEditFormChange={handleEditFormChange}
                handleCancelClick={handleCancelClick}
                handleSaveClick={handleSaveClick}
                />
              ) : (
              <ReadOnlyRow 
                cert={cert} 
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
              />
              )
            }
            </>                        
          ))}
        </Card>
      </div>
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
