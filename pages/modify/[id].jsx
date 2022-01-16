import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

const URL = process.env.URL

const Server = ({cert}) => {
    // console.log(cert)
    const [cr, setCr] = useState('')
    const [cTask, setCTask] = useState('')
    const [approver, setApprover] = useState('')
    const [checked, setChecked] = useState(true)
    const [date, setDate] = useState(new Date())
    const [errors, setErrors] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate()
        console.log({errs})
        setErrors(errs)
        // console.log(checked, cr, cTask, date, approver, errors)
        setSubmitting(true)
    }

    useEffect(() => {
        if (submitting) {
            if (Object.keys(errors).length === 0) {
                // alert('Submit')
                updateDB()
            } else {
                setSubmitting(false)
            }
        }
        return () => {
            console.log("unmounted from errors")
        }
    }, [errors])

    const updateDB = async () => {
        let id = cert._id
        try {
            const res =  await fetch(`${URL}/api/certs/${id}`, {
                method: 'PUT',
                headers: {
                    "Accept" : "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({renew : checked, crNumber: cr, cTask: cTask, approver: approver, renewDate: date})
            })
            const data = await res.json()
            console.log({data})
            router.push("/")
        } catch (error) {
            console.log({error})
        }

    }

    const validate = () => {
        let err = {}
        console.log("Inside validate ", checked, "cr:", cr, "ct:",cTask, "ap:", approver)
        if (checked) {
            if (cr === '') {
                err.cr = 'Please enter a Change Number'
            } 
            if (cTask === '') {
                err.cTask = 'Please enter a change task'
            } 
            if (approver === '') {
                err.approver = 'Please enter your Name'
            }
        } else {
            console.log("Else", approver)
            if (approver === '') {
                err.approver = 'Please enter your Name'
            }
        }
        return err;
    }

    return (
        <div className='flex-grow px-12'>
            <div className="text-center text-4xl font-semibold text-white mb-8">Update Single Certificate</div>
            { cert && 
            <Card sx={{ minWidth: 275 }} className='px-12 py-20' >
                <Box sx={{ flexGrow: 1 }} >
                <Grid container spacing={1} className='py-8'>
                    <Grid item xs={1}>
                        Server Name
                    </Grid>
                    <Grid item xs={1}>
                        Expiry Date
                    </Grid>
                    <Grid item xs={2}>
                        Managed DN
                    </Grid>
                    <Grid item xs={1}>
                        C Name
                    </Grid>
                    <Grid item xs={2}>
                        ITSI
                    </Grid>
                    <Grid item xs={1}>
                        Environment
                    </Grid>
                    <Grid item xs={1}>
                        Resource Name
                    </Grid>
                    <Grid item xs={1}>
                        Dependancy
                    </Grid>
                    <Grid item xs={1}>
                        SF Group
                    </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={1}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='px-2'>
                                {cert.serverName}
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
                    <Grid container spacing={1} className='py-20'>
                        <Grid item xs={2}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='px-2'>Renew Certificate ?</Typography>
                                <FormControlLabel control={<Switch checked={checked} />} label={checked? "Yes": "No"} onChange={(event) => setChecked(event.target.checked)}/>
                            </Stack>
                        </Grid>
                        {
                            checked &&
                            <>
                                <Grid item xs={2}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='px-2'>Change Request</Typography>
                                        <TextField label="Change Number" color="secondary" error={errors.cr ? true: false} onChange={(event) => setCr(event.target.value)} />
                                    </Stack>
                                </Grid>
                                <Grid item xs={2}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='px-2'>Change Task</Typography>
                                        <TextField label="Change Task Number" color="secondary" error={errors.cTask ? true: false} onChange={(event) => setCTask(event.target.value)} />
                                    </Stack>
                                </Grid>
                                <Grid item xs={2}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='px-2'>Target Date</Typography>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <Stack spacing={3}>
                                            <DesktopDatePicker
                                                label="Date"
                                                inputFormat="MM/dd/yyyy"
                                                value={date}
                                                onChange={(newDate) => setDate(newDate)}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                            </Stack>
                                        </LocalizationProvider>
                                    </Stack>
                                </Grid>
                            </>
                        }
                        <Grid item xs={2}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='px-2'>Approver Name</Typography>
                                <TextField label="Your Name" color="secondary" error={errors.approver ? true: false} onChange={(event) => setApprover(event.target.value)} />
                            </Stack>
                        </Grid>
                        <Grid item xs={2}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='px-2'>Are you Sure?</Typography>
                                <Button variant="contained" onClick={handleSubmit} className='bg-blue-400' >Confirm</Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Card>
            }
        </div>
    )
}

export default Server

export const getStaticProps = async ({params}) => {
    let id = params.id
    const res = await fetch(`${URL}/api/certs/${id}`)
    const data = await res.json()
    // console.log({data})
    if (!data.success) {
      return {
        notFound: true,
        revalidate: 10
      }
    }
    return {
      props: { cert: data.data }, // will be passed to the page component as props
      revalidate: 10
    }
}

export async function getStaticPaths() {
    // const posts = await getPosts();
    return {
      paths: [],
      fallback: true,
    };
  }
