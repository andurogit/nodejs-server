# 들어가며

NodeJs 는 기본적으로 javascript에 의존적이고 

2016년 이후에 발표된 ES6 javascript 문법에도 지대한 영향이 있어

이를 탈피 할 수 있는 수단으로 webpack배포와 babel 이 있음을 인지 했습니다.

특히나 IE 에서 ES6 지원비율은 11퍼센트 밖에 되지 않아 IE에서 구동 시 많은 문제가 
 
발생 할 것으로 보여 미리 사전에 프로그래밍 연습을 통해 해당 이슈들을 해결 해 보고자 합니다.

참조한 server 프로젝트는 moogoose db 로 이루어져 있어 이를 oracledb 로 변환하는 작업도

병행 해보려 합니다.

모든 모듈은 전역이 아닌 로컬로 설치하여 사용합니다.

gitignore 도 잘 설정되어 있어 가지고 왔습니다.

참조 소스원작자가 intelij 를 사용하나 봅니다.

# 20.02.21 

## project init & github push

1. npm init
1. github repository 생성
1. git 초기 설정

```text

> cd .../node-server
> npm init 

-- github 에 repository를 만들고
-- https://github.com/andurogit/nodejs-server.git

-- 깃 초기 설정
node-server> git init

-- 리모트 설정
node-server> git remote add origin "https://github.com/andurogit/nodejs-server.git"

-- vscode commit 후 push 처리
```

## babel 

일단 babel로 쓰기로 했으니 설치합니다.

> npm install --save-dev @babel/core @babel/cli

env 도 설치

> npm install --save-dev @babel/preset-env

.babelrc 파일 생성 및 env 사용 코딩

{
    "presets": ["@babel/preset-env"]
}

빌드 할 때 bebel 사용할거니까 scripts 에 build 스크립트 넣어주자

scripts {
    ...,
    "build-test": "babel src/test -w -d dist/test"
}

src/js 폴더(타깃 폴더)에 있는 모든 ES6+ 파일들을 트랜스파일링한 후, 그 결과물을 dist/js 폴더에 저장한다. 사용한 옵션의 의미는 아래와 같다.

-w
타깃 폴더에 있는 모든 파일들의 변경을 감지하여 자동으로 트랜스파일한다. (--watch 옵션의 축약형)
-d
트랜스파일링된 결과물이 저장될 폴더를 지정한다. (--out-dir 옵션의 축약형)

> npm run build-test 
를 수행하면 오류가 나는데 플러그인이 필요하다.

> npm install --save-dev @babel/plugin-proposal-class-properties

.babelrc 에 추가
 "plugins": ["@babel/plugin-proposal-class-properties"]

## webpack

### babel 은 es6 모듈 기능 사용 시 이슈가 있어 webpack으로 처리 한다.

.js, .hbs, .sass, 기타 등등 ... 그림파일들 -> 묶어준다.

webacp cli 와 babel 을 이용한 es6+ -> es5 트랜스를 위해 bable-loader 를 설치한다.
> npm install --save-dev webpack webpack-cli
> npm install --save-dev babel-loader

build scirpt는
"webpack -w"
"scripts": {
    ...,
    "build":"webpack -w"
}

### webpack 실행 설정 파일 webpack.config.js

> npm run build 

빌드 후 아래와 같이 사용하면 된다.

```html
<!DOCTYPE html>
<html>
<body>
  <script src="./dist/test/bundle.js"></script>
</body>
</html>
```

### webpack poly

더오래 된 브라우져에서 사용 가능하도록 poly 를 설치한다. 
poly는 개발이 이외에도 사용하기 때문에 -dev 는 사용하지 않는다.

> npm install @babel/polyfill

webpack.config.js entry 배열에 추가 한다. '@babel/polyfill'

### sass 컴파일

> npm install node-sass style-loader css-loader sass-loader --save-dev

entry 에 sass 추가 ./src/sass/main.scss'

webpack 은 주화입마에 빠질거 같으니 딱 오류 없을 정도 까지만 하자

## server.js

oracledb library가 필요하므로

> npm install --save oracledb

작은 웹서버를 생성할 때 아래 모듈들이 basic이다.

웹어플리케이션 프레임워크란다.
> npm install express --save
dom parser 라고 보면 될거 같고
> npm install body-parser --save
쿠키정보 가져올 떄 쓰는 거고
> npm install cookie-parser --save
이건 멀티파트폼이다.
> npm install multer --save

import ora from 'oracledb';

이런 문법 Unexpected identifier 오류 발생한다.

const ora = require('oracledb');

이와 같이 고쳐야 한다.

dotenv 모듈없어서 install

> npm install dotenv --save

## server.js oracle 연동


# 주의 사항

webpack 적용은 https://poiemaweb.com/es6-babel-webpack-2 블로그 참조하여 진행 하였음.

여기는 webpack 설치 및 운용 방법만 기술 되어 있고 

실제로 es6 문법으로 코딩하고 node server 와 같은 명령어를 내리면 문법 오류 발생한다.

환경 구축이 안되있는경우 package.json 이 있는 폴더 경로에서 

> npm install
