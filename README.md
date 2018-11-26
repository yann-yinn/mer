# Nuxt authentication example with Strapi 3

## Components

This repository contains two components, working out of the box:

- `components/SignInForm` : display a login form and log user on submission.
- `components/SignUpForm` : display a login form and register the new user on submission.

In this example, they are displayed in modals, handled by `components/BulmaNavigation` component.

## Store

`store/auth.js` contains all the logic related to authentication.

**Login the user manually**

```js
const data = {
  identifier: this.identifier,
  password: this.password
}
this.$store.dispatch('auth/login', data).then(r => {
  // user is now authenticated and avalailable in the store
  this.$store.state.auth.user
})
```

**access user object ( if user is authenticated )**

```js
this.$store.state.auth.user
```

**Register a new user**

```js
this.$store
  .dispatch('auth/register', {
    username: 'user',
    password: 'password',
    email: 'email@email.email'
  })
  .then(response => {
    // user is created
  })
```

**middleware**

you can protect a page using `middleware/authenticated` in your page component.
By default, this middleware simply redirect to the homepage.

```js
export default {
  middleware: 'authenticated'
}
```

## Installation

### Install strapi

- Install and configure Strapi 3 : [https://strapi.io/getting-started](https://strapi.io/getting-started)
- Make sure Strapi is running. This Nuxt example use `http://localhost:1337` as strapi url by default. Edit `strapiBaseUrl` in `nuxt.config.js` as needed.

### Install this Nuxt example

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

## Axios config and authorization header

The plugin `plugins/axios` handle the authorization header with an interceptor, so that the Authorization header is sent with a token (if any) on every request, both from server and browser side.
