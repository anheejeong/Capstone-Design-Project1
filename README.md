# KNU Dashboard

[KyungPook National University](https://www.knu.ac.kr/wbbs/wbbs/main/main.action) [Computer Science & Engineering](https://cse.knu.ac.kr/) Capstone Design Project1(종합설계프로젝트1, 2023)

**Administrator monitoring dashboard that analyzes the types and activities of members on the [Web-r](https://web-r.org/), a community and medical statistical analysis platform**

![image](https://github.com/anheejeong/Capstone-Design-Project1/assets/100365693/02a18a30-93e9-49a6-be9c-b69da666bba9)

## Project Components Description

* template : [Flatlogic](https://github.com/flatlogic/light-blue-react-template)
* Color
    * background : #1e2045
    * widget : #171933
    * dashboard graph : #cf1228, #dc8204, #2a8313, #1c5cfe, #a83150, #a94542, #f1f1f3
    * users graph : #a1232b, #243346, #4b838f, #b26455, #74a892, #5b806d, #a76a24, #273a4a, #ca2528
    * payments graph : #1d5dff, #377627, #82c568, #fd9042
    * nlp graph : #ca2528, #273a4a, #5aa2aa, #e17b5c, #ffff09
    * developer page : #dc8204, #cf1228, #393f45

### Pages

* Dashboard : Dashboard Home
* Users : Users Analysis Page
* Payments : Payments Analysis Page
* NLP : Natural Language Processing Page(Clustering)
* Information
    * Developer : Developer Introducing Page
    * Documents : Company Technical Documents Page

### Else Pages

* Header
* Loader
* Notifications
* Sidebar
* Pages
    * error
    * login
    * register

### Chart Features

* Echart Charts
* Highchart Charts
* Apex Charts
* React-wordcloud

### UI

1. Users Page
![image](https://github.com/anheejeong/Capstone-Design-Project1/assets/100365693/a0d67805-0d01-43fc-8a02-f597713a3d1a)

2. Payments Page
![image](https://github.com/anheejeong/Capstone-Design-Project1/assets/100365693/ad3ac7a8-793b-46df-acb4-b4f8e1bbe49d)

3. NLP Page
![image](https://github.com/anheejeong/Capstone-Design-Project1/assets/100365693/0f3ebce5-3932-4c31-8751-107a78ab6bda)

### File
* Backend : pybo
* Data Analysis : Data_Analysis
* Frontend : else

## Developer Settings
### Project version

- node: v14.21.3
- npm: v6.14.18
- sass-loader: v7.1.0
- Supported NodeJS and node-sass version
![image](https://github.com/anheejeong/Capstone-Design-Project1/assets/100365693/344fc63f-2e93-44c4-bf92-a4c9f643d4ff)


### Installation 

1. Clone repository
```shell
git clone https://github.com/anheejeong/Capstone-Design-Project1.git myproject
```
2. Get in the project folder
```shell
cd myproject
```
3. Install dependencies via npm or yarn
```shell
npm install
```
```shell
yarn
```
3. If installation gets error, use below command
```shell
npm install chalk webpack webpack-dev-server react-dev-utils pnp-webpack-plugin html-webpack-plugin case-sensitive-paths-webpack-plugin webpack-manifest-plugin eslint eslint-loader url-loader babel-loader babel-preset-react-app babel-plugin-named-asset-import babel-plugin-named-asset-import style-loader css-loader postcss-loader sass-loader file-loader @babel/core eslint-config-react-app eslint-plugin-import eslint-plugin-flowtype eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react eslint-plugin-react-hooks babel-eslint @babel/plugin-proposal-class-properties @babel/plugin-proposal-optional-chaining node-sass@4.14.1 postcss-flexbugs-fixes postcss-preset-env bootstrap glyphicons-halflings font-awesome animate.css awesome-bootstrap-checkbox @amcharts/amcharts4 @amcharts/amcharts4-geodata classnames echarts-for-react echarts highcharts highcharts-react-official moment rc-hammerjs react react-animate-height react-animated-number react-apexcharts apexcharts react-dom react-google-maps react-redux react-router react-router-dom react-sparklines react-toastify react-transition-group reactstrap redux redux-thunk rickshaw line-awesome
```

### Quick start
Run development server
```shell
yarn run
```
```shell
start
```

### Server start
Needs to turn server - Please send a mail to us
(eyrt6973@naver.com)

1. Get in the project folder
```shell
flask run
```

## Developer Introducing
1. Frontend<br/>
안희정(eyrt6973@naver.com)<br/>
Github : [anheejeong](https://github.com/anheejeong)
2. Backend<br/>
조성호(eoblue22@naver.com)<br/>
Github : [sungholion](https://github.com/sungholion)
3. Data Analysis<br/>
김창현(egnahckim0119@gmail.com)<br/>
Github : [ChangHyeonn](https://github.com/ChangHyeonn)

## Company Technical Documents
[Tech Documents - notion](https://sharp-individual-1ab.notion.site/ce53e7d6ca804e86a85d55f5cc8b234d?pvs=4)