const { execSync } = require('child_process');
exports.handler = async (event, context) => {
    console.log(`input to lambda function : ${JSON.stringify(event)}`);
    const body = JSON.parse(JSON.stringify(event));
    const s3BucketName = body.s3Bucket;
    const templateFileName = body.templateName;
    const cdkDeployParams = body.cdkDeployParams;
    
    console.log(`cdk Deploy Parameters : ${cdkDeployParams}`);

    const cmd = `cd /tmp && cp -r /var/task/node_modules/ /var/task/package-lock.json . && aws s3api get-object --bucket ${s3BucketName} --key ${templateFileName} cdk_code.zip && unzip -o cdk_code.zip && cd cdk_code && cdk deploy ${cdkDeployParams} --require-approval never`;
    const options = {
        encoding: 'utf8'
    };
    console.log(cmd)
    console.log(execSync(cmd, options));
};
