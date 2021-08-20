//layout 
import LayoutAdmin from '../layout/LayoutAdmin';
import LayoutBasic from '../layout/LayoutBasic';
//Admin pages
import AdminHome from '../pages/admin';//por el default le da "igual " el nombre
import AdminSignIn from '../pages/admin/singIn';
import User from '../pages/admin/users';
import AdminMenuWeb from '../pages/admin/menuWeb';
import AdminBlog from '../pages/admin/blog';
import ContactAdmin from '../pages/admin/contactAdmin';
import AdminServices from '../pages/admin/AdminServices';
import AdminBook from '../pages/admin/AdminBook';

//Otros
import Error404 from '../pages/Error404';

//Basic Pages
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import Blog from '../pages/Blog';
import AboutUs from '../pages/About-us';
import Services from '../pages/Services';
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
    {
        path: "/admin/blog",
        component: AdminBlog,
        exact: true
    },{
        path: "/admin/contact",
        component: ContactAdmin,
        exact: true
    },{
        path: "/admin/services",
        component: AdminServices,
        exact: true
    },{
        path: "/admin/book",
        component: AdminBook,
        exact: true
    },
    {
        component: Error404//si no encuentra se va a Error
    }]
},
{
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
        path : '/blog',
        component: Blog,
        exact: true
    },
    {
        path : '/blog/:url',
        component: Blog,
        exact: true
    },{
        path: '/about-us',
        component: AboutUs,
        exact: true
    },{
        path: '/services',
        component: Services,
        exact: true
    },
    {
        component: Error404
    },]
},
];

export default routes;
