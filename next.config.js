/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "voutiq-app.s3.ap-northeast-2.amazonaws.com",
            "d22veplpbtt1aw.cloudfront.net",
        ],
    },
};

module.exports = nextConfig;
