import kms = require('@google-cloud/kms');

let kmsClientV1: kms.v1.KeyManagementServiceClient;
kmsClientV1 = new kms.v1.KeyManagementServiceClient();

const credentials = {
    type: 'service_account',
    project_id: '****',
    private_key_id: '****',
    private_key: '****',
    client_email: '****',
    client_id: '****',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: '****'
};

let kmsClient: kms.KeyManagementServiceClient;
kmsClient = new kms.KeyManagementServiceClient({ credentials });

async function exampleCreateKeyRing() {
    const formattedParent = kmsClient.locationPath('[PROJECT]', '[LOCATION]');
    const keyRingId = '';
    const keyRing = {};
    const request = {
      parent: formattedParent,
      keyRingId: keyRingId,
      keyRing: keyRing,
    };

    const [asyncCreatedKeyRing] = await kmsClient.createKeyRing(request);
    console.log(`Created KeyRing: ${asyncCreatedKeyRing.name}`);

    const [asyncCreatedKeyRingWithGaxOpts] = await kmsClient.createKeyRing(request, { timeout: 1000 });
    console.log(`Created KeyRing with GAX opts: ${asyncCreatedKeyRingWithGaxOpts.name}`);

    kmsClient.createKeyRing(request, (err, [response]) => {
        console.log(`Created KeyRing: ${response.name}`);
    });

    kmsClient.createKeyRing(request, { timeout: 1000 }, (err, [response]) => {
        console.log(`Created KeyRing: ${response.name}`);
    });
}

async function exampleListKeyRings() {
    const locationPath = kmsClient.locationPath('[PROJECT_ID]', '[LOCATION]');
    const [ asyncKeyRings ] = await kmsClient.listKeyRings({parent: locationPath});
    if  (asyncKeyRings.length > 0) {
        const keyRing = asyncKeyRings[ 0 ];
        console.log(`KeyRing: ${keyRing.name}`);
    }

    kmsClient.listKeyRings({parent: locationPath}, (err, [ callbackKeyRings ]) => {
        if  (callbackKeyRings.length > 0) {
            const keyRing = callbackKeyRings[ 0 ];
            console.log(`KeyRing: ${keyRing.name}`);
        }
    });

    kmsClient.listKeyRings({parent: locationPath}, { timeout: 1000 }, (err, [ callbackWithOptionsKeyRings ]) => {
        if  (callbackWithOptionsKeyRings.length > 0) {
            const keyRing = callbackWithOptionsKeyRings[ 0 ];
            console.log(`KeyRing: ${keyRing.name}`);
        }
    });
}

async function exampleListCryptoKeys() {
    const keyRingPath = kmsClient.keyRingPath('[PROJECT_ID]', '[LOCATION]', '[KEYRING_ID]');
    const [ asyncKeys ] = await kmsClient.listCryptoKeys({parent: keyRingPath});
    if (asyncKeys.length > 0) {
        const key = asyncKeys[ 0 ];
        console.log(`CryptoKey: ${key.name} Version: ${key.primary.name}`);
    }

    kmsClient.listCryptoKeys({parent: keyRingPath}, (err, [ callbackKeys ]) => {
        if  (callbackKeys.length > 0) {
            const key = callbackKeys[ 0 ];
            console.log(`CryptoKey: ${key.name} Version: ${key.primary.name}`);
        }
    });

    kmsClient.listCryptoKeys({parent: keyRingPath}, { timeout: 1000 }, (err, [ callbackWithOptionsKeys ]) => {
        if  (callbackWithOptionsKeys.length > 0) {
            const key = callbackWithOptionsKeys[ 0 ];
            console.log(`CryptoKey: ${key.name} Version: ${key.primary.name}`);
        }
    });
}

async function exampleEncrypt() {
    const formattedName = kmsClient.cryptoKeyPath('[PROJECT_ID]', '[LOCATION]', '[KEYRING_ID]', '[KEY_ID]');
    const unencryptedText = Buffer.from('Hello World');

    const [ asyncEncryptResult ] = await kmsClient.encrypt({ name: formattedName, plaintext: unencryptedText });
    if (asyncEncryptResult != null) {
        console.log(`Encrypted: ${asyncEncryptResult.ciphertext.toString('base64')}`);
    }

    kmsClient.encrypt({ name: formattedName, plaintext: unencryptedText }, (err, [ callbackEncryptResult ]) => {
        if (callbackEncryptResult != null) {
            console.log(`Encrypted: ${callbackEncryptResult.ciphertext.toString('base64')}`);
        }
    });

    kmsClient.encrypt({ name: formattedName, plaintext: unencryptedText }, { timeout: 1000 }, (err, [ callbackWithOptionsEncryptResult ]) => {
        if (callbackWithOptionsEncryptResult != null) {
            console.log(`Encrypted: ${callbackWithOptionsEncryptResult.ciphertext.toString('base64')}`);
        }
    });
}

async function exampleDecrypt() {
    // Example pulling a file from Cloud Storage
    // const secretsStorage = new Storage({ credentials });
    // const bucket = secretsStorage.bucket('[KMS_STORAGE_BUCKET]');
    // const filePath = '[PATH_TO_KMS_ENCRYPTED_FILE';
    // const file = bucket.file(filePath);
    // const buffers = await file.download();
    // const buffer = buffers[ 0 ];

    const buffer = Buffer.from('[ENCRYPTED_SOURCE_BUFFER]');
    const formattedName = kmsClient.cryptoKeyPath('[PROJECT_ID]', '[LOCATION]', '[KEYRING_ID]', '[KEY_ID]');
    const [ asyncDecryptResult ] = await kmsClient.decrypt({name: formattedName, ciphertext: buffer });
    if (asyncDecryptResult != null) {
        console.log(`Decrypted: ${asyncDecryptResult.plaintext.toString('utf8')}`);
    }

    kmsClient.decrypt({ name: formattedName, ciphertext: buffer }, (err, [ callbackDecryptResult ]) => {
        if (callbackDecryptResult != null) {
            console.log(`Decrypted: ${callbackDecryptResult.plaintext.toString('utf8')}`);
        }
    });

    kmsClient.decrypt({ name: formattedName, ciphertext: buffer }, (err, [ callbackWithOptionsDecryptResult ]) => {
        if (callbackWithOptionsDecryptResult != null) {
            console.log(`Decrypted: ${callbackWithOptionsDecryptResult.plaintext.toString('utf8')}`);
        }
    });
}
