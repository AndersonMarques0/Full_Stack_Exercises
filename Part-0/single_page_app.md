```mermaid
sequenceDiagram
    participant u as user 
    participant b as browser
    participant s as server

    u->>b: user digits https://studies.cs.helsinki.fi/exampleapp/spa
    
    b->>s: GET: https://studies.cs.helsinki.fi/exampleapp/spa
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
```