# prepare
npm install

# create zip and upload to s3 and update lambda
deployCode.sh

# create stack - provisionning
aws cloudformation create-stack --stack-name oracle-sql-injector --template-body file://template.json  --parameter file://params.json --capabilities CAPABILITY_IAM 

