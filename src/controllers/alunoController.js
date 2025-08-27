const prisma = require("../lib/prisma");

module.exports = {
    lista: async (req, res) => {
        try {
            const alunos = await prisma.aluno.findMany();
            res.json(alunos);
        } catch (error) {
            res.status(500).json({ error: "Falha ao listar alunos" });
        }
    },

    criar: async (req, res) => {
        try {
            const { nome, email, idade } = req.body;

            if (!nome || !email || !idade) {
                return res.status(400).json({ error: "Campos obrigatórios: nome, email, idade" })
            }

            const emailExist = await prisma.aluno.findUnique({ where: { email } })
            if (emailExist) {
                return res.status(409).json({ error: "E-mail já cadastrado" });
            };

            const novoAluno = await prisma.aluno.create({ 
                data: { 
                    nome, 
                    email, 
                    idade: Number(idade)
                } 
            })
            res.status(201).json(novoAluno);
        } catch (e) {
            res.status(500).json({ error: "Falha ao criar aluno" });
        }
    },

    atualizar: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const { nome, email } = req.body;
            const aluno = await prisma.aluno.findUnique({ where: { id } });

            if (!Number.isInteger(id)) {
                return res.status(400).json({ error: "ID inválido" });
            }
            if (!aluno) {
                return res.status(404).json({ error: "Aluno não encontrado" });
            }
            if (email) {
                const emailDuplicado = await prisma.Aluno.findUnique({ where: { email } });
                if (emailDuplicado && emailDuplicado.id !== id) {
                    return res.status(409).json({ error: "E-mail já em uso por outro aluno" })
                }
            }

            const atualizado = await prisma.Aluno.update({
                where: { id },
                data: {
                    nome, email
                }
            });
            res.json(atualizado);

        } catch (error) {
            res.status(500).json({ error: "Falha ao atualizar aluno" });
        }
    },

    deletar: async (req, res) => {
        try {
            const id = Number(req.params.id);
            if (!Number.isInteger(id)) {
                return res.status(400).json({ error: "ID inválido" });
            };
            const aluno = await prisma.Aluno.findUnique({ where: { id } });
            if (!aluno) {
                return res.status(404).json({ error: "Aluno não encontrado" });
            }
            await prisma.Aluno.delete({ where: { id } });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: "Falha ao deletar aluno" });
        }
    }
};
