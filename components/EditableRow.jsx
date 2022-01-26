import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from '@mui/material/Tooltip';

const EditableRow = ({ cert, editFormData , handleEditFormChange, handleCancelClick, handleSaveClick }) => {
  return (
    <div key={cert._id} >
        <Box sx={{ flexGrow: 1 }}
        >
            <Grid container spacing={1}>
                <Grid item xs={2}>
                    <TextField 
                        name="thumbPrint" 
                        label="ThumbPrint" 
                        color="secondary" 
                        value={editFormData.thumbPrint}
                        onChange={handleEditFormChange} 
                    />
                </Grid>
                <Grid item xs={1}>
                    <TextField 
                        name="serverName" 
                        label="Server Name" 
                        color="secondary" 
                        value={editFormData.serverName}
                        onChange={handleEditFormChange} 
                    />
                </Grid>
                <Grid item xs={1}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='px-2'>
                        {cert.validTo}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <TextField 
                        name="managedDN" 
                        label="Managed DN" 
                        color="secondary" 
                        value={editFormData.managedDN}
                        onChange={handleEditFormChange} 
                    />
                </Grid>
                <Grid item xs={1}>
                    <TextField 
                        name="commonName" 
                        label="Common Name" 
                        color="secondary" 
                        value={editFormData.commonName}
                        onChange={handleEditFormChange} 
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField 
                        name="itServiceInstance" 
                        label="ITSI Name" 
                        color="secondary" 
                        value={editFormData.itServiceInstance}
                        onChange={handleEditFormChange} 
                    />
                </Grid>
                <Grid item xs={1}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='px-2'>
                        {cert.environment}
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <TextField 
                        name="resource" 
                        label="Resource Name" 
                        color="secondary" 
                        value={editFormData.resource}
                        onChange={handleEditFormChange} 
                    />
                </Grid>
                <Grid item xs={1} className='space-x-3'>
                    <Tooltip title="Save Modification" arrow>
                        <SaveIcon color="primary" sx={{ fontSize: 32 }} onClick={(event) => handleSaveClick(event, cert)} />
                    </Tooltip>
                    <Tooltip title="Discard Modification" arrow>
                        <CancelIcon color="error" sx={{ fontSize: 32 }} onClick={handleCancelClick} />
                    </Tooltip>
                </Grid>
            </Grid>
        </Box>
    </div>
  )
};

export default EditableRow;
