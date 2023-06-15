const pool = require("../database/index")
const chickenController = {

    // Api qui affiche tous les chickens qui sont dans la base de donnée

    chickenAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select * from chicken")
            res.json({
                data: rows
            })
        } catch (error) {

            res.json({

                status: "error"
            })
        }
    },

    // Api qui affiche les informations d'un chicken qui existe en fonction de son Id

    chickenById: async (req, res) => {

        try {

            const chickenId = req.params.id
            const [rows, fields] = await pool.query("select * from chicken WHERE id = ?", chickenId)
            if (rows[0]) {
                res.json({
                    data: rows
                })
            } else {
                res.json({
                    data: "Ce chicken n'existe pas !!"
                })
            }

        } catch (error) {
            res.json({

                status: "error"
            })
        }
    },

    // Api de création d'un chicken

    createchicken: async (req, res) => {

        try {
            const {name, birthday, weight, steps, isRunning} = req.body

            if (!name || !weight) {
                res.json({

                    message: "Les champs name et weight sont à remplir obligatoirement"
                })
            } else {
                const sql = "INSERT INTO chicken (name, birthday, weight, steps, isRunning) VALUES (?, ?, ?, ?, ?)"
                const [rows, fields] = await pool.query(sql, [name, birthday, weight, steps, isRunning])

                res.json({

                    message: 'Chicken created successfully'
                })
            }
        } catch (e) {
            res.json({

                status: "error"
            })
        }
    },

    // Api qui met à jour les informations d'un chicken

    updatechicken: async (req, res) => {

        try {
            const {name, birthday, weight, steps, isRunning} = req.body
            const chickenId = req.params.id
            const sql = "UPDATE chicken SET name = ?, birthday = ?, weight = ?, steps = ?, isRunning = ? WHERE id = ? "
            const [rows, fields] = await pool.query(sql, [name, birthday, weight, steps, isRunning, chickenId])

            res.json({

                message: 'Chicken updated successfully'
            })

        } catch (e) {
            res.json({

                status: "error"
            })
        }
    },

    // Api qui supprime  un chicken

    deletechicken: async (req, res) => {

        try {
            const chickenId = req.params.id
            const [rows, fields] = await pool.query("DELETE FROM chicken WHERE id = ?", chickenId)
            res.json({
                message: 'Chicken deleted successfully'
            })
        } catch (error) {
            res.json({

                status: "error"
            })
        }
    },

    // Api qui met à jour  partiellement les informations d'un chicken

    patchhicken: async (req, res) => {

        try {
            const {name, weight, steps, isRunning} = req.body
            const chickenId = req.params.id
            const sql = "UPDATE chicken SET name = ?,  weight = ?, steps = ?, isRunning = ? WHERE id = ? "
            const [rows, fields] = await pool.query(sql, [name, weight, steps, isRunning, chickenId])

            res.json({

                message: 'Chicken updated successfully'
            })

        } catch (e) {
            res.json({

                status: "error"
            })
        }
    },

    // Api qui augmenter la variable steps de 1
    runhicken: async (req, res) => {

        try {

            const chickenId = req.params.id
            const sql = "SELECT steps FROM chicken WHERE id = ? "
            const [rows, fields] = await pool.query(sql, chickenId)

            // permet de recupere la valeur actuelle de steps
            const currentsteps = rows[0].steps;

            // augmente la valeur de steps de 1
            const newsteps = currentsteps + 1;

            pool.query("UPDATE chicken SET  steps = ? WHERE id = ?", [newsteps, chickenId])

            res.json({

                message: "Steps incremented successfully"
            })

        } catch (e) {
            res.json({

                status: "error"
            })
        }
    },

    // Api qui lié un chicken à un farmyard

    chicenfarmyard: async (req, res) =>{

        try
        {
            const chickenId = req.params.chickenid
            const farmyardId = req.params.farmyardid

            const sql= "UPDATE chicken SET farmyard_id = ? WHERE id = ?"
            const [rows , fields] = await pool.query(sql , [farmyardId, chickenId])

            res.json({

                message: 'Liaison effectué'
            })

        }catch (e) {
            res.json({

                status: "error"
            })
        }





    }

}

module.exports = chickenController