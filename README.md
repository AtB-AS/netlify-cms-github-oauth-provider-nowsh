# Netlify-cms-github-oauth-provider-nowsh

**_External authentication providers were enabled in netlify-cms version 0.4.3. Check your web console to see your netlify-cms version._**

[netlify-cms](https://www.netlifycms.org/) has its own github OAuth client. This implementation was created by reverse engineering the results of that client, so it's not necessary to reimplement client part of [netlify-cms](https://www.netlifycms.org/).

Github, Github Enterprise and Gitlab are currently supported, but as this is a general Oauth client, feel free to submit a PR to add other git hosting providers.

This implementation is ment for hosting on Zeits Now.sh and based on the implementation [for Node.js and express](https://github.com/vencax/netlify-cms-github-oauth-provider)

## 1) Install Locally

**Install Repo Locally**

```
git clone https://github.com/atb-as/netlify-cms-github-oauth-provider-nowsh
cd netlify-cms-github-oauth-provider-nowsh
npm install
```

**Create Oauth App**
Information is available on the [Github Developer Documentation](https://developer.github.com/apps/building-integrations/setting-up-and-registering-oauth-apps/registering-oauth-apps/) or [Gitlab Docs](https://docs.gitlab.com/ee/integration/oauth_provider.html). Fill out the fields however you like, except for **authorization callback URL**. This is where Github or Gitlab will send your callback after a user has authenticated, and should be `https://your.server.com/callback` for use with this repo.

## 2) Config

### Auth Provider Config

Configuration is done with environment variables, which can be supplied as command line arguments, added in your app hosting interface, or loaded from a .env ([dotenv](https://github.com/motdotla/dotenv)) file.

**Example .env file:**

For local development.

```
NODE_ENV=production
ORIGIN=www.my_organisation.com
OAUTH_CLIENT_ID=f432a9casdff1e4b79c57
OAUTH_CLIENT_SECRET=pampadympapampadympapampadympa
REDIRECT_URL=https://your.server.com/callback
GIT_HOSTNAME=https://github.website.com
```

**NOTE**: ORIGIN is mandatory and can contain regex (e.g. `.*.my_organisation.com`)

For Gitlab you also have to provide this environment variables:

```
OAUTH_PROVIDER=gitlab
SCOPES=api
OAUTH_AUTHORIZE_PATH=/oauth/authorize
OAUTH_TOKEN_PATH=/oauth/token
```

You can also setup an environment variable to configure "\_blank" target when auth window is opened. Default is "\_self".

```
AUTH_TARGET=_blank
```

**Client ID & Client Secret:**
After registering your Oauth app, you will be able to get your client id and client secret on the next page.

**Redirect URL (optional in github, mandatory in gitlab):**
Include this if you need your callback to be different from what is supplied in your Oauth app configuration.

**Git Hostname (Default github.com):**
This is only necessary for use with Github Enterprise or Gitlab.

### CMS Config

You also need to add `base_url` to the backend section of your netlify-cms's config file. `base_url` is the live URL of this repo with no trailing slashes.

```
backend:
  name: [github | gitlab]
  repo: user/repo   # Path to your Github/Gitlab repository
  branch: master    # Branch to update
  base_url: https://your.server.com # Path to ext auth provider
  auth_endpoint: /api/auth # Note: This is needed to match the Now.sh default path.

```

## Deployment on Now.sh

Set env.variables as seen above in the file `now.json`. See [Now.sh secrets](https://zeit.co/docs/v2/serverless-functions/env-and-secrets/).

Deploy:

```
now
```
