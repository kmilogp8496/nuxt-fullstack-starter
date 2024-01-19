# Nuxt Minimal Fullstack Starter

Based on [Atinux](https://github.com/Atinux) example: [nuxt-todos-edge](https://github.com/Atinux/nuxt-todos-edge)

## Pre-installed packages

- [Nuxt UI](https://ui.nuxt.com/) module for visual components.
- [Drizzle ORM](https://orm.drizzle.team/) for DB handling ready for [D1](https://developers.cloudflare.com/d1/), [Turso](https://turso.tech/) or SQLite.
- [Eslint configuration](https://github.com/antfu/eslint-config) from [antfu](https://github.com/antfu).
- Google Authentication integrated by [nuxt-auth-utils](https://github.com/Atinux/nuxt-auth-utils) from [Atinux](https://github.com/Atinux).

## Setting up Google Authentication

You need to create credentials [in the cloud console](https://console.cloud.google.com/apis/credentials) for using Google sign-in. Then, configure your `.env` file taking the `.env.example` as a reference.

```
NUXT_SESSION_PASSWORD=<your_super_secret_password>
NUXT_OAUTH_GOOGLE_CLIENT_ID=<your_google_client_id>
NUXT_OAUTH_GOOGLE_CLIENT_SECRET=<your_google_client_secret>
```

## Thanks

Thanks to the vue and nuxt core team and community for their great job :heart:.

Enjoy.
