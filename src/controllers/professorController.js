const prisma = require("../lib/prisma");

module.exports = {
    lista: async (req, res) => {
        try {
            const professores = await prisma.professor.findMany();
            res.json(professores);
        } catch (error) {
            res.status(500).json({ error: "Falha ao listar professors" });
        }
    },

    criar: async (req, res) => {
        try {
            const { nome, email, idade } = req.body;


            if (nome || email || idade) {
                return res.status(400).json({ error: "Campos obrigatórios: nome, email, idade" })
            }

            const emailExist = await prisma.professor.findUnique({ where: { email } })
            if (emailExist) {
                return res.status(409).json({ error: "E-mail já cadastrado" });
            };

            const novoprofessor = await prisma.professor.create({ data: { nome, email, idade: Number(idade) } })
            res.status(201).json(novoprofessor);
        } catch (error) {
            res.status(500).json({ error: "Falha ao criar professor" });
        }
    },

    atualizar: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const { nome, email } = req.body;
            const professor = await prisma.professor.findUnique({ where: { id } });

            if (!Number.isInteger(id)) {
                return res.status(400).json({ error: "ID inválido" });
            }
            if (!professor) {
                return res.status(404).json({ error: "professor não encontrado" });
            }
            if (email) {
                const emailDuplicado = await prisma.professor.findUnique({ where: { email } });
                if (emailDuplicado && emailDuplicado.id !== id) {
                    return res.status(409).json({ error: "E-mail já em uso por outro professor" })
                }
            }

            const atualizado = await prisma.professor.update({
                where: { id },
                data: {
                    nome, email
                }
            });
            res.json(atualizado);

        } catch (error) {
            res.status(500).json({ error: "Falha ao atualizar professor" });
        }
    },

    deletar: async (req, res) => {
        try {
            const id = Number(req.params.id);
            if (!Number.isInteger(id)) {
                return res.status(400).json({ error: "ID inválido" });
            };
            const professor = await prisma.professor.findUnique({ where: { id } });
            if (!professor) {
                return res.status(404).json({ error: "professor não encontrado" });
            }
            await prisma.professor.delete({ where: { id } });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: "Falha ao deletar professor" });
        }
    }
};
