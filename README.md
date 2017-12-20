# Django-Vue-CRM

> A Vue.js and Django CRM

## Installation

Inside the "froentend" directory:
```bash
yarn install
```
```bash
cd ..
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Development

* On one terminal run your webpack dev server

```bash
npm run dev
```

* On another terminal launch the Django application

```bash
python manage.py runserver
```

And point your browser to [http://localhost:8000](), but test that you can also access the pure Django world, for example by going to the admin panel [http://localhost:8000/admin]()

## Tests

``` bash
# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
