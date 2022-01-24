import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

dbConnect();

export default async (req, res) => {
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
            try {
                req.user.tokens = req.user.tokens.filter((token) => {
                    return token.token !== req.token
                })
                await req.user.save()
                res.status(201).json({ success: true })
            } catch (error) {
                res.status(400).json({ success: false, error });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
// router.post('/users/logout', auth, async (req, res) => {
//     try {
//         req.user.tokens = req.user.tokens.filter((token) => {
//             return token.token !== req.token
//         })
//         await req.user.save()
//         res.send()
//     } catch (e) {
//         res.status(500).send()
//     }
// })