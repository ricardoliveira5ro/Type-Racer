# NOTES

This file may contain outdated and not implemented ideas, it just serves the purpose to expose some pre planning and technical considerations

### Cookies

- Secure: 
    - true -> for production
    - false -> for localhost
- SameSite: 
    - 'Lax' -> using react local server :5000, allowing cross-origin requests
    - 'Strict' -> using node server with react build, same origin

### Mongoose

- Run validators do not work in update actions (findOneAndUpdate / updateOne), must update the object directly and use save action

### Folder Structure

Client (Frontend) - React.js

```
client/
├── build/ # Generated to be rendered in server (npm run build) 
├── public/
|   ├── index.html
|   └──  ...
├── src/
|   ├── features/ # Pages
|   |   ├── Home
|   |   └── ...
|   ├── components/ # Reusable components 
|   |   ├── Header
|   |   ├── Button
|   |   ├── Input
|   |   └── ...
|   ├── hooks/ # Reusable hooks
|   ├── utils/
|   ├── App.js # Router
|   └── index.js # Starting up file
└── ...
```

### Quotes, sentences and generated text

There are some options to get/generate the text that will be typed by the players

- NPM packages
- Pre loaded static data using online datasets
- External API
    - API Quotable IO
- Integrate Open AI to generate

Project Gutenberg is a library with free license eBooks. The idea could be extracting meaningful paragraphs from several books using any AI tool or creating a small script to do that

- Asset static file with quote - source - author
- Load in AppContext once the app starts and use it globally without having to load every time needed

### Color Scheme

- **Dark**: <span style="background-color: #161718; color: #161718; padding: 2px 5px; border-radius: 3px;">#161718</span> #161718
- **Grey**: <span style="background-color: #6B6E70; color: #6B6E70; padding: 2px 5px; border-radius: 3px;">#6B6E70</span> #6B6E70
- **Green**: <span style="background-color: #86C232; color: #86C232; padding: 2px 5px; border-radius: 3px;">#86C232</span> #86C232
- **White**: <span style="background-color: #FFFFFF; color: white; padding: 2px 5px; border-radius: 3px;">#FFFFFF</span> #FFFFFF

### Run local mongodb

```
/[path-to]/[folder]/mongodb/bin/mongod.exe --dbpath=/[path-to]/[folder]/mongodb-data
```

### Auto boot terminals

1. Install Restore Terminals extension (EthanSK.restore-terminals)
2. Settings -> Extensions -> Restore Terminals Config -> Terminals (edit settings.json)
3. 
```
"restoreTerminals.terminals": [
    {
        "splitTerminals": [{
            "name": "server",
            "commands": [
                "cd server",
                "npm run dev"
            ]
        }]
    },
    {
        "splitTerminals": [{
            "name": "client",
            "commands": [
                "cd client",
                "npm start"
            ]
        }]
    },
]
```
4. (Optional) Not sync this as profile setting
```
"settingsSync.ignoredSettings": ["restoreTerminals.terminals"]
```

### Localhost port already in use (find and kill process)

- netstat -ano | findstr {port}
- taskkill /F /pid {pid}

### Email API Service (password recovery)

- Sendgrid is very popular however had some trouble trying to sign up and login into the account
- Mailgun is free trial tier
- Resend (final choice) has 100 emails per day limitation and no bulk email sending