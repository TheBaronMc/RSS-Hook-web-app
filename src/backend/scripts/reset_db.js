const { client } = require('./connection');

function reset(client) {
    return client.query(`
    drop table history;
    drop table hang;
    drop table article;
    drop table flux;
    drop table hook;`)
}

let main = async () =>  {
    try {
        const res = await reset(client);
        console.log(res);
    } catch (error) {
        console.log(error);
    }
    
    client.end();
}

main();