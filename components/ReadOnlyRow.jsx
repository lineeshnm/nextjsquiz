import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

const ReadOnlyRow = ({ cert , handleEditClick, handleDeleteClick }) => {
  return (
    <div key={cert._id} >
        <Box sx={{ flexGrow: 1 }}
        >
            <Grid container spacing={1}>
                <Grid item xs={2}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='px-2'>
                        {cert.thumbPrint}
                    </Typography>
                </Grid>
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
                        {String(cert.resource)}
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
