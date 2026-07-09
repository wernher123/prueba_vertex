import {getConnection, sql} from '../database/connection.js'
import querys from '../database/querys.js'

export const getItems = async (req, res) => {
    try {
        const pool = await getConnection()
        const result = await pool
            .request()
            .query(querys.getItems)

        if (result.recordset[0] === undefined) {
            res.json({message:"no se encontró data"}) 
        } else {
            res.json(result.recordset);
        }
    } catch (error) {
        res.send(error.message)
    }
}