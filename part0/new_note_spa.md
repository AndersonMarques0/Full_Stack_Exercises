```mermaid
sequenceDiagram
    participant u as user 
    participant b as browser
    participant s as server

    u->>b: user writes a new note and submit the text
    
    b->>s: GET: https://studies.cs.helsinki.fi/exa  mpleapp/spa
    activate s
    s-->>b: html code
    deactivate s
    b->>s: GET: https://studies.cs.helsinki.fi/exampleapp/main.css
    activate s
    s-->>b: main.css file
    deactivate s
    b->>s: GET: https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate s
    s-->>b: spa.js file
    deactivate s
    b->>s: GET: https://studies.cs.helsinki.fi/exampleapp/data.json
    activate s
    s-->>b: data.json file
    deactivate s
    b->>s: POST: https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate s
    s-->>b: message: note create
    deactivate s
```