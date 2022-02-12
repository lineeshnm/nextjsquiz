import dbConnect from '../../../utils/dbConnect';
import Quiz from '../../../models/Quiz';

dbConnect();

export default async (req, res) => {
    const { method } = req;
    // console.log(method, req.body)

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
                // console.log("Inside Post")
                const quiz = await Quiz.create(req.body);
                // console.log({quiz})
                res.status(201).json({ success: true, data: quiz })
            } catch (error) {
                // console.log(error)
                res.status(400).json({ success: false, error });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}