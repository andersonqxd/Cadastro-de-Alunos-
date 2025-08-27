const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    // Inserindo alunos
    await prisma.aluno.createMany({
        data: [
            { nome: "João Silva", email: "joao.silva@alu.ufc.br", idade: 20 },
            { nome: "Maria Oliveira", email: "maria.oliveira@alu.ufc.br", idade: 22 },
            { nome: "Carlos Souza", email: "carlos.souza@alu.ufc.br", idade: 21 },
            { nome: "Ana Bezerra", email: "ana.bezerra@alu.ufc.br", idade: 19 },
            { nome: "Rafael Lima", email: "rafael.lima@alu.ufc.br", idade: 23 },
            { nome: "Juliana Costa", email: "juliana.costa@alu.ufc.br", idade: 20 },
            { nome: "Pedro Mendes", email: "pedro.mendes@alu.ufc.br", idade: 24 },
            { nome: "Larissa Gomes", email: "larissa.gomes@alu.ufc.br", idade: 22 },
            { nome: "Felipe Araújo", email: "felipe.araujo@alu.ufc.br", idade: 21 },
            { nome: "Camila Rocha", email: "camila.rocha@alu.ufc.br", idade: 19 },
        ],
        skipDuplicates: true,
    });

    // Inserindo professores
    await prisma.professor.createMany({
        data: [
            { nome: "Fernanda Lima", email: "fernanda.lima@ufc.br", idade: 40 },
            { nome: "Ricardo Gomes", email: "ricardo.gomes@ufc.br", idade: 45 },
            { nome: "Patrícia Alves", email: "patricia.alves@ufc.br", idade: 38 },
            { nome: "André Barbosa", email: "andre.barbosa@ufc.br", idade: 50 },
            { nome: "Cláudia Ferreira", email: "claudia.ferreira@ufc.br", idade: 42 },
            { nome: "Marcelo Torres", email: "marcelo.torres@ufc.br", idade: 47 },
            { nome: "Luciana Ribeiro", email: "luciana.ribeiro@ufc.br", idade: 39 },
            { nome: "Paulo Henrique", email: "paulo.henrique@ufc.br", idade: 44 },
            { nome: "Roberta Martins", email: "roberta.martins@ufc.br", idade: 41 },
            { nome: "Eduardo Nogueira", email: "eduardo.nogueira@ufc.br", idade: 48 },
        ],
        skipDuplicates: true,
    });
}

main()
    .then(() => {
        console.log("Seed executado com sucesso!");
    })
    .catch((e) => {
        console.error("Erro ao executar seed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
