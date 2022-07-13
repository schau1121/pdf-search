import ConvertApi from 'convertapi-js'

const SECRET_KEY = 'QV4wR7bcZXoSAnuY';

export default async function pdfToPng(file) {
    let convertApi = ConvertApi.auth(SECRET_KEY)
    let params = convertApi.createParams()
    params.add('File', file);
    params.add('ImageHeight', '180');
    params.add('ImageWidth', '130');
    let result = await convertApi.convert('pdf', 'png', params)
    await fetch(result.files[0].Url)
        .then(response => response.blob())
        .then(blob => {
            return blob
        })
}