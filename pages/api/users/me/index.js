import dbConnect from '../../../../utils/dbConnect';
import User from '../../../../models/User';

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                res.status(200).json({ success: true, data: req.user })
            } catch (error) {
                res.status(400).json({ success: false, error });
            }
            break;
        case 'PATCH':
            const updates = Object.keys(req.body)
            const allowedUpdates = ['name', 'email', 'password', 'age']
            const isValidOperaton = updates.every((update) => allowedUpdates.includes(update))
            if (!isValidOperaton) {
                return res.status(400).send({success: false, error: 'Invalid field to update!'})
            }
            try {
                updates.forEach((update) => req.user[update] = req.body[update])
                await req.user.save()
                res.status(201).json({ success: true })
            } catch (error) {
                res.status(400).json({ success: false, error });
            }
            break;
        case 'DELETE':
            try {
                await req.user.remove()
                res.status(201).json({ success: true, data: req.user })
            } catch (error) {
                res.status(400).json({ success: false, error });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
// router.get('/users/me', auth, async (req, res) => {
//     res.send(req.user)
// })

// router.patch('/users/me', auth, async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name', 'email', 'password', 'age']
//     const isValidOperaton = updates.every((update) => allowedUpdates.includes(update))
//     if (!isValidOperaton) {
//         return res.status(400).send({error: 'Invalid field to update!'})
//     }
//     try {
//         updates.forEach((update) => req.user[update] = req.body[update])
//         await req.user.save()
//         res.send(req.user)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

// router.delete('/users/me', auth, async (req, res) => {
//     try {
//         await req.user.remove()
//         res.send(req.user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })