def register_auth_apis(app):
    @app.route('/api/login', methods=['POST'])
    def register():
        json_body = request.get_json()
        
        # 处理表单数据...
        
        return jsonify({
            "image":"abc"
        })
        
    @app.route('/api/register', methods=['POST'])
    def register():
        json_body = request.get_json()
        
        # 处理表单数据...
        
        return jsonify({
            "image":"abc"
        })