const mongoose = require('mongoose');

const CertSchema = new mongoose.Schema({
    managedDN: {
        type: String,
        trim: true
    },
    commonName: {
        type: String,
        trim: true,
        required: true
    },
    resource: {
        type: String,
    },
    serverName: {
        type: String,
        required: true
    },
    keyStoreLocation: {
        type: String,
        required: true
    },
    csrLocation: {
        type: String
    },
    endPointDependancy: {
        type: Boolean
    },
    validTo: {
        type: Date,
        required: true
    },
    environment: {
        type: String,
        required: true,
        maxlength: [10, 'Enviroment cannot be more than 10 charecters']
    },
    sfGroup: {
        type: String
    },
    itServiceInstance: {
        type: String
    },
    thumbPrint: {
        type: String,
        trim: true
    },
    renew: {
        type: Boolean
    },
    crNumber: {
        type: String
    },
    cTask: {
        type: String
    },
    approver: {
        type: String
    },
    renewDate: {
        type: Date
    }
})

module.exports = mongoose.models.Cert || mongoose.model('Cert', CertSchema)