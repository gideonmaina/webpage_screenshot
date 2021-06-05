const puppeteer=require("puppeteer")
const path=require("path")
const express=require("express")
const cors=require("cors")

const app=express()

app.use('/static', express.static(path.join(__dirname,"public")))
app.use(cors())
app.use(express.json())

app.post('/screenshot', async (req,res)=>{
    //set ID and Path
    const ID=(new Date().getTime().toString(36))
    const location="./public/screenshots/"+ID+".png"

    //start browser
    const browser=await puppeteer.launch({
        defaulViewPort:{
            width:1920,
            height:1080
        },
        ignoreDefaultArgs:['--disable-extensions']
    })

    //open webpage
    const page= await browser.newPage()
    await page.goto(req.body.url)

    //take screenshot
    await page.screenshot({path:location})
    
    await browser.close()

    res.json({
        success:true,
        ID

    })

})
const PORT=process.env.PORT||5000

app.listen(PORT,()=>console.log("Listening on port ",PORT))