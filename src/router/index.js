import Vue from "vue";

import store from "../store/index";

import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

// function requireAuth(to, from, next) {
//   if (store.state.authentication.token) next();
//   else next("/login");
// }

function dynamicHome(to, from, next) {
    if (store.state.authentication.token) next("/dashboard");
    else next();
}

function logout(to, from, next) {
    if (store.state.authentication.token) store.dispatch("authentication/logout");
    next("/login");
}

const routes = [{
        path: "/",
        name: "home",
        component: Home,
        beforeEnter: dynamicHome
    },
    {
        path: "/contact-us",
        name: "Contact Us",
        component: () =>
            import ( /* webpackChunkName: "contact-us" */ "../views/ContactUs.vue")
    },
    {
        path: "/about",
        name: "About",
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/About.vue")
    },
    {
        // catch all 404
        path: "*",
        component: () =>
            import ("../views/NotFound.vue")
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

router.beforeResolve((to, from, next) => {
    if (to.name) store.set("loading", true);

    next();
});

router.afterEach(() => {
    store.set("loading", false);
});

export default router;