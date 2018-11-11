# ベースイメージを指定
# 今回は LTS の 8.9.4 にする
# alpine は 軽量の linux OS
FROM node:8.9.4-alpine

# node.js の環境変数を定義する
# 本番環境では production
ENV NODE_ENV=development

# 雛形を生成するのに必要なパッケージのインストール
RUN apk add --update alpine-sdk

#ethereum-jsでpythonが必要
RUN apk add --update \
    python \
    python-dev \
    py-pip \
    build-base

RUN yarn
RUN yarn global add express-generator@4.16.0
RUN yarn add nodemon
RUN yarn add express
RUN yarn add mongodb
RUN yarn add mongoose
RUN yarn add body-parser
RUN yarn add moment
RUN yarn add tsc

RUN yarn global add truffle

RUN yarn install



# ディレクトリを移動する
WORKDIR /src


# ポート3000番を開放する
EXPOSE 3000