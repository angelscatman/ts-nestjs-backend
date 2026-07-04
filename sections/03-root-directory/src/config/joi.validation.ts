import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
    RAPIDAPI_KEY: Joi.required(),
    RAPIDAPI_HOST: Joi.string().default('house-plants2.p.rapidapi.com'),
    PLANTS_API_URL: Joi.string().default('https://house-plants2.p.rapidapi.com/all-lite'),

    // Database Configuration
    MONGODB_URI: Joi.string().default('mongodb://localhost:27017/nest-plants'),

    // Server Configuration
    PORT: Joi.number().default(3000),
    NODE_ENV: Joi.string().default('development'),

    DEFAULT_PAGE_LIMIT: Joi.number().default(10)
})