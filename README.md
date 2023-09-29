## Quick Start
### Setup client

1. `git clone --depth=1 https://github.com/dang309/vucar-test <YOUR_FOLDER>`

2. `cd <YOUR_FOLDER>/client`

3. `cp .env.example .env`

4. `npm install && npm run dev`

### Setup server

1. `cd <YOUR_FOLDER>/server`

2. Add information in `process.json`

3. Import data to MySQL `mysql -u root -p vucar < dump.sql`

4. `npm install -g pm2`

5. `npm install && npm run dev`
