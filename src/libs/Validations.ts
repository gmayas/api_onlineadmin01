import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export interface IPayload {
    emailuser: string;
    iat: number;
} 
   
export const TokenValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('token');
        console.log('token xxx: ', token);
        if (!token) return res.status(401).json('Access Denied');
        const payload = await jwt.verify(token, process.env['TOKEN_SECRET'] || '') as IPayload;
        console.log('payload: ', payload)
        req.emailUser = payload.emailuser  // Se guarda en  req.userId paa que todas las rutas la puedan ver. 
        next();
    } catch (e) {
        console.log('error : ', e);
        return res.status(400).json({
            message: 'Invalid Token',
            error: e
        })
    }
};

export const encrypPassword = async (password: string): Promise<string> => {
   try{
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
   } catch (e) {
       console.log('Encryption error (encrypPassword)', e);   
       return 'Encryption error (encrypPassword).';
   }
};

export const validatePassword = async function (password: string, QueryPassword: string): Promise<boolean> {
    try{
         return await bcrypt.compare(password, QueryPassword);
    } catch (e) {
        console.log('Error validatePassword: false',  e);   
        return false;
    }
 };
