def init_router(app):
    @app.route('/')
    def hello_world():
        return 'Hello, World!'
    