import React, { useState, useCallback } from "react";
import { TextField, Avatar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { signup } from "../api";

interface SignUpForm {
    username: string;
    nickname: string;
    password: string;
    profile_pic: string;
  }

const profileStyles = makeStyles((theme) => ({
    root : {
        display: 'flex',
    },
    profile : {
        width: theme.spacing(10),
        height: theme.spacing(10),
        color: theme.palette.getContrastText('#2575fc'),
        backgroundColor: '#2575fc',
    },
    icon : {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    button : {
        color: '#2575fc',
    }
})) 

/*
type SignFromProps = {
    onShowPicture: (signUpForm: { username: string; nickname: string; password: string; profile_pic: string }) => void;
};
*/

export default function SignUp() {
    const classes = profileStyles();

    const [signUpForm, setForm] = useState<SignUpForm>({
        username: '',
        nickname: '',
        password: '',
        profile_pic: process.env.PUBLIC_URL + '/tmp_profile_pic.png'
    });

    const { username, nickname, password, profile_pic } = signUpForm;

    console.log("signUpForm ", signUpForm);

    const changePicture = (e:any) => {
        e.preventDefault();
        const file = URL.createObjectURL(e.target.files[0]);
        if(file != null){
            setForm({
                ...signUpForm,
                profile_pic: URL.createObjectURL(e.target.files[0])
            });
        }
    };
    
    const confirmSignUp = (e:any) => {
        e.preventDefault();
        //console.log("confirmSignUp");
        //console.log("signupForm", signUpForm);
        //console.log("username", username);
        //console.log("password", password);
        
        signup(signUpForm);

        setForm({
            username: '',
            nickname: '',
            password: '',
            profile_pic: process.env.PUBLIC_URL + '/tmp_profile_pic.png'
        })
        
    }

    const changeForm = (e:any) => {
        setForm({
            ...signUpForm,
            [e.target.id]: e.target.value,
        });
        //console.log("signup form", signUpForm);
        //console.log("e.target", e.target.id);
        //console.log("name ", e.target.name);
        //console.log("value", e.target.value);
    }
    return (
        <div>
            <form onSubmit={confirmSignUp}>
                <TextField label="username" onChange={changeForm} id="username" fullWidth/>
                <TextField label="nickname" onChange={changeForm} id="nickname" fullWidth/>
                <TextField label="password" onChange={changeForm} id="password" type="password" fullWidth/>
                <div>
                    <Avatar alt="profile_pic" className={classes.profile} src={ profile_pic }>
                    </Avatar>
                    <div>
                        <input type="file" id="upload_pic" style={{ display: "none" }} onChange={changePicture}/>
                    </div>
                    <label htmlFor="upload_pic">
                        <Button variant="outlined" className={classes.button} component="span">Select Picture</Button>
                    </label>
                </div>
                <Button type="submit" variant="outlined" className={classes.button}>Sign Up</Button>
            </form>
        </div>
    );
}


