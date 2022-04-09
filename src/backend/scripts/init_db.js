const { client } = require('./connection');

function init(client) {
    return client.query(`
        CREATE TABLE hook (
            hook_id SERIAL PRIMARY KEY,
            hook_name TEXT NOT NULL,
            hook_url TEXT NOT NULL
        );
        
        CREATE TABLE flux (
            flux_id SERIAL PRIMARY KEY,
            flux_name TEXT NOT NULL,
            flux_url TEXT NOT NULL
        );
        
        CREATE TABLE article (
            article_id SERIAL PRIMARY KEY,
            article_title TEXT NOT NULL,
            article_date TEXT NOT NULL,
            article_description text null
        );
        
        CREATE TABLE hang (
            hook_id SERIAL,
            flux_id SERIAL,
            CONSTRAINT pk_hang PRIMARY KEY (hook_id,flux_id),
            CONSTRAINT fk_hook FOREIGN KEY (hook_id) REFERENCES hook,
            CONSTRAINT fk_flux FOREIGN KEY (flux_id) REFERENCES flux
        );
        
        CREATE TABLE history (
            article_id SERIAL,
            flux_id SERIAL,
            history_date TEXT NOT NULL,
            CONSTRAINT pk_history PRIMARY KEY (article_id, flux_id),
            CONSTRAINT fk_article FOREIGN KEY (article_id) REFERENCES article,
            CONSTRAINT fk_flux FOREIGN KEY (flux_id) REFERENCES flux
        );`)
}

let main = async () =>  {
    try {
        const res = await init(client);
        console.log(res);
    } catch (error) {
        console.log(error);
    }
    
    client.end();
}

main();