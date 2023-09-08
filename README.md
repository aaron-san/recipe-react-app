See the live app [here](https://recipe-react-app-ad1cc.web.app/).

# Workflow

## Run development server

```shell
npm start
```

## Deploy

```shell
git add .
git commit -m "message"
git push
npm run build
firebase deploy
```

```shell
firebase login
```

# If there are login problems, try to reathorize

```shell
firebase login --reauth
```

```shell
npm i firebase react-redux-firebase redux-firestore redux-thunk
```

react-redux-firebase — for syncing data in firestore to our store.

react-firestore — for connecting the whole application to the firestore database.

redux-thunk- allows us to call an asynchronous function in our app before action is being dispatched.
