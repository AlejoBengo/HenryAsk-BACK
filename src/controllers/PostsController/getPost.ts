import { Response, Request } from "express";
import { PostModel} from '../../models/Posts';

export const GET_POST =async (req: Request, res: Response) => {
    try {
        const { description, question, tags, type} = req.query;
        const { id } = req.params;
        
        if(id){
            const searchPost = await PostModel.findById(id);
            res.status(200).json(searchPost);
            
        }else if (type){
            const searchPost = await PostModel.find( { type:type } );
            if(searchPost.length > 0){
                res.json(searchPost);
            }else{
                res.status(404).json({error: 'no se encontro consulta disponible'});
            } 
        }else if(!description && !question && ! tags) {
            const searchPost = await PostModel.find({});
            res.status(200).json(searchPost);
        }else if (description){
            const searchPost = await PostModel.find( { description: { $regex: `${description}`} } );
            if(searchPost.length > 0){
                res.json(searchPost);
            }else{
                res.status(404).json({error: 'no se encontro consulta disponible'});
            }            
        }else if(question){
            const searchPost = await PostModel.find( { question: { $regex: `${question}`} } );
            if(searchPost.length > 0){
                res.json(searchPost)
            }else{
                res.status(404).json({error: 'no se encontro consulta disponible'});
            } 
        }else if (tags){
            const searchPost = await PostModel.find( { tags: { $regex: `${tags}`} } );
            if(searchPost.length > 0){
                res.json(searchPost);
            }else{
                res.status(404).json({error: 'no se encontro consulta disponible'});
            } 
        }
    } catch(err: string | any){
        res.status(404).send(err.message);
    }
};