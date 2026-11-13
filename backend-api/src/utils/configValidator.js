'use strict';

function validateConfig() {
    const required = [
        'HANDSHAKE_HMAC_SECRET',
        'SYNC_HMAC_SECRET',
        'PG_HOST',
        'PG_USER',
        'PG_PASSWORD',
        'REDIS_URL',
        'ADMIN_DASHBOARD_ORIGIN'
    ];

    const missing = required.filter((key) => !process.env[key]);
    if (missing.length > 0) {
        console.error(`CRITICAL ERROR: Missing required environment variables: ${missing.join(', ')}`);
        process.exit(1);
    }

    const optionalMpesa = ['MPESA_CONSUMER_KEY', 'MPESA_CONSUMER_SECRET'];
    const mpesaMissing = optionalMpesa.filter((key) => !process.env[key]);
    if (mpesaMissing.length > 0 && mpesaMissing.length !== optionalMpesa.length) {
        console.warn(
            `Warning: incomplete MPESA configuration. Missing: ${mpesaMissing.join(', ')}. ` +
            'The API can still start without these values, but payment routes will fail until configured.'
        );
    }
}

module.exports = { validateConfig };
