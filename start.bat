rem netstat -ano | find "80"
taskkill /im node.exe

%~d0
cd %~dp0

node index.js ./config.js
