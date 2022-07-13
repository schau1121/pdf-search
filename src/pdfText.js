import ConvertApi from 'convertapi-js'

const SECRET_KEY = 'QV4wR7bcZXoSAnuY';

export default async function pdfToText(file) {
    let text = "";
    let convertApi = ConvertApi.auth(SECRET_KEY);
    let params = convertApi.createParams()
    params.add('File', file);
    let result = await convertApi.convert('pdf', 'txt', params)
    await fetch(result.files[0].Url)
        .then(response => response.text())
        .then(data => {
            text = data;
        })
    return text;
}