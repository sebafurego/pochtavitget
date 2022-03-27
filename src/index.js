import React,{useState} from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";

// Init VK  Mini App
bridge.send("VKWebAppInit");

const script = document.createElement("script");

script.src = "https://widget.pochta.ru/map/widget/widget.js";
script.async = true;

document.body.appendChild(script);
setTimeout(()=>{
  ReactDOM.render(<App />, document.getElementById("root"));
},1000)
if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}
