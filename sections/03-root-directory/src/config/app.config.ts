
export const envConfiguration = () => ({
    enviroment: process.env.NODE_ENV || 'development',
    port: Number(process.env.PORT ?? 3000),
    mongodb: process.env.MONGODB_URI,
    defaultPageLimit: Number(process.env.DEFAULT_PAGE_LIMIT ?? 10),
})