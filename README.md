**CAUTION** this project is still alpha version and under maintenance

## About NGN

Next js is a powerful fullstack javascript framework, but it is too raw to focus just on what developer wants to write.
NGN is a project which helps typescript and javascript full stack developers to build their application easier with
next js. Lots of features are added to next js by NGN. some of them are:

- Cookie encryption and decryption using a key.
- Logging feature with possibility of choosing minimum log level.
- Global and grouped-routes middleware support.
- Error handler for api routes.
- Debug mode to hide server errors on production.
- Custom errors to select whether you want to show message to user, determine the status code, etc.
- Multi method support by a single end-point (thanks to next-connect package).
- Hashing facade for AES encryption and Base64 and Base64Url conversion.
- Multipart form data support (thanks to formidable package, needs bodyParsing to be false which is handled by
  `milkshake make` command automatically).
- `milkshake keygen` command to generate `APP_KEY`.
- API resources to manipulate data coming from a database or request easily.
- `milkshake make` command to make middlewares, pages, apis, resources, rules etc.
- Stateful serverside session (thanks to next-session package).
- Validator for request inputs in api and user inputs in pages.
- Some attributes to request to retrieve all data with a simple key call.
- Upload feature with mime type guessing (thanks to file-type).
- Retrieve uploaded files using a pseudo static endpoint (`/api/storage/`)
- File and Redis cache driver
- Trusted proxies feature
- Super simple rate-limit feature

## How to use

- Install it using `yarn add ngn`
- Initiate NGN using `milkshake init`