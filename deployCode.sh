#!/bin/bash

rm oracle-sql-injector.zip

zip oracle-sql-injector.zip index.js package.json node_modules/cfn-response/* node_modules/oracledb-for-lambda/package.json node_modules/oracledb-for-lambda/index.js node_modules/oracledb-for-lambda/lib/*.js node_modules/oracledb-for-lambda/build/Release/oracledb.node lib/*.so*

aws s3 cp oracle-sql-injector.zip s3://sql-injector/oracle-sql-injector.zip

aws lambda update-function-code --function-name oracle-sql-injector --s3-bucket sql-injector --s3-key oracle-sql-injector.zip
