/**createContext → creates global state,useContext → lets components access it,useState → stores user data,
useEffect → runs code when app loads,useNavigate → redirects users,token() → gets JWT from localStorage,userClient → API calls (Axios) */

import { createContext, useContext, useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import {token, userClient} from "../clients/api.js"