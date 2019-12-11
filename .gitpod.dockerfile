FROM gitpod/workspace-full

RUN sudo apt-get update \
 && ( curl https://cli-assets.heroku.com/install.sh | sh ) \
 && ( yes "" | npm install -g npm @angular/cli )
