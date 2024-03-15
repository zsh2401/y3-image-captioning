from flask import jsonify, request


def init_apis(app):
    
    @app.route('/api/infer', methods=['POST'])
    def infer():
        # 获取表单数据
        image = request.form.get('image')
        
        # 处理表单数据...
        
        return jsonify({
            "image":"abc"
        })