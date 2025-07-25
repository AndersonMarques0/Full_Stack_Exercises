```mermaid
sequenceDiagram
    actor u as user
    participant b as browser
    participant s as server
    
    u->>b: Write a message and clicks on the button "save"
    b->>s: POST: https://studies.cs.helsinki.fi/exampleapp/new_note
    activate s
    s-->>b: redirected for /notes
    deactivate s

    b->>s: GET: https://studies.cs.helsinki.fi/exampleapp/notes
    activate s
    s-->>b: HTML document
    deactivate s

    b->>s: GET: https://studies.cs.helsinki.fi/exampleapp/main.css
    activate s
    s-->>b: css file
    deactivate s

    b->>s: GET: https://studies.cs.helsinki.fi/exampleapp/main.js
    activate s
    s-->>b: JavaScript file
    deactivate s

    b->>s: GET: https://studies.cs.helsinki.fi/exampleapp/data.json
    activate s
    s-->>b: data.json
    deactivate s

    Note right of b: The page shows the notes
```