import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

dbConnect();

export default async (req, res) => {
    const { method } = req;
// console.log({method})
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
            // console.log(req.body)
            try {
                const user = await User.findByCredenticals(req.body.email, req.body.password)
                console.log({user})
                const token = await user.generateAuthToken()
                console.log({token})
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

// router.post('/users/login', async (req, res) => {
//     try {
//         const user = await User.findByCredenticals(req.body.email, req.body.password)
//         const token = await user.generateAuthToken()
//         res.send({user, token})
//     } catch (e) {
//         res.status(400).send()
//     }
// })