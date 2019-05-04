const mariadb = require('mariadb');
const { spawn } = require('child_process');
const retry = require('async/retry');
const path = require('path');

const connectTimeout = 10 * 1000; // 10 sec;

const retryConfig = {
    times: 30,
    interval: 1000
};

let count = 0;

const pool = mariadb.createPool({
    host: 'local.thelarsson.com',
    user: 'exampleuser',
    password: 'examplepass',
    connectionLimit: 5,
    connectTimeout
});

const cwd = path.join(__dirname, 'site');

retry(retryConfig, tryDbConnect, function(err, conn) {
    if (err) {
        console.log("Tried too many times, can't connect to MariaDb.", err);
        process.exit();
    } else {
        console.log('Connection to MariaDb established. Launching frontend.');
        const frontend = spawn(
            'gatsby',
            ['develop', '-H', '0.0.0.0', '-p', '80'],
            {
                cwd
            }
        );

        frontend.stdout.on('data', data => {
            console.log(`${data}`);
        });

        frontend.stderr.on('data', data => {
            console.log(`${data}`);
        });

        frontend.on('close', code => {
            console.log(`frontend exited with code ${code}`);
        });
    }
});

function tryDbConnect(callback) {
    console.log(
        `[${count++}/${retryConfig.times}] Trying to connect to MariaDb.`
    );

    pool.getConnection()
        .then(conn => callback(null, conn))
        .catch(err => callback(err));
}
