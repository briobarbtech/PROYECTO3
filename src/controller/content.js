import content from "../models/content.js";


var controller = {
    getCatalogue: async (req, res) => {
        try {
            const where = {}
            if (req.query.name) where.title = req.query.name
            if (req.query.genre) where.genreName = req.query.genre
            if (req.query.category) where.categoryName = req.query.category


            const catalogue = await content.movie.findAll({ where: where });

            res.status(200).send({ message: "Ok!", content: catalogue })
        } catch (err) {
            res.status(400).send({ message: "Error!", content: err.message })
        }
    },
    getCatalogueById: async (req, res) => {
        try {
            const { id } = req.params;
            const catalogue = await content.movie.findByPk(id);

            res.status(200).send({ message: "Ok!", content: catalogue })
        } catch (err) {
            res.status(400).send({ message: "Error!", content: err.message })
        }
    },
    postCatalogue: async (req, res) => {
        try {
            const { title, summary, season, categoryID } = req.body

            if (!title || !summary || !season || !categoryID) throw new Error('Data is missing')
            await content.movie.create({ title, summary, season, categoryID }).then((newCatalogue) => {
                return res.status(201).send({ message: 'Created!', content: newCatalogue })
            }).catch(e => {
                console.log(e.message)
                return res.status(400).send({ message: 'Something went wrong' })

            })
        } catch (err) {
            console.log(err.message)
            return res.status(400).send({ message: 'Something went wrong', content: err.message })

        }
    },
    updateCatalogue: async (req, res) => {
        try {
            const { title, summary, season, categoryID } = req.body
            const { id } = req.params
            if (!id) throw new Error('Id is undefined')
            if (title || summary || season || categoryID) {
                const catalogueUpdated = {}
                if (title) catalogueUpdated.title = title
                if (summary) catalogueUpdated.summary = summary
                if (season) catalogueUpdated.season = season
                if (categoryID) catalogueUpdated.categoryID = categoryID

                await content.movie.update(catalogueUpdated, { where: { movieID: Number(id) } }).then(() => {
                    return res.status(204).send({ message: 'Updated!' })
                }).catch(e => {
                    console.log(e.message)
                    return res.status(400).send({ message: 'Something went wrong' })

                })
            } else {
                throw new Error('Data is missing')
            }
        } catch (err) {
            console.log(err.message)
            return res.status(400).send({ message: 'Something went wrong', content: err.message })

        }
    },
    deleteCatalogue: async (req, res) => {
        const { id } = req.params
        if (!id) throw new Error('Id is undefined')
        try {
            await content.movie.destroy({
                where: {
                    movieID: id
                }
            }).then(() => res.status(200).send({ message: 'Deleted!' })).catch(e => res.status(400).send({
                message: 'Something went wrong',
                content: e.message
            }))
        } catch (err) {
            console.log(err.message)
            return res.status(400).send({
                message: "Something went wrong",
                content: err.message
            })
        }
    },
    getCategory: async (req, res) => {
        try {
            const categoryName = req.query.categoryName
            await content.category.findOne({ where: { categoryName: categoryName } }).then((category) => {
                res.status(200).send({ message: 'Ok!', content: category })
            }).catch(e => {
                return res.status(400).send({ message: "Not found:", content: e.message })
            })

        } catch (err) {
            console.log(err.message)
        }
    }
}

export default controller;