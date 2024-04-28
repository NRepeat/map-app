import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as session from "express-session";
import * as passport from "passport";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    allowedHeaders: ["content-type,Authorization"],
    origin: "*",
    credentials: true,
    methods: "GET,POST",
    optionsSuccessStatus: 200,
  });

  app.setGlobalPrefix("/api");
  app.use(
    session({
      secret: "asdasdasdasd",
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000,
      },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  const config = new DocumentBuilder()
    .setTitle("NestJs API Documentation")
    .setDescription("Backend API for the NestJs application.")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}
bootstrap();
