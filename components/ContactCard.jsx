import React from 'react';
import Image from 'next/image'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ContactCard = () => {
  return (
    <div className='flex justify-center w-full py-6'>
        <Card sx={{ maxWidth: 345 }} className='glass-item'>
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
            <Typography variant="body1">
              Try login or This feature not available. 
            </Typography>
            <Typography variant="body2">
              Contact Admin:
              lineesh2009@gmail.com
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">Email</Button>
            <Button size="small">Chat</Button>
        </CardActions>
        </Card>
    </div>
  )
};

export default ContactCard;
