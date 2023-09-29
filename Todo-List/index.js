import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var workList= new Array();
var completed =new Array();
var taskList = new Array();
var taskCompleted = new Array();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    res.render("index.ejs", {
        tl : taskList,
        tcompleted: taskCompleted,
    });
});

app.get("/work",(req,res)=>{
    res.render("work.ejs", {
        wl : workList,
        completed: completed,
    });
});

app.get("/task",(req,res)=>{
    res.redirect("/");
});

app.post("/submitWork", (req, res) => {
    var new_work = req.body["task"];
    if(new_work.length>0 && !workList.includes(new_work)){
        workList.push(new_work);
        completed.push("");
        res.render("work.ejs", {
            wl : workList,
            completed: completed,
        });
    }
    else{
        res.redirect("/work")
    }
});

app.post("/submitTask", (req, res) => {
    var new_task = req.body["task"];
    if(new_task.length>0 && !taskList.includes(new_task)){
        taskList.push(new_task);
        taskCompleted.push("");
        res.render("index.ejs", {
            tl : taskList,
            tcompleted: taskCompleted,
        });
    }
    else{
        res.redirect("/")
    }
});

app.post("/removeWork",(req,res)=>{
    var id = parseInt(req.body["rem"]) - 1;
    workList.splice(id,1);
    res.redirect("/work");
});

app.post("/removeTask",(req,res)=>{
    var tid = parseInt(req.body["trem"]) - 1;
    taskList.splice(tid,1);
    res.redirect("/");
});


app.post("/doneWork",(req,res)=>{
    var id = parseInt(req.body["tick"]) - 1;
    completed[id] = "strike";
    res.redirect("/work");
});

app.post("/doneTask",(req,res)=>{
    var tid = parseInt(req.body["ttick"]) - 1;
    taskCompleted[tid] = "strike";
    res.redirect("/");
});

app.post("/undoWork",(req,res)=>{
    var id = parseInt(req.body["undo"]) - 1;
    completed[id] = "none";
    res.redirect("/work");
});

app.post("/undoTask",(req,res)=>{
    var tid = parseInt(req.body["tundo"]) - 1;
    taskCompleted[tid] = "none";
    res.redirect("/");
});

app.listen(port,()=>{
    console.log("Server is running at port: "+port);
});

