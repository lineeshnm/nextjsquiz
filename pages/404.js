import React from 'react';
import Image from 'next/image'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const APP_NAME = process.env.APP_NAME

const Page404 = () => {
  return (
    <div className='flex-grow px-12'>
      <div className="text-center h-full text-4xl font-semibold text-white mb-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        {APP_NAME} - Page not found
      </div>
      <div className='flex justify-center w-full py-6'>
        <Card sx={{ maxWidth: 345 }}>
          <Image
            height={500}
            width={500}
            src="/lineesh.jpg"
            alt="Picture of the author"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lineesh.NM
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Contact Administrator:
              lineesh.niduvappurathmeethal@barclays.com
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Contact</Button>
            <Button size="small">Email</Button>
          </CardActions>
        </Card>
      </div>
    </div>
  )
};

export default Page404;
