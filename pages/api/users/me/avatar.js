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
        case 'POST':
            try {
                const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
                req.user.avatar = buffer
                await req.user.save()
                res.status(201).json({ success: true })
            } catch (error) {
                res.status(400).json({ success: false, error });
            }
            break;
        case 'DELETE':
            try {
                req.user.avatar = undefined
                await req.user.save()
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
// router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
//     const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
//     req.user.avatar = buffer
//     await req.user.save()
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({error: error.message})
// })

// router.delete('/users/me/avatar', auth, async (req, res) => {
//     req.user.avatar = undefined
//     await req.user.save()
//     res.send()
// })