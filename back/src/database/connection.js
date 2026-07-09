import sql from 'mssql'

const dbSettings = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    database: process.env.DATABASE,
    options:{
        encrypt: true,
        trustServerCertificate: true
    }
}

//conexion a la BD
export async function getConnection(){
    try {
        const pool = await sql.connect(dbSettings)
        return pool
    } catch (error) {
        console.log(error)
    }
}

export {sql}