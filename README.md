#Lambda Docker Image to run CDK

Running AWS Cloud Development Kit (CDK) from within an AWS Lambda function can be useful in specific scenarios where you want to programmatically trigger infrastructure changes, such as deploying or modifying resources based on events.

While it's not a typical use case, you can technically trigger CDK deployments or updates from within Lambda by invoking AWS CDK's command-line interface (CLI).

##Steps to create and use the lambda functions
1. Create a simple CDK App. Refer to https://docs.aws.amazon.com/cdk/v2/guide/hello_world.html for instructions

2. Once the App is created, zip the contents of the project folder.

3. Upload the zip file to an S3 bucket

4. In this repo, cd into the folder which has the DockerFile. The DockerFile currently has commands to use node18:buster as the base image and install cdk version 2.81. Update these as per your requirements.

5. Run the command ```docker build -t <image_name>```.

6. Once the docker image is created, push it to ECR in your account. Ref - https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html

7. Create a lambda functions using this container image. Make sure appropriate permissions are provided to the lambda execution role. Update the timeout, Memory and Ephemeral storage as per your requirements.

8. Once the lambda function is created, test it out by invoking the function using the below event

```
{
    "s3Bucket": "<name of the s3 bucket that has the zip file>",
    "templateName": "<name of the zip file>",
    "cdkDeployParams": "-c <variable_1> -c <variable_2>" //Any variables that need to be passed to the cdk app
}
```

9. The lambda should now start deploying the cdk app. Check lambda logs and the cloudformation console for status of the process.

It is recommended to use an AWS public cert for installing and verifying aws-cliv2. Please uncomment lines 14 and 16 in the Dockerfile in this case.