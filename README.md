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

Now that you know what NGN is, it's time to install it!

## Install NGNJs package
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

## Milkshake

Milkshake is a cli script for making files from templates and generating APP_KEY
(APP_KEY is used for encryption). Supported commands are described bellow:

### init

This command initiates NGNJs for use. What is created during initialization is
described in installation section.

### make

This command makes a file from template. For now, templates are:

1. api: `milkshake make api` asks you some simple questions and makes an api
   endpoint for you. base path of api is `/pages/api` and you can give milkshake
   a path as api name to make your endpoint file in a sub path. For example if you
   choose your api name as `users/index`, an api file called *index* is created in
   `pages/api/users/` directory.
2. middleware: `milkshake make middleware` asks you the name of your middleware
   and creates a middleware file in `src/middlewares/` directory. Don't worry if you
   don't have *middlewares* directory. It will be created when needed. You can give
   a path as name to create this file in a sub directory under `src/middlewares/`.
3. page: `milkshake make page` asks you some questions and makes a page template
   for you under `pages/` directory. You can give a path as name to create this
   file in a sub directory under `pages/`.
4. resource: `milkshake make resource` creates a resource file for you under
   `src/resources`. Resources will be described in later sections
5. rule: `milkshake make rule` will create a custom validation rule under
   `src/validationRules`. Validation rules will be described in later sections.

### keygen

This command creates a new key for your application and sets it in `.env.local`
file.

## Requests and responses

If all NGNJs middlewares are globally applied as default config, You have some
more features than default NextJs:

1. req.files: This key is only available if your api endpoint supports
   *form-data*. Supporting *form-data* is asked from you when creating an endpoint
   using `milkshake make api` command. All uploaded files using form data is
   stored in this key. You can upload these files by simply calling upload
   method of one of files. This method has two args:

  - path: a string which determines the destination file path under
    `storage/public/uploads/` when private mode is false and `storage/` when private
    mode is true.
  - isPrivate: a boolean value which determines private mode. In the other words,
    setting isPrivate to *true* will upload your file in selected path under
    `storage/` and setting it to *false* will put your file under
    `storage/public/uploads`.

2. req.session: A server-side session storage. You can set value to session by
   simply assign a value to a key of `req.session`. For example imagine you want
   to set a session key called name with the value of *NGN*. You can do it in
   this way: `req.session.name = "NGN"`. Reading data from session is as simple
   as reading the value of that key of session. For example getting name key
   will be done this way: `const name = req.session.name`;

3. req.all: `req.query`, `req.files` and `req.body` are merged in `req.all`.
   It's useful when you don't know if request parameter is passed in query
   string, or body, or it's a file.

4. req.validate: It's an async function which validates your api inputs
   using rules. Using this feature is something like this:

   Imagine we have an endpoint which has *name* field as required field.
   There is no need to check it in your api logic. All you need to do is:

    ```javascript
    await req.validate({
    	"name": [new RequiredRule()]
    });
    ```

   This code snippet checks if *name* field is passed to your api. If it's
   not passed, a *429* status code will be returned with the error of invalidated
   field. For example if *name* is not passed to the code above, something
   like the bellow response will be returned:

    ```json
   {
       "message": "The given data is invalid",
       "errors": {
           "name": "Field is required"
       }
   }
    ```
   You can pass as many rules as you want to a key since value of validate
   argument **MUST be an array**. There are some rules available
   out-of-the-box: *EmailRule* for regex email validation, *InRule* for
   checking if given key exists in an array, *NumberRule* to check if
   input is a number, *RequiredRule* and *StringRule*.

   You can implement your own rule by creating a rule using
   `milkshake make rule` and implementing your logic in it.

   **Note**: Validator can also be used in client-side. You will learn it
   in next sections.

5. req.ip: returns IP of client. If you're serving application using a proxy,
   You need to set your proxy ip to `config/trustedProxies.json` file in order
   to read `X-Real-Ip` or `X-Forwarded-For` to get ip address, otherwise
   remote address will be returned.

6. res.setCookie: This function encrypts cookie value and sets it.

   **Note**: Since it's possible for a website to have cookies which
   set from other packages, NGNJs adds a prefix to your cookie name to
   find out which cookies need decryption. Don't worry. This cookie name
   prefix will be deleted when cookies are decrypted and passed to
   `req.cookies`. You only need to use prefixed cookie name if you want to
   access to a cookie client-side. This method is chainable, and you can use
   it as many times as you want. You can customise cookie prefix in .env.local
   by changing *COOKIE_PREFIX* value.

## Validation

Form validation can be done in both client and server side using validation
rules. Validation rules are some javascript classes which must have two
methods implemented:

1. `public async evaluate(object)`: Has only one argument which is the value
   of the key you mapped to a rule. This value is passed to validation rule
   class automatically when it's called. Your validation logic should be
   implemented in this method and returns *true* on validation success and
   *false* otherwise.

2. `public getError(fieldName)`: fieldName mapped to a rule will be passed
   automatically to this method. This method should return a message which
   contains error information on validation error.

You can also implement the constructor method if you want to pass some data
to your validator class.

There are some rules implemented in NGNJs out-of-the-box:

- EmailRule: Validates an email address using regex.
- InRule: Validates if value under validation is existed in an array.
- NumberRule: Checks if value is a number
- RequiredRule: Checks if value is existed.
- StringRule: Checks if value type is string.

#### An example of implementing a rule:

You can create a custom rule using `milkshake make rule`. the code
bellow is InRule which is implemented in NGNJs:

typescript:
```typescript
import Rule from "ngn/dist/services/validator/rules/Rule";

class InRule implements Rule {
   private readonly arr: Array<string|number>;
   constructor(arr: Array<string|number>) {
      this.arr = arr;
   }
   evaluate(object: any): boolean {
      return ((!object && typeof object !== "boolean") || this.arr.includes(object));
   }

   getError(fieldName: string): string {
      const arrayString = JSON.stringify(this.arr);
      return `${fieldName} must be in ${arrayString}`;
   }
}

export default InRule;
```

javascript:
```javascript
class InRule{
    arr;
    constructor(arr) {
        this.arr = arr;
    }
    evaluate(object) {
        return ((!object && typeof object !== "boolean") || this.arr.includes(object));
    }

    getError(fieldName) {
        const arrayString = JSON.stringify(this.arr);
        return `${fieldName} must be in ${arrayString}`;
    }
}

export default InRule;
```

### Using validators in pages

Using validation in pages (both CSR and SSR) is done using `validate` function. This function gets two args:

- An object maps field names to an array of rules as the first argument.
- The object you want to validate as the second argument.

validate function returns an object with two keys:

- result: a boolean value which is true on validation success and false otherwise
- errors: an object of errors which maps field names to errors.

For example imagine you have a form which creates a key in a state on input changes:

```jsx
import {useState} from "react";
import validate from "ngn/dist/services/validator/validate";
import EmailRule from "ngn/dist/services/validator/rules/EmailRule";
import RequiredRule from "ngn/dist/services/validator/rules/RequiredRule";

const Form = () => {
    const [data, setData] = useState({});
    const fillData = (e) => setData(state => ({...state, [e.target.name]: e.target.value}));
    const validateForm = (e) => {
        e.preventDefault();
        // We will implement validate method later
    } 
    
    return (
        <form onSubmit={validateForm}>
           <input type="text" name="name" placeholder="name" onChange={fillData}/><br/>
           <input type="text" name="surname" placeholder="surname" onChange={fillData}/><br/>
           <input type="text" name="email" placeholder="email address" onChange={fillData}/><br/>
           <button type="submit">Send</button>
        </form>
    )
}
```

Now we have something like bellow in `data` variable after filling form:

```json
{
   "name": "Farbod",
   "surname": "Shams",
   "email": "farbodshams.2000@gmail.com"
}
```

So want we want to validate is this object. We can use `validate` asynchronous function like this:

```javascript
const validateForm = (e) => {
    e.preventDefault();
    validate({
       name: [new RequiredRule()],
       surname: [new RequiredRule()],
       email: [new RequiredRule(), new EmailRule()],
    }).then(res => {
        if(!res.result)
            console.error("Validation error: ", errors)
       else {
           //Do main thing
        }
    })
} 
```

### Using validators in API

In api you can simply use `req.validate` asynchronous function. Is has only one argument which is an object maps field
names to an array of rules. All of your request data (query string, body and files) are passed to validator function
automatically. `req.validate` throws an `ValidationError` error on request is not validate with rules check. This error
is automatically caught and returns an object holds message and errors with the status code of *422*.