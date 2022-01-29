import React, {useState } from 'react'
import { parse } from "papaparse";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import ContactCard from '../components/ContactCard';
import { isAuth } from '../actions/auth';

const APP_NAME = process.env.APP_NAME
const URL = process.env.URL

const updatedatabase = () => {
    const [highlighted, setHighlighted] = useState(false);
    const [data, setData] = useState([]);
    const router = useRouter();

    const updateDB = async () => {

        try {
            data.forEach(async function(row) {
                const res =  await fetch(`${URL}/api/certs`, {
                    method: 'POST',
                    headers: {
                        "Accept" : "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(row)
                })
                const data = await res.json()
                console.log({data})
            })
            router.push("/")
        } catch (error) {
            console.log({error})
        }

    }

    return (
        <div className='flex-grow px-12'>
            <div className="text-center text-4xl font-semibold text-white mb-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                {`${APP_NAME} - Update CSV to Database`}
            </div>
            {
                !isAuth() && (
                <ContactCard />
                )
            }
            {
                isAuth() && (
                    <div className='flex justify-evenly mt-6 py-8'>
                        <div className={`p-6 my-2 h-30 w-96 text-center text-white border-cyan-400 max-w-md border-2 ${
                            highlighted ? "border-purple-600-600 bg-purple-100 text-blue-700" : "border-gray-600"
                            }`}
                            onDragEnter={() => {
                                setHighlighted(true);
                            }}
                            onDragLeave={() => {
                                setHighlighted(false);
                            }}
                            onDragOver={(e) => {
                                e.preventDefault();
                            }}
                            onDrop={(e) => {
                                e.preventDefault();
                                setHighlighted(false);
                                // console.log(e.dataTransfer.files)
        
                                Array.from(e.dataTransfer.files)
                                    .filter((file) => file.type === "text/csv" || file.type === "application/vnd.ms-excel")
                                    .forEach(async (file) => {
                                        // console.log(file)
                                        const text = await file.text();
                                        const result = parse(text, { header: true });
                                        setData((existing) => [...existing, ...result.data]);
                                    });
                            }}
                        >
                            DROP YOUR FILES HERE
                        </div>
                        <div className='my-auto'>
                            <Button variant="contained" component="span" className='bg-blue-400' onClick={updateDB}>
                                Upload to DB
                            </Button>
                        </div>
                        <div className='my-auto'>
                            <Button variant="contained" component="span" className='bg-blue-400' onClick={() => setData([])}>
                                Clear
                            </Button>
                        </div>
                    </div>
                )
            }

            {data.length >0 && 
                <Card sx={{ minWidth: 275 }} className='px-12 py-8' >
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
            
                        {data.map((cert) => (
                            <div key={cert.thumbPrint} >
                            <Box sx={{ flexGrow: 1 }}
                            >
                                <Grid container spacing={1}>
                                <Grid item xs={1}>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='px-2'>
                                        <b>{cert.serverName}</b>
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
                    </Box>
                </Card>
            }
        </div>
    )
}

export default updatedatabase
