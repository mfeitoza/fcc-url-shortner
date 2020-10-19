const mongoose = require('mongoose')
const { nanoid } = require('nanoid')
const Schema = mongoose.Schema

const urlSchema = new Schema({
    _id: {
        type: String,
        default: () => nanoid(8)
    },
    url: { type: String, required: true}
})

const UrlModel = mongoose.model('url', urlSchema)

async function save(url_string) {
    const url = new UrlModel({ url: url_string })

    return await url.save()
}

async function getById(short_url) {
    const data = await UrlModel.findById(short_url)
    return data || false
}

module.exports = {
    save,
    getById
}