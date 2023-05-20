const http = require('http')
const fs = require('fs')
const qs =require('qs')
let port =8080

let server = http.createServer( (req, res)=> {
    if(req.method==='GET'){
        fs.readFile('./view/form.html',"utf-8",(err, data)=>{
            if(err){
                console.log(err.message)
            }
            res.writeHead(200,{'Content-Type': 'text/html'})
            res.write(data)
            res.end()
        })
    }else {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end',()=>{
            let id=qs.parse(data).id
            let name=qs.parse(data).name
            let price=qs.parse(data).price
            let  dataToWrite={id,name,price}
            fs.readFile('./data/product.json',"utf-8",(err, data)=>{
                let dataFile=JSON.parse(data)
                dataFile.push(dataToWrite)
                fs.writeFile('./data/product.json',JSON.stringify(dataFile),err=>{
                    if(err){
                        console.log(err.message)
                        return ;
                    }
                    return res.end(`add success`)
                })
            })
        })
        req.on('error', () => {
            console.log('error')
        })
    }

})

server.listen(port, function (){
    console.log('Serve running port'+port)
})