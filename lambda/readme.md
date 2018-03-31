This example is a bit difficult to set up, however here is the overview:

Ensure that your AWS credentials are set up. In this case, my user credential profile name is keypiece, this should be changed to `default` or whatever group your credentials are held in.\
\
Secondly, the test suite in /lambda/ are dependent on some base configurations of your AWS DynamoDB. firstly, a table must exist in your region with the name `default`

//TODO Update this