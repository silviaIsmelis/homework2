import {User} from "../models/User.js";
//import { ADMIN_EMAIL, ADMIN_USERNAME, ADMIN_PASSWORD } from "../config.js";
import mongoose from 'mongoose'
import express from "express";

const {Schema, model} = mongoose;

export const createAdmin = async () => {
  //? CHEQUEAR QUE EL USUARIO ES ADMIN
  const userFound = await User.findOne({ email: "admintea@localhost.com"  });
  //console.log(userFound);
  if (userFound) return;

  // create a new admin user
  const newUser = await User.create({
    username: "admintea",
    name: "Admin TEA",
    email: "admintea@localhost.com",
    password: "admintea",
    phone: "",
    address: "",
    relationship: "",
    admin: true,
    active: true
  });

  //console.log(newUser);
};
//

createAdmin();