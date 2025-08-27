require("dotenv").config();
const express = require("express");
const app = express();

app.use( express.json() );
app.use( express.urlencoded({ extended: true }));

app.use("/alunos", require("./routes/alunoRouters"));
app.use("/professores", require("./routes/professorRouters"));




app.get("/", (_,res) => {
    res.json({ status: "ok", service: "cadastro-alunos"});
})



const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on http://localhost:${port}`))
