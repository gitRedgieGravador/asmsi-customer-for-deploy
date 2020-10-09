module.exports = {
    config() {
        return {
            accessKeyId: process.env.ACCESS_KEY_ID || "AKIASH7JNBJIUXMENQIV",
            secretAccessKey: process.env.SECRET_ACCESS_KEY || "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",
            region: process.env.REGION || "us-east-1"
        }
    }
}