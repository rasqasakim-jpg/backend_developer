import { log } from 'console';
import http from 'http'
import { hello } from './hello.js';
import moment from 'moment';
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
    let response = {}
    switch (url) {
        case '/ucup':
            response = {
                status: 'success',
                data: 'Hello Ucup'
            }
            break
        case '/otong':
            response = {
                status: 'success',
                data: 'Hello Otong'
            }
            break
        case '/zidan':
            response = {
                status: 'success',
                data: 'Hello Zidan'
            }
            break
        case '/dunia':
            response = {
                status: 'success',
                data: 'Hello World'
            }
            break
        case '/time':
            response = {
                status: 'success',
                data: 'waktu adalah uang'
            }
            break
        case '/kota':
            response = {
                status: 'success',
                data: 'Yogyakarta'
            }
            break
        case '/pecel':
            response = {
                status: 'success',
                data: 'Pecel enak'
            }
            break
        case '/ayam':
            response = {
                status: 'success',
                data: 'Ayam Bakar'
            }
            break
        case '/mie':
            response = {
                status: 'success',
                data: 'Mie Ayam'
            }
            break
        case '/kahfi':
            response = {
                status: 'success',
                data: 'kahfi elek'
            }
            break
        default:
            response = {
                status: 'error',
                message: 'Page not found'
            }
            break
    }
    res.end(JSON.stringify(response))
})

const hostname = '127.0.0.1'
const port = 3000
server.listen(port, hostname, () => {
    console.log(`Server running at ${hostname}:${port}`)
})
