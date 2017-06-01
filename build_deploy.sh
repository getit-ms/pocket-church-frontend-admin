#!/bin/bash

rm -Rf src/main/webapp
cp -R src/main/webapp-origin src/main/webapp
cp -Rf /tmp/calvinista-design/$1/admin/* src/main/webapp/

mvn package -Pprod -Dchave.igreja=$1 -Dnome.igreja="$2" || exit 1

sshpass -p "$DEPLOY_PASS" scp -o StrictHostKeyChecking=no "target/$1.war" "$DEPLOY_USER@$DEPLOY_HOST:/tmp/" || exit 1
sshpass -p "$DEPLOY_PASS" ssh -o StrictHostKeyChecking=no "$DEPLOY_USER@$DEPLOY_HOST" "/opt/glassfish4/glassfish/bin/asadmin undeploy $1 || echo 'Não implantado'" || echo "$1 não estava em execução"
sshpass -p "$DEPLOY_PASS" ssh -o StrictHostKeyChecking=no "$DEPLOY_USER@$DEPLOY_HOST" "/opt/glassfish4/glassfish/bin/asadmin deploy /tmp/$1.war || exit 1"