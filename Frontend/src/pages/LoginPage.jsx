// src/pages/Signup.jsx
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import { useAuthStore } from "../store/useAuthStore";

const LoginPage = () => {
    const { login } = useAuthStore()

    const emailRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        const data = {
            email,
            password
        }
        login(data)



    };





    return (
        <>


            <div className="min-h-screen w-full  flex justify-center items-center ">

                <div className="flex flex-col justify-center items-center min-h-screen bg-base-100 w-1/2">
                    <div className=" bg-base-300 min-h-[450px] w-6/12 p-[28px] flex flex-col justify-evenly pb-[35px]  items-center rounded-box border-0   ">

                        <h1 className="textarea-xl text-base-content">Login</h1>

                        <div className="  w-full m-[2px]  ">
                            <label className="input validator  w-full">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
                                <input type="email" placeholder="mail@site.com" required ref={emailRef} />
                            </label>
                            <div className="validator-hint hidden">Enter valid email address</div>
                        </div>
                        <div className="  w-full m-[2px] ">
                            <label className="input validato  w-full ">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
                                <input type="password" required placeholder="Password" minLength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" ref={passwordRef} />
                            </label>
                            <p className="validator-hint hidden">
                                To Easy
                            </p>

                        </div>


                        <button className=" w-full btn btn-active btn-primary m-[2px]" onClick={handleSubmit}>Continue</button>
                        <span>Dont have an Account ?  <Link to='/signup' className="text-primary hover:underline">Signup</Link></span>
                    </div>
                </div>


            </div>



        </>
    );
};

export default LoginPage;
