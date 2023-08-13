import app from './app'
import { startDatabase } from './database/database';

const PORT = Number(process.env.PORT) || 3000;

const MsgServer = `Server running on http://localhost:${PORT}`;

app.listen(PORT, async() => {
    await startDatabase() 
    console.log(MsgServer)
});
