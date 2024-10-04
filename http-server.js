
import http from "http"
import fs from "fs"
import { v4 as uuidv4 } from "uuid"

let htmlData = fs.readFileSync("index.html", "utf-8")
let jsonData = fs.readFileSync("index.json", "utf-8")

function httpServer() {
    try {
        const server = http.createServer((req, res) => {

            if (req.url === "/") {
                res.writeHead(200, { "Content-Type": "text/plain" })
                res.end("Home Page")
            }
            else if (req.url === "/html") {
                res.writeHead(200, { "Content-Type": "text/html" })
                res.end(htmlData)
            }
            else if (req.url === "/api") {
                res.writeHead(200, { "Content-Type": "application/json" })
                res.end(jsonData)
            }
            else if (req.url === "/uuid") {
                res.writeHead(200, { "Content-Type": "application/json" })
                res.end(JSON.stringify({ uuid: uuidv4() }, null, 2))
            }
            else if (req.url.startsWith("/status/")) {
                let num = (req.url).split("/")[2]
                if (num > 0) {
                    res.writeHead(200, { "Content-Type": "text/plain" })
                    res.end(`The response of your request is ${num}`)
                }
            }
            else if (req.url.startsWith("/delay/")) {
                let num = req.url.split("/")[2]
                if (num > 0) {
                    setTimeout(() => {
                        res.writeHead(200, { "Content-Type": "text/plain" })
                        res.end(`After ${num} seconds server has responded`)
                    }, num * 1000)
                }
            }
            else {
                res.writeHead(200, { "Content-type": "text/plain" })
                res.end("Sorry couldn't find any valid request")
            }
        });

        let port = 3000;
        server.listen(port, () => {
            console.log(`Server running on ${port}`)
        })
    }
    catch (err) {
        console.log(err)
    }
}

httpServer()