
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import type { FormProps } from 'antd';
import './index.css';
import { loginApi } from '../..//interfaces/index'
import { useLoginStatue } from '../../store'


type FieldType = {
    username: string;
    password: string;
};

export const Login: React.FC = () => {
    const [loginStatus, setLoginStatus] = useLoginStatue();

    if (loginStatus) {
        return <Navigate to="/" replace={true} />
    }

    const formLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 }
    }
    const layout2 = {
        labelCol: { span: 0 },
        wrapperCol: { span: 24 }
    }
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        console.log('Success:', values);
        const { username, password } = values;
        await loginApi(username, password)
        message.success('登录成功')
        setLoginStatus(true)
        setTimeout(() => {
            window.location.href = '/'
        }, 1000)

    };

    return (
        <div id='login-container'>
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

                <Form.Item {...layout2}>
                    <div className="links">
                        <a href="/register">没有账号？去注册</a>
                    </div>
                </Form.Item>

                <Form.Item {...layout2}>
                    <Button type="primary" htmlType="submit" className='submit-btn'>
                        登 录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}