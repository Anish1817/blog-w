import express from "express"

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}))
let posts = [];
app.get("/",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.get("/create",(req,res)=>{
    res.render("blogs.ejs");
})

app.post("/create",(req,res)=>{
    const title = req.body.title;
    const content = req.body.content;
    if (!title || !content) {
        return res.status(400).render("error.ejs");
    }
    posts.push({
        id:Date.now(),
        title,
        content,
    });
    res.redirect("/");
})

app.get("/edit/:id",(req,res)=>{
    const id = Number(req.params.id);
    const post = posts.find(post=>post.id === id);

    if (!post) {
        return res.status(404).render("error.ejs");
    }

    res.render("edit.ejs",{post});
})

app.post("/edit/:id", (req, res) => {

    const id = Number(req.params.id);

    const post = posts.find(post => post.id === id);
    if (!post) {
        return res.status(404).render("error.ejs");
    }
    post.title = req.body.title;
    post.content = req.body.content;

    res.redirect("/");
});

app.post("/delete/:id", (req, res) => {

    const id = Number(req.params.id);

    posts = posts.filter(post => post.id !== id);

    res.redirect("/");
});

app.listen(port,()=>{
    console.log(`server running on ${port}`);
})