import grpc from '@grpc/grpc-js';
import protoloader from '@grpc/proto-loader';
import path from 'path';
import config from '../configs/configs.js'

class textExtractionGrpcHandler{
    constructor(){

        this.protoDir = path.join(__dirname , 'protos');
        this.remoteService =config.GRPC_URL;
    }
    async fetchResponseFromGrpc(package , serviceName , method , payload){
        //todo : used the same proto from python for testing , need to change it once fully done in python
        const protoFile = path.join(this.protoDir , `${package}.proto`);
        const options = {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
        };
        const protoDefinition = protoloader.loadSync(protoFile , options);
        const protoObj  = grpc.loadPackageDefinition(protoDefinition);

        const service =  protoObj[package][serviceName];
        const client = new service(
            this.remoteService,
            grpc.credentials.createInsecure()
        );
        return new Promise((resolve, reject) =>{ 
            client[method](payload , (err , response) => {
                if(err){
                    return reject(err);
                }
                resolve(response);
            });
        });
    }
}
export default textExtractionGrpcHandler;