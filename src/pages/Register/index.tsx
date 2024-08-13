
import React from 'react';
import { Form, Input, Button, message } from 'antd';
import type { FormProps } from 'antd';
import './index.css';
import { registerApi } from '../..//interfaces/index'


type FieldType = {
    username: string;
    password: string;
    password2: string;
};

export const Register: React.FC = () => {
    const formLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 }
    }
    const layout2 = {
        labelCol: { span: 0 },
        wrapperCol: { span: 24 }
    }
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {

        const { username, password, password2 } = values;
        if (password !== password2) {
            message.error('两次输入的密码不一致')
            return
        }
        await registerApi(username, password)
        message.success('注册成功')
        setTimeout(() => {
            window.location.href = '/login'
        }, 1000)

    };

    return (
        <div id='register-container'>
            <h1 className='title'>图书管理系統</h1>
            <Form
                {...formLayout}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="用户名"
                    name="username"
                    rules={[{ required: true, message: '请输入用户名' }]}
                >
                    <Input placeholder='请输入' />
                </Form.Item>

                <Form.Item<FieldType>
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请输入密码' }]}
                >
                    <Input.Password placeholder='请输入' />
                </Form.Item>

                <Form.Item<FieldType>
                    label="确认密码"
                    name="password2"
                    rules={[{ required: true, message: '请再次输入密码' }]}
                >
                    <Input.Password placeholder='请输入' />
                </Form.Item>
                <Form.Item {...layout2}>
                    <div className="links">
                        <a href="/login">已有账号？去登录</a>
                    </div>
                </Form.Item>

                <Form.Item {...layout2}>
                    <Button type="primary" htmlType="submit" className='submit-btn'>
                        注 册
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}