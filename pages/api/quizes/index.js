import dbConnect from '../../../utils/dbConnect';
import Quiz from '../../../models/Quiz';

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const quizes = await Quiz.find({});

                res.status(200).json({ success: true, data: quizes })
            } catch (error) {
                res.status(400).json({ success: false, error });
            }
            break;
        case 'POST':
            try {
                const cert = await Quiz.create(req.body);

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