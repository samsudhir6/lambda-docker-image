FROM node:18-buster

# Install aws-lambda-cpp build dependencies
RUN apt-get update && \
    apt-get install -y \
    g++ \
    make \
    cmake \
    unzip \
    curl \
    gpg \
    jq \
    && curl -sL https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip -o awscliv2.zip \
    # && gpg --import aws-pub.crt \
    && curl -o awscliv2.sig https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip.sig \
    # && gpg --verify awscliv2.sig awscliv2.zip \
    && unzip awscliv2.zip \
    && aws/install \
    && rm -rf \
    awscliv2.zip \
    aws \
    /usr/local/aws-cli/v2/*/dist/aws_completer \
    /usr/local/aws-cli/v2/*/dist/awscli/data/ac.index \
    /usr/local/aws-cli/v2/*/dist/awscli/examples

# Install aws-cdk
RUN npm install -g aws-cdk@2.81.0

# create a /var/task directory
RUN mkdir -p /var/task

WORKDIR /var/task/

COPY cdk_v2_81 .

RUN npm install
