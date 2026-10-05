import {list,get,del} from '@vercel/blob';
import {handleUpload} from '@vercel/blob/client';
import {createHandler} from '../lib/handler.js';
export default {fetch:createHandler({list,get,del,handleUpload})};
