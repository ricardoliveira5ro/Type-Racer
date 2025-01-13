# NOTES

This file may contain outdated and not implemented ideas, it just serves the purpose to expose some pre planning and technical considerations

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

### Color Scheme

- **Dark**: <span style="background-color: #161718; color: #161718; padding: 2px 5px; border-radius: 3px;">#161718</span> #161718
- **Grey**: <span style="background-color: #6B6E70; color: #6B6E70; padding: 2px 5px; border-radius: 3px;">#6B6E70</span> #6B6E70
- **Green**: <span style="background-color: #86C232; color: #86C232; padding: 2px 5px; border-radius: 3px;">#86C232</span> #86C232
- **White**: <span style="background-color: #FFFFFF; color: white; padding: 2px 5px; border-radius: 3px;">#FFFFFF</span> #FFFFFF

### Run local mongodb

```
/[path-to]/[folder]/mongodb/bin/mongod.exe --dbpath=/[path-to]/[folder]/mongodb-data
```