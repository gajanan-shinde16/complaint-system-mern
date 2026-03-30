import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) =>{
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message : "Not Authenticated"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    }catch(error){
        res.status(401).json({message:"Invalid Token"});
    }
}

export default authMiddleware;