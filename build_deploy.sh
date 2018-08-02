#!/bin/bash

git checkout -f . || exit 1
git clean -fd || exit 1

cp -Rf /tmp/pocket-corporate-design/$1/admin/* src/main/webapp/ || exit 1

mvn package -Pprod -Dchave.empresa=$1 -Dnome.empresa="$2" || exit 1

sshpass -p "$DEPLOY_PASS" scp -o StrictHostKeyChecking=no "target/$1.war" "$DEPLOY_USER@$DEPLOY_HOST:/opt/deploy" || exit 1