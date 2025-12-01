import { log } from 'console';
import http from 'http'
import { hello } from './hello.js';
import moment from 'moment/moment.js';
import { url } from 'inspector';

// const server = http.createServer((req, res) => {
//     res.statusCode = 200
//     res.setHeader('Content-Type', 'text/plain')
//     res.write(moment().calendar())
//     res.end()
// })

// const server = http.createServer((req, res) => {
//     res.statusCode = 200
//     res.setHeader('Content-Type', 'application/json')
//     res.write(JSON.stringify({
//         status: 'succes',
//         data: {
//             message: hello,
//             time: moment().calendar()
//         }
//     }))
//     res.end()
// })

const server = http.createServer((req, res) => {
    const url = req.url
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    switch (url) {
        case '/ucup':
            res.write('Hello Ucup')
            break;
        case '/otong':
            res.write('Hello otong')
            break;
        case '/zidan':
            res.write('Hello Zidan')
        case '/dunia':
            res.write('Hello World')
            break;
        case '/time':
            res.write('waktu adalah uang')
            break;
        case '/kota':
            res.write('Yogyakarta')
            break;
        case '/pecel':
            res.write('Pecel enak')
            break;
        case '/ayam':
            res.write('Ayam Bakar')
            break;
        case '/mie':
            res.write('Mie ayam')
            break;
        case '/kahfi':
            res.write('kahfi elek')
            break;
        default:
            res.write('page not found')
            break;
    }
    res.end()
})

const hostname = '127.0.0.1'
const port = 3000
server.listen(port, hostname, () => {
    console.log(`Server running at ${hostname}:${port}`)
}) 