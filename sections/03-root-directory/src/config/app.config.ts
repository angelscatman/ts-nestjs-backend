
export const envConfiguration = () => ({
    enviroment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    mongodb: process.env.MONGODB_URI,
    defaultPageLimit: process.env.DEFAULT_PAGE_LIMIT || 10,
})