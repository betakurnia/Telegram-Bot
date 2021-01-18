<div>
<h1>Telegram Bot</h1>
<p>RSS by https://www.livechart.me/</p>
<p>created using NodeJS</p>  
</div>

## How to deploy your telegram bot to Heroku:

- [ ] Init a new git repo:
  ```bash
  git init
  ```
- [ ] Login to Heroku:
  ```bash
  heroku login
  ```
- [ ] Create a Heroku app:
  ```bash
  heroku create
  ```
- [ ] Update Heroku config
  ```bash
  heroku config:set --app YourAppId BOT_TOKEN='YOUR BOT TOKEN'
  heroku config:set --app YourAppId BOT_DOMAIN='https://YourAppId.herokuapp.com'
  ```
- [ ] Finally use git to deploy:
  ```bash
  git add .
  git commit -m 'commit message'
  git push heroku master
  ```
