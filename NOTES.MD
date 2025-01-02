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
