const express = require('express');
const app=express();
const fs =require('fs');
const path =require('path');
const port = process.env.port || 3000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('views'))
const tempData=path.join(__dirname,'data','data.json');
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, './views/index.html'));
});

app.post('/submit',(req, res)=>{
    const {name, email, mob, dob, password}=req.body;

    if(!name || !email || !mob || !dob || !password){
        res.status(400).send("Please fill all required fields!!!");
    }
    const data={name, email, mob, dob, password};

    fs.readFile(tempData,'utf-8',(err, file_data)=>{
        if(err){
            console.log(err);
            return res.status(500).json({error : "Server error!!!"});
        }

        let temp_data=[];
        if(file_data){
            temp_data=JSON.parse(file_data);
        }
        temp_data.push(data);

        fs.writeFile(tempData,JSON.stringify(temp_data,null,2), (err)=>{
            if(err){
                console.log(err);
                return res.status(500).json({error : "Server error!!!"})
            }
            res.status(200).json({message : 'Form submitted and data stored in temporary server-side storage:)'});
        });
    });
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});