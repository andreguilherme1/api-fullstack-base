const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const sqlite3 = require("sqlite3").verbose();
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const secret = require("./secret");
const cors = require("cors");

const app = express();
// Configuração do body-parser (usando body-parser)
app.use(bodyParser.json());
// Configurando o CORS
const corsOptions = {
  origin: '*', // Origem do seu frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

// Configuração da sessão (usando express-session)
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
);

// Configuração do rate limiting para proteção contra ataques de força bruta
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 tentativas máximas por IP
});

app.use("/login", limiter);

// Instancia do BANCO SQLITE
const db = new sqlite3.Database("./db/database.db");


// Criação e atualização das entidades
const userModel = require("./models/userModel");
const cursoModel = require("./models/cursoModel");
userModel.createTableUser(db);
cursoModel.createTableCurso(db);


// Criação dos controllers e da aplicação
const authController = require("./controllers/authController");
const userController = require("./controllers/userController");
const cursoController = require("./controllers/cursoController");


// Iniciando o DB nos controllers
authController.initDB(db);
userController.initDB(db);
cursoController.initDB(db);


// Rotas da aplicação
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var cursosRouter = require("./routes/cursos");

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/cursos", cursosRouter);

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = { app, db };
