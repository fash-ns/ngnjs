## NGN
A set of utils built for NextJs to make developers' job easier.

NextJs is a super powerful framework developed by javascript, but the API part
is too raw comparing to other frameworks built on PHP for example. So I've
developed a set of utils for it and called it NGNJs.

### Concepts
#### Milkshake Commander
Milkshake is a cli solution that helps developers to focus on what they
want to develop and reduce their errors. It can do many things such as

- Initiating NGN
- Make Pages, Apis, etc.
- Generate APP_KEY for AES encryption

You will become more familiar with *Milkshake* in later sections.

#### Errors
When using NGN, Every problem throws an error. Errors are caught by NGN api
handler, and its message is returned with appropriate status code. You will
learn more about errors and how to set their status codes later.

#### Facades
Some useful facades is available in NGNJs. Some of them brings new functionality
to NextJs, and some other just make works done easier.

#### Middlewares
About 10 middlewares are available out of the box, and almost all of them are
used globally.

#### Services
In-app Caching, Logging, request validation and resources are services
implemented in NGNJs. All of them will be described in details in later
sections.

#### Request handler
All API requests is handled using NGNJs request handler. This handler uses
[next-connect](https://github.com/hoangvvo/next-connect) and its powerful
features to handle requests.
