## How to Run Your Source Code

1. Create a .env file in the top layer of the project and configure your database credentials in the file.
2. Run npm install to download the required npm packages for the server project.
3. Navigate to the client folder using cd client.
4. Run npm install inside the client folder to download the required npm packages for the client project. If the npm installation fails, kindly use the command --legacy-peer-deps or --force to fix any upstream dependency conflicts.
5. Navigate back to the root directory and run npm run dev to start both the client and server projects concurrently.

## Assumptions

1. Each file is uploaded in a single transaction.
2. The second file overwrites any updates to the first file as one block.

## Sample .env File

```bash
NODE_ENV=development
PORT=3001
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=buscaglione
DB_DATABASE=toppandb
DB_DIALECT=mysql
```

## CSV Examples
Below is a link where you can access some examples of CSV files.
Google Drive Link : https://drive.google.com/drive/folders/1TQsQTiTiRdmbr8d-qW9hzYiPF6qktQV5?usp=sharing
