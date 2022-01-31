import React from 'react';
import Link from 'next/link'
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import RateReviewIcon from '@mui/icons-material/RateReview';
import Tooltip from '@mui/material/Tooltip';

const CertificateCard = ({cert, button, edit}) => {
  return (
    <div className='py-6'>
    <Card sx={{ minWidth: 275 }} variant="outlined" className='px-12 bg-white bg-opacity-10 rounded-2xl text-white shadow-5xl relative z-2 border border-opacity-30 border-r-0 border-b-0 backdrop-filter backdrop-blur-sm' >
        <Grid container spacing={1} className='pt-8 pb-2'>
            <Grid item xs={1}>
                Server Name
            </Grid>
            <Grid item xs={2}>
                Finger Print
            </Grid>
            <Grid item xs={2}>
                KeyStore Location
            </Grid>
            <Grid item xs={2}>
                Common Name
            </Grid>
            <Grid item xs={1}>
                Environment
            </Grid>
            <Grid item xs={2}>
                ITSI
            </Grid>
            <Grid item xs={2}>
                SF Group
            </Grid>
        </Grid>
        <Grid container spacing={1} className='py-2'>
            <Grid item xs={1}>
                {cert.serverName}
            </Grid>
            <Grid item xs={2}>
                {cert.thumbPrint}
            </Grid>
            <Grid item xs={2}>
                {cert.keyStoreLocation}
            </Grid>
            <Grid item xs={2}>
                {cert.commonName}
            </Grid>
            <Grid item xs={1}>
                {cert.environment}
            </Grid>
            <Grid item xs={2}>
                {cert.itServiceInstance}
            </Grid>
            <Grid item xs={2}>
                {cert.sfGroup}
            </Grid>
        </Grid>
        <Grid container spacing={1} className='pt-8 pb-2'>
            <Grid item xs={1}>
                Resource Name
            </Grid>
            <Grid item xs={2}>
                Expiry Date
            </Grid>
            <Grid item xs={2}>
                CSR Location
            </Grid>
            <Grid item xs={2}>
                Managed DN
            </Grid>
            <Grid item xs={2}>
                EndPoint Dependancy
            </Grid>
            <Grid item xs={1}>
                To Renew?
            </Grid>
            <Grid item xs={1}>
                Change Number
            </Grid>
            <Grid item xs={1}>
                Change Task
            </Grid>
        </Grid>
        <Grid container spacing={1} className='py-2'>
            <Grid item xs={1}>
                {cert.resource}
            </Grid>
            <Grid item xs={2}>
                {cert.validTo}
            </Grid>
            <Grid item xs={2}>
                {cert.csrLocation}
            </Grid>
            <Grid item xs={2}>
                {cert.managedDN}
            </Grid>
            <Grid item xs={2}>
                {cert.endPointDependancy ? cert.endPointDependancy.toString() : "null"}
            </Grid>
            <Grid item xs={1}>
                {cert.renew? cert.renew.toString() : "null"}
            </Grid>
            <Grid item xs={1}>
                {cert.crNumber}
            </Grid>
            <Grid item xs={1}>
                {cert.cTask}
            </Grid>
        </Grid>
        <Grid container spacing={1} className='pt-8 pb-2'>
            <Grid item xs={1}>
                Confirmed By
            </Grid>
            <Grid item xs={2}>
                Renew Date
            </Grid>
            <Grid item xs={2}>
                Renewed ?
            </Grid>
            <Grid item xs={2}>
                Renewed By
            </Grid>
            <Grid item xs={2}>
                Actioned Date
            </Grid>
            {
                button && (
                    <Grid item xs={2}>
                        Modify ?
                    </Grid>
                )
            }
        </Grid>
        <Grid container spacing={1} className='py-2 pb-8'>
            <Grid item xs={1}>
                {cert.approver}
            </Grid>
            <Grid item xs={2}>
                {cert.renewDate}
            </Grid>
            <Grid item xs={2}>
                {cert.renewed ? cert.renewed.toString() : "null"}
            </Grid>
            <Grid item xs={2}>
                {cert.renewedBy}
            </Grid>
            <Grid item xs={2}>
                {cert.renewedDate}
            </Grid>
            {
                button && (
                    <Grid item xs={1} className='space-x-3'>
                        <Link href={`/modify/${cert._id}`}>
                            <Tooltip title="Update Renewal" arrow>
                                <RateReviewIcon color="primary" sx={{ fontSize: 32 }} />
                            </Tooltip>
                        </Link>   
                    </Grid>
                )
            }
        </Grid>
    </Card>
    <div className='py-2'></div>
    </div>
  )
};

export default CertificateCard;
