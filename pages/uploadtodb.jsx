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
import Background from '../components/Background';

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
        <div className='page-banner-container'>
            <div className="page-banner">
            {APP_NAME} - Update CSV to Database
            </div>
            {
                !isAuth() && (
                <ContactCard />
                )
            }
            <div className='flex justify-center py-6'>
                <Background />
                <div className='w-full flex flex-col'>
            {
                isAuth() && (
                    <div className='h-40 w-auto mt-6 py-8 glass-item'>
                        <div className='flex p-6 justify-evenly space-x-6'>
                        <div key="drop" className={`p-6 my-2 h-30 w-96 text-center text-white border-cyan-400 max-w-md border-2 ${
                            highlighted ? "border-purple-600-600 bg-purple-100 text-blue-700 button-text" : "border-gray-600"
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
                        <div key="upload" className='my-auto'>
                            <Button variant="contained" component="span" className='bg-blue-400 button-text' onClick={updateDB}>
                                Upload to DB
                            </Button>
                        </div>
                        <div key="clear"  className='my-auto'>
                            <Button variant="contained" component="span" className='bg-blue-400 button-text' onClick={() => setData([])}>
                                Clear
                            </Button>
                        </div>
                        </div>
                    </div>
                )
            }

            {data.length >0 && 
                <Card sx={{ minWidth: 275 }} className='w-[95vw] px-12 py-8 bg-white bg-opacity-10 rounded-2xl text-white shadow-5xl relative z-2 border border-opacity-30 border-r-0 border-b-0 backdrop-filter backdrop-blur-sm' >
                    <Box sx={{ flexGrow: 1 }} >
                        <Grid container spacing={1} className='py-8'>
                            <Grid item xs={1}>
                                Quiz Name
                            </Grid>
                            <Grid item xs={1}>
                                Link
                            </Grid>
                            <Grid item xs={1}>
                                startDate
                            </Grid>
                            <Grid item xs={1}>
                                endDate
                            </Grid>
                            <Grid item xs={1}>
                                timedGame
                            </Grid>
                            <Grid item xs={1}>
                                readyToPlay
                            </Grid>
                            <Grid item xs={1}>
                                createdBy
                            </Grid>
                            <Grid item xs={5}>
                                description
                            </Grid>
                        </Grid>
            
                        {data.map((quiz) => (
                            <div key={quiz.slug} >
                            <Box sx={{ flexGrow: 1 }}
                            >
                                <Grid container spacing={1}>
                                <Grid item xs={1}>
                                    <Typography sx={{ fontSize: 14 }} className='px-2'>
                                        {quiz.quizName}
                                    </Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography sx={{ fontSize: 14 }} className='px-2'>
                                    {quiz.slug}
                                    </Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography sx={{ fontSize: 14 }} className='px-2'>
                                    {quiz.startDate}
                                    </Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography sx={{ fontSize: 14 }} className='px-2'>
                                    {quiz.endDate}
                                    </Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography sx={{ fontSize: 14 }} className='px-2'>
                                    {quiz.timedGame.toString()}
                                    </Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography sx={{ fontSize: 14 }} className='px-2'>
                                    {quiz.readyToPlay.toString()}
                                    </Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography sx={{ fontSize: 14 }} className='px-2'>
                                    {quiz.createdBy}
                                    </Typography>
                                </Grid>
                                <Grid item xs={5}>
                                    <Typography sx={{ fontSize: 14 }} className='px-2'>
                                    {quiz.description}
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
            </div>
        </div>
    )
}

export default updatedatabase
