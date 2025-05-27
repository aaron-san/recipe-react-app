See the live app [here](https://recipe-react-app-ad1cc.web.app/).

This project uses react redux to manage local state and firebase firestore database to persist the data.

## Install Firebase CLI

```shell
npm install -g firebase-tools
```

# Workflow

1. Run development server

```shell
npm run dev
```

2. Edit code

3. Deploy

```shell
git add .
git commit -m "message"
git push
npm run build
firebase deploy
```

```shell
firebase login
# If there is a login problem, try to reauthorize
firebase login --reauth
```

# Dependencies

```shell
npm i firebase react-redux-firebase redux-firestore redux-thunk
```

- **react-redux-firebase** - for syncing data in firestore to our store.

- **react-firestore** - for connecting the whole application to the firestore database.

- **redux-thunk** - allows us to call an asynchronous function in our app before action is being dispatched.
