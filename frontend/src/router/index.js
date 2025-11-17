import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'contactbook',
        component: () => import('../views/ContactBook.vue')
    },
    {
        path: '/contacts/add',
        name: 'contact.add',
        component: () => import('../views/ContactForm.vue')
    },
    {
        path: '/contacts/:id',
        name: 'contact.edit',
        component: () => import('../views/ContactEdit.vue'),
        props: true
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("../views/NotFound.vue")
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;

