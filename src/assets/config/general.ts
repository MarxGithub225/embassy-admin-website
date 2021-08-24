export const generalConfig = {
    appName: 'The king shopsr',
    platformName: 'The king shopsr',
    defaultLanguage: 'fr',
    roles: ['admin'],
}

export const navBarConfig = {
    menus: [
        {
            display: 'Les embassades',
            route: 'embassies',
            icon: 'add_circle_outline'
        },
        {
            display: 'Les démandes de visa',
            route: 'visas',
            icon: 'add_circle_outline'
        },
        {
            display: 'Les actualités',
            route: 'news',
            icon: 'add_circle_outline'
        },
        {
            display: 'Administrateurs',
            route: 'admins',
            icon: 'category'
        },
        // {
        //     display: 'Les utilisateurs',
        //     route: 'users',
        //     icon: 'shopping_basket'
        // },
        {
            display: 'Bannières',
            route: 'banners',
            icon: 'add_circle_outline'
        }        
    ],

    topBar : [
        
        {
            display : 'Mon profile',
            route: 'profil',
            icon: 'account_circle',
            link: false
        }
    ]
};