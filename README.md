# dd

不是专业前端！！
项目可随意使用
希望有个前端大佬来优化下样式
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## vue ts使用
[//]: # (<script setup lang="ts">)
npm install typescript ts-loader --save-dev

### 解决input框晃动问
npm install sass-loader -D
npm install node-sass -D

### 使用vue 路由
npm install vue-router@4 

创建router.js

main.js中引用全局依赖

### 控制页面调整
    <router-link to="/">Go to Dd</router-link>
    <router-link to="/show">Go to Show</router-link>
    <router-view/>
### 使用axios做后端请求
npm install axios

## 改用python做服务器 redis做数据库

pip install flask redis
### 解决跨域问题
pip install flask_cors

### app.py
```
from flask import Flask, request, jsonify  
from flask_cors import CORS  
import json  
import redis

app = Flask(__name__) 
# 使用 * 允许所有源访问，或者指定特定的源  
CORS(app, resources={r"/*": {"origins": "*"}})

# 连接到 Redis  
r = redis.Redis(host='localhost', port=6379, db=0,password='123456')  
  
@app.route('/set_key', methods=['POST'])  
def set_key():  
    data = request.json  
    key = data.get('key')  
    value = data.get('value')  
    if key and value:  
        # 将字典对象序列化为 JSON 字符串  
        value  = json.dumps(value)  
        r.set(key, value)  
        return jsonify({'status': 'success', 'message': f'Key {key} set to {value}'})  
    else:  
        return jsonify({'status': 'error', 'message': 'Missing key or value'}), 400  
  
@app.route('/get_key', methods=['GET'])  
def get_key():  
    key = request.args.get('key')  
    if key:  
        value = r.get(key)  
        if value:  
            value =json.loads(value)
            return jsonify({'status': 'success', 'value': value})  
        else:  
            return jsonify({'status': 'error', 'message': f'Key {key} not found'}), 404  
    else:  
        return jsonify({'status': 'error', 'message': 'Missing key'}), 400  
  
if __name__ == '__main__':  
    app.run(debug=True)
```
### 解决WARNING:This is a development server. Do not use it in a production deployment.Use a productio

pip install gunicorn

### 启动脚本go.sh

```
#!/bin/bash  
# 查找 Gunicorn 进程的 PID  
PID=$(pgrep -f gunicorn)  
if [ -z "$PID" ]; then  
    echo "Gunicorn is not running."  
else  
    echo "Stopping Gunicorn with PID $PID..."  
    kill $PID  
    sleep 2  # 等待进程完全停止，可以根据需要调整这个值  
    echo "Gunicorn stopped."  
fi  
  
echo "Starting Gunicorn..."  
# 使用 nohup 命令启动 Gunicorn，这样在退出当前终端时进程不会被终止  
#nohup gunicorn --workers 3 --bind 0.0.0.0:5100 app:app &  
nohup gunicorn --workers 3 --bind 0.0.0.0:5100 --access-logfile app.out --error-logfile app.out app:app &

# 等待一小段时间，然后检查 Gunicorn 是否启动成功  
sleep 3  # 等待 gunicorn 启动，可能需要更长时间  
PID_NEW=$(pgrep -f gunicorn)  
if [ -n "$PID_NEW" ]; then  
    echo "Gunicorn started successfully with PID $PID_NEW."  
else  
    echo "Failed to start Gunicorn."  
fi
```
解决windows下换行符问题，复制到服务器在目录下执行

sed -i 's/\r$//' go.sh
### nginx 配置

```
location ^~ /dd {
    #proxy_pass http://localhost:5000/;
    proxy_pass http://localhost:5100/;
            proxy_set_header Host $host;
         proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;	
}
```
