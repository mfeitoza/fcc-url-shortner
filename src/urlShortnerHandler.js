const dns = require('dns')
const { save, getById } = require('./model')

function urlShortnerPost(req, res) {
    const original_url = req.body.url
    dns.lookup(original_url, (err, address, family) => {
        if (err) {
            res.json({ erro: "invalid URL" })
        } else {
            save(original_url).then(data => {
                res.json({ original_url, short_url: data._id })
            })
        }
    })
}

function urlShortnerGet(req, res) {
    const url = req.params.url

    getById(url).then(data => {
        if (data) {
            const link = (data.url.indexOf('://') === -1) ? 'http://' + data.url : data.url
            res.redirect(link)
        } else {
            res.json({ error: "invalid URL" })
        }
    })
}

module.exports = { urlShortnerPost, urlShortnerGet }