import { query } from "express";
import content from "../models/relations.js";
import { Op } from "sequelize";

var controller = {
    getCatalogue: async (req, res) => {
        try {
            const where = {}
            if (req.query.name) where.title = {
                [Op.like]: `%${req.query.name}%`
            }
            //if (req.query.genre) where.genreName = req.query.genre
            if (req.query.category) where.categoryID = req.query.category
            await content.Movie.findAll({ where: where, include: [content.Category, content.Genre, content.Actor, content.Poster] }).then((catalogue) => {
                catalogue.forEach(content => {
                   content['Posters'][0]['link']= 'http://'+process.env.HOST+process.env.PORT+content['Posters'][0]['link']
        
                });
                if (!req.query.genre) return res.status(200).send({ message: 'Ok!', content: catalogue })
                var response = []
                catalogue.forEach(content => {
                    content['Genres'].forEach(genres => {
                        //console.log(genres['ID'])
                        if (genres['ID'] == Number(req.query.genre)) response.push(content)
                    })
                });

                res.status(200).send({ message: "Ok!", content: response })
            }).catch(e => {
                return res.status(400).send({ message: 'Something went wrong', content: e.message })
            });

        } catch (err) {
            res.status(400).send({ message: "Error!", content: err.message })
        }
    },
    getCatalogueById: async (req, res) => {
        try {
            const { id } = req.params;
            if(!Number.isInteger(Number(id))) return res.status(400).send({message: 'Error: ID must be a number'})
            await content.Movie.findByPk(id).then((catalogue) => {
                if (!catalogue) return res.status(404).send({ message: 'Not Found'})
                res.status(200).send({ message: "Ok!", content: catalogue })
            }).catch(e => {
                res.status(500).send({ message: 'Something went wrong' })
            });

        } catch (err) {
            res.status(500).send({ message: "Error!", content: err.message })
        }
    },
    postCatalogue: async (req, res) => {
        try {
            const { title, summary, season, categoryID } = req.body
            if (!title || !summary || !season || !categoryID) throw new Error('Data is missing')
            await content.Movie.create({ title, summary, season, categoryID }).then((newCatalogue) => {
                return res.status(201).send({ message: 'Created!', content: newCatalogue })
            }).catch(e => {
                return res.status(400).send({ message: 'Something went wrong', content: e.message })

            })
        } catch (err) {
            console.log(err.message)
            return res.status(500).send({ message: 'Something went wrong', content: err.message })

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

                await content.Movie.update(catalogueUpdated, { where: { movieID: Number(id) } }).then(() => {
                    return res.status(204).send({ message: 'Updated!' })
                }).catch(e => {
                    console.log(e.message)
                    return res.status(500).send({ message: 'Something went wrong' })

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
            await content.Movie.destroy({ where: { movieID: id } })
                .then(() => res.status(200).send({ message: 'Deleted!' }))
                .catch(e => res.status(400).send({
                    message: 'Something went wrong',
                    content: e.message
                }))
        } catch (err) {
            res.status(500).send({
                message: "Something went wrong",
                content: err.message
            })
        }
    },
    getCategory: async (req, res) => {
        try {


            await content.Category.findAll().then((category) => {
                res.status(200).send({ message: 'Ok!', content: category })
            }).catch(e => {
                return res.status(400).send({ message: "Not found:", content: e.message })
            })

        } catch (err) {
            return res.status(400).send({ message: 'Something went wrong', content: err.message })
        }
    }
}

export default controller;