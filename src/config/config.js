export default {
    appName: "santex",
    baseUrl: "https://api.santehkomfort.ru/api",
    websocetUrl: "wss://api.santehkomfort.ru/data",
    mainMenu: [
        {
            auth: 100,
            name: "Каталог",
            route: {
                name: "catalog",
            },
        },
        {
            auth: 100,
            name: "Контент",
            route: {
                name: "content",
            },
        },
        {
            auth: 200,
            name: "Категории",
            route: {
                name: "categories",
            },
        },
        {
            auth: 200,
            name: "Фильтры",
            route: {
                name: "filters",
            },
        },
        {
            auth: 1000,
            name: "Пользователи",
            route: {
                name: "users",
            },
        },
    ]
}