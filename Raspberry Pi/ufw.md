# 防火墙

	## install

`sudo install ufw`

开放 SSH 22端口

`sudo ufw allow 22`

开放 5000 端口（python flask）

`sudo ufw allow 5000`

开启 ufw

`sudo ufw enable`

## flask code

```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
		return '<h1>hello world!</h1>'
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
```

