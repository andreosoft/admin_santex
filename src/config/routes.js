const routes = [
    {
        path: '/index',
        name: 'index',
        meta: { auth: 100, title: "Главная" },
        component: () => {
            return import('@/views/index.vue')
        }
    },
    {
        path: '/catalog',
        name: 'catalog',
        meta: { auth: 100, title: "Каталог" },
        component: () => {
            return import('@/views/catalog.vue')
        }
    },
    {
        path: '/content',
        name: 'content',
        meta: { auth: 100, title: "Контент" },
        component: () => {
            return import('@/views/content.vue')
        }
    },
    {
        path: '/categories',
        name: 'categories',
        meta: { auth: 200, title: "Категории" },
        component: () => {
            return import('@/views/categories.vue')
        }
    },
    {
        path: '/filters',
        name: 'filters',
        meta: { auth: 200, title: "Фильтры" },
        component: () => {
            return import('@/views/filters.vue')
        }
    },
    {
        path: '/users',
        name: 'users',
        meta: { auth: 1000, title: "Пользовтели" },
        component: () => {
            return import('@/views/users.vue')
        }
    },
];

export default {
    routes: routes
}