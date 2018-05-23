#!/bin/bash

git checkout -f . || exit 1
git clean -fd || exit 1

cp -Rf /tmp/calvinista-design/$1/admin/* src/main/webapp/ || exit 1

mvn package -Pprod -Dchave.igreja=$1 -Dnome.igreja="$2" || exit 1

sshpass -p "$DEPLOY_PASS" scp -o StrictHostKeyChecking=no "target/$1.war" "$DEPLOY_USER@$DEPLOY_HOST:/tmp/" || exit 1
sshpass -p "$DEPLOY_PASS" ssh -o StrictHostKeyChecking=no "$DEPLOY_USER@$DEPLOY_HOST" "/opt/glassfish4/glassfish/bin/asadmin deploy --force /tmp/$1.war || exit 1"