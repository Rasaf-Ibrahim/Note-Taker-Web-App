import dotenv from 'dotenv'

// dotenv
dotenv.config()



const env = {

    runtime_environment: process.env.RUNTIME_ENVIRONMENT,
    port: process.env.PORT,


    cors_origin_url: process.env.CORS_ORIGIN_URL,
    frontend_site_name: process.env.FRONTEND_SITE_NAME,
    frontend_base_url: process.env.FRONTEND_BASE_URL,
    oauth_confirmation_page_url: process.env.OAUTH_CONFIRMATION_PAGE_URL,

    cookie_domain: process.env.COOKIE_DOMAIN,

    
    mongodb_uri: process.env.MONGODB_URI,


    jwt_access_token_secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    jwt_access_token_expiration_time: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    access_token_cookie_max_age: process.env.ACCESS_TOKEN_COOKIE_MAX_AGE,


    google_oauth_client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
    google_oauth_client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    google_oauth_redirect_url: process.env.GOOGLE_OAUTH_REDIRECT_URL,


    github_oauth_client_id: process.env.GITHUB_OAUTH_CLIENT_ID,
    github_oauth_client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
    github_oauth_redirect_url: process.env.GITHUB_OAUTH_REDIRECT_URL,

    cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
    cloudinary_folder_name: process.env.CLOUDINARY_FOLDER_NAME,


    brevo_api_key: process.env.BREVO_API_KEY,
    email_of_the_mail_sender: process.env.EMAIL_OF_THE_MAIL_SENDER
}
    

const config_obj = {

    env: env
}

export default config_obj