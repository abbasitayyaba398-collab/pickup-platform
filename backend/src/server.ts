import { app } from "./app.js";
import { connectDatabase } from "./config/database.js";
import { env } from "./config/env.js";
import { seedAdmin } from "./modules/admin/admin.seed.js";

async function bootstrap() {
  try {
    await connectDatabase();

    await seedAdmin();

    app.listen(env.port, () => {
      console.log(
        `🚀 API running on http://localhost:${env.port}`
      );
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error);

    process.exit(1);
  }
}

bootstrap();