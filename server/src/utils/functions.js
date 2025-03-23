const Lobby = require('../models/lobby')

const handleOnUserLeave = async (lobby, socketID) => {
    if (!lobby) return

    if (lobby.players.filter(p => (!p.hasLeft && p.user !== socketID)).length === 0) {
        await Lobby.deleteOne({ code: lobby.code })

    } else {
        const updatedPlayers = lobby.players.map(player =>
            player.user === socketID
                ? { ...player, hasLeft: true }
                : player
        );

        lobby.players = updatedPlayers
        await lobby.save()
    }
}

const parseBool = (param) => {
    return !(
        param === "false" ||
        param === "0" ||
        param === "" ||
        param === undefined ||
        param === null
    )
}

module.exports = { handleOnUserLeave, parseBool }