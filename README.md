**CAUTION** this project is still alpha version and under maintenance

## About NGN

Next js is a powerful fullstack javascript framework, but it is too raw to focus just on what developer wants to write.
NGN is a project which helps typescript and javascript full stack developers to build their application easier with
next js. Lots of features are added to next js by NGN. some of them are:

- Added cookie encryption and decryption using a key.
- Added Logging feature with possibility of choosing minimum log level.
- Added global and grouped-routes middleware support.
- Added error handler for api routes.
- Added debug mode to hide server errors on production.
- Added custom errors to select whether you want to show message to user, determine the status code, etc.
- Added multi method support by a single end-point (thanks to next-connect package).
- Added Hashing facade for AES encryption and Base64 and Base64Url conversion.
- Added password hashing argon2 algorithm (thanks to argon2 package).
- Added multipart form data support (thanks to formidable package, needs bodyParsing to be false which is handled by
  `yarn make` command automatically).
- Added `yarn milkshake keygen` command to generate `APP_KEY`.
- Added API resources to manipulate data coming from a database or request easily.
- Added `yarn milkshake make` command to make middlewares, pages, apis, resources, rules and etc.
- Added stateful serverside session (thanks to next-session package).
- Added validator for request inputs in api and user inputs in pages.
- Added some attributes to request to retrieve all data with a simple key call.
- Added upload feature with mime type guessing (thanks to file-type).
- Added File and Redis cache driver
- Added trusted proxies feature
- Added super simple rate-limit feature

## How to use

- Install it using `yarn add ngn`
- Initiate NGN using `milkshake init`