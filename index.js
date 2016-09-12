const oracledb = require('oracledb-for-lambda');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const response = require('cfn-response');

exports.handler = (event, context) => {

    return s3.getObject({
        Bucket: event.ResourceProperties.OracleSQLBucketName,
        Key: event.ResourceProperties.OracleSQLS3Key
    }).promise()
        .then(file => {
            const sql = file.Body.toString();

            const oracleConnectionInfo = {
                user: event.ResourceProperties.OracleUserName,
                password: event.ResourceProperties.OraclePassword,
                connectString: event.ResourceProperties.OracleConnectionString
            };
            return oracledb.getConnection(oracleConnectionInfo).then(conn => conn.execute(sql)
                .then(result => {
                    conn.close();
                    return result;
                })
                .catch(err => {
                    console.error(err);
                    conn.close();
                    return err;
                })
            );
        })
        .then(result => response.send(event, context, response.SUCCESS, {result: JSON.stringify(result)}))
        .catch(error => {
            console.log(error);
            response.send(event, context, response.FAILED, {Error: JSON.stringify(error)})
        });
};
