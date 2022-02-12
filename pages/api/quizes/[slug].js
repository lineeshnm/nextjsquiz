import dbConnect from '../../../utils/dbConnect';
import Quiz from '../../../models/Quiz';

dbConnect();

export default async (req, res) => {
    // console.log(req)
    const {
        query: { slug },
        method
    } = req;

    switch (method) {
        case 'GET':
            try {
                const quiz = await Quiz.findOne({ slug: slug });
                // console.log("Inside API", quiz)
                if (!quiz) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: quiz });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'PUT':
            // console.log("In put method", id)
            // let update = JSON.parse(req.body)
            try {
                Quiz.findOneAndUpdate({ slug: slug }, req.body, {
                    new: true,
                    runValidators: true
                }, (err, doc) => {
                    if (err) {
                        // console.log({err})
                        return res.status(400).json({ success: false , error: err});
                    }
                    // console.log({doc})
                    res.status(200).json({ success: true, data: doc });
                });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'DELETE':
            try {
                const deletedQuiz = await Quiz.deleteOne({ slug: slug });

                if (!deletedQuiz) {
                    return res.status(400).json({ success: false })
                }

                res.status(200).json({ success: true, data: {} });
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}