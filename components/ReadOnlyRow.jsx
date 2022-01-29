import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { color } from '@mui/system';

const ReadOnlyRow = ({ cert , handleEditClick, handleDeleteClick, modified }) => {
    // console.log({modified})
  return (
    <div key={cert._id} >
        <Box sx={{ flexGrow: 1 }}
        >
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <Typography sx={{ fontSize: 14, color: (modified) ? "blue" : "blak" }} color="text.secondary" gutterBottom className='px-2'>
                        {cert.serverName}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='px-2'>
                        {cert.thumbPrint}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='px-2'>
                        {cert.keyStoreLocation}
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='px-2'>
                        {cert.commonName}
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='px-2'>
                        {cert.environment}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='px-2'>
                        {cert.itServiceInstance}
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='px-2'>
                        {cert.sfGroup}
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='px-2'>
                        {String(cert.validTo)}
                    </Typography>
                </Grid>
                <Grid item xs={1} className='space-x-3'>
                    <Tooltip title="Edit Row" arrow>
                        <EditIcon color="primary" sx={{ fontSize: 32 }} onClick={(event) => handleEditClick(event, cert)} />
                    </Tooltip>
                    <Tooltip title="Delete Row" arrow>
                        <DeleteIcon color="error" sx={{ fontSize: 32 }} onClick={() => handleDeleteClick(cert._id)} />
                    </Tooltip>
                </Grid>
            </Grid>
        </Box>
    </div>
  )
};

export default ReadOnlyRow;
