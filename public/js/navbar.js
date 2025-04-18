// import {loadedmd} from "./tutorial.js";
//
// const
//     sidebar = $(".nav-area"),
//     modeSwitch = $(".sun-moon"),
//     modeIcon = $(".mode .sun-moon i"),
//     content = $(".container");
//
// $(document).ready(function () {
//     if (localStorage.getItem('mode') === 'dark') {
//         sidebar.toggleClass("light");
//         content.toggleClass("light");
//         $("body").toggleClass("light");
//         setTheme();
//         modeIcon.removeClass("bx-moon").addClass("bx-sun");
//     }
//
//     modeSwitch.click(function () {
//         sidebar.toggleClass("light");
//         content.toggleClass("light");
//         $("body").toggleClass("light");
//         if (sidebar.hasClass("light")) {
//             modeIcon.removeClass("bx-moon").addClass("bx-sun");
//             setTheme();
//             localStorage.setItem('mode', 'dark');
//         } else {
//             modeIcon.removeClass("bx-sun").addClass("bx-moon");
//             setTheme();
//             localStorage.setItem('mode', 'light');
//         }
//     });
//
//     function setTheme() {
//         loadedmd().then((result) => {
//             if (result === true) {
//                 const markdownBody =$($('zero-md')[0]).find('.markdown-body');
//                 const theme = sidebar.hasClass("light") ? 'light' : 'dark';
//                 markdownBody.attr('data-theme', theme);
//             }
//         });
//     }
//
// });
//
//
