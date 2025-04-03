AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: 'sampro

  Sample SAM Template for sampro

  '
Globals:
  Function:
    Timeout: 3
Resources:
  MyBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: himaltiger25
      OwnershipControls:
        Rules:
        - ObjectOwnership: ObjectWriter
      PublicAccessBlockConfiguration:
        BlockPublicAcls: false
        BlockPublicPolicy: false
        IgnorePublicAcls: false
        RestrictPublicBuckets: false
      WebsiteConfiguration:
        IndexDocument: index.html
    Metadata:
      SamResourceId: MyBucket
  MyBucketPolicy:
    Type: AWS::S3::BucketPolicy
    Properties:
      Bucket:
        Ref: MyBucket
      PolicyDocument:
        Statement:
        - Effect: Allow
          Principal: '*'
          Action: s3:GetObject
          Resource:
            Fn::Sub: arn:aws:s3:::himaltiger25/*
    Metadata:
      SamResourceId: MyBucketPolicy
  MyACMCertificate:
    Type: AWS::CertificateManager::Certificate
    Properties:
      DomainName: www.bhupenresume.co.uk
      ValidationMethod: DNS
    Metadata:
      SamResourceId: MyACMCertificate
  MyDistribution:
    Type: AWS::CloudFront::Distribution
    Properties:
      DistributionConfig:
        Enabled: true
        ViewerCertificate:
          AcmCertificateArn:
            Ref: MyACMCertificate
          SslSupportMethod: sni-only
        Aliases:
        - www.bhupenresume.co.uk
        DefaultRootObject: index.html
        Origins:
        - DomainName: himaltiger25.s3-website-us-east-1.amazonaws.com
          Id: S3Origin
          CustomOriginConfig:
            OriginProtocolPolicy: match-viewer
        DefaultCacheBehavior:
          TargetOriginId: S3Origin
          ViewerProtocolPolicy: allow-all
          AllowedMethods:
          - GET
          - HEAD
          CachedMethods:
          - GET
          - HEAD
          MinTTL: 0
          DefaultTTL: 0
          MaxTTL: 0
          ForwardedValues:
            QueryString: false
            Cookies:
              Forward: none
    Metadata:
      SamResourceId: MyDistribution
  MyRoute53Record:
    Type: AWS::Route53::RecordSetGroup
    Properties:
      HostedZoneId: Z06834483PB7RI9BNI6TN
      RecordSets:
      - Name: www.bhupenresume.co.uk
        Type: A
        AliasTarget:
          HostedZoneId: Z2FDTNDATAQYW2
          DNSName:
            Fn::GetAtt:
            - MyDistribution
            - DomainName
    Metadata:
      SamResourceId: MyRoute53Record
  DynamoDBTable:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: resume-apptbl
      BillingMode: PAY_PER_REQUEST
      AttributeDefinitions:
      - AttributeName: ID
        AttributeType: S
      KeySchema:
      - AttributeName: ID
        KeyType: HASH
    Metadata:
      SamResourceId: DynamoDBTable
  HelloWorldFunction:
    Type: AWS::Serverless::Function
    Properties:
      Policies:
      - DynamoDBCrudPolicy:
          TableName: resume-apptbl
      CodeUri: s3://aws-sam-cli-managed-default-samclisourcebucket-lff1jyceaukl/demostack/8b7ab8b889a9202448607b732d6dc181
      Handler: app.lambda_handler
      Runtime: python3.13
      Architectures:
      - x86_64
      Events:
        HelloWorld:
          Type: Api
          Properties:
            Path: /hello
            Method: get
    Metadata:
      SamResourceId: HelloWorldFunction
Outputs:
  CloudFrontURL:
    Description: CloudFront Distribution URL
    Value:
      Fn::GetAtt:
      - MyDistribution
      - DomainName
  HelloWorldApi:
    Description: API Gateway endpoint URL for Prod stage for Hello World function
    Value:
      Fn::Sub: https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/Prod/hello/
  HelloWorldFunction:
    Description: Hello World Lambda Function ARN
    Value:
      Fn::GetAtt:
      - HelloWorldFunction
      - Arn
  HelloWorldFunctionIamRole:
    Description: Implicit IAM Role created for Hello World function
    Value:
      Fn::GetAtt:
      - HelloWorldFunctionRole
      - Arn

#### Record route 53####
   DemoRoute53Record:
   Type: "AWS::Route53::RecordSetGroup"
   Properties:
     HostedZoneId: YOUR_HOSTED_ZONE_ID
     RecordSets:
       - Name: YOUR_RECORDSET_NAME
         Type: A
         AliasTarget:
           HostedZoneId: Z2FDTNDATAQYW2
           DNSName: !GetAtt DemoDistribution.DomainName


DemoCertificate:
    Type: AWS::CertificateManager::Certificate
    Properties:
      DomainName: bhupenresume.co.uk
      ValidationMethod: DNS
ViewerCertificate:
          AcmCertificateArn: !Ref DemoCertificate
          SslSupportMethod: sni-only
        Aliases:
          - www.bhupenresume.co.uk




          MyRoute53Record:
    Type: AWS::Route53::RecordSetGroup
    Properties:
      HostedZoneId: Z06834483PB7RI9BNI6TN
      RecordSets:
      - Name: www.bhupenresume.co.uk
        Type: A
        AliasTarget:
          HostedZoneId: Z2FDTNDATAQYW2
          DNSName:
            Fn::GetAtt:
            - MyDistribution
            - DomainName
    Metadata:
      SamResourceId: MyRoute53Record