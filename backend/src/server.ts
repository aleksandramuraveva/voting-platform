import config from './config/index';

import app from './app';

const PORT = config.app.port;
app.listen(PORT, () => console.log(`Server is running here: ${PORT}`));
