'use strict'
const Helpers = use('Helpers')

class UploadFileController {
    async upload({ request, response }) {
        try {
            const profilePic = request.file('file');
            await profilePic.move(Helpers.tmpPath('uploads/file'))
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = UploadFileController
