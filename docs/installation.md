Now that you know what NGN is, it's time to install it!

### Install NGNJs package
Simply rum `npm i --save ngnjs` if you're using NPM and `yarn add ngnjs` if you
are a yarn user. After installation, *milkshake* binary file will be added to
`node_modules/.bin` directory. So you can use it simply by calling it. NGNJs
needs a set of files and configurations to work properly and let you customize
NGNJs functionality. By calling `milkshake init`, All of these files will be
created for you. These files are:

- config directory: All NGNJs config files are located in this directory.
You can add or remove middlewares, set middlewares to a group of routes,
change throttling duration and number of requests, add some trusted proxy
ips if you're proxying your code.
- storage directory: All files created by caching systems, all files you
upload and all of your log files are located at this directory. You will
learn how to upload files, log a message and use caching system later.
- .env.example and .env.local: Some environment variables need to be set
so NGNJs can read and use them. All these variables are listed in
`.env.example` file. This file is a sample file for you to know what
variables are necessary for NGNJs. In the other side, `.env.local` is
real `.env` file and has real values for variables. So it's git ignored.
Be careful to back up you `.env.local` and `.env.example` file before using
`milkshake init`. Milkshake **will override env files**
- handler.ts: It's NGNJs request handler for API requests.
- pages/api/storage/[...path].ts: This endpoint is used for pseudo static file
serving.
- pages/api/log.ts: Used to log a message in log files from clientSide.

That's it! You're all set! now lets check how to use NGNJs features