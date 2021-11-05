// @ts-nocheck
import Vue from 'vue'
import Router from 'vue-router'
import routes from '@/config/routes'
import store from '@/store/index'

Vue.use(Router)

var router = new Router({
    saveScrollPosition: true,
    history: true,
    // mode: 'history',
    routes: [{
        path: '/',
        redirect: to => {
            return '/index'
        }
    },
    {
        path: '/',
        meta: {
            auth: 1
        },
        component: () =>
            lazyLoadView(import('@/layouts/main.vue')),
        children: routes.routes
    },
    {
        path: '/',
        component: () => import('@/layouts/login.vue'),
        children: [
            {
                path: '/login',
                name: 'login',
                meta: { auth: 0, title: "Войти" },
                component: () =>
                    import('@/views/signup/login.vue')
            },
            {
                path: '/registration',
                name: 'registration',
                meta: { auth: 0, title: "Регистрация" },
                component: () =>
                    import('@/views/signup/registration.vue')
            }
        ]
    },
    {
        path: '/',
        component: () => import('@/layouts/blank.vue'),
        children: [{
            path: '*',
            name: 'notfound',
            meta: { auth: '*' },
            component: () =>
                import('@/views/notFound.vue')
        }
        ]
    }
    ]

})

router.beforeEach(async (to, from, next) => {
    if (to.meta.title) { document.title = to.meta.title }
    let role = store.getters['auth/role'];
    if (!role && store.getters['auth/isAuthenticated']) {
        await store.dispatch('auth/updateProfile');
        role = store.getters['auth/role'];
    }
    if (typeof to.meta.auth === 'string' && to.meta.auth == '*') {
        return next()
    } else if ((Number.isInteger(to.meta.auth) && to.meta.auth <= role) || (Array.isArray(to.meta.auth) && to.meta.auth.indexOf(role) != -1)) {
        return next()
    } else if (to.name != 'login') {
        await store.dispatch('auth/logout');
        return next('/login');
    }
    return next()
});

function lazyLoadView(AsyncView) {
    return new Promise(async resolve => {
        if (store.getters['auth/isAuthenticated']) await store.dispatch('auth/updateProfile');
        if (store.getters['auth/isAuthenticated']) await store.dispatch('config/fitch');
        const AsyncHandler = () => ({
            component: AsyncView
        });
        return resolve(Promise.resolve({
            functional: true,
            render(h, { data, children }) {
                return h(AsyncHandler, data, children)
            },
        }))
    })
}

export default router