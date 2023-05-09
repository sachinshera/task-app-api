import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { TaskRoute } from './routes/task.routes';
ValidateEnv();

const app = new App([new AuthRoute(), new UserRoute(), new TaskRoute()]);

app.listen();
