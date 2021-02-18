# CyberSearch-Engine
An Open Source Search Engine written in Python and scrapes results from Bing.

## Setup

To run this program, all that you need to do is make sure that you have python3 and pip3 installed
and run:
```shell script
git clone https://github.com/CyberSafe-Labs/CyberSearch-Engine.git
cd CyberSearch-Engine
# pip install the required dependencies
pip3 install -r requirements.txt
```
This just installs the other Python packages that are needed for this service to work correctly.
Now, just run [wsgi.py](wsgi.py) and then go to [http://127.0.0.1:5000/](http://127.0.0.1:5000) or [http:/localhost:5000/](http://localhost:5000).

## Deployment
If you want to host deploy this on the internet, you can deploy like you would with any other Flask website. You can 
check out there documentation on deployment [here](https://flask.palletsprojects.com/en/1.1.x/deploying). This
repository is also configured for a quick deployment on [Heroku](https://www.heroku.com).

©2021 CyberSafe Labs, Inc.
