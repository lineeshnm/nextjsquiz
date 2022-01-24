import dbConnect from '../../../../utils/dbConnect';
import User from '../../../../models/User';

dbConnect();

export default async (req, res) => {
    // console.log(req.query)
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const user =  await User.findById(req.query.id)
                // console.log(user)
                if (!user || !user.avatar) {
                    throw new Error()
                }
                res.set('Content-Type', 'image/png')

                res.status(200).json({ success: true, data: user.avatar })
            } catch (error) {
                res.status(400).json({ success: false, error });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
// router.get('/users/:id/avatar', async (req, res) => {
//     try {
//         const user =  await User.findById(req.params.id)
//         if (!user || !user.avatar) {
//             throw new Error()
//         }
//         res.set('Content-Type', 'image/png')
//         res.send(user.avatar)
//     } catch (e) {
//         res.status(404).send()
//     }
// })