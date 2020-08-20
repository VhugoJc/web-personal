//layout 
import LayoutAdmin from '../layout/LayoutAdmin';
import LayoutBasic from '../layout/LayoutBasic';
//Admin pages
import AdminHome from '../pages/admin';//por el default le da "igual " el nombre
import AdminSignIn from '../pages/admin/singIn';
import User from '../pages/admin/users';
import AdminMenuWeb from '../pages/admin/menuWeb';
//Otros
import Error404 from '../pages/error404';
//Basic Pages
import Home from '../pages/Home';
import Contact from '../pages/Contact';

const routes = [
    {
    path: "/admin",//Admin
    component: LayoutAdmin,


    exact:false,
    // eslint-disable-next-line
    routes:[
        {
        path: "/admin",
        component: AdminHome,
        exact: true
    },
    {
        path: "/admin/login",
        component: AdminSignIn,
        exact: true
    },
    {
        path: "/admin/menu",
        component: AdminMenuWeb,
        exact: true
    },
    {
        path: "/admin/users",
        component: User,
        exact: true
    },
    ,
    {
        component: Error404//si no encuentra se va a Error
    }]
},{
    path: "/",//Basic
    component: LayoutBasic,
    exact: false,
    routes: [
        {
        path: "/",
        component: Home,
        exact: true
    },
    {
        path: "/contact",
        component: Contact,
        exact: true
    },{
        component: Error404
    }]
},
];

export default routes;
