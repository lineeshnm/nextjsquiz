import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

dbConnect();

export default async (req, res) => {
    // console.log(req.body)
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const user = await User.find({});

                res.status(200).json({ success: true, data: user })
            } catch (error) {
                res.status(400).json({ success: false, error });
            }
            break;
        case 'POST':
            const user = new User(req.body)
            try {
                await user.save()
                const token = await user.generateAuthToken()
                res.status(201).json({ success: true, user, token })
            } catch (error) {
                res.status(400).json({ success: false, error });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}

// router.post('/users', async (req, res) => {
//     const user = new User(req.body)

//     try {
//         await user.save()
//         const token = await user.generateAuthToken()
//         res.status(201).send({user, token})
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })