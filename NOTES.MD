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
