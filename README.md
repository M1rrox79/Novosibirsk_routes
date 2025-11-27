1. Установка Node.js
  1. Скачивание пакетов сервиса brew:
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  2. Скачивание Node.js:
       brew install node
  3. Проверка установки:
     node -v
     npm -v
2. Установка зависимостей:
   npm install express sqlite3 body-parser cors
3. Запуск сервера:
   node server.js
