const fs = require('fs');
const https = require('https');

const images = [
    // 8. Arı Şekeri (Bee Fondant) -> Replacing with a generic "Honey Bee" photo as requested ("sadece arı fotoğrafı koy")
    { url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Honey_bee_on_a_flower.jpg', path: 'public/images/aricilik/ari_foto_final.jpg' }
];

const download = (url, filePath) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filePath);
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        };

        const handleResponse = (response) => {
            if (response.statusCode === 302 || response.statusCode === 301 || response.statusCode === 303 || response.statusCode === 307) {
                console.log(`Redirecting to ${response.headers.location}`);
                let newUrl = response.headers.location;
                if (!newUrl.startsWith('http')) {
                    newUrl = new URL(newUrl, url).toString();
                }
                https.get(newUrl, options, handleResponse).on('error', (err) => {
                    fs.unlink(filePath, () => { });
                    reject(err);
                });
                return;
            }
            if (response.statusCode !== 200) {
                fs.unlink(filePath, () => { });
                reject(new Error(`Failed to download ${filePath}: Status Code ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
                console.log(`Downloaded ${filePath}`);
            });
        };

        https.get(url, options, handleResponse).on('error', (err) => {
            fs.unlink(filePath, () => { });
            reject(err);
        });
    });
};

async function run() {
    for (const img of images) {
        try {
            await download(img.url, img.path);
        } catch (e) {
            console.error(`Failed to download ${img.path}:`, e.message);
        }
    }
}

run();
