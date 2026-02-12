# [Ubuntu] Nextjs project - Unsupported engine: required: { node: '>=20.9.0' } #

I got this error when launching `npm install` to install all my next.js project dependencies:

```sh
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: 'next@16.1.3',
npm WARN EBADENGINE   required: { node: '>=20.9.0' },
npm WARN EBADENGINE   current: { node: 'v18.19.1', npm: '9.2.0' }
npm WARN EBADENGINE }
npm ERR! code ETIMEDOUT
npm ERR! syscall connect
npm ERR! errno ETIMEDOUT
npm ERR! network request to https://registry.npmjs.org/zod-validation-error/-/zod-validation-error-4.0.2.tgz failed, reason: connect ETIMEDOUT 2606:4700::6810:a22:443
npm ERR! network This is a problem related to network connectivity.
npm ERR! network In most cases you are behind a proxy or have bad network settings.
npm ERR! network 
npm ERR! network If you are behind a proxy, please make sure that the
npm ERR! network 'proxy' config is set properly.  See: 'npm help config'

npm ERR! A complete log of this run can be found in:
```

## SOLUTION ##

```sh
# Update Node.js via NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify the version
node --version
npm --version

# Clear npm cache
npm cache clean --force

# Install with verbose logging
npm install --verbose
```