import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import Login from "./login";
import App from "./app";

let elem;

// const isLoggedIn = location.pathname != "welcome";
if (location.pathname == "/welcome") {
    elem = <Welcome />;
} else if (location.pathname == "/login") {
    elem = <Login />;
}
else {
    elem = <h1>Logo</h1>;
}

ReactDOM.render(elem, document.querySelector("main"));

//
// let elem = <welcome />;
//
// if (isLoggedIn) {
//     elem = <img src="/logo.jpg" />;
// }
//
// reactDOM.render(
//     <Welcome />
//     document.querySelector("main")
// )

// import React from "react";
// import ReactDOM from "react-dom";
// import Hello from "./hello";
//
// console.log("hi!");
//
// const elem = <Hello />;
//
// ReactDOM.render(elem, document.querySelector("main"));

// function Hello({ name }) {
//     return (
//         <div
//             style={{
//                 color: "darkslategray",
//                 fontFamily: "impact"
//                 // font-size: '40px'
//             }}
//         >
//             Hello, <Greetee name={name} age={2 * 50} />!
//         </div>
//     );
// }

// function Greetee(props) {
//     console.log("props", props);
//     const greetee = props.name;
//     const elem = <span className={greetee}>{greetee}</span>;
//     return elem;
// }

//
// // this line starts our app. You pass it two things, a recat component and a route
//
// // ReactDOM.render(
// //     <HelloWorld />,
// //     document.querySelector('main')
// // );
//
// // /> is a shortcut for <></>
//
// ReactDOM.render(elem, document.querySelector("main"));
//
// const elem = <Hello name="Dalai" />;
//
// //  this is a function component, wich is afunction that returns an element, wich can also contain several elements
// // inside, but not paralel. You can also return strings, arrays, or null if you need a components that doesn't show
// // anything
// // to use classes we write className and we use single curly braces instead of double
// function Hello({ name }) {
//     return (
//         <div
//             style={{
//                 color: "tomato",
//                 fontFamily: "impact"
//             }}
//         >
//             Hello, <Greetee name={name} age={2 * 50} />!
//         </div>
//     );
// }
//
// function Greetee(props) {
//     console.log("props", props);
//     const greetee = props.name;
//     // const elem = <span ClassName={greetee}>{greetee}</span>;
//     return elem;
// }
