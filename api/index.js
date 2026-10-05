import {list,get,del,issueSignedToken} from '@vercel/blob';
import {handleUpload,handleUploadPresigned} from '@vercel/blob/client';
import {createHandler} from '../lib/handler.js';
export default {fetch:createHandler({list,get,del,handleUpload,handleUploadPresigned,issueSignedToken})};
