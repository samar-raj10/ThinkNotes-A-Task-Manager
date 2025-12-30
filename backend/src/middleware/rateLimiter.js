import ratelimit from "../config/upstash.js";



const rateLimiter = async (req,res,next) => {
    try {
        const {success} = await ratelimit.limit("my-user-id") //put user-id later in place of my-user-id
        if(!success){
            return res.status(429).json({
                message:"Too many requests.Please try again later"}
            )
        }

        next();

    } catch (error) {
        console.log(error);
        next(error);
    }
}

export default rateLimiter;