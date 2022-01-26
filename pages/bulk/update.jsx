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
import Router , { useRouter } from 'next/router';
import { isAuth } from '../../actions/auth';

const APP_NAME = process.env.APP_NAME
const URL = process.env.URL

const Bulk = ({data}) => {
    const [crNumber, setCrNumber] = useState('')
    const [cTask, setCTask] = useState('')
    const [approver, setApprover] = useState('')
    const [logedinUser, setLogedinUser] = useState('');
    const [renewedBy, setRenewedBy] = useState('');
    const [renew, setRenew] = useState(false)
    const [renewed, setRenewed] = useState(false);
    const [renewDate, setRenewDate] = useState( new Date())
    const [validTo, setValidTo] = useState(new Date());
    const [renewedDate, setRenewedDate] = useState(new Date());
    const [errors, setErrors] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const router = useRouter()
    // console.log(data);
    const ids = router.query.selected
    // console.log(ids.selected)

    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate()
        // console.log({errs})
        setErrors(errs)
        // console.log(renew, crNumber, cTask, date, approver, errors)
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

    useEffect(() => {
        if (process.browser) {
            const user = JSON.parse(localStorage.getItem('user'))
            setLogedinUser(user)
            // console.log(user, logedinUser)
        }
        return () => {
            console.log("unmounted from localstorage")
        };
    }, []);

    useEffect(() => {
        if (renewedBy === '') {
            isAuth() && logedinUser && setRenewedBy(logedinUser.name)
        }
        return () => {
            console.log("unmounted from logged in User")
        };
    }, [logedinUser]);

    // console.log({logedinUser})
    const updateDB = async () => {
        if (renewed) {
            console.log("Renewed updating")
            try {
                const res =  await fetch(`${URL}/api/certs/bulk?ids=${ids}`, {
                    method: 'PUT',
                    headers: {
                        "Accept" : "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({validTo, renewed, renewedBy, renewedDate})
                })
                const data = await res.json()
                // console.log({data})
                // router.push("/torenew")
                Router.back()
            } catch (error) {
                console.log({error})
            }
        } else {
            console.log("Torenew updating")
            try {
                const res =  await fetch(`${URL}/api/certs/bulk?ids=${ids}`, {
                    method: 'PUT',
                    headers: {
                        "Accept" : "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({renew, crNumber, cTask: cTask, approver: approver, renewDate})
                })
                const data = await res.json()
                // console.log({data})
                // router.push("/")
                Router.back()
            } catch (error) {
                console.log({error})
            }
        }
        // console.log("inside update DB", id)
        

    }

    const validate = () => {
        let err = {}
        console.log("Inside validate ", renew, "crNumber:", crNumber, "ct:",cTask, "ap:", approver, renewedBy)
        if (renew) {
            if (crNumber === '') {
                err.crNumber = 'Please enter a Change Number'
            } 
            if (cTask === '') {
                err.cTask = 'Please enter a change task'
            } 
            if (approver === '') {
                err.approver = 'Please enter your Name'
            }
        } else if (renewed) {
            if (renewedBy === '') {
                err.renewedBy = 'Please enter your Name'
            }
        } else {
            if (approver === '') {
                err.approver = 'Please enter your Name'
            }
        }
        return err;
    }

    return (
        <div className='flex-grow px-12'>
            <div className="text-center h-full text-4xl font-semibold text-white mb-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                {APP_NAME} - Bulk Modify
            </div>
            { 
                !isAuth() && data && data.data && (
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
                            { data && data.data && data.data.map((cert) => (
                            <Grid container spacing={1} key={cert._id}>
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
                            ))}
                            <Grid container spacing={1} className='py-20'>
                                <Grid item xs={2}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='px-2'>Renew Certificate ?</Typography>
                                        <FormControlLabel control={<Switch checked={renew} />} label={renew? "Yes": "No"} onChange={(event) => setRenew(event.target.checked)}/>
                                    </Stack>
                                </Grid>
                                {
                                    renew &&
                                    <>
                                        <Grid item xs={2}>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='px-2'>Change Request</Typography>
                                                <TextField value={crNumber} placeholder="Change Number" color="secondary" error={errors.crNumber ? true: false} onChange={(event) => setCrNumber(event.target.value)} />
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='px-2'>Change Task</Typography>
                                                <TextField value={cTask} placeholder="Change Task Number" color="secondary" error={errors.cTask ? true: false} onChange={(event) => setCTask(event.target.value)} />
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
                                                        value={renewDate}
                                                        onChange={(newDate) => setRenewDate(newDate)}
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
                                        <TextField value={approver} placeholder="Enter Your Name" color="secondary" error={errors.approver ? true: false} onChange={(event) => setApprover(event.target.value)} />
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
                )

            }
            { isAuth() && data && data.data  && (
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
                                <Grid item xs={1}>
                                    CR Number
                                </Grid>
                            </Grid>
                            { data && data.data && data.data.map((cert) => (
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
                                <Grid item xs={1}>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='px-2'>
                                    {cert.crNumber}
                                    </Typography>
                                </Grid>
                            </Grid>
                            ))}

                            <Grid container spacing={1} className='py-20'>
                                <Grid item xs={2}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='px-2'>Certificate Renewed?</Typography>
                                        <FormControlLabel control={<Switch checked={renewed} />} label={renewed? "Yes": "No"} onChange={(event) => setRenewed(event.target.checked)}/>
                                    </Stack>
                                </Grid>
                                {
                                    renewed &&
                                    <>
                                        <Grid item xs={2}>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='px-2'>Renewed Date</Typography>
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <Stack spacing={3}>
                                                    <DesktopDatePicker
                                                        label="Date"
                                                        inputFormat="MM/dd/yyyy"
                                                        value={renewedDate}
                                                        onChange={(newDate) => setRenewedDate(newDate)}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                    </Stack>
                                                </LocalizationProvider>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='px-2'>New Expiry Date</Typography>
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <Stack spacing={3}>
                                                    <DesktopDatePicker
                                                        label="Date"
                                                        inputFormat="MM/dd/yyyy"
                                                        value={validTo}
                                                        onChange={(newDate) => setValidTo(newDate)}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                    </Stack>
                                                </LocalizationProvider>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='px-2'>Confirmed By</Typography>
                                                <TextField value={renewedBy} placeholder="Enter Your Name" color="secondary" error={errors.renewedBy ? true: false} onChange={(event) => setRenewedBy(event.target.value)} />
                                            </Stack>
                                        </Grid>
                                    </>
                                }
                                <Grid item xs={2}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='px-2'>Are you Sure?</Typography>
                                        <Button variant="contained" onClick={handleSubmit} className='bg-blue-400' >Update</Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>
                    </Card>
                )
            }
        </div>
    );
}

export default Bulk;

export async function getServerSideProps(context) {
    let ids = context.query.selected
    // console.log({ids})
    const res = await fetch(`${URL}/api/certs/bulk?ids=${ids}`)
    const data = await res.json()
    // console.log({data})
    if (!data.success) {
        return {
            notFound: true
        }
    }
    return {
        props: {data}
    }
}
