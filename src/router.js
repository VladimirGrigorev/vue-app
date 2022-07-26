import Vue from "vue";
import VueRouter from "vue-router";
import MainPage from "@/pages/MainPage";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/contractors',
        component: () => import('./pages/ContractorListPage')
    }
]

export default new VueRouter({
    mode: 'history',
    routes
})