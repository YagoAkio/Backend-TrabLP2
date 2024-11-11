import mysql from 'mysql2/promise';

//Lembre-se, nossa aplicação neste momento estará se comunicando com outra aplicação.
//Desse modo, nossa aplicação não tem controle sobre a outra.
//O que exige uma comunicação assíncrona.
export default async function conectar(){
    
    if (global.poolConexoes){
        //retorna do pool uma conexão
        return await poolConexoes.getConnection();
    }
    else{
        global.poolConexoes = await mysql.createPool({
            "host":"132.226.245.178",
            "port":"3306",
            "database":"LP2_102215537",
            "user":"102215537",
            "password":"102215537",
            waitForConnections: true,
            connectionLimit: 20,
            maxIdle: 10, // Máximo de conexões inativas; o valor padrão é o mesmo que "connectionLimit"
            idleTimeout: 60000, // Tempo limite das conexões inativas em milissegundos; o valor padrão é "60000"
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0
        });
        return await global.poolConexoes.getConnection();
    }
}