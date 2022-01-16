import dbConnect from '../../../utils/dbConnect';
import Cert from '../../../models/Cert';

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const certs = await Cert.find({});

                res.status(200).json({ success: true, data: certs })
            } catch (error) {
                res.status(400).json({ success: false, error });
            }
            break;
        case 'POST':
            try {
                const cert = await Cert.create(req.body);

                res.status(201).json({ success: true, data: cert })
            } catch (error) {
                res.status(400).json({ success: false, error });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}