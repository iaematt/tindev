const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {

        const { user } = req.headers;
        const { devId } = req.params;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if (!targetDev) {
            return res.status(400).json({ error: 'Dev not exists' });
        }

        if (targetDev.likes.includes(loggedDev._id)) {
            const loggedSocket = req.connectedUsers[devId];
            const targedSocket = req.connectedUsers[user];

            if (loggedSocket) {
                req.io.to(loggedSocket).emit('match', loggedDev);
            }

            if (targedSocket) {
                req.io.to(targedSocket).emit('match', targetDev);
            }
        }

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);
    }
};